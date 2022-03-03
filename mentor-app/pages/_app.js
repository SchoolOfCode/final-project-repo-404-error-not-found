import Layout from "../components/layout";
import "../styles/globals.css";
import "../styles/AllMentors.module.css";
import "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from ".";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Layout>
  );
}

export default MyApp;
