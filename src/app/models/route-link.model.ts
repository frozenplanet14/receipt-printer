export interface RouteLinkModel {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  children?: RouteLinkModel[];
}
