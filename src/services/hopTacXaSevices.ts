import axiosClient from ".";

const hopTacXaSevices = {
  displayHopTacXa(data?: {
    name: string;
    sdt: string;
    address: string;
    moTa: string;
    linhVucHoatDong: string;
    hinhAnh: string;
    ngayThanhLap: string;
    loaiHinh: string;
    soNguoi: number;
    trangThai: string;
    toaDo: string;
    icon: string;
  }) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/ca-nhan-htx`);
  },
  getHopTacXaId(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/ca-nhan-htx/${id}`
    );
  },
  createHopTacXa(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/ca-nhan-htx`,
      newItem
    );
  },
  updateHopTacXa(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/ca-nhan-htx/${id}`,
      editedData
    );
  },

  deleteHopTacXa(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/ca-nhan-htx/${id}`
    );
  },
};

export default hopTacXaSevices;
