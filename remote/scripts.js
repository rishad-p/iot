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
        $('.platestart').attr('class','col plates');
        setTimeout(function(){
            scr.scrollBy({top:0,left:-10000,behavior:'smooth'});
        },1000); 
    },500);
}

function clic(thi, btn){
    if($(thi).attr("data") === 'off'){
        if (btn === 'flash') { db.ref('iot').update({ flash: 'on' }); }
        else if (btn === 'vibrate') { db.ref('iot').update({ vibrate: 'on' }); }
    }
    else if($(thi).attr("data") === 'on'){
        if (btn === 'flash') { db.ref('iot').update({ flash: 'off' }); }
        else if (btn === 'vibrate') { db.ref('iot').update({ vibrate: 'off' }); }
    }
};

function readData() {
    db.ref('iot').on('value', function(snapshot) {

        flash = snapshot.val().flash;
        if (flash === 'off') {
            $("#flash").attr("class", "plate off");
            $("#flash").attr("data", "off");
        }
        else if (flash === 'on') {
            $("#flash").attr("class", "plate on");
            $("#flash").attr("data", "on");
        }

        // blink_flash 

        vibrate = snapshot.val().vibrate;
        if (vibrate === 'off') {
            $("#vibrate").attr("class", "plate off");
            $("#vibrate").attr("data", "off");
        }
        else if (vibrate === 'on') {
            $("#vibrate").attr("class", "plate on");
            $("#vibrate").attr("data", "on");
        }

    });
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