import { HeartPulse } from "lucide-react";

export function Loader({ text = "Loading MediConnect..." }) {
  return (
    <div className="fullscreen-loader">
      <div className="loader-pulse-symbol">
        <HeartPulse size={36} className="pulse-icon text-teal" />
      </div>
      <p className="mt-3 font-semibold text-secondary">{text}</p>
    </div>
  );
}

export default Loader;
