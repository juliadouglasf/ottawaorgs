let allOrgs = [];

// Fetch the org metadata
try {
  fetch('org_metadata.json')
  .then(response => response.json())
  .then(data => {
    allOrgs = data;
    renderOrgs(allOrgs);
    // filterCategory(); 
    prepCategories(); 
    // setupSearch();
  })}
catch {
  error => console.error('Error loading JSON:', error)}

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
      <p>${org.description}</p>`;

    orgList.appendChild(div);
  });
}

// function getSelectedCategory(){
//   const selectedCategory = document.querySelector('#data-view');
//   return selectedCategory
// }

// const selectCategory = (e) => {
//   let category = e.getAttribute("data-category");
//   filterCategory(category);
// };

// function filterCategory(category){

//   // const selectedCategory = Array.prototype.filter.call(
//   //   categoryButtons,
//   //   (categoryButton) => categoryButton.getAttribute('data-category'),
//   // )

//   // console.log("selected category", selectedCategory)

//   // categoryButtons.forEach(addEventListener('click', (event) => {console.log("clicked!!!")}));

//   // console.log(categoryButtons);
//   // // category.addEventListener('onlick', getSelectedCategory())
//   // categoryButtons.addEventListener();
//   // categoryButtons.addEventListener('click', (event) => {console.log("I am listening")});

//   const filteredOrgs = allOrgs.filter(org => {
//     const categoryMatch = (org.category === category);

//     return categoryMatch;    
//   }); 

// renderOrgs(filteredOrgs);
// }

// Handle filter clicks
function prepCategories() {
    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const categoryValue = button.getAttribute('data-view');

        const filtered = allOrgs.filter(org => org.category === categoryValue);
        // const filtered = allResources.filter(item => item.category === filterValue);
        console.log(filtered);
        renderOrgs(filtered);
      });
    });
}

// Search-bar listener
// document.getElementById('search-bar').addEventListener('input', function(e) {
//   applyFilters(e.target.value);
// });

// // Accept a search term
// function applyFilters(searchTerm) {
//   // const activeCategory = getActiveCategory();

//   const filtered = allOrgs.filter(org => {
//     const categoryMatch = (org.category === activeCategory);

//     const searchMatch = org.name.toLowerCase().includes(searchTerm.toLowerCase());

//     return categoryMatch && searchMatch;
//   });

//   renderOrgs(filtered);
// }

// function setupSearch() {
//   const searchBar = document.getElementById('search-bar');

//   searchBar.addEventListener('input', (search) => {
//     const searchTerm = search.target.value.toLowerCase();

//     const filteredOrgs = allOrgs.filter(org => {
//       return org.name.toLowerCase().includes(searchTerm) ||
//              org.address.toLowerCase().includes(searchTerm);
//     });

//     renderOrgs(filteredOrgs);
//   })
// }