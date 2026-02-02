<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Chamba - Buscador de Empleo</title>
    <style>
        /* Reset básico */
        * { margin:0; padding:0; box-sizing:border-box; font-family: Arial, sans-serif; }
        body { background: #f4f6f8; color: #333; padding: 20px; }
        h1 { text-align:center; margin-bottom: 20px; color:#1f2937; }

        /* Formulario */
        .form-container { max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom:15px; }
        label { display:block; margin-bottom:5px; font-weight:bold; }
        input, select, button { width:100%; padding:10px; border-radius:5px; border:1px solid #ccc; }
        button { background:#4f46e5; color:#fff; border:none; cursor:pointer; transition:0.3s; }
        button:hover { background:#4338ca; }

        /* Resultados */
        .results { margin-top:30px; max-width:800px; margin-left:auto; margin-right:auto; display:grid; grid-template-columns: repeat(auto-fit, minmax(250px,1fr)); gap:20px; }
        .card { background:#fff; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1); opacity:0; transform:translateY(20px); transition:0.5s; }
        .card.show { opacity:1; transform:translateY(0); }
        .card h3 { margin-bottom:5px; color:#1f2937; }
        .card p { font-size:0.9em; margin-bottom:5px; color:#4b5563; }
        .favorites { color:#f59e0b; cursor:pointer; float:right; font-weight:bold; }

        /* Mensaje sin resultados */
        .no-results { text-align:center; color:#ef4444; margin-top:20px; font-weight:bold; }

        /* Estadísticas */
        .stats { max-width:800px; margin:20px auto; display:flex; justify-content:space-around; background:#fff; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
        .stat { text-align:center; }
        .stat h4 { margin-bottom:5px; color:#1f2937; }
        .stat p { color:#4b5563; font-weight:bold; }
    </style>
</head>
<body>

<h1>Mi Chamba - Encuentra tu empleo</h1>

<div class="form-container">
    <div class="form-group">
        <label for="estudios">¿Qué estudiaste?</label>
        <input type="text" id="estudios" placeholder="Opcional">
    </div>
    <div class="form-group">
        <label for="sueldo">Sueldo mínimo (MXN)</label>
        <input type="number" id="sueldo" placeholder="Opcional">
    </div>
    <div class="form-group">
        <label for="ciudad">Ciudad <span style="color:red;">*</span></label>
        <input type="text" id="ciudad" placeholder="Escribe tu ciudad" required>
    </div>
    <div class="form-group">
        <label for="area">Área de interés</label>
        <select id="area">
            <option value="">Cualquiera</option>
            <option>Producción</option>
            <option>Operaciones</option>
            <option>Ventas</option>
            <option>Logística</option>
            <option>Recursos Humanos</option>
            <option>Mantenimiento</option>
            <option>Atención al Cliente</option>
            <option>Tecnología / Sistemas</option>
            <option>Finanzas</option>
            <option>Contabilidad</option>
            <option>Compras</option>
            <option>Control de calidad</option>
            <option>Marketing</option>
            <option>Almacén</option>
            <option>Publicidad</option>
            <option>Salud Ocupacional</option>
            <option>Seguridad Industrial</option>
            <option>Planificación Estratégica</option>
            <option>Investigación y Desarrollo (I+D)</option>
            <option>Abastecimiento</option>
        </select>
    </div>
    <button id="buscar">Buscar Empleo</button>
</div>

<div class="stats">
    <div class="stat">
        <h4>Empleos en tu ciudad</h4>
        <p id="countCiudad">0</p>
    </div>
    <div class="stat">
        <h4>Área más solicitada</h4>
        <p id="topArea">N/A</p>
    </div>
</div>

<div class="results" id="results"></div>
<div class="no-results" id="noResults" style="display:none;">No se encontraron empleos cerca.</div>

<script>
// Variables globales
let empleos = [];
let favoritos = [];

// Simulación de base de datos de empleos
const baseEmpleos = [
    {empresa:'Empresa A', puesto:'Operador de Producción', ciudad:'Monterrey', area:'Producción', sueldo:8000},
    {empresa:'Empresa B', puesto:'Analista de Logística', ciudad:'Monterrey', area:'Logística', sueldo:12000},
    {empresa:'Empresa C', puesto:'Desarrollador Web', ciudad:'Guadalajara', area:'Tecnología / Sistemas', sueldo:20000},
    {empresa:'Empresa D', puesto:'Auxiliar Contable', ciudad:'Monterrey', area:'Contabilidad', sueldo:9000},
    {empresa:'Empresa E', puesto:'Ingeniero de Mantenimiento', ciudad:'Monterrey', area:'Mantenimiento', sueldo:15000}
];

// Permiso de geolocalización
function obtenerUbicacion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            console.log('Ubicación obtenida');
        }, err => {
            console.log('Usuario rechazó geolocalización');
        });
    }
}

// Buscar empleos
function buscarEmpleos(){
    const estudios = document.getElementById('estudios').value.trim();
    const sueldo = document.getElementById('sueldo').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const area = document.getElementById('area').value;

    if(!ciudad){ alert('Debes indicar tu ciudad'); return; }

    obtenerUbicacion();

    // Filtrado
    let resultados = baseEmpleos.filter(emp => emp.ciudad.toLowerCase() === ciudad.toLowerCase());
    if(area) resultados = resultados.filter(emp => emp.area === area);
    if(sueldo) resultados = resultados.filter(emp => emp.sueldo >= parseInt(sueldo));

    // Mostrar resultados
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML='';

    if(resultados.length===0){
        document.getElementById('noResults').style.display='block';
    } else {
        document.getElementById('noResults').style.display='none';
        resultados.forEach(emp => {
            const card = document.createElement('div');
            card.className='card';
            card.innerHTML=`<span class="favorites" onclick="toggleFavorito('${emp.puesto}')">&#9734;</span>
                <h3>${emp.puesto}</h3>
                <p><strong>Empresa:</strong> ${emp.empresa}</p>
                <p><strong>Ciudad:</strong> ${emp.ciudad}</p>
                <p><strong>Sueldo:</strong> ${emp.sueldo ? emp.sueldo+' MXN':''}</p>
                <p><strong>Área:</strong> ${emp.area}</p>`;
            resultsDiv.appendChild(card);
            setTimeout(()=>{ card.classList.add('show'); }, 100);
        });
    }

    // Estadísticas
    document.getElementById('countCiudad').textContent=resultados.length;
    const areas = resultados.map(r=>r.area);
    const topArea = areas.sort((a,b) => areas.filter(v=>v===a).length - areas.filter(v=>v===b).length).pop() || 'N/A';
    document.getElementById('topArea').textContent = topArea;
}

// Favoritos
function toggleFavorito(puesto){
    if(favoritos.includes(puesto)){
        favoritos = favoritos.filter(f=>f!==puesto);
        alert(puesto+' eliminado de favoritos');
    } else {
        favoritos.push(puesto);
        alert(puesto+' agregado a favoritos');
    }
}

document.getElementById('buscar').addEventListener('click', buscarEmpleos);
</script>

</body>
</html>

