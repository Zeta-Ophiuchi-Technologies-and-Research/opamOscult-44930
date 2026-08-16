"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useAnimate,
} from "framer-motion";
import {
  SiApple,
  SiFacebook,
  SiGoogle,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
} from "react-icons/si";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Crosshair,
  HeartPulse,
  Menu,
  Moon,
  Radio,
  Route,
  Search,
  ShieldCheck,
  Siren,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { EdgeFrameOverlay } from "@/components/edgeFrameOverlay";

export const LinkBoxMain = () => {
  return (
    <div className=" px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <div className="grid grid-cols-2 divide-x divide-neutral-900">
        <LinkBox Icon={SiGoogle} href="#" />
        <LinkBox Icon={SiShopify} href="#" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-neutral-900">
        <LinkBox Icon={SiApple} href="#" />
        <LinkBox Icon={SiSoundcloud} href="#" />
        <LinkBox Icon={SiSoundcloud} href="#" />
        <LinkBox Icon={SiFacebook} href="#" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-neutral-900">
        <LinkBox Icon={SiTiktok} href="#" />
        <LinkBox Icon={SiTiktok} href="#" />
        <LinkBox Icon={SiSpotify} href="#" />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }: { Icon: any; href: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ): "left" | "right" | "top" | "bottom" => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as const,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as const,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as const,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as const,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-black text-white text-black transition-[clip-path] duration-300 dark:bg-white dark:text-black"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};

const SECTION_HEIGHT = 1000;

const OperationsMap = dynamic(
  () =>
    import("@/components/operations-map").then(
      (module) => module.OperationsMap,
    ),
  { ssr: false },
);

const feed = [
  [
    "08:42:18",
    "AM-204",
    "accepted cardiac event",
    "St. Mary's Medical Center",
    "live",
  ],
  [
    "08:41:52",
    "AM-118",
    "rerouted around congestion",
    "County General Hospital",
    "safe",
  ],
  [
    "08:40:27",
    "AM-309",
    "hospital capacity synced",
    "Northside Regional",
    "sync",
  ],
  [
    "08:39:06",
    "SYS-01",
    "12 units back in service",
    "Metro response grid",
    "ready",
  ],
];

function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-3"
      aria-label="PulseRoute home"
    >
      <span className="flex size-9 items-center justify-center xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <Siren className="size-5" />
      </span>
      <span className="text-sm font-semibold tracking-tight">PulseRoute</span>
    </a>
  );
}

function TelemetryPanel() {
  return (
    <div className="relative overflow-hidden [2rem] border border-foreground/10 bg-foreground/[0.035] p-3 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-5">
      <div className="absolute inset-0 telemetry-grid opacity-50" />
      <div className="relative [1.35rem] border border-foreground/10 bg-background/90 p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-2 full bg-emerald-500 shadow-[0_0_14px] shadow-emerald-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Live operations feed
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            SYNC 99.98%
          </span>
        </div>
        <div className="grid gap-3 py-5 sm:grid-cols-3">
          <div className="xl border border-foreground/10 bg-foreground/[0.03] p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              ACTIVE UNITS
            </p>
            <p className="mt-2 text-2xl font-semibold">
              24<span className="ml-1 text-sm text-emerald-500">+4</span>
            </p>
          </div>
          <div className="xl border border-foreground/10 bg-foreground/[0.03] p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              AVG RESPONSE
            </p>
            <p className="mt-2 text-2xl font-semibold">08:42</p>
          </div>
          <div className="xl border border-foreground/10 bg-foreground/[0.03] p-3">
            <p className="font-mono text-[10px] text-muted-foreground">
              HOSPITALS ONLINE
            </p>
            <p className="mt-2 text-2xl font-semibold">
              18<span className="ml-1 text-sm text-primary">100%</span>
            </p>
          </div>
        </div>
        <div className="mb-4 xl border border-primary/20 bg-primary/[0.05] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route className="size-4 text-primary" />
              <span className="text-sm font-semibold">
                AM-204 → St. Mary&apos;s
              </span>
            </div>
            <Badge variant="secondary" className="md text-[10px]">
              EN ROUTE
            </Badge>
          </div>
          <div className="relative h-24 overflow-hidden lg bg-primary/[0.04] telemetry-map">
            <div className="route-line" />
            <span className="absolute bottom-4 left-[12%] flex size-7 items-center justify-center full bg-primary text-primary-foreground shadow-lg">
              <Radio className="size-3.5" />
            </span>
            <span className="absolute right-[12%] top-4 flex size-7 items-center justify-center full bg-emerald-500 text-background shadow-lg">
              <HeartPulse className="size-3.5" />
            </span>
            <span className="absolute left-[40%] top-[44%] size-1.5 full bg-primary shadow-[0_0_12px] shadow-primary" />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>LAT 40.7128</span>
            <span>ETA 04:12</span>
            <span>CAPACITY 82%</span>
          </div>
        </div>
        <div className="flex items-center justify-between pb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Event stream
          </span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-500">
            <Activity className="size-3" /> streaming
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {feed.map(([time, unit, event, place, tone]) => (
            <div
              key={time}
              className="grid grid-cols-[58px_52px_1fr_auto] items-center gap-2 border-t border-foreground/10 py-2.5 text-[11px]"
            >
              <span className="font-mono text-muted-foreground">{time}</span>
              <span className="font-mono font-semibold">{unit}</span>
              <span className="truncate text-muted-foreground">
                {event} · {place}
              </span>
              <span
                className={cn(
                  "size-1.5 full",
                  tone === "live"
                    ? "bg-primary"
                    : tone === "safe"
                      ? "bg-emerald-500"
                      : tone === "sync"
                        ? "bg-amber-500"
                        : "bg-foreground/30",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Page() {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoaded, isSignedIn, userId } = useAuth();

  useEffect(() => {
    const saved = window.localStorage.getItem("pulseroute-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDark(saved ? saved === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
    window.localStorage.setItem("pulseroute-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main id="top" className="min-h-screen  bg-background text-foreground">
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Logo />
        <div
          className={cn(
            "absolute left-5 right-5 top-[76px] 2xl border border-foreground/10 bg-background/95 p-3 shadow-xl backdrop-blur-xl md:static md:flex md:w-auto md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none",
            mobileOpen ? "flex flex-col gap-3" : "hidden md:flex",
          )}
        >
          <a href="#platform" className="nav-link">
            Platform
          </a>
          <a href="#workflow" className="nav-link">
            How it works
          </a>
          <a href="#signals" className="nav-link">
            Live signals
          </a>
          <a href="#company" className="nav-link">
            Company
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="full"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </Button>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <Button className="hidden full sm:flex">
                Sign in <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          )}
          {isSignedIn && (
            <Link href="/patient-utility">
              <Button className="hidden full sm:flex bg-transparent text-primary border border-primary hover:bg-primary/10 cursor-pointer">
                Check your Utility <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          )}
        </div>
      </nav>
      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-24">
        <div className="pointer-events-none absolute -left-24 top-10 size-96 full bg-primary/10 blur-3xl" />
        <div className="relative">
          <Badge
            variant="outline"
            className="mb-6 full border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
          >
            <span className="mr-2 inline-block size-1.5 full bg-primary" />
            Emergency intelligence, in motion
          </Badge>
          <h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
            Every second has a <span className="text-primary">signal.</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            PulseRoute connects dispatch teams, ambulances, and hospitals in one
            calm, live operating picture — so the right care is always closer.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="full px-6">
              See PulseRoute in action <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost" className="full px-6">
              <a href="#platform">
                Explore the platform <ChevronRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              HIPAA-ready infrastructure
            </span>
            <span className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              Sub-second updates
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 full bg-primary/10 blur-3xl" />
          <TelemetryPanel />
        </div>
      </section>
      <section
        id="platform"
        className="border-y border-foreground/10 bg-foreground/[0.025] px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">One operating picture</p>
            <h2 className="section-title">
              The infrastructure beneath the response.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <Crosshair className="mb-4 size-5 text-primary" />
              <h3 className="font-semibold">See the whole field</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                One shared map for every unit, route, bed, and handoff.
              </p>
            </div>
            <div>
              <Clock3 className="mb-4 size-5 text-primary" />
              <h3 className="font-semibold">Move with context</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Signals become decisions before congestion becomes delay.
              </p>
            </div>
            <div>
              <CircleDot className="mb-4 size-5 text-primary" />
              <h3 className="font-semibold">Stay in sync</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A live system of record for teams that cannot wait.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 50vh)` }}
        className="relative w-full  bg-black"
      >
        <EdgeFrameOverlay />
        <CenterImage />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b dark:from-zinc-950/0 dark:to-zinc-950 from-white/0 to-white" />
      </div>

      <OperationsMap />
      <section
        id="workflow"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="max-w-xl">
          <p className="eyebrow">Built for the handoff</p>
          <h2 className="section-title">From first signal to final arrival.</h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Receive",
              "Intake arrives with location, acuity, and the details your team needs.",
            ],
            [
              "02",
              "Route",
              "The system finds the safest, fastest path while matching hospital readiness.",
            ],
            [
              "03",
              "Resolve",
              "Every handoff is visible, timestamped, and ready for the next decision.",
            ],
          ].map(([number, title, body], index) => (
            <div
              key={number}
              className={cn(
                "group relative 3xl border border-foreground/10 p-6 transition-colors hover:border-primary/40",
                index === 1 && "bg-primary text-primary-foreground",
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs",
                  index === 1 ? "text-primary-foreground/60" : "text-primary",
                )}
              >
                {number}
              </span>
              <h3 className="mt-16 text-xl font-semibold">{title}</h3>
              <p
                className={cn(
                  "mt-3 text-sm leading-6",
                  index === 1
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground",
                )}
              >
                {body}
              </p>
              <ArrowRight className="mt-8 size-5 transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </section>
      <LinkBoxMain />
      <section
        id="signals"
        className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-primary-foreground/60">Live signals</p>
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Quiet confidence for high-stakes teams.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold">99.98%</p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                system uptime
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">18</p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                hospitals online
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">−24%</p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                response variance
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">24/7</p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                human support
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="company"
        className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"
      >
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-title max-w-xl">
            Make every response more coordinated.
          </h2>
        </div>
        <Button size="lg" className="w-fit full px-6">
          Request a walkthrough <ArrowRight data-icon="inline-end" />
        </Button>
      </section>
      <footer className="border-t border-foreground/10 px-5 py-7 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <span>
            © 2026 PulseRoute Systems. Built for the moments that matter.
          </span>
          <div className="flex gap-5">
            <Link href="/backend" className="hover:text-foreground">
              Authorised login only
            </Link>
            <a href="#company" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"],
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 1 / 2],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
      }}
    >
      <video
        autoPlay
        loop
        muted={false}
        className="absolute inset-0 h-full w-full object-cover"
        src="/sliders.mp4"
      />
    </motion.div>
  );
};
