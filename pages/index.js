import Head from 'next/head'
import { useState } from 'react'

const JOBS = [
  {
    title: 'Técnico en Plásticos',
    company: 'Plásticos del Norte',
    city: 'Monterrey',
    salary: 12000,
    link: 'https://mx.indeed.com/viewjob?jk=1',
  },
  {
    title: 'Operador de Inyección',
    company: 'Moldeos Industriales',
    city: 'Apodaca',
    salary: 10000,
    link: 'https://mx.occ.com.mx/empleo/2',
  },
  {
    title: 'Técnico Electromecánico',
    company: 'Maquila SA',
    city: 'San Nicolás',
    salary: 15000,
    link: 'https://www.computrabajo.com.mx/ofertas/3',
  },
]

export default function Home() {
  const [results, setResults] = useState([])

  const buscar = (e) => {
    e.preventDefault()

    const career = e.target.career.value.toLowerCase()
    const salary = parseInt(e.target.salary.value)
    const city = e.target.city.value.toLowerCase()

    const filtrados = JOBS.filter((job) =>
      job.title.toLowerCase().includes(career) &&
      job.city.toLowerCase().includes(city) &&
      job.salary >= salary
    )

    setResults(filtrados)
  }

  return (
    <>
      <Head>
        <title>MiChamba | Empleos en México</title>
      </Head>

      <main>
        <h1>MiChamba</h1>
        <p>
          Encuentra empleo en México según lo que estudiaste, el sueldo que
          buscas y tu ciudad.
        </p>

        <form onSubmit={buscar}>
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

        <section>
          {results.length === 0 && (
            <p>Aquí aparecerán las vacantes 👇</p>
          )}

          {results.map((job, i) => (
            <div key={i} className="card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.city}</p>
              <p>${job.salary} MXN</p>
              <a href={job.link} target="_blank">
                Ver vacante
              </a>
            </div>
          ))}
        </section>
      </main>

      <style jsx>{`
        main {
          max-width: 600px;
          margin: auto;
          padding: 40px 20px;
          font-family: Arial;
        }

        h1 {
          text-align: center;
        }

        p {
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
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

        .card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .card a {
          display: inline-block;
          margin-top: 10px;
          background: #0070f3;
          color: white;
          padding: 8px 12px;
          text-decoration: none;
          border-radius: 5px;
        }
      `}</style>
    </>
  )
}

