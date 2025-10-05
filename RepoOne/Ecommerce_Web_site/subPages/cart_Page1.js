 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 
 const products = [
        {
          id: 1,
          name: "Hertfoid Upholstered Chair",
          price: 101,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "hertfoid-upholstered-chair",
        },
        {
          id: 2,
          name: "Abingdon Upholstered Chair Swivel",
          price: 151,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 3,
          name: "Jeses Minimore Modern Style Etta",
          price: 181,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 4,
          name: "JJeses Minimore Modern Style",
          price: 201,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 5,
          name: "Bolanle Upholstered Armchair",
          price: 251,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 6,
          name: "Jaqueze Upholstered Armchair",
          price: 111,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 7,
          name: "Leston Wide Upholstered Fabric",
          price: 121,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 8,
          name: 'Stephanny 27.5" Wide Tufted',
          price: 220,
          image: "/RepoOne/Ecommerce_Web_site/Table.jpg",
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
  document.getElementById("total").textContent="Total :$0";
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