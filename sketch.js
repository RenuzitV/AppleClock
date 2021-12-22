const btn = document.querySelector('button'), chunks = [];

function setup(){
    createCanvas(1280, 720);
    d = min(height, width)-200;
    r = d/2;
    ds = d*1/4;
    dm = d*1/2;
    dh = d*3/4;
}

min = function(a, b){
  if (a > b) return a;
  return b;
}

var d, r;
let time, mm, ang, angS, angM, angH;
var ds, dm, dh, dt = 20;
let colS = [255, 0, 0], colM = [0, 255, 0], colH = [0, 0, 255];
var distt = r-20, disth = r-190, distm = r-100, dists = r-60;

toR = function(a){
    return a*PI/180;
}

function drawS(num){
    stroke(colS);
    arc(0, 0, d-ds, d-ds, -PI/2 + toR(ang)*num, toR(angS));
    //line(0, 0, dists*Math.cos(toR(angS)), dists*Math.sin(toR(angS)))
}

function drawM(num){
    stroke(colM);
    arc(0, 0, d-dm, d-dm, -PI/2 + toR(ang)*num, toR(angM));
    //line(0, 0, distm*Math.cos(toR(angM)), distm*Math.sin(toR(angM)));
}

function drawH(num){
    stroke(colH);
    arc(0, 0, d-dh, d-dh, -PI/2 + toR(ang)*num, toR(angH));
    //line(0, 0, disth*Math.cos(toR(angH)), disth*Math.sin(toR(angH)));
}

function drawText(){
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    strokeWeight(0);
    for (var i = 1; i <= 12; ++i){
        var posx = (r-dt)*Math.cos(toR(i-3)*30);
        var posy = (r-dt)*Math.sin(toR(i-3)*30);
        text(i, posx, posy);
    }
}

function flipCoin(){
    strokeWeight(0);
    fill(255, 255, 0);
    var we = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)), he = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2));
    //var we = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)+PI/2), he = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)+PI/2);
    if (time.getSeconds()%2==0) ellipse(0, 0, we, 100);
    else ellipse(0, 0, 100, he);
}
 
function draw(){
    background(0);
    time = new Date();
    mm = time.getMilliseconds();
    ang = mm*0.36;
    angS = time.getSeconds()*6 - 90 + mm*0.006;
    angM = time.getMinutes()*6 - 90 + time.getSeconds()*0.1;
    angH = time.getHours()*30 - 90 + time.getMinutes()*0.5 + time.getSeconds()*0.5/60  +time.getMilliseconds()*0.5/60/1000;
    translate(width/2, height/2);
    strokeWeight(8);
    fill(0);
    stroke(255);
    ellipse(0, 0, d, d);
    drawText();
    strokeWeight(60);
    fill(0);
    if (time.getSeconds() != 0) {
        drawS(0);
        drawM(0);
        drawH(0);
    }
    else {
        drawS(1);
        if (time.getMinutes() == 0) {
            drawM(1);
            if (time.getHours() == 0) {
                drawH(1);
            }
            else {
                drawH(0);
            }
            
        }
        else {
            drawM(0);
            drawH(0);
        } 
    }
    flipCoin();
}
