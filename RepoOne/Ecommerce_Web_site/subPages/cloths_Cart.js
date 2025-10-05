 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 102,
          name: "Leriya Fashion Women Crepe Oversized Shirt Korean",
          price: 349,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c1.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 103,
          name: "GoSriKi Women's Rayon Viscose Anarkali Printed Kurta",
          price: 608,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c2.jpg",
          slug: "jjeses-minimore-modern-style",
        },
      
        {
          id: 104,
          name: "Leriya Fashion Men's Rayon Regular Fit Casual Shirt | Stylish",
          price: 444,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c3.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        
     
        {
          id: 105,
          name: " Leriya Fashion Men's Half Sleeve Polyester Lycra Regular Fit Casual Plain T-ShirtC",
          price: 339,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c4.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 106,
          name: "Lymio Men Cargo || Cotton Cargo Pants for Men",
          price: 599,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
            {
          id: 107,
          name: "Jawdrobe Cotton Blend Oversized Fit Half Sleeve ",
          price: 349,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c6.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        // {
        //   id: 108,
        //   name: "KLOSIA Women Viscose Embroidered Kurta And Pant ",
        //   price: 509,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/cloths/c7.jpg",
        //   slug: "jjeses-minimore-modern-style",
        // },
      
        {
          id: 109,
          name: "Girls Dress Winter Christmas Party Kids Dresses ",
          price: 11324,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        
     
        {
          id: 110,
            name: "Tendercare Baby Boy's & Baby Girl's Jumbo ",
          price: 247,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d8.jpg",
          slug: "stephanny-275-wide-tufted-armchair",
        },
        {
          id: 111,
          name: "YUPPIN Girls Princess Dress Costume - Luxury Dress",
          price: 2999,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d3.jpg",
          slug: "jeses-minimore-modern-style-etta",
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