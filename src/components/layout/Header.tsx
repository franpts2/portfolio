import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { icons } from "../../assets/icons.js";
import { EASE_OUT_EXPO } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Beyond the code", href: "#beyond-the-code" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Set when the menu is dismissed by keyboard or the backdrop, so focus goes
  // back where it came from instead of being lost on <body>.
  const restoreFocusRef = useRef(false);

  const closeMobile = useCallback((restoreFocus = false) => {
    if (restoreFocus) restoreFocusRef.current = true;
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    // Lenis owns scrolling: stopping it also clips the document, so the page
    // cannot drift behind the menu on either wheel or touch.
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile(true);
    };

    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpointChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    // Move focus into the disclosure so keyboard users land on the first link
    // rather than tabbing through the page behind the open menu.
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis?.start();
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [mobileOpen, lenis, closeMobile]);

  useEffect(() => {
    if (mobileOpen || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    toggleRef.current?.focus();
  }, [mobileOpen]);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/90 backdrop-blur-sm hairline">
      <div className="container-main">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Primary"
        >
          <a
            href="#"
            className="inline-flex min-h-11 items-center font-display font-semibold text-lg tracking-tight text-(--color-ink) hover:text-(--color-accent) transition-colors"
            aria-label={`${profile.name}, Home`}
          >
            {profile.mark}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="t-label inline-flex min-h-11 items-center hover:text-(--color-accent) transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center text-(--color-ink) hover:text-(--color-accent) transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <Icon
              icon={mobileOpen ? icons.close.outline : icons.menu.outline}
              height={24}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeMobile(true)}
            className="absolute inset-x-0 top-full md:hidden mobile-menu-scrim bg-(--color-ink)/20"
          />
        )}
        {mobileOpen && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="md:hidden absolute top-full left-0 right-0 overflow-y-auto overscroll-contain bg-(--color-bg) hairline mobile-menu-panel"
          >
            <ul className="container-main py-4 flex flex-col gap-3">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="block py-2.5 text-lg font-display font-medium text-(--color-ink) hover:text-(--color-accent) transition-colors"
                    onClick={() => {
                      // Restart scrolling before Lenis handles the anchor click:
                      // a stopped instance ignores scrollTo, so the menu would
                      // close without taking the visitor anywhere.
                      lenis?.start();
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
