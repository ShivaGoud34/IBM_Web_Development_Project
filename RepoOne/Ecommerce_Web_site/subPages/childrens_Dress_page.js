 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 9,
          name: "Girls Dress Winter Christmas Party Kids Dresses ",
          price: 11324,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        // {
        //   id: 10,
        //   name: "FP-0034 Kids Dress, Girls' Formal Dress",
        //   price: 9898,
        //   image:"/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d2.jpg",
        //   slug: "abingdon-upholstered-chair-swivel",
        // },
        {
          id: 11,
          name: "YUPPIN Girls Princess Dress Costume - Luxury Dress",
          price: 2999,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d3.jpg",
          slug: "jeses-minimore-modern-style-etta",
        },
        // {
        //   id: 12,
        //   name: "Ripening Girls' Sequined Ruffled Fit & Flare Maxi Dress",
        //   price: 1999,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d4.jpg",
        //   slug: "jjeses-minimore-modern-style",
        // },
        {
          id: 13,
          name: "BLECKZ SOMEAK Boys Kids Formal Suspenders Outfit Baby Boy",
          price: 499,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        // {
        //   id: 14,
        //   name: "Bold N Elegant Baby Boys Cotton Printed T-Shirt",
        //   price: 659,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d6.jpg",
        //   slug: "jaqueze-upholstered-armchair",
        // },
        // {
        //   id: 15,
        //   name: "Boys Traditional Bandhgala Jodhpuri ",
        //   price: 450,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d7.jpg",
        //   slug: "leston-wide-upholstered-fabric",
        // },
        {
          id: 16,
          name: "Tendercare Baby Boy's & Baby Girl's Jumbo ",
          price: 247,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/dress/d8.jpg",
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