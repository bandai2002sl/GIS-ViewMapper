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
import hopTacXaSevices from "~/services/hopTacXaSevices";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import sanXuatThuySanSevices from "~/services/sanXuatThuySanServices";
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
    const arrInput = [
      "diaChi",
      "moTa",
      "hinhAnh",
      "tinhTrang",
      "kyBaoCaoId",
      "thuySanId",
      "caNhanHtxId",
    ];
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
      value: "cososanxuat1",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat1.png",
    },
    {
      value: "cososanxuat2",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat2.png",
    },
    {
      value: "cososanxuat3",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat3.png",
    },
    {
      value: "cososanxuat4",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat4.png",
    },
    {
      value: "cososanxuat5",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat5.png",
    },
    {
      value: "cososanxuat6",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat6.png",
    },
    {
      value: "cososanxuat7",
      label: "Cơ sở sản xuất",
      iconPath: "/images/icons/cososanxuat7.png",
    },
  ];

  const [kyBaoCao, setKyBaoCao] = useState<
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

  useEffect(() => {
    kyBaoCaoSevices.displayKyBaoCao().then((res) => {
      setKyBaoCao(
        res.data.map((x: { id: any; tenBaoCao: any }) => {
          return {
            value: x.id,
            label: x.tenBaoCao,
          };
        })
      );
    });

    sanXuatThuySanSevices.getThuySan().then((res) => {
      setThuySan(
        res.data.map((x: { id: any; name: any }) => {
          return {
            value: x.id,
            label: x.name,
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
        ? await sanXuatThuySanSevices.createsanXuatThuySan(form)
        : await sanXuatThuySanSevices.updatesanXuatThuySan(data.id, form);
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
              <Label for="diaChi">Địa Chỉ:</Label>
              <Input type="text" name="diaChi" placeholder="Địa Chỉ" />
              {errInput === "diaChi" ? (
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
              <Label for="hinhAnh">Hình ảnh:</Label>
              <input
                onChange={handleUpload}
                type="file"
                id="hinhAnh"
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
                  form.hinhAnh
                }
              ></img>
            </div>

            <div className="input-container">
              <Label for="tinhTrang">Tình trạng:</Label>
              <Input type="text" name="tinhTrang" placeholder="Tình trạng" />
              {errInput === "tinhTrang" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
            </div>
            <div className="input-container">
              <Label for="caNhanHtxId">Tọa độ:</Label>
              <Input type="text" name="toaDo" placeholder="Tọa độ" />
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
                value={htx.find((x) => x.value == form?.caNhanHtxId)}
                onChange={(e) =>
                  setForm({ ...form, caNhanHtxId: e?.value ?? 0 })
                }
              />
              {errInput === "caNhanHtxId" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
            </div>

            <div className="input-container">
              <Label for="kyBaoCaoId">Kỳ báo cáo:</Label>
              <ReactSelect
                name="kyBaoCaoId"
                placeholder="Kỳ báo cáo"
                options={kyBaoCao}
                value={kyBaoCao.find((x) => x.value == form?.kyBaoCaoId)}
                onChange={(e) =>
                  setForm({ ...form, kyBaoCaoId: e?.value ?? 0 })
                }
              />

              {errInput === "kyBaoCaoId" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
            </div>

            <div className="input-container">
              <Label for="thuySanId">Thủy sản:</Label>
              <ReactSelect
                name="thuySanId"
                placeholder="Thủy sản"
                options={thuySan}
                value={thuySan.find((x) => x.value == form?.thuySanId)}
                onChange={(e) => setForm({ ...form, thuySanId: e?.value ?? 0 })}
              />

              {errInput === "thuySanId" ? (
                <div className="text-danger">{errMess}</div>
              ) : (
                ""
              )}
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
