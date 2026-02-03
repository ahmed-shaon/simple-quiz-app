import { questions } from "./questions.js";


const questionElement = document.getElementById("question");
const optionElement = document.getElementById("option");
const nextBtn = document.getElementById("next-btn");

let score = 0;
let currentQuestionIndex = 0;

const startQuiz = () => {
    score = 0;
    currentQuestionIndex = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

startQuiz()


function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const { question, options} = currentQuestion;
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber+". "+ question;

    //show options
    options.forEach(({text, isCorrect}) => {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.classList.add("btn");
        optionElement.appendChild(button);

        button.dataset.isCorrect = isCorrect;

        button.addEventListener("click", selectAnswer);

    })

}

function resetState(){
    nextBtn.style.display = "none";

    while(optionElement.firstChild){
        optionElement.removeChild(optionElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;

    if(selectedBtn.dataset.isCorrect === "true"){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");        
    }


    Array.from(optionElement.children).forEach((optionBtn) => {
        if(optionBtn.dataset.isCorrect === "true") optionBtn.classList.add("correct");
        optionBtn.disabled = true;
    })

    nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block"
}

nextBtn.addEventListener("click", () =>{
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else if(currentQuestionIndex === questions.length){
        showScore();
    }else{
        startQuiz();
    }
})

