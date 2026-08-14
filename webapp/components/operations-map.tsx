"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { Activity, LocateFixed, Radio, Route, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ambulanceStart: LatLngExpression = [40.724, -73.992];
const hospital: LatLngExpression = [40.752, -73.977];
const route: LatLngExpression[] = [
  ambulanceStart,
  [40.731, -73.986],
  [40.741, -73.983],
  [40.748, -73.98],
  hospital,
];

function RecenterControl() {
  const map = useMap();
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className="absolute right-4 top-4 z-[1000] size-9 rounded-xl border border-foreground/10 bg-background/90 shadow-lg backdrop-blur"
      onClick={() => map.flyTo([40.739, -73.984], 13)}
      aria-label="Recenter live map"
    >
      <LocateFixed />
    </Button>
  );
}

export function OperationsMap() {
  const [activeUnit, setActiveUnit] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="live-map"
      className="border-y border-foreground/10 bg-foreground/[0.025] px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <p className="eyebrow">Live operations layer</p>
          <h2 className="section-title">
            Watch the handoff happen in real time.
          </h2>
          <p className="mt-6 max-w-lg text-pretty leading-7 text-muted-foreground">
            A working view of the response grid: units moving, routes updating,
            and receiving teams preparing before the ambulance arrives.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {[
              [
                "01",
                "Unit telemetry",
                "GPS, heading, and status are synced every two seconds.",
              ],
              [
                "02",
                "Route intelligence",
                "The safest path adapts as the city changes.",
              ],
              [
                "03",
                "Hospital readiness",
                "Capacity and arrival windows stay visible to everyone.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="flex gap-4 border-t border-foreground/10 py-4"
              >
                <span className="font-mono text-xs text-primary">{number}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-background shadow-2xl shadow-primary/10">
          <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-500 shadow-[0_0_12px] shadow-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Response grid / NYC-01
              </span>
            </div>
            <Badge
              variant="secondary"
              className="gap-1 rounded-md font-mono text-[10px]"
            >
              <Wifi /> LIVE
            </Badge>
          </div>
          <div className="relative h-[360px] sm:h-[460px]">
            <MapContainer
              center={[40.739, -73.984]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={route}
                pathOptions={{
                  color: "var(--primary)",
                  weight: 5,
                  opacity: 0.85,
                  dashArray: "10 12",
                }}
              />
              <CircleMarker
                center={hospital}
                radius={11}
                pathOptions={{
                  color: "#10b981",
                  fillColor: "#10b981",
                  fillOpacity: 0.95,
                }}
                eventHandlers={{ click: () => setActiveUnit(false) }}
              >
                <Popup>
                  <strong>St. Mary&apos;s Medical Center</strong>
                  <br />
                  Receiving capacity: 82%
                </Popup>
              </CircleMarker>
              <CircleMarker
                center={ambulanceStart}
                radius={11 + (tick % 2) * 2}
                pathOptions={{
                  color: "var(--primary)",
                  fillColor: "var(--primary)",
                  fillOpacity: 0.95,
                }}
                eventHandlers={{ click: () => setActiveUnit(true) }}
              >
                <Popup>
                  <strong>AM-204</strong>
                  <br />
                  Cardiac event · ETA 04:12
                </Popup>
              </CircleMarker>
              <RecenterControl />
            </MapContainer>
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[1000] flex items-end justify-between gap-3 sm:inset-x-5">
              <div className="pointer-events-auto rounded-2xl border border-foreground/10 bg-background/90 p-3 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2">
                  <Radio className="size-4 text-primary" />
                  <span className="text-sm font-semibold">
                    AM-204 / Cardiac event
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Route className="size-3" /> ETA 04:12
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="size-3 text-emerald-500" />{" "}
                    {activeUnit ? "EN ROUTE" : "RECEIVING"}
                  </span>
                </div>
              </div>
              <div className="hidden rounded-xl border border-foreground/10 bg-background/90 px-3 py-2 font-mono text-[10px] text-muted-foreground shadow-lg backdrop-blur sm:block">
                LAT 40.739 · LNG -73.984
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OperationsMap;
