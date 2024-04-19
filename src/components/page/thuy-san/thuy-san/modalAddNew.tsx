import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
//import hopTacXaSevices from "~/services/hopTacXaSevices";
//import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import thuySanSevices from "~/services/thuySanServices";
import styles from "~/styles/modal-custom.module.scss";
import Form, { Input } from "~/components/common/Form";
import { toastError, toastSuccess } from "~/common/func/toast";
import router from "next/router";
import uploadFileService from "~/services/uploadFileService";

interface AddformModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function InputValidation() {
  const [errInput, setErrInput] = useState("");
  const [errMess, setErrMess] = useState("");

  const checkValidInput = (form: any) => {
    setErrInput("");
    setErrMess("");
    const arrInput = ["icon", "name", "moTa", "image", "tamNgung"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!form[arrInput[i]]) {
        setErrInput(arrInput[i]);
        setErrMess("Bạn chưa nhập dữ liệu");
        break;
      }
    }
  };

  return { errInput, errMess, checkValidInput };
}

export default function AddformModal({
  isOpen,
  onClose,
  data,
}: AddformModalProps) {
  const { errInput, errMess, checkValidInput } = InputValidation();
  const [form, setForm] = useState(data);
  const [thuySan, setThuySan] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);
  // Định nghĩa một mảng các icon từ Flaticon
  const icons = [
    {
      value: "thuysan1",
      label: "Cá nước ngọt",
      iconPath: "/images/icons/thuysan1.png",
    },
    {
      value: "thuysan2",
      label: "Cá trắm",
      iconPath: "/images/icons/thuysan2.png",
    },
    {
      value: "thuysan3",
      label: "Lươn",
      iconPath: "/images/icons/thuysan3.png",
    },
    {
      value: "thuysan4",
      label: "Mực",
      iconPath: "/images/icons/thuysan4.png",
    },
    {
      value: "thuysan5",
      label: "Ốc",
      iconPath: "/images/icons/thuysan5.png",
    },
    {
      value: "thuysan6",
      label: "Cá nước mặn",
      iconPath: "/images/icons/thuysan6.png",
    },
    {
      value: "thuySan7",
      label: "tôm",
      iconPath: "/images/icons/thuysan7.png",
    },
    {
      value: "thuysan8",
      label: "cua",
      iconPath: "/images/thuysan/thuysan8.png",
    },
  ];

  const handleSubmit = async () => {
    checkValidInput(form);

    try {
      let res: any = !data?.id
        ? await thuySanSevices.createThuySan(form)
        : await thuySanSevices.updateThuySan(data.id, form);
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

  const handleUpload = (e: any) => {
    const file = e?.target?.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    uploadFileService.uploadFile(formData).then((res) => {
      setForm({ ...form, image: res.data.filename });
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
              <Label for="name">Tên:</Label>
              <Input type="text" name="name" placeholder="name" />
              {errInput === "name" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
            </div>
            <div className="input-container">
              <Label for="moTa">Mô tả:</Label>
              <Input type="text" name="moTa" placeholder="Mô tả" />
              {errInput === "moTa" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
            </div>
            <div className="input-container">
              <Label for="image">Hình ảnh:</Label>
              <input
                onChange={handleUpload}
                type="file"
                id="image"
                placeholder="Hình ảnh"
              />
              <img
                style={{
                  width: "10%",
                  height: "10%",
                  objectFit: "cover",
                }}
                src={
                  process.env.NEXT_PUBLIC_API_ALL?.replace("api/v1", "") +
                  form.image
                }
              ></img>
            </div>

            <div className="input-container">
              <Label for="tamNgung">Tình trạng:</Label>
              <Input type="text" name="tamNgung" placeholder="Tình trạng" />
              {errInput === "tamNgung" ? (
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
