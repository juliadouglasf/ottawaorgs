const mobileBtn = document.getElementById('mobile-search-btn');
const mobileBar = document.getElementById('mobile-search-bar');
const brand = document.querySelector('.navbar-brand');
const toggler = document.querySelector('.navbar-toggler');
const closeBtn = document.getElementById('mobile-search-x');

function openMobileSearch() {
  console.log("mobile search requested");

  // Hide brand + search button + toggle
  brand.classList.add('d-none');
  toggler.classList.add('d-none');
  mobileBtn.classList.add('d-none');

  // Show full-width search
  mobileBar.classList.remove('d-none');
  mobileBar.classList.add('slide-down');
}

function closeMobileSearch() {
  console.log("mobile search x clicked")

  // Hide full-width search
  mobileBar.classList.add('d-none');
  mobileBar.classList.remove('slide-down');

  // Show brand + search button + toggle
  brand.classList.remove('d-none');
  toggler.classList.remove('d-none');
  mobileBtn.classList.remove('d-none');
}


// mobileBtn.onclick = function () {

// }

// mobileBtn.addEventListener('click', () => {
//   // Hide brand + search button + toggle
//   brand.classList.add('d-none');
//   toggler.classList.add('d-none');
//   mobileBtn.classList.add('d-none');

//   // Show full-width search
//   mobileBar.classList.remove('d-none');
//   mobileBar.classList.add('slide-down');
// });

// Collapse search when user clicks outside or presses Esc
// closeBtn.addEventListener('click', () => {
//   mobileBar.classList.remove('slide-down');
//   mobileBar.classList.add('slide-up');

//   setTimeout(() => {
//     mobileBar.classList.add('d-none');
//     mobileBar.classList.remove('slide-up');

//     brand.classList.remove('d-none');
//     toggler.classList.remove('d-none');
//     mobileBtn.classList.remove('d-none');
//   }, 200);
// });
