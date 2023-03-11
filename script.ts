export {};
let leftCart = document.querySelector(".left-cart") as HTMLDivElement
let removePopup = document.querySelector(".remove-popup") as HTMLButtonElement
let modalPopup = document.querySelector(".pop-up") as HTMLDivElement
let popupContainer = document.querySelector(".popup-container") as HTMLDivElement
let processBtn = document.querySelector(".processBtn") as HTMLButtonElement

const request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
        displayCards(data);
    } 
    else {
      console.error(`Request failed with status ${request.status}`);
    }
  }
};

request.open('GET', 'data.json', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send();


window.addEventListener("load",()=>{
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
    });
    
})

function displayCards(data:{image:String,name:String,price:Number,sizes:String[],colors:String[]}[]): void{

    var html = "";
    data.forEach((e,i)=>{
        html += `
        <div class="card">
            <div class="left-card">
                <img src="${e.image}"/>
            </div>
            <div class="right-card">
                <div class="right-card-top">
                    <div class="right-card-top-left">
                        <h3>${e.name}</h3>
                        <p>
                            <span class="initial-price">${e.price}$</span>  
                            <span style="color: #282828;">|</span> 
                            <span style="color: #54B435;">In Stock</span>
                        </p>
                    </div>
                    <div class="right-card-top-right ">
                        <span class="changeble-price">${e.price}</span>$
                    </div>
                </div>
                <div class="right-card-bottom">
                    <div class="right-card-bottom-left">
                        <select class="sizes" name="sizes">
                            <option selected disabled>size</option>
                            ${e.sizes.map((size)=>{
                               return `<option value="${size}">${size}</option>`
                            })}
                        </select>
                        <select class="colors" name="colors">
                            <option selected disabled>Colors</option>
                            ${e.colors.map((color)=>{
                                return `<option value="${color}">${color}</option>`
                            })}
                        </select>
                        <div class="quantite">
                            <button class="btn-minus">-</button>
                            <input class="quantite-input" type="text" value="1" disabled >
                            <button class="btn-plus">+</button>
                        </div>
                    </div>
                    <div class="right-card-bottom-right">
                        <button class="btn-like"><i class="fa-solid fa-heart"></i> Save</button>
                        <button class="btn-delete"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                </div>
            </div>
         </div>`
    });
    leftCart.insertAdjacentHTML("beforeend",html);
}