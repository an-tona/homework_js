// //Світлофор

async function trafficLight(time, switchTime){
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

    const [red, yellow, green] = [...document.querySelectorAll('.traffic-light div')];
    const [redPed, greenPed] = [...document.querySelectorAll('.pedestrian div')];
    const switchBtn = document.querySelector('button');

    const domEventPromise = (element, event) =>
        new Promise(resolve => {
            element.addEventListener(event, () => {
                delay(500).then(() => resolve());
            }, { once: true });
    });

    switchBtn.addEventListener('click', () => {});

    const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                switchBtn.disabled = greenPed.classList.contains('active');
            }
        }
    });
    observer.observe(greenPed, { attributes: true });


    while (true) {
        red.classList.add('active');
        greenPed.classList.add('active');
        await Promise.race([delay(time), domEventPromise(switchBtn, 'click')]);
        red.classList.remove('active');
        
        yellow.classList.add('active');
        await delay(switchTime);
        yellow.classList.remove('active');
        greenPed.classList.remove('active');

        green.classList.add('active');
        redPed.classList.add('active');
        await Promise.race([delay(time), domEventPromise(switchBtn, 'click')]);
        green.classList.remove('active');
        
        yellow.classList.add('active');
        await delay(switchTime);
        yellow.classList.remove('active');
        redPed.classList.remove('active');
    }
}

trafficLight(5000, 1000);


//speedtest

async function speedtest(getPromise, count, parallel = 1) {
    let start = Date.now();

    for (let i = 0; i < count; i++) {
        const promiseList = [];

        for (let j = 0; j < parallel; j++) {
            const promise = getPromise();
            promiseList.push(promise);
        }

        const resolvedPromises = await Promise.all(promiseList);
    }

    const duration = Date.now() - start;
    const querySpeed = count / duration;
    const queryDuration = duration / count;
    const parallelSpeed = (count * parallel) / duration; 
    const parallelDuration = duration / (count * parallel);

    return {
        duration,
        querySpeed,
        queryDuration,
        parallelSpeed,
        parallelDuration
    };
}

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

speedtest(() => delay(1000), 10, 10).then(result => console.log(result));
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result));


//gql

function gql(endpoint, query, variables = {}) {
    return fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ query, variables })
        })
        .then(res => res.json())
}

;(async () => {
    const catQuery = `query cats($q: String){
                                        CategoryFind(query: $q){
                                            _id name
                                        }
                                    }`
    const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql",  catQuery,  {q: "[{}]"})
    console.log(cats) //список категорій з _id name та всім таким іншим
    
    
    const loginQuery = `query login($login:String, $password:String){
                            	login(login:$login, password:$password)
                        }`
    
    const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery ,{login: "test457", password: "123123"})
    console.log(token)
})()


//jwtDecode

function jwtDecode(token){ 
    try {
        const tokenSplit = token.split('.');
        const encodedPayload = tokenSplit[1];
        const decodedPayload = atob(encodedPayload);
        const decodedData = JSON.parse(decodedPayload);
        return decodedData;
    }
    catch(e) { 
        return undefined;
    }
}