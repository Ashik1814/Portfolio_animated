import * as LucideIcons from 'lucide-react'
import { HelpCircle } from 'lucide-react'
import {
  FaWhatsapp,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaDiscord,
  FaTiktok,
  FaMedium,
  FaDribbble,
  FaBehance,
  FaPinterest,
} from 'react-icons/fa'
import {
  SiGmail,
  SiGoogle,
  SiSlack,
  SiStackoverflow,
  SiFigma,
  SiSpotify,
  SiDevdotto,
} from 'react-icons/si'

/**
 * Map of brand icon names to their components.
 * Names starting with "Fa" come from react-icons/fa (FontAwesome brands).
 * Names starting with "Si" come from react-icons/si (Simple Icons).
 */
const BRAND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // FontAwesome brand icons
  FaWhatsapp,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaDiscord,
  FaTiktok,
  FaMedium,
  FaDribbble,
  FaBehance,
  FaPinterest,
  // Simple Icons
  SiGmail,
  SiGoogle,
  SiSlack,
  SiStackoverflow,
  SiFigma,
  SiSpotify,
  SiDevdotto,
}

/**
 * Resolve an icon name string to its React component.
 * - Names like "FaWhatsapp", "SiGmail" → brand icons from react-icons
 * - Plain names like "Mail", "Phone", "Github" → Lucide icons
 * Falls back to HelpCircle if not found.
 */
export function getIcon(name: string): React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }> {
  // Check brand icons first
  if (BRAND_ICONS[name]) {
    return BRAND_ICONS[name] as React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>
  }
  // Fall back to Lucide
  return (LucideIcons as Record<string, unknown>)[name] as React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }> || HelpCircle
}

/** Sorted list of available brand icon names for use in admin UIs */
export const BRAND_ICON_OPTIONS = Object.keys(BRAND_ICONS).sort()
