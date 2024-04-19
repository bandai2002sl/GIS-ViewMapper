import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import duongDonViHanhChinhSevices from "~/services/duongDonViHanhChinhServices";
import { useRouter } from "next/router";
import Button from "~/components/common/Button";
import AddNewItemModal from "~/components/page/ql-don-vi-hanh-chinh/duong-don-vi-hanh-chinh/modelAddNew";
import ModalEdit from "~/components/page/ql-don-vi-hanh-chinh/duong-don-vi-hanh-chinh/modalEdit";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import Pagination from "~/components/common/Pagination";
import CheckPermission from "~/components/common/CheckPermission";
import { PageKey, PermissionID } from "~/constants/config/enum";
import { FcBrokenLink } from "react-icons/fc";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

export default function Page() {
  const router = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<any>([]);
  const [editedData, setEditedData] = useState<any>({});
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataToDisplay = data.slice(startIndex, endIndex);

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
        data={dataToDisplay?.map((x: any) => {
          return {
            id: x.id,
            toaDo: x.duong,
            ten: "",
          };
        })}
        isPolygon={true}
        selectedMarkerId={selectedMarkerId}
        mapIconUrl={iconUrl}
      />
    );
  }, [selectedMarkerId, dataToDisplay, DynamicMap]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response =
          await duongDonViHanhChinhSevices.displayDuongDonViHanhChinh(data);
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
      let res: any = await duongDonViHanhChinhSevices.deleteDuongDonViHanhChinh(
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
  return (
    <Fragment>
      <div
        className={"main-page"}
        style={{
          height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
        }}
      >
        <Head>
          <title>{i18n.t("Administrativeunits.administrativeunitroad")}</title>
        </Head>
        <div className="box-action">
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
            />
          )}
        </div>
        <table className={styles["customers"]}>
          <thead>
            <tr>
              <th>Tên đơn vị hành chính:</th>
              <th>Đường:</th>
              {isLogin && (
        <th>Hoạt động</th>
      )}
            </tr>
          </thead>
          <tbody>
            {dataToDisplay?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.administrativeUnit.ten}</td>

                <td
                  onClick={() => handleMarkerClick(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.duong} <FcBrokenLink />
                </td>
                {isLogin && (
                  <td>
                    
                      <button
                        onClick={() => handleEdit(item)}
                        style={{ border: "none", marginRight: "10px" }}
                      >
                        <MdEdit />
                      </button>
                 
                      <button
                        onClick={() => handleDelete(item)}
                        style={{ border: "none" }}
                      >
                        <MdDelete />
                      </button>
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
      </div>
      {isMapVisible && dynamicMap}
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
