# Summit Coaching Institute

This repository currently contains a dependency-free responsive product prototype. Open
[`index.html`](./index.html) directly in a browser to preview the public site, role login,
student portal, attendance, updates, calendar, tests/results, fees, receipts, notices, and
messaging flows.

## Production implementation plan

Recommended stack: Next.js App Router, TypeScript, Tailwind/shadcn UI, Supabase Auth +
PostgreSQL + Storage, and an API worker for notifications and payment webhooks.

### Database schema

Use UUID primary keys and `created_at`, `updated_at` timestamps on every table:

| Table | Important fields |
|---|---|
| `users` | `id`, `auth_user_id`, `role` (`admin`, `faculty`, `student`, `parent`), `name`, `email`, `phone`, `avatar_url` |
| `students` | `id`, `user_id`, `roll_no`, `batch_id`, `date_of_birth`, `emergency_contact` |
| `parents` | `id`, `user_id` |
| `parent_students` | `parent_id`, `student_id`, `relationship`, `is_primary` |
| `courses` | `id`, `name`, `description`, `fee`, `duration`, `active` |
| `batches` | `id`, `course_id`, `name`, `faculty_id`, `room`, `starts_on`, `ends_on` |
| `batch_students` | `batch_id`, `student_id`, `enrolled_on`, `status` |
| `attendance_sessions` | `id`, `batch_id`, `faculty_id`, `starts_at`, `expires_at`, `qr_nonce`, `geofence` |
| `attendance` | `id`, `session_id`, `student_id`, `status`, `marked_at`, `source`, `latitude`, `longitude`; unique `(session_id, student_id)` |
| `notifications` | `id`, `recipient_id`, `channel`, `template`, `payload`, `status`, `provider_id`, `attempts`, `last_error` |
| `updates` | `id`, `batch_id`, `author_id`, `topic`, `homework`, `announcement`, `test_result`, `published_at` |
| `tests` | `id`, `batch_id`, `name`, `max_marks`, `scheduled_at` |
| `marks` | `id`, `test_id`, `student_id`, `marks`, `percentage`, `rank`; unique `(test_id, student_id)` |
| `fees` | `id`, `student_id`, `course_id`, `installment_no`, `amount`, `due_on`, `status` |
| `payments` | `id`, `fee_id`, `amount`, `method`, `gateway`, `gateway_payment_id`, `paid_at` |
| `receipts` | `id`, `payment_id`, `receipt_no`, `pdf_path`, `issued_at` |
| `notices` | `id`, `author_id`, `title`, `body`, `audience_type`, `batch_id`, `published_at` |
| `messages` | `id`, `sender_id`, `recipient_id`, `body`, `read_at`, `sent_at` |
| `audit_logs` | `id`, `actor_id`, `action`, `entity_type`, `entity_id`, `metadata`, `created_at` |

### Local setup

1. Create a Next.js TypeScript app and install Supabase SSR, Zod, Tailwind,
   shadcn/ui, Resend/SendGrid, Twilio/MSG91, and Razorpay/Stripe SDKs.
2. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, notification provider keys, and payment webhook secrets
   to `.env.local`. Never expose service keys in the browser.
3. Apply migrations for the tables above, seed one admin, faculty, parent, student,
   course, batch, fee schedule, test, and attendance session.
4. Implement server actions/API routes for each write. Validate all payloads with Zod,
   re-check role and ownership server-side, and use database transactions for attendance,
   marks, fees, and notification fan-out.

### Security requirements

- Enforce Supabase RLS: students can read only their own rows; parents can read only rows
  reachable through `parent_students`; faculty can write only assigned batches; admins
  manage institute data.
- Store passwords only in the managed auth provider; use secure, HTTP-only sessions,
  HTTPS, CSRF protection for cookie-authenticated mutations, and strict input/output
  encoding to prevent XSS.
- Rate-limit login, OTP, QR scan, messaging, and payment endpoints. QR nonces must expire,
  be single-use per student/session, and optionally validate a short geofence.
- Keep provider secrets server-side. Verify payment webhooks, retry notifications with
  exponential backoff, and persist delivery status.
- Audit attendance edits, marks changes, fee adjustments, exports, role changes, and
  sensitive profile access. Minimize PII in logs and generated reports.

The current prototype intentionally uses browser-local demo interactions and placeholder
providers; it does not claim to provide production authentication, payments, or backend
authorization until the API and RLS layer is added.

## Previewing the four portals

Click **Login** and select any role. The demo accepts any login and password with at least
three characters, then opens a role-specific workspace:

- **Student:** personal progress, classes, tests, fees, attendance, and batch feed.
- **Parent:** linked-child attendance, results, fee account, notices, and messages.
- **Faculty:** assigned batches, QR/manual attendance, updates, marks entry, and parent messaging.
- **Admin:** institute-wide enrollment, revenue, fee follow-up, attendance, results, notices, and communication.

The selected role controls the dashboard data and hides tools that role should not use. This
is a client-side preview only; production permission enforcement belongs in server routes and
database RLS policies described above.
