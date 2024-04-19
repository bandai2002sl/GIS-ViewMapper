import axiosClient from ".";

const congServices = {
    displayCong(data:
        {
            "icon":string,
            "ten": string,
            "diaChi": string,
            "kichCo": string,
            "loaiKichThuoc": string,
            "loaiHinh": string,
            "administrativeUnitId": number
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/cong`,
        );
    },
    getById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/cong/${id}`);
    },
    createCong(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/cong`, newItem);
    },
    updateCong(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/cong/${id}`, editedData);
    },

    deleteCong(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/cong/${id}`);
    },
};

export default congServices;