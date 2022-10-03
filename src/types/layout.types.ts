export interface ProfileLinkItem {
  label: string;
  link?: string;
  disabled?: boolean;
}

export interface SidebarLinkGroup {
  name: string;
  items: SidebarLinkItem[];
}

export interface SidebarLinkItem {
  label: string;
  icon: string;
  link?: string;
}
