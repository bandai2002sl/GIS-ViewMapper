import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";
import router from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";
import Form, { Input } from "~/components/common/Form";
import Select from "~/components/common/Select";
import ReactSelect from "react-select";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import sanXuatThuySanSevices from "~/services/sanXuatThuySanServices";
import tauCaServices from "~/services/quanLyTauCaServices";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function InputValidation() {
  const [errInput, setErrinput] = useState("");
  const [errMess, setErrMess] = useState("");

  const checkValidInput = (newItem: any) => {
    setErrinput("");
    setErrMess("");
    let arrInput = [
      "diaDiem",
      "hinhAnh",
      "dangKyKinhDoanh",
      "sdt",
      "trangThai",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!newItem[arrInput[i]]) {
        setErrinput(arrInput[i]);
        setErrMess("Bạn chưa nhập dữ liệu");
        break;
      }
    }
  };
  return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({
  isOpen,
  onClose,
  data,
}: AddNewItemModalProps) {
  const { errInput, errMess, checkValidInput } = InputValidation();

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);
  // Định nghĩa một mảng các icon từ Flaticon
  const icons = [
    { value: "tauca1", label: "Tàu cá", iconPath: "/images/icons/tauca1.png" },
    { value: "tauca2", label: "Tàu cá", iconPath: "/images/icons/tauca2.png" },
    { value: "tauca3", label: "Tàu cá", iconPath: "/images/icons/tauca3.png" },
    { value: "tauca4", label: "Tàu cá", iconPath: "/images/icons/tauca4.png" },
    { value: "tauca5", label: "Tàu cá", iconPath: "/images/icons/tauca5.png" },
    { value: "tauca6", label: "Tàu cá", iconPath: "/images/icons/tauca6.png" },
    { value: "tauca7", label: "Tàu cá", iconPath: "/images/icons/tauca7png" },
  ];

  const [htx, setHtx] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [form, setForm] = useState(data);

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

    hopTacXaSevices.displayHopTacXa().then((res) => {
      setHtx(
        res.data.map((x: { id: any; name: any }) => {
          return {
            value: x.id,
            label: x.name,
          };
        })
      );
    });
  }, []);

  const handleSubmit = async () => {
    checkValidInput(form);

    try {
      let res: any = !data?.id
        ? await tauCaServices.createTauCa(form)
        : await tauCaServices.updateTauCa(data.id, form);
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({});
      } else {
        toastError({ msg: "Không thành công." });
      }
    } catch (error) {
      toastError({ msg: "Không thành công. Vui lòng nhập lại dữ liệu" });
    }
  };

  return (
    <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
      <Modal
        isOpen={isOpen}
        toggle={onClose}
        className={styles["modal-container"]}
        size="lg"
        scrollable
      >
        <ModalHeader toggle={onClose}>
          {!data.id ? "THÊM MỚI" : "CẬP NHẬT"}
        </ModalHeader>
        <ModalBody>
          <div className={styles["modal-body"]}>
            <div className="input-container">
              <Label for="diaDiem">Số đăng ký:</Label>
              <Input type="number" placeholder="Số đăng ký" name="soDangKy" />
            </div>
            <div className="input-container">
              <Label for="diaChi">Địa chỉ:</Label>
              <Input type="text" placeholder="Địa chỉ" name="diaChi" />
            </div>
            <div className="input-container">
              <Label for="dangKyKinhDoanh">Mô tả:</Label>
              <Input type="text" name="moTa" placeholder="Mô tả" />
            </div>
            <div className="input-container">
              <Label for="trangThai">Trạng thái:</Label>
              <Input type="text" name="tinhTrang" placeholder="Trạng thái" />
            </div>
            <div className="input-container">
              <Label for="toaDo">Tọa độ:</Label>
              <Input type="text" name="toaDo" placeholder="Tọa độ" />
            </div>
            <div className="input-container">
              <Label for="administrativeUnitId">Đơn vị hành chính:</Label>
              <ReactSelect
                name="administrativeUnitId"
                placeholder="Đơn vị hành chính"
                options={donViHanhChinh}
                value={donViHanhChinh.find(
                  (x) => x.value == form?.administrativeUnitId
                )}
                onChange={(e) =>
                  setForm({ ...form, administrativeUnitId: e?.value ?? 0 })
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
                      alt={option.label}
                      style={{ marginRight: 10, width: 20 }}
                    />
                    {option.label}
                  </div>
                )}
                value={icons.find((x) => x.value == form.icon)}
                onChange={(selectedOption) =>
                  setForm({ ...form, icon: selectedOption?.value ?? "" })
                }
              />
            </div>

            <div className="input-container">
              <Label for="caNhanHtxId">Hợp tác xã:</Label>
              <ReactSelect
                name="caNhanHtxId"
                placeholder="Cá nhân hợp tác xã"
                options={htx}
                value={htx.find((x) => x.value == form?.caNhanHTXId)}
                onChange={(e) =>
                  setForm({ ...form, caNhanHTXId: e?.value ?? 0 })
                }
              />
            </div>
          </div>
        </ModalBody>

        <div className={styles["modal-footer"]}>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              Lưu
            </Button>{" "}
            <Button color="secondary" onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </Form>
  );
}
