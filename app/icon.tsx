import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

/** Favicon: a lowercase "a" in Manrope ExtraBold with the accent dot. */
export default async function Icon() {
  const manrope = await readFile(path.join(process.cwd(), "assets/fonts/Manrope-ExtraBold.woff"))
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: 14,
          position: "relative",
        }}
      >
        <div style={{ color: "#ffffff", fontSize: 50, fontFamily: "Manrope", lineHeight: 1, marginTop: -8 }}>a</div>
        <div
          style={{
            position: "absolute",
            right: 12,
            bottom: 14,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#8a95ff",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: manrope, weight: 800, style: "normal" }] },
  )
}
