$('#pageLoaderWrapperPagos').hide();
let $frmAgregaTarjetaConekta = $("#frmAgregaTarjetaConekta");
let $frmAgregarCreditoConekta = $("#frmAgregarCreditoConekta");
let $selectTarjetasConekta = $('#tarjetasConekta');
var totalRecargaConekta = 0;
var conektaComision = 0;
var conekta = 0;
$(function () {
    $("#divFormAgregarTarjeta").hide();
    $('#tarjetaCredito').trigger('click');

    $(document).on("click", "#btnAgregarTarjeta", function(event) {
        event.preventDefault();
        if($('#ConektaClienteID').val() == ''){
            $.get("CreaClienteConekta", {ConektaClienteID: $('#ConektaClienteID').val()}).done(function (response){
                if(response.Status == 'Ok'){
                    $('#ConektaClienteID').val(response.ConektaClienteID)
                    $("#divFormAgregarTarjeta").show();
                    $("#divAgregaCreditoConekta").hide();
                } else {
                    showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
                }
            }).fail(function (error) {
                console.log("fail: " + error.responseText);
                showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            });
        } else {
            $("#divFormAgregarTarjeta").show();
            $("#divAgregaCreditoConekta").hide();
        }
    });

    $(document).on("click", "#btnCancelarFormConektaTarjeta", function(event) {
        event.preventDefault();
        fnCancelarFormAgregaTarjeta();
    });


    $(document).on("click", "#btnGuardarFormConektaTarjeta", function(event) {
        event.preventDefault();
        if($('#frmAgregaTarjetaConekta').valid()){
            $('#frmAgregaTarjetaConekta').submit();
        }
    });

    $(document).on("click", "#btnAgregarCreditoConekta", function(event) {
        event.preventDefault();
        if($('#frmAgregarCreditoConekta').valid()){
            $('#pageLoaderWrapperPagos').fadeIn();
            $('#frmAgregarCreditoConekta').submit();
        }
    });

    $('#frmAgregaTarjetaConekta').validate({
        
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

    $('#frmAgregarCreditoConekta').validate({
        rules: {
            montoConekta: {
                required: true,
                min: 25,
                max: 5000
            },
            'date': {
                customdate: true
            },
            'creditcard': {
                creditcard: true
            }
        },
        messages: {
            montoConekta: {
                min: 'Por favor introduce un valor mayor o igual a $25.00 MXN',
                max: 'Por favor introduce un valor menor o igual a $5000.00 MXN'
            },
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


    Conekta.setPublicKey("key_KJysdbf6PotS2ut2");
    var conektaSuccessResponseHandler = function(token){
        fnConektaAgregaTarjeta(token.id);
    };

    var conektaErrorResponseHandler = function(response){
        console.log(response.message_to_purchaser);
        showNotification('alert-danger', response.message_to_purchaser, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
    }

    $("#frmAgregaTarjetaConekta").submit(function(e){
        e.preventDefault();
        var tokenParams = {
          "card": {
            "number": $('#tarjeta').val(),
            "name": $('#nombre').val(),
            "exp_year": $('#year').val(),
            "exp_month": $('#mes').val(),
            "cvc": $('#cvc').val(),
            // "address": {
            //     "street1": $('#calle').val() + ' ' +$('#numero').val(),
            //     "street2": $('#colonia').val(),
            //     "city": $('#ciudad').val(),
            //     "state": $('#estado').val(),
            //     "zip": $('#codigo_postal').val(),
            //     "country": $('#pais').val()
            //  }
          }
        };
        Conekta.Token.create(tokenParams, conektaSuccessResponseHandler, conektaErrorResponseHandler);
    });

    $("#frmAgregarCreditoConekta").submit(function(e){
        e.preventDefault();
        let params = $frmAgregarCreditoConekta.serialize();
        $.get("AgregarCreditoConekta", {tarjetasConekta: $('#tarjetasConekta').val(), ConektaClienteID: $('#ConektaClienteID').val(), montoConekta: $('#montoConekta').val(), totalRecargaConekta: totalRecargaConekta, ConektaProducto: $('#ConektaProducto').text()}).done(function (response){
            if(response.Status == 'Ok'){
                fnConektaLimpiarForm($frmAgregarCreditoConekta);
                // recargarTarjetasConekta();
                TotalRecargaConekta(0);
                TotalSaldo(response.SaldoNuevo);
            }
            setTimeout(function () { $('#pageLoaderWrapperPagos').fadeOut(); }, 500);
            showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
        }).fail(function (error) {
            setTimeout(function () { $('#pageLoaderWrapperPagos').fadeOut(); }, 500);
            console.log("fail: " + error.responseText);
            showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
        });
    });

    $("#montoConekta").keyup(function( event ) {
        event.preventDefault();
        if (/\D/g.test(this.value)){
            this.value = this.value.replace(/\D/g, '');
        }
        totalRecargaConekta = 0;
        conektaComision = (parseFloat($('#conektaPorcentaje').val()) / 100).toFixed(3);
        conekta = isNaN(parseFloat(this.value)) ? 0 : parseFloat(this.value) * conektaComision + parseFloat($('#conektaMX').val())
        Iva = conekta * parseFloat($('#iva').val());
        totalRecargaConekta =  isNaN(this.value) ? 0 : parseFloat(this.value) - conekta - Iva;
        TotalRecargaConekta(totalRecargaConekta);
    });  

    recargarTarjetasConekta();
});

function fnCancelarFormAgregaTarjeta(){
    $frmAgregaTarjetaConekta.find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $frmAgregaTarjetaConekta.find('.form-line').removeClass('focused');
    $frmAgregaTarjetaConekta.validate().resetForm();
    $("#divFormAgregarTarjeta").hide();
    $("#divAgregaCreditoConekta").show();
}

function fnConektaLimpiarForm($form){
    $form.find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $form.find('.form-line').removeClass('focused');
    $form.validate().resetForm();
    $selectTarjetasConekta.selectpicker('refresh');
    $("#divFormAgregarTarjeta").hide();
    $("#divAgregaCreditoConekta").show();
}

function fnConektaAgregaTarjeta(token){
    let params = $frmAgregaTarjetaConekta.serialize()+"&TokenIdTarjeta="+token;
    $.get("AgregaTarjetaConekta", params).done(function (response){
        if(response.Status == 'Ok'){
            fnConektaLimpiarForm($frmAgregaTarjetaConekta);
            recargarTarjetasConekta();
        }
        showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
    }).fail(function (error) {
        console.log("fail: " + error.responseText);
        showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
    });
}

function recargarTarjetasConekta(){
    $.get("GetClienteConekta", {ConektaClienteID: $('#ConektaClienteID').val()}).done(function (response){
        if(response.Status == 'Ok'){
            $selectTarjetasConekta.html('')
            html = '<option value="">Seleciona una tarjeta</option>';
            $.each(response.TarjetaClienteConekta, function(index, val) {
                 html += '<option value="'+val.id+'">' + val.brand + '   **** **** **** '+val.last4+'</option>'
            });
            $selectTarjetasConekta.html(html);
            $selectTarjetasConekta.selectpicker('refresh');
        }
    }).fail(function (error) {
        console.log("fail: " + error.responseText);
        showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
    });
}

function TotalRecargaConekta(totalRecarga){
    $('#totalRecargaConekta').data('to', totalRecarga)
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2);
        }
    });
}