import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useEffect, useState } from "react";
import styles from "~/pages/modal-custom.module.scss";
import { useRouter } from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import ReactSelect from "react-select";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddNewItemModal({
  isOpen,
  onClose,
}: AddNewItemModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    tenBaoCao: "",
    thoiDiemBatDau: "",
    thoiDiemKetThuc: "",
    trangThai: "",
  });
  const trangThai = [
    {
      value: "Công khai",
      label: "Công khai",
    },
    {
      value: "Riêng tư",
      label: "Riêng tư",
    },
  ];
  const tenBaoCao = [
    {
      value: "Năm",
      label: "Năm",
    },
    {
      value: "Tháng",
      label: "Tháng",
    },
    {
      value: "Quý",
      label: "Quý",
    },
    {
      value: "Đột xuất",
      label: "Đột xuất",
    },
  ];

  const handleSubmit = async () => {
    try {
     
      let res: any = await kyBaoCaoSevices.createKyBaoCao(form);
      console.log(form)
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({
          tenBaoCao: "",
          thoiDiemBatDau: "",
          thoiDiemKetThuc: "",
          trangThai: "",
        });
      } else {
        toastError({ msg: "Không thành công" });
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
    >
      <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
        <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
        <ModalBody>
          <div className={styles["modal-body"]}>
            <ReactSelect
                name="tenBaoCao"
                placeholder="Chọn loại báo cáo"
                options={tenBaoCao}
                getOptionLabel={(option) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {option.label}
                  </div>
                )}
                value={tenBaoCao.find((x) => x.value == form.tenBaoCao)}
                onChange={(selectedOption) =>
                  setForm({ ...form, tenBaoCao: selectedOption?.value ?? "" })
                }
              />
            <Input
              type="datetime-local"
              name="thoiDiemBatDau"
              label="Thời điểm bắt đầu"
              placeholder="Nhập thời điểm bắt đầu"
              isRequired
            />
            <Input
              type="datetime-local"
              name="thoiDiemKetThuc"
              label="Thời điểm kết thúc"
              placeholder="Nhập thời điểm kết thúc"
              isRequired
            />
             <div className="input-container">
              <Label for="trangThai">Trạng thái:</Label>
              <ReactSelect
                name="trangThai"
                placeholder="Chọn trạng thái"
                options={trangThai}
                getOptionLabel={(option) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {option.label}
                  </div>
                )}
                value={trangThai.find((x) => x.value == form.trangThai)}
                onChange={(selectedOption) =>
                  setForm({ ...form, trangThai: selectedOption?.value ?? "" })
                }
              />
            </div>
            <div className={styles["form-group"]}>
              <label
                htmlFor="trangThai"
                style={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Trạng thái :
              </label>           
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className={styles["modal-footer"]}>
            <Button color="primary">Lưu</Button>{" "}
            <Button color="secondary" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
