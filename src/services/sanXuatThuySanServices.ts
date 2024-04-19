import axiosClient from ".";

const sanXuatThuySanSevices = {
  displaysanXuatThuySan(data?: {
    diaChi: string;
    moTa: string;
    hinhAnh: string;
    tinhTrang: string;
    toaDo: string;
    icon: string;
  }) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-thuy-san`
    );
  },
  getsanXuatThuySanId(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-thuy-san/${id}`
    );
  },
  createsanXuatThuySan(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-thuy-san`,
      newItem
    );
  },
  updatesanXuatThuySan(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-thuy-san/${id}`,
      editedData
    );
  },

  deletesanXuatThuySan(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-thuy-san/${id}`
    );
  },

  getThuySan() {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/thuy-san`);
  },
};

export default sanXuatThuySanSevices;
