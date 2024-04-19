import axiosClient from ".";

const uploadFileService = {
    getFilePath(path: string) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/upload/${path}`);
    },
    uploadFile(file: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/upload`,file,{
            headers: {
              "Content-Type": "multipart/form-data",
            }});
    }
};

export default uploadFileService;
