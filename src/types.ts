export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Reviewer {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface VRFeature {
  id: string;
  title: string;
  description: string;
  badge?: string;
}
