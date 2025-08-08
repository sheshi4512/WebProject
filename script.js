
    const toggleBtn = document.getElementById('darkModeToggle');
    toggleBtn.onclick = () => document.body.classList.toggle('dark-mode');

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.onscroll = function () {
      scrollTopBtn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
    };
    scrollTopBtn.onclick = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
 // Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

  // --- Element Selections ---
  const darkModeToggle = document.getElementById('darkModeToggle');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const searchButton = document.querySelector('.d-flex .btn-primary');
  const searchInput = document.querySelector('.d-flex .form-control');
  const allCards = document.querySelectorAll('.destination-card, .activity-card, .services-card');
  
  // For Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // --- Dark Mode Functionality ---
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Optional: Save user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preference on page load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // --- Scroll-to-Top and Scrollspy Functionality ---
  window.addEventListener('scroll', () => {
    // 1. Show/Hide Scroll-to-Top Button
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }

    // 2. Scrollspy - Highlight active nav link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Subtracting 150px provides a better offset for when the section becomes "active"
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // Check if the link's href matches the current section's ID
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Smooth Scroll to Top Action ---
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Search Bar Functionality ---
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      alert(`Searching for: "${searchTerm}"`);
      // In a real application, you would redirect to a search page
      // e.g., window.location.href = `/search?q=${searchTerm}`;
    } else {
      alert('Please enter a destination or activity to search.');
    }
  });

  // --- Dynamically Add "Book Now" Buttons ---
  // This uses the .book-btn style you created in your CSS.
  allCards.forEach(card => {
    const bookBtn = document.createElement('a');
    bookBtn.href = 'booking.html'; // All buttons link to the booking page
    bookBtn.className = 'book-btn'; // Apply your custom button style
    bookBtn.textContent = 'Book Now';
    card.appendChild(bookBtn);
  });

});