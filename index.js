'use strict';
let score = 0;
let questionNum = 0;

const STORE = [
    {
        question: "What golf major did Tiger Woods win first?",
        answerPool: ["US Open", "PGA Championship", "Masters", "The Open Championship"],
        answer: "Masters",
        answerInfo: "Tiger Woods won his first major at the 1997 Masters tournament and won by 12 strokes over runner up Tom Kite.",
    },
    {
        question: "What golf major did Tiger Woods win to snap an 11 year major drought?",
        answerPool: ["Masters", "US Open", "PGA Championship", "The Open Championship"],
        answer: "Masters",
        answerInfo: "Tiger Woods won the 2019 Masters tournament to snap an 11 year drought while overcoming a 2 stroke deficit going into the last day to win by 1.",
    },
    {
        question: "How many championships did Michael Jordan win after returning from baseball?",
        answerPool: ["0", "1", "2", "3"],
        answer: "3",
        answerInfo: "After returning to the NBA from baseball in the middle of the 1994-1995 season, Jordan would lead his team to 3 consecutive NBA championships in the 95-96, 96-97, and 97-98 seasons.",
    },
    {
        question: "How many teams drafted players before Michael Jordan in the 1984 NBA draft?",
        answerPool: ["0", "1", "2", "3"],
        answer: "2",
        answerInfo: "The Houston Rockets picked first and chose Akeem Olajuwon and the Portland Trailblazers picked Sam Bowie second before Michael Jordan was drafted by the Chicago Bulls third.",
    },
    {
        question: "Who is the only athlete to play in both a Super Bowl and World Series?",
        answerPool: ["Bo Jackson","Brian Jordan","Deion Sanders","Drew Henson"],
        answer: "Deion Sanders",
        answerInfo: "Deion Sanders appeared in the 1992 World Series with the Atlanta Braves and won two Super Bowls with the 49er’s(XXIX) and Cowboys(XXX) in consecutive years",
    },
    {
        question: "What position did Babe Ruth start his MLB career as?",
        answerPool: ["Outfielder", "Pitcher", "Catcher", "First Base"],
        answer: "Pitcher",
        answerInfo: "Babe Ruth came into MLB as a pitcher and throughout his career played mostly outfield and at the end some first base.",
    },
    {
        question: "Jackie Robinson broke the color barrier by joining which MLB team?",
        answerPool: ["Yankees", "Braves", "Cubs", "Dodgers"],
        answer: "Dodgers",
        answerInfo: "Jackie Robinson broke the color barrier in the MLB by joining the Brooklyn Dodgers in 1947",
    },
    {
        question: "What pick was Tom Brady in the 2000 NFL draft?",
        answerPool: ["1", "19", "127", "199"],
        answer: "199",
        answerInfo: "Tom Brady was selected with pick number 199, a compensatory pick, in the sixth round of the 2000 NFL Draft.",
    },
    {
        question: "Wayne Gretzky arguably the best NHL player ever was traded how many times in his professional career?",
        answerPool: ["0", "1", "2", "3"],
        answer: "3",
        answerInfo: '"The Great One" Wayne Gretzky was traded 3 times in his professional career.  In 1978 from Indianapolis Racers to Edmonton Oilers, in 1988 from Edmonton Oilers to Los Angeles Kings, and in 1996 from Los Angeles Kings to St. Louis Blues.',
    },
    {
        question: "After the 2016 Rio Summer Games Michael Phelps had 28 medals, where would he rank on the all time country medal count? (of the 205 competing at Rio)",
        answerPool: ["19", "32", "43", "54"],
        answer: "32",
        answerInfo: "If Michael Phelps was a country, he'd be ranked 32nd on the all-time medal count. That's all-time, as in everything a country has won in 120 years and 28 Summer Olympics.",
    },
]

function generateQuestion(qNum) {
    console.log(STORE[qNum].question);
    $("#questions").html(`
    <h3>${STORE[qNum].question}</h3>
    <fieldset>
        <label class="answerOption">
            <input type="radio" name="answer" id="${STORE[qNum].answerPool[0]}" value="${STORE[qNum].answerPool[0]}" required>
            <span>${STORE[qNum].answerPool[0]}</span>
        </label>
        <label class="answerOption">
            <input type="radio" name="answer" id="${STORE[qNum].answerPool[1]}" value="${STORE[qNum].answerPool[1]}" required>
            <span>${STORE[qNum].answerPool[1]}</span>
        </label>
        <label class="answerOption">
            <input type="radio" name="answer" id="${STORE[qNum].answerPool[2]}" value="${STORE[qNum].answerPool[2]}" required>
            <span>${STORE[qNum].answerPool[2]}</span>
        </label>
        <label class="answerOption">
            <input type="radio" name="answer" id="${STORE[qNum].answerPool[3]}" value="${STORE[qNum].answerPool[3]}" required>
            <span>${STORE[qNum].answerPool[3]}</span>
        </label>
    </fieldset>
        <div>
            <button type="submit">Submit Answer</button>
        </div>
    </form>
    `
    )
}
function startQuiz() {
    $("#startQuiz").submit(function(event) {
        event.preventDefault();
        console.log('`startQuiz` ran');
        $("#start").toggleClass("hidden");
        score = 0;
        questionNum = 0;
        generateQuestion(questionNum);
        submitAnswer(questionNum);
    })
}
function playAgain() {
    $("#playAgain").submit(function(event) {
        event.preventDefault();
        console.log('`playAgain` ran');
        score = 0;
        questionNum = 0;
        generateQuestion(questionNum);
        submitAnswer(questionNum);
    })   
}
function nextQuestion() {
    $("#nextQuestion").submit(function(event) {
        event.preventDefault();
        $("#answer").addClass("hidden");
        console.log("next question ready");
        
        questionNum += 1;
        console.log(STORE.length);
        generateQuestion(questionNum);
        submitAnswer(questionNum);
        

        
    })
}
function submitAnswer(qNum) {
    $("#questions").submit(function(event) {
        event.preventDefault();
        $("#answer").removeClass("hidden");
        console.log(STORE[qNum].answer)
        if ($('input[type="radio"]:checked').val() === STORE[qNum].answer) {
            console.log("right answer");
            score += 1;
            if (qNum === STORE.length - 1) {
                questionFeedbackRightLast(qNum);
                computeScore();
            }
            else {
                questionFeedbackRight(qNum);
                nextQuestion();
            }
        }
        else {
            console.log("wrong answer");
            if (qNum === STORE.length - 1) {
                questionFeedbackWrongLast(qNum)
                computeScore();
            }
            else {
                questionFeedbackWrong(qNum);
                nextQuestion();
            }
        }
        
    }) 
}

function questionFeedbackRight(qNum) {
    $("#questionFeedback").html(`
        <h3>Correct! ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="nextQuestion">
            <button type="submit">Next Question</button>
        </form>
    `)
}
function questionFeedbackRightLast(qNum) {
    $("#questionFeedback").html(`
        <h3>Correct! ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="seeResults">
            <button type="submit">See Results</button>
        </form>
    `)
}
function questionFeedbackWrong(qNum) {
    $("#questionFeedback").html(`
        <h3>Incorrect! The correct answer is ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="nextQuestion">
            <button type="submit">Next Question</button>
        </form>
    `)
}
function questionFeedbackWrongLast(qNum) {
    $("#questionFeedback").html(`
        <h3>Incorrect! The correct answer is ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="seeResults">
            <button type="submit">See Results</button>
        </form>
    `)
}
function questionNumber() {

}
function computeScore() {
    console.log("score screen");
}
function handleQuiz() {
    startQuiz();
    nextQuestion();
    playAgain();
}
$(handleQuiz);