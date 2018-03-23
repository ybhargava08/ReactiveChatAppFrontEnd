import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { MsgType } from '../msgtype.enum';

@Component({
  selector: 'app-chat-function-msgshowarea',
  templateUrl: './chat-function-msgshowarea.component.html',
  styleUrls: ['./chat-function-msgshowarea.component.css']
})
export class ChatFunctionMsgshowareaComponent implements OnInit, OnDestroy {

  public chatMessages = [];
  public randColor = [];
  @Input() chatUserName: string;
  
  constructor(private wsService: WebsocketService) {
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
      
       if (msgbean.msgType === (MsgType.ChatBotJoin as string)) {
            msgbean.chat = 'Welcome ' + this.chatUserName + ' to Chat Group . ' +  
                  'Seems you are the only one here . Hangon someone might join shortly !!'; 
       }if (msgbean.msgType === (MsgType.ChatBotLeave as string)) {
            msgbean.chat = 'Hey ' + this.chatUserName +   
                  ' Seems all left the group . Hangon someone might join shortly !!'; 
       }
      
       if (msgbean.msgType === (MsgType.Chat as string) || msgbean.msgType === (MsgType.ChatBotJoin as string) || 
                msgbean.msgType === (MsgType.ChatBotLeave as string)) {
        this.chatMessages.push(msgbean);
      }  
    }
  
}

  
