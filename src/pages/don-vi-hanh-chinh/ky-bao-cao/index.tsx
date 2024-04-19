import "bootstrap/dist/css/bootstrap.min.css";

import { Fragment, ReactElement, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import BaseLayout from "~/components/layout/BaseLayout";
import Button from "~/components/common/Button";
import Head from "next/head";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import { useRouter } from "next/router";
import { MdDelete, MdEdit } from "react-icons/md";
import { toastSuccess, toastError } from "~/common/func/toast";
import Pagination from "~/components/common/Pagination";
import CheckPermission from "~/components/common/CheckPermission";
import { PageKey, PermissionID } from "~/constants/config/enum";
import AddNewItemModal from "~/components/page/ql-don-vi-hanh-chinh/ky-bao-cao/modalAddNew";
import ModalEdit from "~/components/page/ql-don-vi-hanh-chinh/ky-bao-cao/modalEdit";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const role = useSelector((state: any) => state.user.infoUser.role);
  const permission = CasePermission(role);
  console.log(permission);
  const [data, setData] = useState<any>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm

  const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataToDisplay = data.slice(startIndex, endIndex);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await kyBaoCaoSevices.displayKyBaoCao(data);
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
      let res: any = await kyBaoCaoSevices.deleteKyBaoCao(deleteItem.id);
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
  function formatDateTime(dateTime: any) {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Định dạng "dd/mm/yyyy --:--"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="main-page">
      <Head>
        <title>{i18n.t("Administrativeunits.Reportingperiod")}</title>
      </Head>
      {isLogin&&
      <div className="box-action">
      <CheckPermission permissionId={1} pageKey="1_4">
          <Button
            primary
            bold
            rounded_4
            maxContent
            onClick={() => setIsAddModalOpen(true)}
          >
            &#x002B; Thêm
          </Button>
        </CheckPermission>
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
}
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Tên báo cáo</th>
            <th>Thời điểm bắt đầu</th>
            <th>Thời điểm kết thúc</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((item: any) => {
            // Kiểm tra nếu người dùng không đăng nhập và trạng thái báo cáo không phải là "Công khai", thì không hiển thị báo cáo đó
            if (!isLogin && item.trangThai !== "Công khai") {
              return null;
            }

            return (
              <tr key={item.id}>
                <td>{item.tenBaoCao}</td>
                <td>{formatDateTime(item.thoiDiemBatDau)}</td>
                <td>{formatDateTime(item.thoiDiemKetThuc)}</td>
                <td>{item.trangThai}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onSetPage={handlePageChange}
      />
    </div>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
