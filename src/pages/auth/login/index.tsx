/* eslint-disable @next/next/no-img-element */
import Form, { FormContext, Input } from "~/components/common/Form";
import { Fragment, useState } from "react";
import {
  setPermissionList,
  setRole,
  setStateLogin,
  setToken,
} from "~/redux/reducer/auth";

import Button from "~/components/common/Button";
import ImageFill from "~/components/common/ImageFill";
import Link from "next/link";
import Loading from "~/components/common/Loading";
import RequiredLogout from "~/components/protected/RequiredLogout";
import authSevices from "~/services/authSevices";
import clsx from "clsx";
import { httpRequest } from "~/services";
import { setInfoUser } from "~/redux/reducer/user";
import { store } from "~/redux/store";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";

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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await httpRequest({
      showMessageFailed: true,
      http: authSevices.login(form),
    });
    console.log(res)
    if (res) {
      store?.dispatch(setPermissionList(res?.permissionList));
      store?.dispatch(setRole(CasePermission(res?.role)));
      store?.dispatch(setToken(res?.access_token));
      store?.dispatch(setStateLogin(true));
      store?.dispatch(setInfoUser(res));
      replace("/");
    }
  };

  return (
    <RequiredLogout>
      <div className={styles["container-auth"]}>
        <div className={clsx(styles.main, "effectShow")}>
          <div className={styles.form}>
            <h1 className={styles.title}>Chào mừng trở lại</h1>
            <p className={styles.note}>Đăng nhập để truy cập hệ thống.</p>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
              <Input
                bgGrey
                name="email"
                placeholder="Tài khoản đăng nhập"
                isRequired
              />
              <Input
                bgGrey
                name="password"
                type="password"
                placeholder="Mật khẩu"
                isRequired
              />
              {/* <Link
            className={clsx(styles.link, "link")}
            href={ROUTE_NAME.forgotPassword}
          >
            Quên mật khẩu?
          </Link> */}
              <FormContext.Consumer>
                {({ isDone }) => (
                  <div className={styles.btn}>
                    <Button disable={!isDone} primary bold rounded_8>
                      Đăng nhập
                    </Button>
                  </div>
                )}
              </FormContext.Consumer>
            </Form>
          </div>
        </div>
        <div
          className={styles.background}
          // style={{
          //   backgroundImage: `url(${background || backgrounds.login.src})`,
          // }}
        >
          <img 
            src="/images/background.png" 
            alt="Background" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
          />
        </div>
      </div>
    </RequiredLogout>
  );
};

export default Login;
