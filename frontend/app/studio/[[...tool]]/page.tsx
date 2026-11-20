import { Studio } from "./Studio";

// Studio-യുടെ ശരിയായ title, viewport എന്നിവയ്ക്ക്
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
