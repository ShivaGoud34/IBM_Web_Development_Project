 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 130,
          name: "Artvibes Designer Elephant Wooden Wall  ",
          price: 168,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 131,
          name: "Sindhu Pay Gift Card - applicable through GPay",
          price: 2000,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/gift_Card/g3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
      
        {
          id: 132,
          name: "iPhone 16 128 GB Boost in Battery Life. Works with AirPods; Pink",
          price: 66990,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/iphone/p8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 133,
          name: "Prestige Marvel Glass Top 4 Burner Gas Stove Tempered Glass",
          price: 8350,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k2.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 134,
          name: "Samsung 8 Kg 5 Star Eco Bubble Technology, AI Control & Wi-Fi,",
          price: 46490,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/washing_mechine/wm3.jpg",
          slug: "jeses-minimore-modern-style-etta"
        },
            {
          id: 135,
          name: "Philipp Plein $KELETON Men's Automatic Analogue Watch",
          price: 72500,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 136,
          name: "",
          price: 220,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d7.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 137,
          name: "Global Grabbers New 25 Centimetre Meditating Sitting Buddha ",
          price: 330,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 138,
          name: "BLECKZ SOMEAK Boys Kids Formal Suspenders Outfit Baby Boy",
          price: 499,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d5.jpg",
          slug: "bolanle-upholstered-armchair",
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