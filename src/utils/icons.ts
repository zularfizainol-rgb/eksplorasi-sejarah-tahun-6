import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

export function getIcon(name: string) {
  const IconComponent = icons[name as IconName] || icons['CircleHelp'];
  return IconComponent;
}
