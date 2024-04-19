import React, { useEffect, useRef, useState } from "react";
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
import ReactSelect from "react-select";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import uploadFileService from "~/services/uploadFileService";

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
  const icons = [
    {
      value: "cosokinhdoanh1",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh1.png",
    },
    {
      value: "cosokinhdoanh2",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh2.png",
    },
    {
      value: "cosokinhdoanh3",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh3.png",
    },
    {
      value: "cosokinhdoanh4",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh4.png",
    },
    {
      value: "cosokinhdoanh5",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh5.png",
    },
    {
      value: "cosokinhdoanh6",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh6.png",
    },
    {
      value: "cosokinhdoanh7",
      label: "cơ sở kinh doanh",
      iconPath: "/images/icons/cosokinhdoanh7.png",
    },
  ];

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [loaiKinhDoanh, setLoaiKinhDoanh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [htx, setHtx] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [form, setForm] = useState(data);
  const ref = useRef();
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

    loaiKinhDoanhSevices.displayLoaiKinhDoanh().then((res) => {
      setLoaiKinhDoanh(
        res.data.map((x: { id: any; loaiKinhDoanh: any }) => {
          return {
            value: x.id,
            label: x.loaiKinhDoanh,
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
        ? await coSoKinhDoanhSevices.createCoSoKinhDoanh(form)
        : await coSoKinhDoanhSevices.updateCoSoKinhDoanh(data.id, form);
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({
          diaDiem: "",
          hinhAnh: "",
          dangKyKinhDoanh: "",
          sdt: "",
          trangThai: "",
          toaDo: "",
          icon: "",
          administrativeUnitId: 0,
          caNhanHtxId: 0,
          loaiKinhDoanhId: 0,
        });
      } else {
        toastError({ msg: "Không thành công." });
      }
    } catch (error) {
      toastError({ msg: "Không thành công. Vui lòng nhập lại dữ liệu" });
    }
  };

  const handleUpload = (e: any) => {
    const file = e?.target?.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    uploadFileService.uploadFile(formData).then((res) => {
      console.log(res.data);
      setForm({ ...form, hinhAnh: res.data.filename });
    });
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
              <Label for="diaDiem">Địa điểm:</Label>
              <Input
                type="text"
                id="diaDiem"
                placeholder="Địa điểm"
                name="diaDiem"
              />
            </div>
            <div className="input-container">
              <Label for="hinhAnh">Hình ảnh:</Label>
              <input
                onChange={handleUpload}
                type="file"
                id="hinhAnh"
                placeholder="Hình ảnh"
              />
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
                src={
                  process.env.NEXT_PUBLIC_API_ALL?.replace("api/v1", "") +
                  form.hinhAnh
                }
              ></img>
            </div>
            <div className="input-container">
              <Label for="dangKyKinhDoanh">Đăng ký kinh doanh:</Label>
              <Input
                type="text"
                name="dangKyKinhDoanh"
                placeholder="Đăng ký kinh doanh"
              />
            </div>
            <div className="input-container">
              <Label for="sdt">sdt:</Label>
              <Input type="text" name="sdt" placeholder="Sdt" />
            </div>
            <div className="input-container">
              <Label for="trangThai">Trạng thái:</Label>
              <Input type="text" name="trangThai" placeholder="Trạng thái" />
            </div>
            <div className="input-container">
              <Label for="toaDo">Tọa độ:</Label>
              <Input type="text" name="toaDo" placeholder="Tọa độ" />
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
              <Label for="caNhanHtxId">Hợp tác xã:</Label>
              <ReactSelect
                name="caNhanHtxId"
                placeholder="Cá nhân hợp tác xã"
                options={htx}
                value={htx.find((x) => x.value == form?.caNhanHtxId)}
                onChange={(e) =>
                  setForm({ ...form, caNhanHtxId: e?.value ?? 0 })
                }
              />
            </div>
            <div className="input-container">
              <Label for="loaiKinhDoanhId">Loại kinh doanh:</Label>
              <ReactSelect
                name="loaiKinhDoanhId"
                placeholder="Loại kinh doanh"
                options={loaiKinhDoanh}
                value={loaiKinhDoanh.find(
                  (x) => x.value == form?.loaiKinhDoanhId
                )}
                onChange={(e) =>
                  setForm({ ...form, loaiKinhDoanhId: e?.value ?? 0 })
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
