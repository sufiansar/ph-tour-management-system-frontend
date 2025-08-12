export interface ISendOtp {
  email: string;
}

export type IResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export interface IVerifyOtp {
  email: string;
  otp: string;
}
