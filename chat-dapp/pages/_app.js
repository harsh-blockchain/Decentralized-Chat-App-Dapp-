import "../styles/globals.css";
import { ChatAppProvider } from "../context/context";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChatAppProvider>
      <Component {...pageProps} />
    </ChatAppProvider>
  );
}

export default MyApp;
