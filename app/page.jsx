"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Header } from "../components/header";
import { Lattice } from "../components/lattice";
import { NewsletterForm, ContactForm } from "../components/forms";
import CrystalLattice from "../components/CrystalLattice";
import DelaunayNetwork from "../components/DelaunayNetwork";

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


const problem_left = md`
## Real-world context is missing from files and schemas that require domain knowledge to interpret

## When experts leave, knowledge leaves with them and isn't stored in backups or any kind of data lake

## In an era where data is the moat, that loss is devastating but unnecessary
`;

const problem = (<div className="describer">
  <h3>problem</h3>
  <div id="problem-content">
    <div>{problem_left}</div>
    <img src="/landing-page_problem_revised.svg" />
  </div>
</div>);


const solution = (<div className="describer">
  <h3>solution</h3>
  <div id="solution-content">
    <div>
      <h2>Maximal Intelligence makes it easy to get context and get going with:</h2>
      <div id="solution-banner">
        <h4>Data Engineering</h4>
        <h4>Analytics & Modeling</h4>
        <h4>AI Integration</h4>
      </div>
    </div>
    <DelaunayNetwork duration={30000} />
  </div>
</div>);

const products = (<div id="product-content">
  <h1>Products</h1>
  <a href="#products">
    <h2>Semflow</h2>
    Schemas that standardize filenames and turn folders into datasets with APIs.
  </a>
  <a href="#products">
    <h2>Insights</h2>
    SemFlow with a GUI and AI analysis.
  </a>
</div>);


const contact = (<>

</>);

export default function Home() {
  return (
    <>
      <Header sections={["solution", "products", "contact"]} />
      <main>
        <Row id="phone-title"><h1>Maximal Intelligence</h1></Row>
        <Row id="hero">{hero}</Row>
        <Row id="interest">{interest}</Row>
        <Row id="problem">{problem}</Row>
        <Row id="solution">{solution}</Row>
        <Row id="products">{products}</Row>
        <Row id="contact"><div><h1>Ready to go maximal or want to learn more?</h1><ContactForm /></div></Row>
      </main>
    </>
  );
}