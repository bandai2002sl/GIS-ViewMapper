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
import tramBomServices from "~/services/tramBomServices";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (editedItem: any) => void;
  editedItemId: number;
  editedData: {
    dienTich: number;
    ngayThongKe: string;
    hinhThuc: string;
    administrativeUnitId: number;
    cropTypeId: number;
  };
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
      const response = await tramBomServices.update(editedItemId, editedItem);
      onUpdate(editedItem);
      setEditedData({});
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
            <Label for="dienTich">Diện tích:</Label>
            <Input
              type="number"
              name="dienTich"
              value={editedItem.dienTich}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="ngayThongKe">Ngày thống kê:</Label>
            <Input
              type="text"
              name="ngayThongKe"
              value={editedItem.ngayThongKe}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="hinhThuc">Hình thức:</Label>
            <Input
              type="text"
              name="hinhThuc"
              value={editedItem.hinhThuc}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input
              type="number"
              name="administrativeUnitId"
              value={editedItem.administrativeUnitId}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="cropTypeId">Crop Type ID:</Label>
            <Input
              type="number"
              name="cropTypeId"
              value={editedItem.cropTypeId}
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
