const url = 'https://script.google.com/macros/s/AKfycbwyXLJUzplMfy88RRa-G1s1Bzxv1SzW0j175aABT9Zg_K55Rsiopbg4WNqofAiqmtxS/exec'; // Sustituye con la URL del web app que obtuviste en Google Apps Script

// Función para obtener los datos
fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.data; // Los datos están en la propiedad 'data'
    
    // Accedemos a la tabla del HTML
    const tabla = document.getElementById('tabla').getElementsByTagName('tbody')[0];
    
    // Recorremos las filas de la hoja de cálculo y las mostramos en la tabla
    rows.forEach(row => {
      const tr = document.createElement('tr');
      const tdCategoria = document.createElement('td');
      tdCategoria.textContent = row.categoria;  // Columna A (Categoría)
      const tdDescripcion = document.createElement('td');
      tdDescripcion.textContent = row.descripcion;  // Columna B (Descripción)
      
      tr.appendChild(tdCategoria);
      tr.appendChild(tdDescripcion);
      tabla.appendChild(tr);
    });
  })
  .catch(error => console.error('Error al obtener los datos:', error));