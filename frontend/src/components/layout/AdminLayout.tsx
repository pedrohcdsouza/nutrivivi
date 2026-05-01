"use client";

import React from "react";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const css = `
.admin-root { display: flex; min-height: 100vh; }

.admin-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: linear-gradient(158deg, var(--forest) 0%, var(--evergreen) 55%, #243e2e 100%);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.admin-sidebar::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8d5ba' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.admin-sidebar-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 22px;
}
.admin-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 6px;
}
.admin-sidebar-name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  line-height: 1.2;
}
.admin-sidebar-badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(168,213,186,0.65);
}
.admin-sidebar-botanical-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.admin-sidebar-botanical {
  width: 140px;
  height: auto;
  opacity: 0.82;
  animation: leafDrift 9s ease-in-out infinite;
}
.admin-nav-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}
.admin-nav-section-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(168,213,186,0.38);
  margin: 0 0 8px;
  padding: 0 8px;
}
.admin-nav-link {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(168,213,186,0.7);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: all 0.2s;
}
.admin-nav-link:hover { background: rgba(168,213,186,0.1); color: rgba(255,255,255,0.88); }
.admin-nav-link.active { background: rgba(168,213,186,0.16); color: white; }

.admin-sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(168,213,186,0.12);
}
.admin-sidebar-ext-link {
  font-size: 11px;
  color: rgba(168,213,186,0.45);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
  padding: 4px 0;
}
.admin-sidebar-ext-link:hover { color: var(--mint); }
.admin-sidebar-logout {
  background: none;
  border: 1px solid rgba(168,213,186,0.2);
  color: rgba(168,213,186,0.55);
  padding: 8px 14px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.admin-sidebar-logout:hover { border-color: rgba(168,213,186,0.4); color: var(--mint); }

.admin-main { flex: 1; min-height: 100vh; background: var(--paper); overflow-x: hidden; }
.admin-content { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; }

.admin-page-header { margin-bottom: 32px; }
.admin-page-title {
  font-family: var(--font-display) !important;
  font-size: 38px !important;
  font-weight: 400 !important;
  color: var(--forest) !important;
  letter-spacing: -0.015em !important;
  margin: 0 !important;
  line-height: 1.1 !important;
}
.admin-page-subtitle { font-size: 13px; color: var(--bark); margin: 6px 0 0; }

.admin-table-wrap {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--foam);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.patient-name { font-weight: 600; color: var(--forest); font-size: 14px; }

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.status-sent { background: #e8f5ee; color: #2d6a4f; }
.status-failed { background: #fde8e8; color: #9b3a3a; }
.status-pending { background: #fef3e2; color: #92610a; }

.detail-header {
  margin-bottom: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.detail-patient-name {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 400;
  color: var(--forest);
  margin: 0 0 4px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.detail-meta { font-size: 13px; color: var(--bark); }

.detail-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--foam);
  padding: 28px 32px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-sm);
}
.detail-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--foam);
}
.detail-card-number {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--sage);
  letter-spacing: 0.08em;
  background: var(--foam);
  padding: 4px 10px;
  border-radius: 20px;
  min-width: 44px;
  text-align: center;
  flex-shrink: 0;
}
.detail-section-label {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  color: var(--forest);
  margin: 0;
  letter-spacing: -0.01em;
}
.detail-name-accent {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, var(--fern), var(--mint));
  border-radius: 2px;
  margin: 8px 0 0;
}

.score-bar-wrap { display: flex; flex-direction: column; gap: 6px; }
.score-bar-header { display: flex; align-items: center; justify-content: space-between; }
.score-bar-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mist);
}
.score-bar-value { font-size: 13px; font-weight: 600; color: var(--charcoal); }
.score-track { height: 4px; background: var(--foam); border-radius: 2px; overflow: hidden; }
.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sage), var(--fern));
  border-radius: 2px;
  transition: width 0.6s ease;
}

.detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
.detail-grid-wide { grid-column: 1 / -1; }
.detail-item-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mist);
  margin-bottom: 4px;
}
.detail-item-value { font-size: 15px; color: var(--charcoal); font-weight: 500; line-height: 1.5; }

.detail-food-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
.detail-food-item { background: var(--foam); border-radius: 12px; padding: 16px; }
.detail-food-meal {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 6px;
}
.detail-food-text { font-size: 14px; color: var(--charcoal); line-height: 1.55; white-space: pre-wrap; }

.detail-obs-block {
  background: var(--foam);
  border-radius: 12px;
  padding: 20px;
  font-size: 14px;
  color: var(--charcoal);
  line-height: 1.7;
  white-space: pre-wrap;
}

@media (max-width: 900px) {
  .admin-sidebar {
    width: 100%;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 100;
    flex-direction: row;
  }
  .admin-sidebar-content { flex-direction: row; align-items: center; padding: 0 20px; height: 56px; }
  .admin-sidebar-botanical-wrap { display: none; }
  .admin-nav-section-label { display: none; }
  .admin-sidebar-badge { display: none; }
  .admin-nav-links { flex-direction: row; gap: 4px; margin-bottom: 0; flex: 1; padding: 0 12px; }
  .admin-sidebar-footer { flex-direction: row; padding: 0; border: none; align-items: center; gap: 8px; }
  .admin-sidebar-ext-link { display: none; }
  .admin-sidebar-logout { padding: 5px 12px; }
  .admin-root { flex-direction: column; }
  .admin-main { min-height: calc(100vh - 56px); }
  .admin-content { padding: 24px 20px; }
}
@media (max-width: 600px) {
  .detail-card { padding: 20px 16px; }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-food-grid { grid-template-columns: 1fr; }
}
`;

function SidebarBotanical() {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      className="admin-sidebar-botanical"
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

  return (
    <>
      <style>{css}</style>
      <div className="admin-root">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-content">
            <Link href="/painel/anamneses" className="admin-sidebar-brand">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 30 C8 24 4 16 6 8 C8 2 16 0 22 4 C28 8 30 18 24 24 C21 27 18 29 16 30Z" fill="rgba(168,213,186,0.55)" />
                <path d="M16 30 C14 22 12 14 14 8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
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
                  pathname === "/painel/anamneses" || pathname?.startsWith("/painel/anamneses/")
                    ? " active"
                    : ""
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

            <div className="admin-sidebar-footer">
              <Link href="/" className="admin-sidebar-ext-link">↗ Formulário público</Link>
              <button className="admin-sidebar-logout" onClick={logout}>Sair</button>
            </div>
          </div>
        </aside>

        <div className="admin-main">
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </>
  );
}
