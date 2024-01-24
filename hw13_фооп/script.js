//Person Constructor

function Person(name, surname) {
    this.name = name;
    this.surname = surname;
    this.getFullName = function() {
        if(this.fatherName) {
            return `${this.name} ${this.fatherName} ${this.surname}`
        } else {
            return `${this.name} ${this.surname}`
        }
    }
}


//Person Prototype

function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

Person.prototype.getFullName = function() {
    if(this.fatherName) {
        return `${this.name} ${this.fatherName} ${this.surname}`
    } else {
        return `${this.name} ${this.surname}`
    }
}


//Store
//function expression
function StoreExp(reducer) { 
    this.state = reducer(undefined, {});
    this.cbs = [];

    this.getState = () => this.state;
    this.subscribe = cb => (this.cbs.push(cb),
        () => this.cbs = this.cbs.filter(c => c !== cb));
    this.dispatch = action => { 
        const newState = reducer(this.state, action);
        if (newState !== this.state){
            this.state = newState;
            for (let cb of this.cbs) cb();
        }
    };
}
//function declaration
function StoreDec(reducer) { 
    this.state = reducer(undefined, {});
    this.cbs = [];

    this.getState = function () {
        return this.state;
    };

    this.subscribe = function (cb) {
        this.cbs.push(cb);
        return () => this.cbs = this.cbs.filter(c => c !== cb);
    };

    this.dispatch = function (action) {
        const newState = reducer(this.state, action);
        if (newState !== this.state) {
            this.state = newState;
            for (let cb of this.cbs) cb();
        }
    };
}


//Password

function Password(parent, open) {

    const container = document.createElement('div');
    parent.append(container);

    const pwInput = document.createElement('input');
    const isOpenCheckbox = document.createElement('input');
    
    isOpenCheckbox.type = 'checkbox';
    isOpenCheckbox.checked = open;

    pwInput.type = open ? 'text' : 'password';
    pwInput.name = 'password';
    
    container.append(pwInput);
    container.append(isOpenCheckbox);


    this.getValue = () => pwInput.value;
    this.setValue = (value) => {
        pwInput.value = value;

        if (this.onChange) {
            this.onChange(value);
        } 
    }


    this.setOpen = (isOpen) => {
        pwInput.type = isOpen ? 'text' : 'password';
        isOpenCheckbox.checked = isOpen;

        if (this.onOpenChange) {
            this.onOpenChange(isOpen);
        }
    }
    this.getOpen = () => isOpenCheckbox.checked;


    pwInput.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange(pwInput.value);
        } 
    });

    isOpenCheckbox.addEventListener('change', () => {
        this.setOpen(isOpenCheckbox.checked);
    });

    this.setStyle = (property, value) => {
        pwInput.style[property] = value;
    };
}


//LoginForm

function LoginForm(parent) {
    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.name = 'login';
    parent.append(loginInput);
    
    const password = new Password(parent, false);

    const logInBtn = document.createElement('button');
    logInBtn.innerText = 'Log In';
    parent.append(logInBtn);

    function btnDisable(btn) {
        btn.disabled = !loginInput.value || !password.getValue();
    }

    loginInput.addEventListener('input', () => btnDisable(logInBtn));
    password.onChange = () => btnDisable(logInBtn);
    btnDisable(logInBtn);
}
LoginForm(document.body);


//LoginForm Constructor

function LoginFormConstructor(parent, open) {
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
            this.onChange([loginInput.value, passwordInput.value]); //або просто loginInput.value
        } 
    });
    passwordInput.addEventListener('input', () => {
        if (this.onChange) {
            this.onChange([loginInput.value, passwordInput.value]); //або просто passwordInput.value
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
}
const form = new LoginFormConstructor(document.body, true);


//Password Verify

function passwordVerify(parent, open) {
    const password = new Password(parent, open);

    const secondPassword = document.createElement('input');
    secondPassword.type = 'password';
    parent.append(secondPassword);


    function passwordCheck() {
        if (password.getValue() !== secondPassword.value && !password.getOpen()) {
            password.setStyle('border-color', 'red');
            secondPassword.style.borderColor = 'red';
        } else {
            password.setStyle('border-color', 'initial');
            secondPassword.style.borderColor = 'initial';
        }
    }
    function secondPasswordHide() {
        if (password.getOpen()) {
            secondPassword.style.display = 'none';
        } else {
            secondPassword.value = '';
            secondPassword.style.display = 'block';
        }
    }

    password.onChange = () => passwordCheck(), secondPasswordHide();
    password.onOpenChange = () => secondPasswordHide();
    secondPassword.addEventListener('input', () => passwordCheck());

    secondPasswordHide();
}
