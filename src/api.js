export async function fetchSampleUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data.map(({ id, name, email }) => ({ id, name, email }));
  } catch (error) {
    console.error('fetchSampleUsers error:', error);
    return [];
  } finally {
    console.log('fetchSampleUsers done');
  }
}

export function fetchSampleUsersPromise() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => data.map(({ id, name, email }) => ({ id, name, email })))
    .catch(error => {
      console.error('fetchSampleUsersPromise error:', error);
      return [];
    });
}