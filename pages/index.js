import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>MiChamba.js Encuentra empleo en México!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="MiChamba" />
        <p className=" Encuentra empleo en México según lo que estudiaste y lo que quieres ganar">
         Encuentra empleo en México según lo que estudiaste, el sueldo que buscas y tu ciudad.js</code>
        </p>
    <form
  onSubmit={(e) => {
    e.preventDefault()
    const career = e.target.career.value
    const salary = e.target.salary.value
    const city = e.target.city.value

    window.open(`https://mx.indeed.com/jobs?q=${career}&l=${city}&salary=${salary}`, '_blank')
  }}
>
  <input name="career" placeholder="¿Qué estudiaste?" required />
  <br /><br />
  <input name="salary" placeholder="Sueldo deseado (MXN)" required />
  <br /><br />
  <input name="city" placeholder="Ciudad" required />
  <br /><br />
  <button type="submit">Buscar empleo</button>
</form>

      </main>

      <Footer />
    </div>
  )
}
