import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="generation-page">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>This place isn’t on our map.</h1>
      <p>Let’s get you back to your Goa plans.</p>
      <Link className="button primary" href="/trip/goa/plan">
        Back to the itinerary
      </Link>
    </main>
  );
}
