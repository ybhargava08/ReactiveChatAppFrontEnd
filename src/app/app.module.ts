import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EnterusernameComponent } from './enterusername/enterusername.component';
import { ChatFunctionComponent } from './chat-function/chat-function.component';

import { WebsocketService } from './websocket.service';
import { ChatFunctionUserCountComponent } from './chat-function-user-count/chat-function-user-count.component';
import { ChatFunctionMsgshowareaComponent } from './chat-function-msgshowarea/chat-function-msgshowarea.component';
import { ChatFunctionMsgSendAreaComponent } from './chat-function-msg-send-area/chat-function-msg-send-area.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterusernameComponent,
    ChatFunctionComponent,
    ChatFunctionUserCountComponent,
    ChatFunctionMsgshowareaComponent,
    ChatFunctionMsgSendAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
