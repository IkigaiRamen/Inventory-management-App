import { Injectable, effect, signal } from "@angular/core";
import { Subject } from "rxjs";

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  _config: AppConfig = {
    ripple: false,
    inputStyle: "outlined",
    menuMode: "static",
    colorScheme: "dark",
    theme: "bootstrap4-dark-blue", // Default theme
    scale: 14,
  };

  config = signal<AppConfig>(this._config);

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  private configUpdate = new Subject<AppConfig>();
  private overlayOpen = new Subject<any>();

  configUpdate$ = this.configUpdate.asObservable();
  overlayOpen$ = this.overlayOpen.asObservable();

  constructor() {
    effect(() => {
      const config = this.config();
      if (this.updateStyle(config)) {
        this.changeTheme(); // Apply theme on load
      }
      this.changeScale(config.scale);
      this.onConfigUpdate();
    });
    // Ensure the theme is applied on initial load
    this.changeTheme(); 
  }

  updateStyle(config: AppConfig) {
    return (
      config.theme !== this._config.theme ||
      config.colorScheme !== this._config.colorScheme
    );
  }

  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }

  isOverlay() {
    return this.config().menuMode === "overlay";
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onConfigUpdate() {
    this._config = { ...this.config() };
    this.configUpdate.next(this.config());
  }

  changeTheme() {
    const config = this.config();
    const themeLink = document.getElementById("theme-css") as HTMLLinkElement;
    const themeLinkHref = themeLink?.getAttribute("href");

    if (!themeLink || !themeLinkHref) {
      console.error("Theme link element or href attribute not found.");
      return;
    }

    console.log("Original href:", themeLinkHref);
    console.log("Current Config:", this._config);
    console.log("New Config:", config);

    // Extract the theme segment from the URL (e.g., "lara-light-indigo")
    const themeSegmentIndex = 4; // Assuming the theme segment is always at index 4
    const currentThemeSegment = themeLinkHref.split("/")[themeSegmentIndex];
    console.log("Current Theme Segment:", currentThemeSegment);

    // Generate new theme segment based on new config values
    const newThemeSegment = config.theme.toLowerCase().replace(/-/g, "-");
    console.log("New Theme Segment:", newThemeSegment);

    // Replace the theme segment in the URL
    const newHref = themeLinkHref.replace(currentThemeSegment, newThemeSegment);

    console.log("New computed href after replacement:", newHref);

    if (newHref === themeLinkHref) {
      console.warn("The new href is the same as the original href, indicating no replacement took place.");
    }

    // Replace the theme link
    this.replaceThemeLink(newHref);
  }

  replaceThemeLink(href: string) {
    const id = "theme-css";
    let themeLink = document.getElementById(id) as HTMLLinkElement;

    // Create a new link element
    const newLinkElement = document.createElement("link");
    newLinkElement.setAttribute("rel", "stylesheet");
    newLinkElement.setAttribute("type", "text/css");
    newLinkElement.setAttribute("href", href);
    newLinkElement.setAttribute("id", id);

    // Flag to check if the theme is successfully loaded
    let isLoaded = false;

    // Add the new link to the document head but don't remove the old one yet
    document.head.appendChild(newLinkElement);

    // Add an event listener to detect when the new theme is fully loaded
    newLinkElement.addEventListener("load", () => {
      if (!isLoaded) {
        themeLink.remove(); // Remove the old theme once the new one is loaded
        isLoaded = true;
        document.body.classList.add('theme-loaded');
      }
    });

    console.log("Attempting to update theme link to:", href);
  }

  changeScale(value: number) {
    console.log("Changing font scale to:", value);
    document.documentElement.style.fontSize = `${value}px`;
  }
}
