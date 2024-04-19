import axiosClient from ".";

const cayTrongSevices = {
  displayCayTrong(data?: {
    name: string;
    moTa: string;
    image: string;
    tamNgung: string;
    icon: string;
  }) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/crop-type`);
  },
  getCayTrongId(id: number) {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_ALL}/crop-type/${id}`
    );
  },
  createCayTrong(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/crop-type`,
      newItem
    );
  },
  updateCayTrong(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/crop-type/${id}`,
      editedData
    );
  },

  deleteCayTrong(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/crop-type/${id}`
    );
  },
};

export default cayTrongSevices;
