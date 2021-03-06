const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  // console.log(allProducts);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p><span>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      </span> ${product.rating.rate} Ratings | ${product.rating.count} people rated</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="getDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPriceText = document.getElementById(id).innerText;
  const convertedOldPrice = parseFloat(convertedOldPriceText);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const priceText = document.getElementById("price").innerText;
  const price = parseFloat(priceText);
  const deliveryCharge = getInputValue("delivery-charge");
  const totalTax = getInputValue("total-tax");
  const grandTotalFloat = price + deliveryCharge + totalTax;
  const grandTotal = grandTotalFloat.toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};

// get details  function

const getDetails=(id)=>{
  const url=`https://fakestoreapi.com/products/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>displaDetails(data))
}

// display details function 

const displaDetails=(data)=>{
  // console.log(data)
  const productDetails=document.getElementById('product-details');
  const div=document.getElementById('details');
  div.innerHTML=`
  <img class="details-image" src=${data.image}></img>
 <div class="product-info">
 <h3>${data.title}</h3>
 <p>Category: ${data.category}</p>
 
 <p><span>
 <i class="fas fa-star"></i>
 <i class="fas fa-star"></i>
 <i class="fas fa-star"></i>
 <i class="fas fa-star"></i>
 <i class="fas fa-star"></i>
 </span> ${data.rating.rate} Ratings | ${data.rating.count} people rated</p>
 <h2>Price: $ ${data.price}</h2>
 <p class="product-desc">${data.description}</p>
 </div>
  `
  productDetails.style.display='block'
}


