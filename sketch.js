var d;
let time, mm, ang, angS, angM, angH;
var ds, dm, dh, dt;
let colS = [255, 0, 0], colM = [0, 255, 0], colH = [0, 0, 255];
var distt, disth, distm, dists;
var coinR;
var lineWeight;

function setup(){
    createCanvas(windowWidth, windowHeight);
    d = min(height, width)*0.9;
    ds = d*3/4;
    dm = d*1/2;
    dh = d*1/4;
    dt = d*9/20;
    coinR = d/10;
    lineWeight = d*0.06;
    // distt = r-20, disth = r-190, distm = r-100, dists = r-60;
}

function windowResized(){
    createCanvas(windowWidth, windowHeight);
    d = min(height, width)*0.9;
    ds = d*3/4;
    dm = d*1/2;
    dh = d*1/4;
    dt = d*9/20;
    coinR = d/10;
    lineWeight = d*0.06;
    // r = d/2;
    console.log("ok");
}

min = function(a, b){
  if (a > b) return a;
  return b;
}


toR = function(a){
    return a*PI/180;
}

function drawS(num){
    stroke(colS);
    arc(0, 0, ds, ds, -PI/2 + toR(ang)*num, toR(angS));
    //line(0, 0, dists*Math.cos(toR(angS)), dists*Math.sin(toR(angS)))
}

function drawM(num){
    stroke(colM);
    arc(0, 0, dm, dm, -PI/2 + toR(ang)*num, toR(angM));
    //line(0, 0, distm*Math.cos(toR(angM)), distm*Math.sin(toR(angM)));
}

function drawH(num){
    stroke(colH);
    arc(0, 0, dh, dh, -PI/2 + toR(ang)*num, toR(angH));
    //line(0, 0, disth*Math.cos(toR(angH)), disth*Math.sin(toR(angH)));
}

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function drawText(){
    fill(255);
    textSize(max(12, d/30));
    textAlign(CENTER, CENTER);
    strokeWeight(0);
    for (var i = 1; i <= 12; ++i){
        var posx = dt*Math.cos(toR(i-3)*30);
        var posy = dt*Math.sin(toR(i-3)*30);
        text(romanize(i), posx, posy);
    }
}

function flipCoin(){
    strokeWeight(0);
    fill(255, 255, 0);
    var we = coinR*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)), he = coinR*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2));
    //var we = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)+PI/2), he = 100*sin(map(time.getMilliseconds(), 0, 999, -PI/2, PI/2)+PI/2);
    if (time.getSeconds()%2==0) ellipse(0, 0, we, coinR);
    else ellipse(0, 0, coinR, he);
}

function draw(){
    background(0);
    time = new Date();
    mm = time.getMilliseconds();
    ang = mm*0.36;
    angS = time.getSeconds()*6 - 90 + mm*0.006;
    angM = time.getMinutes()*6 - 90 + time.getSeconds()*0.1;
    angH = time.getHours()*30 - 90 + time.getMinutes()*0.5 + time.getSeconds()*0.5/60 + time.getMilliseconds()*0.5/60/1000;
    textSize(d/30);
    textAlign(LEFT, TOP);
    text(time.getHours()%12+":"+time.getMinutes()+":"+time.getSeconds()+" "+(time.getHours>12?"pm":"am"), 0, 0);
    translate(width/2, height/2);
    strokeWeight(5);
    fill(0);
    stroke(255);
    ellipse(0, 0, d, d);
    drawText();
    strokeWeight(lineWeight);
    fill(0);
    if (time.getSeconds() > 0) {
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
