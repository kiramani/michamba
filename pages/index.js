import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'

const JOBS = [
  {
    title: 'Técnico en Plásticos',
    company: 'Plásticos del Norte',
    city: 'Monterrey',
    salary: 12000,
    link: 'https://example.com/vacante1',
  },
  {
    title: 'Técnico Electromecánico',
    company: 'Maquila Industrial SA',
    city: 'San Nicolás',
    salary: 15000,
    link: 'https://example.com/vacante2',
  },
  {
    title: 'Operador de Inyección',
    company: 'Moldeos MX',
    city: 'Apodaca',
    salary: 10000,
    link: 'https://example.com/vacante3',
  },
]

export default function Home() {
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()

    const career = e.target.career.value.toLowerCase()
    const salary = parseInt(e.target.salary.value)
    const city = e.target.city.value.toLowerCase()

    const filtered = JOBS.filter((job) => {
      return (
        job.title.toLowerCase().includes(career) &&
        job.city.toLowerCase().includes(city) &&
        job.salary >= salary
      )
    })

    setResults(filtered)
  }

  return (
    <div className="container">
      <Head>
        <title>MiChamba | Encuentra empleo en México</title>
      </Head>

      <main>
        <Header title="MiChamba" />

        <p className="description">
          Encuentra trabajos según lo que estudiaste, el sueldo que buscas y tu
          ciudad.
        </p>

        <form onSubmit={handleSearch} className="form">
          <input name="career" placeholder="¿Qué estudiaste?" required />
          <input
            name="salary"
            type="number"
            placeholder="Sueldo mínimo (MXN)"
            required
          />
          <input name="city" placeholder="Ciudad" required />
          <button type="submit">Buscar empleo</button>
        </form>

        <section className="jobs">
          {results.length === 0 && (
            <p className="no-results">
              Aquí aparecerán las vacantes 👇
            </p>
          )}

          {results.map((job, i) => (
            <div className="job-card" key={i}>
              <h3>{job.title}</h3>
              <p>
                <strong>Empresa:</strong> {job.company}
              </p>
              <p>
                <strong>Ciudad:</strong> {job.city}
              </p>
              <p>
                <strong>Sueldo:</strong> ${job.salary} MXN
              </p>
              <a href={job.link} target="_blank">
                Ver vacante
              </a>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .description {
          text-align: center;
          margin-bottom: 20px;
        }

        .form {
          max-width: 400px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        input {
          padding: 10px;
          font-size: 16px;
        }

        button {
          padding: 10px;
          background: black;
          color: white;
          border: none;
          cursor: pointer;
        }

        .jobs {
          margin-top: 30px;
          display: grid;
          gap: 15px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .job-card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          background: #fafafa;
        }

        .job-card h3 {
          margin: 0 0 5px 0;
        }

        .job-card a {
          display: inline-block;
          margin-top: 10px;
          color: white;
          background: #0070f3;
          padding: 8px 12px;
          border-radius: 5px;
          text-decoration: none;
        }

        .no-results {
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  )
}


      <Footer />
    </div>
  )
}
