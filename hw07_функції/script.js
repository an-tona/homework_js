//Temperature
{
const temperatureInF = (tempInC) => (tempInC * 9/5) + 32;
}

//RGB

function RGBcolor(red, green, blue) {

    if (0 <= red && red <= 255 && 0 <= green && green <= 255 && 0 <= blue && blue <= 255) {
       return '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0')
    } else {
        alert('Помилка');
    }
}


//Flats

function flatLocation(floorAmount, flatsOnEachFloor, flatNumber) {

    const currentEnterance = Math.ceil(flatNumber / flatsOnEachFloor / floorAmount)
    const currentFloor = Math.ceil((flatNumber - ((flatsOnEachFloor * floorAmount) * (currentEnterance - 1))) / flatsOnEachFloor)

    return {currentEnterance, currentFloor}
}


//Credentials


function capitalize(string) {

    let result = string.toLowerCase();
   
    return result[0].toUpperCase() + result.slice(1);
}


function credentials() {

    let name = prompt('Введіть ваше імʼя'),
    surname = prompt('Введіть ваше прізвище'),
    patronymic = prompt('Введіть ваше імʼя по батькові');

   
    let fullName = `${capitalize(name)} ${capitalize(surname)} ${capitalize(patronymic)}`
   
    alert('Ваше повне імʼя: ' + fullName);
}

credentials();


//New line

function newLine(str) {

     str = str.split(/\\n/);
     str = str.join('\n');

    return str;
}

const userInput = prompt('Введіть рядок. Використовуйте \n як маркер нового рядка.');
newLine(userInput);


//Promt OR

const orOperator = (age = 20) => age;


//Login And Password

function checkCredentials(login, password) {
    const userLogin = prompt('Введіть логін');
   
 if (userLogin == login) {
        userPassword = prompt('Введіть пароль');

        if (userPassword == password) {
            return true;
        } else {
           return false;
        }

    } else {
        return false;
    }
}


//For table

function forMultTable(arr) {

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
    return str;
}


//Filter Lexics

function filterLexics(userInput, banWords) {
    let userInputArr = userInput.split(' ');

    let filteredArr = userInputArr.filter(word => !banWords.includes(word));


    filteredArr = filteredArr.join(' ');

    return filteredArr;
}

//Currency table

function currencyTable() {
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const currencyName = Object.keys(data.rates)
        const currencyValue = Object.entries(data.rates)

        let str = '<table style="border-collapse:collapse" border="1px solid black"><tr><th></th>';

            for(let currency of currencyName){
                str+= `<th>${currency}</th>`;
            }
        str += '</tr>';
            for(let [currency1, value1] of currencyValue){
                str+= `<tr><td>${currency1}</td>`;
                    for(let[, value2] of currencyValue){
                        str+= `<td>${(value1 / value2).toFixed(4)}</td>`;
                    }
            }

        str+= "</tr></table>";
        document.write(str);
    })
}


//form

function form(someObject) {
const arrContainer = Object.entries(someObject);
   
let str = '<form>';
for (let arr of arrContainer) {
     if (typeof(arr[1]) === 'string') {
             str += `<label>${arr[0]}: <input type="text" value=${arr[1]} /></label></br>`;
        } else if (typeof(arr[1]) === 'number') {
           str += `<label>${arr[0]}: <input type="number" value=${arr[1]} /></label></br>`;
        } else if (typeof(arr[1]) === 'boolean') {
         str += arr[1] ?  `<label>${arr[0]}: <input type="checkbox" checked /></label></br>`: `<label>${arr[0]}: <input type="checkbox" /></label></br>`;      
    }
}
     str += '</form>';
    document.write(str);
}


//Array of objects sort

function arrOfObjSort(arr, key, direction) {
    const buffer = [];
    const sortedArr = [];
    for (const obj of arr) {
        buffer.unshift(obj[key]);
    }
    if(direction || direction === undefined) {
    buffer.sort();
    } else {
         buffer.sort();
         buffer.reverse();  
    }
    for (let i = 0; i < buffer.length; i++) {
       
        for (const obj of arr) {
            if (obj[key] === buffer[i]) {
                sortedArr.push(obj)
               
            }
        }
    }
    console.log(sortedArr);
}



//Table

function table(arr, key, direction = true) {
    const buffer = [];
    const sortedArr = [];

    for (const obj of arr) {
        buffer.unshift(obj[key]);
    }

    buffer.sort();
    if(direction === false) {
         buffer.reverse();  
    }
    
    for (let i = 0; i < buffer.length; i++) {
         if (sortedArr.length === buffer.length) {
            break;
        }
        for (const obj of arr) {
       if (obj[key] === buffer[i] && buffer[i] !== undefined) {
                sortedArr.push(obj)
                } else if (buffer[i] === undefined && obj[key] === undefined) {
                    if (sortedArr.indexOf(obj) > (-1)) {
                        continue;
                    }
                 sortedArr.push(obj);          
                }
            }
        }

    const keys = [];
    sortedArr.forEach((obj) => {
        keys.push(...Object.keys(obj));
    });
    const uniqueKeys = keys.filter((item, index) => keys.indexOf(item) === index);
    let str = '<table style="border-collapse:collapse" border="1px solid black"><tr>';
    for (const key of uniqueKeys) {
        str += `<th>${key}</th>`;
    }
    for (const obj of sortedArr) {
        str += '<tr>';
        for (const value of uniqueKeys) {
                if (obj[value] === undefined) {
                    str += `<td></td>`;  
                } else {
            str += `<td>${obj[value]}</td>`;
                }
        }
        str += '</tr>';
    }
    str+= "</tr></table>";
    document.write(str);
}


// Calc func

function afterTaxAnnualIncome2023(wage, hoursPerDay) {
      const incomeTax = 0.18,
      militaryTax = 0.015,
      workingDaysin2023 = 260;
  
    const grossIncome = (wage * hoursPerDay * workingDaysin2023).toFixed(2);
    const totalTax = (((wage * incomeTax) + (wage * militaryTax)) * hoursPerDay * workingDaysin2023).toFixed(2);
    const netIncomeAfterTax = ((wage - wage * incomeTax - wage * militaryTax) * hoursPerDay * workingDaysin2023).toFixed(2);
  
    return { grossIncome, totalTax, netIncomeAfterTax };
}
  
console.log(afterTaxAnnualIncome2023(200, 8));
  