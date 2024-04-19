import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "reactstrap";
import cayTrongSevices from "~/services/cayTrongSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import styles from "~/styles/modal-custom.module.scss";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: any) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  data: any[];
  isEditing: boolean;
}

export default function AddNewItemModal({
  isOpen,
  onClose,
  onSubmit,
  newItem,
  setNewItem,
  isEditing,
}: AddNewItemModalProps) {
  const [errInput, setErrInput] = useState("");
  const [errMess, setErrMess] = useState("");

  const loaiHinh = [
    {
      value: "Tưới",
      label: "Tưới",
    },
    {
      value: "Tiêu",
      label: "Tiêu",
    },
  ];

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [cropType, setCropType] = useState<
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

    cayTrongSevices.displayCayTrong().then((res) => {
      setCropType(
        res.data.map((x: { id: any; name: any }) => {
          return {
            value: x.id,
            label: x.name,
          };
        })
      );
    });
  }, []);

  const checkValidInput = () => {
    setErrInput("");
    setErrMess("");
    if (newItem.dienTich === 0) {
      setErrInput("dienTich");
      setErrMess("Dien Tich cannot be 0");
    } else if (!newItem.ngayThongKe) {
      setErrInput("ngayThongKe");
      setErrMess("Bạn chưa nhập ngay Thong Ke");
    } else if (!newItem.hinhThuc) {
      setErrInput("hinhThuc");
      setErrMess("Bạn chưa nhập hinh Thuc");
    } else if (newItem.administrativeUnitId === 0) {
      setErrInput("administrativeUnitId");
      setErrMess("Administrative Unit ID cannot be 0");
    } else if (newItem.cropTypeId === 0) {
      setErrInput("cropTypeId");
      setErrMess("Crop Type ID cannot be 0");
    }
  };

  const handleSave = () => {
    checkValidInput();
    onSubmit(newItem);
    onClose();
  };
  const icons = [
    {
      value: "tuoitieu1",
      label: "tưới",
      iconPath: "/images/tuoitieu/tuoitieu1.png",
    },
    {
      value: "tuoitieu2",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu2.png",
    },
    {
      value: "tuoitieu3",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu3.png",
    },
    {
      value: "tuoitieu4",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu4.png",
    },
    {
      value: "tuoitieu5",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu5.png",
    },
    {
      value: "tuoitieu6",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu6.png",
    },
    {
      value: "tuoitieu7",
      label: "tưới",
      iconPath: "/images/icons/tuoitieu7.png",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
      scrollable
    >
      <ModalHeader toggle={onClose}>
        {isEditing ? "CẬP NHẬT" : "THÊM MỚI"}
      </ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="dienTich">Diện Tích:</Label>
            <Input
              type="number"
              id="dienTich"
              placeholder="Diện Tích"
              value={newItem.dienTich || 0}
              onChange={(e: { target: { value: string; }; }) =>
                setNewItem({
                  ...newItem,
                  dienTich: parseFloat(e.target.value) || 0,
                })
              }
            />
            {errInput === "dienTich" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="ngayThongKe">Ngày Thống Kê:</Label>
            <Input
              type="text"
              id="ngayThongKe"
              placeholder="Ngày Thống Kê"
              value={newItem.ngayThongKe || ""}
              onChange={(e: { target: { value: any; }; }) =>
                setNewItem({ ...newItem, ngayThongKe: e.target.value || "" })
              }
            />
            {errInput === "ngayThongKe" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>

          <div className="input-container">
            <Label for="diaChi">Tọa độ:</Label>
            <Input
              type="text"
              id="toaDo"
              placeholder="Tọa độ"
              value={newItem.toaDo || ""}
              onChange={(e: { target: { value: any; }; }) =>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={option.iconPath}
                    style={{ width: "20px", marginRight: "10px" }}
                    alt={option.label}
                  />
                  {option.label}
                </div>
              )}
              onChange={(e) => setNewItem({ ...newItem, icon: e?.value })}
            />
            {errInput === "icon" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>

          <div className="input-container">
            <Label for="hinhThuc">Hình Thức:</Label>
            <ReactSelect
              name="hinhThuc"
              placeholder="Hình thức"
              options={loaiHinh}
              value={loaiHinh.find((x) => x.value == newItem?.hinhThuc)}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  hinhThuc: e?.value,
                })
              }
            />
            {errInput === "hinhThuc" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>

          <div className="input-container">
            <Label for="cropTypeId">Loại cây trồng:</Label>
            <ReactSelect
              name="cropTypeId"
              placeholder="Loại cây trồng"
              options={cropType}
              value={cropType.find((x) => x.value == newItem?.cropTypeId)}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  cropTypeId: e?.value ?? 0,
                })
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
