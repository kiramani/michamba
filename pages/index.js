import { useState, useEffect } from 'react';

export default function Home() {
  const [estudios, setEstudios] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [area, setArea] = useState('');
  const [resultados, setResultados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Simulación de base de datos de empleos
  const baseEmpleos = [
    {empresa:'Empresa A', puesto:'Operador de Producción', ciudad:'Monterrey', area:'Producción', sueldo:8000},
    {empresa:'Empresa B', puesto:'Analista de Logística', ciudad:'Monterrey', area:'Logística', sueldo:12000},
    {empresa:'Empresa C', puesto:'Desarrollador Web', ciudad:'Guadalajara', area:'Tecnología / Sistemas', sueldo:20000},
    {empresa:'Empresa D', puesto:'Auxiliar Contable', ciudad:'Monterrey', area:'Contabilidad', sueldo:9000},
    {empresa:'Empresa E', puesto:'Ingeniero de Mantenimiento', ciudad:'Monterrey', area:'Mantenimiento', sueldo:15000}
  ];

  // Permiso de geolocalización
  const obtenerUbicacion = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        console.log('Ubicación obtenida');
      }, err => {
        console.log('Usuario rechazó geolocalización');
      });
    }
  }

  const buscarEmpleos = () => {
    if(!ciudad){ alert('Debes indicar tu ciudad'); return; }
    obtenerUbicacion();

    let resultadosFiltrados = baseEmpleos.filter(emp => emp.ciudad.toLowerCase() === ciudad.toLowerCase());
    if(area) resultadosFiltrados = resultadosFiltrados.filter(emp => emp.area === area);
    if(sueldo) resultadosFiltrados = resultadosFiltrados.filter(emp => emp.sueldo >= parseInt(sueldo));

    setResultados(resultadosFiltrados);
  };

  const toggleFavorito = (puesto) => {
    if(favoritos.includes(puesto)){
      setFavoritos(favoritos.filter(f => f !== puesto));
      alert(puesto+' eliminado de favoritos');
    } else {
      setFavoritos([...favoritos, puesto]);
      alert(puesto+' agregado a favoritos');
    }
  };

  // Estadísticas
  const countCiudad = resultados.length;
  const topArea = resultados.length ? resultados.map(r=>r.area).sort((a,b) => resultados.filter(v=>v.area===a).length - resultados.filter(v=>v.area===b).length).pop() : 'N/A';

  return (
    <div style={{padding:'20px', fontFamily:'Arial, sans-serif', background:'#f4f6f8'}}>
      <h1 style={{textAlign:'center', marginBottom:'20px', color:'#1f2937'}}>Mi Chamba - Encuentra tu empleo</h1>

      <div style={{maxWidth:'600px', margin:'0 auto', background:'#fff', padding:'20px', borderRadius:'10px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)'}}>
        <div style={{marginBottom:'15px'}}>
          <label htmlFor="estudios" style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>¿Qué estudiaste?</label>
          <input type="text" id="estudios" value={estudios} onChange={(e)=>setEstudios(e.target.value)} placeholder="Opcional" style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label htmlFor="sueldo" style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Sueldo mínimo (MXN)</label>
          <input type="number" id="sueldo" value={sueldo} onChange={(e)=>setSueldo(e.target.value)} placeholder="Opcional" style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label htmlFor="ciudad" style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Ciudad <span style={{color:'red'}}>*</span></label>
          <input type="text" id="ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)} placeholder="Escribe tu ciudad" required style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label htmlFor="area" style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Área de interés</label>
          <select id="area" value={area} onChange={(e)=>setArea(e.target.value)} style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}>
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

        <button onClick={buscarEmpleos} style={{width:'100%', padding:'10px', borderRadius:'5px', border:'none', background:'#4f46e5', color:'#fff', cursor:'pointer', transition:'0.3s'}}>Buscar Empleo</button>
      </div>

      <div style={{maxWidth:'800px', margin:'20px auto', display:'flex', justifyContent:'space-around', background:'#fff', padding:'15px', borderRadius:'10px', boxShadow:'0 2px 6px rgba(0,0,0,0.1)'}}>
        <div style={{textAlign:'center'}}>
          <h4 style={{marginBottom:'5px', color:'#1f2937'}}>Empleos en tu ciudad</h4>
          <p style={{color:'#4b5563', fontWeight:'bold'}}>{countCiudad}</p>
        </div>
        <div style={{textAlign:'center'}}>
          <h4 style={{marginBottom:'5px', color:'#1f2937'}}>Área más solicitada</h4>
          <p style={{color:'#4b5563', fontWeight:'bold'}}>{topArea}</p>
        </div>
      </div>

      <div style={{maxWidth:'800px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:'20px'}}>
        {resultados.length === 0 ? (
          <div style={{textAlign:'center', color:'#ef4444', marginTop:'20px', fontWeight:'bold'}}>No se encontraron empleos cerca.</div>
        ) : (
          resultados.map((emp, i) => (
            <div key={i} style={{background:'#fff', padding:'15px', borderRadius:'10px', boxShadow:'0 2px 6px rgba(0,0,0,0.1)', opacity:1, transform:'translateY(0)', transition:'0.5s'}}>
              <span onClick={() => toggleFavorito(emp.puesto)} style={{color:'#f59e0b', cursor:'pointer', float:'right', fontWeight:'bold'}}>&#9734;</span>
              <h3 style={{marginBottom:'5px', color:'#1f2937'}}>{emp.puesto}</h3>
              <p style={{fontSize:'0.9em', marginBottom:'5px', color:'#4b5563'}}><strong>Empresa:</strong> {emp.empresa}</p>
              <p style={{fontSize:'0.9em', marginBottom:'5px', color:'#4b5563'}}><strong>Ciudad:</strong> {emp.ciudad}</p>
              <p style={{fontSize:'0.9em', marginBottom:'5px', color:'#4b5563'}}><strong>Sueldo:</strong> {emp.sueldo ? emp.sueldo+' MXN':''}</p>
              <p style={{fontSize:'0.9em', marginBottom:'5px', color:'#4b5563'}}><strong>Área:</strong> {emp.area}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
