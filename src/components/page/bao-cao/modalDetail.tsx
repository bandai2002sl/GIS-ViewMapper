import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import { Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateStatus } from "~/redux/reducer/report";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import ReportServices from "~/services/reportServices";

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: any) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  data: any[];
}

export default function ModalDetail({
  isOpen,
  onClose,
  newItem,
  setNewItem,
}: ModalDetailProps) {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const res = await ReportServices.updateStatusReport(newItem.id, "Đã gửi");
      if (res) {
        dispatch(
          updateStatus({
            id: newItem.id,
            newStatus: "Đã gửi",
          })
        );
        onClose();
        toast.success("Gửi báo cáo thành công.");
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
      <ModalHeader toggle={onClose}>Chi tiết báo cáo</ModalHeader>

      <Container>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Ngày tạo báo cáo</Form.Label>
              <Form.Control
                required
                type="datetime-local"
                value={formatDateString(newItem.CreatedOn)}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Kỳ báo cáo</Form.Label>
              <Form.Select value={newItem.LoaiBaoCao}>
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
                  type="text"
                  placeholder="Họ và tên"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.NguoiTao}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chức vụ"
                required
                value={newItem.ChucVu}
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
                  type="text"
                  placeholder="cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoSoKinhDoanh}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số tàu cá</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="số tàu cá"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoTauCa}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng cơ sở sản xuất thuỷ sản</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="số cơ sở kinh doanh"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoCoSoSanXuat}
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
                  type="text"
                  placeholder="số cống"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoCong}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số hồ chứa</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="sồ hồ chứa"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoHoChua}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số trạm bơm</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="số trạm bơm"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoTramBom}
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
                  type="text"
                  placeholder="số kênh mương"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.SoKenhMuong}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Tổng số diện tích tưới tiêu</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="diện tích tưới tiêu"
                  aria-describedby="inputGroupPrepend"
                  value={newItem.DienTichTieuTieu}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md="9" controlId="validationCustomUsername">
              <Form.Label>Đơn vị báo cáo</Form.Label>

              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                value={newItem.DonViBaoCao}
                required
              />
            </Form.Group>
          </Row>
        </Form>
      </Container>

      <div className={styles["modal-footer"]}>
        <ModalFooter>
          {(newItem.TrangThai && newItem.TrangThai === "Lưu tạm") ||
          newItem.TrangThai === "Yêu cầu cập nhật" ? (
            <Button color="primary" onClick={() => handleSubmit()}>
              Gửi
            </Button>
          ) : (
            ""
          )}
          <Button color="secondary" onClick={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}
