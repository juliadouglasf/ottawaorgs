import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.esm.js';

// Get query from URL
const params = new URLSearchParams(window.location.search);
const query = params.get('q') || ''.trim();

const resultsList = document.getElementById('results-list');

// Load org_metadata.json
fetch('org_metadata.json')
  .then(res => res.json())
  .then(data => {

    // collapse orgs into a single array
    const allOrgs = [];
    Object.values(data).forEach(v => {
      if (Array.isArray(v))
        allOrgs.push(...v);
    })
    
    let results = [];
    // console.log(results);

    try {

      // If Fuse.js is available, do a fuzzy search
      if (typeof Fuse !== "undefined") {

        console.log("Fuse is available");

        const options = {
          // keys: ["accessibility_orgs.name", "accessibility_orgs.description", "homelessness_orgs.name"],
          // keys: [['accessibility_orgs', 'name']],
          // keys: [
          //   {
          //     name: 'name', getFn: (accessibility_orgs) => accessibility_orgs.name 
          //   }
          // ],
          keys: ['name', 'description', 'url', 'scope'],
          isCaseSensitive: false,
          includeScore: true,
          threshold: 0.3,  // lower = stricter; higher = fuzzier
        };                
        console.log("Fuse options:", options);

        const fuse = new Fuse(allOrgs, options);
        console.log("Fuse object:", fuse);
        console.log(fuse.getIndex().size());

        results = query ? fuse.search(query).map(r => r.item) : allOrgs; // if nothing searched, show all orgs
        console.log("Results:", results);

      } else { 
        throw new Error("Fuse not loaded");
      }
    } catch (err) {

      // If Fuse.js is unavailable, use basic search
      console.warn("Fuse.js unavailable: using fallback search: ", err);

      const q = query.toLowerCase();
      results = data.filter(org =>
        org.name.toLowerCase().includes(q) ||
        org.url.toLowerCase().includes(q) ||
        org.description.toLowerCase().includes(q) ||
        org.scope.toLowerCase().includes(q)
      );
    }

    // Display "no results" message if a query had no hits
    if (!results || results.length === 0) {
      resultsList.innerHTML = '<li class="list-group-item">No results found</li>';
      return;
    }

    resultsList.innerHTML = "";
    results.forEach(org => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `<a href="${org.url}" class="stretched-link">${org.name}</a></br> ${org.description}`;
      resultsList.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error loading JSON:", err);
    if (resultsList) resultsList.innerHTML = `<li class="list-group-item">Error loading data</li>`;
  });