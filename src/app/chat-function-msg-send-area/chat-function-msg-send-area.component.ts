import { Component, OnInit, Input} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';

@Component({
  selector: 'app-chat-function-msg-send-area',
  templateUrl: './chat-function-msg-send-area.component.html',
  styleUrls: ['./chat-function-msg-send-area.component.css']
})
export class ChatFunctionMsgSendAreaComponent implements OnInit {

  @Input() public chatUserName: String;
  @Input() public uniqueMsgId: number;
  
  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
  }

   public sendMsg(chatText) {
     const msgBean: MessageBean = {
       userName: this.chatUserName,
       chat: chatText,
       msgType: 'Chat',
       uniqueId: this.uniqueMsgId,
       chatDate: Date.now(),
       allUsers: [],
     };
     this.wsService.sendMessage(msgBean);
  }

}
