import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface NewData {
  ten: string;
  diaChi: string;
  dungTichThietKe: number;
  dienTichTuoiThietKe: number;
  dienTichTuoiThucTe: number;
  loaiHo: string;
  administrativeUnitId: number;
}

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newData: NewData) => void;
}

export default function ModalAdd({ isOpen, onClose, onSubmit }: ModalAddProps) {
  const [newData, setNewData] = useState<NewData>({
    ten: "",
    diaChi: "",
    dungTichThietKe: 0,
    dienTichTuoiThietKe: 0,
    dienTichTuoiThucTe: 0,
    loaiHo: "",
    administrativeUnitId: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Gọi hàm onSubmit để gửi newData lên server
    onSubmit(newData);
    onClose(); // Đóng modal sau khi thêm mới
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size="lg">
      <ModalHeader toggle={onClose}>THÊM DỮ LIỆU MỚI</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="ten">Tên:</Label>
            <Input type="text" name="ten" value={newData.ten} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input type="text" name="diaChi" value={newData.diaChi} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="dungTichThietKe">Dung tích thiết kế:</Label>
            <Input type="number" name="dungTichThietKe" value={newData.dungTichThietKe} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThietKe">Diện tích tưới thiết kế:</Label>
            <Input type="number" name="dienTichTuoiThietKe" value={newData.dienTichTuoiThietKe} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThucTe">Diện tích tưới thực tế:</Label>
            <Input type="number" name="dienTichTuoiThucTe" value={newData.dienTichTuoiThucTe} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="loaiHo">Loại hồ:</Label>
            <Input type="text" name="loaiHo" value={newData.loaiHo} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input type="number" name="administrativeUnitId" value={newData.administrativeUnitId} onChange={handleInputChange} />
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
