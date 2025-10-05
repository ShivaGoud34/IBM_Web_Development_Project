 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 57,
          name: "Apple iPhone 15 (512 GB) - 20% off",
          price: 76999,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/iphone/p6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 58,
          name: "HP Victus, 13th Gen Intel Core i5-13420H , 16GB - 17% off ",
          price: 63990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/laptop/l5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 59,
          name: "iPhone 16 128GB Double Boost Power in Battery Life - 20% off",
          price: 66990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/iphone/p8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        {
          id: 60,
          name: "Electrolux 8kg/5kg 5 Star EcoInverter Scandinavian - 33% off",
          price: 45990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 61,
          name: "Sony WH-CH520 Wireless Bluetooth Headphones- 42% off ",
          price: 3489,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 62,
          name: "Portronics Beem 440 Smart LED Projector with 720p - 30% off ",
          price: 4740,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 63,
          name: "Samsung Original 45W Type-C Travel Adaptor - 50% off",
          price: 2699,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 64,
          name: "pTron Fusion Pro Retro Signature 20W Bluetooth- 40% off ",
          price: 1199,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e8.jpg",
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