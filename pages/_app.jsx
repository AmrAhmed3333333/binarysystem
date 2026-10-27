import '@/styles/globals.css';
import SiteLayout from '@/components/layout/SiteLayout';

export default function App({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}
