// components/ProductDetails.js
import Header from "./Header";

export default function ProductDetails(products) {
  const product = products[0];
  let currentImageIndex = 0;
  let cartCount = 0;

  function createGallery() {
    const gallery = document.createElement("div");
    gallery.className = "md:w-1/2";

    // Main image container
    const mainImageContainer = document.createElement("div");
    mainImageContainer.className = "relative";

    const mainImage = document.createElement("img");
    mainImage.src = product.previewimages[currentImageIndex];
    mainImage.alt = product.title;
    mainImage.className = "w-full rounded-2xl cursor-pointer";

    // Navigation buttons for mobile
    const prevButton = document.createElement("button");
    prevButton.className =
      "md:hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4";
    prevButton.innerHTML = `
      <img src="src/images/icon-previous.svg" alt="Previous" class="w-3 h-3">
    `;

    const nextButton = document.createElement("button");
    nextButton.className =
      "md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4";
    nextButton.innerHTML = `
      <img src="src/images/icon-next.svg" alt="Next" class="w-3 h-3">
    `;

    prevButton.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + product.previewimages.length) %
        product.previewimages.length;
      mainImage.src = product.previewimages[currentImageIndex];
      updateThumbnails();
    });

    nextButton.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex + 1) % product.previewimages.length;
      mainImage.src = product.previewimages[currentImageIndex];
      updateThumbnails();
    });

    mainImageContainer.appendChild(mainImage);
    mainImageContainer.appendChild(prevButton);
    mainImageContainer.appendChild(nextButton);

    // Thumbnails
    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.className = "hidden md:grid grid-cols-4 gap-4 mt-8";

    function updateThumbnails() {
      thumbnailContainer.innerHTML = "";
      product.previewimages.forEach((img, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.className =
          "relative cursor-pointer rounded-xl overflow-hidden";

        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = img;
        thumbnailImg.alt = `Thumbnail ${index + 1}`;
        thumbnailImg.className = "w-full rounded-xl";

        const overlay = document.createElement("div");
        overlay.className = `absolute inset-0 transition-opacity ${
          currentImageIndex === index
            ? "bg-white bg-opacity-75 border-2 border-orange-500"
            : "hover:bg-white hover:bg-opacity-50"
        }`;

        thumbnail.appendChild(thumbnailImg);
        thumbnail.appendChild(overlay);

        thumbnail.addEventListener("click", () => {
          currentImageIndex = index;
          mainImage.src = product.previewimages[currentImageIndex];
          updateThumbnails();
        });

        thumbnailContainer.appendChild(thumbnail);
      });
    }

    updateThumbnails();
    gallery.appendChild(mainImageContainer);
    gallery.appendChild(thumbnailContainer);

    return gallery;
  }

  function createProductInfo() {
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
    minusButton.className =
      "text-orange-500 font-bold text-2xl hover:opacity-75";
    minusButton.textContent = "-";

    const quantity = document.createElement("span");
    quantity.className = "font-bold";
    quantity.textContent = "1";

    const plusButton = document.createElement("button");
    plusButton.className =
      "text-orange-500 font-bold text-2xl hover:opacity-75";
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
        cartCount += currentQuantity;
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
          cartCountElement.textContent = cartCount;
        }

        // Add item to cart
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

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg transform transition-transform duration-300 translate-y-full";
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateY(0)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateY(100%)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Create main container
  const container = document.createElement("div");
  container.className =
    "flex flex-col md:flex-row md:items-center max-w-7xl mx-auto py-8 gap-8";

  container.appendChild(createGallery());
  container.appendChild(createProductInfo());

  return container;
}
