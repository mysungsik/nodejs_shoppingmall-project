const pageNation = document.getElementById("page-nation-list")


// [페이지 네이션 만들기]================================================================================

// 1. LI 만들기
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

// 2. 서버에서, all product를 가져오고
async function getAllProducts(){

    const allProducts = await fetch("/get-all-products")
    const allProductsData = await allProducts.json()

    return allProductsData
}

// 3. [서버에서 가져온 데이터 수]로 [li만들고], 
async function proccess(){

    const data = await getAllProducts()
        
    const allProductsDataLength = data.length

    const totalListNumber = Math.ceil(allProductsDataLength/8)
    makeList(totalListNumber)
}

proccess()



// [검색기능만들기]================================================================================

// 전부받아서, filter 처리로, 남길것만 남겨서, 서버로 보내서, 세션처리해서, 렌더다시하기

const searchProducts = document.getElementById("search-products")
const searchProductsButton = document.getElementById("search-products-button")

// 걸러내기
async function filtering(){
    const searchKeyWord = searchProducts.value;
    const data = await getAllProducts()

    return data.filter(function(item){
        return item.name.indexOf(searchKeyWord) >-1
    })
}

async function search(){
    const searchKeyWord = searchProducts.value;
    const csrf = searchProductsButton.dataset.csrf
    const data = await filtering()
    
    // 포스트로 보내서
    const response = await fetch(`/searchProducts/?${searchKeyWord}`,{
        method: "post",
        body : JSON.stringify(
            {
            data:data,
            searchKeyWord:searchKeyWord,
            _csrf:csrf
        }),
        
        headers : {
            "Content-Type" : "application/json"
        }
    })

    if(response.ok){
        window.location.href = `/searchProducts/?${searchKeyWord}`
    }
}
searchProductsButton.addEventListener("click",search)

// 포스트로 보내서, 세션에 저장해서, 렌더하기 URL : /search page에, 하지만 render하는 view는 똑같지

