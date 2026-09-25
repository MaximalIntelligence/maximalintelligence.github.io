"use client";

import { useRef, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Each rendered instance has its own state and submission scope.
function SubmissionForm({ id, statusId, endpoint, successMessage, children }) {
  const [status, setStatus] = useState("idle");
  const inFlight = useRef(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    
    inFlight.current = true;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    fetch(`${API_BASE}/landing-page/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), })
    .then(res => res.ok ? (form.reset(), setStatus("success")) : setStatus("error") )
    .catch( () => setStatus("error") )
    .finally( () => inFlight.current=false );
  }

  return (
    <>
      <form id={id} onSubmit={handleSubmit}>
        {children}
      </form>
      {status === "success" && (<p id={statusId}>{successMessage}</p>)}
      {status === "error" && (
        <p id={statusId}>
          There was an error. Please try again later or email{" "}
            <a href="mailto:hello@maximalintelligence.com">
              hello@maximalintelligence.com
            </a>.
        </p>)}
    </>
  );
}

export function NewsletterForm() {
  return (
    <SubmissionForm
      id="newsletter-form"
      statusId="status"
      endpoint="interest"
      successMessage="Thanks for reaching out!"
    >
      <input name="email" type="email" autoComplete="email" placeholder="email" required />
      <button type="submit">hear from us!</button>
    </SubmissionForm>
  );
}

export function ContactForm() {
  return (
    <SubmissionForm
      id="contact-form"
      statusId="status-contact"
      endpoint="contact"
      successMessage="Thanks for reaching out! Someone will follow up as soon as possible."
    >
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Name
        <input
          type="text"
          name="name"
          required
          minLength={1}
          maxLength={100}
          pattern={String.raw`[^\x00-\x1F\x7F]+`}
          title="Control characters are not allowed"
          autoComplete="name"
        />
      </label>
      <label>
        Affiliation
        <input
          type="text"
          name="affiliation"
          maxLength={100}
          pattern={String.raw`[^\x00-\x1F\x7F]+`}
          title="Control characters are not allowed"
          autoComplete="organization"
        />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={1} maxLength={1000} />
      </label>
    </SubmissionForm>
  );
}
