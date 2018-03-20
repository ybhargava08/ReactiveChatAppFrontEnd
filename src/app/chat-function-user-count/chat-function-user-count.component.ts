import { Component, OnInit, Input } from '@angular/core';
import { MessageBean } from '../messagebean';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat-function-user-count',
  templateUrl: './chat-function-user-count.component.html',
  styleUrls: ['./chat-function-user-count.component.css']
})
export class ChatFunctionUserCountComponent implements OnInit {

  public userCount: number;
  @Input() chatUserName: String;
  @Input() public uniqueMsgId: String;
  public userList = [];
  
  constructor(private wsService: WebsocketService) {
        wsService.subject.subscribe (msg => {
                  this.modifyUserCount(msg);        
        });
   }

  ngOnInit() {
  }
  
  modifyUserCount (msgbean: MessageBean) {
     if (msgbean && ('Joined' === msgbean.msgType || 'Left' === msgbean.msgType )) {
         this.userList.length = 0;
         this.convertListToString(msgbean);
         this.userCount = msgbean.allUsers.length;
     } 
  }
  
  private convertListToString(msgbean) {
     msgbean.allUsers.forEach ((value, index) => {
         let name = value.name;
         if (value.uniqueId === this.uniqueMsgId) { 
            name = 'you';
         }
        this.userList.push(name) ;
     });
    this.userList.sort();
  }
   
}
