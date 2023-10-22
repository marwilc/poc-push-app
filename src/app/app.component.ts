import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MessagePayload } from "firebase/messaging";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'poc-push-app';
  message: MessagePayload | undefined;

  constructor(
    private swPush: SwPush
  ){

  }

  ngOnInit(): void {
    this.swPush.requestSubscription({serverPublicKey: environment.firebase.vapidKey}).then(subscription => {
      // Send the subscription to your server so that you can send push notifications to the user.
      console.log(subscription.endpoint);
      this.listen();
    });
  }

  listen() {
   
    this.swPush.messages.subscribe(message => {
      console.log(message);
    });
  }
}


