import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import ModalEdit from "../../../components/page/bao-cao/modalEdit";
import ModalDetail from "../../../components/page/bao-cao/modalDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { initReport, removeReport, updateReport } from "~/redux/reducer/report";
import ReportServices from "~/services/reportServices";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import CheckPermission from "~/components/common/CheckPermission";

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

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
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

  const handleDelete = async (id: number) => {
    try {
      const res = await ReportServices.deleteReport(id);
      if (res) {
        dispatch(removeReport(id));
        setShow(false);
        toast.success("Xoá báo cáo thành công .");
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
      case "Đã gửi":
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

  if (role === 3) {
    toast.error("Tài khoản của bạn không có quyền này.", { autoClose: 2000 });
    return;
  }

  console.log(reportData)

  return (
    <CheckPermission permissionId={4} pageKey="4_2">
    <div
      className="main-page"
      style={{
        height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
      }}
    >
      <Head>
        <title>{i18n.t("Danh sách báo cáo")}</title>
      </Head>

      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Loại báo cáo</th>
            <th>Thời gian tạo</th>
            <th>Người tạo</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {isLogin === false
            ? reportData.map((item: any) => {
                if (item.Public === "true") {
                  return (
                    <tr key={item.id}>
                      <td>{item.LoaiBaoCao}</td>
                      <td>{formatDateString(item.CreatedOn)}</td>
                      <td>{item.NguoiTao}</td>
                      <td>
                        <div className={getStatusClass(item.TrangThai)}>
                          {item.TrangThai}
                        </div>
                      </td>
                      {/* <CheckPermission permissionId={4} pageKey="4_2"> */}
                      <td
                        onClick={() => handleDetail(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaEye />
                      </td>

                      {/* </CheckPermission> */}

                      <td style={{ cursor: "pointer" }}>
                        {isLogin &&
                          item.TrangThai !== "Đã gửi" &&
                          item.TrangThai !== "Phê duyệt" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CheckPermission permissionId={2} pageKey="4_2">
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

                              <CheckPermission permissionId={3} pageKey="4_2">
                                <div
                                  style={{ padding: "4px" }}
                                  onClick={handleShow}
                                >
                                  <MdDelete
                                    style={{
                                      color: "red",
                                      fontSize: "40px",
                                    }}
                                  />
                                </div>
                              </CheckPermission>

                              {/* modal confirm */}
                              <div
                                className="modal show"
                                style={{
                                  display: "block",
                                  position: "initial",
                                }}
                              >
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Cảnh báo !</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Bạn có muốn xoá báo cáo này không
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
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
                            </div>
                          )}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })
            : reportData.map((item: any) => {
              // đã chỉnh điều kiện nếu (chưa test lại)
                if (true) {
                  return (
                    <tr key={item.id}>
                      <td>{item.LoaiBaoCao}</td>
                      <td>{formatDateString(item.CreatedOn)}</td>
                      <td>{item.NguoiTao}</td>
                      <td>
                        <div className={getStatusClass(item.TrangThai)}>
                          {item.TrangThai}
                        </div>
                      </td>
                      <CheckPermission permissionId={4} pageKey="4_2">
                        <td
                          onClick={() => handleDetail(item)}
                          style={{ cursor: "pointer" }}
                        >
                          <FaEye />
                        </td>
                      </CheckPermission>

                      <td style={{ cursor: "pointer" }}>
                        {isLogin &&
                          item.TrangThai !== "Đã gửi" &&
                          item.TrangThai !== "Phê duyệt" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CheckPermission permissionId={2} pageKey="4_2">
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

                              <CheckPermission permissionId={3} pageKey="4_2">
                                <div
                                  style={{ padding: "4px" }}
                                  onClick={handleShow}
                                >
                                  <MdDelete
                                    style={{
                                      color: "red",
                                      fontSize: "40px",
                                    }}
                                  />
                                </div>
                              </CheckPermission>

                              {/* modal confirm */}
                              <div
                                className="modal show"
                                style={{
                                  display: "block",
                                  position: "initial",
                                }}
                              >
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Cảnh báo !</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Bạn có muốn xoá báo cáo này không
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
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
                            </div>
                          )}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
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
