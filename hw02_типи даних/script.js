// assign: evaluation

var a = 5;  //1 вираз
var b, c;

b = (a * 5);  // b = (), (a * 5) -- 2 вирази
b = (c = b/2); // b = (), c = (), (b / 2) -- 3 вирази

b = ((a) * (5));
b = ((c) = ((b)/(2)));


// Number: age

function yearOfBirth() {

const userAge = prompt('Скільки вам років?');
alert(2023 - userAge);
}

yearOfBirth();

// Number: temperature

function temperatureInF() {
    const tempInC = prompt('Введіть температуру у градусах Цельсія')
    return ((tempInC * 9/5) + 32)
}

console.log(temperatureInF());

// Number: divide

function devideTwoNumbers() {
    const numerator = prompt('Введіть числівник'),
          denominator = prompt('Введіть знаменник');

    return Math.round(numerator/denominator);
}

console.log(devideTwoNumbers());

// Number: currency

function UAHToUSD() {
    const rate = 36.13,
          UAH = prompt('Введіть кількість гривень для обміну');

    alert('Ви отримаєте $' + (UAH / rate).toFixed(2));

}

UAHToUSD();

//Number: RGB

function RGBcolor() {
    const red = parseInt(prompt('Введіть значення червоного каналу (0-255)')),
          green = parseInt(prompt('Введіть значення зеленого каналу (0-255)')),
          blue = parseInt(prompt('Введіть значення синього каналу (0-255)'));

    if (0 <= red && red <= 255 && 0 <= green && green <= 255 && 0 <= blue && blue <= 255) {
       return '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0')
    } else {
        alert('Помилка');
    }
}

console.log(RGBcolor());

// Number: flats

function flatLocation() {
    const floorAmount = prompt('Скільки поверхів у вашому будинку?'),
          flatsOnEachFloor = prompt('Скільки квартир розміщено на одному поверсі?'),
          flatNumber = prompt('Який номер вашої квартири?');

    const currentEnterance = Math.ceil(flatNumber / flatsOnEachFloor / floorAmount)
    const currentFloor = Math.ceil((flatNumber - ((flatsOnEachFloor * floorAmount) * (currentEnterance - 1))) / flatsOnEachFloor)

    alert('Ваша квартира знаходиться на ' + currentFloor + ' поверсі ' + currentEnterance + ' підʼїзду.' )
}

flatLocation();

