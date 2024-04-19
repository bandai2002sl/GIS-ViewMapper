import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";
import router from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";
import Select from "~/components/common/Select";
import ReactSelect from "react-select";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import sanXuatThuySanSevices from "~/services/sanXuatThuySanServices";
import tauCaServices from "~/services/quanLyTauCaServices";
import { Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function InputValidation() {
  const [errInput, setErrinput] = useState("");
  const [errMess, setErrMess] = useState("");

  const checkValidInput = (newItem: any) => {
    setErrinput("");
    setErrMess("");
    let arrInput = [
      "diaDiem",
      "hinhAnh",
      "dangKyKinhDoanh",
      "sdt",
      "trangThai",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!newItem[arrInput[i]]) {
        setErrinput(arrInput[i]);
        setErrMess("Bạn chưa nhập dữ liệu");
        break;
      }
    }
  };
  return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({
  isOpen,
  onClose,
}: AddNewItemModalProps) {
  const { errInput, errMess, checkValidInput } = InputValidation();

  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const [htx, setHtx] = useState<
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

    hopTacXaSevices.displayHopTacXa().then((res) => {
      setHtx(
        res.data.map((x: { id: any; name: any }) => {
          return {
            value: x.id,
            label: x.name,
          };
        })
      );
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
      scrollable
    >
      <Container>
        <h4 className={styles.title__report}>Tạo báo cáo</h4>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Ngày tạo báo cáo</Form.Label>
              <Form.Control required type="datetime-local" />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Kỳ báo cáo</Form.Label>
              <Form.Select>
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
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control type="text" placeholder="Chức vụ" required />
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
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md="9" controlId="validationCustomUsername">
              <Form.Label>Đơn vị báo cáo</Form.Label>

              <ReactSelect options={donViHanhChinh} />
            </Form.Group>
          </Row>
        </Form>
      </Container>

      <div className={styles["modal-footer"]}>
        <ModalFooter>
          <Button type="submit">Gửi đi</Button>
          <Button variant="warning" type="submit">
            Lưu tạm
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}

//  <Container>
//       <h4 className={styles.title__report}>Tạo báo cáo</h4>
//       <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
//       <Row className="mb-4">
//         <Form.Group as={Col} md="5" controlId="validationCustom01">
//           <Form.Control
//             required
//             type="datetime-local"
//             placeholder="First name"
//             defaultValue="Mark"
//           />

//         </Form.Group>
//         <Form.Group as={Col} md="5" controlId="validationCustom02">
//           <Form.Label>Kỳ báo cáo</Form.Label>
//           <Form.Select>
//             <option>Năm</option>
//             <option>Tháng</option>
//             <option>Quý</option>
//             <option>Đột xuất</option>
//           </Form.Select>

//         </Form.Group>

//       </Row>
//       <Row className="mb-4">
//         <Form.Group as={Col} md="5" controlId="validationCustomUsername">
//           <Form.Label>Người lập báo cáo</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="Họ và tên"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom03">
//           <Form.Label>Chức vụ</Form.Label>
//           <Form.Control type="text" placeholder="Chức vụ" required />

//         </Form.Group>

//       </Row>
//       <Row className="mb-3">
//        <Form.Group as={Col} md="5" controlId="validationCustom02">
//           <Card.Title>Đối tượng báo cáo : Thuỷ sản</Card.Title>

//         </Form.Group>
//       </Row>
//       <Row className="mb-5">
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số sở kinh doanh</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="cơ sở kinh doanh"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số tàu cá</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="số tàu cá"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng cơ sở sản xuất thuỷ sản</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="số cơ sở kinh doanh"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//       </Row>

//       <Row className="mb-3">
//        <Form.Group as={Col} md="5" controlId="validationCustom02">
//           <Card.Title>Đối tượng báo cáo : Thuỷ lợi</Card.Title>

//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số cống</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="số cống"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số hồ chứa</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="sồ hồ chứa"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số trạm bơm</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="số trạm bơm"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số kênh mương</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="số kênh mương"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Tổng số diện tích tưới tiêu</Form.Label>
//           <InputGroup hasValidation>
//             <Form.Control
//               type="text"
//               placeholder="diện tích tưới tiêu"
//               aria-describedby="inputGroupPrepend"
//               required
//             />

//           </InputGroup>
//         </Form.Group>
//       </Row>
//       <Row className="mb-5">
//           <Form.Group as={Col} md="9" controlId="validationCustomUsername">
//             <Form.Label>Đơn vị báo cáo</Form.Label>

//             <ReactSelect
//                 options={donViHanhChinh}
//             />

//           </Form.Group>

//       </Row>
//     <Row md={5}  className={styles.box__btn}  >
//       <Button   type="submit">Gửi đi</Button>
//       <Button  variant="warning"  type="submit">Lưu tạm</Button>

//     </Row>

//     </Form>

//       </Container>
