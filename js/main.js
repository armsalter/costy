import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocale } from "./helpers.js";
import {
  renderCartTotal,
  renderCartQuantity,
  renderCartItems,
  renderNotFound,
  renderProduct,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // menuBtn ye tıklayınca nav kısmını aç-kapa yap
  uiElements.menuBtn.addEventListener("click", () => {
    uiElements.nav.classList.toggle("open");
  });

  // LocaleStorage dan sepete eklenen ürünleri al
  let cart = getFromLocale("cart");

  // Header içindeki sepet iconunun yanındaki miktar iconunun değerini güncelle
  renderCartQuantity(cart);


  if (window.location.pathname.includes("/index.html")) {
    // console.log(window.location.pathname)

    // Api den verileri al

    const products = await fetchProducts();

    // Alınan ürünleri render et

    renderProduct(products, (e) => {
      addToCart(e, products);
    });
    
  } else {
        // console.log(`Sepet Sayfası`);
    // Sepette ürün yoksa not found içeriğini render et, sepette ürün varsa sepetteki ürünleri render et
    //console.log(cart);
    if (cart.length > 0) {
      // console.log("sepette ürün var")
      renderCartItems(cart);


      renderCartTotal(cart);

    } else {
      // console.log("sepette ürün yok")
      renderNotFound();
    }
  }
});
