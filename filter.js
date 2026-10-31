let allOrgs = [];

// Fetch the org metadata
fetch('org_metadata.json')
  .then(response => response.json())
  .then(data => {
    allOrgs = data;
    renderOrgs(allOrgs); // Show all orgs
    setupFilters(); // Prepare filter buttons
  });

// Handle filter clicks
  function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        const filtered = allResources.filter(item => item.category === filterValue);
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