"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, WifiOff, X, Undo2 } from "lucide-react";
import { useTrip } from "./trip-provider";
import { useAuth } from "./auth-provider";
export function Header() {
  const path = usePathname();
  const router = useRouter();
  const { user, ready, logOut } = useAuth();
  const isPlanner = path === "/trip/goa/plan";
  const isInsideTrip = path.startsWith("/trip/");
  const isAuth = ["/signup", "/login", "/forgot-password"].includes(path);
  return (
    <header className={`site-header ${isPlanner ? "site-header-planner" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Yatra home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="presentation">
            <circle cx="16" cy="16" r="13" />
            <path d="M9.5 9.5 16 16l6.5-6.5M16 16v7" />
            <circle className="brand-route-dot" cx="22.5" cy="9.5" r="2.2" />
          </svg>
        </span>
        YATRA
      </Link>
      <span className="header-tagline">Good journeys leave room.</span>
      <nav aria-label="Main navigation">
        {path !== "/" && !isAuth && path !== "/trips" && (
          <Link className="header-link" href="/">
            The Yatra way <ArrowUpRight size={16} />
          </Link>
        )}
        {ready && user ? (
          <details className="account-menu">
            <summary aria-label={`Open account menu for ${user.name}`}>
              <span aria-hidden="true">{user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
              <strong>{user.name.split(/\s+/)[0]}</strong>
            </summary>
            <div>
              <Link href="/trips">Trips</Link>
              <button
                onClick={() => {
                  logOut();
                  router.push("/");
                }}
              >
                Log out
              </button>
            </div>
          </details>
        ) : (
          !isAuth && !isInsideTrip && (
            <div className="header-auth-actions">
              <Link className="header-login" href="/login">Log in</Link>
              <Link className="header-start" href="/signup">Start planning</Link>
            </div>
          )
        )}
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        YATRA <span className="muted">— Make room for the journey.</span>
      </span>
      <span className="footer-story">
        A product exploration by <strong>Mitali Giri</strong>
        <Link href="/work/yatra">Read the case study <ArrowUpRight size={14} /></Link>
      </span>
    </footer>
  );
}
export function TripNav({
  active,
}: {
  active: "overview" | "plan" | "budget";
}) {
  return (
    <nav className="trip-nav" aria-label="Trip navigation">
      {(["overview", "plan", "budget"] as const).map((tab) => (
        <Link
          key={tab}
          href={`/trip/goa${tab === "overview" ? "" : `/${tab}`}`}
          aria-current={active === tab ? "page" : undefined}
        >
          {tab === "overview" ? "Overview" : tab === "plan" ? "Plan" : "Budget"}
        </Link>
      ))}
    </nav>
  );
}
export function Status() {
  const { offline, storageError } = useTrip();
  return (
    <>
      {offline && (
        <div className="status-banner">
          <WifiOff size={16} /> Offline · Your local plan is still available.
          Images already loaded remain visible.
        </div>
      )}
      {storageError && (
        <div className="status-banner warning" role="alert">
          Changes could not be saved on this device. Keep this tab open to
          preserve your work.
        </div>
      )}
    </>
  );
}
export function Notice() {
  const { notice, setNotice, history, undo } = useTrip();
  const reduce = useReducedMotion();
  return notice ? (
    <motion.div
      className="confirmation"
      role="status"
      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0 : 0.26, ease: "easeOut" }}
    >
      <Check size={18} />
      <span>{notice}</span>
      {history.length > 0 && (
        <button onClick={undo}>
          <Undo2 size={16} /> Undo
        </button>
      )}
      <button
        className="icon-button"
        aria-label="Dismiss confirmation"
        onClick={() => setNotice("")}
      >
        <X size={16} />
      </button>
    </motion.div>
  ) : null;
}
export function Modal({
  title,
  eyebrow,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const el = ref.current;
    const origin = document.activeElement as HTMLElement | null;
    el?.showModal();
    const cancel = (e: Event) => {
      e.preventDefault();
      closeRef.current();
    };
    el?.addEventListener("cancel", cancel);
    return () => {
      el?.removeEventListener("cancel", cancel);
      el?.close();
      if (origin?.isConnected) origin.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      aria-labelledby="modal-title"
    >
      <div className="modal-head">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id="modal-title">{title}</h2>
        </div>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function PageIntro({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{step}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
