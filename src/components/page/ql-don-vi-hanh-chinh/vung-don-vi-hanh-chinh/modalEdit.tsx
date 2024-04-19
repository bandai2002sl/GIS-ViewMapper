import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import vungDonViHanhChinhSevices from "~/services/vungDonViHanhChinhServices";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedData: any;
    setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
    isOpen,
    onClose,
    editedData,
    setEditedData,
}: ModalEditProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [form, setForm] = useState({ ...editedData })

    const handleSubmit = async () => {
        if (!form.administrativeUnitId) {
            alert("Vui lòng chọn đơn vị hành chính.");
            return;
        }
        try {
            let res: any = await vungDonViHanhChinhSevices.updateVungDonViHanhChinh(form.id, form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setEditedData(null);
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await donViHanhChinhSevices.displayDonViHanhChinh(listHanhChinh);
                const options = response.data.map((item: any) => ({
                    label: item.ten, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListHanhChinh(options);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleDVHanhChinhChange = (selectedOption: any) => {
        setForm({
            ...form,
            administrativeUnitId: selectedOption.value,
        });
    };
    console.log("check", form)
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>CẬP NHẬT</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <ReactSelect
                            options={listHanhChinh}
                            onChange={handleDVHanhChinhChange}
                            placeholder="Chọn đơn vị hành chính..."
                        />
                        <div style={{ marginBottom: '13px' }}>Đơn vị hành chính</div>
                        <Input
                            name="moTa"
                            label="Mô Tả"
                            placeholder="Nhập mô tả"
                            isRequired
                        />
                        <Input
                            name="vung"
                            label="Vùng hành chính: MULTIPOLYGON(((0 0,0 1,1 1,1 0,0 0)))"
                            placeholder="Nhập vùng hành chính"
                            isRequired
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        Lưu thay đổi
                    </Button>
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Form>
        </Modal >
    );
}
