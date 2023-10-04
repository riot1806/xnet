import { FC, PropsWithChildren } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
