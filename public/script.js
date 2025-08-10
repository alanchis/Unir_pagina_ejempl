// script.js — manejo simple de formulario y llamadas a la API
const form = document.getElementById("appointmentForm");
const list = document.getElementById("appointmentsList");
const yearSpan = document.getElementById("year");

yearSpan.textContent = new Date().getFullYear();

async function fetchAppointments() {
  try {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    renderAppointments(data);
  } catch (e) {
    console.error("Error al obtener citas", e);
  }
}

function renderAppointments(items) {
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML = "<li>No hay citas agendadas.</li>";
    return;
  }
  items.forEach((it) => {
    const li = document.createElement("li");
    li.textContent = `${it.datetime} — ${it.pet} (dueño: ${it.owner}) — ${it.type}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  try {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      form.reset();
      fetchAppointments();
      alert("Cita agendada correctamente");
    } else {
      alert("Error al agendar");
    }
  } catch (err) {
    console.error(err);
    alert("No se pudo conectar con el servidor");
  }
});

// cargar inicialmente
fetchAppointments();
