import { Component, OnInit, Input, HostListener } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { trigger , state , style , animate , transition } from '@angular/animations';

@Component({
  selector: 'app-chat-function',
  templateUrl: './chat-function.component.html',
  styleUrls: ['./chat-function.component.css'] ,
  animations: [
    trigger ('joinedSlideRight', [
      
      transition('void=>*', [
         animate('500ms ease-in-out', style ({
          left: '160%'
      })),
         animate('500ms 2000ms ease-in-out', style ({
          left: '0'
      }))
      ]),
    ]),
    trigger ('leaveSlideLeft', [
      transition('void=>*', [
         animate('500ms ease-in-out', style ({
       left: '-130%'
      })),
         animate('500ms 2000ms ease-in-out', style ({
       left: '0'
      }))
      ])
    ]),
  ]
})
export class ChatFunctionComponent implements OnInit {

  @Input() chatUserName: String;
  @Input() uniqueMsgId: number;
  public  userJoined = []; userLeft = []; 
    
  constructor(private wsService: WebsocketService) { 
     wsService.subject.subscribe(msg =>  {
         this.extractMsgAndShow(msg);
     });
  }

  ngOnInit() {
  }

  @HostListener('window:unload', ['$event'])
  onWindowUnload(event) {
    const msgbean: MessageBean = {
      userName: this.chatUserName,
      msgType: 'Left',
      chat: '' ,
      uniqueId: this.uniqueMsgId,
      chatDate: Date.now(),
      allUsers: [],      
    };
    this.wsService.sendMessage(msgbean);
    this.wsService.disconnect();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onBeforeWindowUnload($event) {
    $event.returnValue = 'Are you sure you want to navigate away? Your chat would be lost';
  }
  
  private extractMsgAndShow(msg: MessageBean) {
     if (msg) {
         if (msg.msgType === 'Joined') {
             if (msg.uniqueId !== this.uniqueMsgId) {
              this.userJoined.push(msg); 
             }
        } else if (msg.msgType === 'Left') {
             if (msg.uniqueId !== this.uniqueMsgId) {
                  this.userLeft.push(msg);     
          }
        }
     }
  }
}
