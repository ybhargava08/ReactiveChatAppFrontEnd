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
  public avatarColor: string;
  
  ngOnInit() {
  }

  addUserToChat(usrName) {
    if (usrName && usrName.trim()) {
      this.enteredUserName = usrName;
      this.msgId = Date.now();
      
      this.avatarColor = this.getAvatarColor();
      
      const msgbean: MessageBean = {
         userName : this.enteredUserName,
         msgType : MsgType.Joined,
         chat : '',
         uniqueId: this.msgId,
         chatDate: Date.now(),
         typedTime: 0,
         userstats: [],
         userAvatarColor: this.avatarColor
      };
      
      this.wsService.connect(environment.websocket_url, msgbean);
      this.showHideChat = true;
      console.log('this is messagebean : ' + msgbean.userName);
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
  
  private getAvatarColor(): string {
      if (!this.avatarColor) {
         this.avatarColor = '#' + (Math.floor( Math.random() * 0xFFFFFF )).toString(16);
           
           while (this.avatarColor === '#558C89' || this.avatarColor === '#ffffff' || this.avatarColor === '#cee3e2') {
              this.avatarColor = '#' + (Math.floor( Math.random() * 0xFFFFFF )).toString(16);
            }
         }
        return  this.avatarColor;
  }
}
