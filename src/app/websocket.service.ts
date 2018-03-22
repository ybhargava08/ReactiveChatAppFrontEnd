import { Injectable } from '@angular/core';
import { MessageBean } from './messagebean';
import { Subject } from 'rxjs/Subject';

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
        this.sendMessage(msg);
      };
      
         this.ws.onerror = (e) => {
            
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
  
}
