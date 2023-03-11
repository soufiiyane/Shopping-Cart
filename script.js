"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let bntPlus = document.querySelectorAll(".btn-plus");
let bntMinus = document.querySelectorAll(".btn-minus");
let QuantiteValue = document.querySelectorAll(".quantite-input");
let btnLike = document.querySelectorAll(".btn-like");
let btnDelete = document.querySelectorAll(".btn-delete");
let CardsElements = document.querySelectorAll(".card");
let Prices = document.querySelectorAll(".initial-price");
let ChangeblePrices = document.querySelectorAll(".changeble-price");
let TotalPrice = document.querySelector(".total");
let TotalTaxed = document.querySelector(".TotalTaxed");
let removePopup = document.querySelector(".remove-popup");
let modalPopup = document.querySelector(".pop-up");
let popupContainer = document.querySelector(".popup-container");
let processBtn = document.querySelector(".processBtn");
function CalculTotal() {
    ChangeblePrices = document.querySelectorAll(".changeble-price");
    var Total = 0;
    ChangeblePrices.forEach((e) => {
        Total = parseFloat((Total + parseFloat(e.innerText)).toFixed(2));
        TotalPrice.innerText = Total.toString();
    });
}
function CalcultotalTaxed() {
    var HTprice = (parseFloat(TotalPrice.innerText) - 14.00);
    TotalTaxed.innerText = HTprice.toFixed(2).toString();
}
function processCalcul() {
    return (parseFloat(TotalPrice.innerText) - 14.00);
}
bntMinus.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (parseInt(QuantiteValue[i].value) != 1) {
            QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) - 1).toString();
        }
        ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText) * parseFloat(QuantiteValue[i].value)).toFixed(2).toString();
        CalculTotal();
        CalcultotalTaxed();
    });
});
bntPlus.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) + 1).toString();
        ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText) * parseFloat(QuantiteValue[i].value)).toFixed(2).toString();
        CalculTotal();
        CalcultotalTaxed();
    });
});
btnLike.forEach((e, i) => {
    e.addEventListener("click", (c) => {
        c.preventDefault();
        e.classList.toggle("like");
    });
});
btnDelete.forEach((e, i) => {
    e.addEventListener("click", (c) => {
        c.preventDefault();
        CardsElements[i].remove();
        CalculTotal();
        CalcultotalTaxed();
    });
});
removePopup.addEventListener("click", (e) => {
    e.preventDefault();
    modalPopup.classList.add("remove");
    popupContainer.classList.add("remove");
    function remove() {
        modalPopup.remove();
        popupContainer.remove();
    }
    setTimeout(remove, 1000);
});
CalculTotal();
CalcultotalTaxed();
processBtn.addEventListener("click", (e) => {
    alert(`your Total is ${processCalcul().toFixed(2)}`);
});
