import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop=()=> {
  const { pathname } = useLocation(); // Detecta cambios en la URL

  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la vista al inicio
  }, [pathname]);

  return null; // No renderiza nada
}

export default ScrollToTop;