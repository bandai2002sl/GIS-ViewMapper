import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactSelect from "react-select";
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
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";

interface DataItem {
  id: number;
  ten: string;
  diaChi: string;
  congXuat: number;
  loaiHinh: string;
  toaDo: string;
  icon: string;
  administrativeUnitId: number;
}

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: any) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  isEditing : boolean;
}

export default function AddNewItemModal({
  isOpen,
  onClose,
  onSubmit,
  newItem,
  setNewItem,
  isEditing ,
}: AddNewItemModalProps) {
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

  const [errors, setErrors] = useState<Record<keyof DataItem, string>>({
    id: "",
    ten: "",
    diaChi: "",
    congXuat: "",
    loaiHinh: "",
    administrativeUnitId: "",
    toaDo: "",
    icon: "",
  });

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
    { value: 'trambom1', label: 'Trạm bơm', iconPath: "/images/icons/trambom1.png" },
    { value: 'trambom2', label: 'Trạm bơm', iconPath: "/images/icons/trambom2.png" },
    { value: 'trambom3', label: 'Trạm bơm', iconPath: "/images/icons/trambom3.png" },
    { value: 'trambom4', label: 'Trạm bơm', iconPath: "/images/icons/trambom4.png" },
    { value: 'trambom5', label: 'Trạm bơm', iconPath: "/images/icons/trambom5.png" },
    { value: 'trambom6', label: 'Trạm bơm', iconPath: "/images/icons/trambom6.png" },
    { value: 'trambom7', label: 'Trạm bơm', iconPath: "/images/icons/trambom7.png" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof DataItem;
    const value = e.target.value;

    setNewItem({ ...newItem, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = () => {
    const newErrors: Record<keyof DataItem, string> = {
      id: "",
      ten: "",
      diaChi: "",
      congXuat: "",
      loaiHinh: "",
      administrativeUnitId: "",
      toaDo: "",
      icon: "",
    };
    

    // Kiểm tra tính hợp lệ của các trường đầu vào
    for (const field in newItem) {
      if (!newItem[field as keyof DataItem]) {
        newErrors[field as keyof DataItem] = "Bạn chưa nhập đủ thông tin";
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      // Nếu không có lỗi, gửi thông tin mục mới
      onSubmit(newItem);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
      scrollable
    >
      <ModalHeader toggle={onClose}>
        {isEditing ? 'CẬP NHẬT' : 'THÊM MỚI'}
      </ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              name="ten"
              id="ten"
              placeholder="Tên"
              value={newItem.ten}
              onChange={handleChange}
            />
            {errors.ten && <div className="text-danger">{errors.ten}</div>}
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              id="diaChi"
              placeholder="Địa chỉ"
              value={newItem.diaChi}
              onChange={handleChange}
            />
            {errors.diaChi && (
              <div className="text-danger">{errors.diaChi}</div>
            )}
          </div>
          <div className="input-container">
            <Label for="congXuat">Công xuất:</Label>
            <Input
              type="text"
              name="congXuat"
              id="congXuat"
              placeholder="Công xuất"
              value={newItem.congXuat}
              onChange={handleChange}
            />
            {errors.congXuat && (
              <div className="text-danger">{errors.congXuat}</div>
            )}
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại Hình:</Label>
            <ReactSelect
              name="loaiHinh"
              placeholder="Loại hình"
              options={loaiHinh}
              value={loaiHinh.find((x) => x.value == newItem?.loaiHinh)}
              onChange={(e) => setNewItem({ ...newItem, loaiHinh: e?.value })}
            />
          </div>
          <div className="input-container">
            <Label for="diaChi">Tọa độ:</Label>
            <Input
              type="text"
              id="toaDo"
              placeholder="Tọa độ"
              value={newItem.toaDo || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, toaDo: e.target.value || "" })
              }
            />
          </div>

          <div className="input-container">
          <Label for="icon">Biểu tượng:</Label>
          <ReactSelect
            name="icon"
            placeholder="Chọn Biểu tượng"
            options={icons}
            getOptionLabel={(option) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={option.iconPath} alt={option.label} style={{ marginRight: 10, width: 20 }} />
                {option.label}
              </div>
            )}
            value={icons.find((x) => x.value == newItem.icon)}
            onChange={(e) => setNewItem({ ...newItem, icon: e?.value })}
          />
        </div>

          <div className="input-container">
            <Label for="administrativeUnitId">Đơn vị hành chính:</Label>
            <ReactSelect
              name="administrativeUnitId"
              placeholder="Đơn vị hành chính"
              options={donViHanhChinh}
              value={donViHanhChinh.find(
                (x) => x.value == newItem?.administrativeUnitId
              )}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  administrativeUnitId: e?.value ?? 0,
                })
              }
            />
          </div>
        </div>
      </ModalBody>
      <div className={styles["modal-footer"]}>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Lưu
          </Button>{" "}
          <Button color="secondary" onClick={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}
