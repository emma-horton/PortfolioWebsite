/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);

// Allow the user to filter projects by tag
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
	const filterButtons = document.querySelectorAll('#filters button');
	const boxes = document.querySelectorAll('.project');

	console.log(filterButtons);
	console.log(boxes);

	filterButtons.forEach(button => {
		button.addEventListener('click', function () {
			const filter = this.getAttribute('data-filter');
			console.log(filter);

			boxes.forEach(box => {
				const tags = box.getAttribute('data-tags');
				console.log(tags);

				if (tags) {
					const cleanedTags = tags.replace(/\s+/g, '').split(',');
					console.log(cleanedTags); // This will show the array of tags after cleaning

					// Show box if 'all' is selected or if the tag matches
					if (filter === 'all' || cleanedTags.includes(filter)) {
						box.style.display = 'block';
					} else {
						box.style.display = 'none';
					}
				} else {
					console.log('No data-tags found for this box.');
					box.style.display = 'none'; // Hide the box if no tags are found
				}
			});
		});
	});
});

// // Show more content when the user clicks the 'See more' button
// document.addEventListener('DOMContentLoaded', function () {
// 	const seeMoreBtn = document.getElementById('seeMoreBtn');
// 	const seeLessBtn = document.getElementById('seeLessBtn');
// 	const hideableBoxes = document.querySelectorAll('.hideable');

// 	// Show more content when 'See more' is clicked
// 	seeMoreBtn.addEventListener('click', function (e) {
// 		e.preventDefault();

// 		hideableBoxes.forEach(box => {
// 			box.style.display = 'block';  // Show hidden blog posts
// 		});

// 		seeMoreBtn.style.display = 'none';  // Hide 'See more' button
// 		seeLessBtn.style.display = 'inline-block';  // Show 'See less' button
// 	});

// 	// Hide content when 'See less' is clicked
// 	seeLessBtn.addEventListener('click', function (e) {
// 		e.preventDefault();

// 		hideableBoxes.forEach(box => {
// 			box.style.display = 'none';  // Hide extra blog posts
// 		});

// 		seeMoreBtn.style.display = 'inline-block';  // Show 'See more' button
// 		seeLessBtn.style.display = 'none';  // Hide 'See less' button
// 	});
// });

// dyanmically create filter buttons
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.col-4');  // Updated class name for project containers
    const filterContainer = document.getElementById('filters'); // Assuming you have a container with the id 'filters'
    let allTags = new Set();  // Use a Set to store unique tags

    // Loop through each project to collect tags
    projects.forEach(project => {
        let tags = project.getAttribute('data-tags');
        if (tags) {  // Check if project has tags
            tags.split(',').map(tag => tag.trim()).forEach(tag => allTags.add(tag));  // Add tags to the Set
        }
    });

    // Create the "All" button manually
    let allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.setAttribute('data-filter', 'all');
    filterContainer.appendChild(allButton);

    // Create buttons for each unique tag
    allTags.forEach(tag => {
        let button = document.createElement('button');
        button.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);  // Capitalize the first letter
        button.setAttribute('data-filter', tag);
        filterContainer.appendChild(button);
    });

    // Add event listener to filter buttons
    filterContainer.addEventListener('click', function(e) {
		if (e.target.tagName === 'BUTTON') {
			e.preventDefault();  // Prevent default button behavior
			const filter = e.target.getAttribute('data-filter');
			projects.forEach(project => {
				const tags = project.getAttribute('data-tags') ? project.getAttribute('data-tags').split(',').map(tag => tag.trim()) : [];
				if (filter === 'all' || tags.includes(filter)) {
					project.style.display = 'block';
				} else {
					project.style.display = 'none';
				}
			});
	
			// Scroll to the portfolio section after filtering
			const portfolioSection = document.getElementById('portfolio');
			if (portfolioSection) {
				portfolioSection.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
});

//handle hovercard on projects for mobile
// Select all the tiles
const tiles = document.querySelectorAll('.box.style2');

// Add touch/click event to each tile
tiles.forEach(tile => {
    tile.addEventListener('click', function (e) {
        // Toggle the 'active' class to show/hide the hover card
        this.classList.toggle('active');
        
        // Close the hover card if clicking outside the tile
        document.addEventListener('click', function(event) {
            if (!tile.contains(event.target)) {
                tile.classList.remove('active');
            }
        }, { once: true });
    });
});