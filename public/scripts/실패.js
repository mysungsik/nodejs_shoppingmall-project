
// const updateBtn = document.getElementById("updateBtn")
// const productName = document.getElementById("product-name")
// const productPrice = document.getElementById("product-price")
// const productDetail = document.getElementById("product-detail")
// const productWarning = document.getElementById("product-warining")
// const productDate = document.getElementById("product-registration-date")


// async function bringInfo(event){
//     event.preventDefault();

//     let productname = updateBtn.dataset.productsName;
    
//     console.log(productname)

//     const item = await fetch(`/admin/products/${productname}`)
//     const itemData = await item.json()

//     productName.value = itemData.name;
//     productPrice.value = itemData.price
//     productDetail.value = itemData.detail
//     productWarning.value = itemData.warning
//     productDate.value = itemData.date
// }

// updateBtn.addEventListener("click",bringInfo)

// // 난관 1. data- dataset을 잘 활용하지 못했었다.
// // 난관 2. form의 기능을 막지 못했었다.
// // 난관 3. get 에서 res.json( 변수 ) 를 몰랐었다.
// // 난관 4. 왜 undefine?
// //      ==>> 오기를 json으로 왔는데 당연히 javascript 코드로 변경해야함 item.json()

// // 난관 5. find에서 ObjectId를 까묵었다.

// // 난관 6. let productid = updateBtn.dataset.productId;

// // 결론 : 돌고돌아, 결국 생성되는 버튼의 id가 [전부 다 같아져버린다는 문제가 발생] = [getElement로 가져오는것이 불가능] = [무한오류]
// //          [쿼리 매소드로 만들수 있는데, 그래봐야 페이지는 새로고침. 내가원하는게 아님.] 실패

const xx = document.getElementById("xx")
xx.fir