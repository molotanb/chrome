jQuery(document).ready(function ($) {
    const slides = $(".hero__slider-slides");
    const slideCount = slides.children().length;
    const slideWidth = $(".hero__slider-slide").width();
    let index = 0;
    const paginationBars = $(".hero__slider-pagination-bar");
    const paginationFills = $(".hero__slider-pagination-fill");

    gsap.set(slides.children(), { x: (i) => i * slideWidth });

    function animateSlides() {
        const activeSlide = slides.children().eq(index);
        const nextIndex = (index + 1) % slideCount;
        const nextSlide = slides.children().eq(nextIndex);

        setTimeout(() => {
            gsap.to(activeSlide, { duration: 0.75, x: -slideWidth, ease: "power2.inOut" });
        }, 50);

        setTimeout(() => {
            gsap.fromTo(nextSlide, { x: slideWidth }, { duration: 0.75, x: 0, ease: "power2.inOut" });
        }, 50);

        paginationFills.each(function (i) {
            if (i === nextIndex) {
                gsap.fromTo($(this), { width: '0%' }, { duration: 3.5, width: '120%', ease: "none" });
            } else {
                gsap.to($(this), { duration: 0.005, width: '0%', ease: "none" });
            }
        });

        paginationBars.each(function (i) {
            if (i === nextIndex) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        index = nextIndex;
    }

    setInterval(animateSlides, 3500);

    gsap.fromTo(paginationFills.eq(0), { width: '0%' }, { duration: 3.5, width: '120%', ease: "none" });
    paginationBars.eq(0).addClass('active');
});
$(document).ready(function () {
    const elements = [".keys-1", ".keys-2", ".keys-3", ".keys-4"];

    function animateElements() {
        const timeline = gsap.timeline({ repeat: -1 });

        timeline
            .to(elements[0], { duration: 0.4, opacity: 1, y: 0, ease: "power1.in", delay: 0.001 })
            .to(elements[1], { duration: 0.4, opacity: 1, y: 0, ease: "power1.in", delay: 0.001 })
            .to(elements[2], { duration: 0.4, opacity: 1, y: 0, ease: "power1.in", delay: 0.001 })
            .to(elements[3], { duration: 0.4, opacity: 1, y: 0, ease: "power1.in", delay: 0.001 })
            .to(elements[0], { duration: 0.6, opacity: 1, y: 0, ease: "power1.in", delay: 5 });
    }

    animateElements();
});
jQuery(document).ready(function ($) {
    const icon = $(".features__item-icon-chrome svg");

    gsap.set(icon, { transformOrigin: "50% 50%" });

    function animateIcon() {
        const timeline = gsap.timeline({ repeat: -1 });

        timeline.to(icon, { duration: 0.6, rotation: 360, x: 180, ease: "power1.inOut", delay: 0.001 });

        timeline.to(icon, { duration: 1, rotation: 360, x: 180, ease: "none" });

        timeline.to(icon, { duration: 0.6, rotation: 1080, x: 180, ease: "power1.inOut" });
        timeline.to(icon, { duration: 0.6, rotation: 1665, x: 800, ease: "power1.inOut" });
    }

    animateIcon();
});

$(document).ready(function () {
    let isAutoPlay = true;
    const autoPlayDuration = 4;
    let progressBarTween;

    function animateProgressBar() {
        progressBarTween = gsap.to(".installation__tab.active .installation__bar-fill", {
            height: "100%",
            duration: autoPlayDuration,
            ease: "power1.inOut"
        });
        return progressBarTween;
    }

    function resetProgressBar() {
        gsap.set(".installation__bar-fill", { height: "0%" });
        if (!isAutoPlay) {
            gsap.set(".installation__tab.active .installation__bar-fill", { height: "100%" });
        }
    }

    function showNextTab() {
        const currentTab = $('.installation__tab.active');
        const nextTab = currentTab.next('.installation__tab');

        if (nextTab.length) {
            currentTab.removeClass('active').find('.installation__description').slideUp();
            nextTab.addClass('active').find('.installation__description').slideDown();
        } else {
            currentTab.removeClass('active').find('.installation__description').slideUp();
            $('.installation__tab').first().addClass('active').find('.installation__description').slideDown();
        }
    }

    function showNextSlide() {
        const currentSlide = $('.installation__slide.active');
        const nextSlide = currentSlide.next('.installation__slide');

        if (nextSlide.length) {
            gsap.to(currentSlide, {
                duration: 0.1, opacity: 0, onComplete: () => {
                    currentSlide.removeClass('active');
                    nextSlide.addClass('active');
                    gsap.fromTo(nextSlide, { opacity: 0 }, { duration: 0.5, opacity: 1 });
                }
            });
        } else {
            gsap.to(currentSlide, {
                duration: 0.2, opacity: 0, onComplete: () => {
                    currentSlide.removeClass('active');
                    const firstSlide = $('.installation__slide').first();
                    firstSlide.addClass('active');
                    gsap.fromTo(firstSlide, { opacity: 0 }, { duration: 0.5, opacity: 1 });
                }
            });
        }
    }

    function animate() {
        if (isAutoPlay) {
            animateProgressBar().then(() => {
                if (isAutoPlay) {
                    showNextTab();
                    showNextSlide();
                    resetProgressBar();
                    setTimeout(animate, 500);
                }
            });
        } else {
            resetProgressBar();
        }
    }

    function showSpecificTab(tab) {
        const currentTab = $('.installation__tab.active');
        const nextTab = $(tab);

        currentTab.removeClass('active').find('.installation__description').slideUp();
        nextTab.addClass('active').find('.installation__description').slideDown();
        resetProgressBar();
    }

    function showSpecificSlide(index) {
        const currentSlide = $('.installation__slide.active');
        const nextSlide = $('.installation__slide').eq(index);

        gsap.to(currentSlide, {
            duration: 0.1, opacity: 0, onComplete: () => {
                currentSlide.removeClass('active');
                nextSlide.addClass('active');
                gsap.fromTo(nextSlide, { opacity: 0 }, { duration: 0.5, opacity: 1 });
            }
        });
    }

    function stopAutoPlay() {
        isAutoPlay = false;
        if (progressBarTween) {
            progressBarTween.kill();
        }
        resetProgressBar();
    }

    $(".installation__tab").click(function () {
        stopAutoPlay();
        showSpecificTab(this);
        const tabIndex = $(".installation__tab").index(this);
        showSpecificSlide(tabIndex);
    });

    $(".installation__slider-next").click(function () {
        stopAutoPlay();
        const currentTab = $('.installation__tab.active');
        const nextTab = currentTab.next('.installation__tab').length ? currentTab.next('.installation__tab') : $('.installation__tab').first();
        showSpecificTab(nextTab);
        const tabIndex = $(".installation__tab").index(nextTab);
        showSpecificSlide(tabIndex);
    });

    $(".installation__slider-prev").click(function () {
        stopAutoPlay();
        const currentTab = $('.installation__tab.active');
        const prevTab = currentTab.prev('.installation__tab').length ? currentTab.prev('.installation__tab') : $('.installation__tab').last();
        showSpecificTab(prevTab);
        const tabIndex = $(".installation__tab").index(prevTab);
        showSpecificSlide(tabIndex);
    });

    animate();
});
$(document).ready(function ($) {
    $(".faq__accordion-title").click(function () {
        const $accordionItem = $(this).closest(".faq__accordion-item");
        const $accordionText = $accordionItem.find(".faq__accordion-text");
        const $svg = $(this).find("svg");

        if ($accordionItem.hasClass("active")) {
            $accordionText.slideUp();
            $accordionItem.removeClass("active");
            gsap.to($svg, { duration: 0.3, rotate: 0 });
        } else {
            $(".faq__accordion-item.active .faq__accordion-text").slideUp();
            $(".faq__accordion-item.active").removeClass("active");
            gsap.to(".faq__accordion-title svg", { duration: 0.3, rotate: 0 });

            $accordionText.slideDown();
            $accordionItem.addClass("active");
            gsap.to($svg, { duration: 0.3, rotate: 180 });
        }
    });
});
$(document).ready(function ($) {
    $(".header__hamburger-button").click(function () {
        $(".modal").css("display", "block");
        gsap.to(".modal__menu", { duration: 0.5, left: 0, ease: "power1.out" });
    });

    $(".modal__menu-close").click(function () {
        gsap.to(".modal__menu", {
            duration: 0.5, left: "-100%", ease: "power1.in", onComplete: function () {
                $(".modal").css("display", "none");
            }
        });
    });
});

$(document).ready(function () {
    var header = $(".header");
    var offset = 100; // пиксели для появления шапки

    $(window).scroll(function () {
        if ($(window).scrollTop() > offset) {
            header.addClass("sticky");
            header.css("top", "0");
        } else {
            header.removeClass("sticky");
            header.css("top", "0");
        }
    });
});











