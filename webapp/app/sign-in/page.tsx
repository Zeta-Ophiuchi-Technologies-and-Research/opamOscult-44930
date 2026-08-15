"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@heroui/react";

const videoSrc = "/simpsonwae.mp4";

function TelemetryVisual() {
  return (
    <div className="relative min-h-[360px] flex-1 overflow-hidden --[1.75rem] border border-white/15 bg-slate-950 text-white shadow-2xl shadow-black/20 sm:min-h-0">
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/operations-poster.jpg"
          className="absolute inset-0 size-full object-cover opacity-70"
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(14,165,233,.24),transparent_34%),linear-gradient(135deg,#07121f,#10283a_48%,#061018)]" />
      )}
      <div className="absolute inset-0 telemetry-grid opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/25" />
      <div className="pointer-events-none absolute inset-8 border border-white/15 sm:inset-12" />
      <div className="pointer-events-none absolute inset-8 sm:inset-12">
        <span className="absolute -left-1 -top-1 size-5 border-l border-t border-cyan-200/80" />
        <span className="absolute -right-1 -top-1 size-5 border-r border-t border-cyan-200/80" />
        <span className="absolute -bottom-1 -left-1 size-5 border-b border-l border-cyan-200/80" />
        <span className="absolute -bottom-1 -right-1 size-5 border-b border-r border-cyan-200/80" />
        {[20, 48, 76].map((position) => (
          <span
            key={`v-${position}`}
            className="absolute top-0 h-full w-px bg-white/10"
            style={{ left: `${position}%` }}
          />
        ))}
        {[24, 52, 80].map((position) => (
          <span
            key={`h-${position}`}
            className="absolute left-0 w-full border-t border-dashed border-white/10"
            style={{ top: `${position}%` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute left-[42%] top-[39%] size-24 -translate-x-1/2 -translate-y-1/2 border border-white/35">
        <span className="absolute -left-1 -top-1 size-2 border-l border-t border-white" />
        <span className="absolute -right-1 -top-1 size-2 border-r border-t border-white" />
        <span className="absolute -bottom-1 -left-1 size-2 border-b border-l border-white" />
        <span className="absolute -bottom-1 -right-1 size-2 border-b border-r border-white" />
      </div>
      <div className="pointer-events-none absolute left-[42%] top-[39%] size-12 -translate-x-1/2 -translate-y-1/2 border border-cyan-200/70" />
      <div className="pointer-events-none absolute left-[42%] top-[39%] h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,.8)]" />
      <div className="pointer-events-none absolute left-[42%] top-[39%] h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,.8)]" />
      <div className="pointer-events-none absolute left-[42%] top-[39%] -translate-x-1/2 translate-y-10 border border-white/25 bg-slate-950/70 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
        GRID / 07
      </div>
      <div className="pointer-events-none absolute right-[16%] top-[22%] size-10 border border-white/25">
        <span className="absolute -left-1 -top-1 size-3 border-l border-t border-cyan-200/80" />
        <span className="absolute -right-1 -top-1 size-3 border-r border-t border-cyan-200/80" />
        <span className="absolute -bottom-1 -left-1 size-3 border-b border-l border-cyan-200/80" />
        <span className="absolute -bottom-1 -right-1 size-3 border-b border-r border-cyan-200/80" />
      </div>
      <div className="pointer-events-none absolute bottom-[34%] left-[10%] font-mono text-[8px] uppercase tracking-[.18em] text-white/45">
        signal / stable
      </div>
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300/20 shadow-[0_0_20px_rgba(103,232,249,.9)]" />
      <div className="absolute left-[16%] top-[28%] h-2 w-2 --full bg-cyan-300 shadow-[0_0_18px_6px_rgba(103,232,249,.45)]" />
      <div className="absolute left-[16%] top-[28%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 --full border border-cyan-300/25" />
      <div className="absolute left-[16%] top-[28%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 --full border border-cyan-300/10" />
      <div className="absolute left-[16%] top-[28%] h-32 w-[55%] rotate-[18deg] origin-left border-t border-dashed border-cyan-300/70" />
      <div className="absolute right-[22%] top-[50%] h-3 w-3 --sm border border-cyan-200 bg-cyan-300 shadow-[0_0_24px_8px_rgba(34,211,238,.35)]" />
      <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] text-cyan-200">
        <span className="size-1.5 --full bg-emerald-300 shadow-[0_0_10px_3px_rgba(110,231,183,.5)]" />
        System live · node 07
      </div>
      <div className="absolute right-5 top-5 --full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] text-white/70 backdrop-blur-md">
        LIVE / 04:18:22 UTC
      </div>
      {/* <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-[1fr_170px]">
        <div className="--2xl border border-white/15 bg-slate-950/55 p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em] text-white/50">
            <span>Dispatch telemetry</span>
            <Waves className="size-3.5 text-cyan-300" />
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {[
              25, 42, 32, 65, 50, 78, 52, 88, 62, 74, 48, 92, 66, 81, 58, 95,
              69, 86, 75, 98,
            ].map((height, index) => (
              <span
                key={index}
                className="flex-1 --t-sm bg-gradient-to-t from-cyan-400/25 to-cyan-200"
                style={{ height: `${height}%`, opacity: 0.42 + index / 55 }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-white/35">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>
        <div className="--2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
          <div className="font-mono text-[10px] uppercase tracking-[.16em] text-white/50">
            Response score
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-[-.06em]">
            98.4<span className="text-sm text-cyan-200">%</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-300">
            <Activity className="size-3.5" />
            +12.8% this week
          </div>
        </div>
      </div> */}
      <div className="absolute bottom-5 right-5 hidden size-12 items-center justify-center --full border border-white/15 bg-white/10 backdrop-blur-xl sm:flex">
        <Play className="ml-0.5 size-4 fill-current text-cyan-200" />
      </div>
    </div>
  );
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="h-dvh overflow-hidden bg-background px-3 py-3 text-foreground sm:px-4 lg:px-6">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col overflow-hidden --[2rem] border border-border/70 bg-card/70 shadow-2xl shadow-primary/5 backdrop-blur-xl lg:flex-row">
        <section className="relative flex w-full flex-col justify-between overflow-hidden bg-muted/40 p-6 sm:p-8 lg:w-[57%] lg:p-10">
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="flex size-8 items-center justify-center --xl bg-primary text-primary-foreground">
                <Radio className="size-4" />
              </span>
              PulseRoute
            </Link>
            <span className="eyebrow hidden sm:block">
              Emergency intelligence / 01
            </span>
          </div>
          <div className="relative z-10 py-5 sm:py-7 lg:py-8">
            <p className="eyebrow">The operating picture is live</p>
            <h1 className="mt-4 max-w-xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] sm:text-6xl">
              See what moves
              <br />
              <span className="text-primary">before it happens.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              A calm, connected command layer for teams who move people through
              critical moments.
            </p>
          </div>
          <TelemetryVisual />
        </section>
        <section className="flex w-full items-center justify-center overflow-y-auto p-6 sm:p-10 lg:w-[43%] lg:overflow-hidden lg:p-12 xl:p-16">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <div className="mb-6 flex size-11 items-center justify-center --2xl bg-primary/10 text-primary">
                <LockKeyhole className="size-5" />
              </div>
              <p className="eyebrow">Secure workspace</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.05em]">
                Welcome back.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in to continue to your response network.
              </p>
            </div>
            <form
              className="flex flex-col gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label
                className="flex flex-col gap-2 text-sm font-medium"
                htmlFor="email"
              >
                Work email
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@hospital.org"
                    className="h-12 --xl pl-10"
                    required
                  />
                </div>
              </label>
              <label
                className="flex flex-col gap-2 text-sm font-medium"
                htmlFor="password"
              >
                Password
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 --xl pl-10 pr-11"
                    required
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <Checkbox />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Button type="submit" className="h-12 --xl text-sm">
                {submitted ? (
                  <>
                    <Check className="size-4" data-icon="inline-start" />
                    Access granted
                  </>
                ) : (
                  <>
                    Enter workspace{" "}
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </>
                )}
              </Button>
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <Button type="button" variant="outline" className="h-12 --xl">
                <Sparkles className="size-4" data-icon="inline-start" />
                Continue with SSO
              </Button>
            </form>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Protected with enterprise-grade encryption.
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              New to PulseRoute?{" "}
              <Link
                href="/#contact"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Request access
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
