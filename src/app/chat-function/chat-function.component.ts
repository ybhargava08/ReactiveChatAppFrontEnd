import { Component, OnInit, Input, Output, HostListener, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { MessageBean } from '../messagebean';
import { trigger , state , style , animate , transition } from '@angular/animations';
import { MsgType } from '../msgtype.enum';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { UPDATE_JOINED_LIST, UPDATE_LEFT_LIST, UPDATE_AVATAR_COLOR } from '../actions';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-chat-function',
  templateUrl: './chat-function.component.html',
  styleUrls: ['./chat-function.component.css'] ,
      changeDetection: ChangeDetectionStrategy.OnPush,
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

  @select() listjoined;
  @select() listLeft;
  @select() userInfo: Observable<MessageBean>;
  storeuserinfobean: MessageBean;
  @Output() toggleChat = new EventEmitter<boolean>();
  subscription: Subscription;
      
  constructor(private wsService: WebsocketService, private ngRedux: NgRedux<IAppState>) { 
     wsService.subject.subscribe(msg =>  {
         this.extractMsgAndShow(msg);
     });
  }

  ngOnInit() {
    this.subscription = this.userInfo.subscribe((userinfobean: MessageBean) => {
      this.storeuserinfobean = userinfobean;
    });
  }
  
  ngOnDestroy() {
    this.wsService.subject.unsubscribe();
    this.subscription.unsubscribe();
  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeWindowUnload($event) {
    $event.returnValue = 'Are you sure you want to navigate away? Your chat would be lost';
  }
  
  private extractMsgAndShow(msg: MessageBean) {
     if (msg) {
               if (msg.msgType === MsgType.Joined) {
                  if (msg.uniqueId !== this.storeuserinfobean.uniqueId) {
                    this.ngRedux.dispatch({type: UPDATE_JOINED_LIST, msgbeanpayload: msg});
                 } else {
                    this.ngRedux.dispatch({type: UPDATE_AVATAR_COLOR, avatarcolor: msg.userAvatarColor});
                     this.toggleChat.emit(true);
                  }
              } else if (msg.msgType === (MsgType.Left as string)) {
                    if (msg.uniqueId !== this.storeuserinfobean.uniqueId) {
                    this.ngRedux.dispatch({type: UPDATE_LEFT_LIST, msgbeanpayload: msg});   
                    } else {
                        this.toggleChat.emit(false);
                    }
                }
     }
  }
}
