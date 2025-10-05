 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 135,
          name: "Storio 2 in 1 Ring Toss Game for Kids Indoor Outdoor Fun Learning Activity Toy ",
          price: 139,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 136,
          name: "GRAPHENE 4WD Friction Powered Monster Truck Toy Push & Go Off-Road Car for Kids",
          price: 59,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t2.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 137,
          name: "Galaxy Hi-Tech Mini Metal Die Cast Car Toy Vehicle Play Set",
          price: 333,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 138,
          name: "TOYTASTIC Learning Boy Girls Toys Age 4-5,Magnetic Blocks Magnet Toy for Toddlers 1-3",
          price: 298,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 139,
          name: "Cable World Plastic 3 in 1 Portable Pretend Food Party Role Cooking Kitchen Play",
          price: 438,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
            {
          id: 140,
          name: "SUPER TOY 3 PEC Jumping Bird Animals Key Operated Wind Up Toys for Toddler Kid ",
          price: 252,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t6.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 141,
          name: "Novo Baby Smart Activity Fun&Learning Blocks Geometrics, Educational & Learning Sorter Toys",
          price: 121,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t7.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 142,
          name: "Chocozone Wooden Learning Educational Game Board for Kids, Puzzle Toys for 2",
          price: 249,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 143,
          name: "Kidology Car Race Tracks Toy  Girls & Kids",
          price: 1199,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/toys/t9.jpg",
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