 // --- Slider Functionality ---
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    // Check if the slider exists on the page before running the script
    if (!sliderWrapper) return;

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let slideInterval;
    const totalSlides = slides.length;

    
    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('mouseover', () => {
            goToSlide(i);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    // Function to update the slider
    function goToSlide(index) {
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Event listeners for next/prev buttons
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
        resetInterval();
    });

    // Auto-play functionality
    function startInterval() {
        slideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
        }, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Initialize slider
    goToSlide(0);
    startInterval();
});