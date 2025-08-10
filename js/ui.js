import { onQuantityChange, removeFromCart } from "./cart.js";
import { calculateTotalPrice, calculateTotalQuantity } from "./helpers.js";
// UI elemenlarını bir arada tutan obje
const uiElements = {
  menuBtn: document.querySelector("#menu-btn"),
  nav: document.querySelector("nav"),
  productsList: document.querySelector("#product-list"),
  cartItems: document.querySelector(".cart-items"),
  cartQuantity: document.querySelector("#basket-btn"),
  totalAmount: document.querySelector(".cart-total"),
};

// Api den alınan ürünler için birer html render edecek fonksiyon
const renderProduct = (products, callBackFunction) => {
  // Bu fonksiyon ürünler dzisi içindeki herbir eleman için html oluştur.

  const productsHtml = products
    .map(
      (product) => `  <div class="product">
         
            <img src="${product.image}" class="img-c" alt="${product.title}"/>
          
            <div class="product-info">
                <h2>${product.title}</h2>
              <p>$${product.price.toFixed(2)}</p>
              <button class="add-to-cart" data-id="${
                product.id
              }">Add to cart</button>
            </div>
        </div>`
    )
    .join("");
  // oluşturulan her bir HTML yi arayüzde productsList elemanın içerisine  ekle
  uiElements.productsList.innerHTML = productsHtml;
  // console.log(productsHtml)

  // sepete ekle butonlarına eriş
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  // console.log(addToCartButtons)

  addToCartButtons.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", callBackFunction);
  });
};
// Sepetteki ürünleri renderlayan fonksiyon, bu fonsiyon sepetteki her eleman(ürün) için bir html oluşturması ve bunu arayüze eklemesi
const renderCartItems = (cart) => {


  const cartItemsHtml = cart
    .map(
      (item) => `      <div class="cart-item">
            <img
              src="${item.image}"
              alt="cart-item-image"
            />

            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>
              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id='${item.id}'
              />
            </div>

            <h3 class="cart-item-price">$${item.price}</h3>

            <button class="remove-button" data-id='${item.id}'>Remove</button>
          </div>`
    )
    .join("");
  // Oluşturulan cartHtml i arayüze ekle
  uiElements.cartItems.innerHTML = cartItemsHtml;
  //console.log(cartItemsHtml);
  // remove-button classına sahip elemanlara eriş

  const removeButtons = document.querySelectorAll(".remove-button");

  //console.log(removeButton) // Bu bir nodlist yani bir dizi dizinin elemanlarına addEvevntListener ekleyemeyiz, diziyi döndürmemmiz ve dizinin elemanlarına addEventListener ekleyebiliriz.

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeFromCart(e);
    });
  });

  // cart-item-quantity clasına sahip elemanlara eriş

  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  // quantityInputs içerisindeki her bir input a bir olay izleyicisi ekle

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      //console.log(`inputun değeri değişti`);
      //console.log(e.target);
      onQuantityChange(e);
    });
  });
};
// Sepette ürün bulunmadığında not found render eden fonksiyo
const renderNotFound = () => {
  uiElements.cartItems.innerHTML = `
<div class="cookieCard">
  <h1 class="cookieHeading">No items found in cart</h1>
  <p class="cookieDescription">Go to home page add items to your cart </p>
    <div>
  <a href='../index.html' class="acceptButton">Go To Home Page</a>
  </div>

</div>
`;
};

// Sepetteki ürün sayısına göre header içindeki sepet iconunun değerini dinamik şekilde güncelleyecek fonksiyon:

const renderCartQuantity = (cart) => {
  
  const totalQuantity = calculateTotalQuantity(cart);

// uiElements içindeki cartQuantity elmanına bir attribute ata

uiElements.cartQuantity.setAttribute("data-quantity",totalQuantity);



};

//  Sepettin toplam fiyatını render edecek fonksiyon
const renderCartTotal = (cart) => {


  const totalCartAmount = calculateTotalPrice(cart);

  // calculateTotalPrice fonksiyonu ile hesaplanan toplam sepet ödemesinin dinamik olarak renderlaması

uiElements.totalAmount.innerText = `$ ${totalCartAmount.toFixed(2)}`;


};


export { uiElements, renderProduct, renderCartItems, renderNotFound, renderCartQuantity, renderCartTotal};
