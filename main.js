// Initialize Swiper 
var swiper = new Swiper('.mySwiper', {
    loop:true,
     navigation: {
        nextEl: '#next',
        prevEl: '#prev',
     },
 });

 const carticon =document.querySelector(".cart-icon");
 const caetTab=document.querySelector(".cart-tab");
 const closeBtn=document.querySelector(".close-btn");
 const cartList=document.querySelector(".card-list");
 const cardlist=document.querySelector(".cart-list");
 const cardTotal=document.querySelector(".cart-total");
 const cardValue=document.querySelector(".cart-value");
 const hamburger=document.querySelector(".hamburger");
 const mobileMenu=document.querySelector(".MOBILE-Menu");
 const bars=document.querySelector('.maIcon');


 carticon.addEventListener("click",()=>{
   caetTab.classList.add("cart-tab-active")
 })

  closeBtn.addEventListener("click",()=>{
       caetTab.classList.remove('cart-tab-active');
  })

  hamburger.addEventListener("click",()=>{
     mobileMenu.classList.toggle('MOBILE-Menu-active');
  })

  hamburger.addEventListener('click',()=> {
   bars.classList.toggle("fa-bars");
   bars.classList.toggle("fa-xmark");
  })
 
  let productList=[];
  let cartproduct=[];
  let updateTotales=()=>{

    let totalprice=0;
    let totalQuantity=0;

    document.querySelectorAll('.item').forEach(item =>{
        const qualitys=parseInt(item.querySelector('.quality-value').textContent);
        const price=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));

        //  console.log(qualitys)

        // console.log(price)

        totalprice+=price
        totalQuantity+=qualitys;
    })

    cardTotal.textContent=`$${totalprice.toFixed(2)}`
    cardValue.textContent=totalQuantity
  }

  const showCards=()=>{
      productList.forEach(product =>{
        const orderCard=document.createElement('div')
        orderCard.classList.add('order-card');

        orderCard.innerHTML = ` 
        
        <div class="card-images">
           <img src="${product.image}">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h2>
        <a href="#" class="btn card-btn"> Add to Cart</a>
        `
        cartList.appendChild(orderCard);

        const cardBtn=orderCard.querySelector('.card-btn');
        cardBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            addToCerd(product);
        })


      });
  };

  const addToCerd =(product)=>{

    const existingProduct=cartproduct.find(item => item.id === product.id);
    if(existingProduct){
        alert("item already in your cart!");
        return;
    }

    cartproduct.push(product);

    let quantity=1;
    let price=parseFloat(product.price.replace('$',''))

    const cardItemi=document.createElement('div');
    cardItemi.classList.add('item');
    
    cardItemi.innerHTML=`
      <div class="image-container">
          <img src="${product.image}">
      </div>
      <div class="detail">
          <h4>${product.name} </h4>
           <h4 class="item-total">${product.price}</h4>
      </div>  
      <div class="flex">
          <a href="#" class="quality-btn minus">
              <i class="fa-solid fa-minus"></i>
           </a>
          <h4 class="quality-value">${quantity}</h4>
          <a href="#" class="quality-btn plus">
             <i class="fa-solid fa-plus"></i>
          </a>
      </div>
    `;
    cardlist.appendChild(cardItemi);
    updateTotales();
    const minusBtn=cardItemi.querySelector('.minus')
    const plusBtn=cardItemi.querySelector('.plus')
    const quantityValue=cardItemi.querySelector('.quality-value');
    const itemTotal= cardItemi.querySelector('.item-total');

    plusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity++;
        quantityValue.textContent=quantity;
        itemTotal.textContent=`$${(price *quantity).toFixed(2)}`
        updateTotales();
    })

    minusBtn.addEventListener('click',(e)=>{
        e.preventDefault();

        if(quantity>1){
            quantity--;
            quantityValue.textContent=quantity;
            itemTotal.textContent=`$${(price *quantity).toFixed(2)}`
            updateTotales()
        }else{
            cardItemi.classList.add('slide-out')
            
            setTimeout(()=>{
                cardItemi.remove();
                cartproduct =cartproduct.filter(item=>item.id!==product.id);
                updateTotales()
            },300)

        }


        
    })


  }

  const initAPP = () =>{
    fetch("./producats.json").then
    (response => response.json()).then
    (data => {
         productList=data;
         showCards();
    })
  }

initAPP();
