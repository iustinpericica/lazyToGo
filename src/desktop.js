console.log($);
$(document).ready(function() {
  // enable server
  var qr;
    
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        (function() {
          qr = new QRious({
          element: document.getElementById('qr-code'),
          size: 200,
          value: xhttp.responseText
      });
  })();

        let url_req = document.getElementById('url_req');
        url_req.innerHTML = 'Go on your mobile phone to: ' + xhttp.responseText;
        document.getElementById('info_qr').innerHTML = `Or scan the below QR code. How to scan? 
        <button id='btnIphone'>I have an Iphone</button>
        <button id='btnSamsung'>I have a Samsung</button>
        <button id='btnHuawei'>I have a Huawei</button>

        
        
        `;

        //modal:
        fIphone();
        fSamsung();
        fHuawei();
      }
  };
  xhttp.open("GET", `http://localhost:8010/url`, true);
  xhttp.send();

});console.log($);
$(document).ready(function() {
  // enable server
  var qr;
    
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        (function() {
          qr = new QRious({
          element: document.getElementById('qr-code'),
          size: 200,
          value: xhttp.responseText
      });
  })();

        let url_req = document.getElementById('url_req');
        url_req.innerHTML = 'Go to on your mobile phone: ' + xhttp.responseText;

      }
  };
  xhttp.open("GET", `http://localhost:8010/url`, true);
  xhttp.send();

});

// Modal: 
let fIphone = ()=>{
var modal = document.getElementById("myModalIphone");

// Get the button that opens the modal
var btn = document.getElementById("btnIphone");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
let fSamsung= ()=>{
var modal = document.getElementById("myModalSamsung");

// Get the button that opens the modal
var btn = document.getElementById("btnSamsung");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
let fHuawei= ()=>{
var modal = document.getElementById("myModalHuawei");

// Get the button that opens the modal
var btn = document.getElementById("btnHuawei");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[2];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}