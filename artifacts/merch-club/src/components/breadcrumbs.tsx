import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
  className?: string;
}

export default function Breadcrumbs({ items, theme = "dark", className = "" }: BreadcrumbsProps) {
  const isDark = theme === "dark";
  const baseColor = isDark ? "text-white/50" : "text-black/50";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-black";
  const currentColor = isDark ? "text-white" : "text-black";
  const sepColor = isDark ? "text-white/25" : "text-black/25";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${baseColor}`}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={`${baseColor} ${hoverColor} transition-colors`}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? currentColor : baseColor} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className={sepColor}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[], baseUrl = "https://merchclub.com") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };
}
