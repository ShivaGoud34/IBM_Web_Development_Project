 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 90,
          name: "HISTORIX Vintage 1871 Washington DC Map Art - 24x36 Inch ",
          price: 18356,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 91,
          name: "DOAI ART 24X36 POSTER FRAME WHITE 2 PACK",
          price: 40743,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 92,
          name: "Kalormore Pink Glam Fashion Canvas Poster Elegant Cow with Pearl Crown",
          price: 17572,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
        {
          id: 93,
          name: "The Castle Decor Golden Deer Wall Painting Drawing Room, Hotel",
          price: 1979,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 94,
          name: "Art Set Of 16 Individual Black And White Photo Frame",
          price: 279,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag2.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 95,
          name: "Luminary the art gallery Large Landscape Modern Art Decoration ",
          price: 4888,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag3.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 96,
          name: "JH Gallery Recycled Material Rajasthani Home Decor Items Musician Bawla",
          price: 247,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 97,
          name: "DreamKraft Paper Mache Handcrafted Set of 3 Elephant",
          price: 144,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag5.jpg",
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