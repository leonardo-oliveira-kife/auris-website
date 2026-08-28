(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = form.querySelector('.form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  var required = ['nome', 'instituicao', 'contato'];

  function clearErrors() {
    form.querySelectorAll('.form-error').forEach(function (el) {
      el.textContent = '';
    });
  }

  function setError(fieldName, message) {
    var el = form.querySelector('[data-error-for="' + fieldName + '"]');
    if (el) el.textContent = message;
  }

  function isValidContact(value) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^[\d\s()+-]{8,}$/;
    return emailPattern.test(value) || phonePattern.test(value);
  }

  function validate(data) {
    var valid = true;
    clearErrors();

    required.forEach(function (field) {
      if (!data[field] || !data[field].trim()) {
        setError(field, 'Campo obrigatório.');
        valid = false;
      }
    });

    if (data.contato && data.contato.trim() && !isValidContact(data.contato.trim())) {
      setError('contato', 'Informe um e-mail ou telefone válido.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    var data = Object.fromEntries(formData.entries());

    if (data.website) {
      // honeypot preenchido: provável bot, ignora silenciosamente
      return;
    }

    if (!validate(data)) {
      statusEl.textContent = '';
      return;
    }

    submitBtn.disabled = true;
    statusEl.className = 'form-status';
    statusEl.textContent = 'Enviando...';

    fetch('php/send-mail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json().then(function (json) {
          return { ok: response.ok, json: json };
        });
      })
      .then(function (result) {
        if (result.ok && result.json.success) {
          statusEl.className = 'form-status form-status--success';
          statusEl.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
          form.reset();
        } else {
          statusEl.className = 'form-status form-status--error';
          statusEl.textContent = result.json.message || 'Não foi possível enviar. Tente novamente.';
        }
      })
      .catch(function () {
        statusEl.className = 'form-status form-status--error';
        statusEl.textContent = 'Erro de conexão. Tente novamente em instantes.';
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
