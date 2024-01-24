//makeProfileTimer
function makeProfileTimer() {
    const t0  = performance.now()
    
    return function() {
        const t1  = performance.now()
        return t1 - t0;
    };
}


//makeSaver
function makeSaver(f) {
    let value = null;

    return function() {
        if (value === null) {
            value = f();
        }
        return value;
    }
}


//myBind
function myBind(f, context, arr) {

    return function(...params) {

        const args = [...arr];
        let paramIndex = 0;

        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined) {
                args[i] = params[paramIndex];
                paramIndex++;
            }
        }
        return f.apply(context, args)
    }
}



//checkResult
function checkResult(original, validator){
    function wrapper(...params){
        let result;
      
      do {
        result = original.call(this, ...params);
      } while (!validator(result));
  
      return result;
        
    }
    
    return wrapper
}

const randomHigh = checkResult(Math.random, x => x >= 0.5);
const alwaysSayYes = checkResult(confirm, x => x === true);
const respectMe = checkResult(credentials, x => x !== '');



function credentials() {

    let name = prompt('Введіть ваше імʼя') || '',
    surname = prompt('Введіть ваше прізвище') || '',
    patronymic = prompt('Введіть ваше імʼя по батькові') || '';

   
    let fullName = `${name} ${surname} ${patronymic}`
   
    return fullName.trim();
}