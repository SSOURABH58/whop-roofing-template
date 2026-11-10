import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, ChevronUp, Eye, CheckCircle2 } from 'lucide-react';
import type { TrackingEventData } from '../lib/tracking';

export const PixelTrackerHUD: React.FC = () => {
  const [events, setEvents] = useState<TrackingEventData[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastFired, setLastFired] = useState<string | null>(null);

  useEffect(() => {
    const handlePixelEvent = (e: Event) => {
      const customEvent = e as CustomEvent<TrackingEventData>;
      if (customEvent.detail) {
        setEvents((prev) => [customEvent.detail, ...prev].slice(0, 10));
        setLastFired(customEvent.detail.eventName);
        
        // Clear recent highlight after 4s
        const timer = setTimeout(() => {
          setLastFired(null);
        }, 4000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('whop:pixel', handlePixelEvent);
    return () => window.removeEventListener('whop:pixel', handlePixelEvent);
  }, []);

  return (
    <aside 
      aria-label="Whop Pixel Tracking Monitor"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-full sm:w-auto"
    >
      <div className="bg-navy-950/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md text-slate-200 overflow-hidden font-sans text-xs">
        {/* Toggle Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-navy-900/90 hover:bg-navy-800/90 transition-colors text-left"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white tracking-wide flex items-center gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              whop.track Monitor
            </span>
            {lastFired && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] animate-pulse">
                {lastFired}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[10px] font-mono">{events.length} events</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </button>

        {/* Event List */}
        {isExpanded && (
          <div className="p-3 space-y-2 max-h-64 overflow-y-auto border-t border-slate-800">
            {events.length === 0 ? (
              <p className="text-slate-400 italic py-2 text-center text-[11px]">
                Waiting for actions... Click plans or submit estimate to fire events.
              </p>
            ) : (
              events.map((evt, idx) => (
                <div 
                  key={idx} 
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {evt.eventName}
                    </span>
                    <span className="text-[10px] text-slate-400">{evt.timestamp}</span>
                  </div>
                  <pre className="text-[10px] text-slate-300 bg-slate-950/80 p-1.5 rounded overflow-x-auto font-mono">
                    {JSON.stringify(evt.payload, null, 2)}
                  </pre>
                </div>
              ))
            )}
            <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Whop Telemetry</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Eye className="w-3 h-3" /> Live Tracking
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
