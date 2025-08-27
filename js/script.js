import { getAvatarLetter, getShortenName } from "./utils.js";

// Wait until the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  // Select the container element where all review cards will be displayed
  const reviews_container = document.querySelector(".reviews-container");

  // Select the "previous" button for navigating the carousel
  const prevBtn = document.querySelector(".prev-btn");

  // Select the "next" button for navigating the carousel
  const nextBtn = document.querySelector(".next-btn");

  // Select the container for the carousel dots (page indicators)
  const dotsContainer = document.querySelector(".carousel-dots");

  // Index of first visible review
  let currentIndex = 0;
  // Array of reviews
  let reviews = [];

  // Fetch the JSON file

  fetch("data/reviews_sample.json")
    // Convert the promise response object into JSON format
    .then((response) => response.json())
    .then((data) => {
      // Storing reviews in array and rendering reviews
      reviews = data;
      renderReviews();
    })
    .catch((err) => console.error("Failed to load reviews:", err));

  function renderReviews() {
    // Clear Previous ( if Any )
    reviews_container.innerHTML = "";

    // Loop over each review object of reviews array
    reviews.forEach((review) => {
      // Create Review Card
      const review_card = document.createElement("div");
      review_card.className = "review-card";

      // Create Review Header
      const review_header = document.createElement("div");
      review_header.className = "review-header";

      // Create Avatar (first letter of name)
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = getAvatarLetter(review.name);

      // Create Review Meta
      const review_meta = document.createElement("div");
      review_meta.className = "review-meta";

      // Create Name Span
      const nameSpan = document.createElement("span");
      nameSpan.className = "name";
      nameSpan.textContent = getShortenName(review.name);

      // Create Rating Span
      const ratingSpan = document.createElement("span");
      ratingSpan.className = "rating";

      // Create img for star
      const starImg = document.createElement("img");
      starImg.src = "assets/star.svg";
      starImg.alt = "star";
      starImg.className = "star-icon";

      // Append the Star Image
      ratingSpan.appendChild(starImg);

      // Append the Numeric Rating After the Star
      ratingSpan.append(` ${review.rating}.0`);

      // Adding Name Span and Rating Span to Reviews Meta
      review_meta.appendChild(nameSpan);
      review_meta.appendChild(ratingSpan);

      // Adding Avatar and Review Meta to Review Header
      review_header.appendChild(avatar);
      review_header.appendChild(review_meta);

      // Creating Review Text
      const review_text = document.createElement("p");
      review_text.className = "review-text";
      review_text.textContent = review.review;

      // Adding Review Header and Review Text to Review Card
      review_card.appendChild(review_header);
      review_card.appendChild(review_text);

      // Adding Review Card to Container
      reviews_container.appendChild(review_card);
    });

    updateCarousel();
  }

  // Function to determine how many reviews should be visible based on screen width
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 768) return 2; // Mobile: show 2 reviews
    if (width <= 1024) return 2; // Tablet: show 2 reviews
    return 4; // Desktop: show 4 reviews
  }

  // Function to render the dots below the carousel
  function renderDots() {
    dotsContainer.innerHTML = ""; // clear previous dots

    // Number of reviews visible per page
    const visibleCount = getVisibleCount();

    // Total pages needed
    const totalPages = Math.ceil(reviews.length / visibleCount);

    // Create a dot for each page
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === currentIndex) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  }

  // Function to update the carousel position and dots
  function updateCarousel() {
    // Number of reviews visible per page
    const visibleCount = getVisibleCount(); // 4 for desktop,2 for tablet, 2 for mobile
    const maxIndex = Math.ceil(reviews.length / visibleCount) - 1; // Max page index

    // Checking valid range
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const container = document.querySelector(".reviews-wrapper");

    if (window.innerWidth <= 768) {
      // Mobile: vertical scroll
      const containerHeight = container.offsetHeight;
      reviews_container.style.transform = `translateY(-${
        currentIndex * containerHeight
      }px)`;
    } else {
      // Desktop: horizontal scroll
      const containerWidth = container.offsetWidth;
      reviews_container.style.transform = `translateX(-${
        currentIndex * containerWidth
      }px)`;
    }
    renderDots(); // Update the dots to reflect current page
  }

  // Event listeners for navigation buttons
  nextBtn.addEventListener("click", () => {
    currentIndex++; // Move to next page
    updateCarousel(); // Update carousel position
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--; // Move to previous page
    updateCarousel(); // Update carousel position
  });

  // Update carousel when window is resized to maintain responsiveness
  window.addEventListener("resize", updateCarousel);
});
