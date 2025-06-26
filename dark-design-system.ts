// Refined Dark Color System for ContaIA Platform - Optimized for Blue & Carbon Black Harmony
export const darkColors = {
  // Primary Background Colors (Carbon Black Spectrum)
  background: {
    primary: "#0A0A0A", // Deep carbon black - main background
    secondary: "#111111", // Carbon black - sidebar and secondary areas
    tertiary: "#1A1A1A", // Elevated surfaces - cards, panels
    quaternary: "#242424", // Interactive surfaces
    elevated: "#2A2A2A", // Modals, dropdowns
    overlay: "#1F1F1F", // Overlays with slight warmth
  },

  // Surface Colors (Harmonized with carbon black)
  surface: {
    primary: "#1A1A1A", // Main surface - subtle lift from background
    secondary: "#242424", // Secondary surfaces - more prominent
    tertiary: "#2E2E2E", // Tertiary surfaces - interactive elements
    interactive: "#383838", // Hover states - noticeable but not harsh
    hover: "#404040", // Active hover - clear feedback
    active: "#4A4A4A", // Active states - definitive selection
    disabled: "#1C1C1C", // Disabled - barely visible
  },

  // Text Colors (Optimized contrast for carbon backgrounds)
  text: {
    primary: "#FFFFFF", // Pure white - maximum contrast
    secondary: "#E8E8E8", // Near white - high readability
    tertiary: "#CCCCCC", // Light gray - good contrast
    quaternary: "#999999", // Medium gray - subtle text
    disabled: "#555555", // Dark gray - disabled state
    inverse: "#0A0A0A", // For light backgrounds
  },

  // Border Colors (Subtle definition without harshness)
  border: {
    primary: "#2E2E2E", // Subtle borders that don't compete
    secondary: "#383838", // More defined borders
    tertiary: "#4A4A4A", // Prominent borders
    accent: "#00B8E6", // Blue accent borders (harmonized)
    focus: "#00D9FF", // Focus states - brand blue
  },

  // Brand Colors (Blue spectrum harmonized with carbon)
  brand: {
    primary: "#00D9FF", // Electric cyan - main brand (unchanged)
    secondary: "#0EA5E9", // Sky blue - secondary brand
    tertiary: "#0284C7", // Deeper blue - tertiary brand
    quaternary: "#0369A1", // Deep blue - subtle accents
    gradient: {
      start: "#00D9FF",
      end: "#0EA5E9",
    },
  },

  // Accent Colors (Refined to complement blue/carbon theme)
  accent: {
    cyan: "#00D9FF", // Primary brand cyan
    blue: "#0EA5E9", // Secondary blue
    purple: "#7C3AED", // Refined purple (less pink, more blue-leaning)
    pink: "#D946EF", // Refined pink (more purple-leaning)
    orange: "#F59E0B", // Warm orange (balanced)
    yellow: "#EAB308", // Warm yellow (not too bright)
    green: "#10B981", // Refined green (slightly blue-leaning)
  },

  // Status Colors (Refined for better harmony)
  status: {
    success: {
      50: "#0F1F15", // Very dark green with slight blue undertone
      100: "#1A3A22", // Dark green
      200: "#22543D", // Medium dark green
      300: "#2F855A", // Medium green
      400: "#38A169", // Light green
      500: "#10B981", // Primary green (refined)
      600: "#059669", // Bright green
      700: "#047857", // Very bright green
      800: "#065F46", // Light green
      900: "#064E3B", // Very light green
    },
    warning: {
      50: "#1F1A0C", // Very dark amber with carbon undertone
      100: "#3A2F15", // Dark amber
      200: "#54431E", // Medium dark amber
      300: "#92400E", // Medium amber
      400: "#B45309", // Light amber
      500: "#F59E0B", // Primary amber (refined)
      600: "#FBBF24", // Bright amber
      700: "#FCD34D", // Very bright amber
      800: "#FDE68A", // Light amber
      900: "#FEF3C7", // Very light amber
    },
    error: {
      50: "#1F0F0F", // Very dark red with carbon undertone
      100: "#3A1A1A", // Dark red
      200: "#542222", // Medium dark red
      300: "#7F1D1D", // Medium red
      400: "#991B1B", // Light red
      500: "#DC2626", // Primary red (refined)
      600: "#EF4444", // Bright red
      700: "#F87171", // Very bright red
      800: "#FCA5A5", // Light red
      900: "#FEE2E2", // Very light red
    },
    info: {
      50: "#0C1419", // Very dark blue (harmonized with brand)
      100: "#1E293B", // Dark blue
      200: "#334155", // Medium dark blue
      300: "#475569", // Medium blue
      400: "#64748B", // Light blue
      500: "#0EA5E9", // Primary blue (matches brand secondary)
      600: "#0284C7", // Bright blue
      700: "#0369A1", // Very bright blue
      800: "#075985", // Light blue
      900: "#0C4A6E", // Very light blue
    },
  },

  // Component-specific colors (Refined for harmony)
  components: {
    // Button variants
    button: {
      primary: {
        bg: "#00D9FF",
        hover: "#00B8E6",
        active: "#0099CC",
        text: "#0A0A0A",
      },
      secondary: {
        bg: "#2E2E2E", // Harmonized with surface colors
        hover: "#383838",
        active: "#4A4A4A",
        text: "#FFFFFF",
      },
      ghost: {
        bg: "transparent",
        hover: "#242424", // Subtle hover
        active: "#2E2E2E",
        text: "#E8E8E8",
      },
    },

    // Card variants (Refined for better layering)
    card: {
      primary: {
        bg: "#1A1A1A", // Subtle lift from background
        border: "#2E2E2E", // Soft definition
        hover: "#242424", // Clear but not harsh
      },
      elevated: {
        bg: "#242424", // More prominent
        border: "#383838", // Defined borders
        hover: "#2A2A2A", // Subtle hover
      },
      interactive: {
        bg: "#2E2E2E", // Interactive surfaces
        border: "#4A4A4A", // Clear borders
        hover: "#383838", // Responsive hover
      },
    },

    // Input variants (Optimized for carbon theme)
    input: {
      bg: "#242424", // Clear distinction from background
      border: "#383838", // Defined but not harsh
      focus: "#00D9FF", // Brand blue focus
      text: "#FFFFFF", // High contrast text
      placeholder: "#999999", // Readable placeholder
    },

    // Navigation (Sidebar optimized)
    nav: {
      bg: "#111111", // Carbon black (unchanged)
      border: "#2E2E2E", // Subtle borders
      active: "#00D9FF", // Brand blue active state
      hover: "#242424", // Subtle hover
      text: "#E8E8E8", // High readability
    },

    // Status badges (Refined for better integration)
    badge: {
      connected: {
        bg: "#0F1F15", // Dark green with carbon undertone
        text: "#10B981", // Refined green
        border: "#22543D",
      },
      processing: {
        bg: "#0C1419", // Dark blue harmonized with brand
        text: "#0EA5E9", // Brand secondary blue
        border: "#334155",
      },
      error: {
        bg: "#1F0F0F", // Dark red with carbon undertone
        text: "#DC2626", // Refined red
        border: "#542222",
      },
      warning: {
        bg: "#1F1A0C", // Dark amber with carbon undertone
        text: "#F59E0B", // Refined amber
        border: "#54431E",
      },
      inactive: {
        bg: "#1C1C1C", // Barely visible
        text: "#999999", // Subtle text
        border: "#2E2E2E",
      },
    },
  },

  // Shadows (Enhanced for carbon black backgrounds)
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.6)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
    glow: "0 0 20px rgba(0, 217, 255, 0.25)", // Refined glow - less intense
    glowSubtle: "0 0 10px rgba(0, 217, 255, 0.15)", // Subtle glow for smaller elements
  },

  // Gradients (Refined for better harmony)
  gradient: {
    primary: `linear-gradient(135deg, #00D9FF 0%, #0EA5E9 100%)`,
    secondary: `linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)`,
    success: `linear-gradient(135deg, #10B981 0%, #059669 100%)`,
    warning: `linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)`,
    error: `linear-gradient(135deg, #DC2626 0%, #EF4444 100%)`,
    dark: `linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)`,
    carbonBlue: `linear-gradient(135deg, #111111 0%, #0C1419 100%)`, // New: carbon to blue
  },
}

// Enhanced utility functions
export const darkColorUtils = {
  // Add opacity to colors
  withOpacity: (color: string, opacity: number) => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  },

  // Get harmonized hover state
  hover: (baseColor: string, amount = 0.1) => {
    // Lightens the color slightly for hover states
    return baseColor // Simplified for example
  },

  // Get focus ring with brand blue
  focusRing: (color: string = darkColors.brand.primary) => ({
    boxShadow: `0 0 0 2px ${darkColorUtils.withOpacity(color, 0.4)}`,
    outline: "none",
  }),

  // Get subtle glow effect
  glow: (color: string = darkColors.brand.primary, intensity = 0.2) => ({
    boxShadow: `0 0 15px ${darkColorUtils.withOpacity(color, intensity)}`,
  }),

  // Get carbon-harmonized color
  carbonHarmonize: (color: string, carbonBlend = 0.1) => {
    // Blends any color with carbon black for harmony
    return color // Simplified for example
  },
}

// Enhanced component theme mappings
export const componentTheme = {
  // Status indicators with refined colors
  getStatusColor: (status: string) => {
    const statusMap = {
      connected: darkColors.components.badge.connected,
      active: darkColors.components.badge.connected,
      processing: darkColors.components.badge.processing,
      syncing: darkColors.components.badge.processing,
      error: darkColors.components.badge.error,
      failed: darkColors.components.badge.error,
      warning: darkColors.components.badge.warning,
      pending: darkColors.components.badge.warning,
      inactive: darkColors.components.badge.inactive,
      disconnected: darkColors.components.badge.inactive,
    }
    return statusMap[status as keyof typeof statusMap] || darkColors.components.badge.inactive
  },

  // Role colors harmonized with theme
  getRoleColor: (role: string) => {
    const roleMap = {
      admin: { bg: "#1F0F0F", text: "#DC2626", border: "#542222" },
      manager: { bg: "#0C1419", text: "#0EA5E9", border: "#334155" },
      user: { bg: "#0F1F15", text: "#10B981", border: "#22543D" },
    }
    return roleMap[role as keyof typeof roleMap] || darkColors.components.badge.inactive
  },

  // Plan colors with blue harmony
  getPlanColor: (plan: string) => {
    const planMap = {
      enterprise: { bg: "#0C1419", text: "#0EA5E9", border: "#334155" },
      professional: { bg: "#1A0F1F", text: "#7C3AED", border: "#4C1D95" },
      starter: { bg: "#1C1C1C", text: "#CCCCCC", border: "#383838" },
    }
    return planMap[plan as keyof typeof planMap] || darkColors.components.badge.inactive
  },

  // Integration colors harmonized
  getIntegrationColor: (integration: string) => {
    const integrationMap = {
      quickbooks: { bg: "#0C1419", text: "#0EA5E9", border: "#334155" },
      excel: { bg: "#0F1F15", text: "#10B981", border: "#22543D" },
      xero: { bg: "#0C1419", text: "#00D9FF", border: "#334155" },
      chase: { bg: "#0C1419", text: "#0284C7", border: "#334155" },
      sap: { bg: "#1C1C1C", text: "#CCCCCC", border: "#383838" },
    }
    return integrationMap[integration as keyof typeof integrationMap] || darkColors.components.badge.inactive
  },
}
