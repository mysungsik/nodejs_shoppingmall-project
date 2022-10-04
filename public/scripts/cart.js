const gridHeader = document.getElementById("grid-header")

const allPrice = document.querySelectorAll(".price")
const allQuantity = document.querySelectorAll(".quantity")
const allTotalPrice = document.querySelectorAll(".totalPrice")
const allName = document.querySelectorAll(".name")
const allProductId = document.querySelectorAll(".product-id")
const allProductImg = document.querySelectorAll(".img")

const totalPriceSection = document.getElementById("total-price-section")
const TotalPrices = document.getElementById("TotalPrices")
let sumTotalPrice = document.getElementById("sumTotalPrice")

const submit = document.getElementById("submit")


const data =[]
let price = 0;
let pricetext ="";

// [수량 및 가격 값을 바꾸기 위한 FUNCTION] =============================================================================================================

// 초기값
if(allName.length==1){
    allTotalPrice[0].textContent =  allQuantity[0].value * allPrice[0].textContent;
    sumTotalPrice.textContent = allTotalPrice[0].textContent + "원"
}else{
    for(i=0;i<allName.length;i++){
        allTotalPrice[i].textContent =  allQuantity[i].value * allPrice[i].textContent;
        TotalPrices.textContent =  allTotalPrice[i].textContent + "원 + " +TotalPrices.textContent;
        sumTotalPrice.textContent = +allTotalPrice[i].textContent +  +sumTotalPrice.textContent;
    }
    sumTotalPrice.textContent = "="+ sumTotalPrice.textContent
}

if(!allName[0]){
    totalPriceSection.classList.add("disappear")
    submit.classList.add("disappear")
    gridHeader.classList.add("disappear")
}else{
    totalPriceSection.classList.remove("disappear")
    submit.classList.remove("disappear")
    gridHeader.classList.remove("disappear")
}

// 총총값 function
function add(allTotalPrice){
    let price = 0;
    let pricetext ="";
    
    for(const pricestext of allTotalPrice){
        pricetext = pricestext.textContent +  "원 + " +pricetext
    }

    for(const prices of allTotalPrice){
       price = +prices.textContent + +price
    }
    TotalPrices.textContent = pricetext + "="
    sumTotalPrice.textContent = price + "원 "
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



// [제출하기 위한 FUNCTION] =============================================================================================================

async function submitItem(){
    let quantityData = []
    let priceData =[]
    let productIdData = []
    let nameData = []
    let productUrlData = [];
    let productImgUrlData = []
    let totalPrice = sumTotalPrice.textContent
    totalPrice = totalPrice.replace(/\D/g,"")
    
    const userId = submit.dataset.userid;
    const csrf= submit.dataset.csrf;

    for(i=0; i<allQuantity.length;i++){                     // String 에서 char 제거하여 number만 남기고 저장하기
        quantityData.push(allQuantity[i].value)
        quantityData[i].replace(/\D/g,"")

        priceData.push(allPrice[i].textContent)
        priceData[i].replace(/\D/g,"")

        nameData.push(allName[i].textContent)
        productIdData.push(allProductId[i].textContent)
        productUrlData.push(allName[i].href)
        productImgUrlData.push(allProductImg[i].src)
        
    }

    let data = {                                            // 넘길데이터 선정
        productNames : nameData,
        productIds : productIdData,
        productPrices : priceData,
        productQuantities : quantityData,
        productTotalPrice : totalPrice,
        productUrl: productUrlData,
        productImgUrl : productImgUrlData
    }

    // 정수는 1로 나누면 항상 나머지가 0인 것을 이용해, [0 이상의 자연수만 남기고] 이상한 수 방지

    function isIntergar(number){
        return (number%1==0)
    }
    
    for (let quantity of data.productQuantities ){
        let check = isIntergar(quantity)
        if(!check || quantity<0){
            alert("check your quantity")
            return
        }
    }



    // const responseDelete = await fetch(`/cart/${userId}?_csrf=${csrf}`,{
    //     method:"delete",
    // })

    // if(!responseDelete.ok){
    //     alert("order is not succeeded")
    // }

    const response = await fetch(`/cart/${userId}?_csrf=${csrf}`,{  // 값 넘기기
        method:"post",
        body : JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if(response.redirected) {
        window.location.href = `/order/${userId}`
    }

    if(!response.ok){
        alert("xxxx")
    }

}   

submit.addEventListener("click",submitItem)



