const deleteBtns = document.querySelectorAll("#product-section .delete")

async function deleteProduct(event){

    const productId = event.target.dataset.productid
    const csrf= event.target.dataset.csrf

    const response = await fetch(`/admin/products/Update/${productId}?_csrf=${csrf}`,{       // db지우기 (이거해도, db에서 없어지니 [새로고침]하면 사라지긴 하는데... 그걸 원하는게 아니다)
        method: "delete"
    })
    
    event.target.parentElement.parentElement.remove();                                       // 찾아올라가 태그 자체를 지워버림

    if(!response.ok){
        alert("delete is failed")
        return
    }
}

for(const deleteBtn of deleteBtns){
    deleteBtn.addEventListener("click",deleteProduct)
}