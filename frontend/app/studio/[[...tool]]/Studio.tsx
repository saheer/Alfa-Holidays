"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export function Studio() {
  return (
    <>
      {/* Studio തുറന്നിരിക്കുമ്പോൾ സൈറ്റിന്റെ Footer മറയ്ക്കുന്നു (Footer root layout-ലാണ്) */}
      <style>{`body > footer { display: none !important; }`}</style>
      <NextStudio config={config} />
    </>
  );
}
