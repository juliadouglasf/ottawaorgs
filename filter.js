let allOrgs = [];

// Fetch the org metadata
fetch('org_metadata.json')
  .then(response => response.json())
  .then(data => {
    allOrgs = data;
    renderOrgs(allOrgs); // Show all orgs
    setupFilters(); // Prepare filter buttons
  });