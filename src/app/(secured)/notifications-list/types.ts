export interface INotification {
  id: string;
  userId: string;
  objectId: string;
  publisher: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    official: boolean;
    accountType: number;
  };
  text: string;
  type: number;
  image: null | string;
  date: string;
  state: number;
  origin: number;
}

export interface INotificationData {
  CRUDopen: boolean;
  notifications: INotification[];
  notificationCount?: number;
}
