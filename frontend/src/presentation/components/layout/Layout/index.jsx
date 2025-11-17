import { Outlet } from 'react-router-dom';
import { TranslationProvider } from '../../../../application/context/LanguageContext';
import ScrollToTop from '../../common/ScrollToTop'
import NavBar from '../../layout/NavBar';
import Footer from '../../layout/Footer';

function Layout() {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        <ScrollToTop />
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
}

export default Layout;