import { useEffect, useRef, useState } from "react";
import type { Panel } from "./model";
export function useAmbient(panel: Panel | "all") {
  const [enabled, setEnabled] = useState(false),
    [volume, setVolume] = useState(0.25),
    [unavailable, setUnavailable] = useState(false);
  const context = useRef<AudioContext | null>(null),
    master = useRef<GainNode | null>(null),
    oscillators = useRef<OscillatorNode[]>([]);
  useEffect(() => {
    if (!enabled) return;
    try {
      const c = new AudioContext();
      context.current = c;
      const g = c.createGain();
      g.gain.value = 0;
      g.connect(c.destination);
      master.current = g;
      [55, 82.4, 110].forEach((frequency, i) => {
        const o = c.createOscillator();
        o.type = "sine";
        o.frequency.value = frequency;
        const a = c.createGain();
        a.gain.value = 0.055 / (i + 1);
        o.connect(a);
        a.connect(g);
        o.start();
        oscillators.current.push(o);
      });
      c.resume().catch(() => setUnavailable(true));
      return () => {
        oscillators.current.forEach((o) => o.stop());
        oscillators.current = [];
        c.close();
        context.current = null;
        master.current = null;
      };
    } catch {
      setUnavailable(true);
    }
  }, [enabled]);
  useEffect(() => {
    const c = context.current,
      g = master.current;
    if (c && g) g.gain.setTargetAtTime(volume, c.currentTime, 0.25);
  }, [volume, enabled]);
  useEffect(() => {
    const f =
      panel === "hell"
        ? [46.25, 69.3, 92.5]
        : panel === "garden"
          ? [61.74, 92.5, 123.47]
          : [55, 82.4, 110];
    const c = context.current;
    if (c)
      oscillators.current.forEach((o, i) =>
        o.frequency.setTargetAtTime(f[i], c.currentTime, 1.5),
      );
  }, [panel, enabled]);
  useEffect(() => {
    const pause = () => {
      const c = context.current;
      if (c) {
        if (document.hidden) c.suspend();
        else c.resume().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, []);
  return { enabled, setEnabled, volume, setVolume, unavailable };
}
