// IIITH Room Booking Portal - Main JavaScript File

// Wait for DOM to be fully loaded
$(document).ready(function() {
    console.log('IIITH Room Booking Portal Initialized!');
    console.log('Tech Stack: Bootstrap 5 + jQuery + Vanilla JS + Flatpickr + FullCalendar + Chart.js');
    
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupSidebarToggle();
    setupNavigation();
    setupClickOutside();
    setupNotifications();
    setupUserProfile();
    setupTableActions();
    setupQuickActions();
    
    // Initialize plugins (examples - uncomment when needed)
    // initializeDatePickers();
    // initializeCalendar();
    // initializeCharts();
}

// Sidebar Toggle Functionality
function setupSidebarToggle() {
    $('#menuToggle').on('click', function(e) {
        e.stopPropagation();
        $('#sidebar').toggleClass('open');
        $('#mainContent').toggleClass('expanded');
        
        // Log for debugging
        console.log('Sidebar toggled');
    });
}

// Navigation Item Click Handler
function setupNavigation() {
    $('.nav-item').on('click', function(e) {
        const page = $(this).data('page');
        
        // If it has an href attribute (not #), let it navigate normally
        if ($(this).attr('href') && $(this).attr('href') !== '#') {
            return true; // Allow default navigation
        }
        
        // Otherwise prevent default and handle navigation
        e.preventDefault();
        
        // Remove active class from all items
        $('.nav-item').removeClass('active');
        
        // Add active class to clicked item
        $(this).addClass('active');
        
        console.log('Navigating to:', page);
        
        // Handle navigation based on page
        handleNavigation(page);
        
        // Close sidebar on mobile after navigation
        if ($(window).width() < 768) {
            $('#sidebar').removeClass('open');
            $('#mainContent').removeClass('expanded');
        }
    });
}

// Handle Navigation to Different Pages
function handleNavigation(page) {
    switch(page) {
        case 'dashboard':
            window.location.href = 'index.html';
            break;
        case 'book-room':
            window.location.href = 'book-room.html';
            break;
        case 'my-bookings':
            loadMyBookings();
            break;
        case 'calendar':
            window.location.href = 'calendar.html';
            break;
        case 'available-rooms':
            loadAvailableRooms();
            break;
        case 'settings':
            loadSettings();
            break;
        case 'logout':
            handleLogout();
            break;
        default:
            console.log('Unknown page:', page);
    }
}

// Close Sidebar When Clicking Outside (Mobile)
function setupClickOutside() {
    $(document).on('click', function(e) {
        if ($(window).width() < 768) {
            if (!$(e.target).closest('#sidebar, #menuToggle').length) {
                $('#sidebar').removeClass('open');
                $('#mainContent').removeClass('expanded');
            }
        }
    });
}

// Notification Icon Click Handler
function setupNotifications() {
    $('.notification-icon').on('click', function(e) {
        e.stopPropagation();
        console.log('Notifications clicked');
        // TODO: Show notifications dropdown
        alert('Notifications:\n• Booking approved for C22\n• Pending approval for MB101\n• New room available: C30');
    });
}

// User Profile Click Handler
function setupUserProfile() {
    $('.user-profile').on('click', function(e) {
        e.stopPropagation();
        console.log('User profile clicked');
        // TODO: Show user profile dropdown
        alert('User Profile:\n• Name: user\n• Email: user@iiit.ac.in\n• Role: Faculty');
    });
}

// Table Action Buttons
function setupTableActions() {
    // View Button
    $(document).on('click', '.btn-view', function() {
        const row = $(this).closest('tr');
        const room = row.find('td:first').text();
        console.log('View booking for:', room);
        alert('Viewing booking details for: ' + room);
        // TODO: Show booking details modal
    });
    
    // Cancel Button
    $(document).on('click', '.btn-cancel', function() {
        const row = $(this).closest('tr');
        const room = row.find('td:first').text();
        
        if (confirm('Are you sure you want to cancel this booking for ' + room + '?')) {
            console.log('Cancelling booking for:', room);
            // TODO: Call API to cancel booking
            alert('Booking cancelled successfully!');
            // Remove row or update status
            row.fadeOut(300, function() {
                $(this).remove();
            });
        }
    });
}

// Quick Actions Setup
function setupQuickActions() {
    // You can add more specific handlers here if needed
    console.log('Quick actions initialized');
}

// Page Loading Functions
function loadDashboard() {
    console.log('Loading Dashboard...');
    window.location.href = 'index.html';
}

function loadBookRoom() {
    console.log('Loading Book Room page...');
    window.location.href = 'book-room.html';
}

function loadMyBookings() {
    console.log('Loading My Bookings...');
    // TODO: Fetch and display user's bookings
    alert('My Bookings page - Coming Soon!\n\nFeatures:\n• View all bookings\n• Filter by status\n• Cancel bookings');
}

function loadCalendarView() {
    console.log('Loading Calendar View...');
    window.location.href = 'calendar.html';
}

function loadAvailableRooms() {
    console.log('Loading Available Rooms...');
    // TODO: Fetch and display available rooms
    alert('Available Rooms - Coming Soon!\n\nFeatures:\n• Filter by type\n• Search by name\n• View capacity');
}

function loadSettings() {
    console.log('Loading Settings...');
    // TODO: Load settings page
    alert('Settings - Coming Soon!\n\nFeatures:\n• Notification preferences\n• Profile settings\n• Password change');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('Logging out...');
        // TODO: Call logout API
        alert('Logged out successfully!');
        // Redirect to login page
        // window.location.href = 'login.html';
    }
}

// Initialize Flatpickr (Date & Time Picker)
function initializeDatePickers() {
    flatpickr(".datepicker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
    });
    
    console.log('Flatpickr initialized');
}

// Initialize FullCalendar
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [
                // Sample events - Replace with API data
                {
                    title: 'C22 - Workshop',
                    start: '2026-01-28T14:00:00',
                    end: '2026-01-28T16:00:00',
                    color: '#4A90E2'
                },
                {
                    title: 'MB101 - Meeting',
                    start: '2026-01-30T10:00:00',
                    end: '2026-01-30T11:00:00',
                    color: '#28A745'
                }
            ],
            eventClick: function(info) {
                alert('Event: ' + info.event.title);
            }
        });
        
        calendar.render();
        console.log('FullCalendar initialized');
    }
}

// Initialize Chart.js (Statistics)
function initializeCharts() {
    const ctx = document.getElementById('myChart');
    
    if (ctx) {
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Bookings',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(74, 144, 226, 0.5)',
                    borderColor: 'rgba(74, 144, 226, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        console.log('Chart.js initialized');
    }
}

// API Call Examples (for future implementation)
function fetchBookings() {
    $.ajax({
        url: 'api/bookings.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log('Bookings fetched:', response);
            // Process and display bookings
        },
        error: function(xhr, status, error) {
            console.error('Error fetching bookings:', error);
            alert('Failed to fetch bookings. Please try again.');
        }
    });
}

function createBooking(bookingData) {
    $.ajax({
        url: 'api/booking/create.php',
        method: 'POST',
        data: JSON.stringify(bookingData),
        contentType: 'application/json',
        success: function(response) {
            console.log('Booking created:', response);
            alert('Booking request submitted successfully!');
            // Refresh bookings list
            fetchBookings();
        },
        error: function(xhr, status, error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
        }
    });
}

function cancelBooking(bookingId) {
    $.ajax({
        url: 'api/booking/cancel.php',
        method: 'PUT',
        data: JSON.stringify({ id: bookingId }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Booking cancelled:', response);
            alert('Booking cancelled successfully!');
            // Refresh bookings list
            fetchBookings();
        },
        error: function(xhr, status, error) {
            console.error('Error cancelling booking:', error);
            alert('Failed to cancel booking. Please try again.');
        }
    });
}

// Utility Functions
function showLoading() {
    // TODO: Show loading spinner
    console.log('Loading...');
}

function hideLoading() {
    // TODO: Hide loading spinner
    console.log('Loading complete');
}

function showToast(message, type = 'info') {
    // TODO: Implement toast notification
    console.log(`Toast [${type}]: ${message}`);
}

// Window Resize Handler
$(window).on('resize', function() {
    // Close sidebar on desktop view
    if ($(window).width() >= 768) {
        $('#sidebar').removeClass('open');
        $('#mainContent').removeClass('expanded');
    }
});

// Prevent form submission on enter (if needed)
$(document).on('keypress', 'form input', function(e) {
    if (e.which === 13 && !$(this).is('textarea')) {
        e.preventDefault();
        return false;
    }
});

// Console welcome message
console.log('%c IIITH Room Booking Portal ', 'background: #4A90E2; color: white; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Developed with ❤️ for IIITH ', 'color: #2C5F8D; font-size: 12px;');
console.log('%c Tech Stack: Bootstrap 5 | jQuery | Flatpickr | FullCalendar | Chart.js ', 'color: #666; font-size: 10px;');