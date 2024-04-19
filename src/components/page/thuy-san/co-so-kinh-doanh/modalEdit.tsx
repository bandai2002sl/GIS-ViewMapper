import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (editedItem: any) => void;
  editedItemId: number;
  editedData: any;
  setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
  isOpen,
  onClose,
  onUpdate,
  editedData,
  editedItemId,
  setEditedData,
}: ModalEditProps) {
  const [editedItem, setEditedItem] = useState({ ...editedData });

  const [editedX, setEditedX] = useState("");
  const [editedY, setEditedY] = useState("");
  useEffect(() => {
    // Kiểm tra nếu editedData không phải là null hoặc undefined
    if (editedData) {
      setEditedItem({ ...editedData });
    }
  }, [editedData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await coSoKinhDoanhSevices.updateCoSoKinhDoanh(
        editedItem.id,
        editedItem
      );
      onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
      setEditedData({}); // Đặt lại editedData trong component cha
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      backdrop={false}
      size="lg"
    >
      <ModalHeader toggle={onClose}>CẬP NHẬT</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="diaDiem">Địa điểm:</Label>
            <Input
              type="text"
              name="diaDiem"
              value={editedItem.diaDiem}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="hinhAnh">Hình ảnh:</Label>
            <Input
              type="text"
              name="hinhAnh"
              value={editedItem.hinhAnh}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="dangKyKinhDoanh">Đăng ký kinh doanh</Label>
            <Input
              type="text"
              name="dangKyKinhDoanh"
              value={editedItem.dangKyKinhDoanh}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="sdt">Sdt:</Label>
            <Input
              type="text"
              name="sdt"
              value={editedItem.sdt}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="trangThai">Trạng thái:</Label>
            <Input
              type="text"
              name="trangThai"
              value={editedItem.trangThai}
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
