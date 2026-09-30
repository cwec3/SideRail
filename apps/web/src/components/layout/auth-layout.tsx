import * as React from "react";

/**
 * Login shell — custom dark-blue theme with animated starfield.
 * (Originally "SideRail AuthShell", now restyled for personal use.)
 */
export function AuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sr-login-page">
      {/* Background: gradient + orbs + stars */}
      <div className="sr-login-bg" />
      <div className="sr-login-grid" />
      <div className="sr-login-stars" ref={mountStars} />
      <div className="sr-login-orbs">
        <span className="sr-orb sr-orb-1" />
        <span className="sr-orb sr-orb-2" />
        <span className="sr-orb sr-orb-3" />
        <span className="sr-orb sr-orb-4" />
      </div>

      {/* Center card */}
      <div className="sr-login-wrap">
        <div className="sr-login-box">
          <div className="sr-login-logo">
            <h1 className="sr-login-title">エムエムディー</h1>
            <p className="sr-login-sub">Enter your password to continue</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Mounts a field of small twinkling stars into the given container.
 * Runs once on mount.
 */
function mountStars(el: HTMLDivElement | null) {
  if (!el) return;
  if (el.dataset.mounted === "1") return;
  el.dataset.mounted = "1";

  const N = 40;
  let html = "";
  for (let i = 0; i < N; i++) {
    const size = (Math.random() * 2 + 1).toFixed(1);
    const top = (Math.random() * 100).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const dur = (Math.random() * 3 + 2).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);
    html += `<span class="sr-star" style="width:${size}px;height:${size}px;top:${top}%;left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
  }
  el.innerHTML = html;
}
