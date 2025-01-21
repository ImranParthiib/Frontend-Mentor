export default function Header() {
  let cartItems = [];
  const header = document.createElement("header");
  header.className = "flex flex-col justify-between items-center p-4 mt-4";

  const cartModal = document.createElement("div");
  cartModal.className =
    "hidden fixed top-20 right-4 md:right-8 w-96 bg-white rounded-lg shadow-xl z-50";

  function updateCartModal() {
    cartModal.innerHTML = `
      <div class="p-4 border-b">
        <h3 class="font-bold">Cart</h3>
      </div>
      <div class="p-6 ${
        cartItems.length === 0 ? "h-48 flex items-center justify-center" : ""
      }">
        ${
          cartItems.length === 0
            ? '<p class="text-gray-500 font-bold">Your cart is empty</p>'
            : `
            <div class="space-y-4">
              ${cartItems
                .map(
                  (item) => `
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${
                    item.title
                  }" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                      <p class="text-gray-500">${item.title}</p>
                      <p class="text-gray-500">
                        $${item.price.toFixed(2)} x ${item.quantity} 
                        <span class="font-bold text-gray-900">$${(
                          item.price * item.quantity
                        ).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                  <button class="delete-item text-gray-400 hover:text-gray-600" data-id="${
                    item.id
                  }">
                    <img src="src/images/icon-delete.svg" alt="Delete" class="w-4 h-4">
                  </button>
                </div>
              `
                )
                .join("")}
              <button class="w-full bg-orange-500 text-white rounded-lg py-4 font-bold hover:bg-orange-600 transition-colors">
                Checkout
              </button>
            </div>
          `
        }
      </div>
    `;

    cartModal.querySelectorAll(".delete-item").forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.dataset.id;
        cartItems = cartItems.filter((item) => item.id !== parseInt(itemId));
        updateCartModal();
        updateCartCount();
      });
    });
  }

  function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.toggle("hidden", totalItems === 0);
    }
  }

  header.addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }
    updateCartModal();
    updateCartCount();
  };

  const topSection = document.createElement("div");
  topSection.className = "flex justify-between items-center w-full";

  const leftSection = document.createElement("div");
  leftSection.className = "flex items-center space-x-4";

  const menuIcon = document.createElement("img");
  menuIcon.src = "src/images/icon-menu.svg";
  menuIcon.alt = "Menu";
  menuIcon.className = "w-5 h-5 md:hidden";
  leftSection.appendChild(menuIcon);

  const logo = document.createElement("img");
  logo.src = "src/images/logo.svg";
  logo.alt = "Logo";
  logo.className = "w-32 h-auto cursor-pointer";
  logo.addEventListener("click", () => {
    window.location.href = "#home";
  });
  leftSection.appendChild(logo);

  const nav = document.createElement("nav");
  nav.className = "hidden md:flex items-center space-x-4";

  const navLinks = document.createElement("ul");
  navLinks.className = "flex space-x-10 ml-10";

  const links = ["Collections", "Men", "Women", "About", "Contact"];
  links.forEach((linkText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${linkText.toLowerCase()}`;
    a.textContent = linkText;
    a.className = "text-gray-600 hover:text-gray-900 pb-8 relative";
    a.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("border-b-4", "border-orange-500");
      });
      a.classList.add("border-b-4", "border-orange-500");
    });
    li.appendChild(a);
    navLinks.appendChild(li);
  });

  nav.appendChild(navLinks);
  leftSection.appendChild(nav);

  const rightSection = document.createElement("div");
  rightSection.className = "flex items-center space-x-4";

  const cartIconContainer = document.createElement("div");
  cartIconContainer.className = "relative cursor-pointer";

  const cartIcon = document.createElement("img");
  cartIcon.src = "/src/images/icon-cart.svg";
  cartIcon.alt = "Cart";
  cartIcon.className = "w-6 h-6";

  const cartCount = document.createElement("span");
  cartCount.id = "cart-count";
  cartCount.className =
    "absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hidden";
  cartCount.textContent = "0";

  cartIconContainer.appendChild(cartIcon);
  cartIconContainer.appendChild(cartCount);

  cartIconContainer.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
    updateCartModal();
  });

  document.addEventListener("click", (event) => {
    if (
      !cartModal.contains(event.target) &&
      !cartIconContainer.contains(event.target)
    ) {
      cartModal.classList.add("hidden");
    }
  });

  const profileImage = document.createElement("img");
  profileImage.src = "src/images/image-avatar.png";
  profileImage.alt = "Profile";
  profileImage.className =
    "w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-orange-500 transition-colors";

  rightSection.appendChild(cartIconContainer);
  rightSection.appendChild(profileImage);

  topSection.appendChild(leftSection);
  topSection.appendChild(rightSection);

  header.appendChild(topSection);
  header.appendChild(cartModal);

  const mobileNav = document.createElement("div");
  mobileNav.className = "fixed inset-0 bg-black bg-opacity-75 z-50 hidden";

  const mobileNavContent = document.createElement("div");
  mobileNavContent.className = "bg-white w-2/3 h-full p-6";

  const closeIcon = document.createElement("img");
  closeIcon.src = "src/images/icon-close.svg";
  closeIcon.alt = "Close";
  closeIcon.className = "w-5 h-5 mb-12 cursor-pointer";
  mobileNavContent.appendChild(closeIcon);

  const mobileNavLinks = document.createElement("ul");
  mobileNavLinks.className = "space-y-6";

  links.forEach((linkText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${linkText.toLowerCase()}`;
    a.textContent = linkText;
    a.className =
      "text-gray-900 text-xl font-bold hover:text-gray-700 transition-colors";
    a.addEventListener("click", (event) => {
      event.preventDefault();
      mobileNav.classList.add("hidden");
    });
    li.appendChild(a);
    mobileNavLinks.appendChild(li);
  });

  mobileNavContent.appendChild(mobileNavLinks);
  mobileNav.appendChild(mobileNavContent);
  document.body.appendChild(mobileNav);

  menuIcon.addEventListener("click", () => {
    mobileNav.classList.remove("hidden");
  });

  closeIcon.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });

  mobileNav.addEventListener("click", (event) => {
    if (!mobileNavContent.contains(event.target)) {
      mobileNav.classList.add("hidden");
    }
  });

  const hr = document.createElement("hr");
  hr.className = "w-full border-gray-300 mt-8";
  header.appendChild(hr);

  updateCartModal();

  return header;
}
