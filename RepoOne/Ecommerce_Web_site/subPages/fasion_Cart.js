 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 73,
          name: "LPJAM Fashion Men's Taxi Driver Millitary Green Cotton Jacket",
          price: 48769,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/fashion/f1.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 74,
          name: "LILLUSORY 2 Piece Outfits For Women Trendy Sweater Green, Medium",
          price: 18804,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/fashion/f2.jpg",
          slug: "bolanle-upholstered-armchair",
        },
      
        {
          id: 77,
          name: "PRETTYGARDEN Women’s Fashion Solid Color Long Pants ",
          price: 17100,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/fashion/f5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        
        {
          id: 78,
          name: "VEIIASR Womens Fashion Sleeveless Lace Fit ",
          price: 16434,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/fashion/f6.jpg",
          slug: "jaqueze-upholstered-armchair",
        },
        // {
        //   id: 79,
        //   name: "Samsung Original 45W Type-C Travel Adaptor - 50% off",
        //   price: 2699,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e7.jpg",
        //   slug: "leston-wide-upholstered-fabric",
        // },
        // {
        //   id: 80,
        //   name: "pTron Fusion Pro Retro Signature 20W Bluetooth- 40% off ",
        //   price: 1199,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/electronics/e8.jpg",
        //   slug: "stephanny-275-wide-tufted-armchair",
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