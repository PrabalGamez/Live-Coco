objects = [];
video="";
status="";
//status
//number

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function start(){
    ob_detection=ml5.objectDetector('cocossd', ML);
    document.getElementById("status").innerHTML="Status : Detecting Objects...";
}

function ML(){
    console.log("Model Loaded!")
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
        ob_detection.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number").innerHTML = "No. of objects detected are : "+objects.length;
            fill("#ffffff");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "% " ,objects[i].x + 10 ,objects[i].y + 15);
            noFill();
            stroke("#ffffff");
            rect(objects[i].x ,objects[i].y,objects[i].width ,objects[i].height);
        }
    }
}

