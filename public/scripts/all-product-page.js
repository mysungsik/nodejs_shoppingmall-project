const pageNation = document.getElementById("page-nation-list")


// LI 만들기
function makeList(listNumber){
    const fisrt = document.createElement("li")
    fisrt.setAttribute("class","pagenumber")
    fisrt.textContent = "<"
    pageNation.append(fisrt)

    for(i=1; i <= listNumber; i++){
        let list = document.createElement("a")
        list.setAttribute("class","pagenumber")
        list.setAttribute("href",`/?pagenumber=${i}`)
        list.textContent = i
        pageNation.append(list)
    }

    const last = document.createElement("li")
    last.setAttribute("class","pagenumber")
    last.textContent = ">"
    pageNation.append(last)
}

// 1. 서버에서, all product를 가져오고, li 만들기
async function getAllProducts(){

    const allProducts = await fetch("/get-all-products")
    const allProductsData = await allProducts.json()
    
    const allProductsDataLength = allProductsData.length

    const totalListNumber = Math.ceil(allProductsDataLength/8)
    makeList(totalListNumber)
}

getAllProducts()