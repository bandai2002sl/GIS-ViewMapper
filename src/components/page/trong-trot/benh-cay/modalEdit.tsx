import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import cayTrongSevices from "~/services/cayTrongSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiBenhSevices from "~/services/loaiBenhSevices";
import benhCaySevices from "~/services/benhCaySevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedData: any;
    setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
    isOpen,
    onClose,
    editedData,
    setEditedData,
}: ModalEditProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [listCayTrong, setListCayTrong] = useState<any>([]);
    const [listLoaiBenh, setListLoaiBenh] = useState<any>([]);
    const [form, setForm] = useState({ ...editedData })

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await donViHanhChinhSevices.displayDonViHanhChinh(listHanhChinh);
                const options = response.data.map((item: any) => ({
                    label: item.ten, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListHanhChinh(options);
                const res = await cayTrongSevices.displayCayTrong(listCayTrong);
                const options1 = res.data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setListCayTrong(options1);
                const res1 = await loaiBenhSevices.displayLoaiBenh(listLoaiBenh);
                const options2 = res1.data.map((item: any) => ({
                    label: item.tenBenh,
                    value: item.id,
                }));
                setListLoaiBenh(options2);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.cropTypeId || !form.loaiBenhId) {
                alert("Vui lòng chọn đơn vị hành chính, cây trồng, loại bệnh!");
                return;
            }
            let res: any = await benhCaySevices.updateBenhCay(form.id, form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setEditedData(null);
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
            administrativeUnitId: selectedOption.target.value,
        });
    };
    const handleCayTrongChange = (selectedOption: any) => {
        setForm({
            ...form,
            cropTypeId: selectedOption.target.value,
        });
    };
    const handleLoaiBenhChange = (selectedOption: any) => {
        setForm({
            ...form,
            loaiBenhId: selectedOption.target.value,
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <Select
                            value={form.administrativeUnit.id}
                            placeholder="Chọn đơn vị hành chính"
                            onChange={handleDVHanhChinhChange}
                        >
                            {listHanhChinh.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Cây trồng:</div>
                        <Select
                            value={form.cropType.id}
                            placeholder="Chọn cây trồng"
                            onChange={handleCayTrongChange}
                        >
                            {listCayTrong.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Loại Bệnh:</div>
                        <Select
                            value={form.loaiBenh.id}
                            placeholder="Chọn loại lệnh"
                            onChange={handleLoaiBenhChange}
                        >
                            {listLoaiBenh.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            type="string"
                            name="diaChi"
                            label="Địa chỉ:"
                            placeholder="Nhập địa chỉ:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="moTa"
                            label="Mô tả:"
                            placeholder="Nhập mô tả:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="hinhAnh"
                            label="Hình ảnh:"
                            placeholder="Nhập link ảnh:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dienTich"
                            label="Diện tích:"
                            placeholder="Nhập diện tích:"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="ngayGhiNhan"
                            label="Ngày ghi nhận:"
                            placeholder="Nhập ngày ghi nhận:"
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
