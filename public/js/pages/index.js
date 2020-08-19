$(function () {
    //Widgets count
    $('.count-to').countTo();

    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            // return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ');
            return '$' + value.toFixed(2);
        }
    });

    //Saldo count to
    $('.saldo-count-to').countTo({
        formatter: function (value, options) {
            return 'Saldo:  $ ' + value.toFixed(2);
        }
    });
    //Kg count to
    $('.kg-count-to').countTo({
        formatter: function (value, options) {
            return value.toFixed(2) + ' Kg';
        }
    });

    /*initRealTimeChart();
    initDonutChart();
    initSparkline();*/

    //Advanced Form Validation
    $('#frmDatosFiscales').validate({
        rules: {
            rfc: {
                required: true,
                RFC: true,
                // remote: {
                //     url: "valida_rfc",
                //     type: "post",
                //     complete: function(data){
                //         return data;
                //     },
                // },
            },
            telefono: {
                required: true,
                // phoneNumber: true,
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
        }
    });


//Masked Input ============================================================================================================================
    var $demoMaskedInput = $('.demo-masked-input');
    //Mobile Phone Number
    $demoMaskedInput.find('.mobile-phone-number').inputmask('9999999999');
    //Phone Number
    $demoMaskedInput.find('.phone-number').inputmask('+99 (999) 999-99-99', { placeholder: '+__ (___) ___-__-__' });
    //Email
    $demoMaskedInput.find('.email').inputmask({ alias: "email" });
//=========================================================================================================================================
    

    //Custom Validations ===============================================================================
    //Date
    $.validator.addMethod('customdate', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
    },
        'Please enter a date in the format YYYY-MM-DD.'
    );

    //Credit card
    $.validator.addMethod('creditcard', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d\d\d?-\d\d\d\d?-\d\d\d\d$/);
    },
        'Please enter a credit card in the format XXXX-XXXX-XXXX-XXXX.'
    );
    //==================================================================================================
    
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $(document).on('change', '#pais', function() {
        var id_estado = $(this).data('estado');
        if($(this).val() == ''){
            $('#estado').prop('disabled', true);
            $("#estado").html("")
            $("#estado").append('<option value="">-- Estado --</option>');
            $('#estado').selectpicker('refresh');
        } else {
            $.post("/getEstado", { idPais: $(this).val() }).done(function (response){
                var opt = '<option value="">-- Estado --</option>';
                var selected = '';
                $('#estado').prop('disabled', false);
                $("#estado").html("")
                $.each(response, function(i, item) {
                    selected = '';
                    if(id_estado == item.id){
                        selected = 'selected';
                    }
                    opt += '<option value="' + item.id + '" ' + selected + '>' + item.estado + '</option>';
                });
                $("#estado").append(opt);
                $('#estado').selectpicker('refresh');
            }).fail(function (error) {
                console.log("error: " + error.responseText);
            });
        }
    });

    if($('#pais').val() != ''){
        $('#pais').trigger('change');
    }

    if($('#DatosFiscalesStatus').length && $('#DatosFiscalesStatus').val().length){
        var placementFrom = $('#DatosFiscalesStatus').data('placement-from');
        var placementAlign = $('#DatosFiscalesStatus').data('placement-align');
        var animateEnter = $('#DatosFiscalesStatus').data('animate-enter');
        var animateExit = $('#DatosFiscalesStatus').data('animate-exit');
        var colorName = $('#DatosFiscalesStatus').data('color-name');
        showNotification(colorName, $('#DatosFiscalesStatus').val(), placementFrom, placementAlign, animateEnter, animateExit);
    }

    if($('#SoporteStatus').length && $('#SoporteStatus').val().length){
        var placementFrom = $('#SoporteStatus').data('placement-from');
        var placementAlign = $('#SoporteStatus').data('placement-align');
        var animateEnter = $('#SoporteStatus').data('animate-enter');
        var animateExit = $('#SoporteStatus').data('animate-exit');
        var colorName = $('#SoporteStatus').data('color-name');
        showNotification(colorName, $('#SoporteStatus').val(), placementFrom, placementAlign, animateEnter, animateExit);
    }

    if($('#TiendaStatus').length && $('#TiendaStatus').val().length){
        var placementFrom = $('#TiendaStatus').data('placement-from');
        var placementAlign = $('#TiendaStatus').data('placement-align');
        var animateEnter = $('#TiendaStatus').data('animate-enter');
        var animateExit = $('#TiendaStatus').data('animate-exit');
        var colorName = $('#TiendaStatus').data('color-name');
        showNotification(colorName, $('#TiendaStatus').val(), placementFrom, placementAlign, animateEnter, animateExit);
    }

    if($('#DireccionStatus').length && $('#DireccionStatus').val().length){
        var placementFrom = $('#DireccionStatus').data('placement-from');
        var placementAlign = $('#DireccionStatus').data('placement-align');
        var animateEnter = $('#DireccionStatus').data('animate-enter');
        var animateExit = $('#DireccionStatus').data('animate-exit');
        var colorName = $('#DireccionStatus').data('color-name');
        showNotification(colorName, $('#DireccionStatus').val(), placementFrom, placementAlign, animateEnter, animateExit);
    }

    $(document).on("mouseover", ".ClassAvisoClick", function(event) {
        $(this).css('cursor','pointer');
    });

    $(document).on("click", ".ClassAvisoClick", function(event) {
        var href = $(this).data('href');
        window.location.href = 'Avisos/'+href;
    });


});

var realtime = 'on';
function initRealTimeChart() {
    //Real time ==========================================================================================
    var plot = $.plot('#real_time_chart', [getRandomData()], {
        series: {
            shadowSize: 0,
            color: 'rgb(0, 188, 212)'
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        lines: {
            fill: true
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            min: 0,
            max: 100
        }
    });

    function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        var timeout;
        if (realtime === 'on') {
            timeout = setTimeout(updateRealTime, 320);
        } else {
            clearTimeout(timeout);
        }
    }

    updateRealTime();

    $('#realtime').on('change', function () {
        realtime = this.checked ? 'on' : 'off';
        updateRealTime();
    });
    //====================================================================================================
}

function initSparkline() {
    $(".sparkline").each(function () {
        var $this = $(this);
        $this.sparkline('html', $this.data());
    });
}

function initDonutChart() {
    Morris.Donut({
        element: 'donut_chart',
        data: [{
            label: 'Chrome',
            value: 37
        }, {
            label: 'Firefox',
            value: 30
        }, {
            label: 'Safari',
            value: 18
        }, {
            label: 'Opera',
            value: 12
        },
        {
            label: 'Other',
            value: 3
        }],
        colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)'],
        formatter: function (y) {
            return y + '%'
        }
    });
}

var data = [], totalPoints = 110;
function getRandomData() {
    if (data.length > 0) data = data.slice(1);

    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + Math.random() * 10 - 5;
        if (y < 0) { y = 0; } else if (y > 100) { y = 100; }

        data.push(y);
    }

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
    }

    return res;
}

function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
    {
        type: colorName,
        allow_dismiss: allowDismiss,
        newest_on_top: true,
        timer: 3000,
        placement: {
            from: placementFrom,
            align: placementAlign
        },
        animate: {
            enter: animateEnter,
            exit: animateExit
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

var VarShowAvisos = true;
function showAvisos(){
    if(VarShowAvisos){
        console.log("Ok")
        $('#modalAvisosContenido').html('');
        $.get('getAvisos', {AvisosActivos: true}).done(function (response){
            if(response.length > 0){

                $.each(response, function(index, val) {
                    var link = val.titulo.split(' ').join('');
                    $('#modalAvisosContenido').append('<div class="ClassAvisoClick alert alert-'+val.tipo+'" role="alert" data-href="'+link+'">'+
                      '<span data-notify="icon"></span> ' +
                      '<h4 class="alert-heading">'+val.titulo+'</h4>'+
                      '<hr>'+
                      val.descripcion+
                    '</div>');
                });

                $('#modalAvisos').modal({
                    backdrop: 'static',
                    keyboard: false,
                    focus: true
                }).on('shown.bs.modal', function (e) {
                    var offset = 0;
                }).on('hidden.bs.modal', function (e) {

                });
            }
        }).fail(function (error) {
            console.log("fail: " + error.responseText);
            showNotification('alert-danger', error.responseText, 'top', 'right', 'animated bounceIn', 'animated bounceOut');
        });
        VarShowAvisos = false;
    }
}
