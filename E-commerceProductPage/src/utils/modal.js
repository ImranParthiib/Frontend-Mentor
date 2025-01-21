export function createModal(product, currentImageIndex) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden";

  const modalContent = document.createElement("div");
  modalContent.className = "relative w-full max-w-lg mx-4 md:max-w-4xl p-4";

  // Close button
  const closeButton = document.createElement("button");
  closeButton.className =
    "absolute top-4 right-4 text-white hover:text-orange-500";
  closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

  // Main image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "relative";

  const mainImage = document.createElement("img");
  mainImage.className = "w-full h-auto rounded-2xl";
  mainImage.src = product.previewimages[currentImageIndex];

  // Navigation buttons
  const prevButton = document.createElement("button");
  prevButton.className =
    "absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 hover:bg-orange-500 hover:text-white transition-colors";
  prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;

  const nextButton = document.createElement("button");
  nextButton.className =
    "absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 hover:bg-orange-500 hover:text-white transition-colors";
  nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;

  // Thumbnails
  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "hidden md:grid grid-cols-4 gap-4 mt-8";

  function updateModalContent() {
    mainImage.src = product.previewimages[currentImageIndex];
    mainImage.alt = `${product.title} view ${currentImageIndex + 1}`;
    updateModalThumbnails();
  }

  function updateModalThumbnails() {
    thumbnailContainer.innerHTML = "";
    product.previewimages.forEach((img, idx) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `relative cursor-pointer rounded-xl overflow-hidden ${
        currentImageIndex === idx ? "ring-2 ring-orange-500" : ""
      }`;

      const thumbnailImg = document.createElement("img");
      thumbnailImg.src = img;
      thumbnailImg.alt = `Thumbnail ${idx + 1}`;
      thumbnailImg.className = "w-full h-auto rounded-xl";

      const overlay = document.createElement("div");
      overlay.className = `absolute inset-0 bg-white transition-opacity ${
        currentImageIndex === idx ? "opacity-50" : "opacity-0 hover:opacity-25"
      }`;

      thumbnail.appendChild(thumbnailImg);
      thumbnail.appendChild(overlay);

      thumbnail.addEventListener("click", () => {
        currentImageIndex = idx;
        updateModalContent();
        updateModalThumbnails(); // Update main gallery thumbnails too
      });

      thumbnailContainer.appendChild(thumbnail);
    });
  }

  // Event listeners
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  prevButton.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + product.previewimages.length) %
      product.previewimages.length;
    updateModalContent();
    updateModalThumbnails(); // Update main gallery thumbnails too
  });

  nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % product.previewimages.length;
    updateModalContent();
    updateModalThumbnails(); // Update main gallery thumbnails too
  });

  // Assemble modal
  imageContainer.appendChild(mainImage);
  imageContainer.appendChild(prevButton);
  imageContainer.appendChild(nextButton);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(imageContainer);
  modalContent.appendChild(thumbnailContainer);

  modal.appendChild(modalContent);

  // Initial content update
  updateModalContent();

  return modal;
}
