
  import React from "react";
  import {Accordion, AccordionItem} from "@nextui-org/react";
  
  export default function App() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
  
    const defaultContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  
    return (
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Story">
          We&apos;re the Legalingua team, a diverse bunch with backgrounds from Colombia, Russia, and the Philippines.
          Our journey to the United States has been filled with dreams, challenges, and a whole lot of paperwork.
          Picture this: you or your relatives move to a new country, and suddenly, you find yourselves face-to-face
          with heaps of legal documents. Bank papers, immigration forms, police reports – you name it. Now, imagine
          trying to understand every line, every detail, especially when the documents are in a language that&apos;s not
          your own. We&apos;ve been there. Whether it&apos;s explaining complex immigration paperwork to our parents or deciphering legal
          jargon ourselves, it&apos;s a struggle. And we bet many of you have been in similar shoes. It&apos;s not just about
          translating words; it&apos;s about grasping the meaning, the implications, and making sure nothing important gets
          lost in translation.
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Where legalingua comes?">
          But it&apos;s not just about the tech – it&apos;s about understanding. Legalingua isn&apos;t just a project; it&apos;s a heartfelt
          response to the real struggles faced by immigrants. We&apos;ve trained our own machine learning model on over 100
          legal documents, making sure it understands the nuances and intricacies of legal language.
          And this is just the beginning. Our vision for Legalingua extends beyond this hackathon. We want to expand our
          language support, enhance accuracy, and collaborate with legal experts. We&apos;re not just building a tool; we&apos;re
          building a bridge, a bridge that connects people, cultures, and understanding.
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="How we born?">
          So, here&apos;s to Legalingua – a little project born from our own journey, a project that we hope will make the
          immigration process a bit smoother, a bit less daunting, and a whole lot more human. Thanks for joining us on
          this adventure. Let&apos;s bridge those borders together!
        </AccordionItem>
      </Accordion>
    );
  }

  
