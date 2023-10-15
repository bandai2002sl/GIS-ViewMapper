import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
}

export function InputValidation() {
    const [errInput, setErrinput] = useState("");
    const [errMess, setErrMess] = useState("")

    const checkValidInput = (newItem: any) => {
        setErrinput("");
        setErrMess("");
        let arrInput = ['diaDiem', 'hinhAnh', 'dangKyKinhDoanh', 'sdt', 'trangThai'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newItem[arrInput[i]]) {
                setErrinput(arrInput[i]);
                setErrMess("Bạn chưa nhập dữ liệu")
                break;
            }
        }
    };
    return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
    const { errInput, errMess, checkValidInput } = InputValidation();

    const handleSave = () => {
        checkValidInput(newItem);
        onSubmit(newItem);
        onClose();
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody >
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="diaDiem">Địa điểm:</Label>
                        <Input
                            type="text"
                            id="diaDiem"
                            placeholder="Địa điểm"
                            value={newItem.diaDiem || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, diaDiem: e.target.value || "" })
                            }}
                        />
                        {errInput === 'diaDiem' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            id="hinhAnh"
                            placeholder="Hình ảnh"
                            value={newItem.hinhAnh || ""}
                            onChange={(e) => setNewItem({ ...newItem, hinhAnh: e.target.value || "" })}
                        />
                        {errInput === 'hinhAnh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="dangKyKinhDoanh">Đăng ký kinh doanh:</Label>
                        <Input
                            type="text"
                            id="dangKyKinhDoanh"
                            placeholder="Đăng ký kinh doanh"
                            value={newItem.dangKyKinhDoanh || ""}
                            onChange={(e) => setNewItem({ ...newItem, dangKyKinhDoanh: e.target.value || "" })}
                        />
                        {errInput === 'dangKyKinhDoanh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="sdt">sdt:</Label>
                        <Input
                            type="text"
                            id="sdt"
                            placeholder="Sdt"
                            value={newItem.sdt || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, sdt: e.target.value || "" })
                            }}
                        />
                        {errInput === 'sdt' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="trangThai">Trạng thái:</Label>
                        <Input
                            type="text"
                            id="trangThai"
                            placeholder="Trạng thái"
                            value={newItem.trangThai || ""}
                            onChange={(e) => setNewItem({ ...newItem, trangThai: e.target.value || "" })}
                        />
                        {errInput === 'trangThai' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>

                </div>
            </ModalBody>
            <div className={styles["modal-footer"]}>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        Lưu
                    </Button>{" "}
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </div>
        </Modal >
    );
}
