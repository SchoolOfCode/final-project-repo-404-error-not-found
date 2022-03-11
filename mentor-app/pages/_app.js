import Layout from '../components/layout'
import '../styles/globals.css'
import '../styles/AllMentors.module.css'
import '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from '@chakra-ui/react'
import App from '.'
import { AnimatePresence } from 'framer-motion'
import Title from 'antd/lib/skeleton/Title'
function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider>
        <Layout>
          <title>Mentor||ee</title>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AnimatePresence>
  )
}

export default MyApp
