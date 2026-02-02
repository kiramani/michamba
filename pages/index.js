import Head from 'next/head'
import { useState } from 'react'
import VacanteCard from '../components/VacanteCard'
import vacantesData from '../data/vacantes.json'
import '../styles/global.css'

export default function Home() {
  const [query, setQuery] = useState('') // Carrera / puesto
  const [minSalary, setMinSalary] = useState('') // Sueldo mínimo (string para control)
  const [city, setCity] = useState('') // Ciudad
  const [results, setResults] = useState(vacantesData) // resultados mostrados

  const handleSearch = (e) => {
    e.preventDefault()
    // Normalizar inputs
    const q = query.trim().toLowerCase()
    const c = city.trim().toLowerCase()
    const min = parseInt(minSalary, 10) || 0

    const filtered = vacantesData.filter((v) => {
      // Asegurarnos de que sueldo sea numérico
      const sueldo = typeof v.sueldo === 'number' ? v.sueldo : parseInt(v.sueldo, 10) || 0

      // Match por título/puesto (busca en título y en empresa opcionalmente)
      const matchesQuery =
        !q ||
        (v.titulo && v.titulo.toLowerCase().includes(q)) ||
        (v.puesto && v.puesto.toLowerCase().includes(q)) ||
        (v.categoria && v.categoria.toLowerCase().includes(q))

      // Match por ciudad
      const matchesCity = !c || (v.ciudad && v.ciudad.toLowerCase().includes(c))

      // Match por sueldo mínimo
      const matchesSalary = !min || sueldo >= min

      return matchesQuery && matchesCity && matchesSalary
    })

    setResults(filtered)
  }

  const handleReset = () => {
    setQuery('')
    setMinSalary('')
    setCity('')
    setResults(vacantesData)
  }

  return (
    <>
      <Head>
        <title>MiChamba | Encuentra empleo en México</title>
        <meta name="description" content="Busca empleos locales en México — MiChamba" />
      </Head>

      <main className="container">
        <h1 className="title">MiChamba</h1>
        <p className="subtitle">Encuentra empleo en México</p>

        <form className="searchForm" onSubmit={handleSearch}>
          <div className="row">
            <label>
              Carrera / Puesto
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. Desarrollador frontend, Contador..."
                aria-label="Carrera o puesto"
              />
            </label>

            <label>
              Sueldo mínimo (MXN)
              <input
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Ej. 15000"
                aria-label="Sueldo mínimo"
                min="0"
              />
            </label>

            <label>
              Ciudad
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. Ciudad de México, Guadalajara..."
                aria-label="Ciudad"
              />
            </label>
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">Buscar empleo</button>
            <button type="button" className="btn" onClick={handleReset}>Mostrar todos</button>
          </div>
        </form>

        <section className="results">
          <h2>Vacantes ({results.length})</h2>
          {results.length === 0 ? (
            <p>No se encontraron vacantes que coincidan con tu búsqueda.</p>
          ) : (
            <div className="grid">
              {results.map((v) => (
                <VacanteCard key={v.id} vacante={v} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
