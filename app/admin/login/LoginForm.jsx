"use client";

import { createBuilderBrowserClient } from "@your-builder/next/auth";
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginForm({ config, destination }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!config) return;
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const client = createBuilderBrowserClient(config);
    const { error } = await client.auth.signInWithPassword({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });
    if (error) {
      setMessage("The email or password was not accepted.");
      setBusy(false);
      return;
    }
    window.location.assign(destination);
  }

  if (!config) return <p className={styles.notice} role="status">Owner login is not configured on this staging environment yet.</p>;

  return (
    <form className={styles.form} onSubmit={submit}>
      <label><span>Email</span><span className={styles.inputWrap}><Mail size={18} /><input name="email" type="email" autoComplete="email" required /></span></label>
      <label><span>Password</span><span className={styles.inputWrap}><LockKeyhole size={18} /><input name="password" type="password" autoComplete="current-password" required /></span></label>
      <button type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      {message ? <p className={styles.error} role="alert">{message}</p> : null}
    </form>
  );
}
