//Literals
{
    const userInfo = {
        name: 'Alex',
        email: 'abex@bmail.bom',
        age: 30,
        sex: 'male',
        premiumSub: false
    }
}


//Literals expand
{
    const someObj = {
        [prompt('ключ-літерал')]: prompt('властивість-літерал'),
        [prompt('ще 1 ключ-літерал')]: prompt('і ще 1 властивість-літерал')
    }


//Literals copy

    const someObjCopy = {...someObj}
    

    const someKey = prompt('ключ-змінна');
    someObjCopy[someKey] = prompt('властивість-змінна');


    console.log(someObjCopy);
}

//Html tree
{
    const htmlTree = {
        tagName: 'body',
        children: [
        {
            tagName: 'div',
            children: [
                {
                    tagName: 'span',
                    children: ['Enter a data please:']
                }, 
                {
                    tagName: 'br'
                }, 
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'name'
                    }
                }, 
                {
                    tagName: 'input',
                    attrs: {
                        type: 'text',
                        id: 'surname'
                    }
                }
            ]
        },
        {
            tagName: 'div',
            children: [
                {
                    tagName: 'button', 
                    attrs: {
                        id: 'ok'
                    },
                    children: ['OK'] 
                },
                {
                    tagName: 'button',
                    attrs: {
                        id: 'cancel'
                    },
                    children: ['Cancel']
                }
            ]
        }
        ]
    }

    console.log(htmlTree.children[1].children[1].children[0])
    console.log(htmlTree.children[0].children[3].attrs.id)


//Parent


    htmlTree.children[0].parent = htmlTree;
    htmlTree.children[0].children[0].parent = htmlTree.children[0];
    htmlTree.children[0].children[1].parent = htmlTree.children[0];
    htmlTree.children[0].children[2].parent = htmlTree.children[0];
    htmlTree.children[0].children[3].parent = htmlTree.children[0];
    htmlTree.children[1].parent = htmlTree;
    htmlTree.children[1].children[0].parent = htmlTree.children[1];
    htmlTree.children[1].children[1].parent = htmlTree.children[1];

    console.log(htmlTree);

//Change OK

    htmlTree.children[1].children[0].attrs[prompt('введіть ключ (існуючий або новий')] = prompt('введіть значення');
   

//Destructure

    const {children: [{children: [{children: [spanText]}]}]} = htmlTree;
    const {children: [, {children: [{children: [btnText]}]}]} = htmlTree;
    const {children: [{children: [,,, {attrs: {id: idAttr}}]}]} = htmlTree;

    console.log(spanText, btnText, idAttr);
}


//Destruct array
{
    let arr = [1,2,3,4,5, "a", "b", "c"]

   const [odd1, even1, odd2, even2, odd3, ...letters] = arr;
   console.log(odd1, even1, odd2, even2, odd3, letters);
}


//Destruct string
{
    let arr = [1, "abc"]

    const [number, [s1, s2, s3]] = arr;
    console.log(number, s1, s2, s3);
}


//Destruct 2
{
    let obj = {name: 'Ivan',
           surname: 'Petrov',
           children: [{name: 'Maria'}, {name: 'Nikolay'}]}

    const {children: [{name: name1}, {name: name2}]} = obj;
    console.log(name1, name2);
}


//Destruct 3
{
    let arr = [1, 2, 3, 4, 5, 6, 7, 10]

    const {0: a, 1: b, length} = arr;
    console.log(a, b, length);
}


//Copy delete
{
    const userInfo = {
        name: 'Alex',
        email: 'abex@bmail.bom',
        age: 30,
        sex: 'male',
        premiumSub: false,
    }

    const {...userInfoCopy} = userInfo;
    delete userInfoCopy[prompt('Введіть ключ для видалення')];

    //або

    const {[prompt('Введіть ключ для видалення')]: deletedKey, ...userInfoCopy2} = userInfo;

}


//Currency real rate
{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
           const currInit = prompt('Введіть вхідну валюту').toUpperCase();
           const currExch = prompt('Введіть валюту, в яку відбувається конвертація').toUpperCase();
           const currAmount = +prompt('Введіть суму у вхідній валюті').toUpperCase();

           if(data.rates[currInit] === undefined || data.rates[currExch] === undefined || (isNaN(currAmount)) || currAmount < 0) {
                alert('Помилка')
           } else {
                alert((currAmount / data.rates[currInit] * data.rates[currExch]).toFixed(2));
           }
        })
}


//Currency drop down
{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);

        let   str = "<select>";
        for (const currency of currencies){
    
            str += `<option value=${currency}>${currency}</option>`

        }
        str+= "</select>";
        document.write(str);

        })
}


//Currency table

function forMultTable() {
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const currencies = data.rates
        const nameOfCurrency = Object.keys(currencies)
        const currencyValue = Object.entries(currencies)

        let str = '<table style="border-collapse:collapse" border="1px solid black"><tr><th></th>';

            for(let currency of nameOfCurrency){
                str+= `<th>${currency}</th>`;
            }
        str += '</tr>';
            for(let currencyArray of currencyValue){
                let [currency1, value1] = currencyArray
                str+= `<tr><td>${currency1}</td>`
                    for(let[currency2, value2] of currencyValue){
                        str+= `<td>${(value1 / value2).toFixed(4)}</td>`
                    }
            }

        str+= "</tr></table>";
        document.write(str);
        })
}



//Form
function form(anyObj) {
const arrContainer = Object.entries(anyObj);
let str = '<form>';

for (let arr of arrContainer) {
     if (typeof(arr[1]) === 'string') {
             str += `<label>${arr[0]}: <input type="text" value=${arr[1]} /></label>`;
        } else if (typeof(arr[1]) === 'number') {
           str += `<label>${arr[0]}: <input type="number" value=${arr[1]} /></label>`;
        } else if (typeof(arr[1]) === 'boolean') {
         str += arr[1] ?  `<label>${arr[0]}: <input type="checkbox" checked /></label>`: `<label>${arr[0]}: <input type="checkbox" /></label>`;      
}
}
     str += '</form>';
    document.write(str);
}


//Table
function table(input) {

const keys = [];
input.forEach((obj) => {
    keys.push(...Object.keys(obj));
});

const uniqueKeys = keys.filter((item, index) => keys.indexOf(item) === index);

let str = '<table style="border-collapse:collapse" border="1px solid black"><tr>';

for (const key of uniqueKeys) {
    str += `<th>${key}</th>`;
}

for (const obj of input) {
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


const testArr = [
    {
       "Name":"chevrolet chevelle malibu",
       "Cylinders":8,
       "Displacement":307,
       "Horsepower":130,
       "Weight_in_lbs":3504,
       "Origin":"USA"
    },
    {
       "Name":"buick skylark 320",
       "Miles_per_Gallon":15,
       "Cylinders":8,
       "Displacement":350,
       "Horsepower":165,
       "Weight_in_lbs":3693,
       "Acceleration":11.5,
       "Year":"1970-01-01",
    },
    {
       "Miles_per_Gallon":18,
       "Cylinders":8,
       "Displacement":318,
       "Horsepower":150,
       "Weight_in_lbs":3436,
       "Year":"1970-01-01",
       "Origin":"USA"
    },
    {
       "Name":"amc rebel sst",
       "Miles_per_Gallon":16,
       "Cylinders":8,
       "Displacement":304,
       "Horsepower":150,
       "Year":"1970-01-01",
       "Origin":"USA"
    },
]

table(testArr);