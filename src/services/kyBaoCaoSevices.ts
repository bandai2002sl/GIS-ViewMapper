import axiosClient from ".";

const kyBaoCaoSevices = {
  displayKyBaoCao(data?: {
    tenBaoCao: string;
    thoiDiemBatDau: string;
    thoiDiemKetThuc: string;
    trangThai: string;
  }) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/ky-bao-cao`);
  },
  getKyBaoCaoId(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/ky-bao-cao/${id}`
    );
  },
  createKyBaoCao(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/ky-bao-cao`,
      newItem
    );
  },
  updateKyBaoCao(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/ky-bao-cao/${id}`,
      editedData
    );
  },

  deleteKyBaoCao(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/ky-bao-cao/${id}`
    );
  },
};

export default kyBaoCaoSevices;
