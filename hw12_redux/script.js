function createStore(reducer){
    let state = reducer(undefined, {});
    let cbs = [];
    
    const getState  = () => state;
    const subscribe = cb => (cbs.push(cb),
                             () => cbs = cbs.filter(c => c !== cb));
                             
    const dispatch  = action => { 
        const newState = reducer(state, action);
        if (newState !== state){
            state = newState;
            for (let cb of cbs)  cb();
        }
    }
    
    return {
        getState,
        dispatch,
        subscribe
    }
}


function reducer(state, {type, item, amount, funds}) {
    if (!state){
        return {
            пиво: {amount: 100, price: 45},
            чіпси: {amount: 100, price: 55},
            сіги: {amount: 100, price: 50},
            каса: 0
        }
    }
    if (type === 'КУПИТИ' && amount <= state[item].amount && funds >= (state[item].price * amount)){
        const itemPrice = state[item].price;
        const itemAmount = state[item].amount;
        return {
            ...state,
            [item]: {amount: itemAmount - amount, price: itemPrice},
            каса: state.каса + itemPrice * amount
        }
    }
    return state;
}


function createStoreTable(parent, store) {
    const storeState = store.getState();
    
    const table = document.createElement('table');
    const caption = document.createElement('caption');

    table.id = 'storeTable';
    caption.textContent = 'Кіоск';
    table.appendChild(caption);
    table.style.borderCollapse = 'collapse';

    const headerList = ['Продукт', 'У наявності', 'Ціна']
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    headerList.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.style.border = '1px solid black';
        tr.appendChild(th);
      });

    thead.appendChild(tr);
    table.appendChild(thead);
  

    const tbody = document.createElement('tbody');

    for (item in storeState) {

        if (item === 'каса') {
            continue;
        }

        const itemInfo = storeState[item];
        const tr = document.createElement('tr');

        const nameCell = document.createElement('td');
            nameCell.textContent = item;
            nameCell.style.border = '1px solid black';
            tr.appendChild(nameCell);

        const amountCell = document.createElement('td');
            amountCell.textContent = itemInfo.amount;
            amountCell.style.border = '1px solid black';
            tr.appendChild(amountCell);
      
        const priceCell = document.createElement('td');
            priceCell.textContent = itemInfo.price;
            priceCell.style.border = '1px solid black';
            tr.appendChild(priceCell);
          
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    parent.append(table);

    return {
        parent, 
        store
    }
}


function updateTable(storeTable) {
  const {parent, store} = storeTable;

    const existingTable = document.querySelector('#storeTable');
    if (existingTable) {
        existingTable.remove();
      }
    createStoreTable(parent, store);
}


function createStoreCheckout(parent, store) {
    const storeState = store.getState();
    const buyItem = (item, amount) => ({type:'КУПИТИ', item, amount, funds});

    const select = document.createElement('select');

    for (item in storeState) {

        if (item === 'каса') {
            continue;
        }

        const option = document.createElement('option');
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }
    parent.appendChild(select);


    const input = document.createElement('input');
    input.type = 'number';
    parent.appendChild(input);

    const buyBtn = document.createElement('button');
    buyBtn.innerText = 'Купити';
    buyBtn.onclick = () => {
        const amount = parseInt(input.value, 10);
        store.dispatch(buyItem(select.value, amount));
    } 
    parent.appendChild(buyBtn);
}


function checkFunds(parent) {
    let funds = +prompt('Скільки у вас є грошиків?');
    while (isNaN(funds) && funds < 0) {
        funds = +prompt('ЧИСЛО, ВВЕДІТЬ ЧИСЛО');
    }

    const fundsTable = document.createElement('table')
    fundsTable.id = 'avaliableFunds';

    const caption = document.createElement('caption');
    caption.textContent = 'Бюджет';

    fundsTable.appendChild(caption)

    const fundsCell = document.createElement('td');
    fundsCell.textContent = funds;
    fundsCell.style.border = '1px solid black';
    fundsTable.appendChild(fundsCell);

    parent.appendChild(fundsTable);

    return funds;
}


function updateFunds(funds, spentAmount) {
    const fundsTable = document.getElementById('avaliableFunds');
    const fundsCell = fundsTable.querySelector('td');
    const currentFunds = parseFloat(fundsCell.textContent);
    if (currentFunds >= spentAmount) {
        const updatedFunds = currentFunds - spentAmount;
        fundsCell.textContent = updatedFunds;
    
        return updatedFunds;
    }
    return funds;
}







let store = createStore(reducer);

let funds = checkFunds(document.body);
const storeCheckout = createStoreCheckout(document.body, store)
let storeTable = createStoreTable(document.body, store);


store.subscribe(() => {
    console.log(store.getState());
    updateTable(storeTable);

    const {каса} = store.getState();
    document.title = `Каса: ${каса}грн`;


    const input = document.querySelector('input');
    const select = document.querySelector('select');
    const amount = parseInt(input.value, 10);
    funds = updateFunds(funds, amount * store.getState()[select.value].price);
})