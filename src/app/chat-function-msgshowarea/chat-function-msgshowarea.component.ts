import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';

@Component({
  selector: 'app-chat-function-msgshowarea',
  templateUrl: './chat-function-msgshowarea.component.html',
  styleUrls: ['./chat-function-msgshowarea.component.css']
})
export class ChatFunctionMsgshowareaComponent implements OnInit {

  public chatMessages = [];
  
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

    extractChatMsg(msgbean: MessageBean) {
       if (msgbean.msgType === 'Chat') {
        this.chatMessages.push(msgbean);
      }
    }
  
   public getAvatarColor(usrName) {
     let hash = 0;
        for (let i = 0; i < usrName.length; i++) {
            hash = 31 * hash + usrName.charCodeAt(i);
        }
        const index = Math.abs(hash % this.colors.length);
        return this.colors[index];
  }
  
}
