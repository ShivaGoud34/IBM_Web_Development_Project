 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 121,
          name: "Artvibes Designer Elephant Wooden Wall  ",
          price: 168,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 122,
          name: "Webelkart Premium Home Keys Wooden Key Holder",
          price: 169,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d2.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 123,
          name: "Global Grabbers New 25 Centimetre Meditating Sitting Buddha ",
          price: 330,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 124,
          name: "KridayKraft Prince Home Decor & Gifts Metal Krishna",
          price: 269,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        // {
        //   id: 125,
        //   name: "Crosscut Furniture LED Tripod Floor Lamp",
        //   price: 1478,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d5.jpg",
        //   slug: "bolanle-upholstered-armchair",
        // },
            {
          id: 126,
          name: "VRB Dec Tm 6 Pcs Penguin Miniature Decor Items Set For Unique ",
          price: 242,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d6.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 127,
          name: "",
          price: 220,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d7.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        // {
        //   id: 128,
        //   name: "MACODECO Metal Wall Clock for Home Decor - Elegant Home",
        //   price: 620,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d8.jpg",
        //   slug: "stephanny-275-wide-tufted-armchair",
        // },
        
     
        // {
        //   id: 129,
        //   name: "Paradigm Pictures Home Decoration Items Wind Chimes ",
        //   price: 439,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/home_decors/d9.jpg",
        //   slug: "bolanle-upholstered-armchair",
        // },
   
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