let cart = JSON.parse(localStorage.getItem('cart') || '[]')
let currentuser = JSON.parse(localStorage.getItem('currentuser'))
let products = JSON.parse(localStorage.getItem('products'))
let addtocart = document.getElementById('addtocart')
let message = document.getElementById('message')
let totalamount = document.getElementById('totalamount')
let c_items = document.querySelector('.c_items')
let checkoutblock = document.querySelector('.checkout')

let totalamountnum = 0
if (currentuser) {
    if (cart.length > 0) {
        message.style.display = 'none'
        checkoutblock.style.display = 'block'
        rendercart()
        rendercheckout()

    } else {
        checkoutblock.style.display = 'none'
        message.style.display = 'block'
        message.innerHTML = 'Add items in the cart'
    }


    function rendercart() {
        addtocart.innerHTML = ''

        cart.forEach(item => {
            let prod = products.find(product => {
                return item.product_id == product.id
            })

            addtocart.innerHTML += `

<div class="item">
          <img src="${prod.image}" alt="Item" />

          <div class="info">

              <div class="row">
                    <div class="price">${prod.price}</div>
                    
                    <div class="sized">${prod.size}</div>
              </div>


              <div class="colors">
                  Colors:

                  <div class="row">
                      ${prod.colors.map((color) => {
                return `<div class="circle" style="background-color: ${color}"></div>`
            }).join('')}
                  </div>
                
              </div>

              <div class="row">
                  ⭐${prod.rating.rate}, ${prod.rating.count}
              </div>

          </div>

          <div class="actions">

              <div class="quantity-controls">
                  <button onclick="decreasequantity(${prod.id})">-</button>
                  <div class="quantity">${item.quantity}</div>
                  <button onclick="increasequantity(${prod.id})">+</button>
              </div>

              <button onclick="removefromcart(${prod.id})">Remove</button>

          </div>

      </div>
`
        })
    }
}
else {
    window.location.href = '../login.html'
}


function removefromcart(id) {
    cart = cart.filter(item => {
        return item.product_id != id
    })

    localStorage.setItem('cart', JSON.stringify(cart))

    if (cart.length > 0) {
        message.style.display = 'none'
        checkoutblock.style.display = 'block'

        rendercart()
        rendercheckout()

    } else {
        message.style.display = 'block'
        message.innerHTML = 'Add items in the cart'
        addtocart.innerHTML = ''
        checkoutblock.style.display = 'none'
    }
}


function decreasequantity(data) {
    let match = cart.find(prod => {
        return prod.product_id == data
    })

    if (match.quantity > 1) {
        match.quantity--
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    rendercart()
    rendercheckout()
}


function increasequantity(data) {
    let match = cart.find(prod => {
        return prod.product_id == data
    })

    match.quantity++

    localStorage.setItem('cart', JSON.stringify(cart))

    rendercart()
    rendercheckout()
}


function rendercheckout() {
    c_items.innerHTML = ''
    totalamountnum = 0

    cart.forEach(item => {
        let prod = products.find(product => {
            return item.product_id == product.id
        })

        let price = prod.price * item.quantity

        c_items.innerHTML += `
            <div class="checkout-item">
                <div class="item_name">${prod.title} *[ ${item.quantity} ]</div>
                <div class="amount">₹${price}</div>
            </div>
        `

        totalamountnum = (totalamountnum + price)
    })

    totalamount.innerHTML = ` 
      <p>Total Amount:-</p>
      <div>₹${totalamountnum}</div>`
}


document.getElementById('pay').addEventListener('click', (e) => {

    var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq",
        amount: totalamountnum * 100,
        currency: "INR",

        name: "Meshop Checkout",
        description: "Test Transaction",

        handler: function (response) {
            console.log(response)

            localStorage.removeItem('cart')

            cart = []

            checkoutblock.style.display = 'none'
            message.style.display = 'block'
            message.innerHTML = 'Payment successful'
            addtocart.innerHTML = ''
        },

        theme: {
            color: "#000"
        }
    }

    var rzpy1 = new Razorpay(options)

    rzpy1.open()

    e.preventDefault()
})