const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />

      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
