objects = [];
status = "";
video = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
    }
    for (i= 0; i < objects.length; i++) {

        r = random(255);
        g = random(255);
        b = random(255);


        document.getElementById("status").innerHTML = "Status: Objects detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;

        fill(r, g, b);
        percent = floor(object.confidence * 100);
        text(object[i] + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke(r, g, b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}

function start() {
   objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop()
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}