"use client";

import { useActionState, useId, useState } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { ENQUIRY_TYPES, INITIAL_ENQUIRY_STATE } from "@/lib/enquiry";
import TurnstileWidget from "@/components/TurnstileWidget";

const labelCls = "mb-2 block text-[13px] font-semibold text-[#0B1F44]";
const inputCls =
  "w-full rounded-lg border border-[#DCE4F0] bg-[#F2F9FF] px-4 text-[15px] text-[#0B1F44] placeholder:text-[#7C8BA7] transition-colors focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/25 aria-[invalid=true]:border-red-400";

function Field({
  uid,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
  defaultValue,
  error,
}: {
  uid: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue: string;
  error?: string;
}) {
  const id = `${uid}-${name}`;
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputCls} h-12`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const uid = useId();
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    INITIAL_ENQUIRY_STATE,
  );
  const [token, setToken] = useState<string | null>(null);
  const { values, errors } = state;

  return (
    <form
      action={formAction}
      className="rounded-[26px] border border-line bg-white p-6 shadow-[0_24px_60px_-28px_rgba(0,76,140,0.35)] sm:p-8 lg:p-10"
    >
      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field
          uid={uid}
          name="name"
          label="Name"
          placeholder="Full name"
          autoComplete="name"
          required
          defaultValue={values.name}
          error={errors.name}
        />
        <Field
          uid={uid}
          name="company"
          label="Company"
          placeholder="Organisation"
          autoComplete="organization"
          defaultValue={values.company}
          error={errors.company}
        />
        <Field
          uid={uid}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          defaultValue={values.email}
          error={errors.email}
        />
        <Field
          uid={uid}
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+91 00000 00000"
          autoComplete="tel"
          defaultValue={values.phone}
          error={errors.phone}
        />
      </div>

      {/* Type of enquiry: full-width dropdown, same look as the Message box below */}
      <div className="mt-6">
        <label htmlFor={`${uid}-type`} className={labelCls}>
          Type of Enquiry
        </label>
        <div className="relative">
          <select
            id={`${uid}-type`}
            name="type"
            required
            defaultValue={values.type}
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? `${uid}-type-error` : undefined}
            className={`${inputCls} h-12 cursor-pointer appearance-none pr-11 invalid:text-[#7C8BA7]`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="text-[#0B1F44]">
                {t.label}
              </option>
            ))}
          </select>
          {/* Custom arrow (the native one is hidden by appearance-none) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-blue"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {errors.type && (
          <p id={`${uid}-type-error`} className="mt-1.5 text-[13px] text-red-600">
            {errors.type}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor={`${uid}-message`} className={labelCls}>
          Message
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          required
          placeholder="How can we help?"
          defaultValue={values.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={`${inputCls} min-h-[112px] resize-y py-3`}
        />
        {errors.message && (
          <p
            id={`${uid}-message-error`}
            className="mt-1.5 text-[13px] text-red-600"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-company-website`}>Company website</label>
        <input
          id={`${uid}-company-website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Token from the CAPTCHA widget, verified on the server */}
      <input type="hidden" name="captchaToken" value={token ?? ""} />

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <TurnstileWidget
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            resetKey={state}
            onToken={setToken}
          />
          {errors.captcha && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.captcha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending || !token}
          className="h-[50px] shrink-0 rounded-full bg-brand-blue px-8 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#123a85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit Enquiry"}
        </button>
      </div>

      {/* Always rendered so the layout doesn't jump when a message appears */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-5 min-h-[1.5rem] text-sm ${
          state.status === "success"
            ? "text-emerald-700"
            : state.status === "error"
              ? "text-red-600"
              : "text-transparent"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
