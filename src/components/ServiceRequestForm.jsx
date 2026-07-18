"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const consentText = "I agree that Garcia Brothers may contact me about this service request.";

export default function ServiceRequestForm({ services }) {
  const turnstileHost = useRef(null);
  const widgetId = useRef(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !turnstileHost.current || !window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(turnstileHost.current, {
        sitekey: siteKey,
        action: "service_request",
        callback: setToken,
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };
    const existing = document.querySelector('script[data-garcia-turnstile="true"]');
    if (existing) render();
    else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.garciaTurnstile = "true";
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    const timer = window.setInterval(render, 250);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [siteKey]);

  async function submit(event) {
    event.preventDefault();
    if (!token) {
      setStatus({ state: "error", message: "Complete the security check before sending your request." });
      return;
    }
    setStatus({ state: "sending", message: "Sending your request..." });
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/forms/service-request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        firstName: String(form.get("firstName") ?? ""),
        lastName: String(form.get("lastName") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        zipCode: String(form.get("zipCode") ?? ""),
        serviceId: String(form.get("service") ?? ""),
        urgency: String(form.get("urgency") ?? "standard"),
        message: String(form.get("message") ?? ""),
        consentAcknowledged: form.get("consentAcknowledged") === "on",
        consentPolicyVersion: "privacy-v1",
        consentAcknowledgement: consentText,
        turnstileToken: token,
        idempotencyKey: crypto.randomUUID(),
      }),
    });
    if (!response.ok) {
      setStatus({ state: "error", message: "The request could not be sent. Please try again or call (551) 379-0300." });
      if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
      setToken("");
      return;
    }
    event.currentTarget.reset();
    if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
    setToken("");
    setStatus({ state: "sent", message: "Request received. Garcia Brothers can now review the service details." });
  }

  return (
    <form className="form-grid" onSubmit={submit} data-builder-region="forms.service-request" data-builder-kind="sections">
      <div className="field"><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required maxLength="80" /></div>
      <div className="field"><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required maxLength="80" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength="320" /></div>
      <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength="30" /></div>
      <div className="field"><label htmlFor="zipCode">Service ZIP code</label><input id="zipCode" name="zipCode" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" required maxLength="10" /></div>
      <div className="field"><label htmlFor="urgency">Urgency</label><select id="urgency" name="urgency" defaultValue="standard"><option value="standard">Standard service</option><option value="urgent">Urgent, within 24 hours</option><option value="emergency">Emergency, no heat or cooling</option></select></div>
      <div className="field full"><label htmlFor="service">Service needed</label><select id="service" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></div>
      <div className="field full"><label htmlFor="message">What is happening?</label><textarea id="message" name="message" rows="5" required maxLength="2000" placeholder="Describe the system, symptoms, and when the issue started." /></div>
      <label className="consent-field full"><input name="consentAcknowledged" type="checkbox" required /><span>{consentText}</span></label>
      <input type="hidden" name="cf-turnstile-response" value={token} readOnly />
      <div className="turnstile-field full" ref={turnstileHost} />
      {!siteKey ? <p className="form-status error full" role="status">Online requests are not configured on this staging environment. Please call (551) 379-0300.</p> : null}
      <button className="button secondary" type="submit" disabled={!siteKey || status.state === "sending"}><Send size={18} />{status.state === "sending" ? "Sending..." : "Request service"}</button>
      {status.message ? <p className={`form-status ${status.state} full`} role={status.state === "error" ? "alert" : "status"}>{status.state === "sent" ? <CheckCircle2 size={18} /> : null}{status.message}</p> : null}
    </form>
  );
}
