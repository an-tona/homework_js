//while confirm
{
    let loop = confirm('Зупинити цикл?');

    while (!loop) {
        loop = confirm('Зупинити цикл?');
    }
}


//array fill
{
    const arr = [];
    let newElement = prompt('Введіть новий елемент масиву');

    while (newElement) {
        arr.push(newElement);
        newElement = prompt('Введіть новий елемент масиву');
    }

    console.log(arr);
}


//array fill nopush
{
    const arr = [];
    let newElement = prompt('Введіть новий елемент масиву');
    let i = 0;
    
    while (newElement) {
        arr[i] = newElement;
        i++;
        newElement = prompt('Введіть новий елемент масиву');
    }
    
    console.log(arr); 
}


//infinite probability
{
    let i = 0;
    while (true) {
        if(Math.random() > 0.9) {
            break;
        }
        i++;
    }
    alert(i);
}


//empty loop
{
    for (let loop = prompt('Зупинити цикл?'); loop === null; loop = prompt('Зупинити цикл?'));
}


//progression sum
{
    let num = 1,
        sum = num;
    const N = prompt('Введіть число')

    for (let i = 1; i < N; i++) {
        num += 3;
        sum += num;
    }
    console.log(sum)
}


//chess one line
{
    let str = '';
    let result;
    const strLength = prompt('Введіть довжину рядка');
  

    for (let i = 1; i < strLength; i++) {
        str += '# ' ;
    }

    if (strLength % 2 !== 0) {
        result = str.trim();
    } else {
        result = str
    }

    console.log(result);
}


//numbers (рядок)
{
    let result = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            result += j;
            if (j === 9) {
                result += '\n';
            }
        }
    }
    console.log(result)
}
//numbers (колонка)
{
    let result = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            result += i;
            if (j === 9) {
                result += '\n';
            }
        }
    }
    console.log(result)
}


//chess
{
    let x = prompt('Вкажіть ширину дошки'),
        y = prompt('Вкажіть висоту дошки'),
        chessBoard = '';

        for (let i = 0; i < y; i++) {
            if (i % 2 === 0) {
                for (let j = 0; j < x;j++) {
                    if (j % 2 === 0) {
                        chessBoard += '.'
                    } else {
                        chessBoard += '#'
                    }
                }
            } else {
                for (let j = 0; j < x;j++) {
                    if (j % 2 === 0) {
                        chessBoard += '#'
                    } else {
                        chessBoard += '.'
                    }
                }
            }
        chessBoard += '\n'
        }
    console.log(chessBoard)
}


//cubes
{
    const N = prompt('Введіть кількість елементів у масиві'),
          arr = [];

    for (let i = 0; i < N; i++) {
        arr[i] = i ** 3;
    }
    console.log(arr);
}


//multiply table
function createMultiplyTable() {
    const multiplyTable = [];

    for (let i = 0; i < 10; i++) {
        multiplyTable[i] = [];

        for(let j = 0; j < 10; j++) {
            multiplyTable[i].push(i * j);
        }
    }

    console.log(multiplyTable);

    const multTableNoZeros = multiplyTable.slice(1).map(multiplier => multiplier.slice(1));
    return multTableNoZeros;
}


//read array of objects
{
    function readArrayOfObjects() {
        const arr = [];
        let i = 0;

        while(confirm('Додати новий обʼєкт?')) {
            arr[i] = {}
            let key = prompt('Введіть ключ');

            while (key) {
                arr[i][key] = prompt('Введіть властивість');
                key = prompt('Введіть ключ');
            }
            i++;
        }
    return arr;
    }

    console.log(readArrayOfObjects());
}


//Ромбік (насправді повернутий квадратик)
{
    const size = 11; //будь-яке непарне число
    let diamond = '';

    for (let i = 1; i <= size; i += 2) {
        for (let j = 1; j <= size; j++) {
            if (j > ((size - i) / 2) && j < (((size + i) / 2) + 1)) {
                diamond += '#';
            } else {
                diamond += '.';
            }
        }
        diamond += '\n';
    }

    for (let i = (size - 2); i >= 0; i -= 2) {
        for (let j = 1; j <= size; j++) {
            if (j > ((size - i) / 2) && j < (((size + i) / 2) + 1)) {                                                              
                diamond += '#';
            } else {
                diamond += '.';
            }
        }
        diamond += '\n';
    }

    console.log(diamond)
}


//DOM: multiply table 
//+
//DOM: highlight cell
{
    const arr = createMultiplyTable();
    const table = document.createElement('table');

    for (let i = 0; i < arr.length; i++) {
        const row = document.createElement('tr');

        if (i % 2 === 0) {
            for (const num of arr[i]) {
                const cell = document.createElement('td');
                cell.style.border = '1px solid gainsboro';
                cell.style.backgroundColor = 'whitesmoke';
                cell.innerText = num;
                cell.onmouseover = () => {
                    cell.style.backgroundColor = 'grey'
                }
                cell.onmouseout = () => {
                    cell.style.backgroundColor = 'whitesmoke'
                }
                row.append(cell);
            }
        } else {
            for (const num of arr[i]) {
                const cell = document.createElement('td');
                cell.style.border = '1px solid gainsboro';
                cell.innerText = num;
                cell.onmouseover = () => {
                    cell.style.backgroundColor = 'grey'
                }
                cell.onmouseout = () => {
                    cell.style.backgroundColor = 'white'
                }
                row.append(cell);
            }
        }
        table.append(row);
    }
    document.body.append(table);
}


//DOM: Highlight cross (ПОГАНЕ РІШЕННЯ З ВИКОРИСТАННЯМ КЛАСІВ)
{
    const arr = createMultiplyTable();
    const table = document.createElement('table');

    for (let i = 0; i < arr.length; i++) {
        const row = document.createElement('tr');

       
            for (let j = 0; j < arr[i].length; j++) {
                const cell = document.createElement('td');
                cell.style.border = '1px solid gainsboro';
                cell.innerText = arr[i][j];
                cell.classList.add(`column${i}`, `row${j}`);

                cell.onmouseover = () => {
                    const column = document.querySelectorAll(`.column${i}`),
                          row = document.querySelectorAll(`.row${j}`);

                    column.forEach(element => {
                        element.style.backgroundColor = 'lightgrey'
                    });
                    
                    row.forEach(element => {
                        element.style.backgroundColor = 'lightgrey'
                    });

                    cell.style.backgroundColor = 'grey'
                }
                
                cell.onmouseout = () => {
                    const column = document.querySelectorAll(`.column${i}`),
                    row = document.querySelectorAll(`.row${j}`);

                    column.forEach(element => {
                        element.style.backgroundColor = 'white'
                    });
                    
                    row.forEach(element => {
                        element.style.backgroundColor = 'white'
                    });

                    cell.style.backgroundColor = 'white'
                }
                row.append(cell); 
        }
        table.append(row);
    }
    document.body.append(table);
}
