$(document).ready(
    function refresh() {
        getSuplyers()
    }
)
function getSuplyers() {
    $.ajax({
        url: '/Suplyer/getSuplyers',
        data: {
            search: document.getElementById('txtSearch').value,
            page: page,
        },
        type: "GET",
        success: function (data) {
            document.getElementById('dataSource').innerHTML = null

            let row = ''

            for (var i = 0; i < data.obj.length; i++) {
                row += `<tr class="tableRow"><td>${data.obj[i].id}</td>`
                row += `<td>${data.obj[i].name}</td>`
                row += `<td>${data.obj[i].email}</td>`
                row += `<td>${data.obj[i].phone}</td>`
                row += `<td class="actionColumn"><button class="btn" style="background-color: #fc8a04;" onclick="getCategoryById('${data.obj[i].id}')"><i class="fa fa-pen" style="color: white"></i></button><button class="btn ml-1" style="background-color: #fc8a04;" onclick="deleteCategory('${data.obj[i].id}')"><i class="fa fa-trash" style="color: white"></i></button></td></tr>`
            }

            if (row == '') {
                row = '<tr><td colspan="4"><center><b>Nenhum Fornecedor Encontrado</b></center></td></tr>'
            }

            $('#dataSource').append(row)
            //document.getElementById('dataSource').innerHTML = row
        }
    })
}
function createSuplyer() {
    $.ajax({
        url: 'Suplyer/createSupyer',
        data: {
            search: document.getElementById('').value,
            name: document.getElementById('txtNomeFornecedor').value,
            email: document.getElementById('txtEmailFornecedor').value,
            phone: document.getElementById('txtTelefoneFornecedor').value,
            description: document.getElementById('txtDescricaoFornecedor').value
        }
    })
}