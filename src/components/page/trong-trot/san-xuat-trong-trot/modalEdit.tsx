import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import cayTrongSevices from "~/services/cayTrongSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import sanXuatTrongTrotSevices from "~/services/sanXuatTrongTrotSevices";

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
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.cropTypeId) {
                alert("Vui lòng chọn đơn vị hành chính, cây trồng!");
                return;
            }
            let res: any = await sanXuatTrongTrotSevices.updateSanXuatTrongTrot(form.id, form);
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
                        <Input
                            type="number"
                            name="dienTichTrong"
                            label="Diện tích trồng:"
                            placeholder="Nhập diện tích trồng:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dienTichTrongMoi"
                            label="Diện tích trồng mới:"
                            placeholder="Nhập diện tích trồng mới:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dienTichChoSanPham"
                            label="Diện tích cho sản phẩm:"
                            placeholder="Nhập diện tích cho sản phẩm:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="nangSuat"
                            label="Năng suất:"
                            placeholder="Nhập năng suất:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="sanLuong"
                            label="Sản lượng:"
                            placeholder="Nhập sản lượng:"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="thoiDiemBaoCao"
                            label="Thời điểm báo cáo"
                            placeholder="Nhập thời điểm báo cáo"
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
