import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  Fragment,
  ReactElement,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { PageKey, PermissionID } from "~/constants/config/enum";

import AddNewItemModal from "../../../components/page/ql-don-vi-hanh-chinh/don-vi-hanh-chinh/modalAddNew";
import BaseLayout from "~/components/layout/BaseLayout";
import CheckPermission from "~/components/common/CheckPermission";
import Head from "next/head";
import ModalEdit from "../../../components/page/ql-don-vi-hanh-chinh/don-vi-hanh-chinh/modalEdit";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import { useRouter } from "next/router";
import Button from "~/components/common/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { toastError, toastSuccess } from "~/common/func/toast";
import Pagination from "~/components/common/Pagination";
import dynamic from "next/dynamic";
import { FcBrokenLink } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

export default function Page() {
  const router = useRouter();

  const { isLogin } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<any>([]); // State để lưu trữ dữ liệu từ API
  const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataToDisplay = data.slice(startIndex, endIndex);

  // Function to handle the td tag click event and set the selected marker ID

  const [isMapVisible, setIsMapVisible] = useState(false); // State to track map visibility

  const iconUrl = "/images/map_marker_icon.png";
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const handleMarkerClick = (markerId: number) => {
    setSelectedMarkerId(markerId);
    setIsMapVisible(true);
  };
  const DynamicMap = dynamic(() => import("~/components/common/Map"), {
    ssr: false,
  });
  // Sử dụng useMemo để chỉ render lại DynamicMap khi selectedMarkerId thay đổi

  const dynamicMap = useMemo(() => {
    return (
      <DynamicMap
        data={dataToDisplay}
        selectedMarkerId={selectedMarkerId}
        mapIconUrl={iconUrl}
      />
    );
  }, [selectedMarkerId, dataToDisplay, DynamicMap]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await donViHanhChinhSevices.displayDonViHanhChinh(
          data
        );

        const newData = response.data;
        setData(newData);
        setTotal(newData.length);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [router]);

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };
  const handleDelete = (deleteItem: any) => {
    setItemToDelete(deleteItem);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async (deleteItem: any) => {
    try {
      let res: any = await donViHanhChinhSevices.deleteDonViHanhChinh(
        deleteItem.id
      );
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        router.replace(router.pathname);
        setIsConfirmDeleteOpen(false);
        setItemToDelete(null);
      } else {
        toastError({ msg: "Không thành công" });
        setIsConfirmDeleteOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const district = ["Tỉnh/Thành phố", "Quận/Huyện", "Xã/Phường"];

  return (
    <Fragment>
      {/* copy */}
      <div
        className={"main-page"}
        style={{
          height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
        }}
      >
        <Head>
          <title>{i18n.t("administrativeUnit.cooperative")}</title>
        </Head>
        {/* copy */}
        <div className={"box-action"}>
          {isLogin && (
            <Button
              primary
              bold
              rounded_4
              maxContent
              onClick={() => setIsAddModalOpen(true)}
            >
              &#x002B; Thêm
            </Button>
          )}

          {/* Render modal nếu isModalOpen là true */}
          {isAddModalOpen && (
            <AddNewItemModal
              isOpen={isAddModalOpen}
              onClose={() => {
                setIsAddModalOpen(false);
              }}
              data={data}
            />
          )}
        </div>

        <table className={styles["customers"]}>
          <thead>
            <tr>
              <th>Mã hành chính</th>
              <th>Tên</th>
              <th>Cấp Hành Chính</th>
              <th>Tên viết tắt</th>
              <th>Tọa độ</th>
              {isLogin && (
                <th style={{ display: isLogin ? "table-cell" : "none" }}>
                  Hoạt động
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {dataToDisplay?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.maHanhChinh}</td>
                <td>{item.ten}</td>
                <td>{district[item.capHanhChinh - 1]}</td>
                <td>{item.tenVietTat}</td>
                <td
                  onClick={() => handleMarkerClick(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.toaDo}
                  <FcBrokenLink />
                </td>
                {isLogin && (
                  <td style={{ display: isLogin ? "table-cell" : "none" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          padding: "4px",
                        }}
                      >
                        <MdEdit
                          style={{
                            color: "grey",
                          }}
                          onClick={() => handleEdit(item)}
                        />
                      </div>
                      <div
                        style={{
                          padding: "4px",
                        }}
                      >
                        <MdDelete
                          style={{
                            color: "red",
                          }}
                          onClick={() => handleDelete(item)}
                        />
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {/* Render modal sửa chi tiết */}
            {isEditModalOpen && (
              <ModalEdit
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                }}
                setEditedData={setEditedData}
                editedData={editedData}
              />
            )}
            {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
            {isConfirmDeleteOpen && (
              <Modal isOpen={isConfirmDeleteOpen}>
                <ModalHeader>Xác nhận xóa</ModalHeader>
                <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
                <ModalFooter>
                  <Button
                    danger
                    bold
                    rounded_4
                    maxContent
                    onClick={() => handleConfirmDelete(itemToDelete)}
                  >
                    Có
                  </Button>
                  <Button
                    secondary
                    bold
                    rounded_4
                    maxContent
                    onClick={handleCancelDelete}
                  >
                    Không
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </tbody>
        </table>

        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onSetPage={handlePageChange}
        />

        {/* copy */}
        <div className={"box-action"}>
          {/* Button to toggle map visibility */}
          <Button
            primary
            w_fit
            rounded_4
            small
            onClick={() => setIsMapVisible(!isMapVisible)}
          >
            {isMapVisible ? "Ẩn bản đồ" : "Hiển thị bản đồ"}
          </Button>
        </div>
        {/* {isMapVisible && <DynamicMap data={dataToDisplay} selectedMarkerId={selectedMarkerId} />} */}
      </div>

      {isMapVisible && dynamicMap}
    </Fragment>
  );
}
Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
