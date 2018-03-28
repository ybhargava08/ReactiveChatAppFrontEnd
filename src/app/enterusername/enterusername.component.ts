import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageBean } from '../messagebean';
import { WebsocketService } from '../websocket.service';
import { environment } from '../../environments/environment';
import { MsgType } from '../msgtype.enum';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { UPDATE_USER_DETAILS } from '../actions';


@Component({
  selector: 'app-enterusername',
  templateUrl: './enterusername.component.html',
  styleUrls: ['./enterusername.component.css']
})
export class EnterusernameComponent implements OnInit, OnDestroy {
  
 checkIfEmptyClassName = '';
  constructor(private wsService: WebsocketService, private ngRedux: NgRedux<IAppState>) { }
  public labelVisibility = 'hidden';
  public placeHolderValue = 'Enter Name';
    
  ngOnInit() {
  }
  
  ngOnDestroy(): void {
  }

  addUserToChat(usrName) {
    if (usrName && usrName.trim()) {
            
      const msgbean: MessageBean = {
         userName : usrName,
         msgType : MsgType.Joined,
         chat : '',
         uniqueId: Date.now(),
         chatDate: Date.now(),
         typedTime: 0,
         userstats: [],
         userAvatarColor: '',
         isChatBot: false
      };
      
      this.ngRedux.dispatch({type: UPDATE_USER_DETAILS, msgbeanpayload: msgbean});
      
      this.wsService.connect(environment.websocket_url, msgbean);
    } else {
      const vm = this;
      vm.checkIfEmptyClassName = 'userNameEmpty';
      setTimeout(function() {
         vm.checkIfEmptyClassName = '';
      }, 1100);
    }
  }
  
  onTextBoxFocus () {
    this.labelVisibility = 'visible';
    this.placeHolderValue = '';
  }
  
  onTextBoxBlur () {
    this.labelVisibility = 'hidden';
    this.placeHolderValue = 'Enter Name';
  }
  
}
