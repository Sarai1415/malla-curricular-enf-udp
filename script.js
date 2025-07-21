function aprobar(btn) {
  const ramo = btn.parentElement;
  ramo.classList.toggle('aprobado');
  const nombre = ramo.textContent.trim();
  let aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
  if (ramo.classList.contains("aprobado")) {
    aprobados.push(nombre);
  } else {
    aprobados = aprobados.filter(n => n !== nombre);
  }
  localStorage.setItem("aprobados", JSON.stringify([...new Set(aprobados)]));
}

// Al cargar, marcar ramos ya aprobados
document.addEventListener("DOMContentLoaded", () => {
  const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
  document.querySelectorAll(".ramo").forEach(div => {
    if (aprobados.includes(div.textContent.trim())) {
      div.classList.add("aprobado");
    }
  });
});
