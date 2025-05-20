"use client"

import { usePathname } from "next/navigation"

export function useActivePath() {
  const pathname = usePathname()

  // Check if a key or paths is active (you can keep this for your logic)
  const isActive = (keyOrPaths: string | string[], exact = true): boolean => {
    let paths = keyOrPaths

    if (typeof keyOrPaths === "string") {
      // if key, no routes lookup here, just assume key is path
      paths = keyOrPaths
    }

    if (Array.isArray(paths)) {
      return paths.some((p) => (exact ? pathname === p : pathname.startsWith(p)))
    }

    return exact ? pathname === paths : pathname.startsWith(paths)
  }

  // Get last path segment and capitalize it
  const getCurrentRouteLabel = (): string | null => {
    if (!pathname) return null

    const trimmed = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname
    const segments = trimmed.split("/")

    if (segments.length === 0) return null

    const lastSegment = segments[segments.length - 1]

    if (!lastSegment) return null

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase()
  }

  return { pathname, isActive, getCurrentRouteLabel }
}