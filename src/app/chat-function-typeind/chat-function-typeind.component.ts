import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { MsgType } from '../msgtype.enum';

@Component({
  selector: 'app-chat-function-typeind',
  templateUrl: './chat-function-typeind.component.html',
  styleUrls: ['./chat-function-typeind.component.css']
})
export class ChatFunctionTypeindComponent implements OnInit {

   public typingUserList = [];
   public typeMsg = '';
  public typedKeepAlive = 2500;
  
   @Input() public uniqueMsgId: number;
  
  constructor(private wsService: WebsocketService) {
       this.wsService.subject.subscribe(msgbean => {
             this.addtoTypedList (msgbean);
       });
        this.removeOldestFromList();
   }

  ngOnInit() {
  }
  
    private addtoTypedList (msgbean): void {
        let isAdded = false;
        if (msgbean.uniqueId !== this.uniqueMsgId && msgbean.msgType === (MsgType.TypedInd as string)) {
            this.typingUserList.forEach((value, index) => {
                 if (value.uniqueId === msgbean.uniqueId) {
                      value.typedTime = msgbean.typedTime;
                      isAdded = true;
                      return ;
                 }
            });
               if (!isAdded) {
                  this.typingUserList.push(msgbean);
               }
        }
      this.updateTypedInd();
    }
  
    private removeOldestFromList (): void {
         setInterval(e => {
                  this.typingUserList = this.typingUserList.filter(items => 
                         ((Date.now() - items.typedTime) < this.typedKeepAlive ));              
             this.updateTypedInd();
         }, this.typedKeepAlive);
    }
  
  private updateTypedInd (): void {
      if (this.typingUserList.length === 0) {
           this.typeMsg = '';
      } else if (this.typingUserList.length > 8) {
          this.typeMsg  = '8 or more are typing ...';
      } else  {
           const singularPlural = (this.typingUserList.length === 1) ? ' is' : ' are';
           this.typeMsg = this.typingUserList.map(item => item.userName).join(', ') + ' '
              + singularPlural + ' typing...';
      }
  }
}
