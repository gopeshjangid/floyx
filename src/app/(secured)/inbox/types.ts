export interface IUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  official: boolean;
  accountType: number;
  blockedUsers: string[];
  userReported: boolean;
  reportedUsers: string[];
  reportedPosts: string[];
  reportedArticles: string[];
  allowPrivateMassages?: boolean;
}

export interface LastMessage {
  date: string;
  status: number;
}

export interface IThread {
  lastMessageDate: string;
  user: IUser;
  lastMessageStatus: number;
  unreadCount: number;
}

export interface IInboxData {
  threads: IThread[];
  currentLoggedUser: any;
  currentIndex: number;
  users: IUser[];
  dataLoading: boolean;
}

export interface IMessage {
  text: string;
  time: string;
  user: IUser;
  oppositUser: IUser;
  id: string;
  date: string;
}
