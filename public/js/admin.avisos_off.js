$(function () {
    var table;
    $("#divFormCrearAviso").hide();

    $('#Div_expira input').datepicker({
        autoclose: true,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        todayHighlight: true,
        toggleActive: true,
        container: '#Div_expira'
    });

    // fnReloadTable('tblAvisos');
var btnCrearAviso = '<a id="btnCrearAviso" class="dt-button buttons-crear buttons-html5" tabindex="0" aria-controls="tblAvisos" href="#"><span>Crear Aviso</span></a>';
table = $('#tblAvisos').DataTable({
        destroy: true,
        retrieve: true,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [],
        columns: [
            null,
            { "width": "45%" },
            null,
            null,
            null,
            null
        ],
        initComplete: function(settings, json) {
            $('.dt-buttons').prepend(btnCrearAviso);
            this.api().columns().every( function (i, val) {
                var column = this;
                if(i == 1 || i == 2 || i == 5){

                } else {
                    if(i == 0){
                        selectValue = 'Titulo';
                    } else  if(i == 3){
                        selectValue = 'Tipo';
                    } else if(i == 4){
                        selectValue = 'Estatus';
                    }
                    var select = $('<select><option value="">'+selectValue+'</option></select>')
                        .appendTo( $(column.header()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
     
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );
     
                    column.data().unique().sort().each( function ( d, j ) {
                        valueOption = d.replace('<span class="label label-success">', '').replace('</span>', '');
                        valueOption = valueOption.replace('<span class="label label-danger">', '').replace('</span>', '')
                        select.append( '<option value="'+valueOption+'">'+valueOption+'</option>' )
                    } ); 
                }

            } );
        }
    });

    $('#expira').on('change', function(event) {
        event.preventDefault();
        if($(this).val() != ''){
            $('#Div_expira').addClass('focused');
            $('#Div_expira').removeClass('error');
        }
    }).on("blur", function(e) { 
        if($(this).val() != ''){
            $('#Div_expira').addClass('focused');
            $('#Div_expira').removeClass('error');
        }
    });

    $(document).on("click", "#btnCrearAviso", function(event) {
    // $('#btnCrearAviso').on('click', function(event) {
        event.preventDefault();
        $("#divFormCrearAviso").show();
        $("#divTableAvisos").hide();
    });

    $('#btnAvisoCancelar').on('click', function(event) {
        event.preventDefault();
        fnCancelar()
    });

    $('#btnAvisoGuardar').on('click', function(event) {
        event.preventDefault();
        if($('#frmAviso').valid()){
            arrData = $('#frmAviso').serializeArray();
            $.get("setAviso", arrData).done(function (response){
                if(response.Status == 'Ok'){
                    fnCancelar();
                    recargarInfoAvisos();
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
        var IdAviso = $(this).data('id');        
        $.get('getAvisos', {IdAviso: IdAviso}).done(function (response){
            $.each(response, function(index, val) {
                 $.each(val, function(i, value) {
                    if(i == 'IdTipo'){
                        $('#tipo').selectpicker('val', value);
                    } else if(i == 'IdStatus'){
                        $('#status').selectpicker('val', value);
                    } else if(i == 'expira'){
                        $("#expira").datepicker().datepicker("setDate", new Date(value));
                    } else {
                        $('#'+i).val(value)
                        $('#Div_'+i).addClass('focused');
                        $('#Div_'+i).removeClass('error');
                    }
                 });
            });
            $("#divFormCrearAviso").show();
            $("#divTableAvisos").hide();
        }).fail(function (error) {
            console.log("fail: " + error.responseText);
            showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
        });
    });

    $(document).on("click", ".btnDelete", function() {
        event.preventDefault();
        var type = $(this).data('type');
        var IdAviso = $(this).data('id');
        swal({
            title: "Estas seguro de eliminar este aviso?",
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
                $.get('delAviso', {IdAviso: IdAviso}).done(function (response){
                    if(response.Status == 'Ok'){
                        recargarInfoAvisos();
                    }
                    showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
                }).fail(function (error) {
                    console.log("fail: " + error.responseText);
                    showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
                });
            }
        });
    });


    $('#frmAviso').validate({
        rules: {
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
    $('#IdAviso').val('');
    $('.form-line').removeClass('focused');
    $('#frmAviso')[0].reset();
    $("#divFormCrearAviso").hide();
    $("#divTableAvisos").show();
    $("#frmAviso").validate().resetForm();
    $('#tipo').selectpicker('val', '');
    $('#status').selectpicker('val', '');    
    $("#expira").datepicker().datepicker("setDate", new Date());
}

function recargarInfoAvisos(){
    $('#tblAvisos').DataTable().destroy();
    $.get("getAvisos").done(function (response){
        $("#tblAvisos > tbody").html('');
        var tblBody = ""
        $.each(response, function(index, val) {
            if(val.status == 'Activo'){ 
                ClassStatus = 'label-success' 
            } else{ 
                ClassStatus = 'label-danger'
            }
            tblBody += "<tr>"+
                        "<td>"+val.titulo+"</td>"+
                        "<td>"+val.descripcion+"</td>"+
                        "<td>"+val.expira+"</td>"+
                        "<td>"+val.tipo+"</td>"+
                        "<td><span class='label "+ClassStatus+"'>"+val.status+"</span></td>"+
                        "<td>"+
                            "<button type='button' data-id='"+val.IdAviso+"' data-type='edit' class='btn bg-orange btn-xs waves-effect btnEdit'><i class='material-icons'>edit</i></button>&nbsp;"+
                            "<button type='button' data-id='"+val.IdAviso+"' data-type='delete' class='btn bg-red btn-xs waves-effect btnDelete'><i class='material-icons'>delete_forever</i></button>"+
                        "</td>"+
                    "</tr>"
        });
        $("#tblAvisos > tbody").append(tblBody);
        fnReloadTable('tblAvisos');
    }).fail(function (error) {
        console.log("fail: " + error.responseText);
    });
}

function fnReloadTable(Id){
btnCrearAviso = '<a id="btnCrearAviso" class="dt-button buttons-crear buttons-html5" tabindex="0" aria-controls="tblAvisos" href="#"><span>Crear Aviso</span></a>';
table = $('#tblAvisos').DataTable({
        destroy: true,
        retrieve: true,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [],
        columns: [
            null,
            { "width": "45%" },
            null,
            null,
            null,
            null
        ],
        initComplete: function(settings, json) {
            $('.dt-buttons').prepend(btnCrearAviso);
            this.api().columns().every( function (i, val) {
                var column = this;
                if(i == 1 || i == 2 || i == 5){

                } else {
                    if(i == 0){
                        selectValue = 'Titulo';
                    } else  if(i == 3){
                        selectValue = 'Tipo';
                    } else if(i == 4){
                        selectValue = 'Estatus';
                    }
                    var select = $('<select><option value="">'+selectValue+'</option></select>')
                        .appendTo( $(column.header()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
     
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );
     
                    column.data().unique().sort().each( function ( d, j ) {
                        valueOption = d.replace('<span class="label label-success">', '').replace('</span>', '');
                        valueOption = valueOption.replace('<span class="label label-danger">', '').replace('</span>', '')
                        select.append( '<option value="'+valueOption+'">'+valueOption+'</option>' )
                    } ); 
                }

            } );
        }
    });
}