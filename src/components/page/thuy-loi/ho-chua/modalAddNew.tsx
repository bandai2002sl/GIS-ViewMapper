import React, { useEffect, useState } from "react";
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
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import ReactSelect from "react-select";

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
  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const icons = [
    {
      value: "hochua1",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua1.png",
    },
    {
      value: "hochua2",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua2.png",
    },
    {
      value: "hochua3",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua3.png",
    },
    {
      value: "hochua4",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua4.png",
    },
    {
      value: "hochua5",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua5.png",
    },
    {
      value: "hochua6",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua6.png",
    },
    {
      value: "hochua7",
      label: "Hồ chứa nước",
      iconPath: "/images/icons/hochua7.png",
    },
  ];

  const loaiHo = [
    {
      value: "Đập hồ chứa quan trọng đặc biệt",
      label: "Đập hồ chứa quan trọng đặc biệt",
    },
    {
      value: "Đập hồ chứa nước lớn",
      label: "Đập hồ chứa nước lớn",
    },
    {
      value: "Đập hồ chứa nước vừa",
      label: "Đập hồ chứa nước vừa",
    },
    {
      value: "Đập hồ chứa nước nhỏ",
      label: "Đập hồ chứa nước nhỏ",
    },
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
  const checkValidInput = () => {
    setErrInput("");
    setErrMess("");
    if (!newItem.ten) {
      setErrInput("ten");
      setErrMess("Tên không được để trống");
    } else if (!newItem.diaChi) {
      setErrInput("diaChi");
      setErrMess("Địa Chỉ không được để trống");
    } else if (newItem.dungTichThietKe === 0) {
      setErrInput("dungTichThietKe");
      setErrMess("Dung Tích Thiết Kế không được để trống");
    } else if (newItem.dienTichTuoiThietKe === 0) {
      setErrInput("dienTichTuoiThietKe");
      setErrMess("Diện Tích Tưới Thiết Kế không được để trống");
    } else if (newItem.dienTichTuoiThucTe === 0) {
      setErrInput("dienTichTuoiThucTe");
      setErrMess("Diện Tích Tưới Thực Tế không được để trống");
    } else if (!newItem.loaiHo) {
      setErrInput("loaiHo");
      setErrMess("Loại Hồ không được để trống");
    } else if (newItem.administrativeUnitId === 0) {
      setErrInput("administrativeUnitId");
      setErrMess("Administrative Unit ID không được để trống");
    }
  };

  const handleSave = () => {
    checkValidInput();
    onSubmit(newItem);
    onClose();
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
        {isEditing ? "CẬP NHẬT" : "THÊM MỚI"}
      </ModalHeader>
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
            <Label for="dungTichThietKe">Dung Tích Thiết Kế:</Label>
            <Input
              type="number"
              id="dungTichThietKe"
              placeholder="Dung Tích Thiết Kế"
              value={newItem.dungTichThietKe || 0}
              onChange={(e: { target: { value: string; }; }) =>
                setNewItem({
                  ...newItem,
                  dungTichThietKe: parseFloat(e.target.value) || 0,
                })
              }
            />
            {errInput === "dungTichThietKe" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThietKe">Diện Tích Tưới Thiết Kế:</Label>
            <Input
              type="number"
              id="dienTichTuoiThietKe"
              placeholder="Diện Tích Tưới Thiết Kế"
              value={newItem.dienTichTuoiThietKe || 0}
              onChange={(e: { target: { value: string; }; }) =>
                setNewItem({
                  ...newItem,
                  dienTichTuoiThietKe: parseFloat(e.target.value) || 0,
                })
              }
            />
            {errInput === "dienTichTuoiThietKe" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="dienTichTuoiThucTe">Diện Tích Tưới Thực Tế:</Label>
            <Input
              type="number"
              id="dienTichTuoiThucTe"
              placeholder="Diện Tích Tưới Thực Tế"
              value={newItem.dienTichTuoiThucTe || 0}
              onChange={(e: { target: { value: string; }; }) =>
                setNewItem({
                  ...newItem,
                  dienTichTuoiThucTe: parseFloat(e.target.value) || 0,
                })
              }
            />
            {errInput === "dienTichTuoiThucTe" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="loaiHo">Loại Hồ:</Label>
            <ReactSelect
              name="loaiHo"
              placeholder="Loại hồ"
              value={loaiHo.find((x) => x.value == newItem.loaiHo)}
              options={loaiHo}
              onChange={(e) => setNewItem({ ...newItem, loaiHo: e?.value })}
            />
            {errInput === "loaiHo" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
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
          {errInput === "administrativeUnitId" ? (
            <div className="text-danger">{errMess}</div>
          ) : (
            ""
          )}
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
