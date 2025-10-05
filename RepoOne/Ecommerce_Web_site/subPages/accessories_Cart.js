 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 112,
          name: "Shining Diva Fashion Latest Stylish Multilayer Gold",
          price: 562,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 113,
          name: "Fashion Frill Stylish Bracelet for Men Stainless Steel Hand",
          price: 229,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as2.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 114,
          name: "MEENAZ Black Leather Bracelet for Men Boys Magnetic-Clasp Evil Eye Bracelets",
          price: 170,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 115,
          name: "Fashion Frill Silver Chain Pendant For Men Round Pendant Cross Compass",
          price: 179,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 116,
          name: "Fashion Frill Stylish Bracelet for Men Leather Hand Chain Band",
          price: 247,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
            {
          id: 117,
          name: " Shining Diva Fashion Jewelry Blue Stone Stylish Bracelet",
          price: 250,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as6.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 118,
          name: "Boldfit Shoe Bag for Travel Bag for Man & Women Shoe Cover",
          price: 149,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as7.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 119,
          name: "Boldfit Hand Gripper for Men & Women Hand Grip",
          price: 99,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 120,
          name: "Boldfit Wrist Band for Gym Workout Wrist Support for Gym Straps for Men Hand Band Strap ",
          price: 199,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/accessories/as9.jpg",
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