const addToCartBtn = document.getElementById("add-btn");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const prodcutId = addToCartBtn.dataset.productid;
const productURL = `/product/detail/${prodcutId}`

async function addToCart(){
    const userIdData = addToCartBtn.dataset.userid
    const csrf = addToCartBtn.dataset.csrf

    const data ={
        productId :prodcutId,
        productName:productName.textContent,
        productPrice:productPrice.textContent,
        productURL: productURL
    }
    console.log(data)
    console.log(userIdData)

    const response = await fetch(`/product/detail/${userIdData}?_csrf=${csrf}`,{
        method: "post",
        body : JSON.stringify(data),
        headers : {
            "Content-Type" : "application/json"
        }
    })

    if(!response.ok){
        alert("you have to login First!")
        return
    }
}

addToCartBtn.addEventListener("click",addToCart)