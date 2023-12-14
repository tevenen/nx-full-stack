export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  name: string;
  username: string;
  email: string;
  access_token?: string;
}
