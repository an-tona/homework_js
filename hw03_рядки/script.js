// String: greeting

function greeting() {

    const name = prompt('Як вас звати?');

    alert(`Вітаю, ${name}`)
}

greeting();


// String: gopni4ek

function touretteSyndrome() {

    const userStory = prompt('Як пройшов ваш день?');

    const userStoryArray =  userStory.split(',')
    const gopni4ek = userStoryArray.join(', блін,');

    console.log(gopni4ek);
}

touretteSyndrome();


// String: capitalize

let str = prompt('Введіть шось');

function capitalize(string) {

    let result = string.toLowerCase();
    
    return result[0].toUpperCase() + result.slice(1);

}

console.log(capitalize(str));


//String: word count

function countWordAmount() {

    let str = prompt('Введіть речення');

    let wordAmount = str.split(' ');
    console.log(wordAmount.length);
}

countWordAmount();


//String: credentials

let name = prompt('Введіть ваше імʼя'),
    surname = prompt('Введіть ваше прізвище'),
    patronymic = prompt('Введіть ваше імʼя по батькові');

function credentials() {
    
    let fullName = `${capitalize(name)} ${capitalize(surname)} ${capitalize(patronymic)}`
    
    alert('Ваше повне імʼя: ' + fullName);
}

credentials();


// String: beer

function prohibition() {

    let str = "Було жарко. Василь пив пиво вприкуску з креветками";

    let result = str.split(' ');
    result[result.indexOf('пиво')] = 'чай';
    result = result.join(' ');
    
    console.log(result);
}

prohibition();


//String: no tag

function noTag() {

    let str = "якийсь текст, в якому є один тег <br /> і всяке інше";
   
    let result = str.slice(0, str.indexOf('<')) + 
                 str.slice(((str.indexOf('>') + 2) || str.indexOf('> ') + 1), str.length); //працює навіть якщо тег не оточений пробілами

    console.log(result)
}

noTag();


//String: big tag

function bigTag() {
     
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше"
   
    let result = str.slice(0, str.indexOf('<')) + 
                 str.slice(str.indexOf('<'), (str.indexOf('>') + 1)).toUpperCase() + 
                 str.slice((str.indexOf('>') + 1), str.length);

    console.log(result) 
}

bigTag();


//String: new line

function newLine() {

    let str = prompt('Введіть рядок. Використовуйте \n як маркер нового рядка.')

    str = str.split(/\\n/);
    str = str.join('\n');

    console.log(str)
}

newLine();


//String: youtube

function youtube() {
    const userLink = prompt('Вставте посилання на Ютуб');
    const ytRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;


    const ytIdentificator = userLink.match(ytRegex);
    
    // console.log(ytIdentificator);

    document.write(`
    <div class="video">
    <iframe src="https://www.youtube.com/embed/${ytIdentificator[1]}"
      width="560" height="315" 
      frameborder="0" allow="autoplay; encrypted-media" 
      allowfullscreen>
    </iframe>
   </div> 
    `);
}

youtube();


