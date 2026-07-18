"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  icon: "home" | "search" | "plus" | "activity" | "profile";
};

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/publicaciones", label: "Explorar", icon: "search" },
  { href: "/publicaciones/nueva", label: "Publicar", icon: "plus" },
  { href: "/actividad", label: "Actividad", icon: "activity" },
  { href: "/cuenta", label: "Perfil", icon: "profile" },
];

function NavigationIcon({ icon }: { icon: NavigationItem["icon"] }) {
  const commonProps = {
    className: "size-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  if (icon === "home") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }

  if (icon === "plus") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    );
  }

  if (icon === "activity") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M5 18h14" />
        <path d="M7 14h2v4H7z" />
        <path d="M11 9h2v9h-2z" />
        <path d="M15 12h2v6h-2z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" {...commonProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function isActive(pathname: string, href: string, label: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (label === "Publicar") {
    return pathname.startsWith("/publicaciones/nueva");
  }

  if (label === "Explorar") {
    return (
      pathname === "/publicaciones" ||
      (pathname.startsWith("/publicaciones/") &&
        !pathname.startsWith("/publicaciones/nueva"))
    );
  }

  return pathname === href;
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegacion principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-soft bg-surface/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(32,35,31,0.08)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1">
        {navigationItems.map((item) => {
          const active = isActive(pathname, item.href, item.label);
          const publish = item.label === "Publicar";

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-extrabold transition ${
                publish
                  ? "bg-primary text-white shadow-sm"
                  : active
                    ? "bg-primary-soft text-primary-strong"
                    : "text-muted hover:bg-surface-soft hover:text-foreground"
              }`}
              href={item.href}
              key={item.label}
            >
              <NavigationIcon icon={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
