import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useRouter } from 'next/router';


const ModalNotification = ({ onHide, show, detailNotification }: any) => {
  const router = useRouter();
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

  const  handleCreateReport = () =>{
    router.push('/bao-cao/tao-bao-cao');
    onHide()

  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Báo cáo: {detailNotification.tenBaoCao}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Thời gian bắt đầu: {formatDateTime(detailNotification.thoiDiemBatDau)}
        </p>
        <p>
          Thời gian kết thúc : {formatDateTime(detailNotification.thoiDiemKetThuc)}
        </p>
        <p>
            Trạng thái: {detailNotification.trangThai}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() =>handleCreateReport()}>Tạo báo cáo</Button>
        <Button variant='secondary' onClick={onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};



export default ModalNotification;
