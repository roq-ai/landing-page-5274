const mapping: Record<string, string> = {
  businesses: 'business',
  'landing-pages': 'landing_page',
  'marketing-strategies': 'marketing_strategy',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
