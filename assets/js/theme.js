(function() {
  "use strict"; // Start of use strict

  var sidebar = document.querySelector('.sidebar');
  var sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop');
  
  if (sidebar) {
    
    var collapseEl = sidebar.querySelector('.collapse');
    var collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'))
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    for (var toggle of sidebarToggles) {

      // Toggle the side navigation
      toggle.addEventListener('click', function(e) {
        document.body.classList.toggle('sidebar-toggled');
        sidebar.classList.toggle('toggled');

        if (sidebar.classList.contains('toggled')) {
          for (var bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        };
      });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function() {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 768) {
        for (var bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      };
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  
  var fixedNaigation = document.querySelector('body.fixed-nav .sidebar');
  
  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function(e) {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }

  var scrollToTop = document.querySelector('.scroll-to-top');
  
  if (scrollToTop) {
    
    // Scroll to top button appear
    window.addEventListener('scroll', function() {
      var scrollDistance = window.pageYOffset;

      //check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }
    
document.addEventListener('DOMContentLoaded', function(){
    // The page has loaded

    let menuItems = document.querySelectorAll('.multilevel .dropdown-menu a');
    
    for (let item of menuItems) {
        // Trigger the menu on click
        item.addEventListener('click', triggerMenu);
        // Trigger the menu on hover. You can remove this.
        item.addEventListener('mouseenter', triggerMenu);
    }
    
    // When the body is clicked, hide all menu items
    
    document.body.addEventListener('click', function() {
        document.querySelectorAll('.multilevel .dropdown-menu .dropdown-menu')
            .forEach(m => m.classList.remove('show'));
    });
});

function triggerMenu(e) {
    
    // Hide all other dropdowns
    e.target.parentNode.querySelectorAll('.dropdown-menu')
        .forEach(m => m.classList.remove('show'));
    
    let toggle = e.target.closest('.dropdown-toggle');
    
    if (!toggle) {
        return;
    }

    // Show the new dropdown menu
    let menu = toggle.nextElementSibling;

    if (menu && menu.matches('.dropdown-menu')) {
        // This is a dropdown menu toggle. Show the menu
        // and prevent it from closing on click.
        menu.classList.add('show');
        e.stopPropagation();
    }
}

})(); // End of use strict
