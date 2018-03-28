import { Injectable } from '@angular/core';
import { MessageBean } from './messagebean';
import { Subject } from 'rxjs/Subject';
import { MsgType } from './msgtype.enum';

@Injectable()
export class WebsocketService {
  private ws;
  public subject: Subject<MessageBean>;
  constructor() { 
       if (!this.subject) {
         this.subject = new Subject<MessageBean>();
       }
  }
  
  public connect(url, msg: MessageBean): void {
       this.ws = new WebSocket(url);
       this.ws.onopen = (e) => {
         
       // console.log('opened websoc conn ' + this.ws.readyState + 'bean sent ' + msg.uniqueId + ' ' + msg.userName);
        this.sendMessage(msg);
      };
      
         this.ws.onerror = (e) => {
            this.subject.next(this.createErrorBean());
        };
     
        this.ws.onmessage  = (e) => {
          this.subject.next(JSON.parse(e.data));
        };
            
     
        this.ws.onclose = (e) => {
           
        };
    }
  
    public sendMessage(msg: MessageBean): void {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg));
      }
  }
  
  public disconnect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.close();
    }
  }
  
  private createErrorBean(): MessageBean {
      const errorbean: MessageBean = {
        userName : '',
         msgType : MsgType.Error,
         chat : '',
         uniqueId: Date.now(),
         chatDate: Date.now(),
         typedTime: 0,
         userstats: [],
         userAvatarColor: '',
         isChatBot: false
      };
     return errorbean;
  }
  
}
