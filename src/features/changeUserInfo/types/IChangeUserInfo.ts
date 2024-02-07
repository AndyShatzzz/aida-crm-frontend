export interface IChangeUserInfo {
  open: boolean;
  setOpen: (params: boolean) => void;
  avatar: string;
  name: string;
  role: string;
  _id: string;
}
