import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Form, { Input } from "~/components/common/Form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import Select, { Option } from "~/components/common/Select";
import vungDonViHanhChinhSevices from "~/services/vungDonViHanhChinhServices";
import { toastSuccess, toastError } from "~/common/func/toast";
import ReactSelect from "react-select";


interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [form, setForm] = useState({
        administrativeUnitId: '',
        moTa: '',
        vung: ''
    })
    
    useEffect(() => {
        async function fetchData() {
            try {
                
                const response = await donViHanhChinhSevices.displayDonViHanhChinh(listHanhChinh);
                const options = response.data.map((item: any) => ({
                    label: item.ten, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                
                setListHanhChinh(options);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        if (!form.administrativeUnitId) {
            alert("Vui lòng chọn đơn vị hành chính.");
            return;
        }
        try {
            let res: any = await vungDonViHanhChinhSevices.createVungDonViHanhChinh(form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    administrativeUnitId: '',
                    moTa: '',
                    vung: ''
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }


        } catch (error) {
            console.error(error);
        }
    };
    const handleDVHanhChinhChange = (selectedOption: any) => {
        setForm({
            ...form,
            administrativeUnitId: selectedOption.value,
        });
    };
    console.log("check", form)
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <ReactSelect
                            options={listHanhChinh}
                            onChange={handleDVHanhChinhChange}
                            placeholder="Chọn đơn vị hành chính..."
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            name="moTa"
                            label="Mô Tả"
                            placeholder="Nhập mô tả"
                            isRequired
                        />
                        <Input
                            name="vung"
                            label="Vùng hành chính: MULTIPOLYGON(((0 0,0 1,1 1,1 0,0 0)))"
                            placeholder="Nhập vùng hành chính"
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
