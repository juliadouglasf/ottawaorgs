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