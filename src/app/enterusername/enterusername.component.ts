import { Component, OnInit } from '@angular/core';
import { MessageBean } from '../messagebean';
import { WebsocketService } from '../websocket.service';
import { environment } from '../../environments/environment';
import { MsgType } from '../msgtype.enum';

@Component({
  selector: 'app-enterusername',
  templateUrl: './enterusername.component.html',
  styleUrls: ['./enterusername.component.css']
})
export class EnterusernameComponent implements OnInit {

 checkIfEmptyClassName = '';
  constructor(private wsService: WebsocketService) { }
  public enteredUserName: String;
  public msgId: number;
  public showHideChat = false;
  public labelVisibility = 'hidden';
  public placeHolderValue = 'Enter Name';
  
  ngOnInit() {
  }

  addUserToChat(usrName) {
    if (usrName && usrName.trim()) {
      this.enteredUserName = usrName;
      this.msgId = Date.now();
            
      const msgbean: MessageBean = {
         userName : this.enteredUserName,
         msgType : MsgType.Joined,
         chat : '',
         uniqueId: this.msgId,
         chatDate: Date.now(),
         typedTime: 0,
         userstats: [],
         userAvatarColor: '',
         isChatBot: false
      };
      
      this.wsService.connect(environment.websocket_url, msgbean);
      this.showHideChat = true;
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
