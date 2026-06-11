window.addEventListener("DOMContentLoaded", () => {
   
    let reviewCount = localStorage.getItem("completedReviews");

reviewCount = reviewCount ? parseInt(reviewCount, 10) : 0;

reviewCount += 1;

localStorage.setItem("completedReviews", reviewCount);

const counterDisplay = document.getElementById("review-counter");
if (counterDisplay) {
    counterDisplay.textContent = `Total Reviews Submitted: ${reviewCount}`;
    }

console.log(`Review count updated successfully. Current count: ${reviewCount}`);
});