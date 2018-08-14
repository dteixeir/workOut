import { Route } from './model.index';

const enum RouteNames {
  signup = '/signup',
  Login = '/login',
  Training = '/training',
  SignOut = '/login'
}

const Routes: Route[] = [
  {
    url: '/signup',
    name: 'Sign Up',
    iconName: 'face',
    showIfAuthenticated: false,
    dontShowIfAuthenticated: true
  },
  {
    url: '/login',
    name: 'Login',
    iconName: 'input',
    showIfAuthenticated: false,
    dontShowIfAuthenticated: true
  },
  {
    url: '/training',
    name: 'Training',
    iconName: 'fitness_center',
    showIfAuthenticated: true,
    dontShowIfAuthenticated: false
  },
  {
    url: '/login',
    name: 'Sign Out',
    iconName: 'eject',
    showIfAuthenticated: true,
    dontShowIfAuthenticated: false
  }
];

export { RouteNames, Routes };
