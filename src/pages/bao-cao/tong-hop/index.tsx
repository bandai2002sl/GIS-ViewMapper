import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import ModalEdit from "../../../components/page/bao-cao/modalEdit";
import ModalDetail from "../../../components/page/bao-cao/tong-hop-bao-cao/modalDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import {
  initReport,
  removeReport,
  updateReport,
  updateStatus,
} from "~/redux/reducer/report";
import { DateTime } from "luxon";
import { ToastContainer, toast } from "react-toastify";
import CheckPermission from "~/components/common/CheckPermission";

import ReportServices from "~/services/reportServices";

export default function Page() {
  const CasePermission = (permission: number) => {
    switch (permission) {
      case 0:
        return "admin";
      case 1:
        return "xa";
      case 2:
        return "huyen";
      case 3:
        return "tinh";
      default:
        return "";
    }
  };
  const dispatch = useDispatch();
  const reportData = useSelector((state: any) => state.report.data);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const role = useSelector((state: any) => state.user.infoUser.role);
  const permission = CasePermission(role);

  console.log(permission);

  const [show, setShow] = useState(false);

  const [data, setData] = useState<any>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    id: 0,
    thoiGianTao: "string",
    loaiBaoCao: "string",
    nguoiTao: "string",
    chucVu: "string",
    soSoKinhDoanh: 0,
    soTauCa: 0,
    soCoSoSanXuat: 0,
    soCong: 0,
    soHoChua: 0,
    soTramBom: 0,
    soKenhMuong: 0,
    dienTichTieuTieu: 0,
    donViBaoCao: "string",
    status: "string",
  });
  const [editedData, setEditedData] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [confirmationData, setConfirmationData] = useState<any>(null);

  const [isMapVisible, setIsMapVisible] = useState(false); // State to track map visibility

  const iconUrl = "/images/map_marker_icon.png";
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const DynamicMap = dynamic(() => import("~/components/common/Map"), {
    ssr: false,
  });
  // Sử dụng useMemo để chỉ render lại DynamicMap khi selectedMarkerId thay đổi

  const dynamicMap = useMemo(() => {
    return (
      <DynamicMap
        data={data}
        selectedMarkerId={selectedMarkerId}
        mapIconUrl={iconUrl}
      />
    );
  }, [selectedMarkerId, data, DynamicMap]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAction = (id: number, newStatus: string) => {
    setConfirmationData({ id, newStatus });
    handleShow();
  };

  const handleUpdate = async (editedItem: any) => {
    try {
      const updatedData = reportData.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      );

      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    try {
      const { id, newStatus } = confirmationData;

      const res = await ReportServices.updateStatusReport(id, newStatus);
      if (res) {
        dispatch(
          updateStatus({
            id: id,
            newStatus: newStatus,
          })
        );
        setShow(false);
        toast.success("Cập nhật trạng thái báo cáo thành công.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
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
        const response = await ReportServices.displayReport();
        dispatch(initReport(response));
      } catch (error) {
        console.error(error);
      }
    }
    if (reportData.length === 0) {
      fetchData();
    }
  }, [dispatch]);

  if (isLogin) {
    if (permission === "xa") {
      toast.error("Tài khoản của bạn không có quyền này.", { autoClose: 2000 });
      return;
    }
  } else {
    toast.warning("Bạn cần đăng nhập để sử dụng tính năng !", {
      autoClose: 2000,
    });
    return;
  }

  return (
    <CheckPermission permissionId={4} pageKey="4_3">
      <div
        className="main-page"
        style={{
          height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
        }}
      >
        <Head>
          <title>{i18n.t("Tổng hợp báo cáo")}</title>
        </Head>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Thống kê báo cáo
        </h1>
        
        <table className={styles["customers"]}>
          <thead>
            <tr>
              <th>Loại báo cáo</th>
              <th>Thời gian tạo</th>
              <th>Người tạo</th>
              <th>Đơn vị báo cáo</th>
              <th style={{ width: "160px" }}>Trạng thái</th>
              <th>Xem chi tiết</th>
              <th colSpan={2} style={{ width: "250px" }}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item: any) => {
              if (
                (permission === "huyen" && item.Role === "xa") ||
                (permission === "tinh" && item.Role === "huyen") ||
                permission === "admin"
              ) {
                if (item.TrangThai != "Lưu tạm") {
                  return (
                    <tr key={item.id}>
                      <td>{item.LoaiBaoCao}</td>
                      <td>{formatDateString(item.CreatedOn)}</td>
                      <td>{item.NguoiTao}</td>
                      <td>{item.DonViBaoCao}</td>
                      <td>
                        <div className={getStatusClass(item.TrangThai)}>
                          {item.TrangThai === "Đã gửi"
                            ? "Đang xử lý"
                            : item.TrangThai}
                        </div>
                      </td>
                      <td
                        onClick={() => handleDetail(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaEye />
                      </td>
                      <td colSpan={2} className={styles.col__action}>
                        {isLogin &&
                          item.TrangThai !== "Phê duyệt" &&
                          item.TrangThai !== "Yêu cầu cập nhật" && 
                          (
                            <div className={styles.box__btn}>
                              <CheckPermission permissionId={2} pageKey="4_3">
                              
                                <Button
                                  variant="success"
                                size="sm"
                                  onClick={() =>
                                    handleAction(item.id, "Phê duyệt")
                                  }
                                >
                                  Phê Duyệt
                                </Button>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    handleAction(item.id, "Yêu cầu cập nhật")
                                  }
                                >
                                  Yêu cầu cập nhật
                                </Button>
                              </CheckPermission>
                            </div>
                          )}

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
                              Bạn có chắc chắn với ý định của bạn ?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                đóng
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => handleConfirm()}
                              >
                                Đồng ý
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  );
                }
              }
            })}
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
        {isDetailModalOpen && (
          <ModalDetail
            isOpen={isDetailModalOpen}
            onClose={() => {
              setIsDetailModalOpen(false);
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
      </div>
    </CheckPermission>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
