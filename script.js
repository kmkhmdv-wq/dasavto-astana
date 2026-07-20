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

  const form = modal.querySelector('form');
  if (form) {
    form.dataset.type = type;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Supabase configuration
const SUPABASE_URL = 'https://fmjhmvxkwcwusxmrewhi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtamhtdnhrd2N3dXN4bXJld2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTkzNTEsImV4cCI6MjEwMDEzNTM1MX0.Kc6qJxbnriOLnHorkWbz78cml9tXA6O1sCDpI5d6pk0';

// Helper function to submit data to Supabase applications table
async function submitToSupabase(name, phone, extra, type) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ name, phone, extra, type })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting form to Supabase:', error);
  }
}

// Form Submission (Calculator Form)
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;

  submitBtn.innerText = 'Отправка...';
  submitBtn.disabled = true;

  const inputs = form.querySelectorAll('.form-input');
  const name = inputs[0] ? inputs[0].value : '';
  const phone = inputs[1] ? inputs[1].value : '';
  const extra = inputs[2] ? inputs[2].value : '';

  await submitToSupabase(name, phone, extra, 'calculate_conditions');

  alert('Спасибо! Ваша заявка успешно принята. Кредитный специалист автосалона DAS AVTO.KZ свяжется с вами в течение 10 минут.');
  form.reset();
  submitBtn.innerText = originalText;
  submitBtn.disabled = false;
}

// Modal Form Submission
async function handleModalSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;

  submitBtn.innerText = 'Отправка...';
  submitBtn.disabled = true;

  const nameInput = form.querySelector('input[placeholder="Иван"]');
  const phoneInput = form.querySelector('input[placeholder="+7 (700) 000-00-00"]');
  const extraInput = document.getElementById('modal-extra-input');
  
  const name = nameInput ? nameInput.value : '';
  const phone = phoneInput ? phoneInput.value : '';
  const extra = extraInput && (extraInput.required || extraInput.value) ? extraInput.value : '';
  const type = form.dataset.type || 'callback';

  await submitToSupabase(name, phone, extra, type);

  alert('Заявка отправлена! Менеджер автосалона свяжется с вами в ближайшее время.');
  form.reset();
  submitBtn.innerText = originalText;
  submitBtn.disabled = false;
  closeModal();
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

