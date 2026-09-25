"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Header } from "../components/header";
import { Lattice } from "../components/lattice";
import { NewsletterForm, ContactForm } from "../components/forms";
import CrystalLattice from "../components/CrystalLattice";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;


function Row({ id, children }) {
    return (
      <div id={id} className="row">
        <div className="center-content">
          {children}
        </div>
      </div>
    );
}


function md(strings, ...values) {
  return <ReactMarkdown>{String.raw(strings, ...values)}</ReactMarkdown>;
}

const hero_message = md`
# Data management for domain knowledge

Maximal Intelligence optimally integrates human understanding and AI`;

`
# Maximal Intelligence is the optimal combination of human understanding and AI.

It is data management for domain knowledge.`;

`
# Context Management That Merges Human Understanding And AI

A new data management for domain knowledge that unlocks the context needed to understand your data.`;


const hero = (<>
  <div id="hero-left">
    {hero_message}
  </div>
  <div id="hero-right">
    <CrystalLattice />
  </div>
</>);

const interest_content = md`
## Interested?`;

const interest = (<div>
  {interest_content} <NewsletterForm />
</div>);
  
export default function Home() {
    return (
      <>
      <Header sections={["problem", "contact"]}/>
      <main>
        <Row id="phone-title"><h1>Maximal Intelligence</h1></Row>
        <Row id="hero">{hero}</Row>
        <Row id="interest">{interest}</Row>
      </main>
      </>
    );
}