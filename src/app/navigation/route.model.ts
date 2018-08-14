interface IRoute {
  url: string;
  name: string;
  iconName: string;
  showIfAuthenticated: boolean;
  dontShowIfAuthenticated: boolean;
}

class Route {
  url: string;
  name: string;
  iconName: string;
  showIfAuthenticated: boolean;
  dontShowIfAuthenticated: boolean;

  constructor(url: string, name: string, iconName: string) {
    this.url = url;
    this.name = name;
    this.iconName = iconName;

  }
}

export { Route, IRoute };

