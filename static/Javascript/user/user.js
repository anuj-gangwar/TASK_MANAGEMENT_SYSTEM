//  document.addEventListener('DOMContentLoaded', function() {
//         const saveStatusButtons = document.querySelectorAll('.save-status-btn');

//         saveStatusButtons.forEach(button => {
//             button.addEventListener('click', function() {
//                 const userId = this.dataset.userId;
//                 const statusSelect = document.getElementById(`statusSelect-${userId}`);
//                 const selectedStatus = statusSelect.value;

//                 // Send AJAX request to update the status on the server
//                 fetch(`/update_user_status/${userId}/`, {  // Replace with your actual URL
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRFToken': '{{ csrf_token }}'  // Include CSRF token
//                     },
//                     body: JSON.stringify({ status: selectedStatus })
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         // Optionally, update the button text or provide feedback
//                         console.log(`Status updated for user ${userId} to ${selectedStatus}`);
//                         location.reload();  // Refresh the page to show the updated status
//                     } else {
//                         console.error('Error updating status:', data.error);
//                         alert('Failed to update status.  See console for details.');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Network error:', error);
//                     alert('A network error occurred.  See console for details.');
//                 });
//             });
//         });
//     });




    document.addEventListener('DOMContentLoaded', function() {
        const saveStatusButtons = document.querySelectorAll('.save-status-btn');

        saveStatusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.dataset.userId;
                const statusSelect = document.getElementById(`statusSelect-${userId}`);
                const selectedStatus = statusSelect.value;

                // Send AJAX request to update the status on the server
                fetch(`/update_user_status/${userId}/`, {  // Replace with your actual URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': '{{ csrf_token }}'  // Include CSRF token
                    },
                    body: JSON.stringify({ status: selectedStatus })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Optionally, update the button text or provide feedback
                        console.log(`Status updated for user ${userId} to ${selectedStatus}`);
                        location.reload();  // Refresh the page to show the updated status
                    } else {
                        console.error('Error updating status:', data.error);
                        alert('Failed to update status.  See console for details.');
                    }
                })
                .catch(error => {
                    console.error('Network error:', error);
                    alert('A network error occurred.  See console for details.');
                });
            });
        });
    });


  

    