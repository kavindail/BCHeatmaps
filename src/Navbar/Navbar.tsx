import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthProvider } from "../AuthProvider/AuthProviderWrapper";

interface NavProps {
  hidden: boolean;
}

interface LineProps {
  open: boolean;
}

interface OverlayProps {
  open: boolean;
}

const Nav = styled.nav<NavProps>`
  font-family: "Karla", sans-serif !important;
  font-weight: 300;
  min-height: 5em;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 5px;
  padding-top: 1.2em;
  z-index: 5;
  background: #000000;
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  transition: top 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    top: ${({ hidden }) => (hidden ? "-100%" : "0")};
  }
`;

const Logo = styled.h1`
  padding-top: 0px;
  position: relative;
  color: white;
  z-index: 20;
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;

  @media (min-width: 1920px) {
    padding-left: 3%;
  }

  @media (min-width: 769px) {
    padding-left: 3%;
  }

  @media (max-width: 768px) {
    padding-left: 3.2%;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: auto;
  padding-right: 5%;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  li:nth-child(4) {
    margin: 0px 20px;
  }
  li:nth-child(6) {
    margin: 0px 20px;
  }

  @media (max-width: 1300px) {
    padding-right: 0%;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const Item = styled.li``;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 0.7rem;
  font-size: 1.05rem;

  transition: color 0.2s ease;

  &:hover {
    color: #ccc;
  }
`;

const Line = styled.span<LineProps>`
  display: none;
  width: 54%;
  height: 0.13rem;
  background-color: #fff;
  z-index: 10;
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;

  @media (max-width: 900px) {
    display: block;
    position: absolute;
    height: 0.13rem;
    transition:
      opacity 0.1s ease-out,
      top 0.2s ease-in-out,
      transform 0.3s ease-in-out;

    &:nth-child(1) {
      top: ${({ open }) => (open ? "50%" : "24%")};
      transform: ${({ open }) =>
        open ? "translateY(-50%) rotate(45deg)" : "translateY(0%)"};
    }

    &:nth-child(2) {
      height: 0.13rem;
      opacity: ${({ open }) => (open ? 0 : 1)};
      top: ${({ open }) => (open ? "50%" : "46%")};
      transform: ${({ open }) =>
        open ? "translateY(-50%)" : "translateY(0%)"};
    }

    &:nth-child(3) {
      top: ${({ open }) => (open ? "50%" : "68%")};
      transform: ${({ open }) =>
        open ? "translateY(-50%) rotate(-45deg)" : "translateY(0%)"};
    }
  }
`;

const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2.1rem;
  width: 2.8rem;
  position: relative;
  z-index: 10;
  margin-right: 0rem;

  @media (min-width: 901px) {
    display: block;
  }
`;

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000000;
  transition:
    visibility 0.2s,
    opacity 0.3s ease-in-out;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? 1 : 0)};

  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul<OverlayProps>`
  list-style: none;
  position: absolute;
  top: 6%;
  transform: translateX(0%);
  font-weight: 300;
  width: 100%;
  text-align: center;
  font-size: 50px;
  padding-top: 49%;

  li {
    opacity: 0;
    font-size: 3.5rem;
    visibility: hidden;
    transition:
      visibility 0.2s,
      opacity 0.3s ease-in-out;
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    opacity: ${(props) => (props.open ? 1 : 0)};

    &:nth-child(1) {
      transition-delay: 0.1s;
    }

    &:nth-child(2) {
      transition-delay: 0.2s;
    }

    &:nth-child(3) {
      transition-delay: 0.3s;
    }
  }

  a {
    font-size: 2rem;
    text-decoration: none;
    font-weight: 0;
  }
`;

const Navbar = () => {
  const { isAuthenticated } = useAuthProvider();
  console.log("nav: ", isAuthenticated);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      setTimeout(() => {
        navigate(path);
      }, 30);
      handleCloseMenu();
    };
  };

  const useScrollDirection = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
      const onScroll = () => {
        const currentPosition = window.pageYOffset;
        if (currentPosition > lastScrollTop && currentPosition > 50) {
          setHidden(true);
        } else if (currentPosition < lastScrollTop) {
          setHidden(false);
        }
        setLastScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, [lastScrollTop]);

    return hidden;
  };

  const hidden = useScrollDirection();
  const [toggle, toggleNav] = useState(false);

  const handleCloseMenu = () => {
    toggleNav(false);
  };

  const colors = [
    "rgba(255, 0, 0, 0.8)",
    "rgba(255, 69, 0, 0.8)",
    "rgba(255, 127, 80, 0.8)",
    "rgba(255, 165, 0, 0.8)",
    "rgba(255, 215, 0, 0.8)",
    "rgba(173, 255, 47, 0.8)",
    "rgba(124, 252, 0, 0.8)",
    "rgba(50, 205, 50, 0.8)",
    "rgba(128, 128, 128, 0.8)",
    "rgba(169, 169, 169, 0.8)",
    "rgba(211, 211, 211, 0.8)",
  ];

  return (
    <>
      <Nav hidden={hidden}>
        <Logo onClick={handleNavigate("/")}>
          <p>
            {Array.from("ON_HEATMAPS").map((letter, index) => (
              <span
                key={index}
                style={{ color: colors[index % colors.length] }}
              >
                {letter}
              </span>
            ))}
          </p>
        </Logo>
        <Menu>
          {isAuthenticated && (
            <Item>
              <StyledLink
                onClick={handleNavigate("/favorites")}
                href="/favorites"
              >
                Favorites
              </StyledLink>
            </Item>
          )}
          {!isAuthenticated && (
            <Item>
              <StyledLink onClick={handleNavigate("/login")} href="/login">
                Login
              </StyledLink>
              <StyledLink onClick={handleNavigate("/signup")} href="/signup">
                Signup
              </StyledLink>
            </Item>
          )}
        </Menu>
        <NavIcon onClick={() => toggleNav(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <Overlay open={toggle}>
        <OverlayMenu open={toggle}>
          {isAuthenticated && (
            <Item>
              <StyledLink
                onClick={handleNavigate("/favorites")}
                href="/favorites"
              >
                Favorites
              </StyledLink>
            </Item>
          )}

          {!isAuthenticated && (
            <Item>
              <StyledLink onClick={handleNavigate("/login")} href="/login">
                Login
              </StyledLink>
            </Item>
          )}

          {!isAuthenticated && (
            <Item>
              <StyledLink onClick={handleNavigate("/signup")} href="/signup">
                Signup
              </StyledLink>
            </Item>
          )}
        </OverlayMenu>
      </Overlay>
    </>
  );
};

export default Navbar;
