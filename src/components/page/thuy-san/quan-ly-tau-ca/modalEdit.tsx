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
import quanLyTauCaServices from "~/services/quanLyTauCaServices";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (editedItem: any) => void;
  editedItemId: number;
  editedData: {
    soDangKy: number;
    diaChi: string;
    tinhTrang: string;
    moTa: string;
    ngayDangKy: string;
    administrativeUnitId: number;
    caNhanHTXId: number;
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
      const response = await quanLyTauCaServices.updateTauCa(
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
            <Label for="soDangKy">Số Đăng Ký:</Label>
            <Input
              type="number"
              name="soDangKy"
              value={editedItem.soDangKy || 0}
              onChange={handleInputChange}
            />
          </div>
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
            <Label for="tinhTrang">Tình trạng:</Label>
            <Input
              type="text"
              name="tinhTrang"
              value={editedItem.tinhTrang || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="caNhanHTXId">Cá nhân HTX ID:</Label>
            <Input
              type="number"
              name="caNhanHTXId"
              value={editedItem.caNhanHTXId || 0}
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
