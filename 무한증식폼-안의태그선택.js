const formss = document.querySelectorAll(".forms")

function function1(event){
    event.preventDefault();

    // 무한증식 폼에서, 그 안에서! 쿼리를 다시!!
    const ps = event.target.querySelector(".ps")

    ps.textContent = "hi"
    console.log(ps)




    // splice연습
    const ms = [1,2,3,4,5,6,7]
    ms.splice(0,1,9)
    console.log(ms)

    const js = [1,2,3,4,5,6,7]
    js.splice(1,0,9)
    console.log(js)

}

for(const form of formss){
    form.addEventListener("submit",function1)
}