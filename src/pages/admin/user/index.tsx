import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import ModalEdit from "../../../components/page/admin/modalEdit";
import ModalDetail from "../../../components/page/bao-cao/modalDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";

import authSevices from "~/services/authSevices";
import { DateTime } from "luxon";
import { deleteAccount, initAccount } from "~/redux/reducer/account";
import { toast } from "react-toastify";
import CheckPermission from "~/components/common/CheckPermission";
import ModalAdd from "~/components/page/admin/modalAdd";
import { openModal } from "~/redux/reducer/modal";

export default function Page() {
  const CasePermission = (role: number) => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Xã";
      case 2:
        return "Huyện";
      case 3:
        return "Tỉnh";
      default:
        return "";
    }
  };
  const dispatch = useDispatch();
  const accountData = useSelector((state: any) => state.account.data);
  const { isLogin } =  useSelector( (state: RootState) =>  state.auth) || false;
  
  const role = useSelector((state: any) => state.user.infoUser.role);
  console.log(isLogin)
  const permission = CasePermission(role);
  const [show, setShow] = useState(false);

  const [data, setData] = useState<any>([]);

  const [editedData, setEditedData] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (editedItem: any) => {
    try {
      const updatedData = accountData.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      );

      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await authSevices.deleteUser(id);

      if (res) {
        dispatch(deleteAccount(id));
        // setShow(false)
        toast.success("Xoá tài khoản thành công .");
        return;
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
      return;
    }
  };

  const handleDetail = (item: any) => {
    setEditedData(item);
    setIsDetailModalOpen(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Phê duyệt":
        return styles.success;
      case "Đã Gửi":
        return styles.success;
      case "Yêu cầu cập nhật":
        return styles.error;
      default:
        return styles.pending;
    }
  };

  const formatDateString = (dateString: string): string => {
    const utcDateTime = DateTime.fromISO(dateString, { zone: "UTC" });
    // Đặt múi giờ sang Việt Nam (UTC+7)
    const localDateTime = utcDateTime.setZone("Asia/Ho_Chi_Minh");
    const formattedDateTime = localDateTime.toFormat("dd-MM-yyyy' | 'HH:mm:ss");
    return formattedDateTime;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await authSevices.getAllUser();
        dispatch(initAccount(response?.users));
      } catch (error) {
        console.error(error);
      }
    }
    if (accountData.length === 0) {
      fetchData();
    }
  }, [dispatch]);
  
  useEffect(()=>{
    if (isLogin) {
    if (permission !== "Admin") {
      toast.error("Tài khoản của bạn không có quyền truy cập tính năng này.");
      return;
    }
    } else {
      toast.warning("Bạn cần đăng nhập trước khi sử tính năng này !");
      return;
    }
  },[isLogin])
  // if (isLogin) {
  //   if (permission !== "Admin") {
  //     toast.error("Tài khoản của bạn không có quyền truy cập tính năng này.");
  //     return;
  //   }
  // } else {
  //   toast.warning("Bạn cần đăng nhập trước khi sử tính năng này !");
  //   return;
  // }

  return (
    <CheckPermission permissionId={4} pageKey="5_1">
      <Head>
        <title>{i18n.t("Danh sách báo cáo")}</title>
      </Head>

      <div
        style={{
          margin: "20px 40px",
        }}
      >
        <Button onClick={() => dispatch(openModal())}>Thêm tài khoản</Button>
      </div>

      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Ngày tạo</th>

            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accountData &&
            accountData.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{CasePermission(item.role)}</td>
                <td>{item.createDate}</td>

                <td style={{ cursor: "pointer" }}>
                  {isLogin && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CheckPermission permissionId={2} pageKey="5_1">
                        <div
                          style={{
                            padding: "4px",
                          }}
                        >
                          <MdEdit
                            style={{
                              color: "grey",
                              fontSize: "40px",
                            }}
                            onClick={() => handleEdit(item)}
                          />
                        </div>
                      </CheckPermission>
                      <CheckPermission permissionId={3} pageKey="5_1">
                        <div
                          style={{ padding: "4px" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <MdDelete
                            style={{
                              color: "red",
                              fontSize: "40px",
                            }}
                          />
                        </div>
                        {/* modal confirm */}
                        <div
                          className="modal show"
                          style={{ display: "block", position: "initial" }}
                        >
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Cảnh báo !</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Bạn có muốn xoá tài khoản này không
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                đóng
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(item.id)}
                              >
                                Xoá
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </CheckPermission>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ModalEdit
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSubmit={handleUpdate}
          setNewItem={setEditedData}
          newItem={{
            ...editedData,
            id: editedData?.id,
          }}
          data={[]}
        />
      )}
      <ModalAdd />
    </CheckPermission>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
