import { styled } from "styled-components";
import AppHeader from "../AppHeader";
import { useAppSelector } from "../../../containers/store";

const LayoutContainer = styled("div")`
  position: relative;
  ${(props) =>
    props.isAuth
      ? `background-image: url(https://truyenaudiocv.org/themes/truyenaudiocv/images/body-bg-tl.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  -moz-background-size: 100% auto;
  -o-background-size: 100% auto;
  background-size: 100% auto;
  padding: 1em 20px 0;`
      : ""}
`;
const Layout = (props) => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  return (
    <div style={{}}>
      <AppHeader />

      <LayoutContainer isAuth={isAuth}>
        {props.children}
      </LayoutContainer>
    </div>
  );
};

export default Layout;
