import { redirect } from "next/navigation";
import { readPublicSupabaseConfig } from "@/builder/env.mjs";
import { requireGarciaMember } from "@/builder/auth.mjs";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const dynamic = "force-dynamic";

export const metadata = { title: "Owner sign in" };

export default async function LoginPage({ searchParams }) {
  try {
    await requireGarciaMember();
    redirect("/admin/editor");
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
  }

  const next = (await searchParams)?.next;
  const destination = typeof next === "string" && next.startsWith("/admin/") ? next : "/admin/editor";
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="login-title">
        <div className={styles.brandMark} aria-hidden="true">GB</div>
        <p className={styles.eyebrow}>Garcia Brothers</p>
        <h1 id="login-title">Owner workspace</h1>
        <p className={styles.intro}>Sign in with the staff account assigned to this website.</p>
        <LoginForm config={readPublicSupabaseConfig()} destination={destination} />
        <a className={styles.backLink} href="/">Return to website</a>
      </section>
    </main>
  );
}
