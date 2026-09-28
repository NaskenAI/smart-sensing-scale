import { Footprints, Thermometer, type LucideIcon } from "lucide-react";
import { measures, type MeasureIcon } from "../content/project";
import { Section } from "./Section";

const icons: Record<MeasureIcon, LucideIcon> = {
  pressure: Footprints,
  temperature: Thermometer,
};

export function Measures() {
  return (
    <Section id="measures" heading={measures.heading} intro={measures.intro}>
      <ul className="grid gap-6 md:grid-cols-2">
        {measures.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.label} className="flex gap-4 rounded border border-line bg-surface p-6">
              <Icon aria-hidden="true" className="size-9 shrink-0 text-accent" />
              <div>
                <h3 className="text-xl font-bold">{item.label}</h3>
                <p className="mt-2">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
