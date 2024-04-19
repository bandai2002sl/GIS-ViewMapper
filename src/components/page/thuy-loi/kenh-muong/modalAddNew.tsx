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
    } else if (newItem.chieuDai === 0) {
      setErrInput("chieuDai");
      setErrMess("Chiều dài không được để trống");
    } else if (newItem.chieuDaiKienCo === 0) {
      setErrInput("chieuDaiKienCo");
      setErrMess("Chiều dài kiến có không được để trống");
    } else if (newItem.administrativeUnitId === 0) {
      setErrInput("administrativeUnitId");
      setErrMess("Administrative Unit ID không được để trống");
    }
  };
  
  const icons = [
    { value: "kenh1", label: "Kênh", iconPath: "/images/icons/kenh1.png" },
    { value: "kenh2", label: "Kênh", iconPath: "/images/icons/kenh2.png" },
    { value: "kenh3", label: "Kênh", iconPath: "/images/icons/kenh3.png" },
    { value: "kenh4", label: "kênh", iconPath: "/images/icons/kenh4.png" },
    { value: "kenh5", label: "kênh", iconPath: "/images/icons/kenh5.png" },
    ,
  ];

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
              onChange={(e) =>
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
            <Label for="chieuDai">Chiều Dài:</Label>
            <Input
              type="number"
              id="chieuDai"
              placeholder="Chiều Dài"
              value={newItem.chieuDai || 0}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  chieuDai: parseInt(e.target.value) || 0,
                })
              }
            />
            {errInput === "chieuDai" ? (
              <div className="text-danger">{errMess}</div>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <Label for="chieuDaiKienCo">Chiều Dài Kiến Có:</Label>
            <Input
              type="number"
              id="chieuDaiKienCo"
              placeholder="Chiều Dài Kiến Có"
              value={newItem.chieuDaiKienCo || 0}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  chieuDaiKienCo: parseInt(e.target.value) || 0,
                })
              }
            />
            {errInput === "chieuDaiKienCo" ? (
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
