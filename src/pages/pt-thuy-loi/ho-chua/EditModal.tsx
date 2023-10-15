import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface EditedItem {
    ten: string;
    diaChi: string;
    dungTichThietKe: number;
    dienTichTuoiThietKe: number;
    dienTichTuoiThucTe: number;
    loaiHo: string;
    administrativeUnitId: number;
}

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedItemId: number;
    editedData: EditedItem;
    setEditedData: React.Dispatch<any>;
    onUpdate: (editedItem: EditedItem) => void;
}

export default function ModalEdit({
    isOpen,
    onClose,
    onUpdate,
    editedData,
    editedItemId,
    setEditedData,
}: ModalEditProps) {
    const [editedItem, setEditedItem] = useState<EditedItem>({ ...editedData });

    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
        if (editedData) {
            setEditedItem({ ...editedData });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem((prevEditedItem) => ({
            ...prevEditedItem,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/cong/${editedItemId}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            // Kiểm tra kết quả từ API (response) và xử lý tùy theo kết quả
            if (response.data.statusCode === 1) {
                // Dữ liệu đã được cập nhật thành công trên API
                onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
                setEditedData({}); // Đặt lại editedData trong component cha
                onClose(); // Đóng modal sau khi cập nhật thành công
            } else {
                console.log("lỗi", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size='lg'>
            <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="ten">Tên:</Label>
                        <Input
                            type="text"
                            name="ten"
                            value={editedItem.ten}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="diaChi">Địa Chỉ:</Label>
                        <Input
                            type="text"
                            name="diaChi"
                            value={editedItem.diaChi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dungTichThietKe">Dung Tích Thiết Kế:</Label>
                        <Input
                            type="number"
                            name="dungTichThietKe"
                            value={editedItem.dungTichThietKe}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTuoiThietKe">Diện Tích Tuối Thiết Kế:</Label>
                        <Input
                            type="number"
                            name="dienTichTuoiThietKe"
                            value={editedItem.dienTichTuoiThietKe}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTuoiThucTe">Diện Tích Tuối Thực Tế:</Label>
                        <Input
                            type="number"
                            name="dienTichTuoiThucTe"
                            value={editedItem.dienTichTuoiThucTe}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="loaiHo">Loại Hồ:</Label>
                        <Input
                            type="text"
                            name="loaiHo"
                            value={editedItem.loaiHo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            name="administrativeUnitId"
                            value={editedItem.administrativeUnitId}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveChanges}>
                    Lưu thay đổi
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
}
