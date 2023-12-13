//Confirms

function confirms() {
    const arr = [confirm('9?'), confirm('10?'), confirm('не чує баба')];
}


//Prompts

function prompts() {
    const arr = [];

    arr[0] = prompt('то 10 чи 9?');
    arr[1] = prompt('а?');
    arr[2] = prompt('ало');
}


//Item access

function itemAccess() {
    const fruits = ['apple', 'orange', 'pear'];

    const userFruit = prompt('Введіть індекс масиву з фруктами');

    console.log(fruits[userFruit]);
}


//Item change

function itemChange() {
    const fruits = ['apple', 'orange', 'pear'];

    const fruitIndex = prompt('Введіть індекс для нового фрукту');
    const newFruit = prompt(`Введіть назву фрукту з індексом ${fruitIndex}`);

    fruits[fruitIndex] = newFruit;
    // console.log(fruits);
}


//Multiply table

function multiplyTable() {
    const table5x5 = [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8], [0, 3, 6, 9, 12], [0, 4, 8, 12, 16]];
    // console.log(arr[2][3]);
    return table5x5;
}


//Multiply table slice

{
    const arr = multiplyTable();
    const table4x4 = arr.slice(1).map(multiplier => multiplier.slice(1));
    // console.log(table4x4);
}


//IndexOf Word

function getWordIndex() {
    const userSentence = prompt('Введіть речення'),
          userWord = prompt('Введіть слово з попереднього речення');

          sentenceArr = userSentence.split(' ');

        if(sentenceArr.indexOf(userWord) + 1) {
            alert(sentenceArr.indexOf(userWord) + 1);
        } else {
            alert('Помилка')
        }
}


//Reverse

function reverse() {

    const arr = [];

    for (let i = 0; i < 5; i++) {
        arr.push(prompt(`Введіть назву ${i + 1} елементу`))
    }

    const arrReverse = [];

    // for(let i = arr.length; i > 0; i--) {   //початкова ідея без pop();
    //     arrReverse.push(arr[i - 1]);
    // }

    while (arr.length > 0) {
        arrReverse.push(arr.pop());
    }

    return arrReverse;
}


//Reverse 2

function reverse2() {
    const arr = reverse();
    const arrReverse = [];

    while (arr.length > 0) {
        arrReverse.unshift(arr.shift());
    }

    // console.log(arrReverse);
}

// reverse2();


//Copy

function copy() {
    const arr = multiplyTable();
    const arrCopy = [...arr];
}


//Deep Copy

function deepCopy() {
    const arr = multiplyTable();
    const arrCopy = [[...arr[0]], [...arr[1]], [...arr[2]], [...arr[3]], [...arr[4]]];
    //найпростіший спосіб

    const arrCopyLoop = []; //те саме через цикл
    for (let i = 0; i < arr.length; i++) {
        arrCopyLoop.push([...arr[i]])
    }
}


//Array Equals

function arrayEquals() {
    const arr = [1, 2, 3];
    const arr1 = arr, 
          arr2 = arr;

    console.log(arr1 === arr2);
}


//Flat

function flat() {
    const arr = multiplyTable();
    const arrUnited = [];
    for (let i = 0; i < arr.length; i++) {
        arrUnited.push(...arr[i]);
    }
}


//Destruct

function destruct() {
    let userInput = prompt('Введіть речення');
    userInput = userInput.split('').filter(char => char !== ' ');

    let [firstChar,,,, fifthChar,,,, ninthChar] = userInput;

    console.log(firstChar + fifthChar + ninthChar);
}   


//Destruct default

function destructDefault() {
    const userInput = prompt('Введіть речення');

    let [, secondLetter = '!',,fourthChar = '!', fifthLetter = '!'] = userInput.split('').filter(char => char !== ' ');

    console.log(secondLetter + fourthChar + fifthLetter);
}


//Multiply table rest

function multTableRest() {
    const arr = multiplyTable();

    let [,[, ...multBy1], [, ...multBy2], [, ...multBy3], [, ...multBy4]] = arr;

    let table4x4 = [multBy1, multBy2, multBy3, multBy4];
}


//For Alert

function forAlert() {
    const arr = ["John", "Paul", "George", "Ringo"];

    for (const name of arr) {
        alert(name);
    }
}


//For Select Option

function forSelectOption() {
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let   str = "<select>";
    for (const currency of currencies){
    
        str += `<option value=${currency}>${currency}</option>`

    }
    str+= "</select>";
    document.write(str);
}


//For Table Horizontal

function forTableHor() {
    const names = ["John", "Paul", "George", "Ringo"];
    let   str = "<table>";
    for (const name of names){
    
        str += `<td style='border:1px solid black'>${name}</td>`;

    }
    str+= "</table>";
    document.write(str);

}


//For Table Vertical

function forTableVer() {
    const names = ["John", "Paul", "George", "Ringo"];
    let   str = "<table>";
    for (const name of names){
    
        str += `<tr><td style='border:1px solid black'>${name}</td></tr>`;

    }
    str+= "</table>";
    document.write(str);
}


//For Table Letters

function forTableLetters() {
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let   str = "<table>";
    for (const currency of currencies){ 
        
        str += `<tr/>`;

        console.log(currency);
        for (const letter of currency){ 
           
            str += `<td style='border:1px solid black'>${letter}</td>`;

            console.log(letter);
        }
    }
    str+= "</table>";
    document.write(str);
}


//For Multiply Table

function forMultTable() {
    const arr = multiplyTable();

    let   str = '<table style="border-collapse:collapse" border="1px solid black"><tr>';
    for (const multiplier of arr){ 
        
        str += '<tr>';

        if (arr.indexOf(multiplier) % 2 === 0) {
            for (const num of multiplier){ 
                str += `<td style='border:1px solid black; background-color:lightgrey'>${num}</td>`;
            }
        } else {
            for (const num of multiplier){           
                str += `<td style='border:1px solid black'>${num}</td>`;
            }

        str += '</tr>';
        
        }
    }
    str+= "</table>";
    document.write(str);
}


//Function Capitalize

const capitalize = str => {
    let result = str.toLowerCase();
    
    return result[0].toUpperCase() + result.slice(1);
}


//Map Capitalize

function mapCalitalize() {
    let userInput = prompt('Введіть речення');

    let userInputArr = userInput.split(' ');
    userInput = userInputArr.map(word => capitalize(word)).join(' ');
    //цікаво, чи це норм практика перезаписувати змінні, чи все ж краще створити нову змінну userInputCapitalized

    console.log(userInput);
}
// mapCalitalize();


//Filter Lexics
const banWords = ['лайка', 'матюк'];

function filterLexics() {
    const userInput = prompt('Введіть речення');
    let userInputArr = userInput.split(' ');

    let filteredArr = userInputArr.filter(word => !banWords.includes(word));
    // filterBoolean = userInputArr.length === filteredArr.length;

    filteredArr = filteredArr.join(' ');

    // console.log(filterBoolean);
    console.log(filteredArr);
}
filterLexics();


// Beep Lexics


function beepLexics() {
    
    const userInput = prompt('Введіть речення');
    let userInputArr = userInput.split(' ');

    let filteredArr = userInputArr.map(word => banWords.includes(word) ? 'BEEP' : word);

    return filteredArr = filteredArr.join(' ');
}


//Reduce HTML

function reduceHTML() {

    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<select>";
    str += currencies.reduce((a,b) => a + `<option value=${b}>${b}</option>`, '');
    str += "</select>";
    document.write(str);
}


//For Brackets Hell Check

function forBracketsHellCheck() {
    const userInput = prompt('Введіть рядок з будь-якими парними дужками в ньому');
    const userInputArr = userInput.split('');

    const stack = [];
    // const bracketsArr = ['(', ')', '[', ']', '{', '}'];  //для другого способу

    for (const bracket of userInputArr) {
        stack.unshift(bracket);

        if(stack[1] === '(' && stack[0] === ')' ||
           stack[1] === '{' && stack[0] === '}' ||
           stack[1] === '[' && stack[0] === ']') {
            
            stack.shift();
            stack.shift();
        }
    // if (bracketsArr.indexOf(stack[1]) % 2 === 0 && bracketsArr.indexOf(stack[0]) % 2 !== 0 &&
    //     (bracketsArr.indexOf(stack[1]) + 1) === bracketsArr.indexOf(stack[0])) {
    //         stack.shift();
    //         stack.shift();
    //     }  // код гірше читається, але працює краще, якщо в перелік дужок захочемо додати нові символи (напр. < та >)
    }

    if (stack.length === 0) {
        alert('Помилок немає');
    } else {
        alert('Помилка');
    }
}