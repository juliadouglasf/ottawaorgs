let allOrgs = [];

// Fetch the org metadata
try {
  fetch('org_metadata.json')
  .then(response => response.json())
  .then(data => {
    allOrgs = data;
    renderOrgs(allOrgs); 
    setupFilters(); 
    setupSearch();
  })}
catch {
  error => console.error('Error loading JSON:', error)}

function setupSearch() {
  const searchBar = document.getElementById('search-bar');

  searchBar.addEventListener('input', (search) => {
    const searchTerm = search.target.value.toLowerCase();

    const filteredOrgs = allOrgs.filter(org => {
      return org.name.toLowerCase().includes(searchTerm) ||
             org.address.toLowerCase().includes(searchTerm);
    });

    renderOrgs(filteredOrgs);
  })
}

function renderOrgs(orgs) {
  const orgList = document.getElementById('org-list');
  orgList.innerHTML = ''; // Clear the current list

  if (orgs.length === 0) {
    orgList.innerHTML = '<p>No organizations found matching your search.</p>';
    return;
  }

  orgs.forEach(org => {
    const div = document.createElement('div');
    div.className = 'org-card';
    div.innerHTML = `
      <h3>${org.name}</h3>
      <p>${org.address}</p>
      <p>Category: ${org.category}</p>`;

    orgList.appendChild(div);
  });
}

// Handle filter clicks
  function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');

        const filtered = category === 'all'
          ? allOrgs
          : allOrgs.filter(org => org.category === category);
        // const filtered = allResources.filter(item => item.category === filterValue);
        renderOrgs(filtered);
      });
    });
  }

// Search-bar listener
document.getElementById('search-bar').addEventListener('input', function(e) {
  applyFilters(e.target.value);
});

// Accept a search term
function applyFilters(searchTerm) {
  const activeCategory = getActiveCategory();

  const filtered = allOrgs.filter(org => {
    const categoryMatch = (org.category === activeCategory);

    const searchMatch = org.name.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  renderOrgs(filtered);
}

function getActiveCategory(){
  const activeBtn = document.querySelector('.filter-btn.selected');
  return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
}