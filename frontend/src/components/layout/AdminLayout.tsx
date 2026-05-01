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
      className="w-[140px] h-auto opacity-[0.82] animate-leafDrift"
      aria-hidden="true"
    >
      <path d="M100 290 C100 290 98 218 102 148 C106 88 100 50 100 32" stroke="rgba(168,213,186,0.28)" strokeWidth="1.5" />
      <path d="M100 168 C68 152 38 126 30 96 C22 64 52 56 76 72 C92 84 99 138 100 168Z" fill="rgba(168,213,186,0.10)" stroke="rgba(168,213,186,0.24)" strokeWidth="1.2" />
      <path d="M100 168 C76 140 48 112 30 96" stroke="rgba(168,213,186,0.16)" strokeWidth="0.9" />
      <path d="M100 218 C138 194 172 162 178 126 C184 88 152 80 128 98 C113 112 103 180 100 218Z" fill="rgba(168,213,186,0.08)" stroke="rgba(168,213,186,0.20)" strokeWidth="1.2" />
      <path d="M100 218 C130 188 170 158 178 126" stroke="rgba(168,213,186,0.13)" strokeWidth="0.9" />
      <path d="M100 120 C78 106 56 84 54 62 C52 42 74 36 90 50 C99 62 100 104 100 120Z" fill="rgba(168,213,186,0.07)" stroke="rgba(168,213,186,0.18)" strokeWidth="1" />
      <path d="M100 88 C122 70 148 50 152 28 C156 8 128 2 113 18 C104 30 100 74 100 88Z" fill="rgba(168,213,186,0.07)" stroke="rgba(168,213,186,0.18)" strokeWidth="1" />
      <path d="M100 256 C72 238 46 214 44 184 C42 152 68 146 90 162 C100 172 100 234 100 256Z" fill="rgba(168,213,186,0.06)" stroke="rgba(168,213,186,0.14)" strokeWidth="1" />
      <circle cx="30" cy="95" r="2.5" fill="rgba(168,213,186,0.38)" />
      <circle cx="178" cy="126" r="2.5" fill="rgba(168,213,186,0.28)" />
      <circle cx="54" cy="61" r="1.8" fill="rgba(168,213,186,0.32)" />
      <circle cx="152" cy="27" r="1.8" fill="rgba(168,213,186,0.25)" />
    </svg>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive =
    pathname === "/painel/anamneses" || pathname?.startsWith("/painel/anamneses/");

  return (
    <div className="flex min-h-screen max-md:flex-col">
      {/* Sidebar */}
      <aside
        className="
          w-[220px] shrink-0 sticky top-0 h-screen overflow-hidden flex flex-col
          bg-gradient-to-b from-forest via-evergreen to-[#243e2e]
          max-md:w-full max-md:h-14 max-md:flex-row max-md:static
        "
        style={{
          backgroundImage:
            "linear-gradient(158deg, #1b3a2d 0%, #2d5a3d 55%, #243e2e 100%)",
        }}
      >
        {/* subtle pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8d5ba' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* content */}
        <div className="relative z-10 flex flex-col h-full px-[22px] py-8 max-md:flex-row max-md:items-center max-md:px-5 max-md:py-0 max-md:h-14">
          {/* brand */}
          <Link href="/painel/anamneses" className="flex items-center gap-2.5 no-underline mb-1.5 max-md:mb-0">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z" fill="rgba(168,213,186,0.55)" />
              <path d="M16 30 C14 22 12 14 14 8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
            </svg>
            <div>
              <div className="font-display text-xl font-medium text-white/95 leading-tight">Nutrivivi</div>
              <div className="text-[9px] font-bold tracking-[0.1em] uppercase text-mint/65 max-md:hidden">
                Painel Admin
              </div>
            </div>
          </Link>

          {/* botanical illustration — hidden on mobile */}
          <div className="flex-1 flex items-center justify-center overflow-hidden max-md:hidden">
            <SidebarBotanical />
          </div>

          {/* nav links */}
          <nav className="flex flex-col gap-0.5 mb-2 max-md:flex-row max-md:gap-1 max-md:mb-0 max-md:flex-1 max-md:px-3">
            <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-mint/40 mb-2 px-2 max-md:hidden">
              Menu
            </p>
            <Link
              href="/painel/anamneses"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium no-underline tracking-[0.01em] transition-all ${
                isActive
                  ? "bg-mint/[0.16] text-white"
                  : "text-mint/70 hover:bg-mint/10 hover:text-white/90"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Anamneses
            </Link>
          </nav>

          {/* footer */}
          <div className="flex flex-col gap-2.5 pt-5 border-t border-mint/[0.12] max-md:flex-row max-md:pt-0 max-md:border-none max-md:items-center max-md:gap-2">
            <Link
              href="/"
              className="text-[11px] text-mint/45 no-underline tracking-[0.04em] py-1 transition-colors hover:text-mint max-md:hidden"
            >
              ↗ Formulário público
            </Link>
            <button
              onClick={logout}
              className="bg-transparent border border-mint/20 text-mint/55 px-3.5 py-2 rounded-md font-body text-[11px] font-semibold tracking-[0.08em] uppercase cursor-pointer transition-all hover:border-mint/40 hover:text-mint text-center"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen bg-paper overflow-x-hidden max-md:min-h-[calc(100vh-56px)]">
        <div className="p-10 max-w-[1200px] mx-auto w-full max-md:px-5 max-md:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
