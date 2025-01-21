export const showToast = (message) => {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className =
      "fixed bottom-4 right-4 z-50 flex flex-col gap-2";
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `
    flex items-center gap-3 
    bg-gray-900 text-white 
    px-4 py-3 pr-6 
    rounded-lg shadow-lg 
    transform translate-y-full opacity-0
    transition-all duration-300 ease-out
    hover:translate-x-[-4px]
    max-w-md
  `;

  // Add success icon
  toast.innerHTML = `
    <svg class="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span class="text-sm font-medium">${message}</span>
  `;

  // Add to container
  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
  });

  // Remove after delay
  setTimeout(() => {
    toast.style.transform = "translateY(8px)";
    toast.style.opacity = "0";

    setTimeout(() => {
      toast.remove();
      // Remove container if empty
      if (!toastContainer.firstChild) {
        toastContainer.remove();
      }
    }, 300);
  }, 3000);
};

// You could also add more toast variants if needed
export const showErrorToast = (message) => {
  // Similar implementation but with red styling
};

export const showWarningToast = (message) => {
  // Similar implementation but with yellow styling
};
