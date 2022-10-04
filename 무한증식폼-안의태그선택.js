const formss = document.querySelectorAll(".forms")
const filter = document.getElementById("filter")
const filter2 = document.getElementById("filter2")
const filter3 = document.getElementById("filter3")

function function1(event){
    event.preventDefault();

    // 무한증식 폼에서, 그 안에서! 쿼리를 다시!!
    const ps = event.target.querySelector(".ps")

    ps.textContent = "hi"
    console.log(ps)

}

for(const form of formss){
    form.addEventListener("submit",function1)
}


// splice연습
const ms = [1,2,3,4,5,6,7]
ms.splice(0,1,9)
 console.log(ms)

const js = [1,2,3,4,5,6,7]
js.splice(1,0,9)
console.log(js)


// filter 연습1. 단순배열

// filter = [조건에 맞는것만] "남기겠다"
// indexof = [모든 배열을 검색해서] [조건에 맞으면] 1 , [안맞으면] -1

let msms = ["a","b","c","d","e","f","aac","ad", "bb", "bc","bbg"]

function filt(){
    let condition = "a"

    const result = msms.filter(function(msms){
        return msms.indexOf(condition) !== -1
    })

    console.log(result)
}

filter.addEventListener("click", filt)


// filter 연습2. 객체가 들어있는 배열

let condition1 = "a"
let condition2 = "b"

let msms2 = [
    {name: "a"},
    {name: "b"},
    {name: "ac"},
    {name: "ae"},
    {name: "bf"}
   ]

function filt2(){

    const result = msms2.filter(function(item){
        return item.name.indexOf("a") !==-1 
    })

    console.log(result)
}

// filter 연습3.  여러 키의 객체가 들어있는 배열 [ 반드시, 배열안에 모든 객체에 대하여, [공통적으로 존재하는 키(여기서는 name)]이 존재해야한다! ]

filter2.addEventListener("click", filt2)

let msms3 = [
    {name: "a"},
    {name: "b"},
    {name: "ac"},
    {name: "ae"},
    {name: "bf"},
    {name: "ac", age: "c"},
    {name: "ac", age: "d"},
    {name: "ac", age: "cf"},
    {name: "ac", age: "ch"},
    {name: "ac", age: "dk"}
   ]

function filt3(){
    
    const result2 = msms3.filter(function(item){
        return item.name.indexOf("c") !== -1
    })

    console.log(result2)
}


filter3.addEventListener("click", filt3)


// filter 연습4.  조건문을 직접 쓰는 filter

let fruits = [" xx" , "yy"]

function filterItems(query) {
    return fruits.filter(function(item) {
        return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }
  
  console.log(filterItems('ap')); // ['apple', 'grapes']
  console.log(filterItems('an')); // ['banana', 'mango', 'orange']