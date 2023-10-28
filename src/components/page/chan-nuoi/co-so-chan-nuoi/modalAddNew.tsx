import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import vatNuoiSevices from "~/services/vatNuoiSevices";
import hinhThucChanNuoiSevices from "~/services/hinhThucChanNuoiSevices";
import coSoChanNuoiSevices from "~/services/coSoChanNuoiSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listVatNuoi, setListVatNuoi] = useState<any>([]);
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [listHinhThucChanNuoi, setListHinhThucChanNuoi] = useState<any>([]);
    const [form, setForm] = useState({
        vatNuoiIds: [] as number[],
        caNhanHtxId: "",
        hinhThucChanNuoiId: "",
        tinhTrang: ""
    })
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await vatNuoiSevices.displayVatNuoi(listVatNuoi);
                const options = response.data.map((item: any) => ({
                    label: item.name, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListVatNuoi(options);
                const res = await hopTacXaSevices.displayHopTacXa(listHopTacXa);
                const options1 = res.data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setListHopTacXa(options1);
                const res1 = await hinhThucChanNuoiSevices.displayHinhThucChanNuoi(listHopTacXa);
                const options2 = res1.data.map((item: any) => ({
                    label: item.tenHinhThuc,
                    value: item.id,
                }));
                setListHinhThucChanNuoi(options2);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleSubmit = async () => {
        try {
            if (form.vatNuoiIds.length === 0 || !form.caNhanHtxId || !form.hinhThucChanNuoiId) {
                alert("Vui lòng chọn vật nuôi, hợp tác xã, hình thức chăn nuôi!");
                return;
            }
            let res: any = await coSoChanNuoiSevices.createCoSoChanNuoi(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    vatNuoiIds: [],
                    caNhanHtxId: "",
                    hinhThucChanNuoiId: "",
                    tinhTrang: ""
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }

        } catch (error) {
            console.error(error)
        }
    };
    const handleVatNuoiChange = (selectedOption: any) => {
        const selectedValues = Array.from(selectedOption.target.selectedOptions, (option: any) => option.value);
        setForm({
            ...form,
            vatNuoiIds: selectedValues.map(Number),
        });
    };
    const handleHopTacXaChange = (selectedOption: any) => {
        setForm({
            ...form,
            caNhanHtxId: selectedOption.target.value,
        });
    };
    const handleHinhThucChanNuoiChange = (selectedOption: any) => {
        setForm({
            ...form,
            hinhThucChanNuoiId: selectedOption.target.value,
        });
    };

    console.log("check", form.vatNuoiIds)
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Chọn vật nuôi(giữ ctrl để chọn được nhiều)</div>
                        <select
                            multiple
                            placeholder="Chọn vật nuôi"
                            onChange={handleVatNuoiChange}
                        >
                            {listVatNuoi.map((item: any) => (
                                <option key={item.value} value={item.value} title={item.label}>{item.label}</option>
                            ))}
                        </select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Hợp tác xã</div>
                        <Select
                            value={listHopTacXa.length > 0 ? listHopTacXa[0].value : null}
                            placeholder="Chọn "
                            onChange={handleHopTacXaChange}
                        >
                            {listHopTacXa.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Hinh thức chăn nuôi</div>
                        <Select
                            value={listHinhThucChanNuoi.length > 0 ? listHinhThucChanNuoi[0].value : null}
                            placeholder="Chọn "
                            onChange={handleHinhThucChanNuoiChange}
                        >
                            {listHinhThucChanNuoi.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            type="string"
                            name="tinhTrang"
                            label="Tình trạng:"
                            placeholder="Nhập tình trạng:"
                            isRequired
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className={styles["modal-footer"]}>
                        <Button color="primary">
                            Lưu
                        </Button>{" "}
                        <Button color="secondary" onClick={onClose}>
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>
            </Form>
        </Modal >
    );
}