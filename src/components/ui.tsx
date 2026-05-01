import Link from "next/link";
import { clsx } from "clsx";

export function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "gray" | "green" | "red" | "blue" | "yellow" }) {
  const tones = {
    gray: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-amber-100 text-amber-700"
  };
  return <span className={clsx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white">
      {title ? <div className="border-b border-line px-5 py-4 text-sm font-bold text-ink">{title}</div> : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx("w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand", props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx("min-h-24 w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={clsx("w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand", props.className)} />;
}

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={clsx("inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-blue-700", className)}>
      {children}
    </button>
  );
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
      {children}
    </Link>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border border-dashed border-line bg-slate-50 px-4 py-8 text-center text-sm text-muted">{children}</div>;
}
