/* ============================================
   AATMANIRBHAR - Main JavaScript
   Lightweight, no jQuery dependency
   ============================================ */

(function () {
    'use strict';

    // --- Spinner / Loader ---
    window.addEventListener('load', function () {
        var spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.classList.add('hide');
            setTimeout(function () { spinner.style.display = 'none'; }, 600);
        }
    });

    // --- Navbar Scroll Effect ---
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    function handleNavbarScroll() {
        var scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Run on load

    // --- Mobile Menu Toggle ---
    var mobileToggle = document.getElementById('mobileToggle');
    var navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('mobile-open');
        });

        // Close mobile menu on link click
        var links = navLinks.querySelectorAll('a');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    var sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Animate On Scroll (Intersection Observer) ---
    var animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all items
        animateElements.forEach(function (el) {
            el.classList.add('animated');
        });
    }

    // --- Counter Animation ---
    var counters = document.querySelectorAll('[data-count]');
    var counterDone = new Set();

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = target >= 100 ? '+' : '+';
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quad
            var eased = 1 - (1 - progress) * (1 - progress);
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + (progress >= 1 ? suffix : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !counterDone.has(entry.target)) {
                    counterDone.add(entry.target);
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) {
            counterObserver.observe(c);
        });
    }

    // --- Back to Top Button ---
    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Enquiry Form Handler ---
    var form = document.getElementById('enquiryForm');
    var formSuccess = document.getElementById('formSuccess');
    var submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            var name = document.getElementById('enquiry-name').value.trim();
            var phone = document.getElementById('enquiry-phone').value.trim();
            var course = document.getElementById('enquiry-course').value;

            if (!name || !phone || !course) {
                alert('Please fill in all required fields (Name, Phone, Course).');
                return;
            }

            // Phone validation
            if (!/^[6-9]\d{9}$/.test(phone.replace(/[\s\-\+]/g, '').slice(-10))) {
                alert('Please enter a valid 10-digit Indian phone number.');
                return;
            }

            // Build WhatsApp message
            var email = document.getElementById('enquiry-email').value.trim();
            var message = document.getElementById('enquiry-message').value.trim();

            var waText = '--- New Enquiry from Website ---\n';
            waText += 'Name: ' + name + '\n';
            waText += 'Phone: ' + phone + '\n';
            if (email) waText += 'Email: ' + email + '\n';
            waText += 'Course: ' + course + '\n';
            if (message) waText += 'Message: ' + message + '\n';

            // Send via WhatsApp
            var waUrl = 'https://wa.me/+918920175991?text=' + encodeURIComponent(waText);
            window.open(waUrl, '_blank');

            // Show success message
            form.style.display = 'none';
            formSuccess.classList.add('show');

            // Reset form for future use
            form.reset();
        });
    }

})();
