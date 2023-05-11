import GlobalMenu from "../globalMenu/GlobalMenu";

import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalMenu />
      <main>{children}</main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100wh - 16px);
  height: calc(100vh - 16px);
`;

export default Layout;
