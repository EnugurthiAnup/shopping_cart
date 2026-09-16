let currentUser = JSON.parse(localStorage.getItem('currentuser'))
let items = document.querySelector('.items')
let tags = document.querySelectorAll('.filter')
let searchInput = document.getElementById('searchInput')
let colorChecks = document.querySelectorAll('input[name="color"]')
let sizechecks = document.querySelectorAll('input[name="size"]')
let pricerange = document.querySelectorAll('input[name="prange"]')
let range = document.getElementById('range')

if (currentUser) {
  let colors = ['red', 'blue', 'green', 'white', 'black']
  let size = ['s', 'm', 'l', 'xl', 'xxl']

  if (localStorage.getItem('products')) {
    let products = JSON.parse(localStorage.getItem('products'))
    renderproducts(products)
    
    //Search filter

    searchInput.addEventListener('input', () => {
      applyFilters()
    })

    // Category filter
    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        tags.forEach(tag => tag.classList.remove('active'))
        tag.classList.add('active')
        applyFilters()
      })
    })

    // Color filter
    colorChecks.forEach((color) => {
      color.addEventListener('change', () => {
        applyFilters()
      })
    })

    // Size filter
    sizechecks.forEach((size) => {
      size.addEventListener('change', () => {
        applyFilters()
      })
    })

    // Rating filter
    range.addEventListener('input', () => {
      applyFilters()
    })

    // Price filter
    pricerange.forEach(price => {
      price.addEventListener('change', () => {
        applyFilters()
      })
    })

    function applyFilters() {
      let value = searchInput.value.toLowerCase()

      let selectedColors = []

      colorChecks.forEach((check) => {
        if (check.checked) {
          selectedColors.push(check.id)
        }
      })

      let selectedSizes = []

      sizechecks.forEach((check) => {
        if (check.checked) {
          selectedSizes.push(check.id)
        }
      })

      let selectedRating = Number(range.value)

      let selected_Pricerange = []

      pricerange.forEach((price) => {
        if (price.checked) {
          selected_Pricerange.push(price.id)
        }
      })

      let filteredProducts = products.filter((item) => {
        let searchMatch = item.title.toLowerCase().includes(value)

        let categoryMatch = true

        tags.forEach((tag) => {
          if (tag.classList.contains('active')) {
            if (tag.innerText == 'Mens') {
              categoryMatch = item.category == "men's clothing"
            }

            if (tag.innerText == 'Womens') {
              categoryMatch = item.category == "women's clothing"
            }

            if (tag.innerText == 'Jewellery') {
              categoryMatch = item.category == "jewelery"
            }

            if (tag.innerText == 'Electronics') {
              categoryMatch = item.category == 'electronics'
            }

            if (tag.innerText == 'All') {
              categoryMatch = true
            }
          }
        })

        let colorMatch =
          selectedColors.length === 0 ||
          item.colors.some(color => selectedColors.includes(color))

        let sizeMatch =
          selectedSizes.length === 0 ||
          item.size.some(size => selectedSizes.includes(size))

        let ratingMatch =
          item.rating.rate >= selectedRating

        let priceMatch =
          selected_Pricerange.length === 0 ||
          selected_Pricerange.some(price => {
            if (price === "0-25") {
              return item.price >= 0 && item.price <= 25
            }

            if (price === "25-50") {
              return item.price > 25 && item.price <= 50
            }

            if (price === "50-100") {
              return item.price > 50 && item.price <= 100
            }

            if (price === "100on") {
              return item.price > 100
            }
          })

        return searchMatch && categoryMatch && colorMatch && sizeMatch && ratingMatch && priceMatch
      })

      renderproducts(filteredProducts)
    }
  } else {
    fetch('https://fakestoreapi.com/products').then((res) => res.json())
      .then(data => {
        let new_data = data.map(item => {
          item.colors = colors.slice(Math.floor(Math.random() * colors.length))
          item.size = size.slice(Math.floor(Math.random() * size.length))
          return item
        })
        localStorage.setItem('products', JSON.stringify(new_data))
        renderproducts(new_data)
      })
  }
} else {
  window.location.href = '../login.html'
}

function searchItem(data) {
  let value = searchInput.value.toLowerCase()

  let filtered_Prod = data.filter(prod => {
    return prod.title.toLowerCase().includes(value)
  })

  renderproducts(filtered_Prod)
}

function addtocart(id){
  let cart_prod = JSON.parse(localStorage.getItem('cart') || '[]')

  let matched_quantity = cart_prod.filter(prod=>prod.product_id == id)
  
  if(matched_quantity.length > 0){
    matched_quantity[0].quantity++
  }
  else{
    cart_prod.push({
    product_id : Number(id) ,
    quantity : 1
  })}
   localStorage.setItem('cart' , JSON.stringify(cart_prod))
}
function renderproducts(data) {
  items.innerHTML = ''
  data.forEach(prod => {
    items.innerHTML += `
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
                  ${prod.rating.rate}, ${prod.rating.count}
              </div>

          </div>

        <button onclick="addtocart(${prod.id})">Add to Cart</button>
      </div>
  `
  })
}