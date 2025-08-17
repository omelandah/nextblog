import { AxiosInstance, AxiosResponse } from 'axios';

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

export const registerUser = async (
  axios: AxiosInstance,
  values: RegisterFormProps
) => {
  try {
    return await axios.post('/user/register', {
      username: values.username,
      password: values.password,
      email: values.email,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (
  axios: AxiosInstance,
  values: LoginFormProps
) => {
  try {
    return await axios.post('/user/login', {
      ...values,
    });
  } catch (err) {
    console.log(err);
  }
};
