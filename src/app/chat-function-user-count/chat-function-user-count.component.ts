import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageBean } from '../messagebean';
import { WebsocketService } from '../websocket.service';
import { MsgType } from '../msgtype.enum';
import { UserStatBean } from '../userstatbean';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ONLINE_USER_LIST } from '../actions';

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
  @select() onlineUserList;
  
  constructor(private wsService: WebsocketService, private ngRedux: NgRedux<IAppState>) {
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
        if (msgbean && (msgbean.msgType === (MsgType.Joined as string) || msgbean.msgType === (MsgType.Left as string))) { 
            this.ngRedux.dispatch({type: ONLINE_USER_LIST, msgbeanpayload: msgbean});
        }
     }
}

