import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <p className="font-bold text-inherit">Legalingua</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="translate" aria-current="page">
            Translate
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="Team">Team</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
