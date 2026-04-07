import type { AudioCategory, AudioPreferences, SoundDefinition, SoundEffect } from "@/types/audio";

/** Default audio preferences for new visitors */
export const DEFAULT_AUDIO_PREFERENCES: AudioPreferences = {
  muted: false,
  volume: 0.5,
  categories: {
    system: true,
    navigation: true,
    window: true,
    interaction: true,
    notification: true,
    app: true,
  },
};

/** All audio categories with labels (used in settings UI) */
export const AUDIO_CATEGORIES: { id: AudioCategory; labelKey: string; descKey: string }[] = [
  { id: "system", labelKey: "apps.settings.sound.categories.system", descKey: "apps.settings.sound.categories.systemDesc" },
  { id: "navigation", labelKey: "apps.settings.sound.categories.navigation", descKey: "apps.settings.sound.categories.navigationDesc" },
  { id: "window", labelKey: "apps.settings.sound.categories.window", descKey: "apps.settings.sound.categories.windowDesc" },
  { id: "interaction", labelKey: "apps.settings.sound.categories.interaction", descKey: "apps.settings.sound.categories.interactionDesc" },
  { id: "notification", labelKey: "apps.settings.sound.categories.notification", descKey: "apps.settings.sound.categories.notificationDesc" },
  { id: "app", labelKey: "apps.settings.sound.categories.app", descKey: "apps.settings.sound.categories.appDesc" },
];

/** Sound effect definitions: maps each effect to its category and label */
export const SOUND_DEFINITIONS: Record<SoundEffect, SoundDefinition> = {
  // System
  startup:          { category: "system",       label: "Startup Chime" },
  shutdown:         { category: "system",       label: "Shutdown" },
  restart:          { category: "system",       label: "Restart" },
  // Navigation
  spotlightOpen:    { category: "navigation",   label: "Spotlight Open" },
  spotlightSelect:  { category: "navigation",   label: "Spotlight Select" },
  dockLaunch:       { category: "navigation",   label: "Dock Launch" },
  contextMenu:      { category: "navigation",   label: "Context Menu" },
  themeToggle:      { category: "navigation",   label: "Theme Toggle" },
  languageToggle:   { category: "navigation",   label: "Language Toggle" },
  // Window
  windowOpen:       { category: "window",       label: "Window Open" },
  windowClose:      { category: "window",       label: "Window Close" },
  windowMinimize:   { category: "window",       label: "Window Minimize" },
  windowRestore:    { category: "window",       label: "Window Restore" },
  windowMaximize:   { category: "window",       label: "Window Maximize" },
  windowFocus:      { category: "window",       label: "Window Focus" },
  // Interaction
  toggleSwitch:     { category: "interaction",  label: "Toggle Switch" },
  buttonClick:      { category: "interaction",  label: "Button Click" },
  tabSwitch:        { category: "interaction",  label: "Tab Switch" },
  copyClipboard:    { category: "interaction",  label: "Copy to Clipboard" },
  accentColorChange:{ category: "interaction",  label: "Accent Color" },
  wallpaperChange:  { category: "interaction",  label: "Wallpaper Change" },
  sliderChange:     { category: "interaction",  label: "Slider Change" },
  // Notification
  error:            { category: "notification", label: "Error" },
  success:          { category: "notification", label: "Success" },
  welcomeModal:     { category: "notification", label: "Welcome" },
  newMessage:       { category: "notification", label: "New Message" },
  // App
  terminalExecute:  { category: "app",          label: "Terminal Execute" },
  terminalError:    { category: "app",          label: "Terminal Error" },
  terminalClear:    { category: "app",          label: "Terminal Clear" },
  finderOpen:       { category: "app",          label: "Finder Open" },
  finderNavigate:   { category: "app",          label: "Finder Navigate" },
  fileDownload:     { category: "app",          label: "File Download" },
  guestbookSubmit:  { category: "app",          label: "Guestbook Submit" },
  cardExpand:       { category: "app",          label: "Card Expand" },
  cardCollapse:     { category: "app",          label: "Card Collapse" },
  carouselSlide:    { category: "app",          label: "Carousel Slide" },
};

/** Get all sound effects for a specific category (for preview in settings) */
export function getSoundsByCategory(category: AudioCategory): SoundEffect[] {
  return (Object.entries(SOUND_DEFINITIONS) as [SoundEffect, SoundDefinition][])
    .filter(([, def]) => def.category === category)
    .map(([effect]) => effect);
}
