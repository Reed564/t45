// Light Color System - Harmonized with Dark Theme for Consistency
export const colors = {
  // Primary Brand Colors (Consistent with dark theme)
  primary: {
    50: "#F0FDFF", // Very light cyan
    100: "#CCFBF1", // Light cyan
    200: "#99F6E4", // Lighter cyan
    300: "#5EEAD4", // Medium light cyan
    400: "#2DD4BF", // Medium cyan
    500: "#00D9FF", // Primary cyan (matches dark theme)
    600: "#00B8E6", // Dark cyan
    700: "#0099CC", // Darker cyan
    800: "#007A99", // Very dark cyan
    900: "#005C73", // Deepest cyan
  },

  // Secondary (Harmonized grays)
  secondary: {
    50: "#FAFAFA", // Almost white
    100: "#F5F5F5", // Very light gray
    200: "#E5E5E5", // Light gray
    300: "#D4D4D4", // Medium light gray
    400: "#A3A3A3", // Medium gray
    500: "#737373", // Primary gray
    600: "#525252", // Dark gray
    700: "#404040", // Darker gray
    800: "#262626", // Very dark gray (harmonized with dark theme)
    900: "#171717", // Deepest gray
  },

  // Status Colors (Consistent with dark theme)
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981", // Matches dark theme
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B", // Matches dark theme
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#DC2626", // Matches dark theme
    600: "#B91C1C",
    700: "#991B1B",
    800: "#7F1D1D",
    900: "#7F1D1D",
  },

  // Background Colors (Harmonized)
  background: {
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    tertiary: "#F5F5F5",
    accent: "#F0FDFF", // Light cyan accent
  },

  // Text Colors (Consistent contrast ratios)
  text: {
    primary: "#171717", // Very dark gray
    secondary: "#404040", // Dark gray
    tertiary: "#737373", // Medium gray
    quaternary: "#A3A3A3", // Light gray
    inverse: "#FFFFFF", // White
  },

  // Border Colors
  border: {
    light: "#E5E5E5",
    medium: "#D4D4D4",
    dark: "#A3A3A3",
    accent: "#99F6E4", // Light cyan
  },
}

// Component-specific color mappings for light theme
export const componentColors = {
  status: {
    connected: {
      bg: colors.success[100],
      text: colors.success[700],
      border: colors.success[200],
    },
    processing: {
      bg: colors.primary[100],
      text: colors.primary[700],
      border: colors.primary[200],
    },
    error: {
      bg: colors.error[100],
      text: colors.error[700],
      border: colors.error[200],
    },
    warning: {
      bg: colors.warning[100],
      text: colors.warning[700],
      border: colors.warning[200],
    },
    inactive: {
      bg: colors.secondary[100],
      text: colors.secondary[600],
      border: colors.secondary[200],
    },
  },
}
