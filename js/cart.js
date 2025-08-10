import {
  saveToLocale,
  getFromLocale,
   } from "./helpers.js";
import { renderCartItems, renderNotFound, renderCartQuantity, renderCartTotal } from "./ui.js";

// sepete eklenen ürünleri al
let cart = getFromLocale("cart");
// console.log(cart)
const addToCart = (e, products) => {
  //alert("cart.js dosyasından selamlr")
  const productId = +e.target.dataset.id; // ui.js deki butondaki data-id ye dataset.id le erişebiliriz
  // + ile de string i number a çevirdik
  const foundedProduct = products.find((product) => product.id === productId);

  // cart.push(foundedProduct);

  // Sepete eklenecek ürün öncesinde ürün sepete eklendimi, eğer ürün eklendiyse yeniden ekleme sadece miktarını bir artır,ama ürün öncesinde sepepet eklenmediyse quantity değeri ekleyerek sepete ekleme işlemi yap

  const exitingProduct = cart.find((item) => item.id === productId);
  // console.log(exitingProduct);
  if (exitingProduct) {
    // Eğer sepete eklenecek ürün önceden sepete eklendiyse(sepette o üründen varsa) miktarını bir artır
    exitingProduct.quantity++;
  } else {
    // Sepetin içinde o üründen yoksa bir ürün objesi oluştur
    const cartItem = {
      id: foundedProduct.id,
      title: foundedProduct.title,
      price: foundedProduct.price,
      image: foundedProduct.image,
      // ...foundedProduct,2.solution
      quantity: 1,
    };
    // sepete eklenecek ürünü kart dizisine ekle
    cart.push(cartItem);
  }

  // console.log(foundedProduct);

  // Sepete eklenecek ürünü localstorage da tut

  saveToLocale("cart", cart);

  // Sepete ekle butonunun içeriğini "Added" olarak güncelle
  e.target.textContent = "Added";
  // 2sn sonra sepete ekle butonu içeriğini "Add to cart" olarak eski durumuna güncelle
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);

  
  // Header içindeki sepet iconunun yanındaki miktar iconunun değerini güncelle
  renderCartQuantity(cart);
};

// Sepetten eleman kaldıracak fonksiyon

const removeFromCart = (e) => {
  // alert("cart.js den selamlar")

  //kullanıcısan silme işlemi için onay al
  const response = confirm("Do you confirm to delete this product?");
  if (response) {
    const productId = +e.target.dataset.id;
    // ID si bilinenen ürünü sepetten kaldır
    cart = cart.filter((item) => item.id !== productId);
    // güncel sepete göre local storage a göre güncelle

    saveToLocale("cart", cart);
    //Sepetteki ürünlerin toplam fiyatını renderla
    renderCartTotal(cart);

    // Güncellenen sepete göre ara yüzü render et
    if (cart.length > 0) {
      renderCartItems(cart);
    } else {
      renderNotFound();
    }
    // console.log(cart)
  }


  // Header içindeki sepet iconunun yanındaki miktar iconunun değerini güncelle
  renderCartQuantity(cart);

};
// Sepetteki ürünün miktarını gücelleyen fonksiyon
const onQuantityChange = (e) => {
  // console.log("inputun değeri değişti");

  // Güncellenecek elemanın id sine eriş
  const productId = parseInt(e.target.dataset.id);

  // güncellenecek elemanın güncel değerine eriş
  const newQuantity = parseInt(e.target.value);
  //console.log(newQuantity);

  if (newQuantity > 0) {
    // olduğunda bu ürünün miktarını güncelle

    const updateItem = cart.find((item) => item.id === productId);
    //console.log(updateItem);

    updateItem.quantity = newQuantity; // updateItem içindeki quantity yi newQuantity yap

    // güncel sepet dizisini local staorage a aktar
    saveToLocale("cart", cart);

    //Sepetteki ürünlerin toplan fiyatını renderle
    renderCartTotal(cart);

  // Header içindeki sepet iconunun yanındaki miktar iconunun değerini güncelle
  renderCartQuantity(cart);

  } else {
    alert("Please enter a value grater than 0");
    // fonksiyonu durdur
    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };

