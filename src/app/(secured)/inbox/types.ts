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
  currentLoggedUser: IUser | object;
  currentIndex: number;
  users: IUser[];
  dataLoading: boolean;
}
