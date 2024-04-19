import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "reactstrap";
import ReactSelect from "react-select";
import styles from "~/styles/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (editedItem: any) => void;
  editedItemId: number;
  editedData: {
    ten: string;
    diaChi: string;
    kichCo: string;
    loaiKichThuoc: string;
    loaiHinh: string;
    administrativeUnitId: number;
    toaDo: string;
    icon: string;
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
      onUpdate(editedItem);
      setEditedData({});
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const kichCo = [
    {
      value: "Lớn",
      label: "Lớn",
    },
    {
      value: "Vừa",
      label: "Vừa",
    },
    {
      value: "Nhỏ",
      label: "Nhỏ",
    },
  ];

  const loaiHinh = [
    {
      value: "Tưới",
      label: "Tưới",
    },
    {
      value: "Tiêu",
      label: "Tiêu",
    },
    {
      value: "Tưới tiêu kết hợp",
      label: "Tưới tiêu kết hợp",
    },
  ];

  const icons = [
    { value: "cong1", label: "Cống", iconPath: "/images/icons/cong1.png" },
    { value: "cong2", label: "Cống", iconPath: "/images/icons/cong2.png" },
    { value: "cong3", label: "Cống", iconPath: "/images/icons/cong3.png" },
    { value: "cong4", label: "Cống", iconPath: "/images/icons/cong4.png" },
    { value: "cong5", label: "Cống", iconPath: "/images/icons/cong5.png" },
    { value: "cong6", label: "Cống", iconPath: "/images/icons/cong6.png" },
    { value: "cong7", label: "Cống", iconPath: "/images/icons/cong7.png" },
  ];

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    donViHanhChinhSevices.displayDonViHanhChinh().then((res) => {
      setDonViHanhChinh(
        res.data.map((x: { id: any; ten: any }) => {
          return {
            value: x.id,
            label: x.ten,
          };
        })
      );
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      backdrop={false}
      size="lg"
      scrollable
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
            <Label for="kichCo">Kích cỡ:</Label>
            <Input
              type="text"
              name="kichCo"
              value={editedItem.kichCo}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <Label for="toaDo">Toạ độ:</Label>
            <Input
              type="text"
              name="toaDo"
              value={editedItem.toaDo}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <Label for="icon">Biểu tượng:</Label>
            <ReactSelect
              name="icon"
              placeholder="Chọn Biểu tượng"
              options={icons}
              getOptionLabel={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={option.iconPath}
                    style={{ width: "20px", marginRight: "10px" }}
                    alt={option.label}
                  />
                  {option.label}
                </div>
              )}
              value={icons.find((icon) => icon.value === editedItem.icon)}
              onChange={(e) => setEditedItem({ ...editedItem, icon: e?.value })}
            />
          </div>

          <div className="input-container">
            <Label for="loaiKichThuoc">Loại kích thước:</Label>
            <ReactSelect
              name="loaiKichThuoc"
              placeholder="Loại kích thước"
              options={kichCo}
              onChange={(e) =>
                setEditedItem({ ...editedItem, loaiKichThuoc: e?.value })
              }
            />
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại hình:</Label>
            <ReactSelect
              name="loaiHinh"
              placeholder="Loại hình"
              options={loaiHinh}
              onChange={(e) =>
                setEditedItem({ ...editedItem, loaiHinh: e?.value })
              }
            />
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Đơn vị hành chính:</Label>
            <ReactSelect
              name="administrativeUnitId"
              placeholder="Đơn vị hành chính"
              options={donViHanhChinh}
              value={donViHanhChinh.find(
                (x) => x.value === editedItem.administrativeUnitId
              )}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  administrativeUnitId: e?.value,
                })
              }
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
