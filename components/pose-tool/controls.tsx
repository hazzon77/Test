"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function GroupLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn("mb-2.5 text-[13px] font-medium tracking-[-0.01em] text-tool-text first:mt-0", className)}>{children}</p>
}

export function ExpandableChips({
  items,
  selected,
  onSelect,
  cols = 2,
  visible = 3,
  chipClassName,
}: {
  items: string[]
  selected?: string | null
  onSelect?: (v: string) => void
  cols?: number
  visible?: number
  chipClassName?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? items : items.slice(0, visible)
  const hidden = items.length - visible
  return (
    <div>
      <ChipGrid cols={cols}>
        {shown.map((it) => (
          <Chip
            key={it}
            selected={it === selected}
            onClick={() => onSelect?.(it)}
            className={chipClassName}
          >
            {it}
          </Chip>
        ))}
      </ChipGrid>
      {hidden > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-[12px] text-tool-muted hover:text-tool-text"
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
          {expanded ? "收起" : `展开其余 ${hidden} 项`}
        </button>
      ) : null}
    </div>
  )
}

export function SectionNote({ children }: { children: React.ReactNode }) {
  return <p className="mb-3.5 text-[12px] leading-[1.6] text-tool-muted">{children}</p>
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 mt-5 text-[12px] text-tool-muted">{children}</p>
}

export function Chip({
  children,
  selected,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex h-9 items-center justify-center rounded-lg border px-3 text-[13px] transition-colors",
        "border-tool-border bg-tool-panel text-tool-text hover:bg-tool-hover",
        selected && "border-tool-sel-border bg-tool-sel-bg text-tool-sel-text hover:bg-tool-sel-bg",
        disabled && "cursor-not-allowed text-tool-muted opacity-50 hover:bg-tool-panel",
        className,
      )}
    >
      {children}
    </button>
  )
}

export function ChipGrid({
  cols = 2,
  children,
}: {
  cols?: number
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  )
}

export function ToolSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: {
  label?: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-1.5">
      {label ? <p className="mb-1.5 text-[13px] text-tool-text">{label}</p> : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="tool-range w-full"
        style={{
          background: `linear-gradient(to right, var(--tool-primary) 0%, var(--tool-primary) ${pct}%, var(--tool-track) ${pct}%, var(--tool-track) 100%)`,
        }}
      />
    </div>
  )
}
