 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 130,
          name: " Leriya Fashion Men's Half Sleeve Polyester T Shirt 55% on SBI Rupay Card",
          price: 339,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 131,
          name: " Garnier Skin Naturals Bright Complete Vitamin C 65% on VISA Card",
          price: 199,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/beauty_Care/b4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
      
        {
          id: 132,
          name: "BLECKZ SOMEAK Boys Kids Formal Suspenders 23% on Kotak Mahendra Card",
          price: 499,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        
     
        {
          id: 133,
          name: "DOAI ART 24X36 POSTER FRAME WHITE 2 PACK Fr 42% on RBL Credit Card",
          price: 40743,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 134,
          name: "Luminary the art gallery Large Landscape Modern  57% on YES Bank Credit Card ",
          price: 4888,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art_Gallery/ag3.jpg",
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