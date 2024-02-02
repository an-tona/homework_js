//fetch basic

function jsonToTable(json, parent) {
    parent.innerHTML = '';

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

       for (const key in json) {
        const row = document.createElement('tr');
        
        const keyCell = document.createElement('td');
        keyCell.textContent = key;
        keyCell.style.border = '1px solid black';

        const valueCell = document.createElement('td');
        valueCell.textContent = json[key];
        valueCell.style.border = '1px solid black';

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    }

     parent.appendChild(table);
}

fetch('https://swapi.dev/api/people/1/')
  .then(res => res.json())
  .then(luke => jsonToTable(luke, document.body));


//fetch improved

function fetchImproved(json, parent) {
parent.innerHTML = '';

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

       for (const key in json) {
        const row = document.createElement('tr');
        
        const keyCell = document.createElement('td');
        keyCell.textContent = key;
        keyCell.style.border = '1px solid black';

        const valueCell = document.createElement('td');

        const swapi = 'https://swapi.dev/api/';

        if (Array.isArray(json[key])) {
            for (const link of json[key]) {
                if (link.includes(swapi)) {
                    const btn = document.createElement('button');
                    const subdirectory = link.indexOf(swapi) + swapi.length;
                    const btnName = link.substring(subdirectory);
                    btn.innerText = btnName;

                    btn.onclick = () => {
                        fetch(link)
                            .then(res => res.json())
                            .then(res => fetchImproved(res, parent));
                    }

                    valueCell.appendChild(btn);
                } 
            }

        } else if (typeof json[key] === "string" && json[key].indexOf(swapi) > -1) {
                    const btn = document.createElement('button');
                    const subdirectory = json[key].indexOf(swapi) + swapi.length;
                    const btnName = json[key].substring(subdirectory);
                    btn.innerText = btnName;

                    btn.onclick = () => {
                        fetch(json[key])
                            .then(res => res.json())
                            .then(res => fetchImproved(res, parent));
                    }

                    valueCell.appendChild(btn);

        } else {
                    valueCell.textContent = json[key];
        }

        valueCell.style.border = '1px solid black';

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    }

     parent.appendChild(table);
}

fetch('https://swapi.dev/api/people/1/')
  .then(res => res.json())
  .then(luke => fetchImproved(luke, document.body));


//race

function delay(ms){
    function executor(fulfill){
        setTimeout(() => fulfill(ms), ms);
    }
    return new Promise(executor)
}


function fetchStarWars() {
    return fetch('https://swapi.dev/api/people/1/')
        .then(response => response.json());
}


Promise.race([
    fetchStarWars(),
    delay(Math.random() * 3000)
]).then(result => {
        if (typeof result !== 'object') {
            console.log('Переможець: delay');
        } else {
            console.log('Переможець: fetchStarWars');
        }
});


//Promisify: confirm

function confirmPromise(text) {
    return new Promise((resolve, reject) => {
        const result = confirm(text);

        if (result) {
            resolve();
        } else {
            reject();
        }
    });
}

confirmPromise('Проміси це складно?')
    .then(() => console.log('Не так вже й складно'))
    .catch(() => console.log('Respect за посидючість і уважність'));


//Promisify: prompt

function promptPromise(text){
     return new Promise((resolve, reject) => {
        const userInput = prompt(text);
        if (userInput) {
            resolve(userInput);
        } else {
            reject();
        }
     });
}

promptPromise("Як тебе звуть?").then(name => console.log(`Тебе звуть ${name}`),
                                       () => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))


//Promisify: LoginForm

function loginPromise(parent) {
    function executor(resolve, reject) {
        const form = new LoginForm(parent);

        form.onSubmit = () => {
            resolve({
                login: form.getLgValue(),
                password: form.getPwValue()
            });
        };

        form.onError = (error) => {
            reject(error);
        };
    }

    return new Promise(executor);
}

loginPromise(document.body).then(({login, password}) => console.log(`Ви ввели ${login} та ${password}`))




function LoginForm(parent, open = false) {
    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.name = 'login';
    loginInput.placeholder = 'Введіть логін'
    parent.append(loginInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = open ? 'text' : 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Введіть пароль'
    parent.append(passwordInput);

    const isOpenCheckbox = document.createElement('input');
    isOpenCheckbox.type = 'checkbox';
    isOpenCheckbox.checked = open;
    parent.append(isOpenCheckbox);

    const logInBtn = document.createElement('button');
    logInBtn.innerText = 'Log In';
    parent.append(logInBtn);

    this.getLgValue = () => loginInput.value;
    this.setLgValue = (value) => {
        loginInput.value = value;

        if (this.onChange) {
            this.onChange(value);
        } 
    }

    this.getPwValue = () => passwordInput.value;
    this.setPwValue = (value) => {
        passwordInput.value = value;

        if (this.onChange) {
            this.onChange(value);
        } 
    }

    this.setOpen = (isOpen) => {
        passwordInput.type = isOpen ? 'text' : 'password';
        isOpenCheckbox.checked = isOpen;

        if (this.onOpenChange) {
            this.onOpenChange(isOpen);
        }
    }
    this.getOpen = () => isOpenCheckbox.checked;

    loginInput.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange([loginInput.value, passwordInput.value]);
        } 
    });
    passwordInput.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange([loginInput.value, passwordInput.value]);
        } 
    });

    isOpenCheckbox.addEventListener('change', () => {
        this.setOpen(isOpenCheckbox.checked);
    });

    function btnDisable(btn) {
        btn.disabled = !loginInput.value || !passwordInput.value;
    }

    loginInput.addEventListener('input', () => btnDisable(logInBtn));
    passwordInput.addEventListener('input', () => btnDisable(logInBtn));
    btnDisable(logInBtn);

    logInBtn.addEventListener('click', () => {
        if (this.onSubmit) {
            this.onSubmit();
        }
    });
}

