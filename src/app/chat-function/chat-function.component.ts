import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { trigger , state , style , animate , transition } from '@angular/animations';
import { MsgType } from '../msgtype.enum';

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
         animate('500ms 2500ms ease-in-out', style ({
          left: '0'
      }))
      ]),
    ]),
    trigger ('leaveSlideLeft', [
      transition('void=>*', [
         animate('500ms ease-in-out', style ({
       left: '-130%'
      })),
         animate('500ms 2500ms ease-in-out', style ({
       left: '0'
      }))
      ])
    ]),
  ]
})
export class ChatFunctionComponent implements OnInit, OnDestroy {

  @Input() chatUserName: String;
  @Input() uniqueMsgId: number;
  @Input() avatarColor: string;
  public  userJoined = []; userLeft = []; 
      
  constructor(private wsService: WebsocketService) { 
     wsService.subject.subscribe(msg =>  {
         this.extractMsgAndShow(msg);
     });
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.wsService.subject.unsubscribe();
  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeWindowUnload($event) {
    $event.returnValue = 'Are you sure you want to navigate away? Your chat would be lost';
  }
  
  private extractMsgAndShow(msg: MessageBean) {
     if (msg) {
         if (msg.msgType === MsgType.Joined) {
             if (msg.uniqueId !== this.uniqueMsgId) {
              this.userJoined.push(msg); 
             }
        } else if (msg.msgType === (MsgType.Left as string)) {
             if (msg.uniqueId !== this.uniqueMsgId) {
                  this.userLeft.push(msg);     
          }
        }
     }
  }
}
