import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/worker.js");
        }
    }, []);
    return <Component {...pageProps} />;
}


useEffect(() => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => console.log("Service Worker Registered", registration))
            .catch((err) => console.error("Service Worker Registration Failed", err));
    }
}, []);

export default MyApp;


