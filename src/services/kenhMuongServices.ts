import axiosClient from ".";

const kenhMuongServices = {
    display(data:
        {
            "ten": string,
            "chieuDai": number,
            "chieuDaiKienCo": number,
            "administrativeUnitId": number,
            "icon": string,
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong`,
        );
    },
    getById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`);
    },
    create(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong`, newItem);
    },
    update(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`, editedData);
    },

    delete(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`);
    },
};

export default kenhMuongServices;