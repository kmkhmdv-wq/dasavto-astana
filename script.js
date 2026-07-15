// Vehicle Showcase Tab Switching
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  const usedGrid = document.getElementById('used-cars');
  const newGrid = document.getElementById('new-cars');

  tabs.forEach(tab => tab.classList.remove('active'));

  if (tabName === 'used') {
    document.querySelector('.tab[onclick*="used"]').classList.add('active');
    usedGrid.style.display = 'grid';
    newGrid.style.display = 'none';
  } else if (tabName === 'new') {
    document.querySelector('.tab[onclick*="new"]').classList.add('active');
    usedGrid.style.display = 'none';
    newGrid.style.display = 'grid';
  }
}

// Modal Management
function openModal(type, extraInfo = '') {
  const modal = document.getElementById('modal');
  const label = document.getElementById('modal-label');
  const title = document.getElementById('modal-title');
  const extraField = document.getElementById('modal-extra-field');
  const extraLabel = document.getElementById('modal-extra-label');
  const extraInput = document.getElementById('modal-extra-input');

  // Reset extra field
  extraField.style.display = 'none';
  extraInput.value = '';
  extraInput.required = false;

  // Configure modal depending on action type
  switch (type) {
    case 'callback':
      label.innerText = 'Обратный звонок';
      title.innerText = 'Заказать звонок';
      break;
    case 'credit':
      label.innerText = 'Кредит и рассрочка';
      title.innerText = 'Заявка на автокредит';
      extraField.style.display = 'flex';
      extraLabel.innerText = 'Интересующая модель';
      extraInput.value = extraInfo || '';
      extraInput.placeholder = 'Например: Porsche 911';
      break;
    case 'tradein':
      label.innerText = 'Обмен автомобилей';
      title.innerText = 'Заявка на Trade-in';
      extraField.style.display = 'flex';
      extraLabel.innerText = 'Ваш текущий автомобиль';
      extraInput.placeholder = 'Марка, модель, год';
      extraInput.required = true;
      break;
    case 'commission':
      label.innerText = 'Комиссионная продажа';
      title.innerText = 'Сдать авто на комиссию';
      extraField.style.display = 'flex';
      extraLabel.innerText = 'Характеристики автомобиля';
      extraInput.placeholder = 'Марка, год, пробег, цена';
      extraInput.required = true;
      break;
    case 'wykup':
      label.innerText = 'Срочный выкуп';
      title.innerText = 'Оценка авто для выкупа';
      extraField.style.display = 'flex';
      extraLabel.innerText = 'Марка и модель авто';
      extraInput.placeholder = 'Например: Toyota Camry 2020';
      extraInput.required = true;
      break;
    case 'order':
      label.innerText = 'Авто под заказ';
      title.innerText = 'Заказать подбор авто';
      extraField.style.display = 'flex';
      extraLabel.innerText = 'Какое авто вы ищете?';
      extraInput.placeholder = 'Марка, год, бюджет';
      extraInput.required = true;
      break;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Form Submission Simulation
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;

  submitBtn.innerText = 'Отправка...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('Спасибо! Ваша заявка успешно принята. Кредитный специалист автосалона DAS AVTO.KZ свяжется с вами в течение 10 минут.');
    form.reset();
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
  }, 1000);
}

function handleModalSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;

  submitBtn.innerText = 'Отправка...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('Заявка отправлена! Менеджер автосалона свяжется с вами в ближайшее время.');
    form.reset();
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
    closeModal();
  }, 1000);
}

// Mobile Menu Navigation Control
function toggleMobileMenu() {
  const header = document.querySelector('.header');
  header.classList.toggle('menu-active');

  if (header.classList.contains('menu-active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  const header = document.querySelector('.header');
  header.classList.remove('menu-active');
  document.body.style.overflow = '';
}

// Reviews Carousel Manual Scroll & Autoplay Control
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.reviews-carousel-wrapper');
  const track = document.querySelector('.reviews-carousel-track');
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');
  
  if (!slider || !prevBtn || !nextBtn) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoplayTimer = null;

  // Function to calculate dynamic card width including gap
  const getScrollStep = () => {
    const card = slider.querySelector('.review-card-carousel');
    if (!card) return 374;
    const gap = track ? parseInt(window.getComputedStyle(track).gap) || 24 : 24;
    return card.offsetWidth + gap;
  };

  // Autoplay function
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const step = getScrollStep();
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 10) {
        // Return to start smoothly
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  // Button clicks
  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    slider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  // Mouse Drag-to-Scroll implementation
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active-drag');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollBehavior = 'auto';
    slider.style.scrollSnapType = 'none';
    stopAutoplay();
  });

  slider.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('active-drag');
    slider.style.scrollBehavior = 'smooth';
    slider.style.scrollSnapType = 'x mandatory';
    startAutoplay();
  });

  slider.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('active-drag');
    slider.style.scrollBehavior = 'smooth';
    slider.style.scrollSnapType = 'x mandatory';
    startAutoplay();
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
    slider.scrollLeft = scrollLeft - walk;
  });

  // Touch device support updates to pause/resume autoplay
  slider.addEventListener('touchstart', stopAutoplay, { passive: true });
  slider.addEventListener('touchend', startAutoplay, { passive: true });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', () => {
    if (!isDown) {
      startAutoplay();
    }
  });

  // Initial start of autoplay
  startAutoplay();
});

