class PayOrder{

    // status : panding(대기중) , payment completed(결제완료), send(발송), arrival(도착) 

    constructor(orderedProduct, userData, status = "pending"){        
        this.orderedProduct = orderedProduct;   // 객체 + 배열의 느낌
        this.userData = userData;               // 객체 + 배열의 느낌
        this.status =status;
        if(this.orderedProduct){
            this.date = new Date.now().toLocaleDateString("ko-kr")  // 이러면 자동생성이 되려나?
        }
    }

    
}

/* 
필요한것

 결제에 필요한 모든것

    orderedProduct  => 카트에서 받아온정보들
                        주문번호 : "..."
                        물품 id들 : "..."
                        물품 이름들 productsName : [... , ... , ...]
                        물품 가격들 productsPrice : [... , ... , ...]
                        물품 갯수들 productsQuantity : [... , ... , ...]
                        물품 총 가격 orderTotalPrice : [... , ... , ...]

                            [컨트롤러에서 역시나 가져오면되겠지  ]

    userData        => 주문자정보들 
                        _id: ObjectId("632a7a5d9c9451cf50d347ac"),
                        email: 'test1@test.com',
                        password: '$2b$12$LhIKgybdYusBoAhEzeK5nuSMSwUjJWq8vcZeOmBTH9lW6.SsfRO1K',
                        name: 'CMS',
                        address: { street: 'pangyo', postal: '12345', country: '123123' }

                            [   컨트롤러에서  findOne({id:...} {password : 0})   ] 하면 password만 제외한 체로

                        
    status          => 상태코드
    date            => 자동?
*/ 

