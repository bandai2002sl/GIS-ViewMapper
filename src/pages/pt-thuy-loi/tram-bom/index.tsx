import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import AddNewItemModal from "../../../components/page/thuy-loi/tram-bom/AddItemModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalEdit from "../../../components/page/thuy-san/quan-ly-tau-ca/modalEdit";
import tramBomServices from "~/services/tramBomServices"; // Import tramBomServices
import Button from "~/components/common/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import dynamic from "next/dynamic";
import { FcBrokenLink } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState<any>([]);
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    ten: "string",
    diaChi: "string",
    congXuat: 0,
    loaiHinh: "string",
    administrativeUnitId: 0,
    icon: "string",
  });
  const [editedData, setEditedData] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
        const response = await tramBomServices.display(data); // Use tramBomServices to fetch data
        const newData = response.data;
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await tramBomServices.create(newItem); // Use tramBomServices to create a new item
      setData([...data, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        ten: "string",
        diaChi: "string",
        congXuat: 0,
        loaiHinh: "string",
        administrativeUnitId: 0,
        icon: "string",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (editedItem: any) => {
    try {
      const response = await tramBomServices.update(editedItem.id, editedItem); // Use tramBomServices to update an item
      const updatedData = data.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      );
      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (deleteItem: any) => {
    setItemToDelete(deleteItem);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async (deleteItem: any) => {
    try {
      const response = await tramBomServices.delete(deleteItem.id); // Use tramBomServices to delete an item
      const updatedData = data.filter(
        (dataItem: any) => dataItem.id !== deleteItem.id
      );
      setData(updatedData);
      setIsConfirmDeleteOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div
        className="main-page"
        style={{
          height: `calc(100vh - 70px - ${isMapVisible ? "50vh" : "0vh"})`,
        }}
      >
        <Head>
          <title>{i18n.t("Quản lý trạm bơm")}</title>
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
              &#x002B; Thêm{" "}
            </Button>
          )}

          {isAddModalOpen && (
            <AddNewItemModal
              isEditing={false}
              isOpen={isAddModalOpen}
              onClose={() => {
                setIsAddModalOpen(false);
              }}
              onSubmit={handleAdd}
              newItem={newItem}
              setNewItem={setNewItem}
            />
          )}
        </div>
        <table className={styles["customers"]}>
          <thead>
            <tr>
              <th>Biểu tượng</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Công suất</th>
              <th>Loại hình</th>
              <th>Tọa độ</th>
              {isLogin && (
                <th style={{ display: isLogin ? "table-cell" : "none" }}>
                  Hoạt động
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
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
                <td>{item.ten}</td>
                <td>{item.diaChi}</td>
                <td>{item.congXuat}</td>
                <td>{item.loaiHinh}</td>

                <td
                  onClick={() => handleMarkerClick(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.toaDo} <FcBrokenLink />
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
          </tbody>
        </table>

        <div className={"box-action"} style={{ marginTop: "12px" }}>
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

        {isEditModalOpen && (
          <AddNewItemModal
            isEditing={true}
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
            }}
            onSubmit={handleUpdate}
            setNewItem={setEditedData}
            newItem={{
              ...editedData,
              administrativeUnitId: editedData?.administrativeUnit.id,
            }}
          />
        )}
        {isConfirmDeleteOpen && (
          <Modal isOpen={isConfirmDeleteOpen} backdrop={false}>
            <ModalHeader>Xác nhận xóa</ModalHeader>
            <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => handleConfirmDelete(itemToDelete)}
              >
                Có
              </Button>
              <Button color="secondary" onClick={handleCancelDelete}>
                Không
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
      {isMapVisible && dynamicMap}
    </>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
