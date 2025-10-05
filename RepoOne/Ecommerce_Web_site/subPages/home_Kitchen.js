 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 81,
          name: "Atomberg Zenova Mixer Grinder  Safety Features",
          price: 6799,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k1.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 82,
          name: "Prestige Marvel Glass Top 4 Burner Gas Stove Tempered Glass",
          price: 8350,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k2.jpg",
          slug: "bolanle-upholstered-armchair",
        },
      
        {
          id: 83,
          name: "LG 655 L Frost Free Smart Inverter Double Door Refrigerator  ",
          price: 74900,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k3.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        
        {
          id: 84,
          name: "Pigeon Kessel Multipurpose Kettle",
          price: 799,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k4.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 85,
          name: "Oslen Metal (Pack of 2 Organizer for Bathroom",
          price: 279,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k5.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 86,
          name: "Styleys Non Woven Wardrobe Organizer For Clothes ",
          price: 445,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k6.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        {
          id: 87,
          name: "Zollyss 2Pc Capsule Shape Travel",
          price: 2699,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 88,
          name: "Hisre All in one Waterfall Kitchen Sink",
          price: 6599,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/Home_Kitchen/k8.jpg",
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