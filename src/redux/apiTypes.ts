export interface AuthState {
  authToken: string | null;
}

export interface LoginResponse {
  username: string;
  token: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
