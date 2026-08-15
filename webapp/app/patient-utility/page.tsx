'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import {
  Activity, Bell, Building2, CheckCircle2, ChevronDown, ChevronRight, CircleHelp,
  Command, FileText, HeartPulse, Home, LifeBuoy, ListFilter, LocateFixed, LogOut,
  Menu, Moon, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Plus, Radio, RefreshCw,
  Search, Settings, ShieldCheck, Siren, Sun, Truck, Users, X, Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const OperationsMap = dynamic(() => import('@/components/operations-map').then((module) => module.OperationsMap), { ssr: false })

const nav = [
  { label: 'Overview', icon: Home }, { label: 'Live response', icon: Radio, count: '08' },
  { label: 'Ambulance fleet', icon: Truck }, { label: 'Hospitals', icon: Building2 },
]
const missions = [
  { id: 'AM-204', type: 'Cardiac event', destination: "St. Mary's Medical", eta: '04:12', status: 'En route', color: 'bg-primary' },
  { id: 'AM-118', type: 'Trauma transfer', destination: 'County General', eta: '09:36', status: 'Staged', color: 'bg-amber-500' },
  { id: 'AM-309', type: 'Respiratory distress', destination: 'Northside Regional', eta: '12:08', status: 'En route', color: 'bg-emerald-500' },
]
const hospitals = [
  { name: "St. Mary's Medical", beds: '18 / 22 beds', value: 82, tone: 'bg-emerald-500' },
  { name: 'County General', beds: '09 / 14 beds', value: 64, tone: 'bg-primary' },
  { name: 'Northside Regional', beds: '04 / 12 beds', value: 33, tone: 'bg-amber-500' },
]

function Brand() { return <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Siren className="size-5" /></span><span className="font-semibold tracking-tight">PulseRoute</span></div> }

function Sidebar({ collapsed, onCollapse, mobile = false, onNavigate, activeNav, setActiveNav }: { collapsed?: boolean; onCollapse?: () => void; mobile?: boolean; onNavigate?: () => void; activeNav: string; setActiveNav: (label: string) => void }) {
  return <aside className={cn('flex h-full flex-col bg-card', collapsed ? 'w-[76px]' : 'w-64', mobile ? 'w-full' : 'border-r border-border/70')}>
    <div className="flex h-16 items-center justify-between px-4"><Brand />{!collapsed && <Button variant="ghost" size="icon" onClick={onCollapse} aria-label="Collapse sidebar"><PanelLeftClose /></Button>}</div>
    <div className="flex flex-1 flex-col gap-6 px-3 py-4">
      <div className="flex flex-col gap-1">{nav.map(({ label, icon: Icon, count }) => <Button key={label} variant={activeNav === label ? 'secondary' : 'ghost'} className={cn('justify-start gap-3 rounded-xl', collapsed && 'justify-center px-0')} onClick={() => { setActiveNav(label); onNavigate?.() }} aria-current={activeNav === label ? 'page' : undefined}><Icon />{!collapsed && <><span>{label}</span>{count && <Badge variant="outline" className="ml-auto rounded-md px-1.5 font-mono text-[10px]">{count}</Badge>}</>}</Button>)}</div>
      {!collapsed && <><Separator /><div className="px-2"><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workspace</p><div className="flex flex-col gap-1"><Button variant="ghost" className="justify-start gap-3 rounded-xl"><FileText />Reports</Button><Button variant="ghost" className="justify-start gap-3 rounded-xl"><Users />Team directory</Button></div></div></>}
    </div>
    <div className="flex flex-col gap-1 border-t border-border/70 p-3"><Button variant="ghost" className={cn('justify-start gap-3 rounded-xl', collapsed && 'justify-center px-0')}><Settings />{!collapsed && 'Settings'}</Button><Button variant="ghost" className={cn('justify-start gap-3 rounded-xl text-muted-foreground', collapsed && 'justify-center px-0')}><CircleHelp />{!collapsed && 'Help center'}</Button>{!collapsed && <div className="mt-3 flex items-center gap-3 rounded-xl bg-muted/60 p-3"><Avatar className="size-8"><AvatarFallback className="bg-primary text-xs text-primary-foreground">JD</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-xs font-semibold">Jordan Davis</p><p className="truncate text-[10px] text-muted-foreground">Response coordinator</p></div><MoreHorizontal className="ml-auto size-4 text-muted-foreground" /></div>}</div>
  </aside>
}

function Metric({ label, value, detail, icon: Icon, tone = 'text-primary' }: { label: string; value: string; detail: string; icon: typeof Activity; tone?: string }) { return <Card className="rounded-2xl border-border/70 shadow-none"><CardContent className="p-3"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span><Icon className={cn('size-4', tone)} /></div><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></CardContent></Card> }

function ResponseChart() { const bars = [42, 58, 50, 72, 64, 79, 67, 86, 76, 91, 82, 96]; return <div className="flex h-24 items-end gap-1.5">{bars.map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className={cn('w-full rounded-t-md transition-all group-hover:bg-primary', index === bars.length - 1 ? 'bg-primary' : 'bg-primary/20')} style={{ height: `${height}%` }} /><span className="font-mono text-[9px] text-muted-foreground">{index % 3 === 0 ? `${8 + index / 3}a` : ''}</span></div>)}</div> }

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [selectedMission, setSelectedMission] = useState(missions[0])
  const [refreshed, setRefreshed] = useState('just now')
  const [query, setQuery] = useState('')
  const [activeNav, setActiveNav] = useState('Overview')

  useEffect(() => { const saved = window.localStorage.getItem('pulseroute-theme'); setDark(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); document.documentElement.classList.toggle('light', !dark); window.localStorage.setItem('pulseroute-theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [])
  const filteredNav = useMemo(() => [...nav, { label: 'Reports', icon: FileText }, { label: 'Settings', icon: Settings }].filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="relative flex h-dvh overflow-hidden bg-muted/30 text-foreground">
    <div className="pointer-events-none absolute inset-0 z-30 opacity-40" aria-hidden="true">
      <span className="absolute left-4 top-4 size-5 border-l border-t border-primary/40" />
      <span className="absolute right-4 top-4 size-5 border-r border-t border-primary/40" />
      <span className="absolute bottom-4 left-4 size-5 border-b border-l border-primary/40" />
      <span className="absolute bottom-4 right-4 size-5 border-b border-r border-primary/40" />
      <span className="absolute left-1/2 top-4 size-1 -translate-x-1/2 rounded-full bg-primary/60" />
      <span className="absolute bottom-4 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary/60" />
    </div>
    <div className="hidden lg:block"><Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} activeNav={activeNav} setActiveNav={setActiveNav} /></div>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="w-72 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><Sidebar mobile onNavigate={() => setMobileOpen(false)} activeNav={activeNav} setActiveNav={setActiveNav} /></SheetContent></Sheet>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></Button><div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><span>Workspace</span><ChevronRight className="size-4" /><span className="font-medium text-foreground">{activeNav}</span></div><Button variant="outline" className="hidden h-9 w-64 justify-start gap-2 rounded-xl text-muted-foreground md:flex" onClick={() => setSearchOpen(true)}><Search /><span>Search anything</span><kbd className="ml-auto rounded border bg-muted px-1.5 font-mono text-[10px]">⌘ K</kbd></Button></div><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></Button><Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun /> : <Moon />}</Button><Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /></Button><Separator orientation="vertical" className="mx-2 h-6" /><Avatar className="size-8"><AvatarFallback className="bg-primary text-xs text-primary-foreground">JD</AvatarFallback></Avatar><ChevronDown className="hidden size-4 text-muted-foreground sm:block" /></div></header>
      <main className="mx-auto h-[calc(100dvh-4rem)] w-full max-w-[1600px] overflow-hidden p-3 sm:p-4 lg:p-5"><div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Monday, August 17, 2026</p><Badge className="gap-1 rounded-md bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"><span className="size-1.5 rounded-full bg-emerald-500" />All systems live</Badge></div><h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Good morning, Jordan.</h1><p className="mt-1 text-xs text-muted-foreground">Here&apos;s the operating picture for your response grid.</p></div><div className="flex items-center gap-2"><Button variant="outline" className="rounded-xl" onClick={() => setRefreshed('just now')}><RefreshCw /><span className="hidden sm:inline">Refresh</span></Button><Button className="rounded-xl"><Plus data-icon="inline-start" />New incident</Button></div></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><Metric label="Active missions" value="08" detail="+2 since last hour" icon={Radio} /><Metric label="Units in service" value="24 / 31" detail="77% fleet availability" icon={Truck} tone="text-emerald-500" /><Metric label="Avg. response" value="08:42" detail="18% faster than target" icon={Zap} tone="text-amber-500" /><Metric label="Receiving capacity" value="68%" detail="Across 18 connected hospitals" icon={HeartPulse} /></div>
        <div className="grid gap-3 xl:grid-cols-[1.35fr_0.8fr]"><Card className="overflow-hidden rounded-2xl border-border/70 shadow-none"><CardHeader className="flex flex-row items-start justify-between border-b border-border/70 pb-4"><div><CardTitle className="text-base">Live response grid</CardTitle><CardDescription className="mt-1">Units, routes, and receiving teams in real time</CardDescription></div><Badge variant="outline" className="gap-1 rounded-md font-mono text-[10px] text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" />LIVE</Badge></CardHeader><div className="h-[210px] sm:h-[225px]"><OperationsMap compact /></div></Card>
          <Card className="rounded-2xl border-border/70 shadow-none"><CardHeader className="flex flex-row items-start justify-between"><div><CardTitle className="text-base">Active missions</CardTitle><CardDescription className="mt-1">Tap a mission to inspect status</CardDescription></div><Button variant="ghost" size="icon" aria-label="Filter missions"><ListFilter /></Button></CardHeader><CardContent className="flex flex-col gap-3">{missions.map((mission) => <button type="button" key={mission.id} onClick={() => setSelectedMission(mission)} className={cn('rounded-xl border p-4 text-left transition-colors hover:border-primary/40', selectedMission.id === mission.id ? 'border-primary/50 bg-primary/[0.05]' : 'border-border/70')}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className={cn('size-2 rounded-full', mission.color)} /><span className="font-mono text-xs font-semibold">{mission.id}</span></div><Badge variant="secondary" className="rounded-md text-[10px]">{mission.status}</Badge></div><p className="mt-3 text-sm font-medium">{mission.type}</p><div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span className="truncate">→ {mission.destination}</span><span className="font-mono">ETA {mission.eta}</span></div></button>)}<div className="mt-2 rounded-xl bg-muted/60 p-4"><div className="flex items-center gap-2 text-xs font-semibold"><Activity className="size-4 text-primary" />Selected: {selectedMission.id}</div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>Mission progress</span><span className="font-mono text-foreground">64%</span></div><Progress value={64} className="mt-2 h-1.5" /></div></CardContent></Card></div>
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.85fr]"><Card className="rounded-2xl border-border/70 shadow-none"><CardHeader><div className="flex items-center justify-between"><div><CardTitle className="text-base">Response performance</CardTitle><CardDescription className="mt-1">Average response time · today</CardDescription></div><Badge variant="secondary" className="rounded-md text-[10px]">−18%</Badge></div></CardHeader><CardContent className="p-3 pt-0"><ResponseChart /><div className="mt-2 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground"><span>Target 10:00</span><span className="font-mono text-foreground">Current 08:42</span></div></CardContent></Card><Card className="rounded-2xl border-border/70 shadow-none"><CardHeader><div className="flex items-center justify-between"><div><CardTitle className="text-base">Hospital readiness</CardTitle><CardDescription className="mt-1">Capacity across your network</CardDescription></div><Building2 className="size-4 text-primary" /></div></CardHeader><CardContent className="flex flex-col gap-5">{hospitals.map((hospital) => <div key={hospital.name}><div className="flex items-center justify-between text-xs"><span className="font-medium">{hospital.name}</span><span className="font-mono text-muted-foreground">{hospital.beds}</span></div><Progress value={hospital.value} className={cn('mt-2 h-1.5', hospital.tone)} /></div>)}<Button variant="outline" className="mt-1 rounded-xl">View capacity map <ChevronRight data-icon="inline-end" /></Button></CardContent></Card><Card className="rounded-2xl border-border/70 shadow-none"><CardHeader><CardTitle className="text-base">System activity</CardTitle><CardDescription className="mt-1">Last synced {refreshed}</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">{[['08:42', 'AM-204 accepted', 'Cardiac event', 'text-primary'], ['08:41', 'Capacity synced', 'St. Mary’s Medical', 'text-emerald-500'], ['08:39', 'Route optimized', 'AM-118 · 2.4 min saved', 'text-amber-500'], ['08:36', 'Unit ready', 'AM-309 back in service', 'text-muted-foreground']].map(([time, title, detail, tone]) => <div key={time} className="flex gap-3"><span className={cn('mt-1.5 size-2 rounded-full bg-current', tone)} /><div className="min-w-0"><div className="flex items-center gap-2"><p className="text-xs font-medium">{title}</p><span className="font-mono text-[10px] text-muted-foreground">{time}</span></div><p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p></div></div>)}</CardContent></Card></div>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/[0.05] p-4"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck /></div><div><p className="text-sm font-semibold">Your response grid is healthy</p><p className="mt-1 text-xs text-muted-foreground">All 18 hospitals and 31 units are reporting. Last sync {refreshed}.</p></div></div><Button variant="ghost" size="icon" aria-label="Dismiss status"><X /></Button></div>
      </main>
    </div>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}><DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-lg"><DialogTitle className="sr-only">Search PulseRoute</DialogTitle><div className="flex items-center gap-3 border-b px-4"><Search className="size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search workspace..." className="h-14 border-0 px-0 shadow-none focus-visible:ring-0" autoFocus /><kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">ESC</kbd></div><div className="p-2">{filteredNav.map(({ label, icon: Icon }) => <button type="button" key={label} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-muted" onClick={() => setSearchOpen(false)}><Icon className="size-4 text-muted-foreground" />{label}<ChevronRight className="ml-auto size-4 text-muted-foreground" /></button>)}{filteredNav.length === 0 && <p className="p-4 text-sm text-muted-foreground">No matching workspace items.</p>}</div></DialogContent></Dialog>
  </div>
}
