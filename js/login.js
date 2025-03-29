document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
  
    // Llamamos al script de Google Apps con la función fetch
    fetch("https://script.google.com/macros/s/AKfycbzUnNWuAkdEMUCXbOal9A9oJvs7JzlwV-0uMX5CR9hNc_qQhGEAmmhqmucA71sg5Qwl/exec", {  // Reemplaza con la URL de tu Web App
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.valid) {
        if (data.role === "admin") {
          window.location.href = "admin_dashboard.html";  // Redirigir al panel de admin
        } else if (data.role === "user") {
          window.location.href = "user_dashboard.html";   // Redirigir al panel de usuario
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  });
  window.onload = function () {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../login.html"; // Redirigir si no hay sesión
    } else {
        document.getElementById("userName").textContent = user.fullname; // Mostrar nombre del usuario
    }

    // Bloquear botón "atrás"
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
};

// Cerrar sesión
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("user"); // Eliminar datos de sesión
    window.location.href = "../login.html"; // Volver al login
});
const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const role = document.querySelector('#role').value;
    const errorMessage = document.querySelector('#errorMessage');

    if (!email || !password || !role) {
        alert("Completa todos los campos.");
        return;
    }

    try {
        // URL del script de Google Apps Script que obtiene los datos
        const apiUrl = "TU_URL_DE_GOOGLE_APPS_SCRIPT";  
        
        // Realiza la petición a la API de Google Sheets
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Buscar usuario en la base de datos de Google Sheets
        let user = data.find(u => u.email === email && u.password === password && u.role === role);

        if (user) {
            // Guardar usuario en localStorage
            localStorage.setItem("user", JSON.stringify(user));

            alert("Inicio de sesión exitoso.");
            window.location.href = user.role === 'admin' ? "interfaz_admin/inicio1.html" : "interfaz_user/inicio.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        alert("Error en la conexión con Google Sheets.");
    }
});
function doGet() {
    var sheet = SpreadsheetApp.openById("TU_SHEET_ID").getSheetByName("Usuarios");
    var data = sheet.getDataRange().getValues();
    
    var users = [];
    for (var i = 1; i < data.length; i++) { 
    users.push({
        email: data[i][0],
        password: data[i][1],
        fullname: data[i][2],
        role: data[i][3]
    });
    }
    
    return ContentService.createTextOutput(JSON.stringify(users)).setMimeType(ContentService.MimeType.JSON);