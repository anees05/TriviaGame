// Pseudocode
// 1. Create variables
// 2. Create a timer that starts when question is asked and counts down until 0 until it resets for the next question
// 3. Create array of questions and answers
// 4. Create a way for the questions / answers to be randomly displayed 
// 5. If user guess is correct then add a windo / if user guess is incorrect then add a loss
// 6. If user guess is correct then display winning message / if user guess is incorrect then display losing message
// 7. Display number of correct and incorrect answers
// 8. Create a reset when game is over

$("#start").on("click", function() {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click",'.answer-button',function(e){
    game.clicked(e);
})

$(document).on("click",'#reset',function(){
    game.reset();
})




var questions = [
    {
        question: "How many teams competed in the 2018 FIFA World Cup?",
        choices: ["32", "34", "30", "28"],
        correctAnswer: "32"
    },

    {
        question: "Who won the 1994 FIFA World Cup?",
        choices: ["Argentina", "Germany", "Italy", "Brazil"],
        correctAnswer: "Brazil"
    },

    {
        question: "Which city has the most clubs competing in its country's top division",
        choices: ["Rome", "Moscow", "Milan", "London"],
        correctAnswer: "London"
    },

    {
        question: "How many MLS teams are based in Canada?",
        choices: ["One", "Six", "Four", "Three"],
        correctAnswer: "Three"
    },

    {
        question: "Which club has won the most Serie A titles?",
        choices: ["Internazional", "Lazio", "Milan", "Juventus"],
        correctAnswer: "Juventus"
    },

    {
        question: "Who are the only international team to win back-to-back European Championships?",
        choices: ["Spain", "Italy", "France", "Germany"],
        correctAnswer: "Spain"
    },

    {
        question: "Which team won the 2015 Women's World Cup?",
        choices: ["Japan", "England", "USA", "Canada"],
        correctAnswer: "USA"
    },

    {
        question: "Who won the first ever FA Premiere League?",
        choices: ["Liverpool", "West Ham", "Arsenal", "Manchester United"],
        correctAnswer: "Manchester United"
    },

    {
        question: "Which player has scored the most number of goals at the FIFA World Cup?",
        choices: [" Christiano Ronaldo", "Mess", "Zinedine Zidane", "Miroslav Klose"],
        correctAnswer: "Miroslav Klose"
    },

    {
        question: "Which is the only host country to get eliminated in the first round ",
        choices: ["South Africa", "USA", "Canada", "Turkey"],
        correctAnswer: "South Africa"
    }
];

var game = {
    questions: questions,
    right: 0,
    wrong: 0,
    notAnswered: 0,
    counter: 20,
    currentQuestion: 0, 
    

    countdown: function() {
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter <= 0){
            console.log("Out of Time!");
            game.timeUp();
        } 
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2> Time Remaining <span id='counter'>20</span> Seconds </h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i = 0; i < questions[game.currentQuestion].choices.length; i++)
        {
            $('#subwrapper').append('<button class ="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].choices[i]+'">'+questions[game.currentQuestion].choices[i]+'</button>');
        }
    },

    nextQuestion: function() {
        game.counter = 20;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        clearInterval(timer);
        game.notAnswered++;
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer+"</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.result,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },

    result: function() {
        clearInterval(timer);
        $("#subwrapper").html("<h2>Game Over!</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.right + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.wrong) + "</h3>";
        $("#subwrapper").append("<h3>Not Answered: " + game.notAnswered) + "</h3>";
        $("#subwrapper").append("<button id='reset'>Reset</button>");
    },

    clicked: function(e) {
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.correct();
        } else {
            game.incorrect();
        }
    },

    correct: function() {
        console.log("Yes");
        clearInterval(timer);
        game.right++;
        $("#subwrapper").html("<h2>That is correct!</h2>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.result,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    incorrect: function() {
        console.log("No");
        clearInterval(timer);
        game.wrong++;
        $("#subwrapper").html("<h2>That is incorrect!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer+"</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.result,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },

    reset: function() {
        game.counter = 20;
        game.currentQuestion = 0;
        game.right = 0;
        game.wrong = 0;
        game.notAnswered = 0;
        game.loadQuestion();
    }   

}
