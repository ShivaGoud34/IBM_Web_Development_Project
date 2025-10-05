 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 1,
          name: "Luxurious Tourbillon Limited Edition Luxury Watch,Engine-Inspired Design",
          price: 395000,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 2,
          name: "MASTER OF BLING Mens Stainless Steel  Luxury Analog Watch, Silver",
          price: 179950,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w2.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        // {
        //   id: 3,
        //   name: "Luxury Casino Diamond Watch, Swiss Made Automatic",
        //   price: 140000,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w3.jpg",
        //   slug: "jeses-minimore-modern-style-etta",
        // },
        // {
        //   id: 4,
        //   name: "JINDIAN E-COMMERCE Luxury Automatic Sher-E-Punjab Skeleton ",
        //   price: 119999,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w4.jpg",
        //   slug: "jjeses-minimore-modern-style",
        // },
        {
          id: 5,
          name: "TIKORRA Luxury Green Gem Watch Enhanced Clarity",
          price: 97999,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 6,
          name: "Philipp Plein $KELETON Men's Automatic Analogue Watch",
          price: 72500,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 7,
          name: "TSAR BOMBA Luxury Automatic Watches for Men",
          price: 70200,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 8,
          name: "Luxury Men's Chronograph Watch, Black Rubber Strap",
          price: 59000,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/watchs/w8.jpg",
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