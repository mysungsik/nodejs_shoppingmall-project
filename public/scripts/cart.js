const allPrice = document.querySelectorAll(".price")
const allQuantity = document.querySelectorAll(".quantity")
const allTotalPrice = document.querySelectorAll(".totalPrice")
const allName = document.querySelectorAll(".name")

const TotalPrices = document.getElementById("TotalPrices")
let sumTotalPrice = document.getElementById("sumTotalPrice")

const submit = document.getElementById("submit")


const data =[]
let price = 0;
let pricetext ="";


console.log(allQuantity[0].value* allPrice[0].textContent)

// 초기값


for(i=0;i<3;i++){
    allTotalPrice[i].textContent =  allQuantity[i].value * allPrice[i].textContent;
    TotalPrices.textContent =  allTotalPrice[i].textContent + "원" +TotalPrices.textContent;
    sumTotalPrice.textContent = +allTotalPrice[i].textContent +  +sumTotalPrice.textContent;
}
TotalPrices.textContent = TotalPrices.textContent  + "="
sumTotalPrice.textContent  = sumTotalPrice.textContent  + "원"



// 총총값 function
function add(allTotalPrice){
    let price = 0;
    let pricetext ="";
    
    for(const pricestext of allTotalPrice){
        pricetext = pricestext.textContent +  "원" +pricetext
    }

    for(const prices of allTotalPrice){
       price = +prices.textContent + +price
    }
    TotalPrices.textContent = pricetext + "="
    sumTotalPrice.textContent = price + "원"
}

// 각각 총값 function
function change(){
    for(i=0; i<allTotalPrice.length; i++){
        data[i] = allPrice[i].textContent*allQuantity[i].value;
        allTotalPrice[i].textContent = data[i]
    }
    add(allTotalPrice)
}

// 리스너는 quantity에
for(const quantity of allQuantity){
    quantity.addEventListener("change",change)
}


// ajax로 넘기기 하고싶다. , 물론 넘기면, 다른거 render 하던가하자
async function submitItem(){
    let quantityData = []
    let priceData =[]
    let nameData = []
    let totalPrice = sumTotalPrice.textContent
    totalPrice = totalPrice.replace(/\D/g,"")
    
    const userId = submit.dataset.userid;
    const csrf= submit.dataset.csrf;

    // String 에서 char 제거하여 number만 남기고 저장하기
    for(i=0; i<allQuantity.length;i++){
        quantityData.push(allQuantity[i].value)
        quantityData[i].replace(/\D/g,"")
        priceData.push(allPrice[i].textContent)
        priceData[i].replace(/\D/g,"")
        nameData.push(allName[i].textContent)
    }

    // 넘길데이터 선정
    let data = {
        productNames : nameData,
        productPrices : priceData,
        productQuantities : quantityData,
        productTotalPrice : totalPrice
    }
    
    // 값 넘기기
    const response = await fetch(`/cart/${userId}?_csrf=${csrf}`,{
        method:"post",
        body : JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if(!response.ok){
        alert("xxxx")
    }

}   

submit.addEventListener("click",submitItem)



