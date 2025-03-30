// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const navLinks = document.getElementById('navLinks');

    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('visible');
        if (searchBar.classList.contains('visible')) {
            searchBar.focus();
        }
    });

    // Parallax effect for background images
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * 0.005}px)`;
        });
    });

    // Product Gallery Carousel
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    let autoSlideInterval;

    function showImage(index) {
        // Remove active class from all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to the current image and dot
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            showImage(newIndex);
        }, 5000);
    }

    // Stop auto-slide on user interaction
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for arrows
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            stopAutoSlide();
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            }
            showImage(newIndex);
            startAutoSlide();
        });

        rightArrow.addEventListener('click', () => {
            stopAutoSlide();
            let newIndex = currentIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            showImage(newIndex);
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showImage(index);
            startAutoSlide();
        });
    });

    // Start the auto-slide when the page loads
    if (images.length > 0) {
        startAutoSlide();
    }

    // Add to cart functionality
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            // Get selected flavor
            const selectedFlavor = document.querySelector('input[name="flavor"]:checked').value;
            
            // Get selected purchase option
            const selectedPurchase = document.querySelector('input[name="purchase"]:checked').value;
            
            // Show confirmation message
            alert(`Added to cart: Alcami Elements - ${selectedFlavor} (${selectedPurchase})`);
        });
    }

    // Video play functionality
    const playButton = document.querySelector('.play-button');
    const foundersVideo = document.getElementById('foundersVideo');
    
    if (playButton && foundersVideo) {
        playButton.addEventListener('click', function() {
            foundersVideo.play();
            playButton.style.display = 'none';
        });
        
        foundersVideo.addEventListener('pause', function() {
            playButton.style.display = 'flex';
        });
    }

    // Testimonial slider
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const slideWidth = slides.length > 0 ? slides[0].offsetWidth : 0;
    const testimonialDots = document.querySelectorAll('.feedback-section .dot');
    
    function moveSlide(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        
        updateSlidePosition();
    }
    
    function currentSlide(index) {
        currentSlideIndex = index;
        updateSlidePosition();
    }
    
    function updateSlidePosition() {
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                if (index === currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // Add event listeners to prev/next buttons
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => moveSlide(-1));
        nextButton.addEventListener('click', () => moveSlide(1));
    }
    
    // Add event listeners to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });
    
    // Auto-slide for testimonials
    let testimonialInterval;
    
    function startTestimonialAutoSlide() {
        testimonialInterval = setInterval(() => {
            moveSlide(1);
        }, 5000);
    }
    
    function stopTestimonialAutoSlide() {
        clearInterval(testimonialInterval);
    }
    
    if (slides.length > 0) {
          {
        clearInterval(testimonialInterval);
    }
    
    if (slides.length > 0) {
        startTestimonialAutoSlide();
        
        // Stop auto-slide on user interaction
        if (slidesContainer) {
            slidesContainer.addEventListener('mouseenter', stopTestimonialAutoSlide);
            slidesContainer.addEventListener('mouseleave', startTestimonialAutoSlide);
        }
    }

    // FAQ accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const answer = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');
            
            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.nextElementSibling.style.display = 'none';
                    otherToggle.querySelector('.toggle-icon').textContent = '+';
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                icon.textContent = '−';
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                answer.style.display = 'none';
                icon.textContent = '+';
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerForm = document.querySelector('.footer-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            this.reset();
        });
    }
    
    if (footerForm) {
        footerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            this.reset();
        });
    }

    // Animate statistics counter
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(numberElement => {
            const target = parseInt(numberElement.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            let startTime = null;
            
            function updateNumber(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * target);
                
                numberElement.textContent = currentValue + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    numberElement.textContent = target + '%';
                }
            }
            
            // Use Intersection Observer to start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateNumber);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(numberElement);
        });
    }
    
    // Initialize stats animation
    animateStats();

    // Ingredient hover effects
    const ingredients = document.querySelectorAll('.ingredient');
    
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('mouseenter', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.8s infinite';
        });
        
        ingredient.addEventListener('mouseleave', function() {
            // Remove pulse animation
            this.style.animation = '';
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navLinksElement = document.getElementById('navLinks');
    const navbarElement = document.querySelector('.navbar');
    if (navbarElement) {
        navbarElement.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            navLinksElement.classList.toggle('visible');
            this.innerHTML = navLinksElement.classList.contains('visible') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
});

// Add custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .ingredient, .dot, .arrow');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
        });
    });
});

// Add CSS for custom cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #d4a029;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
    }
    
    .cursor-hover {
        width: 40px;
        height: 40px;
        border-color: #d4a029;
        background-color: rgba(212, 160, 41, 0.1);
    }
    
    /* Hide cursor on mobile devices */
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);