import axiosClient from ".";

const thuySanSevices = {
    displayThuySan(data:
        {
            name: string,
            moTa: string,
            image: string,
            tamNgung: string,
            icon: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/thuy-san`,
        );
    },
    getThuySanId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/thuy-san/${id}`);
    },
    createThuySan(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/thuy-san`, newItem);
    },
    updateThuySan(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/thuy-san/${id}`, editedData);
    },

    deleteThuySan(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/thuy-san/${id}`);
    },
};

export default thuySanSevices;
