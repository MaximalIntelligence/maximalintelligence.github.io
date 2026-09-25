"use client";

import { useRef, useState } from "react";

export function Logo() {
  return (
    <div className="logo">
      <img src="/logo.svg" className="logo-img" alt="Maximal Intelligence Logo"/>
      <div className="corporation-title-slogan">
        <h2 className="corporation-title">Maximal Intelligence</h2>
        <p className="corporation-slogan">Natural, Artificial, Maximal</p>
      </div>
      <img src="/logo-mark.svg" className="logo-mark-img" alt="Maximal Intelligence Logo Mark" />
    </div>
  )
}

export function Header({sections = []}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("no-scroll");
  }

  return (
    <header>
      <div id="header-content">
        <a id="header-left" href="/">
          <Logo />
        </a>

        <div id="header-right">
          {sections.length > 0 && (
          <>
          <button 
            id="nav-button" 
            type="button" 
            onClick={() => (setMenuOpen(open=>!open), document.body.classList.toggle("no-scroll"))}>
              ☰
          </button>
          <nav id="nav-menu" className={menuOpen ? "" : "hidden-narrow"}>
            {sections.map(id=>(
              <a key={id} href={`#${id}`} onClick={closeMenu}><h3>{id.charAt(0).toUpperCase() + id.slice(1)}</h3></a>
            ))}
          </nav>
          </>
          )}
        </div>
      </div>
    </header>
  );
}