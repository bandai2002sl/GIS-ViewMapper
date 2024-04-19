import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SiteState {
  data: any;
  loading: boolean;
  error: string;
}

const initialState: SiteState = {
  data: [
    // {
    //   id: 1,
    //   CreatedOn: '2023-01-01T12:00',
    //   LoaiBaoCao: 'Tháng',
    //   NguoiTao: 'John Doe',
    //   ChucVu: 'Quản lý',
    //   SoSoKinhDoanh: '100',
    //   SoTauCa: '50',
    //   SoCoSoSanXuat: '30',
    //   SoCong: '20',
    //   SoHoChua: '10',
    //   SoTramBom: '15',
    //   SoKenhMuong: '25',
    //   DienTichTieuTieu: '2000',
    //   DonViBaoCao: 'Xã Khánh Dương',
    //   TrangThai: "Lưu tạm"
    // },

    ],
  loading: false,
  error: "",
};

export const reportSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    initReport: (state, action: PayloadAction<any>) => {
      state.data = action?.payload;
    },
    createReport: (state, action: PayloadAction<any>) => {
      console.log(action.payload.role)
      console.log(action.payload.Public)
      state.data = [
        ...state.data,
        {
          id: state.data.length + 1,
          CreatedOn: action.payload.newItem.CreatedOn,
          LoaiBaoCao: action.payload.newItem.LoaiBaoCao,
          NguoiTao: action.payload.newItem.NguoiTao,
          ChucVu: action.payload.newItem.ChucVu,
          SoSoKinhDoanh: action.payload.newItem.SoSoKinhDoanh,
          SoTauCa: action.payload.newItem.SoTauCa,
          SoCoSoSanXuat: action.payload.newItem.SoCoSoSanXuat,
          SoCong: action.payload.newItem.SoCong,
          SoHoChua: action.payload.newItem.SoHoChua,
          SoTramBom: action.payload.newItem.SoTramBom,
          SoKenhMuong: action.payload.newItem.SoKenhMuong,
          DienTichTieuTieu: action.payload.newItem.DienTichTieuTieu,
          DonViBaoCao: action.payload.newItem.DonViBaoCao,
          TrangThai: action.payload.newStatus,
          Public: action.payload.Public,
          Role: action.payload.role,
        },
      ];
    },
     updateReport: (state, action: PayloadAction<any>) => {
    const updatedReports = state.data.map((report:any) => {
      if (report.id === action.payload?.newItem?.id) {
        return {
          ...report,
            CreatedOn: action.payload?.newItem?.CreatedOn,
            LoaiBaoCao: action.payload?.newItem?.LoaiBaoCao,
            NguoiTao: action.payload?.newItem?.NguoiTao,
            ChucVu: action.payload?.newItem?.ChucVu,
            SoSoKinhDoanh: action.payload?.newItem?.SoSoKinhDoanh,
            SoTauCa: action.payload?.newItem?.SoTauCa,
            SoCoSoSanXuat: action.payload?.newItem?.SoCoSoSanXuat,
            SoCong: action.payload?.newItem?.SoCong,
            SoHoChua: action.payload?.newItem?.SoHoChua,
            SoTramBom: action.payload?.newItem?.SoTramBom,
            SoKenhMuong: action.payload?.newItem?.SoKenhMuong,
            DienTichTieuTieu: action.payload?.newItem?.DienTichTieuTieu,
            DonViBaoCao: action.payload?.newItem?.DonViBaoCao,
            Public: action.payload.newItem.Public,
            Role: action.payload.newItem.Role,
        };
      }
      return report;
    });

    state.data = updatedReports;
  },

  updateStatus: (state, action: PayloadAction<any>) => {
  const { id, newStatus } = action.payload;

  const reportToUpdate = state.data.find((report: any) => report.id === id);

  if (reportToUpdate) {
    reportToUpdate.TrangThai = newStatus;
  }

  state.data = [...state.data];

  
},

  removeReport: (state, action: PayloadAction<number>) => {
    state.data = state.data.filter((report:any) => report.id !== action.payload);
  },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
  },
});

export const { initReport, setLoading, createReport, updateReport, removeReport, updateStatus } = reportSlice.actions;

export default reportSlice.reducer;
