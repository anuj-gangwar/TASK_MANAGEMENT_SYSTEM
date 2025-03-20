$(document).ready(function(){
    $('.updateStatus').on('click', function(){
        var moduleId = $(this).data('module-id');
        var selectedStatus = $('#statusSelect' + moduleId).val();
        $('#statusButton' + moduleId).text(selectedStatus);
        $('#statusModal' + moduleId).modal('hide');

//            setTimeout(function() {
//                location.reload();
//            }, 500);
         setTimeout(async function() {
let response = await fetch('/api/data'); // Yahan apni API ka endpoint daalo
let data = await response.json();
document.getElementById("myElement").innerText = data.newValue;
}, 500);

    });
});