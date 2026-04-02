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
