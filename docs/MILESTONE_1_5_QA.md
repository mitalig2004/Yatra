# Milestone 1.5 verification

Verified on 2 October 2026 against the local production build in Google Chrome.

## Added routes

- `/signup` — editorial account creation with local validation, password visibility and loading/error states.
- `/login` — complementary returning-user entry.
- `/forgot-password` — local reset-request and deterministic success state.
- `/trips` — authenticated Trips Home with the existing Goa plan as the primary current journey.

## Prototype authentication

Authentication is intentionally local and deterministic. The browser stores only the prototype user's name and email under `yatra-auth-v1`; there is no credential service, security boundary or real email delivery. Sign Up and Log In open Trips Home. Log Out clears the local session and returns to Landing. Direct unauthenticated access to Trips Home redirects to Log In.

The portfolio demo remains public. Both “Take a look around” and the existing Goa URLs bypass authentication, so a reviewer cannot be blocked from the signature planning experience.

## Trips Home

Trips Home leads with the user's greeting and one dominant Goa story. “Continue planning” opens the existing plan without resetting local itinerary state. “Plan another trip” opens the approved Create Trip flow. The journey collection includes only the live Goa trip and one clearly labeled decorative draft.

## Responsive and accessible behavior

- Desktop Sign Up and Log In use related but mirrored editorial split compositions.
- Mobile prioritizes identity, headline, form and actions; photography becomes a compact supporting panel.
- Mobile Trips Home follows greeting → Goa → Continue → Plan another → journeys.
- Forms use semantic labels, field-level descriptions, `aria-invalid`, live success/error messages, 44px or larger controls, keyboard-visible focus, and an accessible password visibility button.
- Motion uses the existing 200–450ms language and stops under `prefers-reduced-motion`.

## Regression coverage

- New user: Landing → Sign Up → Trips Home → Plan another trip → Create Trip.
- Returning user: Log In → Trips Home → Continue planning → Goa Plan.
- Reviewer: Landing → Explore demo → Goa Plan without authentication.
- Account: authenticated menu → Log Out → Landing.
- Forgot password: request → deterministic inbox success.
- Mobile: Sign Up, Log In, Forgot Password and Trips Home pass the configured axe WCAG A/AA scan and viewport-overflow check.
- The original four-test suite still passes: full café move/conflict/apply/budget/Undo journey, desktop drag/discard, mobile keyboard flow and supporting-route accessibility.

## Prototype boundaries

No backend, real credentials, email delivery, account recovery, profile settings, notifications, booking, payment, external travel API or collaboration feature was introduced. The local account state demonstrates product flow only.
