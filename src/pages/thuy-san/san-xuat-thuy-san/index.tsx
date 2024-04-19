import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import { PageKey, PermissionID } from "~/constants/config/enum";
import AddNewItemModal from "../../../components/page/thuy-san/san-xuat-thuy-san/modalAddNew";
import BaseLayout from "~/components/layout/BaseLayout";
import CheckPermission from "~/components/common/CheckPermission";
import Head from "next/head";
import ModalEdit from "../../../components/page/ql-don-vi-hanh-chinh/don-vi-hanh-chinh/modalEdit";
import sanXuatThuySanServices from "~/services/sanXuatThuySanServices";
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
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<any>([]);
  const [editedData, setEditedData] = useState<any>({});
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  // Function to handle the td tag click event and set the selected marker ID

  const [isMapVisible, setIsMapVisible] = useState(false); // State to track map visibility

  const iconUrl = "/images/pin.png";
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const handleMarkerClick = (markerId: number) => {
    setSelectedMarkerId(markerId);
    setIsMapVisible(true);
  };
  const DynamicMap = dynamic(() => import("~/components/common/Map"), {
    ssr: false,
  });
 // Sử dụng useMemo để chỉ render lại DynamicMap khi selectedMarkerId thay đổi
 const [currentPage, setCurrentPage] = useState(1);
 const pageSize = 10;
 const [total, setTotal] = useState(0);
 const startIndex = (currentPage - 1) * pageSize;
 const endIndex = startIndex + pageSize;
 const dataToDisplay = data.slice(startIndex, endIndex);
 const imgUrl = (imageName: string) => "/images/icons/" + imageName + ".png";
 const dynamicMap = useMemo(() => {
   const selectedItem = dataToDisplay.find(
     (item: { id: number | null }) => item.id === selectedMarkerId
   );
   const mapIconUrl = selectedItem
     ? imgUrl(selectedItem.icon)
     : "default-icon-path";

   return (
     <DynamicMap
       data={dataToDisplay}
       selectedMarkerId={selectedMarkerId}
       mapIconUrl={mapIconUrl}
     />
   );
 }, [selectedMarkerId, dataToDisplay, DynamicMap, imgUrl]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await sanXuatThuySanServices.displaysanXuatThuySan({
          diaChi: "",
          moTa: "",
          hinhAnh: "",
          tinhTrang: "",
          toaDo: "",
          icon: "",
        });
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
      let res: any = await sanXuatThuySanServices.deletesanXuatThuySan(
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
  const buildImageUrl = (imageName: string) =>
    process.env.NEXT_PUBLIC_API_ALL?.replace("api/v1", "") + imageName;


  return (
    <Fragment>
      <div
        className={"main-page"}
        style={{
          height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
        }}
      >
        <Head>
          <title>{i18n.t("administrativeUnit.cooperative")}</title>
        </Head>
        <div className="box-action">
          <CheckPermission
            pageKey={PageKey.Don_vi_hanh_chinh}
            permissionId={PermissionID.Them}
          >
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
          </CheckPermission>
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
              <th>Biểu tượng</th>
              <th>Địa điểm</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Trạng thái</th>
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
                <td>
                  {/* Hiển thị icon */}
                  <Image
                    src={imgUrl(item.icon)}
                    alt="Hình ảnh"
                    title={item.icon}
                    width={30}
                    height={30}
                  />
                </td>
                <td>{item.diaChi}</td>
                <td>{item.moTa}</td>
                <td>
                  <img
                    src={buildImageUrl(item.hinhAnh)}
                    alt="Hình ảnh"
                    title={item.tenAnh}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{item.tinhTrang}</td>
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
            {isEditModalOpen && (
              <AddNewItemModal
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                }}
                data={{
                  ...editedData,
                  caNhanHtxId: editedData?.caNhanHtx?.id,
                  kyBaoCaoId: editedData?.kyBaoCao?.id,
                  thuySan: editedData?.thuySan?.id,
                }}
              />
            )}
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
