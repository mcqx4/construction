// ===== НАВИГАЦИЯ =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Скролл навигации
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Мобильное меню
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ПОРТФОЛИО ФИЛЬТР =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Активная кнопка
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Фильтрация
        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== ЛАЙТБОКС =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let galleryImages = [];

// Собираем все изображения из портфолио
function updateGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll('.portfolio-item:not([style*="display: none"]) img'));
}

// Открытие лайтбокса
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        updateGalleryImages();
        const img = item.querySelector('img');
        currentImageIndex = galleryImages.findIndex(i => i.src === img.src);
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие лайтбокса
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Навигация по лайтбоксу
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
});

// Клавиатурная навигация
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// ===== ЗАГРУЗКА ЕЩЁ ФОТО =====
const loadMoreBtn = document.getElementById('loadMore');
const portfolioGrid = document.querySelector('.portfolio-grid');

// Дополнительные фотографии для загрузки
const additionalPhotos = [
    { src: 'Media/IMG_3390.JPG', category: 'houses', tag: 'Частный дом', title: 'Строительство' },
    { src: 'Media/IMG_3391.JPG', category: 'concrete', tag: 'Монолит', title: 'Бетонные работы' },
    { src: 'Media/IMG_3392.JPG', category: 'roofing', tag: 'Кровля', title: 'Кровельные работы' },
    { src: 'Media/IMG_3393.JPG', category: 'houses', tag: 'Частный дом', title: 'Объект' },
    { src: 'Media/IMG_3394.JPG', category: 'other', tag: 'Другое', title: 'Строительство' },
    { src: 'Media/IMG_3395.JPG', category: 'concrete', tag: 'Фундамент', title: 'Монолитные работы' },
    { src: 'Media/IMG_3396.JPG', category: 'houses', tag: 'Частный дом', title: 'Готовый объект' },
    { src: 'Media/IMG_3397.JPG', category: 'roofing', tag: 'Кровля', title: 'Монтаж кровли' },
    { src: 'Media/IMG_3398.JPG', category: 'other', tag: 'Кладка', title: 'Каменные работы' },
    { src: 'Media/IMG_3399.JPG', category: 'houses', tag: 'Частный дом', title: 'Строительство' },
    { src: 'Media/IMG_3403.JPG', category: 'concrete', tag: 'Монолит', title: 'Бетонные работы' },
    { src: 'Media/IMG_3404.JPG', category: 'houses', tag: 'Частный дом', title: 'Объект' },
    { src: 'Media/IMG_3405.JPG', category: 'roofing', tag: 'Кровля', title: 'Кровельные работы' },
    { src: 'Media/IMG_3406.JPG', category: 'other', tag: 'Другое', title: 'Строительство' },
    { src: 'Media/IMG_3407.JPG', category: 'houses', tag: 'Частный дом', title: 'Готовый объект' },
    { src: 'Media/IMG_3408.JPG', category: 'concrete', tag: 'Фундамент', title: 'Монолитные работы' },
];

let photosLoaded = 0;
const photosPerLoad = 8;

loadMoreBtn.addEventListener('click', () => {
    const photosToLoad = additionalPhotos.slice(photosLoaded, photosLoaded + photosPerLoad);

    photosToLoad.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.dataset.category = photo.category;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}">
            <div class="portfolio-overlay">
                <span class="portfolio-tag">${photo.tag}</span>
                <h4>${photo.title}</h4>
            </div>
        `;

        portfolioGrid.appendChild(item);

        // Добавляем обработчик для лайтбокса
        item.addEventListener('click', () => {
            updateGalleryImages();
            const img = item.querySelector('img');
            currentImageIndex = galleryImages.findIndex(i => i.src === img.src);
            lightboxImage.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Анимация появления
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    photosLoaded += photosPerLoad;

    // Скрываем кнопку если все фото загружены
    if (photosLoaded >= additionalPhotos.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем анимацию к секциям
document.querySelectorAll('section > .container').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// ===== ФОРМА КОНТАКТОВ =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Формируем сообщение для WhatsApp/Telegram
    const text = `Здравствуйте! Меня зовут ${name}.%0A%0AТелефон: ${phone}%0A%0A${message ? 'Сообщение: ' + message : ''}`;

    // Показываем уведомление
    alert('Спасибо за заявку! Свяжусь с вами в ближайшее время.');

    // Очищаем форму
    contactForm.reset();
});

// ===== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO =====
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
});

// ===== СЧЁТЧИК ДЛЯ СТАТИСТИКИ (если понадобится) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== АКТИВНЫЕ ССЫЛКИ В НАВИГАЦИИ =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#c9a227';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс loaded к body для CSS анимаций
    document.body.classList.add('loaded');

    // Прячем scroll indicator после первого скролла
    const heroScroll = document.querySelector('.hero-scroll');
    let scrolledOnce = false;

    window.addEventListener('scroll', () => {
        if (!scrolledOnce && window.scrollY > 100) {
            scrolledOnce = true;
            heroScroll.style.opacity = '0';
            setTimeout(() => {
                heroScroll.style.display = 'none';
            }, 500);
        }
    });
});

// ===== ТЕЛЕФОННАЯ МАСКА =====
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value[0] === '8') {
            value = '7' + value.slice(1);
        }
        if (value[0] !== '7') {
            value = '7' + value;
        }
    }

    let formatted = '';
    if (value.length > 0) {
        formatted = '+' + value[0];
    }
    if (value.length > 1) {
        formatted += ' (' + value.slice(1, 4);
    }
    if (value.length > 4) {
        formatted += ') ' + value.slice(4, 7);
    }
    if (value.length > 7) {
        formatted += '-' + value.slice(7, 9);
    }
    if (value.length > 9) {
        formatted += '-' + value.slice(9, 11);
    }

    e.target.value = formatted;
});
