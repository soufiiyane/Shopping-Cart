export {};

let bntPlus = document.querySelectorAll(".btn-plus") as NodeListOf<HTMLButtonElement> ;
let bntMinus = document.querySelectorAll(".btn-minus") as  NodeListOf<HTMLButtonElement> ;
let QuantiteValue = document.querySelectorAll(".quantite-input") as NodeListOf<HTMLInputElement> ;
let btnLike  = document.querySelectorAll(".btn-like") as NodeListOf<HTMLButtonElement>
let btnDelete  = document.querySelectorAll(".btn-delete") as NodeListOf<HTMLButtonElement>
let CardsElements  = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>
let Prices = document.querySelectorAll(".initial-price") as NodeListOf<HTMLSpanElement>
let ChangeblePrices = document.querySelectorAll(".changeble-price") as NodeListOf<HTMLSpanElement>
let TotalPrice = document.querySelector(".total") as HTMLSpanElement;
let TotalTaxed = document.querySelector(".TotalTaxed") as HTMLSpanElement
let removePopup = document.querySelector(".remove-popup") as HTMLButtonElement
let modalPopup = document.querySelector(".pop-up") as HTMLDivElement
let popupContainer = document.querySelector(".popup-container") as HTMLDivElement
let processBtn = document.querySelector(".processBtn") as HTMLButtonElement

function CalculTotal():void{
    ChangeblePrices = document.querySelectorAll(".changeble-price") as NodeListOf<HTMLSpanElement>
    var Total:number = 0;  
    ChangeblePrices.forEach((e)=>{
        Total = parseFloat((Total + parseFloat(e.innerText)).toFixed(2));
        TotalPrice.innerText = Total.toString();
    })
}

function CalcultotalTaxed():void{
    var HTprice:number = (parseFloat(TotalPrice.innerText)-14.00);
    TotalTaxed.innerText = HTprice.toFixed(2).toString();
}

function processCalcul():number{

    return (parseFloat(TotalPrice.innerText)-14.00);
}

bntMinus.forEach((btn,i)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(parseInt(QuantiteValue[i].value)!=1){
            QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) - 1).toString();
        }
        ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText)*parseFloat(QuantiteValue[i].value)).toFixed(2).toString();
        CalculTotal();
        CalcultotalTaxed();
    })
})

bntPlus.forEach((btn,i)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        QuantiteValue[i].value = (parseInt(QuantiteValue[i].value) + 1).toString();     
        ChangeblePrices[i].innerText = (parseFloat(Prices[i].innerText)*parseFloat(QuantiteValue[i].value)).toFixed(2).toString();    
        CalculTotal()
        CalcultotalTaxed();
    })
    
})

btnLike.forEach((e,i)=>{
    e.addEventListener("click",(c)=>{
        c.preventDefault();
        e.classList.toggle("like")
    })
})

btnDelete.forEach((e,i)=>{
    e.addEventListener("click",(c)=>{
        c.preventDefault();
        CardsElements[i].remove();
        CalculTotal();
        CalcultotalTaxed();
    })
})

removePopup.addEventListener("click",(e)=>{
    e.preventDefault();
    modalPopup.classList.add("remove")
    popupContainer.classList.add("remove")
    function remove(){
        modalPopup.remove();
        popupContainer.remove();
    }
    setTimeout(remove,1000);
})

CalculTotal();
CalcultotalTaxed();
processBtn.addEventListener("click",(e)=>{
    alert(`your Total is ${processCalcul().toFixed(2)}`)
})