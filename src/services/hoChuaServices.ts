import axiosClient from ".";

const hoChuaServices = {
    display(data:
        {
            "ten":string,
            "diaChi": string,
            "dungTichThietKe": number,
            "dienTichTuoiThietKe": number,
            "dienTichTuoiThucTe": number,
            "loaiHo": string,
            "administrativeUnitId": number,
            "icon": string,
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/ho-chua`,
        );
    },
    getById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`);
    },
    create(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua`, newItem);
    },
    update(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`, editedData);
    },

    delete(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`);
    },
};

export default hoChuaServices;