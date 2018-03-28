import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Basic Group Chat';
  showHideChat = false;
  
  toggleChat(val: boolean) {
      this.showHideChat = val;
  }
}
