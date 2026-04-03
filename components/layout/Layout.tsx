/**
 * Main application layout component
 * Provides consistent header, footer, and drawer components across all pages
 * 
 * @param children - Page content to render between header and footer
 */
import Footer from "./Footer";
import Header from "./Header";
import CartDrawer from "../cart/CartDrawer";
import LoginDrawer from "../auth/LoginDrawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <LoginDrawer />
    </div>
  );
};

export default Layout;
