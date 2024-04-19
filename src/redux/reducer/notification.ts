import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SiteState {
  data: any;
  loading: boolean;
  error: string;
}

const initialState: SiteState = {
  data: [
  {
    id: 1,
    tenBaoCao: 'Báo cáo số 1',
    trangThai: 'Tháng',
    thoiGianBatDau: '2023-01-01',
    thoiGianKetThuc: '2023-01-31',
  },
  {
    id: 2,
    tenBaoCao: 'Báo cáo số 2',
    trangThai: 'Năm',
    thoiDiemBatDau: '2023-02-01',
    thoiDiemKetThuc: '2023-02-28',

  },
  {
    id: 3,
    tenBaoCao: 'Báo cáo số 3',
    trangThai: 'Quý',
    thoiDiemBatDau: '2023-03-01',
    thoiDiemKetThuc: '2023-03-31',
  },
  {
    id: 4,
    tenBaoCao: 'Báo cáo số 4',
    trangThai: 'Đột xuất',
    thoiDiemBatDau: '2023-04-01',
    thoiDiemKetThuc: '2023-04-30',
  },
]
,
  loading: false,
  error: "",
};

export const notificationSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    initNotification: (state, action: PayloadAction<any>) => {
      state.data = action?.payload.notification;
    },
    createNotification: (state, action: PayloadAction<any>) => {
      const notification = action.payload?.notification;

      if (notification) {
        state.data = [
          ...state.data,
          {
            id: state.data.length + 1,
            tenBaoCao: notification.tenBaoCao,
            trangThai: notification.trangThai,
            thoiDiemBatDau: notification.thoiDiemBatDau,
            thoiDiemKetThuc: notification.thoiDiemKetThuc,
          },
        ];
      }
    },
 
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
  },
});

export const { initNotification, createNotification, setLoading } = notificationSlice.actions;

export default notificationSlice.reducer;
