import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Apple touch icon: a lowercase "a" in Manrope ExtraBold with the accent dot. */
export default async function AppleIcon() {
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
          borderRadius: 0,
          position: "relative",
        }}
      >
        <div style={{ color: "#ffffff", fontSize: 140, fontFamily: "Manrope", lineHeight: 1, marginTop: -22 }}>a</div>
        <div
          style={{
            position: "absolute",
            right: 36,
            bottom: 40,
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "#8a95ff",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: manrope, weight: 800, style: "normal" }] },
  )
}
