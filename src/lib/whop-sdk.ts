/**
 * Whop Client SDK & Elements Configuration
 *
 * Configures Whop Elements React components for embedded checkout,
 * deposit reservations, express checkout buttons, and theme integration.
 */

export interface WhopClientConfig {
  appId: string;
  isProduction: boolean;
}

export const whopConfig: WhopClientConfig = {
  appId: (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WHOP_APP_ID) || 'app_roofing_demo_apex',
  isProduction: typeof process !== 'undefined' && process.env?.NODE_ENV === 'production',
};

/**
 * Whop Elements theme styling matching our contractor palette
 */
export const whopElementsTheme = {
  appearance: {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#F59E0B',        // Industrial Amber / Gold
      colorBackground: '#070A0F',     // Slate Obsidian Canvas
      colorSurface: '#0E1420',        // Elevated Shingle Slate Card
      colorText: '#F8FAFC',           // Clean Canvas text
      colorDanger: '#EF4444',
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  },
};
