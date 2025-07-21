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
const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));
function totalCreditos() {
  return ramos.reduce((acc, r) => (aprobados.has(r.nombre) ? acc + r.creditos : acc), 0);
}
function cumpleRequisitos(r) {
  const byRamos = (r.requiere || []).every((req) => aprobados.has(req));
  const byCreds = r.requiereCreditos ? totalCreditos() >= r.requiereCreditos : true;
  return byRamos && byCreds;
}

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
