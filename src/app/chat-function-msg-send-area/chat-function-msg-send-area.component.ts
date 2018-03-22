import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { MsgType } from '../msgtype.enum';

@Component({
  selector: 'app-chat-function-msg-send-area',
  templateUrl: './chat-function-msg-send-area.component.html',
  styleUrls: ['./chat-function-msg-send-area.component.css']
})
export class ChatFunctionMsgSendAreaComponent implements OnInit, OnDestroy {

  @Input() public chatUserName: String;
  @Input() public uniqueMsgId: number;
  @Input() public avatarColor: string;
  
   subscription: Subscription; 
  @ViewChild ('chatText') chatText: ElementRef; 
  constructor(private wsService: WebsocketService) { 
  }

  ngOnInit() {
     this.subscription = Observable.fromEvent(this.chatText.nativeElement, 'keypress').debounceTime(100).subscribe( e => {
        if (this.chatText.nativeElement.value && this.chatText.nativeElement.value.trim()) {
          this.wsService.sendMessage(this.createTypedMessageBean());
       }
     });
  }
  
  ngOnDestroy() {
       this.subscription.unsubscribe();
  }

   public sendMsg(chatText) {
      
      if (chatText && chatText.trim()) {
   
     const msgBean: MessageBean = {
       userName: this.chatUserName,
       chat: chatText,
       msgType: MsgType.Chat,
       uniqueId: this.uniqueMsgId,
       chatDate: Date.now(),
       typedTime: 0,
       userstats: [],
       userAvatarColor: this.avatarColor
     };
     this.wsService.sendMessage(msgBean);
     }
  }

   private createTypedMessageBean(): MessageBean {
      const msgbean: MessageBean = {
         userName : this.chatUserName,
         msgType : MsgType.TypedInd,
         chat : '',
         uniqueId: this.uniqueMsgId,
         chatDate: Date.now(),
         typedTime: Date.now(),
         userstats: [],
         userAvatarColor: this.avatarColor
      };
      return msgbean;
   }
}
