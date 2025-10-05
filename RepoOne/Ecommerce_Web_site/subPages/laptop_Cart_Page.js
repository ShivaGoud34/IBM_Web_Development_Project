 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 17,
          name: "Acer Aspire Lite,16 GB RAM, 512GB SSD, Full HD, ",
          price: 26990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 18,
          name: "HP 15, 13th Gen Intel Core i5-1334U,16GB DDR4,Anti-Glare",
          price: 51990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l2.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 19,
          name: "Dell Vostro, Intel Core i3 13th Gen Windows 11",
          price: 35990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l3.jpg",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 20,
          name: "Lenovo IdeaPad Slim 3, 12th Gen Intel Core i5-12450H",
          price: 44990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 21,
          name: "HP Victus, 13th Gen Intel Core i5-13420H,16GB DDR4(Upgradeable) ",
          price: 63990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 22,
          name: "Dell Inspiron 3530, Intel Core i5 13th Gen - 1334U, 16GB RAM, 1TB SSD",
          price: 54990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 23,
          name: "Acer [SmartChoice Aspire 3 Laptop Intel Core Celeron N4500 Processor Laptop ",
          price: 21490,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 24,
          name: "Apple 2025 MacBook Air (13-inch, Apple M4 chip with 10-core ",
          price: 83990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
      ];




let cart = [];

function searchProducts(){
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(product =>{
    return product.name.toLowerCase().includes(query);
  });

  displayProducts(filtered);
}


function displayProducts(filtered = products){
    let productDiv = document.getElementById("products");
    productDiv.innerHTML ="";
    filtered.forEach((product) =>{
            let productContainer = document.createElement("div");
            productContainer.classList.add("product");
            productContainer.innerHTML = `<img class="img1" src="${product.image}" alt="">
            <p class="p1">${product.name}</p>
            <p class="p2">${product.price}</p>
            <button class="add" onclick= "addToCart(${product.id})"> Add to Cart</button>`;
            productDiv.appendChild (productContainer);
    });
}


function addToCart(id){
    let selectedProduct = products.find((product) => product.id === id );
    let existingItem = cart.find((item) => item.id === id );

    if (existingItem){
      existingItem.quantity++;
    }
    else{
      cart.push({...selectedProduct,quantity :1 });
    }

    updateCart();

}

function updateCart(){
  let cartDiv = document.getElementById("cart-c");
  cartDiv.innerHTML = "";

  let totalAmount = 0;

  if(cart.length === 0){
  cartDiv.innerHTML= "<p> Your cart is Empty";
  document.getElementById("total").textContent="Total :₹0";
  localStorage.removeItem("cart");
  return;
  }

  cart.forEach((item,index)=>{
    let cartItem=document.createElement("div");
    cartItem.classList.add("cart-p");

    totalAmount += item.price * item.quantity;

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name} - ${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" onchange = "quantityUpdate(${index}, this.value)">
      <button onclick="remove(${index})"> Remove </button>`;

      cartDiv.appendChild(cartItem);
  });

  document.getElementById("total").textContent=`Total:${totalAmount}`;

  localStorage.setItem("cart" , JSON.stringify(cart));

}

window.addEventListener("DOMContentLoaded" ,()=>{
  const storedCart= localStorage.getItem("cart");
  
  if(storedCart){
    cart=JSON.parse(storedCart);
    updateCart();
  }

})


function remove(index){
  cart.splice(index, 1);
  updateCart();

}

function quantityUpdate(index , quantity){
  cart[index].quantity=Math.max(1, quantity);
  updateCart();

}
displayProducts();