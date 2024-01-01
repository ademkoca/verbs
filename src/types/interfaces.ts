export interface Option {
  title: string;
  description: string;
}

export interface Progress {
  name: string;
  used: string[];
  totalGuesses: number;
  correctGuesses: number;
}

export interface IChat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessage {
  chatId: string;
  senderId: string;
  text: string;
  isRead: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
