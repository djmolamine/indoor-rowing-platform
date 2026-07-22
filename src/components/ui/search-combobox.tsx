"use client";

import { useId, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

export interface ComboboxOption {
  id: string;
  label: string;
  description?: string;
}

export function SearchCombobox({ label, value, options, placeholder, onChange, required = false, disabled = false }: { label: string; value: string; options: ComboboxOption[]; placeholder: string; onChange: (id: string) => void; required?: boolean; disabled?: boolean }) {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const selectedOption = options.find((option) => option.id === value);
  const [query, setQuery] = useState(selectedOption?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = options.filter((option) => !normalizedQuery || option.label.toLocaleLowerCase().includes(normalizedQuery)).slice(0, 80);

  function choose(option: ComboboxOption) {
    setQuery(option.label);
    onChange(option.id);
    setOpen(false);
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="text-xs font-bold text-[#475b54]">{label}</label>
      <div className="relative mt-1.5">
        <Search size={16} className="pointer-events-none absolute left-3 top-3.5 text-[#718078]" aria-hidden="true" />
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[activeIndex] ? `${listboxId}-${filtered[activeIndex].id}` : undefined}
          required={required}
          disabled={disabled}
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => !disabled && setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => { setQuery(event.target.value); onChange(""); setOpen(true); setActiveIndex(0); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); setActiveIndex((index) => Math.min(index + 1, filtered.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
            if (event.key === "Enter" && open && filtered[activeIndex]) { event.preventDefault(); choose(filtered[activeIndex]); }
            if (event.key === "Escape") setOpen(false);
          }}
          className="min-h-11 w-full rounded-xl border border-[#ccd6d1] bg-white py-2 pl-9 pr-10 text-sm font-bold text-[#13211d] outline-none transition focus:border-[#16725e] focus:ring-2 focus:ring-[#16725e]/20 disabled:cursor-not-allowed disabled:bg-[#eef3f0] disabled:text-[#718078]"
        />
        <ChevronsUpDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-[#718078]" aria-hidden="true" />
      </div>
      {open && <ul id={listboxId} role="listbox" className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-[#ccd6d1] bg-white p-1 shadow-xl">
        {filtered.length > 0 ? filtered.map((option, index) => <li id={`${listboxId}-${option.id}`} key={option.id} role="option" aria-selected={value === option.id} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(option)} className={`flex cursor-pointer items-start gap-2 rounded-lg px-3 py-2 text-sm ${index === activeIndex ? "bg-[#eef3f0]" : "hover:bg-[#f5f7f4]"}`}><Check size={15} className={`mt-0.5 shrink-0 ${value === option.id ? "text-[#16725e]" : "text-transparent"}`} aria-hidden="true" /><span><strong className="block">{option.label}</strong>{option.description && <span className="mt-0.5 block text-xs font-normal text-[#718078]">{option.description}</span>}</span></li>) : <li className="px-3 py-3 text-sm text-[#718078]">No matching options</li>}
      </ul>}
    </div>
  );
}
