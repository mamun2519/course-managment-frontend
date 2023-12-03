import { useEffect } from "react";
import Header from "../components/shared/Header";
import { getUserInfo } from "../services/user";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slice/userSlice";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userInfo: { userId: string } = getUserInfo();
  useEffect(() => {
    dispatch(setUser({ userId: userInfo.userId, email: null }));
  }, [userInfo.userId]);

  return (
    <div>
      <Header />

      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
