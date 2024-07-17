// Import posts data
import posts from './posts.json';

// Get recommendations container
let recommendations = document.querySelector('.recommendations'); 

// Load on page load  
window.addEventListener('load', () => {

  // Find active post
  let activePost = posts.find(post => post.id === '1');

  // Extract color and size from post
  let color = activePost.title.split(' ')[0];
  let size = 16;

  // Generate recommendations
  generateRecommendations();

});

// Generate recommendations function
function generateRecommendations() {

  // Recommendation count
  let count = 0;

  while(count < 2) {

    // Generate recommendation
    generateRecommendation(color, size);

    count++;

  }

}

// Generate single recommendation
function generateRecommendation(color, size) {

  // Create link
  let link = document.createElement('a');

  // Set href
  link.href = `/${color.toLowerCase()}${size}x${color.toLowerCase()}`;  

  // Add other link properties

  // Create img
  let img = document.createElement('img');

  // Set img src and properties

  // Append img to link

  // Only add if under limit
  if(count < 2) {
    recommendations.appendChild(link); 
  }

}