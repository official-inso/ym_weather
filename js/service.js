window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.php");
  }
});

let deferredPrompt;
let notiInstallApp = false;

$(document).ready(function(){
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    try {
      showInstallPromotion();
    } catch (error) {}
    if(!notiInstallApp){
      if(localStorage.getItem('appInstallIdWiev') != 'false'){
        Noti.add({
          title: "Установка приложения",
          text: "Установи приложение на свое устройство прямо сейчас!",
          other: {
                  html: '<div clickEffects style="margin-right: 10px;" class="notification-btn" id="appInstallId">Установить</div><div clickEffects class="notification-btn" id="appInstallIdNone" onclick="Noti.del(this);">Больше не показывать</div>',
                },
          ico: 'emoji_u1f4e6',
          delay: 0,
          id: 'notiAppInstallId'
        });
      }
      
    }
    

    let buttonInstall = document.getElementById('appInstallId');
    let appInstallIdNone = document.getElementById('appInstallIdNone');

    if(buttonInstall != null){
      buttonInstall.addEventListener('click', async () => {
      // Hide the app provided install promotion
        try {
          hideInstallPromotion();
        } catch (error) {}
        // Show the install prompt
        try {
          deferredPrompt.prompt();
        } catch (error) {}
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        // console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        if('dismissed' == outcome){
          notiInstallApp = true;
        }
        if('accepted' == outcome){
          Noti.del('#notiAppInstallId');
        }
    });
    }

    
    if(appInstallIdNone != null){
      appInstallIdNone.addEventListener('click', async () => {
        localStorage.setItem('appInstallIdWiev', 'false');
      });
    }
    
  });

  window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    try {
      hideInstallPromotion();
    } catch (error) {}
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    try {
      Win.open('#appinstalled');
      notiInstallApp = true;
      $("body").off("click", "#appInstallId", () => {})
    } catch (error) {}

  });


});

