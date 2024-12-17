export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url;

  if (!url) {
    return { status: 'error', message: 'URL es requerida' };
  }

  try {
    // Realizar una petición GET en lugar de HEAD
    const response = await fetch(url, { method: 'GET', timeout: 5000 });
    return { status: response.ok ? 'online' : 'offline' };
  } catch (error) {
    return { status: 'offline' };
  }
});
