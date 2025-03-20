function filterLogs() {
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;
    let table = document.getElementById("logTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let tdAction = tr[i].getElementsByTagName("td")[1];
        let tdEntity = tr[i].getElementsByTagName("td")[2];
        if (tdAction && tdEntity) {
            let actionText = tdAction.textContent || tdAction.innerText;
            let entityText = tdEntity.textContent || tdEntity.innerText;
            if ((filter === "All" || actionText.includes(filter)) && entityText.toLowerCase().includes(search)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}