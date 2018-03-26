import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { MsgType } from '../msgtype.enum';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { UPDATE_CHAT_MSG_LIST } from '../actions';

@Component({
  selector: 'app-chat-function-msgshowarea',
  templateUrl: './chat-function-msgshowarea.component.html',
  styleUrls: ['./chat-function-msgshowarea.component.css']
}) 
export class ChatFunctionMsgshowareaComponent implements OnInit, OnDestroy {

//  public chatMessages = [];
  public randColor = [];
  @Input() chatUserName: string;
 // @select() chatbotmsgbean;
  @select() listchatmsgbeans;
  
  constructor(private wsService: WebsocketService , private ngRedux: NgRedux<IAppState>) {
      wsService.subject.subscribe( msg => {
           this.extractChatMsg(msg);
      });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.wsService.subject.unsubscribe();
  }
  
    extractChatMsg(msgbean: MessageBean) {
       //let chatBotPayload = '';
       if (msgbean.msgType === (MsgType.ChatBotJoin as string)) {
             msgbean.chat = 'Welcome ' + this.chatUserName + ' to Chat Group . ' +  
                  'Seems you are the only one here . Hangon someone might join shortly !!'; 
         
         //this.ngRedux.dispatch({action: UPDATE_CHATBOT_MSG_BEAN, chatbotmsgpayload: chatBotPayload});
         
       } else if (msgbean.msgType === (MsgType.ChatBotLeave as string)) {
            msgbean.chat = 'Hey ' + this.chatUserName +   
                  ' Seems all left the group . Hangon someone might join shortly !!'; 
         
         //this.ngRedux.dispatch({action: UPDATE_CHATBOT_MSG_BEAN, chatbotmsgpayload: chatBotPayload});
       }
      
       if (msgbean.msgType === (MsgType.Chat as string) || msgbean.msgType === (MsgType.ChatBotJoin as string) || 
                msgbean.msgType === (MsgType.ChatBotLeave as string)) {
          this.ngRedux.dispatch({type: UPDATE_CHAT_MSG_LIST, msgbeanpayload: msgbean});
      }  
    }
  
}

  
