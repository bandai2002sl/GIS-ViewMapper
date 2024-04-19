import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import styles from "~/styles/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import { Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { updatePermissionList } from "~/redux/reducer/account";
import authSevices from "~/services/authSevices";

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
  const role = useSelector((state: any) => state.user.infoUser.role);
  const permission = CasePermission(role);
  // Assuming a mapping between permission IDs and labels
  const permissionLabels: Record<number, string> = {
    1: "Tạo mới",
    2: "Sửa",
    3: "Xoá",
    4: "Xem",
    // Add more mappings as needed
  };

  // Function to get the label for a given permission ID
  const getPermissionLabel = (permissionId: number): string => {
    return permissionLabels[permissionId] || `Permission ${permissionId}`;
  };

  const PermissionGroup = ({
    title,
    pageKey,
    permissionManager,
    handlePermissionChange,
  }: {
    title: string;
    pageKey: string;
    permissionManager: any[];
    handlePermissionChange: (id: number) => void;
  }) => {
    return (
      <>
        <h5>{title}</h5>
        {permissionManager &&
          permissionManager.map((item: any, index: number) => {
            const permissionLabel = getPermissionLabel(item.permissionId);
            if (item.pageKey === pageKey) {
              return (
                <Form.Group
                  as={Col}
                  md="6"
                  controlId={`validationCustom03-${index}`}
                  key={index}
                >
                  <Form.Check
                    type="checkbox"
                    label={`Cho phép ${permissionLabel} `}
                    onChange={() => handlePermissionChange(item.id)}
                    checked={item.active}
                  />
                </Form.Group>
              );
            }

            return null; // Return null for items you want to skip
          })}
      </>
    );
  };

  const dispatch = useDispatch();
  const [donViHanhChinh, setDonViHanhChinh] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem: any) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const formatDateString = (dateString: string): string => {
    const utcDateTime = DateTime.fromISO(dateString, { zone: "UTC" });
    const localDateTime = utcDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
    return localDateTime;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem((prevItem: any) => ({
      ...prevItem,
      email: e.target.value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewItem((prevItem: any) => ({
      ...prevItem,
      role: e.target.value,
    }));
  };

  const handlePermissionChange = (id: number) => {
    const updatedPermissionManager = newItem.permissionManager.map((item) =>
      item.id === id ? { ...item, active: item.active === 0 ? 1 : 0 } : item
    );

    setNewItem((prevItem: any) => ({
      ...prevItem,
      permissionManager: updatedPermissionManager,
    }));
  };

  const handleSave = async () => {
    try {
      const permissionsToSend = newItem.permissionManager.map(
        ({ permissionId, pageKey, active }) => ({
          permissionId,
          pageKey,
          active,
        })
      );

      const resPermission = await authSevices.updatePermission(
        newItem.id,
        permissionsToSend
      );
      const res = await authSevices.updateRole(newItem.id,parseInt(newItem.role))
      if (resPermission && resPermission.success) {
        dispatch(updatePermissionList({ newItem }));
        onClose();
        toast.success("Cập nhật quyền tài khoản thành công.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
    >
      <ModalHeader toggle={onClose}>Chỉnh quyền của tài khoản</ModalHeader>

      <Container>
        <Form noValidate>
          <Row className="mb-4">
            {/* Email input */}
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                required
                value={newItem.email}
                name="email"
                onChange={handleEmailChange}
              />
            </Form.Group>

            {/* Role select */}
            {/* <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Quyền tài khoản</Form.Label>
              <Form.Select
                onChange={handleRoleChange}
                defaultValue={newItem.role}
                name="role"
              >
                ... (options)
              </Form.Select>
  </Form.Group> */}
          </Row>

          {/* Permission checkboxes */}
          <Row>
            <Row>
              {/* Render PermissionGroup for each group */}
              <PermissionGroup
                title="Nhóm quyền Nhập liệu  báo cáo"
                pageKey="4_1"
                permissionManager={newItem.permissionManager}
                handlePermissionChange={handlePermissionChange}
              />
              <PermissionGroup
                title="Quyền danh sách báo cáo"
                pageKey="4_2"
                permissionManager={newItem.permissionManager}
                handlePermissionChange={handlePermissionChange}
              />
              {newItem.role !== 1 ? (
                <PermissionGroup
                  title="Quyền tổng hợp báo cáo"
                  pageKey="4_3"
                  permissionManager={newItem.permissionManager}
                  handlePermissionChange={handlePermissionChange}
                />
              ) : (
                ""
              )}
            </Row>
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
