import { SwPush } from '@angular/service-worker';

const swPush = new SwPush();

swPush.requestSubscription().then(subscription => {
  // Send the subscription to your server so that you can send push notifications to the user.
  console.log(subscription);
});

swPush.messages.subscribe((event) => {
    // Handle the push notification event here.
  console.log(event);

});

