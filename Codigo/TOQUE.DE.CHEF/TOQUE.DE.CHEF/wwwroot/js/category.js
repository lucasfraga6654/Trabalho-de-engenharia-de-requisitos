var page = 1

$(document).ready(function () {
    getCategories()
})


function getCategories() {
    $.ajax({
        url: '/Category/getAllCategories',
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
                row += `<td>${data.obj[i].description}</td>`
                row += `<td class="actionColumn"><button class="btn" style="background-color: #fc8a04;" onclick="getCategoryById('${data.obj[i].id}')"><i class="fa fa-pen" style="color: white"></i></button><button class="btn ml-1" style="background-color: #fc8a04;" onclick="deleteCategory('${data.obj[i].id}')"><i class="fa fa-trash" style="color: white"></i></button></td></tr>`
            }

            if (row == '') {
                row = '<tr><td colspan="4"><center><b>Nenhuma Categoria Encontrada</b></center></td></tr>'
            }

            $('#dataSource').append(row)
            //document.getElementById('dataSource').innerHTML = row
        }
    })
}

function createCategory() {
    $.ajax({
        url: '/Category/addCategory',
        data: {
            name: document.getElementById('txtNomeCategoria').value,
            description: document.getElementById('txtDescricaoCategoria').value
        },
        type: "GET",
        success: function (data) {
            if (data == "OK") {
                alert('CADASTRADO')
                document.getElementById('txtNomeCategoria').value = ""
                document.getElementById('txtDescricaoCategoria').value = ""
                getCategories()
            } else {
                alert('ERRO')
            }
        }
    })
}
function deleteCategory(id) {
    $.ajax({
        url: '/Category/deleteCategory',
        data: {
            id: id
        },
        type: "DELETE",
        success: function (data) {
            if (data == "OK") {
                alert('CATEGORIA DELETADA')
                getCategories()
            }
            else {
                alert('Erro')
            }
        }
       

    })
}

function getCategoryById(id) {
    $.ajax({
        url: '/Category/getCategoryById',
        data: {
            id:id
        },
        type: "GET",
        success: function (data) {

            document.getElementById('txtDescricaoCategoriaEdit').value = data.description
            document.getElementById('txtIdCategoria').value = data.id
            document.getElementById('txtNomeCategoriaEdit').value = data.name
            $('#modalEditaCategoria').modal('show');
        }
    })
}

function editCategory() {
    $.ajax({
        url: '/Category/editCategory',
        data: {
            id: document.getElementById('txtIdCategoria').value,
            newName: document.getElementById('txtNomeCategoriaEdit').value,
            newDescription: document.getElementById('txtDescricaoCategoriaEdit').value
        },
        type: "PUT",
        success: function (data) {
            if (data == "OK") {
                alert('Editado com sucesso!')
                $('#modalEditaCategoria').modal('hide');
                getCategories()
            } else {
                alert('Erro ao editar categoria')
            }
        }
    })
}