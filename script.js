const ramos = [
  { nombre: "Química", creditos: 5 },
  { nombre: "Biología", creditos: 5 },
  { nombre: "Bases Teoricas de Enfermería I", creditos: 5 },
  { nombre: "Primeros Auxilios", creditos: 3 },
  { nombre: "Psicología Evolutiva", creditos: 5 },
  { nombre: "Inglés I", creditos: 5 },

  { nombre: "Bioquímica", creditos: 5, requiere: ["Química"] },
  { nombre: "Morfofuncion I", creditos: 8, requiere: ["Biología"] },
  { nombre: "Bases Teoricas de Enfermería II", creditos: 5, requiere: ["Bases Teoricas de Enfermería I"] },
  { nombre: "Comunicación y educación en salud", creditos: 3, requiere: ["Bases Teoricas de Enfermería I"] },
  { nombre: "Inglés II", creditos: 5, requiere: ["Inglés I"] },
  { nombre: "CFG 1", creditos: 5 },

  { nombre: "Microbiología Integrada", creditos: 6, requiere: ["Bioquímica"] },
  { nombre: "Morfofuncion II", creditos: 8, requiere: ["Morfofuncion I"] },
  { nombre: "Cuidados de Enfermería I", creditos: 9, requiere: ["Morfofuncion I", "Bases Teoricas de Enfermería II", "Comunicación y educación en salud"] },
  { nombre: "Competencias Genéricas", creditos: 3, requiereCreditos: 55 },
  { nombre: "Inglés III", creditos: 5, requiere: ["Inglés II"] },

  { nombre: "Farmacología", creditos: 6, requiere: ["Microbiología Integrada"] },
  { nombre: "Fisiopatología", creditos: 6, requiere: ["Morfofuncion II"] },
  { nombre: "Cuidados de Enfermería II", creditos: 11, requiere: ["Morfofuncion II", "Cuidados de Enfermería I"] },
  { nombre: "Enfermería en Salud Mental", creditos: 5, requiereCreditos: 70 },
  { nombre: "Bioestadística", creditos: 3, requiereCreditos: 70 },

  { nombre: "Gestión Adulto Hospitalario", creditos: 12, requiere: ["Farmacología", "Fisiopatología", "Cuidados de Enfermería II"] },
  { nombre: "Enfermería en Psiquiatría", creditos: 6, requiere: ["Farmacología", "Fisiopatología", "Cuidados de Enfermería II"] },
  { nombre: "Bioética y Logística", creditos: 5, requiere: ["Cuidados de Enfermería II"] },
  { nombre: "Salud Pública", creditos: 3, requiere: ["Cuidados de Enfermería II", "Bioestadística"] },
  { nombre: "CFG 2", creditos: 5 },

  { nombre: "Gestión Comunidad I", creditos: 12, requiere: ["Gestión Adulto Hospitalario", "Salud Pública"] },
  { nombre: "Adulto Mayor y Psicogeriatría", creditos: 6, requiere: ["Gestión Adulto Hospitalario", "Enfermería en Psiquiatría"] },
  { nombre: "Enfermería basada en Evidencia", creditos: 3, requiere: ["Bioética y Logística", "Salud Pública"] },
  { nombre: "Gestión y Liderazgo", creditos: 4, requiere: ["Gestión Adulto Hospitalario"] },
  { nombre: "CFG 3", creditos: 5 },

  { nombre: "Gestión Comunidad II", creditos: 12, requiere: ["Gestión Comunidad I"] },
  { nombre: "Calidad y Proyectos", creditos: 6, requiere: ["Gestión y Liderazgo"] },
  { nombre: "Metodología de la Investigación I", creditos: 5, requiere: ["Enfermería basada en Evidencia"] },
  { nombre: "Optativo I", creditos: 3, requiereCreditos: 150 },
  { nombre: "CFG 4", creditos: 5 },

  { nombre: "Gestión Infanto-Juvenil", creditos: 12, requiere: ["Gestión Comunidad II"] },
  { nombre: "Unidades Críticas y Urgencia", creditos: 6, requiere: ["Gestión Comunidad II"] },
  { nombre: "Metodología de la Investigación II", creditos: 6, requiere: ["Metodología de la Investigación I"] },
  { nombre: "Medicina Integrativa", creditos: 3, requiereCreditos: 150 },
  { nombre: "Optativo II", creditos: 3, requiereCreditos: 150 },

  { nombre: "Internado Comunitario", creditos: 25, requiereCreditos: 243 },
  { nombre: "Internado Clínico/Urgencia", creditos: 10, requiereCreditos: 243 },
  { nombre: "Internado Intrahospitalario", creditos: 25, requiereCreditos: 243 }
];

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

document.addEventListener("DOMContentLoaded", () => {
  const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
  let totalCreditos = 0;
  ramos.forEach(r => {
    if (aprobados.includes(r.nombre)) totalCreditos += r.creditos;
  });
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.textContent.replace(/Aprobar/, '').trim();
    const info = ramos.find(r => r.nombre === nombre);
    const requisitos = info?.requiere || [];
    const cumpleReq = requisitos.every(req => aprobados.includes(req));
    const cumpleCred = info?.requiereCreditos ? totalCreditos >= info.requiereCreditos : true;
    if (aprobados.includes(nombre)) div.classList.add("aprobado");
    if (!cumpleReq || !cumpleCred) {
      const boton = div.querySelector("button");
      if (boton) boton.disabled = true;
      div.style.opacity = 0.5;
    }
  });
});
