const addToCartBtn = document.getElementById("add-btn");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productImg = document.getElementById("product-image")
const prodcutId = addToCartBtn.dataset.productid;
const productURL = `/product/detail/${prodcutId}`


async function addToCart(){
    const userIdData = addToCartBtn.dataset.userid
    const csrf = addToCartBtn.dataset.csrf

    const data ={
        productId :prodcutId,
        productName:productName.textContent,
        productPrice:productPrice.textContent,
        productImg:productImg.src,
        productURL: productURL
    }


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
    alert("Add to Cart Success!")
}

addToCartBtn.addEventListener("click",addToCart)