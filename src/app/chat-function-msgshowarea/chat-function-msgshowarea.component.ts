import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private  colors = [
      '#2196F3', '#32c787', '#00BCD4', '#ff5652',
      '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];
  
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
       if (msgbean.msgType === (MsgType.Chat as string)) {
        this.chatMessages.push(msgbean);
      }
    }
  
}

  
