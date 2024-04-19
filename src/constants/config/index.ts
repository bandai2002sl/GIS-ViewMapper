import {  MdHome, MdBusiness, MdTimeline, MdEvent, MdDirectionsBoat, MdBuild, MdSettings, MdLocalFlorist, MdLocalGasStation,MdBeachAccess, MdMap,MdWaves } from "react-icons/md";
import { FaUser ,FaBuilding, FaMap, FaFish, FaShip, FaIndustry, FaWater, FaArrowsAltV, FaSwimmingPool, FaGripLines,FaSquare,FaCircle } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
export const MAXIMUM_FILE = 10; //MB
import React from 'react';

export const allowFiles = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];


export enum PATH {
  Home = "/",
  Login = "/auth/login",

  Administrativeunits = "/don-vi-hanh-chinh/don-vi-hanh-chinh",
  Administrativeunitregion = "/don-vi-hanh-chinh/vung-don-vi-hanh-chinh",
  Administrativeunitroad = "/don-vi-hanh-chinh/duong-don-vi-hanh-chinh",
  Reportingperiod = "/don-vi-hanh-chinh/ky-bao-cao",

  Seafood = "/thuy-san",
  SeaFish = "/thuy-san/thuy-san",


  //
  FishingVesselManagement = "/thuy-san/quan-ly-tau-ca",
  AquaticProductProduction = "/thuy-san/san-xuat-thuy-san",
  SeafoodBusinessEstablishments = "/thuy-san/co-so-kinh-doanh",

  PumpStation = "/pt-thuy-loi/tram-bom",
  Canal = "/pt-thuy-loi/kenh-muong",
  Reservoir = "/pt-thuy-loi/ho-chua",
  Drain = "/pt-thuy-loi/cong",
  IrrigatedArea = "/pt-thuy-loi/dien-tich-tuoi-tieu",
  
  
  ReportCreate = "/bao-cao/tao-bao-cao",
  ReportList = "/bao-cao/danh-sach",
  SynthesisReport = "/bao-cao/tong-hop",

  User = "/admin/user"

}

export interface Menu {
  title: string;
  group?: Menu[];
  path?: string;
  Icon?: any;
  selected?: boolean;
}


export const menu: Menu[] = [
  {
    title: "Trang chủ",
    path: PATH.Home,
    Icon: MdHome,
  },
  {
    title: "Đơn vị hành chính",
    group: [
      {
        title: "Đơn vị hành chính",
        path: PATH.Administrativeunits,
        Icon: FaBuilding,
      },
      {
        title: "Vùng đơn vị hành chính",
        path: PATH.Administrativeunitregion,
        Icon: FaMap,
      },
      /*
      {
        title: "Đường đơn vị hành chính",
        path: PATH.Administrativeunitroad,
        Icon: MdTimeline,
      },*/
    ],
  },
  {
    title: "Quản lý thuỷ sản",
    group: [
      {
        title: "Cơ sở kinh doanh",
        path: PATH.SeafoodBusinessEstablishments,
        Icon: MdBusiness,
      },
      {
        title: "Quản lý tàu cá",
        path: PATH.FishingVesselManagement,
        Icon: FaShip,
      },
      {
        title: "Sản xuất thuỷ sản",
        path: PATH.AquaticProductProduction,
        Icon: FaFish,
      },
      {
        title: "Quản lý thuỷ sản",
        path: PATH.SeaFish,
        Icon: FaFish,
      },
    ],
  },
  {
    title: "Quản lý chất lượng thuỷ lợi",
    group: [
      {
        title: "Cống",
        path: PATH.Drain,
        Icon: FaCircle,
      },
      {
        title: "Hồ chứa",
        path: PATH.Reservoir,
        Icon: FaWater,
      },
      {
        title: "Kênh mương",
        path: PATH.Canal,
        Icon:MdTimeline,
      },
      {
        title: "Trạm bơm",
        path: PATH.PumpStation,
        Icon: MdSettings,
      },
      {
        title: "Diện tích tưới tiêu",
        path: PATH.IrrigatedArea,
        Icon: MdLocalFlorist,
      },
    ]
  },
  {
    title: "Quản lý báo cáo",
    group: [
      {
        title: "Kỳ báo cáo",
        path: PATH.Reportingperiod,
        Icon: MdEvent,
      },
      {
        title: "Nhập liệu báo cáo",
        path: PATH.ReportCreate,
        Icon: GiNotebook ,
      },
      {
        title: "Danh sách báo cáo",
        path: PATH.ReportList,
        Icon: CiViewList,
      },
      {
        title: "Tổng hợp báo cáo",
        path: PATH.SynthesisReport,
        Icon:MdTimeline,
      },
      
    ]
  },
  {
    title: "Quản lý người dùng",
    group: [
      {
        title: "Danh sách người dùng",
        path: PATH.User,
        Icon: FaUser ,
      },
     
      
    ]
  },
  
];

export const Languagese = [
  {
    title: "Vietnamese",
    code: "vi",
  },
  {
    title: "China",
    code: "zh-CN",
  },
];
