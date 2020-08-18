const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      devTools: false
      }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


var express = require('express');
var app1 = express();
var http = require('http').Server(app1);
var io = require('socket.io')(http);

var robot = require('robotjs');

const f = ()=>{
  setTimeout(() => {
    robot.moveMouse(2, 2);
  }, 1000);
  setTimeout(() => {
    robot.moveMouse(50,50);
  }, 2000);
}

//f();



var screenWidth = 1440;
var screenHeight = 900;


var adjustment = 2;
var mouse = null;
var newX = null;
var newY = null;

app1.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/client.html');
});

app1.get('/client.js',(req, res)=>{
  res.sendFile(__dirname + '/client/client.js');
})

app1.get('/client.css',(req, res)=>{
  res.sendFile(__dirname + '/client/client.css');
});

app1.get('/key.css',(req, res)=>{
  res.sendFile(__dirname + '/client/key.css');
});

app1.get('/key.js',(req, res)=>{
  res.sendFile(__dirname + '/client/key.js');
})

var os = require('os');

// show ip address
var ifaces = os.networkInterfaces();
let PORT = 8010;
let url_req;
let url_req_0_1;
Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log('ifname + ':' + alias, iface.address);
      url_req = 'http://' + iface.address + ':' + PORT;
    } else {
      // this interface has only one ipv4 adress
      // console.log('listening on ' + ifname + ' ' +
      //   iface.address + ':' + PORT);
      url_req = 'http://' + iface.address + ':' + PORT;
    }
    if(iface.address[8] == '0' || iface.address[8] == '1'){
      url_req_0_1 = url_req = 'http://' + iface.address + ':' + PORT;
      console.log('da', url_req_0_1);
    }
    console.log(iface.address);
    alias++;
  });
});

app1.get('/url', function(req, res){
    if(!url_req_0_1) res.end(url_req);
    else res.end(url_req_0_1);
})

io.on('connection', function(socket) {
  socket.broadcast.emit('hi');
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('mouse', function(pos) {
    try{
    if (pos.cmd == 'move' || pos.cmd == 'scroll' || pos.cmd == 'drag') {
      mouse = robot.getMousePos();
      //console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
      newX = mouse.x + pos.x * adjustment;
      newY = mouse.y + pos.y * adjustment;
      //console.log('Offset is x:'+ newX + ' y:' + newY);
      //robot.moveMouseSmooth(newX, newY);
      robot.moveMouse(newX, newY);
      mouse = robot.getMousePos();
      //console.log("after x:" + mouse.x + " y:" + mouse.y);
    } else if (pos.cmd == 'motion') {
      var x = pos.x;
      var y = pos.y;
      x = (x < 45) ? 45 : x;
      x = (x > 135) ? 135 : x;
      y = (y < 105) ? 105 : y;
      y = (y > 165) ? 165 : y;
      x -= 45;
      y -= 105;
      robot.moveMouse(screenWidth / 90 * x, screenHeight / 60 * y);
    } else if (pos.cmd == 'click') {
      robot.mouseClick();
      // robot.typeString(msg);
    } else if (pos.cmd == 'rightclick') {
      robot.mouseClick('right');
    } else if (pos.cmd == 'scrollstart') {
      robot.mouseToggle('down', 'middle');
    } else if (pos.cmd == 'scrollend') {
      robot.mouseToggle('up', 'middle');
    } else if (pos.cmd == 'dragstart') {
      robot.mouseToggle('down', 'left');
    } else if (pos.cmd == 'dragend') {
      robot.mouseToggle('up', 'left');
    } else if (pos.cmd == 'right') {
      robot.keyTap("right");
    } else if (pos.cmd == 'left') {
      robot.keyTap("left");
    }
  }
  catch(err){
    io.emit('msg', err);
  }
    // send to everyone
    //io.emit('mouse', pos);
  });

  socket.on('keyboard', btn=>{
    if(btn[0] == '{'){
      btn = btn.replace("{","").replace("}", "");
    }
    console.log(btn);
    try{
    if(btn == '.com'){
      robot.keyTap('.');
      robot.keyTap('c');
      robot.keyTap('o');
      robot.keyTap('m');
  }
  else if(btn == '.ro'){
    robot.keyTap('.');
    robot.keyTap('r');
    robot.keyTap('o');
  }
  else robot.keyTap(btn);
    }
    catch(err){console.log(err);}

  });
});

PORT = 8010;
http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
})