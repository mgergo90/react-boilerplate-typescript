interface Owner {
  login: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  site_admin: boolean;
}

export interface Repo {
  id: number;
  name: string;
  owner: Owner;
  forks: number;
  open_issues: number;
  watchers: number;
  html_url: string;
  full_name: string;
  open_issues_count: number;
}
