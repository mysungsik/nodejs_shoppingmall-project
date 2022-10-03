const statusTexts = document.querySelectorAll(".change-status-text")
const openStatusButtons = document.querySelectorAll(".open-status-button")

// 변경버튼 오픈
function open(event){
    const basic = event.target.parentElement.nextElementSibling.classList

    if(basic.item(1) == "disappear"){
        basic.remove("disappear")
    }else if(basic.item(1) != "disappear"){
        basic.add("disappear")
    }
}


for(const openStatus of openStatusButtons){
    openStatus.addEventListener("click",open)
}

// 변경
function changePending(event){
    event.target.parentElement.parentElement.children[0].value = "Pending"
}
function changeShipping(event){
    event.target.parentElement.parentElement.children[0].value = "Shipping"
}
function changeArrival(event){
    event.target.parentElement.parentElement.children[0].value = "Arrival"
}

for(const statusText of statusTexts){
    statusText.parentElement.children[2].children[0].addEventListener("click",changePending)
    statusText.parentElement.children[2].children[1].addEventListener("click",changeShipping)
    statusText.parentElement.children[2].children[2].addEventListener("click",changeArrival)
}


// OK 누르면, DB의 [맞는 orderid]를 찾아서,  그 input의 vlaue로 UPDATE,  또한 MANAGE ALL ORDER 페이지의 상태도  변경
// 그리고 팝업 닫기

const changeStatusButtons = document.querySelectorAll(".change-status-button")

async function updateDbData(event){
    const csrf = event.target.dataset.csrf
    const orderid = event.target.dataset.orderedid
    const updatingStatus = event.target.parentElement.children[0].value;

    const updatingData={
        orderid:orderid,
        updatingStatus:updatingStatus
    }

    const response = await fetch(`/admin/order/${orderid}?_csrf=${csrf}`,{
        method:"post",
        body : JSON.stringify(updatingData),
        headers :{
            "Content-Type" : "application/json"
        }
    })

    if(!response.ok){
        alert("xxxx")
    }

    // 변경시키고 닫기
    let inputText = event.target.previousElementSibling
    let status = event.target.parentElement.parentElement.previousElementSibling.children[0]
    status.textContent = inputText.value

    let changStatusDiv = event.target.parentElement.parentElement
    changStatusDiv.classList.add("disappear")

}


for(const changeStatusButton of changeStatusButtons){
    changeStatusButton.addEventListener("click",updateDbData)
}