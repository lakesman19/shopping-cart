if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded'  , ready)
}
else {ready()}
// cart
const cartIcon = document.querySelector('#carticon')
const cart = document.querySelector('.cart')
const closeCart = document.querySelector('#close-cart')
// open cart
cartIcon.addEventListener('click', ( ) => {
    cart.classList.add('active');
    // console.log('yes')
})
// close cart
closeCart.addEventListener('click', ( ) => {
    cart.classList.remove('active');
    // console.log('yes')
})

 // cart working 
function ready(){
    var removeCartItem = document.getElementsByClassName('cart-remove')
    for(let i= 0; i<removeCartItem.length; i++){
        var button =  removeCartItem[i]
        button.addEventListener('click', (event)=>{
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()
        })
    }
 // quantity change 
    var qantityInput =document.getElementsByClassName('cart-qantity')
    for(let i= 0; i<removeCartItem.length; i++){
        var input =qantityInput[i]
        input.addEventListener('change', (event) =>{
            var input =event.target
            if (isNaN(input.value)|| input.value<=0){
                input.value=1
            }
            updateCartTotal()
        })
    }
    // buy button 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', ()=> {
    alert('Your order has been placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateCartTotal()
 })


 // add to cart 
    var addCarts = document.getElementsByClassName(' bx-shopping-bag')
    for(let i= 0; i<addCarts.length; i++){
        var button = addCarts[i]
        button.addEventListener('click', (event)=>{
        var button= event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('product-tile')[0].innerText
        var price = shopItem.getElementsByClassName('price')[0].innerText
        var productimg = shopItem.getElementsByClassName('product-img')[0].src
        console.log(title, price, productimg)
        addItemToCart (title, price, productimg)
        updateCartTotal()
      })
    }


}
// var cartrow =[]

function  addItemToCart (title, price, productimg){
    var cartrow =document.createElement('div')
    cartrow.classList.add('cartbox')
    var cartItem = document.getElementsByClassName('cart-content')[0]
    var cartItemTitle= cartItem.getElementsByClassName('cart-product-title')
    for (let i= 0; i<cartItemTitle.length; i++){
        if (cartItemTitle[i].innerText == title){
            alert('This item has already been add to the cart')
            return
        }
  
    }
    // for (let i=5; i>=cartItem; i++)
    // if(cartItem>= i){
    //     alert('You have added enough item  ')

    // }

    var cartRowsContent=`
            <img src="${productimg}" alt="" class="cart-img">
            <div class="cart-detailsbox">
                <div class="cart-product-title">
                ${title}
                </div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-qantity">
            </div>
            <!-- remove product -->
            <i class='bx bxs-trash-alt cart-remove' ></i>
        `
        cartrow.innerHTML=cartRowsContent
    cartItem.append(cartrow)

    cartrow.getElementsByClassName('cart-remove')[0].addEventListener('click', (event)=>{
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()} )

    cartrow.getElementsByClassName('cart-qantity')[0].addEventListener('change', (event) =>{
        var input =event.target
        if (isNaN(input.value)|| input.value<=0){
            input.value=1
        }
        updateCartTotal()
    })
    // cartrow.getElementsByClassName('cart-qantity')[0]
}


// update cart total 
function updateCartTotal() {
    var cartContentContainer = document.getElementsByClassName('cart-content')[0]
    var cartRows = cartContentContainer.getElementsByClassName('cartbox')
    var total = 0 
    for(let i= 0; i<cartRows.length; i++){
        var cartRow  =cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price') [0]
        var quantityElement = cartRow.getElementsByClassName('cart-qantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var qantity = quantityElement.value
        total = total + (price *qantity)
    }
    total= Math.round(total*100)/100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total

}

