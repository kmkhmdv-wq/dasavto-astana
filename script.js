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
