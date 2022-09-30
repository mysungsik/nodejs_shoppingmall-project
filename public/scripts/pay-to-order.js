const prices = document.querySelectorAll(".price")
const quantities = document.querySelectorAll(".quantity")
const totalPricies = document.querySelectorAll(".totalPrice")

let sumTotalPrice = document.getElementById("sumTotalPrice")

sumTotalPrice.textContent = 0;

for(i=0; i< prices.length ; i++ ){
    totalPricies[i].textContent = prices[i].textContent*quantities[i].textContent

    sumTotalPrice.textContent = +sumTotalPrice.textContent + +totalPricies[i].textContent
}

