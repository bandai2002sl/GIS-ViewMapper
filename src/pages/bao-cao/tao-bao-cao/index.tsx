import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import ReactSelect from "react-select";
import styles from "../../manage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import CheckPermission from "~/components/common/CheckPermission";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Card,
} from "react-bootstrap";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import { createReport } from "~/redux/reducer/report";
import ReportServices from "~/services/reportServices";
import { redirect, useNavigate } from "react-router-dom";

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
  const [data, setData] = useState<any>([]);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  // const permission = useSelector((state :  any ) => state.auth.permissionList);
  const role = useSelector((state: any) => state.user.infoUser.role);

  const permission = CasePermission(role);

  const [listHanhChinh, setListHanhChinh] = useState<any>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    // ngayBaoCao: '',
    LoaiBaoCao: "Năm",
    // nguoiLapBaoCao: '',
    // chucVu: '',
    // tongSoSoKinhDoanh: '',
    // tongSoTauCa: '',
    // tongCoSoSanXuatThuySan: '',
    // tongSoCong: '',
    // tongSoHoChua: '',
    // tongSoTramBom: '',
    // tongSoKenhMuong: '',
    // tongDienTichTuoiTieu: '',
    // donViBaoCao: '',
    // status: "",
  });
  // const [editedData, setEditedData] = useState<any>({});
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);

  const iconUrl = "/images/map_marker_icon.png";
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await donViHanhChinhSevices.displayDonViHanhChinh(
          listHanhChinh
        );
        const options = response.data.map((item: any) => ({
          label: item.ten, // Tên đơn vị
          value: item.id, // ID của đơn vị
        }));
        setListHanhChinh(options);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleCreateReport = async (newStatus: string) => {
    let isCheck: Boolean =
      newItem.CreatedOn === "mm/dd/yyy --:-- --" ||
      newItem.LoaiBaoCao === "" ||
      newItem.NguoiTao === "" ||
      newItem.ChucVu === "" ||
      newItem.SoSoKinhDoanh === "" ||
      newItem.SoTauCa === "" ||
      newItem.SoCoSoSanXuat === "" ||
      newItem.SoCong === "" ||
      newItem.SoHoChua === "" ||
      newItem.SoTramBom === "" ||
      newItem.SoKenhMuong === "" ||
      newItem.DienTichTieuTieu === "";
    console.log(isCheck);
    if (!isCheck) {
      try {
        if (isOfficeHours()) {
          const newReport = {
            CreatedOn: newItem.CreatedOn,
            LoaiBaoCao: newItem.LoaiBaoCao,
            NguoiTao: newItem.NguoiTao,
            ChucVu: newItem.ChucVu,
            SoSoKinhDoanh: newItem.SoSoKinhDoanh,
            SoTauCa: newItem.SoTauCa,
            SoCoSoSanXuat: newItem.SoCoSoSanXuat,
            SoCong: newItem.SoCong,
            SoHoChua: newItem.SoHoChua,
            SoTramBom: newItem.SoTramBom,
            SoKenhMuong: newItem.SoKenhMuong,
            DienTichTieuTieu: newItem.DienTichTieuTieu,
            DonViBaoCao: newItem.DonViBaoCao,
            TrangThai: newStatus,
            Public: "false",
            Role: permission,
          };
          const res: any = await ReportServices.createReport(newReport);
          if (res) {
            setValidated(false);
            toast.success("Tạo báo cáo thành công.");
            dispatch(
              createReport({
                newItem,
                newStatus,
                role: permission,
                Public: "false",
              })
            );
            setNewItem({
              CreatedOn: "mm/dd/yyy --:-- --",
              LoaiBaoCao: "Năm",
              NguoiTao: "",
              ChucVu: "",
              SoSoKinhDoanh: "",
              SoTauCa: "",
              SoCoSoSanXuat: "",
              SoCong: "",
              SoHoChua: "",
              SoTramBom: "",
              SoKenhMuong: "",
              DienTichTieuTieu: "",
              DonViBaoCao: null,
              Public: "false",
              Role: permission,
            });
          }
        } else {
          toast.error(
            "Không thể tạo báo cáo ngoài giờ hành chính. Chỉ cho phép từ 08:00 đến 17:00 "
          );
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra !");
      }
    } else {
      setValidated(true);
      return;
    }
  };

  const isOfficeHours = () => {
    const currentHour = new Date().getHours();
    // Giả sử thời gian giờ hành chính là từ 8 giờ sáng đến 5 giờ chiều
    return currentHour >= 0 && currentHour < 24;
  };
  if (isLogin) {
    if (permission === "tinh") {
      toast.error("Tài khoản của bạn không có quyền này.", { autoClose: 2000 });
      return;
    }
  } else {
    toast.warning("Bạn cần đăng nhập để sử dụng tính năng !");
    return;
  }

  return (
    <CheckPermission permissionId={1} pageKey="4_1">
      <Container>
        <h4 className={styles.title__report}>Tạo báo cáo</h4>
        <Form noValidate validated={validated}>
          <Row className="mb-4">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Ngày Báo cáo</Form.Label>
              <Form.Control
                value={newItem.CreatedOn}
                onChange={(e) =>
                  setNewItem({ ...newItem, CreatedOn: e.target.value })
                }
                required
                type="datetime-local"
                placeholder="First name"
                defaultValue="Mark"
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Kỳ báo cáo</Form.Label>
              <Form.Select
                defaultValue="Năm"
                value={newItem.LoaiBaoCao}
                onChange={(e) =>
                  setNewItem({ ...newItem, LoaiBaoCao: e.target.value })
                }
              >
                <option value="Năm">Năm</option>
                <option value="Tháng">Tháng</option>
                <option value="Quý">Quý</option>
                <option value="Đột xuất">Đột xuất</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>Người lập báo cáo</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.NguoiTao}
                  onChange={(e) =>
                    setNewItem({ ...newItem, NguoiTao: e.target.value })
                  }
                  type="text"
                  placeholder="Họ và tên"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                value={newItem.ChucVu}
                onChange={(e) =>
                  setNewItem({ ...newItem, ChucVu: e.target.value })
                }
                type="text"
                placeholder="Chức vụ"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Card.Title>Đối tượng báo cáo : Thuỷ sản</Card.Title>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số sở kinh doanh</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoSoKinhDoanh}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoSoKinhDoanh: e.target.value })
                  }
                  type="text"
                  placeholder="cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số tàu cá</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoTauCa}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoTauCa: e.target.value })
                  }
                  type="text"
                  placeholder="số tàu cá"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng cơ sở sản xuất thuỷ sản</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoCoSoSanXuat}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoCoSoSanXuat: e.target.value })
                  }
                  type="text"
                  placeholder="số cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Card.Title>Đối tượng báo cáo : Thuỷ lợi</Card.Title>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số cống</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoCong}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoCong: e.target.value })
                  }
                  type="text"
                  placeholder="số cống"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số hồ chứa</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoHoChua}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoHoChua: e.target.value })
                  }
                  type="text"
                  placeholder="sồ hồ chứa"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số trạm bơm</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoTramBom}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoTramBom: e.target.value })
                  }
                  type="text"
                  placeholder="số trạm bơm"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số kênh mương</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.SoKenhMuong}
                  onChange={(e) =>
                    setNewItem({ ...newItem, SoKenhMuong: e.target.value })
                  }
                  type="text"
                  placeholder="số kênh mương"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số diện tích tưới tiêu</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={newItem.DienTichTieuTieu}
                  onChange={(e) =>
                    setNewItem({ ...newItem, DienTichTieuTieu: e.target.value })
                  }
                  type="text"
                  placeholder="diện tích tưới tiêu"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md="9" controlId="validationCustomUsername">
              <Form.Label>Đơn vị báo cáo</Form.Label>

              <ReactSelect
                options={listHanhChinh}
                placeholder="Chọn đơn vị hành chính..."
                onChange={(selectedOption: { label: string; value: any }) =>
                  setNewItem({ ...newItem, DonViBaoCao: selectedOption.label })
                }
              />
            </Form.Group>
          </Row>
          <Row md={5} className={styles.box__btn}>
            <Button onClick={() => handleCreateReport("Đã gửi")}>Gửi đi</Button>
            <Button
              onClick={() => handleCreateReport("Lưu tạm")}
              variant="warning"
            >
              Lưu tạm
            </Button>
          </Row>
        </Form>
        <ToastContainer autoClose={2000} />
      </Container>
    </CheckPermission>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
