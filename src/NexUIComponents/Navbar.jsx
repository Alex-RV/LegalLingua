import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function App() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-black text-center py-2">
        <Link href="translate" aria-current="page" className="text-white">
          AI Summary Assistance for your legal documents. Skip the jargon now
          &nbsp;
          <AiOutlineArrowRight className="h-[20px] w-[20px]" />
        </Link>
      </div>
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
            <Link color="foreground" href="/">
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="blue-text" href="translate" aria-current="page">
              Translate
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
