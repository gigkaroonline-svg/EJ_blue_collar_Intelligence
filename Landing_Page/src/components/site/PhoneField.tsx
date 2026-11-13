"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  FlagImage,
  defaultCountries,
  parseCountry,
  usePhoneInput,
  type CountryIso2,
} from "react-international-phone";
import "react-international-phone/style.css";
import type { Field } from "@/content/forms";
import { cn } from "@/lib/utils";

type CountryOption = ReturnType<typeof parseCountry>;

function buildOptions() {
  return defaultCountries
    .map((item) => parseCountry(item))
    .sort((a, b) => {
      // Keep India first; everyone else A–Z.
      if (a.iso2 === "in") return -1;
      if (b.iso2 === "in") return 1;
      return a.name.localeCompare(b.name);
    });
}

export function PhoneField({
  field,
  prefix,
  error,
}: {
  field: Field;
  prefix: string;
  error?: string | undefined;
}) {
  const id = `${prefix}-${field.name}`;
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [e164, setE164] = useState("");

  const countries = useMemo(() => buildOptions(), []);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "in",
      value: e164,
      // Dial code lives on the country button only — don't repeat +91 in the input.
      disableDialCodeAndPrefix: true,
      onChange: (data) => setE164(data.phone),
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.includes(q) ||
        c.dialCode.includes(q.replace(/^\+/, "")),
    );
  }, [query, countries]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    queueMicrotask(() => searchRef.current?.focus());
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const describedBy =
    [error ? `${id}-error` : null, field.hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  function pickCountry(iso2: CountryIso2) {
    setCountry(iso2, { focusOnInput: true });
    setOpen(false);
    setQuery("");
  }

  const noResults = filtered.length === 0;

  return (
    <div className="sm:col-span-2" ref={rootRef}>
      <label htmlFor={id} className="text-sm font-medium">
        {field.label}
      </label>

      <div
        className={cn(
          "mt-2 flex overflow-hidden rounded-md border bg-card transition-colors",
          error ? "border-destructive" : "border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        )}
      >
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 border-r border-input bg-muted/40 px-2.5 py-2.5 text-sm hover:bg-muted"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={`Country: ${country.name}. Change country`}
          onClick={() => setOpen((value) => !value)}
        >
          <FlagImage iso2={country.iso2} className="h-4 w-5 rounded-[2px]" />
          <span className="font-mono text-xs tabular-nums">+{country.dialCode}</span>
          <ChevronDown
            className={cn("h-3.5 w-3.5 text-muted-foreground transition", open && "rotate-180")}
            aria-hidden
          />
        </button>

        <input
          id={id}
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          required={!field.optional}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          placeholder="Phone number"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
        />
        {/* E.164 value for form submit / zod */}
        <input type="hidden" name={field.name} value={e164} />
      </div>

      {open ? (
        <div
          id={listId}
          className="relative z-50"
          role="dialog"
          aria-label="Select country"
        >
          <div className="absolute left-0 right-0 top-2 overflow-hidden rounded-xl border border-border bg-card shadow-lift">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search country or code"
                className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search countries"
              />
            </div>
            <div className="max-h-64 overflow-y-auto py-1">
              {noResults ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No countries match “{query.trim()}”.
                </p>
              ) : (
                <ul role="listbox" aria-label="Countries">
                  {filtered.map((item) => {
                    const selected = item.iso2 === country.iso2;
                    return (
                      <li key={item.iso2}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={cn(
                            "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-sky-pale",
                            selected && "bg-sky-pale text-brand",
                          )}
                          onClick={() => pickCountry(item.iso2)}
                        >
                          <FlagImage iso2={item.iso2} className="h-4 w-5 shrink-0 rounded-[2px]" />
                          <span className="min-w-0 flex-1 truncate">{item.name}</span>
                          <span className="shrink-0 font-mono text-xs text-muted-foreground">
                            +{item.dialCode}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {field.hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
          {field.hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
