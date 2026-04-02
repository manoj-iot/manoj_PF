// Navbar scroll effect and active link tracking
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth reveal animation on scroll
const revealElements = document.querySelectorAll('.skill-category, .project-card, .edu-card, .timeline-item, .contact-card');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

// Cursor Glow Blob Ambient Flow
const cursorBlob = document.getElementById('cursor-blob');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let blobX = mouseX;
let blobY = mouseY;

const pupilLeft = document.getElementById('pupil-left');
const pupilRight = document.getElementById('pupil-right');

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (pupilLeft && pupilRight) {
        const calcEyeMovement = (pupil) => {
            const rect = pupil.getBoundingClientRect();
            // Original center offset from SVG coordinates scaling
            // Since SVG width is 50px, but internal is 100x100, the movement ratio is halved
            const pupilCenterX = rect.left + rect.width / 2;
            const pupilCenterY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(mouseY - pupilCenterY, mouseX - pupilCenterX);
            const distance = Math.min(8, Math.hypot(mouseX - pupilCenterX, mouseY - pupilCenterY) * 0.05); // Move max 8 SVG units
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            pupil.setAttribute('transform', `translate(${x}, ${y})`);
        };
        
        calcEyeMovement(pupilLeft);
        calcEyeMovement(pupilRight);
    }
});

function animateBlob() {
    blobX += (mouseX - blobX) * 0.08;
    blobY += (mouseY - blobY) * 0.08;
    
    if(cursorBlob) {
        cursorBlob.style.transform = `translate3d(${blobX - 300}px, ${blobY - 300}px, 0)`;
    }
    requestAnimationFrame(animateBlob);
}
animateBlob();

// 3D Tilt Effect on Section Cards
const tiltCards = document.querySelectorAll('.project-card, .edu-card, .skill-category, .contact-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s ease';
        card.style.zIndex = '1';
    });
});

