export interface AuthState {
  authToken: string | null;
}
export interface UserState {
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  username: string;
  token: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface SignUpResponse {
  token: string;
}
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}
export interface Collection {
  name: string;
  num_items: number;
  size: number;

  owner: string;
  allFiles: number[];
}

export interface PostCollection {
  name: string;
}
