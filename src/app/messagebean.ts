import { UserInfoBean } from './userinfobean';

export class MessageBean {
  userName: String;
  msgType: String;
  chat: String;
  uniqueId: number;
  chatDate: number;
  allUsers: Array<UserInfoBean> ;
}
