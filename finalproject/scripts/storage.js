document.addEventListener('DOMContentLoaded', () => {
  const visits = parseInt(localStorage.getItem('visits') || '0', 10);
  localStorage.setItem('visits', visits + 1);
  console.log(`You have visited this site ${visits + 1} times.`);
});
