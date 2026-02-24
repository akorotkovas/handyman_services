"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HardHat,
  CalendarCheck,
  FolderTree,
  AlertTriangle,
  CreditCard,
  Settings,
  MessageSquare,
  Star,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Valdymo skydas", icon: LayoutDashboard },
  { href: "/users", label: "Vartotojai", icon: Users },
  { href: "/tradespeople", label: "Meistrai", icon: HardHat },
  { href: "/bookings", label: "Užsakymai", icon: CalendarCheck },
  { href: "/categories", label: "Kategorijos", icon: FolderTree },
  { href: "/disputes", label: "Ginčai", icon: AlertTriangle },
  { href: "/payments", label: "Mokėjimai", icon: CreditCard },
  { href: "/reviews", label: "Atsiliepimai", icon: Star },
  { href: "/verification", label: "Verifikacija", icon: Shield },
  { href: "/settings", label: "Nustatymai", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <div>
            <span className="font-bold text-lg">Handyman</span>
            <span className="text-[var(--color-primary-500)] font-bold"> Services</span>
            <span className="text-xs text-gray-400 ml-1.5">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary-50)] text-[var(--color-primary-500)]"
                      : "text-[var(--color-text-secondary)] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-400">
        Handyman Services Admin v0.1
      </div>
    </aside>
  );
}
