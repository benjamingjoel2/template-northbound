"use client";

import { useEffect, useState } from "react";

/** The current year — correct even when the page was built last year. */
export function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
