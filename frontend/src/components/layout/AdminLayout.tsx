"use client";

import React from "react";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarBotanical() {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      className="admin-sidebar-botanical"
      aria-hidden="true"
    >
      <path
        d="M100 290 C100 290 98 218 102 148 C106 88 100 50 100 32"
        stroke="rgba(168,213,186,0.28)"
        strokeWidth="1.5"
      />
      <path
        d="M100 168 C68 152 38 126 30 96 C22 64 52 56 76 72 C92 84 99 138 100 168Z"
        fill="rgba(168,213,186,0.10)"
        stroke="rgba(168,213,186,0.24)"
        strokeWidth="1.2"
      />
      <path
        d="M100 168 C76 140 48 112 30 96"
        stroke="rgba(168,213,186,0.16)"
        strokeWidth="0.9"
      />
      <path
        d="M100 218 C138 194 172 162 178 126 C184 88 152 80 128 98 C113 112 103 180 100 218Z"
        fill="rgba(168,213,186,0.08)"
        stroke="rgba(168,213,186,0.20)"
        strokeWidth="1.2"
      />
      <path
        d="M100 218 C130 188 170 158 178 126"
        stroke="rgba(168,213,186,0.13)"
        strokeWidth="0.9"
      />
      <path
        d="M100 120 C78 106 56 84 54 62 C52 42 74 36 90 50 C99 62 100 104 100 120Z"
        fill="rgba(168,213,186,0.07)"
        stroke="rgba(168,213,186,0.18)"
        strokeWidth="1"
      />
      <path
        d="M100 88 C122 70 148 50 152 28 C156 8 128 2 113 18 C104 30 100 74 100 88Z"
        fill="rgba(168,213,186,0.07)"
        stroke="rgba(168,213,186,0.18)"
        strokeWidth="1"
      />
      <path
        d="M100 256 C72 238 46 214 44 184 C42 152 68 146 90 162 C100 172 100 234 100 256Z"
        fill="rgba(168,213,186,0.06)"
        stroke="rgba(168,213,186,0.14)"
        strokeWidth="1"
      />
      <circle cx="30" cy="95" r="2.5" fill="rgba(168,213,186,0.38)" />
      <circle cx="178" cy="126" r="2.5" fill="rgba(168,213,186,0.28)" />
      <circle cx="54" cy="61" r="1.8" fill="rgba(168,213,186,0.32)" />
      <circle cx="152" cy="27" r="1.8" fill="rgba(168,213,186,0.25)" />
    </svg>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-content">
          <Link href="/painel/anamneses" className="admin-sidebar-brand">
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
                fill="rgba(168,213,186,0.55)"
              />
              <path
                d="M16 30 C14 22 12 14 14 8"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
              />
            </svg>
            <div>
              <div className="admin-sidebar-name">Nutrivivi</div>
              <div className="admin-sidebar-badge">Painel Admin</div>
            </div>
          </Link>

          <div className="admin-sidebar-botanical-wrap">
            <SidebarBotanical />
          </div>

          <nav className="admin-nav-links">
            <p className="admin-nav-section-label">Menu</p>
            <Link
              href="/painel/anamneses"
              className={`admin-nav-link${
                pathname === "/painel/anamneses" ||
                pathname?.startsWith("/painel/anamneses/")
                  ? " active"
                  : ""
              }`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Anamneses
            </Link>
          </nav>

          <div className="admin-sidebar-footer">
            <Link href="/" className="admin-sidebar-ext-link">
              ↗ Formulário público
            </Link>
            <button className="admin-sidebar-logout" onClick={logout}>
              Sair
            </button>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
