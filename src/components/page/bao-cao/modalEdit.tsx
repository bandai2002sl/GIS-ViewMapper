import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import { Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";
import { updateReport } from "~/redux/reducer/report";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

import ReportServices from "~/services/reportServices";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: any) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  data: any[];
}

export default function ModalEdit({
  isOpen,
  onClose,
  onSubmit,
  newItem,
  setNewItem,
}: ModalEditProps) {
  const dispatch = useDispatch();
  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    donViHanhChinhSevices.displayDonViHanhChinh().then((res) => {
      setDonViHanhChinh(
        res.data.map((x: { id: any; ten: any }) => {
          return {
            value: x.id,
            label: x.ten,
          };
        })
      );
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem: any) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await ReportServices.updateReport(newItem.id, newItem);
      if (res) {
        console.log(newItem);
        dispatch(updateReport({ newItem }));
        onClose();
        toast.success("Chỉnh sửa báo cáo thành công.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
    }
  };

  const formatDateString = (dateString: string): string => {
    const utcDateTime = DateTime.fromISO(dateString, { zone: "UTC" });
    const localDateTime = utcDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
    return localDateTime;
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
    >
      <ModalHeader toggle={onClose}>Chỉnh sửa báo cáo</ModalHeader>

      <Container>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Ngày tạo báo cáo</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                required
                type="datetime-local"
                defaultValue={formatDateString(newItem.CreatedOn)}
                name="CreatedOn"
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Kỳ báo cáo</Form.Label>
              <Form.Select
                onChange={handleInputChange}
                defaultValue={newItem.LoaiBaoCao}
                name="LoaiBaoCao"
              >
                <option>Năm</option>
                <option>Tháng</option>
                <option>Quý</option>
                <option>Đột xuất</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>Người lập báo cáo</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Họ và tên"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.NguoiTao}
                  name="NguoiTao"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                type="text"
                placeholder="Chức vụ"
                required
                defaultValue={newItem.ChucVu}
                name="ChucVu"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Card.Title>Đối tượng báo cáo : Thuỷ sản</Card.Title>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số sở kinh doanh</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoSoKinhDoanh}
                  name="SoSoKinhDoanh"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số tàu cá</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="số tàu cá"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoTauCa}
                  name="SoTauCa"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng cơ sở sản xuất thuỷ sản</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="số cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoCoSoSanXuat}
                  name="SoCoSoSanXuat"
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
                  onChange={handleInputChange}
                  type="text"
                  placeholder="số cống"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoCong}
                  name="SoCong"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số hồ chứa</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="sồ hồ chứa"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoHoChua}
                  name="SoHoChua"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số trạm bơm</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="số trạm bơm"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoTramBom}
                  name="SoTramBom"
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
                  onChange={handleInputChange}
                  type="text"
                  placeholder="số kênh mương"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.SoKenhMuong}
                  name="SoKenhMuong"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số diện tích tưới tiêu</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  onChange={handleInputChange}
                  type="text"
                  placeholder="diện tích tưới tiêu"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={newItem.DienTichTieuTieu}
                  name="DienTichTieuTieu"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md="9" controlId="validationCustomUsername">
              <Form.Label>Đơn vị báo cáo</Form.Label>
              <Form.Select
                value={newItem.DonViBaoCao} // Set the selected value here
                onChange={(e) =>
                  setNewItem({ ...newItem, DonViBaoCao: e.target.value })
                }
                aria-label="Default select example"
              >
                {/* The default option should not have defaultValue */}
                <option disabled hidden value="">
                  -- Select Đơn vị báo cáo --
                </option>

                {donViHanhChinh &&
                  donViHanhChinh.map((item: any) => (
                    <option key={item.value} value={item.label}>
                      {item.label}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      <div className={styles["modal-footer"]}>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Cập nhật
          </Button>{" "}
          <Button color="secondary" onClick={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}
