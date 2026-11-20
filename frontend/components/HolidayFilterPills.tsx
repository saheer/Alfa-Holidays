import { ALL } from "@/lib/holidayTrips";

type Props = {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
  label?: string;
};

// "All" + one pill per category. Active = navy fill, inactive = white with a thin outline.
export default function HolidayFilterPills({
  categories,
  active,
  onChange,
  label = "Filter holidays",
}: Props) {
  if (categories.length === 0) return null;
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {[ALL, ...categories].map((c) => {
        const on = c === active;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(c)}
            className={`h-10 rounded-full border px-5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan ${
              on
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-line bg-white text-ink shadow-sm hover:border-brand-cyan hover:text-brand-blue"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
