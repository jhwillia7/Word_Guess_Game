
//declare the array words and all the variables
var words = [
    "Roger Federer",
    "Jack Nicklaus",
    "Muhammad Ali",
    "Babe Ruth",
    "Michael Jordan",
    "Michael Phelps",
    "Martina Navratilova",
    "Pele",
    "Usain Bolt",
    "Michael Schumacher",
    "Lance Armstrong",
    "Jackie Joyner Kersee",
    "Wayne Gretzky",
    "Carl Lewis",
    "Joe Montana",
    "Tom Brady",
    "Barry Bonds",
    "Nolan Ryan",
    "Sandy Kolfax",
    "Cy Young",
    "Roger Clemens",
    "Bob Gibson",
    "Johnny Bench",
    "Pete Rose",
    "Yogi Berra",
    "Brooks Robinson",
    "Mike Schmidt",
    "Hank Aaron",
    "Willie Mays",
    "Jim Thorpe",
    "Jerry Rice",
    "Walter Payton",
    "Peyton Manning",
    "Reggie White",
    "Johnny Unitas",
    "Dick Butkus",
    "Tiger Woods",
    "Arnold Palmer",
    "Mark Spitz",
    "Dwight Stones"
];

var score = 0;
var guesses = 0;
var highScore = 0;
var correct = 0;
var word = "";
var dashes = "";
var letters = "";

/* The following are the functions I will use for the hangman game*/
/*This first function will provide the score and guess informaiton for the screen*/
function drawToScreen() {
    document.getElementById("letters").innerText = letters;
    document.getElementById("score").innerText = score;
    document.getElementById("guesses").innerText = guesses;
    document.getElementById("dashes").innerText = dashes;
}

/* This function will replace the dashes on the main screen wiht the correct letter below that is collected from user keyboard entry*/
function fillInBlanks(x) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == x) {
            dashes = dashes.slice(0, i) + x + dashes.slice(i + 1, dashes.length);
            correct++;
        }
    }
}

/* The following randomly picks a work from the words array and places the number of dashes on the screen to begin and console logs the word radomly selected*/
function pickWord() {
    letters = "";
    dashes = "";
    correct = 0;
    if (words.length > 0) {
        var rand = Math.floor(Math.random() * words.length);
        word = words[rand].toLowerCase();
        for (var i = 0; i < word.length; i++) {
            if (word[i] == " ") {
                dashes += " ";
                correct++;
            }
            else {
                dashes += "_";
            }
        }
        console.log(word);
        guesses = Math.floor(word.length * 0.75);
        words.splice(rand, 1);
        drawToScreen();
    }
    else {
        alert("You Won!");
    }
}
/* this section of code captures the user letter inputed from the keyboard and check to see if the letter is one of the letters that spells the randomly generated word*/
document.onkeyup = function (event) {
    var keyPressed = event.key.toLowerCase();
    if ((event.keyCode > 64 && event.keyCode < 91) && !letters.includes(keyPressed)) {
        letters += keyPressed;

        if (word.toLocaleLowerCase().includes(keyPressed)) {
            fillInBlanks(keyPressed);
            if (correct == word.length) {
                alert("You Got It! \n The Word Was: " + word);
                score++;
                if (score > highScore) {
                    highScore = score;
                    document.getElementById("high-score").innerText = highScore;
                }
                pickWord();
            }
        }
        else {
            guesses--;
        }
        if (guesses < 1) {
            score = 0;
            alert("You Loose");
            pickWord();
        }
        drawToScreen();

    }
};

onload = function () {
    pickWord();
};