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
          <p className="font-bold text-inherit text-xl">LegalLingua</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Other Navbar content */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link className="text-xl" color="foreground" href="/">
            Story
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-xl" color="foreground" href="translate">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
