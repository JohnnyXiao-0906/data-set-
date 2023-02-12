//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let oceanAci;
let amplitude;
function setup() {
  createCanvas(700, 700);

  //no animation / interaction chart
  //noLoop();

  fetch("./json/oceanAci.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    oceanAci = data.oceanAci;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);
  drawChart();
}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<oceanAci.length; i++) {
    if ( oceanAci[i].pHmeas > maxval) {
      maxval = oceanAci[i].pHmeas;
    }
  }

  let spacing = 15;//spacing between the bars
  // Display chart
  for (let i=0; i<oceanAci.length; i++) {

    let item = oceanAci[i];
    
    let rWidth = width/(oceanAci.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, oceanAci.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.pHmeas, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    //draw the data
    push();
    noStroke();
   fill(item.pHcalc_insitu);
    //rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 
    ellipse(width/2,height-rY, width-rWidth+rHeight, rWidth*2+rHeight/2);

    push();
    noFill();
    //fill(item.pHcalc_insitu);
    amplitude= map(item.pHmeas,69,122,-100,100);

    stroke(item.pHcalc_insitu); 
    strokeWeight(5);
    bezier(width/2,height-rY, 
    width/2+amplitude,height-rY+rWidth,
    rX+ spacing*3, rY + rWidth,
    rX+spacing, rY);

    pop();
    pop();
    fill(0); 
    textAlign(CENTER, TOP); 
    text(item.date, rX+rWidth/2-1, rY+10);
  }  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}