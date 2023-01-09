async function getProducts() {
    const response = await fetch("/products.json");
    const data = await response.json();
    console.log(data);
}

getProducts();