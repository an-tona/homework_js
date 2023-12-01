// Number: odd

function odd() {
    const num = +prompt('Введіть число');

    if (typeof num === 'number') { // (!isNaN(num))
        console.log('yes')
    }

    if (num % 2 === 0) {
        console.log('odd');
    } else {
        console.log('even');
    }
}


// String: lexics 

function lexics() {
    const userInput = prompt('Тест на програміста: напишіть матюк або некоректне слово');

    if (userInput.indexOf('матюк') !== -1 || userInput.includes('некоректне слово')) {
        console.log('Вітаю!');
    } else {
        console.log('гуляй!');
    }
}


// Boolean

function boolean() {
    const posAnswer = confirm('так?'),
          negAnswer = confirm('ні?'),
          randomAnswer = confirm('то так чи ні??');
}


// Boolean: if

function booleanIf() {
    const sexTest = confirm('Ви знаєте, що таке карбюратор?')

    if (sexTest) {
        alert("Ви чоловік");
    } else {
        alert("Ви жінка");
    }
}


// Comparison: sizes

function sizes() {
    const size = prompt('Введіть розмір верхнього одягу (S - XXL)');

    if (size === 'S') {
        alert('Числовий розмір: 40')
    } else if (size === 'M') {
        alert('Числовий розмір: 42')
    } else if (size === 'L') {
        alert('Числовий розмір: 46')
    } else if (size === 'XL') {
        alert('Числовий розмір: 50')
    } else if (size === 'XXL') {
        alert('Числовий розмір: 54')
    } else {
        alert('Розмір вказаний неправильно')
    }
}



// Ternary

function ternary() {
    const userSex = confirm('Ви знаєте, що таке карбюратор?') ?  alert("Ви чоловік") : alert("Ви жінка");
}


// Prompt: or

function orOperator() {
    const num = +prompt('Введіть ваш вік') || alert('Помилка');
}


// Confirm: or this days

function crankyRobotV1() {
    confirm("шопінг?") || alert ("ти - бяка");
}


//Confirm: if this days

function crankyRobotV2() {
   let question = confirm("шопінг?");

   if (!question) {
        alert ("ти - бяка")
   }
}

//Default: or

function mafioznik() {

    const surname = prompt('Введіть ваше прізвище') || 'Зубенко',
          name = prompt('Введіть ваше імʼя') || 'Міхаіл',
          patronymic = prompt('Введіть ваше імʼя по батькові') || 'Петрович';
}


//Default: if

function maIFoznik() {

    let surname = prompt('Введіть ваше прізвище'),
        name = prompt('Введіть ваше імʼя'),
        patronymic = prompt('Введіть ваше імʼя по батькові');

        if (!surname) {
            surname = 'Зубенко';
        }

        if (!name) {
            name = 'Міхаіл';
        }

        if (!patronymic) {
            patronymic = 'Петрович';
        }
}


// Login and password

const credentials = {
    login: 'admin',
    password: 'qwerty',
}

function checkCredentials() {
    let userLogin = prompt('Введіть логін');
    let userPassword;

    if (userLogin === credentials.login) {
        userPassword = prompt('Введіть пароль');

        if (userPassword === credentials.password) {
            alert('Вітаю!');
        } else {
            alert('Помилка');
        }

    } else {
        alert('Помилка');
    }
}


// Currency exchange

function currencyExchange() {
    let currency = prompt('EUR or USD?').toUpperCase();
    let buyOrSell = confirm('Press Yes to buy, Cancel to sell');
    let UAHamount = +prompt('Віддавайте гривні');

    let rateUSD, rateEUR;

    if (currency === 'EUR') {
        rateEUR = (buyOrSell) ? 40.85 : 41.00;
        alert(`Ви отримуєте €${(UAHamount / rateEUR).toFixed(2)}`)
    } else {
        rateUSD = (buyOrSell) ? 37.23 : 37.70;
        alert(`Ви отримуєте $${(UAHamount / rateUSD).toFixed(2)}`)
    }
}


//Scissors

function rps() {
    const userInput = prompt('Enter Rock, Paper or Scissors').toLowerCase();
    const computerInput = (Math.random() < 0.33 ? 'Rock' : Math.random() < 0.5 ? 'Paper' : 'Scissors');

    alert('Computer picked ' + computerInput);

    if (userInput === computerInput) {
        alert('Draw')

    } else if (userInput === 'scissors' && computerInput === 'Paper' || 
               userInput === 'paper' && computerInput === 'Rock' ||
               userInput === 'rock' && computerInput === 'Scissors') {

                alert('User Win')
    } else {
                alert('User Lost')
    }
}


// Додаткове завдання

function funcLauncher() {   // креативне рішення
    const userFunc = prompt('Яке завдання запустити? Натисніть Cancel, щоб переглянути список всіх завдань');

    const taskList = ['Number: odd', 'String: lexics', 'Boolean', 'Boolean: if', 'Comparison: sizes', 'Ternary', 'Prompt: or', 'Confirm: or this days', 'Confirm: if this days',
                      'Default: or', 'Default: if', 'Login and password', 'Currency exchange', 'Scissors', 'Завдання на чорний пояс'];
    const funcArray = [odd, lexics, boolean, booleanIf, sizes, ternary, orOperator, crankyRobotV1, crankyRobotV2, mafioznik, maIFoznik, checkCredentials, currencyExchange, rps, rpsPro];


    if (userFunc === null) {
        alert(taskList.join(', '));
        funcLauncher();

    } else if (taskList.includes(userFunc)) {

        funcArray[taskList.indexOf(userFunc)]();

        confirm('Запустити інше завдання?') ? funcLauncher() : alert('До побачення');

    } else {
        alert('Завдання не знайдено');
        funcLauncher();
    }
}

funcLauncher();


// Завдання на чорний пояс

function rpsPro() {
    const userInput = prompt('Enter Rock, Paper or Scissors').toLowerCase();
    const computerInput = (Math.random() < 0.33 ? 'Rock' : Math.random() < 0.5 ? 'Paper' : 'Scissors');

    alert('Computer picked ' + computerInput);

    userInput === computerInput.toLowerCase() ? alert('Draw') :
    (userInput === 'scissors' && computerInput === 'Paper' || 
    userInput === 'paper' && computerInput === 'Rock' ||
    userInput === 'rock' && computerInput === 'Scissors') ? 
    alert('User Win') :
    alert('User Lost');

    confirm('play again?') ? rpsPro() : alert("gg wp");
}


      