import axiosClient from ".";

const authSevices = {
  async login(data: { email: string; password: string }) {
    return await axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/login`,
      data
    );
  },

  async register(data:{email:string,password:string,role:number}){
     const res= await axiosClient.post(`${process.env.NEXT_PUBLIC_API_AUTH}/authentication/register`,data)
     return res.data
  },
  
  getAllUser() {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/users`
    );
  },
  
  deleteUser(id : number) {
    return axiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/${id}`
    );
  },

  updateRole(id : number, newRole : number) {
    return axiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/update-role/${id}`,{newRole}
    );
  },

  

  updatePermission(id : number, newPermission : {}) {

    const dataToSend = {
      newPermissionList: newPermission,
    };
    return axiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_AUTH}/authentication/update-permission/${id}`,dataToSend
    );
  },



};

export default authSevices;
