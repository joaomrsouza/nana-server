const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');

notificationBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    notificationDropdown.classList.toggle('hidden');
});

// Close Notifications dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.add('hidden');
    }
});

// Close Notifications dropdown when pressing Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        notificationDropdown.classList.add('hidden');
    }
});