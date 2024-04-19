import axiosClient from ".";

const authSevices = {
  login(data: { username: string; password: string }) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_AUTH}/auth/login`,
      data
    );
  },
};

export default authSevices;
