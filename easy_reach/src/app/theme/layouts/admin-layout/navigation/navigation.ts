export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      // {
      //   id: 'dashboard',
      //   title: 'Dashboard',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: 'dashboard',
      //   icon: 'dashboard',
      //   breadcrumbs: false
      // },
      {
        id: 'temperature-dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/temperature-dashboard',
        icon: 'appstore',
        breadcrumbs: false
      },
      {
        id: 'location-dashboard',
        title: 'Location Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/location-dashboard',
        icon: 'radar-chart',
        breadcrumbs: false
      },
      {
        id: 'user',
        title: 'User',
        type: 'item',
        classes: 'nav-item',
        url: '/user',
        icon: 'user',
        breadcrumbs: false
      },
      {
        id: 'location',
        title: 'Location',
        type: 'item',
        classes: 'nav-item',
        url: '/location',
        icon: 'environment',
        breadcrumbs: false
      },
      {
        id: 'asset-list',
        title: 'Assets List',
        type: 'item',
        classes: 'nav-item',
        url: '/asset-list',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'assets',
        title: 'Live Locations',
        type: 'item',
        classes: 'nav-item',
        url: '/assets',
        icon: 'aim',
        breadcrumbs: false
      },
      {
        id: 'rule',
        title: 'Rule',
        type: 'item',
        classes: 'nav-item',
        url: '/rule',
        icon: 'audit',
        breadcrumbs: false
      },
      {
        id: 'apply-rule',
        title: ' Apply Rule',
        type: 'item',
        classes: 'nav-item',
        url: '/apply-rule',
        icon: 'signature',
        breadcrumbs: false
      },
      {
        id: 'ble',
        title: 'BLE',
        type: 'item',
        classes: 'nav-item',
        url: '/ble',
        icon: 'ant-design',
        breadcrumbs: false
      },
      {
        id: 'report',
        title: 'Report',
        type: 'item',
        classes: 'nav-item',
        url: '/report',
        icon: 'file-protect',
        breadcrumbs: false
      },
    ]
  },
  // {
  //   id: 'authentication',
  //   title: 'Authentication',
  //   type: 'group',
  //   icon: 'icon-nav igation',
  //   children: [
  //     {
  //       id: 'login',
  //       title: 'Login',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/login',
  //       icon: 'login',
  //       target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'register',
  //       title: 'Register',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/register',
  //       icon: 'profile',
  //       target: true,
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  // {
  //   id: 'utilities',
  //   title: 'UI Components',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'typography',
  //       title: 'Typography',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/typography',
  //       icon: 'font-size'
  //     },
  //     {
  //       id: 'location',
  //       title: 'location',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/location',
  //       icon: 'font-size'
  //     },
  //     {
  //       id: 'color',
  //       title: 'Colors',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/color',
  //       icon: 'bg-colors'
  //     },
  //     {
  //       id: 'tabler',
  //       title: 'Tabler',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://ant.design/components/icon',
  //       icon: 'ant-design',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // },

  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     {
  //       id: 'SS',
  //       title: 'ss',
  //       type: 'item',
  //       url: '/ss',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     {
  //       id: 'employee',
  //       title: 'Emp',
  //       type: 'item',
  //       url: '/employee',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     // {
  //     //   id: 'dashboard',
  //     //   title: 'dashboard',
  //     //   type: 'item',
  //     //   url: '/dashboard',
  //     //   classes: 'nav-item',
  //     //   icon: 'chrome'
  //     // },
  //     {
  //       id: 'document',
  //       title: 'Document',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/mantis-angular/',
  //       icon: 'question',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];
