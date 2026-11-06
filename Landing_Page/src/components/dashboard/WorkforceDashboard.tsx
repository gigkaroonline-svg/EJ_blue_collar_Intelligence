"use client";

import { useMemo, useState } from "react";
import { dashboard } from "@/content/site";
import { cn } from "@/lib/cn";

type Tab = (typeof dashboard.tabs)[number];

const GEO = {
  states: [{ id: "bihar", name: "Bihar" }],
  districts: {
    bihar: [{ id: "gaya", name: "Gaya" }],
  } as Record<string, { id: string; name: string }[]>,
  blocks: {
    gaya: [{ id: "sample-block", name: "Sample Block" }],
  } as Record<string, { id: string; name: string }[]>,
  villages: {
    "sample-block": [{ id: "sample-village", name: "Sample Village" }],
  } as Record<string, { id: string; name: string }[]>,
};

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-rm-muted">
        <span>{label}</span>
        <span className="font-semibold text-rm-navy">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-rm-surface">
        <div
          className="h-full rounded-full bg-rm-green"
          style={{ width: `${value}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export function WorkforceDashboard() {
  const [tab, setTab] = useState<Tab>("Geography");
  const [stateId, setStateId] = useState("bihar");
  const [districtId, setDistrictId] = useState("gaya");
  const [blockId, setBlockId] = useState("sample-block");
  const [villageId, setVillageId] = useState("sample-village");

  const districts = GEO.districts[stateId] ?? [];
  const blocks = GEO.blocks[districtId] ?? [];
  const villages = GEO.villages[blockId] ?? [];
  const villageName = useMemo(
    () => villages.find((v) => v.id === villageId)?.name ?? "Sample Village",
    [villages, villageId],
  );

  const path = [
    "India",
    GEO.states.find((s) => s.id === stateId)?.name ?? "State",
    districts.find((d) => d.id === districtId)?.name ?? "District",
    blocks.find((b) => b.id === blockId)?.name ?? "Block",
    villageName,
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-rm-border bg-rm-navy-deep shadow-xl shadow-rm-navy/15">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div>
          <p className="mono-label text-white/50">Workforce intelligence</p>
          <p className="text-sm font-medium text-white">Village exploration console</p>
        </div>
        <span className="demo-badge">Demonstration data</span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        {dashboard.tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition",
              tab === item
                ? "bg-rm-green text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <p className="mono-label mb-3 text-white/50">Geographic selection</p>
          <label className="mb-3 block text-xs text-white/60">
            State
            <select
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              value={stateId}
              onChange={(e) => {
                setStateId(e.target.value);
                const nextDistrict = GEO.districts[e.target.value]?.[0]?.id ?? "";
                setDistrictId(nextDistrict);
                const nextBlock = GEO.blocks[nextDistrict]?.[0]?.id ?? "";
                setBlockId(nextBlock);
                setVillageId(GEO.villages[nextBlock]?.[0]?.id ?? "");
              }}
            >
              {GEO.states.map((s) => (
                <option key={s.id} value={s.id} className="text-rm-navy">
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-3 block text-xs text-white/60">
            District
            <select
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              value={districtId}
              onChange={(e) => {
                setDistrictId(e.target.value);
                const nextBlock = GEO.blocks[e.target.value]?.[0]?.id ?? "";
                setBlockId(nextBlock);
                setVillageId(GEO.villages[nextBlock]?.[0]?.id ?? "");
              }}
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id} className="text-rm-navy">
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-3 block text-xs text-white/60">
            Block
            <select
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              value={blockId}
              onChange={(e) => {
                setBlockId(e.target.value);
                setVillageId(GEO.villages[e.target.value]?.[0]?.id ?? "");
              }}
            >
              {blocks.map((b) => (
                <option key={b.id} value={b.id} className="text-rm-navy">
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-white/60">
            Village
            <select
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
            >
              {villages.map((v) => (
                <option key={v.id} value={v.id} className="text-rm-navy">
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <div className="bg-rm-surface p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-rm-muted">
            {path.map((crumb, index) => (
              <span key={`${crumb}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden>/</span> : null}
                <span
                  className={cn(
                    "rounded-md px-2 py-1",
                    index === path.length - 1
                      ? "bg-rm-navy text-white"
                      : "bg-white text-rm-muted",
                  )}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          {(tab === "Geography" || tab === "Availability") && (
            <div className="rounded-xl border border-rm-border bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mono-label text-rm-muted">{dashboard.profile.title}</p>
                  <h3 className="mt-1 text-lg font-semibold text-rm-navy">{villageName}</h3>
                </div>
                <span className="demo-badge">Illustrative</span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {dashboard.profile.rows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-rm-border bg-rm-surface px-3 py-2.5"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.08em] text-rm-muted">
                      {row.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-rm-navy">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(tab === "Occupations" ||
            tab === "Skills" ||
            tab === "Migration" ||
            tab === "Employer Demand") && (
            <div className="grid gap-4 lg:grid-cols-2">
              {dashboard.charts.map((chart) => (
                <div
                  key={chart.title}
                  className="rounded-xl border border-rm-border bg-white p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-rm-navy">{chart.title}</p>
                    <span className="demo-badge">Demo</span>
                  </div>
                  <div className="space-y-3">
                    {chart.bars.map((bar) => (
                      <Bar key={bar.label} label={bar.label} value={bar.value} />
                    ))}
                  </div>
                </div>
              ))}
              {tab === "Employer Demand" ? (
                <div className="rounded-xl border border-rm-border bg-white p-4 lg:col-span-2">
                  <p className="text-sm font-semibold text-rm-navy">
                    Illustrative employer demand signals
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    <li className="rounded-lg border border-rm-border px-3 py-2 text-sm text-rm-muted">
                      Manufacturing helpers · Sample hiring window
                    </li>
                    <li className="rounded-lg border border-rm-border px-3 py-2 text-sm text-rm-muted">
                      Construction crew · Seasonal requirement
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 sm:px-5">
        <p className="text-xs leading-relaxed text-white/55">
          All values in this console are demonstration data for product walkthrough
          purposes. They do not represent live registrations, coverage, partnerships or
          employment outcomes.
        </p>
      </div>
    </div>
  );
}
