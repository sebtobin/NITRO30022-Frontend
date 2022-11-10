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
  private?: "true" | "false";

  owner?: string;
  allFiles?: number[];
  files_data?: FileData[];
}

export interface FileData {
  id: string;
  title: string;
  document: string;
}

export interface PostCollection {
  name: string;
}

export interface UpdateUserInfoRequest {
  email?: string;
  password?: string;
}
export interface UpdateUserInfo {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateUserInfoResponse {
  email: string;
  password: string;
}
export interface DeleteFile {
  title: string;
  colln: string;
}

export interface UpdateCollection {
  name: string;
  newName?: string;
  private?: "true" | "false";
}

export interface SearchItem {
  searchTerm: string;
  public: "true" | "false";
}
