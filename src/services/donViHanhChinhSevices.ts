import axiosClient from ".";

const donViHanhChinhSevices = {
  displayDonViHanhChinh(data?: {
    maHanhChinh: string;
    ten: string;
    capHanhChinh: number;
    tenVietTat: string;
    toaDo: string;
  }) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/administrative-unit`
    );
  },
  getDonViHanhChinhById(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/administrative-unit/${id}`
    );
  },
  createDonViHanhChinh(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/administrative-unit`,
      newItem
    );
  },
  updateDonViHanhChinh(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/administrative-unit/${id}`,
      editedData
    );
  },

  deleteDonViHanhChinh(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/administrative-unit/${id}`
    );
  },
};

export default donViHanhChinhSevices;
