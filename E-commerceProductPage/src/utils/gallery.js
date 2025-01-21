import { createModal } from './modal';

export function createGallery(product, currentImageIndex, updateThumbnails) {
  const gallery = document.createElement("div");
  gallery.className = "md:w-1/2";

  // Main image container
  const mainImageContainer = document.createElement("div");
  mainImageContainer.className = "relative";

  const mainImage = document.createElement("img");
  mainImage.src = product.previewimages[currentImageIndex];
  mainImage.alt = product.title;
  mainImage.className = "w-full rounded-2xl cursor-pointer";

  // Add click event to open modal
  mainImage.addEventListener("click", () => {
    // Remove existing modal if it exists
    const existingModal = document.querySelector('.modal-carousel');
    if (existingModal) {
      existingModal.remove();
    }

    // Create a new modal
    const modal = createModal(product, currentImageIndex); // Pass currentImageIndex to modal
    modal.classList.add("modal-carousel");
    document.body.appendChild(modal);
    modal.classList.remove("hidden"); // Show the modal
  });

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
    currentImageIndex = (currentImageIndex + 1) % product.previewimages.length;
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
