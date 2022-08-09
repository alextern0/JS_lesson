
function product(name, price) {
    this.name = name;
    this.price = price;
}

let object_1 = new product("jacket", 125);
let object_2 = new product("shirt", 155);
let object_3 = new product("hoody", 185);
let object_4 = new product("t-shirt", 40);





var quantity = " товаров:";

// создаем динамическую корзину
let b5 = document.createElement('button');
b5.className = "clearAll"
let p1 = document.createElement('p');
let p2 = document.createElement('p');
let p3 = document.createElement('p');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');

b5.onclick = function () { clear_all(); }
p1.id = "p1";
p2.id = "p2";
p3.id = "p3";

div3.prepend(b5);
div3.append(p1);
div3.append(p2);
div3.append(p3);
one.prepend(div3);
one.prepend(div2);
one.prepend(div1);

b5.innerHTML = "clear all";
p1.innerHTML;
p2.innerHTML;
p3.innerHTML;

// переменные для фунцкии испольлзования функции замыкания
var jacketBuy = add(object_1);
var shirtBuy = add(object_2);
var hoodyBuy = add(object_3);
var TshirtBuy = add(object_4);
document.getElementById('jacket-buy').onclick = jacketBuy;
document.getElementById('shirt-buy').onclick = shirtBuy;
document.getElementById('hoody-buy').onclick = hoodyBuy;
document.getElementById('t-shirt-buy').onclick = TshirtBuy;

var basket = [];

function add(object) {
    return function () {

        // фильтр на повторяющиеся товары, для последующей постановки условий
        function find(productId) {
            var cond = basket.some(function (e) {
                if (e.productId == productId) {
                    e.ammount += 1;
                }
                return e.productId == productId;
            });
            return cond;
        }

        if (find(object.name)) {
        } else {
            basket.push({ productId: object.name, ammount: 1, price: object.price });
        }

        countBasketPrice();
        summBasket();
        basketProduct();
    }
}

function clear_all() {

    basket.splice(0, 100);
    countBasketPrice();
    summBasket();
    basketProduct();
    if (basket.length == 0) {
        document.getElementById("p2").innerHTML = ("Ваша корзина пуста!");
    }
    document.getElementById("p3").innerHTML = ("стоимость" + quantity + countBasketPrice() + "$");

}

function clear_object(object) {
    let index = basket.findIndex(el => el.productId == object.name);
    console.log(index);
    if (index > -1) {
        basket.splice(index, 1);
    }
    basketProduct();

    if (basket.length == 0) {
        document.getElementById("p2").innerHTML = ("Ваша корзина пуста!");
    }
    document.getElementById("p3").innerHTML = ("стоимость" + quantity + countBasketPrice() + "$");

}

function countBasketPrice() {
    var basketSumm = 0; // Общая стоимость товаров в корзине
    for (let i = 0; i < basket.length; i++) {
        basketSumm += basket[i].ammount * basket[i].price
    }
    return basketSumm;
}

function summBasket() {
    var summ = 0; // Количество товаров в корзине
    for (let i = 0; i < basket.length; i++) {
        summ = summ + basket[i].ammount;
    }
    return summ;
}

function basketProduct() {
    var basketName = [];



    console.log("Количество товара в Вашей корзине: " + summBasket());

    document.getElementById("span").innerHTML = (summBasket());

    document.getElementById("p1").innerHTML = ("Количество товара в Вашей корзине: " + summBasket());

    for (let i = 0; i < basket.length; i++) {
        basketName.push(basket[i].productId + ": " + basket[i].price + "$" + " x " + basket[i].ammount + " = " + basket[i].price * basket[i].ammount + "$" + "<br>");
        document.getElementById("p2").innerHTML = (basketName.join(''));

    }

    document.getElementById("p3").innerHTML = ("стоимость" + quantity + countBasketPrice() + "$");
}
