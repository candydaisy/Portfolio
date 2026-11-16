"use client";

import { useEffect, useState } from "react";
import { calculateAge } from "@/lib/age";
import type { Lang, LocalizedString } from "@/lib/types";
import { t } from "@/lib/types";

type AgeDisplayProps = {
  dateOfBirth: string;
  lang: Lang;
  yearsLabel: LocalizedString;
};

export default function AgeDisplay({
  dateOfBirth,
  lang,
  yearsLabel,
}: AgeDisplayProps) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      setAge(calculateAge(dateOfBirth));
    }
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [dateOfBirth]);

  return (
    <span>
      <span className="accent">{age === null ? "—" : age}</span>{" "}
      {t(yearsLabel, lang)}
    </span>
  );
}
