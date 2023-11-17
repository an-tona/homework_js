
// Calc

function afterTaxAnnualIncome2023() {
    const wage = prompt('Яка ваша погодинна оплата у гривнях?'),
    hoursPerDay = prompt('Скільки годин в день ви працюєте?'),
    incomeTax = 0.18,
    millitaryTax = 0.015,
    workingDaysin2023 = 260;

   alert('У 2023 ви заробили ' + ((wage * hoursPerDay * workingDaysin2023).toFixed(2))+ 
        'грн., з яких податки склали ' + (((wage * incomeTax) + (wage * millitaryTax)) * hoursPerDay * workingDaysin2023).toFixed(2) + 
        'грн. Остаточна зарплатня з вирахуванням податків склала: ' + 
        ((wage - (wage * incomeTax) - (wage * millitaryTax)) * hoursPerDay * workingDaysin2023).toFixed(2) + 'грн.');
}

afterTaxAnnualIncome2023();


// Завдання на синій пояс

const credentials = {
    login: 'admin',
    password: 'qwerty',
};

function checkCredentials(event) {
   event.preventDefault();
    const username = document.getElementById('username').value,
          password = document.getElementById('password').value,
          success = document.querySelector('.success'),
          failure = document.querySelector('.failure');

    if (username === credentials.login && password === credentials.password) {
        success.style.display = 'flex';
        failure.style.display = 'none';
    } else {
        failure.style.display = 'flex';
        success.style.display = 'none';
    }
}

