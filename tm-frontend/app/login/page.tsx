"use client";
import { apiFetch } from "@/lib/api";
import { useState } from "react";
import type { LoginResponse } from "../types/auth";
import type { SubmitEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await apiFetch<LoginResponse>(
        "http://localhost:2202/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 font-sans text-white sm:px-6">
      <section className="w-full max-w-[480px] rounded-3xl border border-white/10 bg-[#080808] p-7 shadow-[0_24px_80px_rgb(0_0_0_/_60%)] sm:p-10">
        <header className="mb-9 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/80 font-mono text-lg font-bold transition hover:bg-white hover:text-black">
            &lt;/&gt;
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-tight">
              DevTask Manager
            </h1>
            <p className="mt-1 text-xs text-white/55">
              Streamline your engineering workflow.
            </p>
          </div>
        </header>

        <div className="mb-9">
          <p className="mb-3 font-mono text-[10px] tracking-[0.12em] text-white/45">
            {"// secure access"}
          </p>
          <h2 className="text-3xl font-medium tracking-tight">Welcome back.</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="mb-2.5 block text-xs font-medium text-white/70"
              htmlFor="email"
            >
              Email / Tech ID
            </label>
            <input
              className="h-12 w-full rounded-lg border border-[#262626] bg-[#0a0a0a] px-4 text-sm text-white outline-none transition duration-200 placeholder:text-white/30 focus:border-white focus:bg-[#0d0d0d]"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="engineer@company.com"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                className="text-xs font-medium text-white/70"
                htmlFor="password"
              >
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-white/55 underline underline-offset-4 transition hover:text-white"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                className="h-12 w-full rounded-lg border border-[#262626] bg-[#0a0a0a] px-4 pr-16 text-sm text-white outline-none transition duration-200 placeholder:text-white/30 focus:border-white focus:bg-[#0d0d0d]"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium tracking-[0.08em] text-white/45 transition hover:text-white"
              >
                SHOW
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3 text-xs text-white/65">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-black accent-white"
            />
            Remember me
          </label>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-between rounded-xl bg-white px-4 text-sm font-semibold text-black transition duration-200 hover:bg-white/80 hover:shadow-[0_8px_24px_rgb(255_255_255_/_10%)]"
          >
            <span>Sign In</span>
            <span aria-hidden="true">-&gt;</span>
          </button>
        </form>

        <div className="my-8 flex items-center gap-3 text-[10px] tracking-[0.12em] text-white/35">
          <span className="h-px flex-1 bg-white/10" />
          <span>or continue with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-xs text-white transition duration-200 hover:border-white/60 hover:bg-white/[0.04]"
          >
            <span aria-hidden="true">GH</span>
            GitHub
          </button>
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-xs text-white transition duration-200 hover:border-white/60 hover:bg-white/[0.04]"
          >
            <span aria-hidden="true">GL</span>
            GitLab
          </button>
        </div>

        <footer className="mt-9 border-t border-white/10 pt-5 font-mono text-[10px] tracking-[0.08em] text-white/40">
          <span className="text-white">●</span> System Status:{" "}
          <span className="text-white font-bold">Dungwf dungwf laij</span>
        </footer>
      </section>
    </main>
  );
}
