// local storage kayıt yapacak fonsiyonu yaz
const saveToLocale = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data)); // localStorage.setItem ile yapılır
};
// local storagedan kayıtlı verileri alacak fonsiyonu yaz

const getFromLocale = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];

  // ? verilen key değerine sahip elemanı local storage da bul JS e çevirerek return et, belirtilen key değerine sahip eleman local storageda yoksa boş bir dizi return et.
};

// Sepetteki toplam ürün miktarını hesaplayan fonksiyon
// Bu fonksiyondan beklentimiz sepetteki toplam ürün miktarını hesaplamasıdır.

const calculateTotalQuantity = (cart) => {
  // ! Bunun için bir metodumuz var REDUCE metodu : Bir dizinin herbir elemanını bir işleme tabi tutup total bir sonuç elde etmek için kullanılır.Sepetteki tüm ürünlerin miktarını toplayıp toplam değer elde eder.Kullanım şekli :
  // ?  diziAdı.reduce(function,initialValue)     şeklinde kullanılır.Buradaki function initialValue üzerine ekleme yaparak toplam bir değer bulacaktır.

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  //console.log(totalQuantity);

  return totalQuantity;
};

//  Sepetteki bütün ürünlerin toplam fiyatını hesaplayacak fonksiyon ve bu 
const calculateTotalPrice = (cart) => {
  const cartItemsAmount = cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

    let totalAmount;// sepet toplamı için bir değişken
 

 

// toplam miktar 500$ altındaysa 100$ kargo ücreti al, değilse kargo ücreti alma
if (cartItemsAmount < 500) {
totalAmount = cartItemsAmount + 100;
} else {
  totalAmount = cartItemsAmount;
}
// console.log(`Ürünlerin toplam tutarı: ${cartItemsAmount}`);
// console.log(totalAmount);

return totalAmount;

};

export {
  saveToLocale,
  getFromLocale,
  calculateTotalQuantity,
  calculateTotalPrice,
};
