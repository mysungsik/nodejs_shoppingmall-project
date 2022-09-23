const fileUpload = document.getElementById("product-add-image")
const productImageDiv = document.getElementById("image")



function changeImage(event){

    productImageDiv.children[1].remove()

    for (const image of event.target.files){
        let reader = new FileReader();

        reader.onload = function(event){
            let img = document.createElement("img")
            img.setAttribute("src", event.target.result)
            img.setAttribute("id","product-image")
            productImageDiv.append(img)
        }

        reader.readAsDataURL(image)
    }
    
}

fileUpload.addEventListener("change",changeImage)


/*
섬네일 만들기

요청을 한번 받고나면, 사라지기때문에, 무한요청 (for를 사용해서 event.target.files 를 무한요청)

    FileReader() 객체 지정 후

    리더의 onload  매소드를 이용하여 

    img 를 생성후, setArrribute로 속성을 지정

    붙여넣고, id 나 class 지정해서, CSS 받게하고

    FileReader() 안의 readAsDataURL 매서드를 이용하여, 무한루프완성





*/

