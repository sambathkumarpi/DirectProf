import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import TeacherModal from './components/modals/TeacherModal'
import Providers from './providers'

export const metadata = {
  title: 'DirectProf',
  description: 'DirectProf is a platform for direct-to-consumer education.',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children
} : {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <TeacherModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-24'>
            {children}
        </div>
      </Providers>
      </body>
    </html>
  )
}
