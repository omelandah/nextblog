import axiosInstance from '@/utils/axiosInstance';

export interface LoginFormProps {
  username: string;
  password: string;
}

export interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = async (values: RegisterFormProps) => {
  try {
    return await axiosInstance.post('/user/register', {
      username: values.username,
      password: values.password,
      email: values.email,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (values: LoginFormProps) => {
  try {
    return await axiosInstance.post('/user/login', {
      ...values,
    });
  } catch (err) {
    console.log(err);
  }
};
