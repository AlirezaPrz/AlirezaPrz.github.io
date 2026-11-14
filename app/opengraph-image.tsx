import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { site } from "@/data/site"

export const alt = `${site.name}: ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const [manrope, mono] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Manrope-ExtraBold.woff")),
    readFile(path.join(process.cwd(), "assets/fonts/DMMono-Regular.woff")),
  ])

  const rows = [
    ["Now", "CS @ University of Toronto"],
    ["Builds", "offline AI, backends, game bots"],
    ["Also", "movies, music, lifting"],
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "72px 80px",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "DM Mono", fontSize: 24, color: "#666" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#2b44e6" }} />
          alirezaprz
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: "-0.045em" }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, borderBottom: "1px solid #e7e7e5" }}>
            {rows.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  borderTop: "1px solid #e7e7e5",
                  padding: "14px 0",
                  fontFamily: "DM Mono",
                  fontSize: 26,
                }}
              >
                <div style={{ width: 170, color: "#666" }}>{k}</div>
                <div style={{ color: "#111" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope, weight: 800, style: "normal" },
        { name: "DM Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  )
}
