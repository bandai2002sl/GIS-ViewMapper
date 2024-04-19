/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import styles from "~/pages/modal-custom.module.scss";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onEdit: (editedItem: any) => void;
}

function EditItemModal({ isOpen, onClose, item, onEdit }: EditItemModalProps) {
  if (!item) {
    return null; // Hoặc thực hiện xử lý khác tùy theo yêu cầu của bạn
  }
  const [editedData, setEditedData] = useState<any>(item);

  useEffect(() => {
    setEditedData(item);
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Validate editedData here if needed
    onEdit(editedData);
    onClose();
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
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              name="ten"
              value={editedData.ten}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              value={editedData.diaChi}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="congXuat">Công xuất:</Label>
            <Input
              type="number"
              name="congXuat"
              value={editedData.congXuat}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại hình:</Label>
            <Input
              type="text"
              name="loaiHinh"
              value={editedData.loaiHinh}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input
              type="number"
              name="administrativeUnitId"
              value={editedData.administrativeUnitId}
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

export default EditItemModal;
