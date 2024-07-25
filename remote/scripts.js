// Reference to the Firebase database
const db = firebase.database();

function load(){
    // Call readData function to initially load data
    readData();
    srcblock()
    scr = document.getElementById('scr');
    $('#load').css('background-color','rgba(0,0,0,0.5)');
    $('#load').css('backdrop-filter','blur(10px)');
    setTimeout(function(){
        $('#load').css('background-color','rgba(0,0,0,0.25)');
        $('#load').css('backdrop-filter','blur(5px)');
        $('#load').css('border-radius', '0px 0px 100px 0px');
        $('#load').css('filter', 'blur(10px)');
        setTimeout(function(){
            // $('#load').hide('slow');
            $('#load').css('height', '0vh');
            $('#load').css('width', '0vw');
            
        },250); 
    },250);

    scr.scrollBy({top:0,left:10000,behavior:'smooth'});
    setTimeout(function(){
        $('.platestart').attr('class','plates');
        setTimeout(function(){
            scr.scrollBy({top:0,left:-10000,behavior:'smooth'});
        },1000); 
    },500);
}

function clic(thi, btn){
    if($(thi).attr("data") === 'off'){
             if (btn === 'flash') { db.ref('iot').update({ flash: 'on' }); }
        else if (btn === 'flash_int') { db.ref('iot').update({ flash_int: 'int' }); }
        else if (btn === 'vibrate') { db.ref('iot').update({ vibrate: 'on' }); }
        else if (btn === 'vibrate_int') { db.ref('iot').update({ vibrate_int: 'int' }); }
    }
    else if($(thi).attr("data") === 'on'){
             if (btn === 'flash') { db.ref('iot').update({ flash: 'off' }); }
        else if (btn === 'flash_int') { db.ref('iot').update({ flash_int: 'off' }); }
        else if (btn === 'vibrate') { db.ref('iot').update({ vibrate: 'off' }); }
        else if (btn === 'vibrate_int') { db.ref('iot').update({ vibrate_int: 'off' }); }
    }
};

function readData() {
    db.ref('iot').on('value', function(snapshot) {

        flash = snapshot.val().flash;
        if (flash === 'off') {
            $("#flash").attr("class", "plate off");
            $("#flash").attr("data", "off");
            $("#flash_int").attr("class", "plate off");
            $("#flash_int").attr("data", "off");
            // flashoff();
        }
        else if (flash === 'on') {
            $("#flash").attr("class", "plate on");
            $("#flash").attr("data", "on");
            $("#flash_int").attr("class", "plate off");
            $("#flash_int").attr("data", "off");
            // flashon();
        }

        flash_loop_a = false;
        flash_loop_b = false;
        flash_int = snapshot.val().flash_int;
        if (flash_int === 'int') {
            $("#flash").attr("class", "plate off");
            $("#flash").attr("data", "off");
            $("#flash_int").attr("class", "plate on");
            $("#flash_int").attr("data", "on");
            flash_loop_a = setInterval(() => {
                flashon();
                flash_loop_b = setTimeout( () => { flashoff(); } , 250);
            },500);
        }
        else if (flash_int === 'off') {
            $("#flash").attr("class", "plate off");
            $("#flash").attr("data", "off");
            $("#flash_int").attr("class", "plate off");
            $("#flash_int").attr("data", "off");
            clearTimeout(flash_loop_a);
            clearTimeout(flash_loop_b);
            flashoff();
        }

        vibrate = snapshot.val().vibrate;
        if (vibrate === 'off') {
            $("#vibrate").attr("class", "plate off");
            $("#vibrate").attr("data", "off");
            $("#vibrate_int").attr("class", "plate off");
            $("#vibrate_int").attr("data", "off");
            // navigator.vibrate(500);
        }
        else if (vibrate === 'on') {
            $("#vibrate").attr("class", "plate on");
            $("#vibrate").attr("data", "on");
            $("#vibrate_int").attr("class", "plate off");
            $("#vibrate_int").attr("data", "off");
            // navigator.vibrate(0);
        }

        vibrate_int = snapshot.val().vibrate_int;
        if (vibrate_int === 'int') {
            $("#vibrate").attr("class", "plate off");
            $("#vibrate").attr("data", "off");
            $("#vibrate_int").attr("class", "plate on");
            $("#vibrate_int").attr("data", "on");
            navigator.vibrate([250,250]);
        }
        else if (vibrate_int === 'off') {
            $("#vibrate").attr("class", "plate off");
            $("#vibrate").attr("data", "off");
            $("#vibrate_int").attr("class", "plate off");
            $("#vibrate_int").attr("data", "off");
            navigator.vibrate(0);
        }

    });
}

function flashon(){
    const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
    if (SUPPORTS_MEDIA_DEVICES) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        if (cameras.length === 0) {
          throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];
        navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ['user', 'environment'],
            height: {ideal: 1080},
            width: {ideal: 1920}
          }
        }).then(stream => {
          const track = stream.getVideoTracks()[0];
          const imageCapture = new ImageCapture(track)
          const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
              track.applyConstraints({
                advanced: [{torch: true}]
              });
          });
        });
      });
    }
}

function flashoff(){
    const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
    if (SUPPORTS_MEDIA_DEVICES) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        if (cameras.length === 0) {
          throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];
        navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ['user', 'environment'],
            height: {ideal: 1080},
            width: {ideal: 1920}
          }
        }).then(stream => {
          const track = stream.getVideoTracks()[0];
          const imageCapture = new ImageCapture(track)
          const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
              track.applyConstraints({
                advanced: [{torch: false}]
              });
          });
        });
      });
    }
}

function srcblock() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
}