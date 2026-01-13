document.addEventListener('DOMContentLoaded', () => {
  const calcularPrecio = document.querySelectorAll('input.calcular-precio');
  const plazoInput = document.getElementById('plazo');
  const precioBaseEl = document.getElementById('precio-base');
  const descuentoEl = document.getElementById('descuento');
  const precioFinalEl = document.getElementById('precio-final');

  function calcularPresupuesto() {
    let totalBase = 0;

    calcularPrecio.forEach(chk => {
      if (chk.checked) totalBase += Number(chk.value);
    });

    const plazo = Number(plazoInput.value) || 0;

    let descuento = 0;
    if (plazo >= 2) {
      descuento = Math.min((plazo - 1) * 5, 50);
    }

    const totalFinal = totalBase * (1 - descuento / 100);

    precioBaseEl.textContent = totalBase.toFixed(2);
    descuentoEl.textContent = descuento + '%';
    precioFinalEl.textContent = totalFinal.toFixed(2);
  }

  calcularPrecio.forEach(chk => chk.addEventListener('change', calcularPresupuesto));
  plazoInput.addEventListener('input', calcularPresupuesto);
  calcularPresupuesto();


  const form = document.getElementById('form-presupuesto');
  form.addEventListener('submit', (e) => {
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const email = document.getElementById('email').value.trim();

    const soloLetrasNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,15}$/;
    const soloLetrasApellido = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,40}$/;
    const tel9Digitos = /^\d{9}$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let ok = true, msg = [];

    if (!soloLetrasNombre.test(nombre)) { ok = false; msg.push('Nombre: solo letras, máx. 15.'); }
    if (!soloLetrasApellido.test(apellidos)) { ok = false; msg.push('Apellidos: solo letras, máx. 40.'); }
    if (!tel9Digitos.test(tel)) { ok = false; msg.push('Teléfono: exactamente 9 dígitos.'); }
    if (!emailValido.test(email)) { ok = false; msg.push('Email: formato no válido.'); }

    if (!ok) {
      e.preventDefault();
      alert(msg.join('\n'));
    }
  });
});
