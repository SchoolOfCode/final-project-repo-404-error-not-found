import Layout from "../components/layout";
import "../styles/globals.css";
import { getStaticProps } from "./allMentors";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
