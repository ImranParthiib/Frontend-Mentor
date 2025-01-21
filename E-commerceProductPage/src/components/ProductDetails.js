import Header from "./Header";
import { showToast } from "../utils/toast";
import { createModal } from "../utils/modal";
import { createGallery } from "../utils/gallery";
import { createProductInfo } from "../utils/product";

export default function ProductDetails(products) {
  const product = products[0];
  let currentImageIndex = 0;
  let cartCount = 0;
  let modalOpen = false;

  // Create main container
  const container = document.createElement("div");
  container.className =
    "flex flex-col md:flex-row md:items-center max-w-7xl mx-auto py-8 gap-8";

  // Create and add modal
  const modal = createModal(product);
  modal.classList.add("modal-carousel");
  document.body.appendChild(modal);

  // Define updateThumbnails function
  const updateThumbnails = () => {
    // Logic to update thumbnails can be added here
    console.log("Thumbnails updated for image index:", currentImageIndex);
  };

  // Add main content
  container.appendChild(createGallery(product, currentImageIndex, updateThumbnails));
  container.appendChild(createProductInfo(product));

  return container;
}
