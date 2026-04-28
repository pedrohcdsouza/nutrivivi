"use client";

import React from "react";
import { Button } from "antd";
import { logout } from "@/lib/auth";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      <nav className="admin-navbar">
        <Link href="/painel/anamneses" className="admin-nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z"
              fill="#a8d5ba"
            />
            <path d="M16 30 C14 22 12 14 14 8" stroke="#2d5a3d" strokeWidth="1.5" />
          </svg>
          <span className="admin-nav-name">Nutrivivi</span>
          <span className="admin-nav-badge">Admin</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/"
            style={{
              fontSize: 12,
              color: "var(--bark)",
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            Ver formulário
          </Link>
          <Button
            size="small"
            onClick={logout}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderColor: "var(--foam)",
              color: "var(--bark)",
            }}
          >
            Sair
          </Button>
        </div>
      </nav>

      <div className="admin-content">{children}</div>
    </div>
  );
}
