import axiosClient from ".";

const tramBomServices = {
  display(data: {
    ten: string;
    diaChi: string;
    congXuat: number;
    loaiHinh: string;
    administrativeUnitId: number;
    icon: string;
  }) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom`);
  },
  getById(id: number) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom/${id}`);
  },
  create(newItem: any) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/tram-bom`,
      newItem
    );
  },
  update(id: number, editedData: any) {
    return axiosClient.put(
      `${process.env.NEXT_PUBLIC_API_ALL}/tram-bom/${id}`,
      editedData
    );
  },

  delete(id: number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_ALL}/tram-bom/${id}`
    );
  },
};

export default tramBomServices;
