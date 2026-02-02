<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>MiChamba IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Encuentra trabajo fácil 🚀</h1>

  <div class="filters">
    <input id="what" placeholder="Cargo o categoría (ej: técnico)">
    <input id="where" placeholder="Ciudad (ej: Monterrey)">
    <select id="remote">
      <option value="">Todos</option>
      <option value="remote">Remoto</option>
      <option value="onsite">Presencial</option>
    </select>
    <button onclick="searchJobs()">Buscar empleo</button>
  </div>

  <div id="jobs"></div>

  <script src="app.js"></script>
</body>
</html>
