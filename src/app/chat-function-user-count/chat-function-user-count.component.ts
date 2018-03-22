import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageBean } from '../messagebean';
import { WebsocketService } from '../websocket.service';
import { MsgType } from '../msgtype.enum';
import { UserStatBean } from '../userstatbean';

@Component({
  selector: 'app-chat-function-user-count',
  templateUrl: './chat-function-user-count.component.html',
  styleUrls: ['./chat-function-user-count.component.css']
})
export class ChatFunctionUserCountComponent implements OnInit, OnDestroy {

  public userCount: number;
  @Input() chatUserName: String;
  @Input() public uniqueMsgId: number;
  @Input() public avatarColor: string; 
  public userList = [];
  
  constructor(private wsService: WebsocketService) {
        wsService.subject.subscribe (msg => {
                  this.modifyUserCount(msg);        
        });
   }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.wsService.subject.unsubscribe();
  }
  
  modifyUserCount (msgbean: MessageBean) {
        if (msgbean) { 
          this.userList = msgbean.userstats.sort();
          console.log('userList active: '+this.userList.length);
        }
     }
}

