const search = async (query: string) => {
  const response = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
  const data = await response.json();
  return data;
};