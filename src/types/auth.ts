export interface User {
  pid: string;
  fname: string;
  lname: string;
  uid: string;
  access_token: string;
  hospital_name: string;
  province_name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (pid: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}