export const replaceWithComponent = (
  template: string,
  searchValue: string,
  component: React.ReactNode
): React.ReactNode => {
  if (!template.includes(searchValue)) {
    return template;
  }

  const parts = template.split(searchValue);
  const result: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    result.push(part);
    if (index < parts.length - 1) {
      result.push(component);
    }
  });

  return result;
};
