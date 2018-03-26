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
       // let isAdded = false;
        if (msgbean.uniqueId !== this.uniqueMsgId && msgbean.msgType === (MsgType.TypedInd as string)) {
           /* this.typingUserList.forEach((value, index) => {
                 if (value.uniqueId === msgbean.uniqueId) {
                      value.typedTime = msgbean.typedTime;
                      isAdded = true;
                      return ;
                 }
            });
               if (!isAdded) {
                  this.typingUserList.push(msgbean);
               }
        }*/
          
         this.ngRedux.dispatch({type: ADD_TYPED_LIST, msgbeanpayload: msgbean});
        //  this.updateTypedInd();
      }
    }
  
    private removeOldestFromList (): void {
         setInterval(e => {
                  /*this.typingUserList = this.typingUserList.filter(items => 
                         ((Date.now() - items.typedTime) < this.typedKeepAlive ));    */
           this.ngRedux.dispatch({type: REMOVE_TYPED_LIST, keepAliveTime: this.typedKeepAlive});
                     
           //  this.updateTypedInd();
         }, this.typedKeepAlive);
    }
  
  /*private updateTypedInd (): void {
      if (this.typedList.length === 0) {
           this.typeMsg = '';
      } else if (this.typedList.length > 8) {
          this.typeMsg  = '8 or more are typing ...';
      } else  {
           const singularPlural = (this.typedList.length === 1) ? ' is' : ' are';
           this.typeMsg = this.typedList.map(item => item.userName).join(', ') + ' '
              + singularPlural + ' typing...';
      }
  }*/
}
