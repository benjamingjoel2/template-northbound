/** 64.0164, -16.9667 → 64° 00′ 59″ N, 16° 58′ 00″ W */
export function formatCoordinates({ lat, lng }: { lat: number; lng: number }) {
  const dms = (v: number) => {
    const a = Math.abs(v);
    const d = Math.floor(a);
    const mFloat = (a - d) * 60;
    const m = Math.floor(mFloat);
    const s = Math.round((mFloat - m) * 60);
    return `${d}° ${String(m).padStart(2, "0")}′ ${String(s).padStart(2, "0")}″`;
  };
  return `${dms(lat)} ${lat >= 0 ? "N" : "S"}, ${dms(lng)} ${lng >= 0 ? "E" : "W"}`;
}
