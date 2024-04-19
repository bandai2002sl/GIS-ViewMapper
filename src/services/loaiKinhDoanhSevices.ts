import axiosClient from ".";

const loaiKinhDoanhSevices = {
  displayLoaiKinhDoanh(data?: {
    loaiKinhDoanh: string;
    moTa: string;
    tamNgung: string;
  }) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/loai-kinh-doanh`
    );
  },
  getLoaiKinhDoanhId(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/loai-kinh-doanh/${id}`
    );
  },
  createLoaiKinhDoanh(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/loai-kinh-doanh`,
      newItem
    );
  },
  updateLoaiKinhDoanh(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/loai-kinh-doanh/${id}`,
      editedData
    );
  },

  deleteLoaiKinhDoanh(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/loai-kinh-doanh/${id}`
    );
  },
};

export default loaiKinhDoanhSevices;
