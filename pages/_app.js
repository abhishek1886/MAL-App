import "@/styles/globals.css";
import { MyContextProvider } from "@/store/context";

export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}
