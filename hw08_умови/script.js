//comparison if
{
var age = + prompt ("Скільки вам років?", "");
if (age < 0) {
    alert("добре подумайте перед тим як народжуватися");
} else {
    if (age < 18) {
        alert("школяр");
    } else { 
        if (age > 18 && age < 30){
            alert("молодь"); 
        } else { 
            if (age > 30 && age < 45){
                alert("зрілість");
            } else {
                if (age > 45 && age < 60){
                    alert("захід сонця");
                } else {
                    if (age > 60) {
                        alert("як пенсія?");
                    } else {
                            alert("чи кіборг, чи KERNESS");
                    }
                }
            }
        }
    }
}
}


//switch: sizes
{
    const size = prompt('Введіть розмір верхнього одягу (S - XXL)').toUpperCase();

    switch (size) {
        case 'S':
            alert('Числовий розмір: 40');
            break;
        case 'M':
            alert('Числовий розмір: 42');
            break;
        case 'L':
            alert('Числовий розмір: 46');
            break;
        case 'XL':
            alert('Числовий розмір: 50');
            break;
        case 'XXL':
            alert('Числовий розмір: 54');
            break;
        default:
            alert('Розмір вказаний неправильно');
    }
}


//switch: if
{
let color = prompt("Введіть колір","");

if (color === 'red') {
    document.write("<div style='background-color: red;'>червоний</div>");
    document.write("<div style='background-color: black; color: white;'>чорний</div>");
} else if (color ==='black') {
    document.write("<div style='background-color: black; color: white;'>чорний</div>");
} else if (color === 'blue') {
    document.write("<div style='background-color: blue;'>синій</div>");
    document.write("<div style='background-color: green;'>зелений</div>");
} else if (color === 'green') {
    document.write("<div style='background-color: green;'>зелений</div>");
} else {
    document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
}
}

//noswitch
{
const noSwitch = (key, cases, defaultKey='default') => {
    if (key in cases) {
        cases[key]();
    } else {
        cases[defaultKey]();
    }
}

const drink = prompt("Що ви любите пити")
noSwitch(drink, {
    воду: () => console.log('Найздоровіший вибір!'),
    чай(){
        console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
    },
    "пиво": () => console.log('Добре влітку, та в міру'),
    віскі: function(){
        console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
    },
    default(){
        console.log('шото я не зрозумів')
    }
});
}

//closure calc
{
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
           
        const container = document.createElement('div');
        document.body.appendChild(container);

        for (const currency in data.rates) {
           const button = document.createElement('button') //або просто 'div'
           button.innerHTML = currency;
           container.appendChild(button);

           button.onclick = () => {
                const amount = prompt('Введіть суму для обміну в USD');
                alert(`Ви отримаєте ${currency} ${(amount * data.rates[currency]).toFixed(2)}`)
            }
        }
})
}