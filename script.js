let randomQuestionsIndex = randomGenerator(questions.length);
let indexQuestion = 0;
let currentQuestion = randomQuestionsIndex[indexQuestion];
let optionSelected = null;
let answersCorrect = 0;
let answersIncorrect = 0;
let valueProgress = 0;

//Events
document.querySelector('.buttonStart button').addEventListener('click', showQuestion);
document.querySelector('.toRespond').addEventListener('click', checkSelection);
document.querySelector('.next').addEventListener('click', changeQuestion);
document.querySelectorAll('.restart').forEach((item) => {
    item.addEventListener('click', restart)
});


// Functions

function randomGenerator(max) {
    /* Função responsável por retornar um array com um sequência 
    de números aleatórios.*/
    let generatedNumbers = [];

    while (generatedNumbers.length < max) {
        let randomNumber = Math.floor(Math.random() * max);

        if (!generatedNumbers.includes(randomNumber)) {
            generatedNumbers.push(randomNumber);
        }
    }
    return generatedNumbers;
}


function showQuestion() {
    let q = questions[currentQuestion];

    if (!questions[currentQuestion]) {
        return finishQuiz();
    }

    let percentage = Math.floor((valueProgress / questions.length * 100))
    document.querySelector('.progress--bar').style.width = `${percentage}%`;

    document.querySelector('.currentQuestion').textContent = `${valueProgress + 1} de ${questions.length}`;

    document.querySelector('.startQuiz').style.display = 'none';
    document.querySelector('.areaQuestions').style.display = 'block';

    document.querySelector('.question').innerHTML = q.question;

    let optionsHtml = "";
    let letters = ['a', 'b', 'c', 'd'];

    for (let i in q.options) {
        optionsHtml += `<div class="option" data-op="${i}" tabindex="0"><span>${letters[i]}</span><div>${q.options[i]}</div></div>`;
    }

    document.querySelector('.options').textContent = "";
    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach((item) => {
        item.addEventListener('click', markedOption);
    });
}

function markedOption() {
    if (optionSelected !== null) {
        document.querySelector('.optionActive').classList.remove('optionActive');
    }
    optionSelected = document.activeElement.getAttribute('data-op');
    document.activeElement.classList.add('optionActive');
}

function checkSelection() {
    if (indexQuestion == (questions.length - 1)) {
        document.querySelector('.next span').textContent = 'Finalizar';
    }

    if (optionSelected !== null) {
        blockInteraction();
        if (optionSelected == questions[currentQuestion].answer) {
            document.querySelector('.responseStatus').innerHTML = responseStatus[0];
            answersCorrect++;
        } else {
            document.querySelector('.responseStatus').innerHTML = responseStatus[1];
            answersIncorrect++;
        }
    } else {
        alert("Nenhuma opção selecionada!")
    }

}

function changeQuestion() {
    // Função responsável por trocar a questão que será exibida. 
    optionSelected = null;
    indexQuestion++;
    currentQuestion = randomQuestionsIndex[indexQuestion];

    blockInteraction('off');

    valueProgress++;
    showQuestion();
}

function finishQuiz() {
    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('.areaQuestions').style.display = 'none';
    document.querySelector('.resultArea').style.display = 'flex';
    document.querySelector('.scoreboard-correct .numbers').innerHTML = answersCorrect;
    document.querySelector('.scoreboard-incorrect .numbers').innerHTML = answersIncorrect;

    // Calculo da porcentagem de acertos com base na quantidade de questões.
    let percBad = Math.ceil((questions.length * 0.3));
    let percAverage = Math.ceil((questions.length * 0.6));


    let message;
    if (answersCorrect <= percBad) {
        message = messageResult[0];
    } else if (answersCorrect <= percAverage) {
        message = messageResult[1];
    } else {
        message = messageResult[2];
    }

    document.querySelector('.resultArea .message').innerHTML = message;
}

function restart() {
    randomQuestionsIndex = randomGenerator(questions.length);
    indexQuestion = 0;
    currentQuestion = randomQuestionsIndex[indexQuestion];
    optionSelected = null;
    answersCorrect = 0;
    answersIncorrect = 0;
    valueProgress = 0;

    document.querySelector('.resultArea').style.display = 'none';
    document.querySelector('.next span').textContent = 'Próximo';
    blockInteraction('off');
    showQuestion()
}

function blockInteraction(status) {
    if (status == 'off') {
        document.querySelector('.blockInteraction').style.display = 'none';
        document.querySelector('.next').style.display = 'none';
        document.querySelector('.toRespond').style.display = 'block';
        document.querySelector('.responseStatus').textContent = '';
    } else {
        document.querySelector('.blockInteraction').style.display = 'block';
        document.querySelector('.toRespond').style.display = 'none';
        document.querySelector('.next').style.display = 'flex';
    }
}