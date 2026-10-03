"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { useAuth } from "./auth-provider";

type AuthMode = "signup" | "login";

function PasswordField({
  value,
  onChange,
  error,
  newPassword = false,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  newPassword?: boolean;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="auth-field">
      <label htmlFor="auth-password">Password</label>
      <div className="auth-input password-input">
        <input
          id="auth-password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete={newPassword ? "new-password" : "current-password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : "password-help"}
          required
        />
        <button
          type="button"
          className="password-toggle"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((shown) => !shown)}
          disabled={disabled}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? (
        <small className="auth-error" id="password-error" role="alert">
          {error}
        </small>
      ) : (
        <small className="auth-help" id="password-help">Use at least 8 characters.</small>
      )}
    </div>
  );
}

export function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { signUp, logIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignUp = mode === "signup";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (isSignUp && !name.trim()) next.name = "Tell us what to call you.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a complete email address.";
    if (password.length < 8) next.password = "Password needs at least 8 characters.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;
    setBusy(true);
    window.setTimeout(() => {
      if (email.toLowerCase() === "unavailable@yatra.test") {
        setBusy(false);
        setFormError("We couldn’t open your trips just now. Please try another email.");
        return;
      }
      if (isSignUp) signUp(name, email);
      else logIn(email);
      router.push("/trips");
    }, reduce ? 0 : 450);
  };

  return (
    <main id="main" className={`auth-page auth-${mode}`}>
      <motion.section
        className="auth-content"
        initial={reduce ? false : { y: 24 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to YATRA
        </Link>
        <p className="eyebrow">{isSignUp ? "BEGIN YOUR YATRA" : "WELCOME BACK"}</p>
        <h1>
          {isSignUp ? (
            <>Make room for<br /><em>wherever comes next.</em></>
          ) : (
            <>Your next day<br /><em>is waiting.</em></>
          )}
        </h1>
        <p className="auth-intro">
          {isSignUp
            ? "Create your account to keep your trips, plans and possibilities together."
            : "Come back to the places, possibilities and plans you were shaping."}
        </p>
        <form className="auth-form" onSubmit={submit} noValidate>
          {isSignUp && (
            <label className="auth-field">
              <span>Name</span>
              <input
                name="name"
                autoComplete="name"
                value={name}
                disabled={busy}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((current) => ({ ...current, name: "" }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              {errors.name && <small className="auth-error" id="name-error" role="alert">{errors.name}</small>}
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              disabled={busy}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: "" }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && <small className="auth-error" id="email-error" role="alert">{errors.email}</small>}
          </label>
          <PasswordField
            value={password}
            onChange={(value) => {
              setPassword(value);
              setErrors((current) => ({ ...current, password: "" }));
            }}
            error={errors.password}
            newPassword={isSignUp}
            disabled={busy}
          />
          {!isSignUp && (
            <Link className="auth-forgot" href="/forgot-password">Forgot password?</Link>
          )}
          {formError && <p className="auth-form-error" role="alert">{formError}</p>}
          <button className="button primary auth-submit" disabled={busy} aria-busy={busy}>
            <span>{busy ? "Finding your way…" : isSignUp ? "Create account" : "Log in"}</span>
            {busy && <LoaderCircle className="auth-loader" size={18} aria-hidden="true" />}
          </button>
          <p className="auth-switch">
            {isSignUp ? "Already travelling with YATRA?" : "New to YATRA?"}{" "}
            <Link href={isSignUp ? "/login" : "/signup"}>
              {isSignUp ? "Log in" : "Create an account"}
            </Link>
          </p>
        </form>
      </motion.section>
      <motion.aside
        className="auth-visual"
        initial={reduce ? false : { x: 30, rotate: 1 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: 0.08 }}
        aria-label="Goa travel inspiration"
      >
        <img src="/images/goa-coast.jpg" alt="A quiet palm-lined coast in Goa" />
        <div className="auth-visual-copy">
          <span className="eyebrow">A PLACE TO BEGIN</span>
          <p>{isSignUp ? "The next chapter can start with one saved place." : "Your Goa days are right where you left them."}</p>
          <span><MapPin size={15} /> Goa, India</span>
        </div>
        <div className="auth-postcard" aria-hidden="true">
          <Mail size={17} /> Plans worth coming back to.
        </div>
      </motion.aside>
    </main>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <main id="main" className="forgot-page">
      <section className="forgot-panel">
        <Link href="/login" className="back-link"><ArrowLeft size={16} /> Back to log in</Link>
        {sent ? (
          <div className="forgot-success" role="status">
            <span className="success-mark"><Check size={24} /></span>
            <p className="eyebrow">RESET LINK SENT</p>
            <h1>Check your inbox.</h1>
            <p>We’ve sent password reset instructions to:</p>
            <strong>{email}</strong>
            <Link href="/login" className="button primary">Back to log in</Link>
          </div>
        ) : (
          <>
            <p className="eyebrow">A SMALL DETOUR</p>
            <h1>Find your way back.</h1>
            <p>Enter the email connected to your YATRA account and we’ll send you a reset link.</p>
            <form
              className="auth-form forgot-form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (!/^\S+@\S+\.\S+$/.test(email)) {
                  setError("Enter a complete email address.");
                  return;
                }
                setError("");
                setSent(true);
              }}
            >
              <label className="auth-field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "forgot-email-error" : undefined}
                  required
                />
                {error && <small className="auth-error" id="forgot-email-error" role="alert">{error}</small>}
              </label>
              <button className="button primary">Send reset link</button>
            </form>
            <p className="small muted">Prototype only · No email will be sent.</p>
          </>
        )}
      </section>
    </main>
  );
}
