import { PropsHeader } from "./interfaces";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { Icon } from "iconsax-react";
import { IoIosNotifications } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch } from "react-redux";
import { setStateLogin, setToken } from "~/redux/reducer/auth";
import Image from "next/image";
import Button from "~/components/common/Button";
import { PATH } from "~/constants/config";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { Dropdown } from 'react-bootstrap';
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import { initNotification } from "~/redux/reducer/notification";
import ModalNotification from "./ModalNotification";

function Header({}: PropsHeader) {
  const router = useRouter();

  const dispatch = useDispatch();
  const listNotification = useSelector((state:any) => state.notification.data)
  const { replace } = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const role = useSelector((state ) => state.user.infoUser.role);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(setToken(""));
    dispatch(setStateLogin(false));

    router.push(PATH.Home);
  };

  const [modalShow, setModalShow] = useState(false);
  const [detailNotification, setDetailNotification] = useState({});
  
  const handleLogIn = () => {
    replace(PATH.Login);
  };


   useEffect(() => {
    async function fetchData() {
      try {
        const response = await kyBaoCaoSevices.displayKyBaoCao(data);
        const newData = response.data;
        setData(newData);
        setTotal(newData.length);
        dispatch(initNotification({notification: newData}))
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [router]);

  const  handleClickDetailNotifi = (item:any) =>{
    setModalShow(true)
    setDetailNotification(item)
  }

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
    <div className={styles.container}>
      <div className={styles.section1}>
        <Image
          className={styles.logo}
          src="/images/LOGO.png"
          alt="Logo trang web"
          width={100}
          height={100}
        />
      </div>

      <div className={styles.section2}>
        <div className={styles.title}>QUẢN LÝ THUỶ LỢI THUỶ SẢN</div>
      </div>

      {/* <div className={styles.section3}>
        <div className={styles.locationBox}>
          <div className={styles.locationTitle}>
            <div className={styles.locationTitle1}>▼</div>
            <div className={styles.locationTitle2}>Chọn Tỉnh</div>
          </div>

          <ul className={styles.locationList}>
            <li>Ninh Bình</li>
            <li>Tỉnh 2</li>
          </ul>
        </div>

        <div className={styles.locationBox}>
          <div className={styles.locationTitle}>
            <div className={styles.locationTitle1}>▼</div>
            <div className={styles.locationTitle2}>Chọn báo cáo</div>
          </div>

          <ul className={styles.locationList}>
            <li>Huyện 1</li>
            <li>Huyện 2</li>
          </ul>
        </div>

        
      </div>

      <div className={styles.section4}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Nhập vô Enter để tìm kiếm"
            className={styles.input}
          />
        </div>
      </div> */}

        {isLogin && role !== 3 ?
       <Dropdown>
            <Dropdown.Toggle className={styles.customDropdownToggle} style={{background: "none", border: "none"}} id="dropdown-basic">
              <div >
              <IoIosNotifications style={{fontSize: "30px", color: "#fff", marginRight: "20px"}}  />
          
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu  className={styles.boxItem}>
            <h5 style={{marginLeft: "12px"}}>Thông báo</h5>
              {listNotification && listNotification.length > 0 && listNotification.map((item:any, index:number) => (
                <Dropdown.Item key={index} onClick={() => handleClickDetailNotifi(item)} >
                  Báo cáo : {item.tenBaoCao} | thời gian từ {formatDateTime(item.thoiDiemBatDau)} đến {formatDateTime(item.thoiDiemKetThuc)}
                </Dropdown.Item>

              ))}
            </Dropdown.Menu>
        </Dropdown>
          : ""        
      }


            <ModalNotification
              show={modalShow}
              onHide={() => setModalShow(false)}
              detailNotification={detailNotification}
            />

   
     
      <div>
        {isLogin ? (
          <Button primary bold rounded_4 maxContent onClick={handleLogout}>
            Đăng xuất ↩
          </Button>
        ) : (
          <Button primary bold rounded_4 maxContent onClick={handleLogIn}>
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
}
export default Header;
