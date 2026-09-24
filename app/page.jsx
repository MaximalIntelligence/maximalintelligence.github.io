"use client";

import { useRef, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <a id="header-left" href="/">
        <img id="logo" src="/logo.svg" alt="Maximal Intelligence Logo" />
        <h2 id="corporation-title">Maximal Intelligence</h2>
      </a>

      <div id="header-right">
        <button id="nav-button" type="button" onClick={() => setMenuOpen(open=>!open)}>☰</button>
        <nav id="nav-menu" className={menuOpen ? "" : "hidden-narrow"}>
          <a href="#problem" onClick={closeMenu}><h3>Problem</h3></a>
          <a href="#solution" onClick={closeMenu}><h3>Solution</h3></a>
          <a href="#platform" onClick={closeMenu}><h3>Platform</h3></a>
          <a href="#contact" onClick={closeMenu}><h3>Contact</h3></a>
        </nav>
      </div>
    </header>
  );
}



function Row({ left, right }) {
    return (
      <div className="row">
        <div className="center-block">
          <div className="left-block">{left}</div>
          <div className="right-block">{right}</div>
        </div>
      </div>
    );
}
  
export default function Home() {
    return (
      <>
      <Header />
      <main>
        <Row left="Hello" right="World" />
        <Row left={<h2>Titlewooo</h2>} right={<p>Description</p>} />
      </main>
      </>
    );
}