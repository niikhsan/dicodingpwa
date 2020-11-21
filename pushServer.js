const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BOoFFK4dOWRJbRYeomaLwEilj1k-yJZgk4u8gN-XJJQrczhCwd4-USBzvRXYyD-b7uBbKkXPsCxk6AZTr9y0llk",
    "privateKey":"xtle5CG0DnOGq10qFOdoes0Z63B_4cgYKGMFgkqD5Qk"
};
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    endpoint : 'https://fcm.googleapis.com/fcm/send/fmdCC4NToPQ:APA91bGYLuyqWJ3brCn5Fr3aMu4-b0iFooEjs-8eV3DeagFIym9IOuY5e_QhaYXEPm9eRHzM6JkPize5fAZIIebhkAC7v2uju6mwWI4iXuPgT8f0CC63k7qFMKWEEeIZ-Ckul45KDXNA',
    keys : {
        auth : '+zXQCPMdXx+G1b4DjBpZcw==',
        p256dh : 'BCVWb0RAqoKotNnoBRn6kaXAu3Nwyub36RyT42ehfsEDZLkShGIIfptsSWWyhoX0UE9mNulwCoKvM88Fb9LaUUE='
    }
};
const payload = 'Payload body From Server';
const options = {
    gcmAPIKey: '946993991151',
    TTL: 60
};

webpush.sendNotification(pushSubscription, payload, options);