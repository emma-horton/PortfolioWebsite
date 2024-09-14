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

// // dyanmically create filter buttons
// document.addEventListener('DOMContentLoaded', function() {
//     const projects = document.querySelectorAll('.col-4');  // Updated class name for project containers
//     const filterContainer = document.getElementById('filters'); // Assuming you have a container with the id 'filters'
//     let allTags = new Set();  // Use a Set to store unique tags

//     // Loop through each project to collect tags
//     projects.forEach(project => {
//         let tags = project.getAttribute('data-tags');
//         if (tags) {  // Check if project has tags
//             tags.split(',').map(tag => tag.trim()).forEach(tag => allTags.add(tag));  // Add tags to the Set
//         }
//     });

//     // Create the "All" button manually
//     let allButton = document.createElement('button');
//     allButton.textContent = 'All';
//     allButton.setAttribute('data-filter', 'all');
//     filterContainer.appendChild(allButton);

//     // Create buttons for each unique tag
//     allTags.forEach(tag => {
//         let button = document.createElement('button');
//         button.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);  // Capitalize the first letter
//         button.setAttribute('data-filter', tag);
//         filterContainer.appendChild(button);
//     });

//     // Add event listener to filter buttons
//     filterContainer.addEventListener('click', function(e) {
// 		if (e.target.tagName === 'BUTTON') {
// 			e.preventDefault();  // Prevent default button behavior
// 			const filter = e.target.getAttribute('data-filter');
// 			// Ensure that 'projects' only contains elements with the class 'project'
// 			const projects = document.querySelectorAll('.project');
// 			projects.forEach(project => {
// 				const tags = project.getAttribute('data-tags') ? project.getAttribute('data-tags').split(',').map(tag => tag.trim()) : [];
// 				if (filter === 'all' || tags.includes(filter)) {
// 					project.style.display = 'block';
// 				} else {
// 					project.style.display = 'none';
// 				}
// 			});
	
// 			// Scroll to the portfolio section after filtering
// 			const portfolioSection = document.getElementById('portfolio');
// 			if (portfolioSection) {
// 				portfolioSection.scrollIntoView({ behavior: 'smooth' });
// 			}
// 		}
// 	});
// });

// Dynamically create filter buttons
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

    // Add event listeners for all buttons to filter projects and toggle 'active' class
    const filterButtons = filterContainer.querySelectorAll('button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to the clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            // Filter the projects based on the selected filter
			const projects = document.querySelectorAll('.project');
            projects.forEach(project => {
                const tags = project.getAttribute('data-tags') ? project.getAttribute('data-tags').split(',').map(tag => tag.trim()) : [];
                if (filter === 'all' || tags.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // set the "All" button as active by default on page load
    allButton.classList.add('active');
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