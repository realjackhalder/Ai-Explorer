const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.searchable')];
const filters = [...document.querySelectorAll('[data-filter]')];
let activeFilter = 'all';

function updateCards() {
  const query = search.value.trim().toLowerCase();
  cards.forEach(card => {
    const typeMatches = activeFilter === 'all' || card.dataset.type === activeFilter;
    const textMatches = !query || card.textContent.toLowerCase().includes(query);
    card.classList.toggle('hidden', !(typeMatches && textMatches));
  });
}

search.addEventListener('input', updateCards);
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  updateCards();
}));

document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    search.focus();
  }
});
