// Colors
var white, trackColor, bushColor;

// Character
var carTop;
var character;

// Value holders for math equations
var x = 0;
var z = 0;
var y = 0;
var numAnswered = 0;
var numRight = 0;
var numWrong = 0;
var score
var currentMathProblem;

// Landscape
var stripes;
var bushes;

// Moving Answers
var topAnswer;
var bottomAnswer;
var right;
var wrong;
var correctAnswerLocation;
var TOP = 0;
var BOTTOM = 1;
var speed = -3;
var mySong = new
Audio("https://codehs.com/uploads/a5ad52a69e01561f7c531d9161ce25dc")
mySong.play();


function start(){
    white = new Color (255, 255, 255);
    var grey = new Color(103, 103, 103);
    var darkGrey = new Color (36, 37, 38);
    var blue = new Color (173, 216, 230);
    
    // This is the game homepage
    var back = new Rectangle(getWidth(), getHeight());
    back.setPosition(0,0);
    back.setColor(Color.black);
    add(back);
    
    // Instructions
    var rules = new Text("Correctly answer as many questions as you can." , "10pt Comic Sans");
    rules.setColor(white);
    rules.setPosition(getWidth()/2-rules.getWidth()/2, 100);
    add(rules);
    var rules = new Text("Use the up and down arrow keys to move to the lane with the correct answer." , 
    "10pt Comic Sans");
    rules.setColor(white);
    rules.setPosition(getWidth()/2-rules.getWidth()/2, 120);
    add(rules);
    var rules = new Text("You will recieve your score at the end." , 
    "10pt Comic Sans");
    rules.setColor(white);
    rules.setPosition(getWidth()/2-rules.getWidth()/2, 140);
    add(rules);
    var rules = new Text("The game ends after you have gotten three wrong." , 
    "10pt Comic Sans");
    rules.setColor(white);
    rules.setPosition(getWidth()/2-rules.getWidth()/2, 160);
    add(rules);
    
    //Car
    var car = new Rectangle(180, 40);
    car.setPosition(getWidth()/2-car.getWidth()/2, getHeight()/2+150);
    car.setColor(grey);
    add(car);
    var poly = new Polygon();
    poly.addPoint(getWidth()/2-60, car.getY()-1);
    poly.addPoint(getWidth()/2-45, car.getY()-31);
    poly.addPoint(getWidth()/2+45, car.getY()-31);
    poly.addPoint(getWidth()/2+60, car.getY()-1);
    poly.setColor(blue);
    add(poly);
    var wheel = new Circle(20);
    wheel.setPosition(getWidth()/2-50, car.getY()+40);
    wheel.setColor(darkGrey);
    add(wheel);
    var wheelr = new Circle(20);
    wheelr.setPosition(getWidth()/2+50, car.getY()+40);
    wheelr.setColor(darkGrey);
    add(wheelr);
    var spoke = new Circle(10);
    spoke.setPosition(getWidth()/2-50, car.getY()+40);
    spoke.setColor(Color.black);
    add(spoke);
    var spoker = new Circle(10);
    spoker.setPosition(getWidth()/2+50, car.getY()+40);
    spoker.setColor(Color.black);
    add(spoker);
    var wind = new Line(getWidth()/2, car.getY()-31, getWidth()/2, car.getY());
    wind.setColor(grey);
    add(wind);
    var roof = new Line(getWidth()/2-45, car.getY()-31, getWidth()/2+45, car.getY()-31);
    roof.setColor(grey);
    roof.setLineWidth(5);
    add(roof);
    var mid = new Line(getWidth()/2-60, car.getY(), getWidth()/2+60, car.getY());
    mid.setLineWidth(2);
    mid.setColor(grey);
    add(mid);
    
    // Play button
    var box = new Rectangle(100, 50);
    box.setPosition(getWidth()/2-50, getHeight()/2);
    box.setColor(white);
    add(box);
    var txt = new Text("START" , "20pt Comic Sans");
    txt.setPosition(getWidth()/2-40, getHeight()/2+35);
    add(txt);
    mouseClickMethod(play);
    keyDownMethod(moveCar);
}

function moveCar(e) {
    if(e.keyCode == Keyboard.UP) {
        character.setPosition(32.5, getHeight()/2-30);
        carTop.setPosition(50, getHeight()/2-23.5);
    }
    if(e.keyCode == Keyboard.DOWN) {
        character.setPosition(32.5, getHeight()/2+60);
        carTop.setPosition(50, getHeight()/2+67.5);
    }
}

function play(e){
    // Start the game if the button "start" is pressed.
    if(e.getX() >= getWidth()/2-50 && e.getX() <= getWidth()/2+50){
        if(e.getY() >= getHeight()/2 && e.getY() <= getHeight()/2+50){
            home();
        }
    }
}

function home(){
    setUp();
    setTimer(landscape, 20);
    // setTimer(math, 2000);
}


function setUp(){
    // Define colors
    white = new Color (255, 255, 255);
    trackColor = new Color (180, 84, 76);
    bushColor = new Color(50, 205, 50);

    // set up stripes
    stripes = [
        new Rectangle(20, 40),
        new Rectangle(20, 40),
        new Rectangle(20, 40),
        new Rectangle(20, 40),
        new Rectangle(20, 40)
    ];
    for(var i = 0; i < stripes.length; i++) {
        stripes[i].setColor(trackColor);
    }

    // set up bushes
    bushes = [
        new Circle(54),
        new Circle(55),
        new Circle(53),
        new Circle(50),
        new Circle(54)
    ];

    for(var i = 0; i < stripes.length; i++) {
        bushes[i].setColor(bushColor);
    }  
    
    // Still background.
    var sky = new Color(219, 243, 250);
    var background = new Rectangle(getWidth(), getHeight());
    background.setPosition(0,0);
    background.setColor(sky);
    add(background);
    var track = new Rectangle(getWidth(), getHeight()/2);
    track.setPosition(0,getHeight()/2-50);
    track.setColor(trackColor);
    add(track);
    var color = new Color(60,170,100);
    var grass = new Rectangle(getWidth(), getHeight()/4);
    grass.setPosition(0,getHeight()-getHeight()/4);
    grass.setColor(color);
    add(grass);
    var upGrass = new Rectangle(getWidth(), getHeight()/6);
    upGrass.setPosition(0,getHeight()/2-getHeight()/4);
    upGrass.setColor(color);
    add(upGrass);
    var line = new Rectangle(getWidth(), 10);
    line.setPosition(x, getHeight()/2+30);
    line.setColor(white);
    add(line);

    // Add stripes and bushes
    for(var i = 0; i < stripes.length; i++) {
        add(stripes[i]);
    }
    bushes[0].setPosition(0-z, getHeight()/3-15);
    bushes[1].setPosition(getWidth()/2-z, getHeight()/3-15);
    bushes[2].setPosition(getWidth()-z, getHeight()/3-15);    
    bushes[3].setPosition(50, getHeight()/3+300);
    bushes[4].setPosition(270, getHeight()/3+270);
    for(var i = 0; i < bushes.length; i++) {
        add(bushes[i]);
    }
    
    //Math equation display.
    currentMathProblem = generateMathProblem();
    score = new Text(currentMathProblem.label, "20pt Comic Sans");
    score.setPosition(getWidth()/2-score.getWidth()/2, 0 + score.getHeight()*2);
    score.setColor(Color.black);
    add(score);
    
    // Character
    var meColor = (Randomizer.nextColor())
    character = new Rectangle(100, 50);
    character.setColor(Color.black);
    character.setPosition(32.5, getHeight()/2+60);
    add(character);
    carTop = new Rectangle (65,35);
    carTop.setPosition(50, getHeight()/2+67.5);
    carTop.setColor(meColor);
    add(carTop);
    
    // Answers to math equation.
    topAnswer = new Rectangle(30, 30);
    topAnswer.setPosition(getWidth(), getHeight()/2-22.25);
    topAnswer.setColor(white);
    add(topAnswer);
    
    bottomAnswer = new Rectangle(30, 30);
    bottomAnswer.setPosition(getWidth(), getHeight()/2+68);
    bottomAnswer.setColor(white);
    add(bottomAnswer);
    
    right = new Text(currentMathProblem.answer , "15pt Comic Sans" );
    wrong = new Text(currentMathProblem.incorrect , "15pt Comic Sans");
    
    switchAnswer();
    
    
    add(right);
    add(wrong);
    
    // add the text to move with the white blocks
    
}

function switchAnswer(){
    correctAnswerLocation = Randomizer.nextInt(TOP, BOTTOM);
    //println(right.getWidth())
    right.setText(currentMathProblem.answer);
    wrong.setText(currentMathProblem.incorrect);
    //println(right.getWidth());
    if(correctAnswerLocation == TOP) {
        right.setPosition(
            topAnswer.getX()+topAnswer.getWidth()/2-right.getWidth()/2,
            topAnswer.getY()+right.getHeight());
        wrong.setPosition(
            bottomAnswer.getX()+bottomAnswer.getWidth()/2-wrong.getWidth()/2,
            bottomAnswer.getY()+wrong.getHeight());
    } else {
        wrong.setPosition(
            topAnswer.getX()+topAnswer.getWidth()/2-wrong.getWidth()/2,
            topAnswer.getY()+wrong.getHeight()
        );
        right.setPosition(
            bottomAnswer.getX()+bottomAnswer.getWidth()/2-right.getWidth()/2,
            bottomAnswer.getY()+right.getHeight());
    }
}

  
 
function landscape(){
    // Move stripes
    if(stripes[0].getX()+20 == 0) {
        x = 10;
    }
    
    stripes[0].setPosition(getWidth()/4-10-x,getHeight()/2+10);
    stripes[1].setPosition(getWidth()*1/2-10-x,getHeight()/2+10);
    stripes[2].setPosition(getWidth()*3/4-10-x, getHeight()/2+10);
    stripes[3].setPosition(getWidth()-10-x, getHeight()/2+10); 
    stripes[4].setPosition(getWidth()+90-x, getHeight()/2+10);
    x++;
    
    // Move bushes
    if(bushes[0].getX()+54 == 0){
        z = 0;
    }

    for(var i = 0; i < bushes.length; i++) {
        bushes[i].move(-1, 0)
        if(bushes[i].getX() + bushes[i].getRadius() <= 0) {
            bushes[i].setPosition(getWidth() + bushes[i].getRadius() * 2, bushes[i].getY());
        }
    }
    if(topAnswer.getX() <= character.getX() + character.getWidth()) {
        checkCorrect();
        currentMathProblem = generateMathProblem();
        score.setText(currentMathProblem.label);
        topAnswer.setPosition(getWidth(), topAnswer.getY());
        bottomAnswer.setPosition(getWidth(), bottomAnswer.getY());
        switchAnswer();
    }
    topAnswer.move(speed, 0);
    bottomAnswer.move(speed, 0);
    
    right.move(speed, 0);
    wrong.move(speed, 0);

    z++;
}

function generateMathProblem() {
    var x = Randomizer.nextInt(2,10);
    var y = Randomizer.nextInt(2,10);
    var a = x * y;
    var b = (x * y) + Randomizer.nextInt(1, x);
    return {
        label: x + " x " + y,
        answer: a,
        incorrect: b,
    };
}

function checkCorrect(){
    if(correctAnswerLocation == TOP && carTop.getY() == getHeight()/2-23.5 
    || correctAnswerLocation == BOTTOM && carTop.getY() == getHeight()/2+67.5){
        carTop.setColor(Color.green);
        numRight++;
        numAnswered++;
    }else{
        numWrong++;
        carTop.setColor(Color.red);
        numAnswered++;
        if(numWrong == 3){
            gameEnd();
        }
    }
    if(numAnswered%3 == 0){
        speed-=0.5;
    }
}

function gameEnd(){
    stopTimer(landscape);
    stopTimer(math);
    var end = new Rectangle(getWidth(), getHeight());
    end.setColor(Color.black);
    end.setPosition(0,0);
    add(end);
    var score = new Text(numAnswered + " !", "45pt ComicSans");
    score.setPosition(getWidth()/2-score.getWidth()/2, getHeight()/2);
    score.setColor(white);
    add(score);
}

function math(){
    // Random multiplication
    var x = Randomizer.nextInt(0,10);
    var y = Randomizer.nextInt(0,10);
    var a = x * y;
    var answer = prompt(x + " x " + y + " = " );
    if(answer == 111){
        stopTimer(math);
    }
    if(answer == a){
        // If correct change car color
        carTop.setColor(Randomizer.nextColor());
    }else{
        numAnswer++;
        while(2 != a){
            var tryAgain = prompt(x + " x " + y + " = ");
            tryAgain;
            if(a = 111){
                break;
            }
        }    
    }
    if(answer == 111){
        println("Canceled.");
        stopTimer(Math);
    }
    if(numAnswer == 15){
        // End and show score
        println(numRight + "/15");
        score.setText(numRight + "/15", "20pt Comic Sans");
        stopTimer(math);
    }
}




