import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastError, toastSuccess } from "~/common/func/toast";
import Form, { Input } from "~/components/common/Form";
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";

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
    const [form, setForm] = useState({ ...editedData })

    function hasSpecialCharacters(input: any) {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return regex.test(input);
    }
    const regex = /^point\(\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s*\)$/i;
    const handleSubmit = async () => {
        try {
            if (hasSpecialCharacters(form.maHanhChinh) || form.maHanhChinh.length > 50 || !/^[A-Za-z0-9]+$/.test(form.maHanhChinh)) {
                alert("Mã hành chính dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.ten.length > 255) {
                alert("Tên hành chính dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            }
            if (parseInt(form.capHanhChinh, 10) <= 0 || form.capHanhChinh.length > 10) {
                alert("Cấp hành chính dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.tenVietTat.length > 50) {
                alert("Tên viết tắt  dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            }
            const matches = form.toaDo.match(regex);
            if (!regex.test(form.toaDo)) {
                alert("Tọa độ dũ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (matches) {
                const longitude = parseFloat(matches[1]);
                const latitude = parseFloat(matches[3]);
                if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
                    alert("Tọa độ dữ liệu không hợp lệ! vui lòng nhập lại");
                    return;
                }
            }
            let res: any = await donViHanhChinhSevices.updateDonViHanhChinh(form.id, form);
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
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>CẬP NHẬT</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="maHanhChinh"
                            label="Mã hành chính"
                            placeholder="Nhập mã hành chính"
                            isRequired
                        />
                        <Input
                            name="ten"
                            label="Tên hành chính"
                            placeholder="Nhập tên hành chính"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="capHanhChinh"
                            label="Cấp hành chính"
                            placeholder="nhập cấp hành chính"
                            isRequired
                        />
                        <Input
                            name="tenVietTat"
                            label="Tên viết tắt"
                            placeholder="Nhập tên viết tắt"
                            isRequired
                        />
                        <Input
                            name="toaDo"
                            label="Tọa độ: Point(X Y)"
                            placeholder="Nhập tọa độ"
                            isRequired
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        Lưu thay đổi
                    </Button>
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Form>
        </Modal >
    );
}
