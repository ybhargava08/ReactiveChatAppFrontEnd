import { MsgType } from './msgtype.enum';
import { UserStatBean } from './userstatbean';

export class MessageBean {
  userName: String;
  msgType: MsgType; 
  chat: String;
  uniqueId: number;
  chatDate: number;
  typedTime: number;
  userstats: Array<UserStatBean>;
  userAvatarColor: string;
  isChatBot: boolean;
}
