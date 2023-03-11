"use strict";
exports.__esModule = true;
var leftCart = document.querySelector(".left-cart");
var removePopup = document.querySelector(".remove-popup");
var modalPopup = document.querySelector(".pop-up");
var popupContainer = document.querySelector(".popup-container");
var processBtn = document.querySelector(".processBtn");
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            displayCards(data);
        }
        else {
            console.error("Request failed with status ".concat(request.status));
        }
    }
};
request.open('GET', 'data.json', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send();
window.addEventListener("load", function () {
    var bntPlus = document.querySelectorAll(".btn-plus");
    var bntMinus = document.querySelectorAll(".btn-minus");
    var QuantiteValue = document.querySelectorAll(".quantite-input");
    var btnLike = document.querySelectorAll(".btn-like");
    var btnDelete = document.querySelectorAll(".btn-delete");
    var CardsElements = document.querySelectorAll(".card");
    var Prices = document.querySelectorAll(".initial-price");
    var ChangeblePrices = document.querySelectorAll(".changeble-price");
    var TotalPrice = document.querySelector(".total");
    var TotalTaxed = document.querySelector(".TotalTaxed");
    function CalculTotal() {
        ChangeblePrices = document.querySelectorAll(".changeble-price");
        var Total = 0;
        ChangeblePrices.forEach(function (e) {
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
    bntMinus.forEach(function (btn, i) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (parseInt(QuantiteValue[i].value) != 1) {
                QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) - 1).toString();
            }
            ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText) * parseFloat(QuantiteValue[i].value)).toFixed(2).toString();
            CalculTotal();
            CalcultotalTaxed();
        });
    });
    bntPlus.forEach(function (btn, i) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) + 1).toString();
            ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText) * parseFloat(QuantiteValue[i].value)).toFixed(2).toString();
            CalculTotal();
            CalcultotalTaxed();
        });
    });
    btnLike.forEach(function (e, i) {
        e.addEventListener("click", function (c) {
            c.preventDefault();
            e.classList.toggle("like");
        });
    });
    btnDelete.forEach(function (e, i) {
        e.addEventListener("click", function (c) {
            c.preventDefault();
            CardsElements[i].remove();
            CalculTotal();
            CalcultotalTaxed();
        });
    });
    removePopup.addEventListener("click", function (e) {
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
    processBtn.addEventListener("click", function (e) {
        alert("your Total is ".concat(processCalcul().toFixed(2)));
    });
});
function displayCards(data) {
    var html = "";
    data.forEach(function (e, i) {
        html += "\n        <div class=\"card\">\n            <div class=\"left-card\">\n                <img src=\"".concat(e.image, "\"/>\n            </div>\n            <div class=\"right-card\">\n                <div class=\"right-card-top\">\n                    <div class=\"right-card-top-left\">\n                        <h3>").concat(e.name, "</h3>\n                        <p>\n                            <span class=\"initial-price\">").concat(e.price, "$</span>  \n                            <span style=\"color: #282828;\">|</span> \n                            <span style=\"color: #54B435;\">In Stock</span>\n                        </p>\n                    </div>\n                    <div class=\"right-card-top-right \">\n                        <span class=\"changeble-price\">").concat(e.price, "</span>$\n                    </div>\n                </div>\n                <div class=\"right-card-bottom\">\n                    <div class=\"right-card-bottom-left\">\n                        <select class=\"sizes\" name=\"sizes\">\n                            <option selected disabled>size</option>\n                            ").concat(e.sizes.map(function (size) {
            return "<option value=\"".concat(size, "\">").concat(size, "</option>");
        }), "\n                        </select>\n                        <select class=\"colors\" name=\"colors\">\n                            <option selected disabled>Colors</option>\n                            ").concat(e.colors.map(function (color) {
            return "<option value=\"".concat(color, "\">").concat(color, "</option>");
        }), "\n                        </select>\n                        <div class=\"quantite\">\n                            <button class=\"btn-minus\">-</button>\n                            <input class=\"quantite-input\" type=\"text\" value=\"1\" disabled >\n                            <button class=\"btn-plus\">+</button>\n                        </div>\n                    </div>\n                    <div class=\"right-card-bottom-right\">\n                        <button class=\"btn-like\"><i class=\"fa-solid fa-heart\"></i> Save</button>\n                        <button class=\"btn-delete\"><i class=\"fa-solid fa-trash\"></i> Delete</button>\n                    </div>\n                </div>\n            </div>\n         </div>");
    });
    leftCart.insertAdjacentHTML("beforeend", html);
}
