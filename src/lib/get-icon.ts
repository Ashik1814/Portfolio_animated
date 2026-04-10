import * as LucideIcons from 'lucide-react'
import { HelpCircle } from 'lucide-react'

/**
 * Resolve a Lucide icon name string to its React component.
 * Falls back to HelpCircle if not found.
 */
export function getIcon(name: string): React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }> {
  return (LucideIcons as Record<string, unknown>)[name] as React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }> || HelpCircle
}
