import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Liste',
  },
  {
    displayName: 'Ajouter un nouveau client',
    iconName: 'user-plus',
    route: '/ui-components/ajouter',
  },
  {
    displayName: 'Gestion des Séances',
    iconName: 'adjustments-horizontal',
    route: '/ui-components/session',
  },
  {
    displayName: 'Calendrier',
    iconName: 'calendar-month',
    route: '/ui-components/calendrier',
  }
];
