"use client";

import { createContext, useContext } from "react";
import siteJson from "@/content/site.json";
import type { SiteInfo } from "@/lib/content/types";

/**
 * Makes editable site info (phone, email, address…) available to client
 * components without threading a prop through every page.
 *
 * Server components should call `getSite()` from `@/lib/content` directly.
 *
 * Note: this imports only `site.json` for its fallback — importing the seed
 * barrel would pull the product and gallery data into the client bundle.
 */

const FALLBACK = siteJson as SiteInfo;

const SiteContext = createContext<SiteInfo>(FALLBACK);

export function SiteProvider({ value, children }: { value: SiteInfo; children: React.ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Current site info. Falls back to built-in values rather than throwing. */
export function useSite(): SiteInfo {
  return useContext(SiteContext);
}
