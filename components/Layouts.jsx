import Head from 'next/head'
import Content from './Content'
import Header from './Header'
import Footer from './Footer'
import BottomNavigation from './BottomNavigation'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, name }) {
  const title = `Masjid Al-Barokah - ${name}`

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="preload"
          href="/fonts/Mushaf.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        /> */}
      </Head>
      <main className={inter.className}>
        {/* <Header /> */}
        <Content className="w-full">{children}</Content>
        {/* <Footer /> */}
        <BottomNavigation />
      </main>
    </div>
  )
}
