export async function login(email, password) {
  try {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });
    return await res.json();
  } catch (e) {
    return { error: 'Network error' };
  }
}

export async function register(name, email, password) {
  try {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email, 
        name, 
        password,
      }),
    });
    const data = await res.json();
    return res.ok && data.message && data.message.toLowerCase().includes('success');
  } catch (e) {
    return false;
  }
}
