//Arrow to Functions

//1
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
console.log(createMultiplyTable());

//2
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

//3
function romb(size) {
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
    return diamond
}
console.log(romb(11));

//4
function arrayFill() {
    const arr = [];
    let newElement = prompt('Введіть новий елемент масиву');
    
    while (newElement) {
        arr.push(newElement);
        newElement = prompt('Введіть новий елемент масиву');
    }
    
    return arr;
}
console.log(arrayFill());

//5
function arrayFillNopush() {
    const arr = [];
    let newElement = prompt('Введіть новий елемент масиву');
    let i = 0;
    
    while (newElement) {
        arr[i] = newElement;
        i++;
        newElement = prompt('Введіть новий елемент масиву');
    }
    
    return arr; 
}
console.log(arrayFillNopush());


//createPerson

function createPerson(name, surname) {
    return {
        name: name,
        surname: surname,
        getFullName() {
            if(this.fatherName) {
                return `${this.name} ${this.fatherName} ${this.surname}`
            } else {
                return `${this.name} ${this.surname}`
            }
        }
    }
}


//createPersonClosure

function createPersonClosure(name, surname) {
    let age, fatherName;

    function getName() {
        return name;
    }
    function getSurname() {
        return surname;
    }
    function getFatherName() {
        if (fatherName) {
            return fatherName;
        } else {
            return '';
        }
    }
    function getAge() {
        if(age) {
            return age;
        } else {
            return 'Вік невідомий';
        }

    }
    function getFullName() {
        if(fatherName) {
            return `${surname} ${name} ${fatherName}`
        } else {
            return `${surname} ${name}`
        }
    }

   function setName(newName) {
        if (newName && typeof(newName) === 'string' && newName[0] === newName[0].toUpperCase() && 
            newName.slice(1) === newName.slice(1).toLowerCase() && isNaN(newName)) {
                // name = newName;
                setFullName(`${surname} ${newName} ${fatherName}`);
        } else {
            console.log('Помилка')
        }
   }
   function setSurname(newSurname) {
        if (newSurname && typeof(newSurname) === 'string' && newSurname[0] === newSurname[0].toUpperCase() && 
            newSurname.slice(1) === newSurname.slice(1).toLowerCase() && isNaN(newSurname)) {
                // surname = newSurname;
                setFullName(`${newSurname} ${name} ${fatherName}`);
        } else {
            console.log('Помилка')
        }
   }
   function setFatherName(newFatherName) {
        if (newFatherName && typeof(newFatherName) === 'string' && newFatherName[0] === newFatherName[0].toUpperCase() && 
                newFatherName.slice(1) === newFatherName.slice(1).toLowerCase() && isNaN(newFatherName)) {
                    // fatherName = newFatherName
                    setFullName(`${surname} ${name} ${newFatherName}`);
        } else {
            console.log('Помилка')
        }
   }
   function setAge(newAge) {
        if (newAge && !isNaN(newAge) && newAge >= 0 && newAge <= 100){
            age = newAge;
        } else {
            console.log('Помилка')
        }
   }
   function setFullName(newFullName) {
        const fullNameArr = newFullName.split(' ');

        if (fullNameArr.length >= 2 && fullNameArr.every(word => word[0] === word[0].toUpperCase() 
            && word.slice(1) === word.slice(1).toLowerCase())) {
                surname = fullNameArr[0];
                name = fullNameArr[1];

                if (fullNameArr.length === 3) {
                    fatherName = fullNameArr[2];
                } else {
                    console.log('Помилка');
                }
        } else {
            console.log('Помилка');
        }
        
   }

    return {
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName,
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName
    }
}


//createPersonClosureDestruct

function createPersonClosureDestruct({
    name = 'Анон',
    surname = 'Анонов',
    fatherName = 'Анонович',
    age = null,
    fullName = `${surname} ${name} ${fatherName}`} = {}) {

        const personClosure = createPersonClosure(name, surname);

        personClosure.setFatherName(fatherName);
        if(age) {
            personClosure.setAge(age);
        }
        
        personClosure.setFullName(fullName);

    return personClosure;
}


//isSorted

function isSorted(...numbers) {
    if (numbers.some(num => typeof num !== 'number')) {
        return false;
    }
    
    for (let i = 0; i <= numbers.length; i++) {
        if (numbers[i] >= numbers[i + 1]) {
            return false;
        } 
    }
    return true;
}


//isSortedTest

function isSortedTest() {
    const arr = [];
    let newElement = prompt('Введіть новий елемент масиву');

    while (newElement) {
        arr.push(newElement);
        newElement = prompt('Введіть новий елемент масиву');
    }

    return isSorted(arr);
}


//personForm

function personForm(parentDOM, person) {
    const nameInput = document.createElement('input');
    const surnameInput = document.createElement('input');
    const fatherNameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const fullNameInput = document.createElement('input');

    nameInput.value = person.getName();
    surnameInput.value = person.getSurname();
    fatherNameInput.value = person.getFatherName();
    ageInput.value = person.getAge();
    fullNameInput.value = person.getFullName();

    parentDOM.appendChild(nameInput);
    parentDOM.appendChild(surnameInput);
    parentDOM.appendChild(fatherNameInput);
    parentDOM.appendChild(ageInput);
    parentDOM.appendChild(fullNameInput);

    nameInput.onchange = (input) => {
        person.setName(input.target.value);
        nameInput.value = person.getName();

        person.setFullName(`${surnameInput.value} ${input.target.value} ${fatherNameInput.value}`);
        fullNameInput.value = person.getFullName();
    }
    surnameInput.onchange = (input) => {
        person.setSurname(input.target.value);
        surnameInput.value = person.getSurname();

        person.setFullName(`${input.target.value} ${nameInput.value} ${fatherNameInput.value}`);
        fullNameInput.value = person.getFullName();
    }
    fatherNameInput.onchange = (input) => {
        person.setFatherName(input.target.value);
        fatherNameInput.value = person.getFatherName();

        person.setFullName(`${surnameInput.value} ${nameInput.value} ${input.target.value}`);
        fullNameInput.value = person.getFullName();
    }
    ageInput.onchange = (input) => {
        person.setAge(+input.target.value);
        ageInput.value = person.getAge();
    }
    fullNameInput.onchange = (input) => {
        person.setFullName(input.target.value)

        nameInput.value = person.getName();
        surnameInput.value = person.getSurname();
        fatherNameInput.value = person.getFatherName();
        fullNameInput.value = person.getFullName();
    }
}
personForm(document.body, createPersonClosure("Вася", "Пупкін"));


//getSetForm

function getSetForm(parent, anyObject){
    const registry = {} 
    
    const updateInputs = () => { 
        for (const keyName in registry) {
            const getKey = `get` + keyName;

            if (getKey in anyObject) {
                registry[keyName].value = anyObject[getKey]();
            }
        }
    }
    
    for (const getSetName in anyObject){
        //const getOrSet = getSetName.slice(0, 3); //так і не використав
        const keyName = getSetName.slice(3);

        const setKey = `set` + keyName
        const getKey = `get` + keyName

        let getValue = anyObject[getKey]();

        if(!(keyName in registry)) {
            const inputName = document.createElement('input');

            inputName.value = anyObject[getSetName](); //необовʼязково, бо запускаємо updateInputs();
            inputName.type = typeof anyObject[getKey]();
            inputName.placeholder = keyName;

            registry[keyName] = inputName;

            if(!(setKey in anyObject)) {
                inputName.disabled = true;
            } else {
                inputName.onchange = () => {
                    anyObject[setKey](inputName.value);
                    updateInputs();
                }
            }
            parent.appendChild(inputName);
        }
    }
    updateInputs()
}
getSetForm(document.body, createPersonClosure("Вася", "Пупкін"));