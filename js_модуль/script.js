//login & register modal
const modalTriggerLog = document.querySelector('#login-header'),
      modalTriggerReg = document.querySelector('#register-header'),
      modal = document.querySelector('.modal'),
      modalRegisterTitle = document.querySelector('#register-title'),
      modalLoginTitle = document.querySelector('#login-title'),
      confirmPasswordContainer = document.getElementById('confirm-password-container'),
      modalSignBtn = document.querySelector('.sign-btn'),
      logInput = document.querySelector('.login-input'),
      pwInput = document.querySelector('.password-input'),
      confPwInput = document.querySelector('.confirm-password-input'),
      logoutBtn = document.querySelector('#logout-btn'),
      registerErrorMsg = document.querySelector('#register-error'),
      cartIcon = document.querySelector("#cart-icon"),
      loginErrorMsg = document.querySelector('#login-error'),
      itemsAmount = document.querySelector('#items-amount');

function openModal(regFirst = false) {
    modalRegisterTitle.classList.toggle('modal-title--active', regFirst);
    modalLoginTitle.classList.toggle('modal-title--active', !regFirst);

    if (regFirst) {
        modalRegisterTitle.style.fontWeight = 'bold';
        modalSignBtn.textContent = 'Sign Up'
        modalLoginTitle.style.fontWeight = 'normal';
        confirmPasswordContainer.style.display = 'block';
    } else {
        modalRegisterTitle.style.fontWeight = 'normal';
        modalSignBtn.textContent = 'Sign In'
        modalLoginTitle.style.fontWeight = 'bold';
        confirmPasswordContainer.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

modalTriggerLog.addEventListener('click', () => {
    openModal(false);
    loginErrorMsg.style.display = 'none';
    modalSignBtn.textContent = 'Sign In'
});

modalTriggerReg.addEventListener('click', () => {
    openModal(true);
    modalSignBtn.textContent = 'Sign Up'
    loginErrorMsg.style.display = 'none';
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    location.hash = "#/";
    loginErrorMsg.style.display = 'none';
    turnPwRed(false);
    inputValueReset();
}

modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    };
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' &&  modal.style.display == 'block' ) {
        closeModal();
    }
});

modalRegisterTitle.addEventListener('click', () => {
    location.hash = "#/register";
    openModal(true);
    loginErrorMsg.style.display = 'none';
    turnPwRed(false);
    confPwInput.value = '';
});

modalLoginTitle.addEventListener('click', () => {
    location.hash = "#/login";
    openModal(false);
    loginErrorMsg.style.display = 'none';
    turnPwRed(false);
});

function turnPwRed(redOrNot = true) {
    pwInput.style.border = redOrNot ? '1px solid red' : 'initial';
    confPwInput.style.border = redOrNot ? '1px solid red' : 'initial';
    registerErrorMsg.style.display = redOrNot ? 'flex' : 'none';
}

function inputValueReset() {
    pwInput.value = '';
    confPwInput.value = '';
    logInput.value = '';
}


//store
function createStore(reducer){
    let state = reducer(undefined, {});
    let cbs = [];
    
    const getState  = () => state;
    const subscribe = cb => (cbs.push(cb), 
                             () => cbs = cbs.filter(c => c !== cb));
    const dispatch  = action => { 
        if (typeof action === 'function'){
            return action(dispatch, getState);
        }
        const newState = reducer(state, action);
        if (newState !== state){
            state = newState;
            for (let cb of cbs)  cb(state);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

//reducers
function localStorageReducer(originalReducer, localStorageKey){
    function wrapper(state, action) {
        if (state === undefined) {
          try {
            return JSON.parse(localStorage[localStorageKey])
        } 
        catch {}
        }

        const newState = originalReducer(state, action);
        localStorage[localStorageKey] = JSON.stringify(newState)

        return newState;
    }
    
    return wrapper;
}

function combineReducers(reducers){
    function totalReducer(state={}, action){
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)){
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]){
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length){
            return {...state, ...newTotalState}
        }
        return state
    }
    return totalReducer
}

const reducers = {
    promise: promiseReducer,
    auth: localStorageReducer(authReducer, 'auth'),
    cart: localStorageReducer(cartReducer, 'cart'),
}

const totalReducer = combineReducers(reducers) 

function promiseReducer(state={}, action){
    const {namePromise, type, status, payload, error} = action;
    if (type === 'PROMISE'){
        return {
            ... state,
            [namePromise]: {
                type,
                status,
                payload,
                error
            }
        }
    }
    return state;
}

function authReducer(state={}, {type, token}){
    if (type === 'AUTH_LOGOUT'){
        return {}
    }
    if (type === 'AUTH_LOGIN') {
        let payload = jwtDecode(token);
        if (payload) {
            return {token, payload}
        }
    }
    return state;
}

function cartReducer(state={}, {type, count, good}) {
    if (type === 'CART_ADD') {
        const id = good._id;
        return {
            ...state,
            [id]: {
                count: state[id] ? state[id].count + count : count,
                good
            }
        };
    }
    if (type === 'CART_SUB') {
        const id = good._id;
        if (state[id] === undefined || state[id].count <= count) {
            let newState = {...state}
            delete newState[id];
            return newState;
        } else {
            return {
            ...state,
            [id]: {
                count: state[id].count - count,
                good
                }
            }   
        }
    }
    if (type === 'CART_DEL') {
        const id = good._id;
            let newState = {...state}
            delete newState[id];
            return newState;
    }
    if (type === 'CART_SET') {
        const id = good._id;
        if (count <= 0) {
            let newState = {...state}
            delete newState[id];
            return newState; 
        } else {
            return {
                ...state,
                [id]: {
                    count: count,
                    good
                    }
            }  
        } 
    }
    if (type === 'CART_CLEAR') {
        return {}
    }

    return state;
}
 
const actionCartAdd = (good, count=1) => ({type: 'CART_ADD', count, good});
const actionCartSub = (good, count=1) => ({type: 'CART_SUB', count, good});
const actionCartDel = (good)          => ({type: 'CART_DEL', good});
const actionCartSet = (good, count=1) => ({type: 'CART_SET', count, good});
const actionCartClear = ()            => ({type: 'CART_CLEAR'});


const actionPending = namePromise              => ({namePromise, type: 'PROMISE', status: 'PENDING'});
const actionFulfilled = (namePromise ,payload) => ({namePromise, type: 'PROMISE', status: 'FULFILLED', payload});
const actionRejected = (namePromise ,error)    => ({namePromise, type: 'PROMISE', status: 'REJECTED',  error});

const actionPromise = (namePromise, promise)   => async dispatch => {
    dispatch(actionPending(namePromise));
    try {
        const payload = await promise;
        dispatch(actionFulfilled(namePromise, payload));
        return payload;
    } catch(error) {
        dispatch(actionRejected(namePromise, error));
    }
}

const store = createStore(totalReducer);
store.subscribe(() => console.log(store.getState()));

//cart subsribe
store.subscribe(() => {
    const cart = store.getState().cart;
    let totalCount = 0;
    let totalPrice = 0;

    for (let item in cart) {
            totalCount += cart[item].count;
            
            const price = cart[item].good.price;
            const count = cart[item].count;
            totalPrice += price * count;
    }
    cartCount.innerHTML = totalCount;

    itemsAmount.innerHTML = totalCount;
    total.innerHTML = `<b>${totalPrice}грн</b>`;
})
cartIcon.addEventListener('click', () => {
    location.hash = "#/cart"; 
    location.reload();
});


//draw subscribe
const drawCategory = () => { //draw goods main
    const [,route] = location.hash.split('/')
    if (route !== 'category') return 

    const {status, payload, error} = store.getState().promise.categoryById || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`;
    }
    if (status === 'FULFILLED'){
        const {name, goods} = payload.CategoryFindOne //payload.data
        main.innerHTML = `<h1>${name}</h1>`
        for (const {_id, name, price, images, description} of goods) {
            const div = document.createElement('div');
            div.innerHTML = `
                <div>
                    <a href="#/good/${_id}">${name}</a>
                    <div><img style="max-width:100%" src="http://shop-roles.node.ed.asmer.org.ua/${images && images[0] && images[0].url}"></div>
                    <span>Ціна: ${price}грн</span>
                    <button class="addToCartBtn">Add to Cart</button>
                    </br></br></br>
                </div>
            `;
            main.appendChild(div);

            const addToCartBtn = div.querySelector('.addToCartBtn');
            addToCartBtn.addEventListener('click', () => {
                store.dispatch(actionCartAdd({_id, name, price, images, description}, 1));
            });
        }
    }
}

store.subscribe(drawCategory)

store.subscribe(() => { //draw good
    const [,route] = location.hash.split('/')
    if (route !== 'good') return

    const {status, payload, error} = store.getState().promise.goodById || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        const {name, price, _id, description, images} = payload.GoodFindOne //payload.data
        main.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <span>Ціна: ${price}грн</span>
        <button class="addToCartBtn">Add to Cart</button>
        </br></br>
        `
        for (const {url} of images || [] ) {
            div.innerHTML += `<div><img src="http://shop-roles.node.ed.asmer.org.ua/${url}"></div>`
        }
        main.appendChild(div);

        const addToCartBtn = div.querySelector('.addToCartBtn');
            addToCartBtn.addEventListener('click', () => {
                store.dispatch(actionCartAdd({_id, name, price, images, description}, 1));
            });
    }
})

store.subscribe(() => { //draw aside
    const {status, payload, error} = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED' && payload){
        aside.innerHTML = '<p>Categories:</p>'
        for (const { _id, name} of payload.CategoryFind){ //payload.data
            const link = document.createElement('a');
            link.href = `#/category/${_id}`;
            link.textContent = name;
            link.addEventListener('click', hideCheckout);
            aside.appendChild(link);
        }
    }
})


store.subscribe(() => { //draw logged username + logout btn
    loginGreetUser.innerHTML = ("token" in store.getState().auth ? `Welcome, ${store.getState().auth.payload.sub.login}` : '');
    login.style.display = ("token" in store.getState().auth ? 'none' : 'block');
    logout.style.display = ("token" in store.getState().auth ? 'block' : 'none');
})



//gql
const gql = getGql('http://shop-roles.node.ed.asmer.org.ua/graphql');

function getGql(url) {
    function gql(query, variables={}) {
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...("token" in store.getState().auth ? {"Authorization": `Bearer ${store.getState().auth.token}`} : null)
            },
            body: JSON.stringify({query, variables}) 
        })
        .then(res => res.json())
        .then(json => {
            if (json.data){
              const result = Object.values(json)[0];
              console.log('result', result)
              return result;
            }
            throw new Error(json.data.errors[0].message);
        })
        .catch(error => console.log(error))
    }
    return gql;
}


const gqlRootCats = () =>
gql(`
    query roots{
        CategoryFind(query: "[{\\"parent\\": null}]") {
            _id
            name
        }
    }
    `)

const gqlCategoryById = (_id) => 
gql(`
    query CategoryById($q: String) {
        CategoryFindOne(query: $q) {
        _id
        name
        goods {
            _id
            name
            price
            description
            images {
            _id
            text
            url
            originalFileName
            }
        }
        image {
            _id
            text
            url
            originalFileName
        }
        }
    }
    `,
    {q: JSON.stringify([{_id}])} //example: "[{\"_id\": \"6262ca7dbf8b206433f5b3d1\"}]"
)

const gqlGoodById = (_id) => 
gql(`
    query GoodById($q: String) {
        GoodFindOne(query: $q) {
            _id
            name
            price
            description
            createdAt
            categories {
                _id
                createdAt
                name
            }
            images {
                _id
                createdAt
                text
                url
                originalFileName
            }
        }
    }
    `,
    {q: JSON.stringify([{_id}])}
)

const gqlLogin = (login,password) => {
    return gql(`
                query login($login:String, $password:String){
                    login(login:$login, password:$password)
                }
                `,
                {login, password}
                )
}

const gqlUserRegister = (login,password) =>{
    return gql(`
    mutation register($login:String, $password: String){
        UserUpsert(user: {login:$login, password: $password}){
          login
        }
      }
    `, 
    {login,password}
    )
}

const gqlOrderFind = () =>{
    return gql(`
    query orderHistory {
        OrderFind(query: "[{}]") {
          orderGoods { price total count good{name images{url}}}
            owner {
              login
            }
          }
        }
    `)
}

const gqlOrderUpsert = (order) => {
    return gql(`
    mutation makeOrder($order: OrderInput){
        OrderUpsert(order:$order){
          _id
        }
      }
    `,
      {order}
    )
}

//actions for goods
const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats())
store.dispatch(actionRootCats())

const actionCategoryById = (_id) =>
    actionPromise('categoryById', gqlCategoryById(_id))

const actionGoodById = (_id) =>
    actionPromise('goodById', gqlGoodById(_id))


//actions for login & register
const actionAuthLogin = token  => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = ()    => ({type: 'AUTH_LOGOUT'})

const actionFullLogin = (login, password) => async dispatch => {
    try {
        const response = await dispatch(actionPromise("gqlLogin", gqlLogin(login,password)));
        const token = response['login'];
        loginErrorMsg.style.display = token === null ? 'flex' : 'none';

        if (jwtDecode(token)) {
            dispatch(actionAuthLogin(token));
            closeModal();
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
    }
};

const actionFullRegister = (login, password) =>
    async dispatch => {
        let registerInfo = await dispatch(actionPromise('registerUser', gqlUserRegister(login,password)))
        if (registerInfo) {
            dispatch(actionFullLogin(login, password))
        }
}

//actions for orders
const actionMakeOrder = () =>
    async (dispatch, getState) => {
        const orderGoods = [];
        for (const item in getState().cart) {
            const {count, good} = store.getState().cart[item]
            const {_id} = good
            const order = {count, good:{_id}}
            orderGoods.push(order)     
        }
        const orderInfo = { orderGoods }
        if (await dispatch(actionPromise('makeOrder', gqlOrderUpsert(orderInfo)))) {
            dispatch(actionCartClear());
            setTimeout(() => {
                location.reload()
            }, 5000);
        }
}

const actionOrderFind = () => actionPromise('history', gqlOrderFind())

//additional functions
function jwtDecode(token) { 
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

modalSignBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (modalSignBtn.textContent === 'Sign Up') {   
        if (pwInput.value === confPwInput.value) {
            store.dispatch(actionFullRegister(logInput.value, pwInput.value));
            turnPwRed(false);
        } else {
            turnPwRed();
        }
    } else {
        store.dispatch(actionFullLogin(logInput.value, pwInput.value));
    }
    
});

logoutBtn.addEventListener('click', () => {
    store.dispatch(actionAuthLogout());
    location.reload();
});

function hideCheckout() {
    mainContainer.style.justifyContent = 'initial';
    checkout.style.display = 'none';
}
function showCheckout() {
    mainContainer.style.justifyContent = 'space-between';
    checkout.style.display = 'flex';
}

function showEmptyCart() {

    main.innerHTML = `
    <section class="empty-cart">
        <img src='./images/sad-cart.png'>
        <h3>Your cart is empty</h3>
        <p>Looks like you have not added anything to your cart.</p>
    </section>
    `;
}

const thanksModal = document.querySelector('.thanks-modal');

function showThanksModal() {
    thanksModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        hideThanksModal();
    }, 5000);
}

function hideThanksModal() {
    thanksModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (store.getState().auth.token) {
        showThanksModal();
        store.dispatch(actionMakeOrder())
    } else {
        location.hash = "#/login";
    }
});

showOrderHistory.addEventListener('click', () => {
    showOrderHistory.style.display = 'none';
    hideOrderHistory.style.display = 'block';
});

hideOrderHistory.addEventListener('click', () => {
    showOrderHistory.style.display = 'block';
    hideOrderHistory.style.display = 'none';
});


window.onhashchange = () => {
    const [,route, _id] = location.hash.split('/'); //розбиває адресу сайту після # на масив

    const routes = {
        category() {
            store.dispatch(actionCategoryById(_id))
        },
        good() {
            store.dispatch(actionGoodById(_id))
        },
        login() {
            if (Object.keys(store.getState().auth).length === 0) {
                openModal()
            }
        },
        register() {
            if (Object.keys(store.getState().auth).length === 0) {
                openModal(true)
            }
        },
        cart() {
            main.innerHTML = '';
            const cart = store.getState().cart;
            if (Object.keys(cart).length === 0) {

                showEmptyCart();

            } else {
                showCheckout()

                main.innerHTML = `
                <section class='cart-header'>
                    <h2>Shopping Cart</h2>
                    <span class='clear-cart'>Clear cart</span>
                </section>
                
                <section class='cart-items-container'>
                `;
                const cartItemsContainer = document.querySelector('.cart-items-container'); 
                const cart = store.getState().cart;

                for (let item in cart) {
                    const { _id, name, images, price, description } = cart[item].good;
                    const imageUrl = images[0].url;
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <div class='cart-item' id='${_id}'>
                            <div class='cart-item-img-container'>
                                <img src="http://shop-roles.node.ed.asmer.org.ua/${imageUrl}">
                            </div>
                            <div class='cart-item-info-container'>
                                <h5>${name}</h5>
                                <p>${description || ''}</p>
                                <span>${price}грн</span>
                            </div>
                            <div class='cart-item-amount-container'>
                                <div class='delete-item-container' id='delete${_id}'>
                                    <img style= "max-width:20px"src='./images/bin.svg'>
                                </div>
                                <div class='edit-cart'>
                                    <div class='minus-btn' id='minus${_id}'>-</div>
                                    <div class='current-item-amount' id='amount${_id}'>${cart[item].count}</div>
                                    <div class='plus-btn' id='plus${_id}'>+</div>
                                </div>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(div);

                    document.addEventListener('DOMContentLoaded', () => {
                        const minusBtn = document.querySelector(`#minus${_id}`);
                        const plusBtn = document.querySelector(`#plus${_id}`);
                        const currItemAmount = document.querySelector(`#amount${_id}`);
                        const deleteBtn = document.querySelector(`#delete${_id}`);

                        minusBtn.addEventListener('click', () => {

                            store.dispatch(actionCartSub(cart[item].good, 1));

                            if (store.getState().cart[item] === undefined) {
                                    cartItemsContainer.removeChild(div);
                                    location.reload()
                            } else {
                                currItemAmount.innerHTML = store.getState().cart[item].count;
                            }
                        });

                        plusBtn.addEventListener('click', () => {
                            store.dispatch(actionCartAdd(cart[item].good, 1));
                            currItemAmount.innerHTML = store.getState().cart[item].count;
                        });

                        deleteBtn.addEventListener('click', () => {
                            if (confirm('Delete this item from the shopping cart?')) {
                                store.dispatch(actionCartDel(cart[item].good));
                                cartItemsContainer.removeChild(div);
                                location.reload()
                            }
                        })
                    });
                }
                main.innerHTML += `</section>`

                const clearCart = document.querySelector('.clear-cart');
                clearCart.addEventListener('click', () => {
                    if (confirm('This action will remove all items from your shopping cart.')) {
                        store.dispatch(actionCartClear());
                        location.reload()
                    }
                });
            }
        }, 
        async history() {
            const orderHistory = await (store.dispatch(actionOrderFind()));
            const orderHistoryList = orderHistory['OrderFind'];
            console.log('orderHistoryList ', orderHistoryList)

            let ordersHTML = `
                <h2>Order History</h2>
            `;

            if (Object.keys(store.getState().auth).length === 0) {
                ordersHTML += `<h4>You have to be logged in to view your order history.</h4>`
            } else if (orderHistoryList.length === 0) {
                ordersHTML += `<h4>You have not ordered anything yet.</h4>`
            } else {
                for (let index = 0; index < orderHistoryList.length; index++) {
                    const order = orderHistoryList[index];
                    let totalOrderPrice = 0;
    
                    for (const orderItem of order.orderGoods) {
                        const itemTotalAmount = orderItem.total;
                        totalOrderPrice += itemTotalAmount;
                    }
    
                    ordersHTML += `
                        <div class='order'>
                            <div class='order-title'>
                                <h4>Order ${index + 1}</h4>
                                <p>Total: ${totalOrderPrice}грн.</p>
                            </div>
                    `;
                
                    for (const orderItem of order.orderGoods) {
                        const itemName = orderItem.good.name; 
                        const itemPrice = orderItem.price; 
                        const itemQuantity = orderItem.count;
                        const itemTotalAmount = orderItem.total; 
                        const imageUrl = orderItem.good.images[0].url;
    
                        ordersHTML += `
                        <div class='order-item'>
                            <div class='order-item-img-container'>
                                <img src="http://shop-roles.node.ed.asmer.org.ua/${imageUrl}">
                            </div>
                            <div class='order-item-info-container'>
                                <h5>${itemName}</h5>
                                <p>${itemQuantity} шт.</p>
                                <span>${itemPrice}грн</span>
                            </div>  
                        </div>
                        `
                        if (order.orderGoods.indexOf(orderItem) !== order.orderGoods.length - 1) {
                            ordersHTML += `<span class="spacer"></span>`;
                        }
                    }
                    ordersHTML += `
                        </div>
                    `
                }
            }
            main.innerHTML = ordersHTML;
        }
    }

    if (route in routes){
        routes[route]()
    }
}

window.onhashchange()




