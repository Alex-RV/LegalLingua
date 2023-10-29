import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


export default function App() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
       
        <p className="font-bold text-inherit">Legalingua</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Story
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="translate" aria-current="page">
            mvp
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="translate">
            Integrations
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

