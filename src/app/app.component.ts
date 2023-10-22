import { Component, OnInit } from '@angular/core';
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'poc-push-app';
  message: MessagePayload | undefined;
  messaging

  constructor(){
    this.messaging = getMessaging();

  }

  ngOnInit(): void {
    this.requestPermission();
  }


  requestPermission() {
    getToken(this.messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           this.listen();
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}


