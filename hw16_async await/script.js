//chat
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

async function jsonPost(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "text/plain" //'application/json' і 'text/json' (який прописаний на сервері) не працює
                                             //якщо взагалі не вказувати заголовки, то все ок
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('status is not 200');
        }

        return await response.json();
    } catch (error) {
        throw new Error('jsonPost failed');
    }
}

function createChat(parent) {
    const nicknameInput = document.createElement('input');
    const messageTextInput = document.createElement('input');
    const sendBtn = document.createElement('button');
    const chatDiv = document.createElement('div');

    nicknameInput.placeholder = 'nickname';
    messageTextInput.placeholder = 'message';
    sendBtn.innerText = 'send'
    chatDiv.id = 'chat';

    parent.appendChild(nicknameInput);
    parent.appendChild(messageTextInput);
    parent.appendChild(sendBtn);
    parent.appendChild(chatDiv);

    function btnDisable(btn) {
        btn.disabled = !nicknameInput.value || !messageTextInput.value;
    }
    nicknameInput.addEventListener('input', () => btnDisable(sendBtn));
    messageTextInput.addEventListener('input', () => btnDisable(sendBtn));
    btnDisable(sendBtn);
    
    sendBtn.onclick = async () => {
        await sendAndCheck(nicknameInput.value, messageTextInput.value);
    }
}
createChat(document.body);

async function sendMessage(nick, message) {
    try {
        await jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: nick, message: message});
        console.log('Success');
    } catch (error) {
        console.log('Sending error');
    }
}

let latestMessageId = 0;
async function getMessages() {
    try {
       const response = await jsonPost("http://students.a-level.com.ua:10012", {func: "getMessages", messageId: latestMessageId});
       const chatDiv = document.querySelector('#chat');
       latestMessageId = response.nextMessageId;

       for (const message of response.data) {
           const messageDiv = document.createElement('div');
           messageDiv.innerHTML = `<b>${message.nick}</b>: ${message.message}`;
           chatDiv.insertBefore(messageDiv, chatDiv.firstChild);
       }  
    } catch (error) {
        console.log('Loading error');
    }
}

async function sendAndCheck(nick, message) {
    await sendMessage(nick, message);
    await getMessages();
}

(async function checkLoop() {
    while (true) {
        await getMessages();
        await delay(2000);
    }
})();


//SWAPI Links

async function swapiLinks(link) {
    const data = await fetch(link).then(res => res.json());
    const swapi = 'https://swapi.dev/api/';
    const promiseList = [];
    let resolvedCount = 0;

    for (const key in data) {
        if (Array.isArray(data[key])) {
            for (let i = 0; i < data[key].length; i++) {
                const promise = fetch(data[key][i]).then(res => res.json());

                    promise.then(() => {
                        resolvedCount++;
                        console.log(`Loading: ${((resolvedCount/promiseList.length) * 100).toFixed()}%`);
                    });

                promiseList.push(promise);
            }
        } else if (typeof data[key] === "string" && data[key].indexOf(swapi) > -1) {
            const promise = fetch(data[key]).then(res => res.json());

                    promise.then(() => {
                        resolvedCount++;
                        console.log(`Loading: ${((resolvedCount/promiseList.length) * 100).toFixed()}%`);
                    });

            promiseList.push(promise);
        }
    }
    
    const resolvedData = await Promise.all(promiseList);
    
    let index = 0;
    for (const key in data) {
        if (Array.isArray(data[key])) {
            for (let i = 0; i < data[key].length; i++) {
                data[key][i] = resolvedData[index++];
            }
        } else if (typeof data[key] === "string" && data[key].indexOf(swapi) > -1) {
            data[key] = resolvedData[index++];
        }
    }

    return data;
}

swapiLinks("https://swapi.dev/api/people/20/")
    .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)));


//domEventPromise

function domEventPromise(element, eventName){
    let eventFunc;

    function executor(resolve) {
        eventFunc = (e) => {
            element.removeEventListener(eventName, eventFunc);
            resolve(e);
        }

        element.addEventListener(eventName, eventFunc);
    }
    return new Promise(executor)
}


domEventPromise(document.body, 'click').then( e => console.log('event click happens', e));
