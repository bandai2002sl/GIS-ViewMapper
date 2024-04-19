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
    ten: string;
    diaChi: string;
    dungTichThietKe: number;
    dienTichTuoiThietKe: number;
    dienTichTuoiThucTe: number;
    loaiHo: string;
    administrativeUnitId: number;
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
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              name="ten"
              value={editedItem.ten}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              value={editedItem.diaChi}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="dungTichThietKe">Dung tích thiết kế:</Label>
            <Input
              type="number"
              name="dungTichThietKe"
              value={editedItem.dungTichThietKe}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThietKe">Diện tích tưới thiết kế:</Label>
            <Input
              type="number"
              name="dienTichTuoiThietKe"
              value={editedItem.dienTichTuoiThietKe}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThucTe">Diện tích tưới thực tế:</Label>
            <Input
              type="number"
              name="dienTichTuoiThucTe"
              value={editedItem.dienTichTuoiThucTe}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="loaiHo">Loại hồ:</Label>
            <Input
              type="text"
              name="loaiHo"
              value={editedItem.loaiHo}
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
