async function fetchGithubUserData(user: string) {
  const res = await fetch(`https:///api.github.com/users/${user}/repos`);
  const data = await res.json();
  console.log(data);
  return await Promise.resolve(data);
}
