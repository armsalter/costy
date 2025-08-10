// api den ürün verilerini al
const fetchProducts = async () => {
try {
    // Aği isteği at
    const response = await fetch("../db.json");

    const data = await response.json()
  //  console.log(data.products);
    return data.products;
} catch (error) {
    alert("ürünlerin Api den alınması sırasında bir hata oluştu");
    return [];
};
};
export default fetchProducts;