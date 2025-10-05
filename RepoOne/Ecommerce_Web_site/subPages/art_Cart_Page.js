 function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}


 
 const products = [
        {
          id: 25,
          name: "EXO DECOR Paper Van Gogh Wall Poster Set of 12 (29 X 21 cm) ",
          price: 229,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a1.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 26,
          name: "CVANU Beautiful Aesthetic Girls & Sun View Picture Art Collage Kit",
          price: 193,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a2.jpg",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 27,
          name: "Art Street Motivational Quotes Life Theme Set of 9 Framed Art Prints.",
          price: 699,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a3.jpg",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 28,
          name: "DOAI ART 24X36 POSTER FRAME WHITE 2 PACK",
          price: 40743,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a4.jpg",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 29,
          name: "HISTORIX Vintage 1853 England - History Map of London Wall Art ",
          price: 18356,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a5.jpg",
          slug: "bolanle-upholstered-armchair",
        },
        // {
        //   id: 30,
        //   name: "UPWOIGH Framed Wall Art, William Morris Wood Canvas Wall Art,16x12in Cotton ",
        //   price: 17559,
        //   image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a6.jpg",
        //   slug: "jaqueze-upholstered-armchair",
        // },
        {
          id: 31,
          name: "HISTORIX Vintage 1871 Washington DC Map Art - 24x36 Inch ",
          price: 18356,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a7.jpg",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 32,
          name: "Kalormore Pink Glam Fashion Canvas Poster Elegant Cow with Pearl Crown",
          price: 17572,
          image: "/RepoOne/Ecommerce_Web_site/subPages/cart_Gallery/art/a8.jpg",
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