import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #000;
  padding: 1rem;
`;

const Logo = styled.h1`
  color: #e50914;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 1rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>WatchingFlix</Logo>
        <div>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/add">Add New</StyledLink>
        </div>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;