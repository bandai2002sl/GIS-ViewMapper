import axiosClient from ".";

const dienTichTuoiTieuServices = {
    display(data:
        {
            "dienTich": number,
            "ngayThongKe": string,
            "hinhThuc": string,
            "administrativeUnitId": number,
            "cropTypeId": number,
            "icon": string,
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu`,
        );
    },
    getById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`);
    },
    create(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu`, newItem);
    },
    update(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`, editedData);
    },

    delete(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`);
    },
};

export default dienTichTuoiTieuServices;