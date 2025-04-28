document.getElementById('solicitud-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const data = {
      id: Date.now(),
      correo: document.getElementById('correo').value,
      direccion: document.getElementById('direccion').value,
      fecha: document.getElementById('fecha').value,
      tipo: document.getElementById('tipo').value,
      descripcion: document.getElementById('descripcion').value,
      estado: "pendiente"
    };
  
    const response = await fetch('http://127.0.0.1:5000/requests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      alert('Solicitud creada correctamente');
      cargarSolicitudes();
    } else {
      alert('Error al crear la solicitud');
    }
  });
  
  async function cargarSolicitudes() {
    const response = await fetch('http://127.0.0.1:5000/requests/');
    const solicitudes = await response.json();
  
    const tbody = document.getElementById('solicitudes-body');
    tbody.innerHTML = '';
    solicitudes.forEach(solicitud => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${solicitud.id}</td>
        <td>${solicitud.correo}</td>
        <td>${solicitud.direccion}</td>
        <td>${solicitud.fecha}</td>
        <td>${solicitud.tipo}</td>
        <td>${solicitud.estado}</td>
        <td>
          <button class="btn" onclick="cancelarSolicitud(${solicitud.id})">Cancelar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  async function cancelarSolicitud(id) {
    const response = await fetch(`http://127.0.0.1:5000/requests/cancelar-ultima`, { method: 'DELETE' });
    if (response.ok) {
      alert('Solicitud cancelada correctamente');
      cargarSolicitudes();
    } else {
      alert('Error al cancelar la solicitud');
    }
  }
  
  cargarSolicitudes();