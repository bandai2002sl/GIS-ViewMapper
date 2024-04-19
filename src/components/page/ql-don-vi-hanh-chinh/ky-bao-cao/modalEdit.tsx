import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import Form, { Input } from "~/components/common/Form";
import styles from "~/pages/modal-custom.module.scss";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";

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



    const handleSubmit = async () => {
        try {
            let res: any = await kyBaoCaoSevices.updateKyBaoCao(form.id, form);
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
    const trangThai = [
        {
          value: "Công khai",
          label: "Công khai",
        },
        {
          value: "Riêng tư",
          label: "Riêng tư",
        },
      ];

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>CẬP NHẬT</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="tenBaoCao"
                            label="Tên báo cáo"
                            placeholder="Nhập tên báo cáo"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="thoiDiemBatDau"
                            label="Thời điểm bắt đầu"
                            placeholder="Nhập thời điểm bắt đầu"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="thoiDiemKetThuc"
                            label="Thời điểm kết thúc"
                            placeholder="Nhập thời điểm kết thúc"
                            isRequired
                        />
                        <div className={styles["form-group"]}>
                        <label htmlFor="trangThai">Trạng thái :</label>
                        <select 
                            name="trangThai" 
                            value={form.trangThai} 
                            onChange={(e) => setForm({ ...form, trangThai: e.target.value })}
                            required
                             >
                             {trangThai.map(option => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                         </option>
                       ))}
                      </select>
                    </div>
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
