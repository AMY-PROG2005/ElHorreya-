document.addEventListener('DOMContentLoaded', function() {
    // Slider with dots functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    if (slides.length > 0 && dots.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(-${index * 100}%)`;
                dots[i].classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Initial slide
        showSlide(currentSlide);

        // Auto slide
        setInterval(nextSlide, slideInterval);
    }

    // Intersection observer for animations
    const sections = document.querySelectorAll('.animation');
    if (sections.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // 20% of the section needs to be visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Grabbable slider for cards
    const container = document.querySelector(".companycontainer");
    const cards = document.querySelector(".cards");

    if (container && cards) {
        let isPressedDown = false;
        let cursorXSpace;

        container.addEventListener("mousedown", (e) => {
            isPressedDown = true;
            cursorXSpace = e.offsetX - cards.offsetLeft;
            container.style.cursor = "grabbing";
        });

        container.addEventListener("mouseup", () => {
            container.style.cursor = "grab";
        });

        window.addEventListener("mouseup", () => {
            isPressedDown = false;
        });

        container.addEventListener("mousemove", (e) => {
            if (!isPressedDown) return;
            e.preventDefault();
            let mana = e.offsetX - cursorXSpace;
            cards.style.left = `${mana}px`;
            boundCards();
        });

        function boundCards() {
            const container_rect = container.getBoundingClientRect();
            const cards_rect = cards.getBoundingClientRect();

            // Prevent the cards from moving beyond the left side of the container
            if (parseInt(cards.style.left) > 0) {
                cards.style.left = '0px';
            }
            // Limit the right side movement to -720px
            else if (parseInt(cards.style.left) < -720) {
                cards.style.left = '-720px';
            }
        }
    }

    // Slider track functionality
    const traack = document.querySelector('.slider-track');
    const slidees = document.querySelectorAll('.slide2');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (traack && slidees.length > 0 && prevButton && nextButton) {
        let currenteIndex2 = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        function updateSlidePosition() {
            const translateXValue = - currenteIndex2 * 100;
            traack.style.transform = `translateX(${translateXValue}%)`;
            prevTranslate = currentTranslate;
        }

        prevButton.addEventListener('click', () => {
            currenteIndex2 = currenteIndex2 > 0 ? currenteIndex2 - 1 : slidees.length - 1;
            updateSlidePosition();
        });

        nextButton.addEventListener('click', () => {
            currenteIndex2 = currenteIndex2 < slidees.length - 1 ? currenteIndex2 + 1 : 0;
            updateSlidePosition();
        });

        traack.addEventListener('mousedown', dragStart);
        traack.addEventListener('mouseup', dragEnd);
        traack.addEventListener('mousemove', dragMove);
        traack.addEventListener('mouseleave', dragEnd);
        traack.addEventListener('touchstart', dragStart);
        traack.addEventListener('touchend', dragEnd);
        traack.addEventListener('touchmove', dragMove);

        function dragStart(event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            traack.style.transition = 'none';
        }

        function dragEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100 && currenteIndex2 < slidees.length - 1) currenteIndex2 += 1;
            if (movedBy > 100 && currenteIndex2 > 0) currenteIndex2 -= 1;

            updateSlidePosition();
            traack.style.transition = 'transform 0.5s ease-in-out';
            prevTranslate = currentTranslate;
        }

        function dragMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + (currentPosition - startPos);
                setSliderPosition();
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }

        function setSliderPosition() {
            traack.style.transform = `translateX(${currentTranslate}px)`;
        }
    }
});
////////
// map
const mapOverlay = document.querySelector('.map-overlay');

if (mapOverlay) {
    mapOverlay.addEventListener('click', function() {
        window.open('https://goo.gl/maps/QJfsEkKG12SKcbkE9', '_blank');
    });
}
////////////////////////
// Intersection observer for animations
const sections = document.querySelectorAll('.animatefadeintoleft');
if (sections.length > 0) {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the section needs to be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeintoleft');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
// Intersection observer for animations
const sectionss = document.querySelectorAll('.animatefadeintoright');
if (sectionss.length > 0) {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the section needs to be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-left');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionss.forEach(section => {
        observer.observe(section);
    });
}
