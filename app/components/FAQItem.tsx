'use client'

import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
        open ? 'border-pink/30 bg-page-soft' : 'border-border bg-page'
      }`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-pink/[0.03] transition-colors"
        aria-expanded={open}
        type="button"
      >
        <span className="font-body font-semibold text-ink text-sm leading-relaxed pr-2">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-pink shrink-0 transition-transform duration-200 mt-0.5 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="pt-3 border-t border-border">
            <p className="font-body text-ink-muted text-sm leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}
