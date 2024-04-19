import React, { useEffect, useState } from "react";
import { IconBase } from "react-icons";
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
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: any) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  data: any[];
}

export default function AddNewItemModal({
  isOpen,
  onClose,
  onSubmit,
  newItem,
  setNewItem,
}: AddNewItemModalProps) {
  const [errInput, setErrInput] = useState("");
  const [errMess, setErrMess] = useState("");

  const checkValidInput = () => {
    setErrInput("");
    setErrMess("");
    if (!newItem.ten) {
      setErrInput("ten");
      setErrMess("Bạn chưa nhập dữ liệu tên");
    } else if (!newItem.diaChi) {
      setErrInput("diaChi");
      setErrMess("Bạn chưa nhập dữ liệu địa chỉ");
    } else if (!newItem.kichCo) {
      setErrInput("kichCo");
      setErrMess("Bạn chưa nhập dữ liệu kích cỡ");
    } else if (!newItem.loaiKichThuoc) {
      setErrInput("loaiKichThuoc");
      setErrMess("Bạn chưa nhập dữ liệu loại kích thước");
    } else if (!newItem.loaiHinh) {
      setErrInput("loaiHinh");
      setErrMess("Bạn chưa nhập dữ liệu loại hình");
    } else if (newItem.administrativeUnitId === 0) {
      setErrInput("administrativeUnitId");
      setErrMess("Bạn chưa nhập dữ liệu administrativeUnitId");
    }
  };

  const handleSave = () => {
    checkValidInput();
    onSubmit(newItem);
    onClose();
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

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);
  const icons = [
    { value: "cong1", label: "Cống", iconPath: "/images/icons/cong1.png" },
    { value: "cong2", label: "Cống", iconPath: "/images/icons/cong2.png" },
    { value: "cong3", label: "Cống", iconPath: "/images/icons/cong3.png" },
    { value: "cong4", label: "Cống", iconPath: "/images/icons/cong4.png" },
    { value: "cong5", label: "Cống", iconPath: "/images/icons/cong5.png" },
    { value: "cong6", label: "Cống", iconPath: "/images/icons/cong6.png" },
    { value: "cong7", label: "Cống", iconPath: "/images/icons/cong7.png" },
  ];

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
      size="lg"
    >
      <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              id="ten"
              placeholder="Tên"
              value={newItem.ten || ""}
              onChange={(e: { target: { value: any; }; }) =>
                setNewItem({ ...newItem, ten: e.target.value || "" })
              }
            />
            {errInput === "ten" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa Chỉ:</Label>
            <Input
              type="text"
              id="diaChi"
              placeholder="Địa Chỉ"
              value={newItem.diaChi || ""}
              onChange={(e: { target: { value: any; }; }) =>
                setNewItem({ ...newItem, diaChi: e.target.value || "" })
              }
            />
            {errInput === "diaChi" ? (
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
            {errInput === "toaDo" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>

          <div className="input-container">
            <Label for="icon">Biểu tượng:</Label>
            <ReactSelect
              name="icon"
              placeholder="Biểu tượng"
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
            <Label for="kichCo">Kích Cỡ:</Label>
            <Input
              type="text"
              id="kichCo"
              placeholder="Kích cỡ"
              value={newItem.kichCo || ""}
              onChange={(e: { target: { value: any; }; }) =>
                setNewItem({ ...newItem, kichCo: e.target.value || "" })
              }
            />
            {errInput === "kichCo" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="loaiKichThuoc">Loại Kích Thước:</Label>
            <ReactSelect
              name="loaiKichThuoc"
              placeholder="Loại kích thước"
              options={kichCo}
              onChange={(e) =>
                setNewItem({ ...newItem, loaiKichThuoc: e?.value })
              }
            />
            {errInput === "loaiKichThuoc" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại Hình:</Label>
            <ReactSelect
              name="loaiHinh"
              placeholder="Loại hình"
              options={loaiHinh}
              onChange={(e) => setNewItem({ ...newItem, loaiHinh: e?.value })}
            />
            {errInput === "loaiHinh" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
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
            {errInput === "administrativeUnitId" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
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
