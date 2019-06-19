'use strict';
let score = 0;
let questionNum = 0;

const STORE = [
    {
        question: "What golf major did Tiger Woods set a record of winning by 15 strokes?",
        answerPool: ["US Open", "PGA Championship", "Masters", "The Open Championship"],
        answer: "US Open",
        answerInfo: "Tiger Woods holds the record for largest margin of victory by 15 strokes in the 2000 US Open",
    },
    {
        question: "What golf major did Tiger Woods win to snap an 11 year major drought?",
        answerPool: ["US Open", "PGA Championship", "Masters", "The Open Championship"],
        answer: "Masters",
        answerInfo: "Tiger Woods won the 2019 Masters tournament to snap an 11 year drought while overcoming a 2 stroke deficit going into the last day to win by 1.",
    },
    {
        question: "How many championships did Michael Jordan win?",
        answerPool: ["4", "5", "6", "7"],
        answer: "6",
        answerInfo: "Between 1991 and 1998 Michael Jordan led the Chicago Bulls to 6 NBA championships while taking a year off to play baseball in between",
    },
    {
        question: "Which team traded the number 2 pick in the 1984 NBA draft that could have landed them Michael Jordan?",
        answerPool: ["Houston Rockets", "Indiana Pacers", "Utah Jazz", "Portland Trailblazers"],
        answer: "Indiana Pacers",
        answerInfo: "The Indiana Pacers traded their number 2 pick to the Portland Trailblazers who picked Sam Bowie second before Michael Jordan was drafted by the Chicago Bulls third.",
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
        answerPool: ["9", "19", "127", "199"],
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
    $("#quizSection").removeClass("hidden");
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
        <div class="buttonSubmit">
            <button type="submit">Submit</button>
        </div>
    </form>
    `
    )
}
function startQuiz() {
    $("#startQuiz").submit(function(event) {
        event.preventDefault();
        $("#start").addClass("hidden");
        $("#introImg").addClass("hidden-resp");
        score = 0;
        questionNum = 0;
        computeScore(score);
        questionsAsked(questionNum);
        generateQuestion(questionNum);
        submitAnswer(questionNum);
    })
}
function playAgain() {
    $("#playAgain").off('submit').submit(function(event) {
        event.preventDefault();
        score = 0;
        questionNum = 0;
        generateQuestion(questionNum);
        submitAnswer(questionNum);
    })   
}
function nextQuestion() {
    $("#nextQuestion").off('submit').submit(function(event) {
        event.preventDefault();
        $("#answer").addClass("hidden");
        $("#questions").removeClass("hidden");
        questionNum += 1;
        questionsAsked(questionNum);
        generateQuestion(questionNum);
        submitAnswer(questionNum);
    })
}
function submitAnswer(qNum) {
    $("#questions").off('submit').submit(function(event) {
        event.preventDefault();
        $("#answer").removeClass("hidden");
        $("#questions").addClass("hidden");
        let selected = $('input:checked').val();
        
        if (selected === STORE[qNum].answer) {
            score += 1;
            if (qNum === STORE.length - 1) {
                questionFeedbackRightLast(qNum);
                computeScore(score);
                seeResults();
            }
            else {
                questionFeedbackRight(qNum);
                computeScore(score);
                nextQuestion();
            }
        }
        else {
            if (qNum === STORE.length - 1) {
                questionFeedbackWrongLast(qNum)
                computeScore(score);
                seeResults();
            }
            else {
                questionFeedbackWrong(qNum);
                computeScore(score);
                nextQuestion();
            }
        }
        
    }) 
}

function questionFeedbackRight(qNum) {
    $("#answer").removeClass("hidden");
    $("#questionFeedback").html(`
        <div id="score" class="questionTracking">
            <p>Score: <b>${score}</b></p>
        </div>
        <div id="questionsAsked" class="questionTracking">
            <p>Question: <b>${qNum + 1}/${STORE.length}</b></p>
        </div>
        <h3>Correct! ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="nextQuestion" class="buttonSubmit">
            <button type="submit">Next Question</button>
        </form>
    `)
}
function questionFeedbackRightLast(qNum) {
    $("#answer").removeClass("hidden");
    $("#questionFeedback").html(`
        <h3>Correct! ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="seeResults" class="buttonSubmit">
            <button type="submit">Results</button>
        </form>
    `)
}
function questionFeedbackWrong(qNum) {
    $("#answer").removeClass("hidden");
    $("#questionFeedback").html(`
        <div id="score" class="questionTracking">
            <p>Score: <b>${score}</b></p>
        </div>
        <div id="questionsAsked" class="questionTracking">
            <p>Question: <b>${qNum + 1}/${STORE.length}</b></p>
        </div>
        <h3>Incorrect! The correct answer is ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="nextQuestion" class="buttonSubmit">
            <button type="submit">Next Question</button>
        </form>
    `)
}
function questionFeedbackWrongLast(qNum) {
    $("#answer").removeClass("hidden");
    $("#questionFeedback").html(`
        <h3>Incorrect! The correct answer is ${STORE[qNum].answer}</h3>
        <p>${STORE[qNum].answerInfo}</p>
        <form id="seeResults" class="buttonSubmit">
            <button type="submit">See Results</button>
        </form>
    `)
}
function computeScore(num) {
    $("#score").html(`<p>Score: <b>${num}</b></p>`)
}
function questionsAsked(qNum) {
    $("#questionsAsked").html(`<p>Question: <b>${qNum + 1}/${STORE.length}</b></p>`)
}
function seeResults() {
    $("#seeResults").off('submit').submit(function(event){
        event.preventDefault();
        finalResult();
    })
}
function finalResult() {
    $("#finished").removeClass("hidden");
    $("#answer").addClass("hidden");
    if ((score / questionNum) >= .8 ) {
        $("#finished").html(`
            <div class="container">
                <p class="feedback">Congratulations you got <b>${score}</b> right.</p>
                <form id="playAgain" class="buttonSubmit">
                    <button type="submit">Play again?</button>
                </form>
            </div>
        `)
    }
    else {
        $("#finished").html(`
            <div class="container">
                <p class="feedback">You got <b>${score}</b> right.</p>
                <form id="playAgain" class="buttonSubmit">
                    <button type="submit">Play again?</button>
                </form>
            </div>
        `) 
    }
}

function handleQuiz() {
    startQuiz();
    nextQuestion();
    playAgain();
}
$(handleQuiz);