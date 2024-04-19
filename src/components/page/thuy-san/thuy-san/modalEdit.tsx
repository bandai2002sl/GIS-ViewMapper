import { useState, useEffect } from "react";
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
import thuySanServices from "~/services/thuySanServices";

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

  useEffect(() => {
    // Check if editedData is not null or undefined
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
      const response = await thuySanServices.updateThuySan(
        editedItemId,
        editedItem
      );
      onUpdate(editedItem);
      setEditedData({}); // Reset editedData in the parent component
      onClose();
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
            <Label for="diaChi">Địa Chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              value={editedItem.diaChi || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="moTa">Mô tả:</Label>
            <Input
              type="text"
              name="moTa"
              value={editedItem.moTa || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="hinhAnh">Hình ảnh:</Label>
            <Input
              type="text"
              name="hinhAnh"
              value={editedItem.hinhAnh || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="tinhTrang">Tình trạng:</Label>
            <Input
              type="text"
              name="tinhTrang"
              value={editedItem.tinhTrang || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="caNhanHtxId">Cá nhân HTX ID:</Label>
            <Input
              type="number"
              name="caNhanHtxId"
              value={editedItem.caNhanHtxId || 0}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="vatNuoiId">Vật Nuôi ID:</Label>
            <Input
              type="number"
              name="vatNuoiId"
              value={editedItem.vatNuoiId || 0}
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
