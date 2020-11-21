 // REGISTER SERVICE WORKER
 if ("serviceWorker" in navigator) {
     window.addEventListener("load", ()=> {
         navigator.serviceWorker.register("sw.js")
             .then(()=> {
                 console.log("Horee..! Pendaftaran ServiceWorker berhasil");
             })
             .catch(()=> {
                 console.log("Yah..! Pendaftaran ServiceWorker gagal");
             });
         navigator.serviceWorker.ready.then(function () {
             console.log('ServiceWorker sudah siap bekerja.');
         });
         requestPermission();
     });
 } else {
     console.log("Aduh..! ServiceWorker belum didukung browser ini.");
 }

 function urlBase64ToUint8Array(base64String) {
     const padding = '='.repeat((4 - base64String.length % 4) % 4);
     const base64 = (base64String + padding)
         .replace(/-/g, '+')
         .replace(/_/g, '/');
     const rawData = window.atob(base64);
     const outputArray = new Uint8Array(rawData.length);
     for (let i = 0; i < rawData.length; ++i) {
         outputArray[i] = rawData.charCodeAt(i);
     }
     return outputArray;
 }

 function requestPermission(){
     if('Notification' in window) {
         Notification.requestPermission().then(result => {
             if(result === 'denied'){
                 console.log("Fitur notifikasi tidak diijinkan.");
                 return;
             } else if (result === 'default'){
                 console.error("Pengguna menutup kotak dialog permintaan ijin.");
                 return;
             }
             console.log('Notification granted');

             if(('PushManager' in window)) {
                 console.log('PushManager exist!');
                 navigator.serviceWorker.getRegistration().then(reg => {
                     reg.pushManager.subscribe({
                         userVisibleOnly: true,
                         applicationServerKey:urlBase64ToUint8Array('BOoFFK4dOWRJbRYeomaLwEilj1k-yJZgk4u8gN-XJJQrczhCwd4-USBzvRXYyD-b7uBbKkXPsCxk6AZTr9y0llk')
                     }).then(sub => {
                         console.log("Berhasil melakukan subscribe dengan endpoint:" + sub.endpoint);
                         console.log("p256dh: " + btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))));
                         console.log("auth: " + btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))));
                     }).catch(e => {
                         console.log("Error: ", e);
                     })
                 })
             }
         })
     }
 }
