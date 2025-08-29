export const fetchData = async () => {
  const response = await fetch('/owid-co2-data.json');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
