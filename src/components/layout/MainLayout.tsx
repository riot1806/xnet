import { FC, PropsWithChildren } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav";
import ReplainChat from "../Replain";
import Target from "../Target/Target";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Target />
      <Footer />
      <ReplainChat />
    </>
  );
};

export default MainLayout;
