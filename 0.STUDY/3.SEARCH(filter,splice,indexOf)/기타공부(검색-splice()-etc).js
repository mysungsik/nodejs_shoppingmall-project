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

        let data1 = ["a","b","c","d","e","f","aac","ad", "bb", "bc","bbg"]

        function filt(){
            let condition = "a"

            const result = data1.filter(function(item){
                return item.indexOf(condition) !== -1
            })

            console.log(result)
        }

        filter.addEventListener("click", filt)


// filter 연습2. 객체가 들어있는 배열

        let condition1 = "a"
        let condition2 = "b"

        let data2 = [
            {name: "a"},
            {name: "b"},
            {name: "ac"},
            {name: "ae"},
            {name: "bf"}
        ]

        function filt2(){

            const result = data2.filter(function(item){
                return item.name.indexOf(condition1) !==-1 
            })

            console.log(result)
        }

        filter2.addEventListener("click", filt2)

// filter 연습3.  여러 키의 객체가 들어있는 배열 [ 반드시, 배열안에 모든 객체에 대하여, [공통적으로 존재하는 키(여기서는 name)]이 존재해야한다! ]

        let data3 = [
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
            
            const result2 = data3.filter(function(item){
                return item.name.indexOf("c") !== -1
            })

            console.log(result2)
        }


        filter3.addEventListener("click", filt3)


// filter 연습4.  사전조건 [ 공통으로 갖는 '키' 를 가진 객체만 남기기 ]
// : filter 는 "true" 인것만 뽑아내는 조건을 이용하여

        let data4 = [
            {name: "a"},
            {name: "ac", age: "c"},
            {name: "ac", age: "dk", key : "sd"},
            {name: "sd", age: "gf", key : "qw"}
        ];

        // 조건에 맞는것만 남기기 위함 [ 조건을 달수도 있음] ex) typeof(obj) === "string" 이라던가... 
        function removeTarget(obj) {
            return obj
        }

        // 조건에 맞으면(item.key 가 존재하면) true
        function filterByID(item) {
            if (removeTarget(item.key)) {
            return true;
            }
            return false;
        }

        // filter를 통해, data4 를 찾아, true 인 것들만 추려냄
        let changeData = data4.filter(filterByID);

        console.log(changeData)


// filter 연습5. 검색 조건을 유동적으로 적는 filter

        function filterItems(query) {
            return data4.filter(function(item) {
                return item.name.indexOf(query) > -1;
            })
        }

        console.log(filterItems('ac'));