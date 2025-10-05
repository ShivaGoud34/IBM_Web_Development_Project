 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 41,
          name: "LG 15 Kg (Wash)/8 Kg (Dry) Ai Direct Drive With Wi-Fi Fully Automatic",
          price: 75990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        // {
        //   id: 42,
        //   name: "Bosch WAJ2426GIN Front Loading Washing Machine, 8 kg 1200 rpm",
        //   price: 40990,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm2.jpg",
        //   slug: "abingdon-upholstered-chair-swivel",
        // },
        {
          id: 43,
          name: "Samsung 8 Kg 5 Star Eco Bubble Technology, AI Control & Wi-Fi,",
          price: 46490,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm3.jpg",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 44,
          name: "Electrolux 8kg/5kg 5 Star EcoInverter Scandinavian Design with 40°C",
          price: 45990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        // {
        //   id: 45,
        //   name: "LG 8 Kg Inverter Fully-Automatic Front Loading Washing Machine ",
        //   price: 44990,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm5.jpg",
        //   slug: "bolanle-upholstered-armchair",
        // },
        {
          id: 46,
          name: "IFB 8 Kg 5 Star, DeepClean®, AI Powered, WiFi, Fully Automatic Machine",
          price: 43800,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 47,
          name: "Panasonic 8 kg 5 Star Fully Automatic Front Loading Washing Machine",
          price: 39500,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 48,
          name: "Siemens 8kg 5 Star Stain Treatment Fully Automatic Machine",
          price: 40990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm8.jpg",
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