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
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
