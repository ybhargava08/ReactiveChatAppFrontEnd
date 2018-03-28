import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { MsgType } from '../msgtype.enum';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_TYPED_LIST, REMOVE_TYPED_LIST } from '../actions';

@Component({
  selector: 'app-chat-function-typeind',
  templateUrl: './chat-function-typeind.component.html',
  styleUrls: ['./chat-function-typeind.component.css']
})
export class ChatFunctionTypeindComponent implements OnInit {

  public typedKeepAlive = 2500;
  
   @Input() public uniqueMsgId: number;
   @select() typedList;
  
  constructor(private wsService: WebsocketService, private ngRedux: NgRedux<IAppState>) {
       this.wsService.subject.subscribe(msgbean => {
             this.addtoTypedList (msgbean);
       });
        this.removeOldestFromList();
   }

  ngOnInit() {
  }
  
    private addtoTypedList (msgbean): void {
        if (msgbean.uniqueId !== this.uniqueMsgId && msgbean.msgType === (MsgType.TypedInd as string)) {
           this.ngRedux.dispatch({type: ADD_TYPED_LIST, msgbeanpayload: msgbean});
      }
    }
  
    private removeOldestFromList (): void {
         setInterval(e => {
            this.ngRedux.dispatch({type: REMOVE_TYPED_LIST, keepAliveTime: this.typedKeepAlive});           
         }, this.typedKeepAlive);
    }
}
