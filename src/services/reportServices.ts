import axiosClient from ".";

const ReportServices = {
    displayReport() {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/reports`);
    },
    getReportById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/reports/${id}`);
    },
    createReport(newItem: {}) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/reports`, newItem);
    },
    updateReport(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/reports/${id}`, editedData);
    },
    updateStatusReport(id: number, status: string) {
        console.log({id, status})
        return axiosClient.patch(`${process.env.NEXT_PUBLIC_API_ALL}/reports/${id}`, {newStatus: status});
    },

    deleteReport(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/reports/${id}`);
    },
};

export default ReportServices;