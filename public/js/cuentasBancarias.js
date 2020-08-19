$(function () {
    var btnCrearCuentabancaria = '<a id="btnCrearCuentaBancaria" class="dt-button buttons-crear buttons-html5" tabindex="0" aria-controls="tblCuentasBancarias" href="#"><span>Crear Cuenta</span></a>';
    $("#divFormCrearCuenta").hide();

    $('#tblCuentasBancarias').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy',
            { extend: 'csv', title: 'CuentasBancariasCSV' },
            { extend: 'excel', title: 'CuentasBancariasXLS' },
            { extend: 'pdf', title: 'CuentasBancariasPDF' },
            'print'
        ],
        initComplete: function(settings, json) {
            $('.dt-buttons').prepend(btnCrearCuentabancaria);
        }
    });


    $('#btnCrearCuentaBancaria').on('click', function(event) {
        event.preventDefault();
        $("#divFormCrearCuenta").show();
        $("#divTableCuentasBancarias").hide();
    });

    $('#btnCuentaBancariaCancelar').on('click', function(event) {
        event.preventDefault();
        fnCancelar()
    });

    $('#btnCuentaBancariaGuardar').on('click', function(event) {
        event.preventDefault();
        if($('#frmCuentaBancaria').valid()){
            arrData = $('#frmCuentaBancaria').serializeArray();
            $.get("setCuentaBancaria", arrData).done(function (response){
                if(response.Status == 'Ok'){
                    fnCancelar();
                    recargarInfoCuentas();
                }
                showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            }).fail(function (error) {
                console.log("fail: " + error.responseText);
                showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            });
        }
    });

    $(document).on("click", ".btnEdit", function() {
        event.preventDefault();
        var type = $(this).data('type');
        var IdCuenta = $(this).data('id');        
        $.get('getCuentaBancaria', {IdCuenta: IdCuenta}).done(function (response){
            $.each(response, function(index, val) {
                 $.each(val, function(i, value) {
                      $('#'+i).val(value)
                      $('#Div_'+i).addClass('focused');
                      $('#Div_'+i).removeClass('error');
                 });
            });
            $("#divFormCrearCuenta").show();
            $("#divTableCuentasBancarias").hide();
        }).fail(function (error) {
            console.log("fail: " + error.responseText);
            showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
        });
    });

    $(document).on("click", ".btnDelete", function() {
        event.preventDefault();
        var type = $(this).data('type');
        var IdCuenta = $(this).data('id');
        swal({
            title: "Estas seguro de eliminar esta cuenta bancaria?",
            // text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                $.get('delCuentaBancaria', {IdCuenta: IdCuenta}).done(function (response){
                    if(response.Status == 'Ok'){
                        recargarInfoCuentas();
                    }
                    showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
                }).fail(function (error) {
                    console.log("fail: " + error.responseText);
                    showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
                });
            }
        });
    });

    $("#banco, #rfc, #beneficiario").keyup( function (e) {
        e.preventDefault();
        var str = $(this).val();
        $(this).val(str.toUpperCase());
    });

    $("#clabe").keyup(function( event ) {
        event.preventDefault();
        if (/\D/g.test(this.value)){
            this.value = this.value.replace(/\D/g, '');
        }
    });  

    $('#frmCuentaBancaria').validate({
        rules: {
            rfc: {
                required: true,
                RFC: true,
            },
            'date': {
                customdate: true
            },
            'creditcard': {
                creditcard: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function(form) {

        }
    });

});

function fnCancelar(){
    $('#IdCuenta').val('');
    $('.form-line').removeClass('focused');
    $('#frmCuentaBancaria')[0].reset();
    $("#divFormCrearCuenta").hide();
    $("#divTableCuentasBancarias").show();
    $("#frmCuentaBancaria").validate().resetForm();
}

function recargarInfoCuentas(){
    $.get("getCuentaBancaria").done(function (response){
        $("#tblCuentasBancarias > tbody").html('');
        var tblBody = ""
        $.each(response, function(index, val) {
            tblBody += "<tr>"+
                        "<td>"+val.id+"</td>"+
                        "<td>"+val.banco+"</td>"+
                        "<td>"+val.num_cuenta+"</td>"+
                        "<td>"+val.clabe+"</td>"+
                        "<td>"+val.beneficiario+"</td>"+
                        "<td>"+val.rfc+"</td>"+
                        "<td>"+
                            "<button type='button' data-id='"+val.IdCuenta+"' data-type='edit' class='btn bg-orange btn-xs waves-effect btnEdit'><i class='material-icons'>edit</i></button>&nbsp;"+
                            "<button type='button' data-id='"+val.IdCuenta+"' data-type='delete' class='btn bg-red btn-xs waves-effect btnDelete'><i class='material-icons'>delete_forever</i></button>"+
                        "</td>"+
                    "</tr>"
        });
        $("#tblCuentasBancarias > tbody").append(tblBody);
    }).fail(function (error) {
        console.log("fail: " + error.responseText);
    });
}