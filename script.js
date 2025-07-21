// --- Datos de todos los ramos, créditos y requisitos ----------
const ramos = [
  { semestre: 1, year: 1, nombre: "Química", creditos: 5 },
  { semestre: 1, year: 1, nombre: "Biología", creditos: 5 },
  { semestre: 1, year: 1, nombre: "Bases Teoricas de Enfermería I", creditos: 5 },
  { semestre: 1, year: 1, nombre: "Primeros Auxilios", creditos: 3 },
  { semestre: 1, year: 1, nombre: "Psicología Evolutiva", creditos: 5 },
  { semestre: 1, year: 1, nombre: "Inglés I", creditos: 5 },

  { semestre: 2, year: 1, nombre: "Bioquímica", creditos: 5, requiere: ["Química"] },
  { semestre: 2, year: 1, nombre: "Morfofuncion I", creditos: 8, requiere: ["Biología"] },
  { semestre: 2, year: 1, nombre: "Bases Teoricas de Enfermería II", creditos: 5, requiere: ["Bases Teoricas de Enfermería I"] },
  { semestre: 2, year: 1, nombre: "Comunicación y educación en salud", creditos: 3, requiere: ["Bases Teoricas de Enfermería I"] },
  { semestre: 2, year: 1, nombre: "Inglés II", creditos: 5, requiere: ["Inglés I"] },
  { semestre: 2, year: 1, nombre: "CFG 1", creditos: 5 },

  { semestre: 3, year: 2, nombre: "Microbiología Integrada", creditos: 6, requiere: ["Bioquímica"] },
  { semestre: 3, year: 2, nombre: "Morfofuncion II", creditos: 8, requiere: ["Morfofuncion I"] },
  { semestre: 3, year: 2, nombre: "Cuidados de Enfermería I", creditos: 9, requiere: ["Morfofuncion I","Bases Teoricas de Enfermería II","Comunicación y educación en salud"] },
  { semestre: 3, year: 2, nombre: "Competencias Genéricas", creditos: 3, requiereCreditos: 55 },
  { semestre: 3, year: 2, nombre: "Inglés III", creditos: 5, requiere: ["Inglés II"] },

  { semestre: 4, year: 2, nombre: "Farmacología", creditos: 6, requiere: ["Microbiología Integrada"] },
  { semestre: 4, year: 2, nombre: "Fisiopatología", creditos: 6, requiere: ["Morfofuncion II"] },
  { semestre: 4, year: 2, nombre: "Cuidados de Enfermería II", creditos: 11, requiere: ["Morfofuncion II","Cuidados de Enfermería I"] },
  { semestre: 4, year: 2, nombre: "Enfermería en Salud Mental", creditos: 5, requiereCreditos: 70 },
  { semestre: 4, year: 2, nombre: "Bioestadística", creditos: 3, requiereCreditos: 70 },

  { semestre: 5, year: 3, nombre: "Gestión Adulto Hospitalario", creditos: 12, requiere: ["Farmacología","Fisiopatología","Cuidados de Enfermería II"] },
  { semestre: 5, year: 3, nombre: "Enfermería en Psiquiatría", creditos: 6, requiere: ["Farmacología","Fisiopatología","Cuidados de Enfermería II"] },
  { semestre: 5, year: 3, nombre: "Bioética y Logística", creditos: 5, requiere: ["Cuidados de Enfermería II"] },
  { semestre: 5, year: 3, nombre: "Salud Pública", creditos: 3, requiere: ["Cuidados de Enfermería II","Bioestadística"] },
  { semestre: 5, year: 3, nombre: "CFG 2", creditos: 5 },

  { semestre: 6, year: 3, nombre: "Gestión Comunidad I", creditos: 12, requiere: ["Gestión Adulto Hospitalario","Salud Pública"] },
  { semestre: 6, year: 3, nombre: "Adulto Mayor y Psicogeriatría", creditos: 6, requiere: ["Gestión Adulto Hospitalario","Enfermería en Psiquiatría"] },
  { semestre: 6, year: 3, nombre: "Enfermería basada en Evidencia", creditos: 3, requiere: ["Bioética y Logística","Salud Pública"] },
  { semestre: 6, year: 3, nombre: "Gestión y Liderazgo", creditos: 4, requiere: ["Gestión Adulto Hospitalario"] },
  { semestre: 6, year: 3, nombre: "CFG 3", creditos: 5 },

  { semestre: 7, year: 4, nombre: "Gestión Comunidad II", creditos: 12, requiere: ["Gestión Comunidad I"] },
  { semestre: 7, year: 4, nombre: "Calidad y Proyectos", creditos: 6, requiere: ["Gestión y Liderazgo"] },
  { semestre: 7, year: 4, nombre: "Metodología de la Investigación I", creditos: 5, requiere: ["Enfermería basada en Evidencia"] },
  { semestre: 7, year: 4, nombre: "Optativo I", creditos: 3, requiereCreditos: 150 },
  { semestre: 7, year: 4, nombre: "CFG 4", creditos: 5 },

  { semestre: 8, year: 4, nombre: "Gestión Infanto‑Juvenil", creditos: 12, requiere: ["Gestión Comunidad II"] },
  { semestre: 8, year: 4, nombre: "Unidades Críticas y Urgencia", creditos: 6, requiere: ["Gestión Comunidad II"] },
  { semestre: 8, year: 4, nombre: "Metodología de la Investigación II", creditos: 6, requiere: ["Metodología de la Investigación I"] },
  { semestre: 8, year: 4, nombre: "Medicina Integrativa", creditos: 3, requiereCreditos: 150 },
  { semestre: 8, year: 4, nombre: "Optativo II", creditos: 3, requiereCreditos: 150 },

  { semestre: 9, year: 5, nombre: "Internado Comunitario", creditos: 25, requiereCreditos: 243 },
  { semestre: 9, year: 5, nombre: "Internado Clínico/Urgencia", creditos: 10, requiereCreditos: 243 },

  { semestre: 10, year: 5, nombre: "Internado Intrahospitalario", creditos: 25, requiereCreditos: 243 }
];

// --- UTILIDADES -------------------------------------------------
const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));
function totalCreditos() {
  return ramos.reduce((acc, r) => (aprobados.has(r.nombre) ? acc + r.creditos : acc), 0);
}
function cumpleRequisitos(r) {
  const byRamos = (r.requiere || []).every((req) => aprobados.has(req));
  const byCreds = r.requiereCreditos ? totalCreditos() >= r.requiereCreditos : true;
  return byRamos && byCreds;
}

// --- CONSTRUCCIÓN DINÁMICA DE LA GRILLA -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";                       // limpia contenedor
  
  // Agrupa por semestre
  for (let s = 1; s <= 10; s++) {
    const lista = ramos.filter((r) => r.semestre === s);
    if (!lista.length) continue;
    
    const { year } = lista[0];               // todos comparten año
    const box = document.createElement("div");
    box.className = `semestre year-${year}`;
    box.innerHTML = `<h2>Semestre ${s}</h2>`;
    
    lista.forEach((r) => {
      const div = document.createElement("div");
      div.className = "ramo";
      if (aprobados.has(r.nombre)) div.classList.add("aprobado");
      
      const btn = document.createElement("button");
      btn.textContent = aprobados.has(r.nombre) ? "✓" : "Aprobar";
      btn.onclick = () => {
        if (!cumpleRequisitos(r)) return;     // aún no habilitado
        aprobados.has(r.nombre) ? aprobados.delete(r.nombre) : aprobados.add(r.nombre);
        localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
        location.reload();
      };
      
      // Deshabilita si no cumple requisitos
      if (!cumpleRequisitos(r)) {
        btn.disabled = true;
        div.style.opacity = 0.5;
      }
      
      div.append(r.nombre + " ", btn);
      box.appendChild(div);
    });
    grid.appendChild(box);
  }
});
// ----------- LÓGICA DE INTERACTIVIDAD Y GUARDADO -----------

let creditosAcumulados = 0;
const aprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados") || "[]"));
const contenedor = document.getElementById("contenedor");

malla.forEach((s) => {
  const sec = document.createElement("section");
  sec.className = `semestre year-${s.year}`;
  const h2 = document.createElement("h2");
  h2.textContent = `Semestre ${s.semestre}`;
  h2.onclick = () => {
    sec.classList.toggle("expanded");
    sec.classList.toggle("collapsed");
  };

  const ul = document.createElement("ul");
  ul.className = "ramos";
  let creditosSemestre = 0;

  s.ramos.forEach((ramo) => {
    const li = document.createElement("li");
    const requisitos = ramo.requiere || [];
    const cumpleReq = requisitos.every((req) => aprobados.has(req));
    const cumpleCred = ramo.requiereCreditos ? creditosAcumulados >= ramo.requiereCreditos : true;
    const habilitado = cumpleReq && cumpleCred;
    const aprobado = aprobados.has(ramo.nombre);

    li.className = habilitado ? "" : "inhabilitado";
    if (aprobado) li.classList.add("aprobado");

    li.innerHTML = `
      <div>
        <strong>${ramo.nombre}</strong> <span class="creditos">(${ramo.creditos} créditos)</span>
        ${
          requisitos.length || ramo.requiereCreditos
            ? `<br><small>Prerrequisitos: ${requisitos.join(", ")}${
                ramo.requiereCreditos ? ", " + ramo.requiereCreditos + " créditos aprobados" : ""
              }</small>`
            : ""
        }
      </div>
    `;

    if (habilitado) {
      const btn = document.createElement("button");
      btn.textContent = aprobado ? "✓ Aprobado" : "Marcar como aprobado";
      btn.onclick = () => {
        if (!aprobados.has(ramo.nombre)) {
          aprobados.add(ramo.nombre);
          localStorage.setItem("ramosAprobados", JSON.stringify([...aprobados]));
          location.reload();
        }
      };
      li.appendChild(btn);
    }

    if (habilitado && aprobado) {
      creditosSemestre += ramo.creditos;
    }

    ul.appendChild(li);
  });

  creditosAcumulados += creditosSemestre;

  const pCreditos = document.createElement("p");
  pCreditos.className = "acumulados";
  pCreditos.textContent = `Créditos acumulados hasta este semestre: ${creditosAcumulados}`;

  sec.appendChild(h2);
  sec.appendChild(pCreditos);
  sec.appendChild(ul);
  contenedor.appendChild(sec);
});
function resetearProgreso() {
  if (confirm("¿Estás seguro/a de que quieres borrar todos los ramos marcados como aprobados?")) {
    localStorage.removeItem("ramosAprobados");
    location.reload();
  }
}
