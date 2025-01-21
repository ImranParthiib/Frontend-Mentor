import { showToast } from './toast';

export function createProductInfo(product) {
  const productInfo = document.createElement("div");
  productInfo.className = "md:w-1/2 px-6 md:px-20 py-6";

  const moto = document.createElement("p");
  moto.className = "text-orange-500 font-bold tracking-wider text-sm mb-4";
  moto.textContent = product.moto;

  const title = document.createElement("h1");
  title.className = "text-3xl md:text-5xl font-bold mb-8";
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = "text-gray-500 mb-8";
  description.textContent = product.description;

  const priceContainer = document.createElement("div");
  priceContainer.className = "flex flex-col gap-2 mb-8";

  const priceRow = document.createElement("div");
  priceRow.className = "flex items-center gap-4";

  const price = document.createElement("span");
  price.className = "text-3xl font-bold";
  price.textContent = `$${product.price.toFixed(2)}`;

  const discount = document.createElement("span");
  discount.className =
    "bg-orange-100 text-orange-500 font-bold px-2 py-1 rounded";
  discount.textContent = "50%";

  const originalPrice = document.createElement("span");
  originalPrice.className = "text-gray-400 line-through";
  originalPrice.textContent = `$${(product.price * 2).toFixed(2)}`;

  priceRow.appendChild(price);
  priceRow.appendChild(discount);
  priceContainer.appendChild(priceRow);
  priceContainer.appendChild(originalPrice);

  // Add to cart section
  const addToCartContainer = document.createElement("div");
  addToCartContainer.className = "flex flex-col md:flex-row gap-4";

  const quantityContainer = document.createElement("div");
  quantityContainer.className =
    "flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 md:w-1/3";

  const minusButton = document.createElement("button");
  minusButton.className = "text-orange-500 font-bold text-2xl hover:opacity-75";
  minusButton.textContent = "-";

  const quantity = document.createElement("span");
  quantity.className = "font-bold";
  quantity.textContent = "0";

  const plusButton = document.createElement("button");
  plusButton.className = "text-orange-500 font-bold text-2xl hover:opacity-75";
  plusButton.textContent = "+";

  const addToCartButton = document.createElement("button");
  addToCartButton.className =
    "bg-orange-500 text-white rounded-lg px-8 py-3 flex items-center justify-center gap-4 hover:bg-orange-600 md:flex-1";
  addToCartButton.innerHTML = `
    <img src="src/images/icon-cart.svg" alt="Cart" class="w-5 h-5 filter brightness-0 invert">
    <span class="font-bold">Add to cart</span>
  `;

  // Event listeners
  let currentQuantity = 0;

  minusButton.addEventListener("click", () => {
    if (currentQuantity > 0) {
      currentQuantity--;
      quantity.textContent = currentQuantity;
      updatePrice();
    }
  });

  plusButton.addEventListener("click", () => {
    currentQuantity++;
    quantity.textContent = currentQuantity;
    updatePrice();
  });

  addToCartButton.addEventListener("click", () => {
    if (currentQuantity > 0) {
      const header = document.querySelector("header");
      if (header && header.addToCart) {
        header.addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: currentQuantity,
          image: product.image,
        });
      }

      currentQuantity = 0;
      quantity.textContent = "0";
      updatePrice();

      // Show toast notification
      showToast("Items added to cart");
    }
  });

  function updatePrice() {
    const totalPrice = product.price * currentQuantity;
    price.textContent = `$${totalPrice.toFixed(2)}`;
    originalPrice.textContent = `$${(totalPrice * 2).toFixed(2)}`;
  }

  quantityContainer.appendChild(minusButton);
  quantityContainer.appendChild(quantity);
  quantityContainer.appendChild(plusButton);

  addToCartContainer.appendChild(quantityContainer);
  addToCartContainer.appendChild(addToCartButton);

  productInfo.appendChild(moto);
  productInfo.appendChild(title);
  productInfo.appendChild(description);
  productInfo.appendChild(priceContainer);
  productInfo.appendChild(addToCartContainer);

  return productInfo;
}
