function myFunction(col) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter-input-handler");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-filter");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[col-1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}