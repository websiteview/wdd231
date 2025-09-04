const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 1, completed: true, subject: 'WDD' },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: false, subject: 'WDD' },
  { code: 'WDD 231', name: 'Front-End Frameworks', credits: 3, completed: false, subject: 'WDD' },
  { code: 'CSE 121b', name: 'JavaScript Language', credits: 3, completed: true, subject: 'CSE' }
];

const container = document.getElementById('courseCards');
const totalCredits = document.getElementById('totalCredits');

function renderCourses(filter = 'all') {
  container.innerHTML = '';
  let filtered = filter === 'all' ? courses : courses.filter(c => c.subject === filter);
  let creditTotal = 0;

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = 'card' + (course.completed ? ' completed' : '');
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    container.appendChild(card);
    creditTotal += course.credits;
  });

  totalCredits.textContent = creditTotal;
}

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => renderCourses(btn.dataset.filter));
});

renderCourses(); // default on load
