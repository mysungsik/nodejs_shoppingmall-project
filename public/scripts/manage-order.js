const statusTexts = document.querySelectorAll(".change-status-text")

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
    console.log(orderid)
    console.log(updatingStatus)


    const updatingData={
        orderid:orderid,
        updatingStatus:updatingStatus
    }
    console.log(updatingData)

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
}


for(const changeStatusButton of changeStatusButtons){
    changeStatusButton.addEventListener("click",updateDbData)
}