/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "~/redux/reducer/modal";
import { RootState } from "~/redux/store";
import axiosClient from "~/services";

interface IUser {
  email: string;
  password: string;
  role: number;
}

const modalAdd = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<IUser>();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: IUser) => {
    try {
      const res = await axiosClient.post(
        `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/register`,
        data
      );
      console.log(res.data);
      setSuccessMessage("Tạo tài khoản thành công");
      reset(); // Reset form fields
      setTimeout(() => {
        setSuccessMessage("");
        dispatch(closeModal()); // Đóng modal sau khi hiển thị thông báo
      }, 3000); // Hiển thị thông báo trong 3 giây
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  };

  return (
    <div>
      <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <p>{successMessage}</p>}{" "}
          {/* Hiển thị thông báo thành công */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={labelStyle}>Email:</p>
                <input
                  type="text"
                  placeholder="Nhập Email"
                  {...register("email")}
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={labelStyle}>Mật khẩu:</p>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  {...register("password")}
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={labelStyle}>Chọn cấp độ:</p>
                <select id="role" {...register("role")} style={inputStyle}>
                  <option value="0">Admin</option>
                  <option value="1">Xã</option>
                  <option value="2">Huyện </option>
                  <option value="3">Tỉnh</option>
                </select>
              </div>
            </div>
            <div>
              <Button type="submit" style={buttonStyle}>
                Tạo tài khoản
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default modalAdd;
