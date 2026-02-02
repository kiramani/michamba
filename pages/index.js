import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault()

    const career = e.target.career.value
    const salary = e.target.salary.value
    const city = e.target.city.value

    const query = `${career} ${salary}`
    const url = `https://mx.indeed.com/jobs?q=${encodeURIComponent(
      query
    )}&l=${encodeURIComponent(city)}`

    window.open(url, '_blank')
  }

  return (
    <div className="container">
      <Head>
        <title>MiChamba | Encuentra empleo en México</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="MiChamba" />

        <p className="description">
          Encuentra empleo en México según lo que estudiaste, el sueldo que
          buscas y tu ciudad.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="career"
            placeholder="¿Qué estudiaste o qué trabajo buscas?"
            required
          />
          <br />
          <br />

          <input
            name="salary"
            placeholder="Sueldo mensual deseado (MXN)"
            required
          />
          <br />
          <br />

          <input name="city" placeholder="Ciudad" required />
          <br />
          <br />

          <button type="submit">Buscar empleo</button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
