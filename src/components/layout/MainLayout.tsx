import { FC, PropsWithChildren } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* Header */}
      <main>{children}</main>
      {/* Footer */}
    </>
  );
};

export default MainLayout;
