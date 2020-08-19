var totalRecarga = 0;
var paypal = 0;
window.paypal_sdk.Buttons({
    // env: 'sandbox',
    style: {
        shape:  'pill',
        label:  'pay',
        size:   'small',
        layout: 'horizontal'
    },
    funding: {
        disallowed: [ window.paypal_sdk.FUNDING.CREDIT ]
    },
    commit: true,
    onInit: function(data, actions) {
        actions.enable();
    },
    onClick: function() {
        if($('#monto').val() <= 0) {
            showNotification('alert-danger', 'Por favor introduce la cantidad.', 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            $('#monto').focus();
            return false;
        }
        $('#pageLoaderWrapperPagos').fadeIn();
        return true;
    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                description: $("#paypalConcepto").val(),
                soft_descriptor: $("#paypalConcepto").val(),
                amount: {
                    currency_code: "MXN",
                    value: $("#monto").val(),
                    breakdown: {
                        item_total: {
                            currency_code: "MXN",
                            value: $("#monto").val()
                        }
                    }
                },
                items: [
                    {
                        name: $("#paypalConcepto").val(),
                        description: $("#paypalConcepto").val(),
                        unit_amount: {
                            currency_code: "MXN",
                            value: $("#monto").val()
                        },
                        quantity: "1"
                    }
                ],
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            details.totalRecarga = totalRecarga;
            $.get("/agregaCredito", details).done(function (response){
                if(response.Status == 'Ok'){
                    $("#monto").val('');
                    TotalRecarga(0);
                    TotalSaldo(response.SaldoNuevo);
                }
                showNotification(response.Color, response.Mensaje, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            }).fail(function (error) {
                console.log("fail: " + error.responseText);
                showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
            });

            // console.log('Transaccion completa por ' + details.payer.name.given_name + '!');
            $('#pageLoaderWrapperPagos').fadeOut();
        });
    },
    onError: function (error) {
        $('#pageLoaderWrapperPagos').fadeOut();
        console.log("onError: " + error);
        showNotification('alert-danger', error, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
    },
    onCancel: function(data, actions) {
        $('#pageLoaderWrapperPagos').fadeOut();
    }
}).render('#paypal-button-container');


$("#monto").keyup(function( event ) {
    event.preventDefault();
    if (/\D/g.test(this.value)){
        this.value = this.value.replace(/\D/g, '');
    }
    totalRecarga = 0;
    paypal = 0;
    paypal = isNaN(parseFloat($('#monto').val())) ? 0 : (parseFloat($('#monto').val()) * parseFloat($('#paypalPorcentaje').val()))/100
    totalRecarga =  isNaN(parseFloat($('#monto').val())) ? 0 : parseFloat($('#monto').val()) - paypal;
    TotalRecarga(totalRecarga);
});  

function TotalRecarga(totalRecarga){
    $('#totalRecarga').data('to', totalRecarga)

    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2);
        }
    });
}

function TotalSaldo(Total){
    $('#DivTotalSaldo').data('to', Total)
    $('.saldo-count-to').countTo({
        formatter: function (value, options) {
            return 'Saldo:  $ ' + value.toFixed(2);
        }
    });
}