export type NavItem = { label: string; to: string }

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Our Philosophy', to: '/philosophy' },
  { label: 'Specialists', to: '/specialists' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

export const footerUtility: NavItem[] = [
  { label: 'Privacy Notice', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Accessibility', to: '/accessibility' },
]
