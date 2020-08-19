    //solo numeros
    function soloNumeros(evt){
         
        document.getElementById('boton_tarifa').style.display='block';
        document.getElementById('boton_tarifa_oculto').style.display='none';
        document.getElementById('boton_tarifa_oculto').disabled=false;

        //Validar la existencia del objeto event
        evt = (evt) ? evt : event;

        //Extraer el codigo del caracter de uno de los diferentes grupos de codigos
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));

        //Predefinir como valido
        var respuesta = true;

        //Validar si el codigo corresponde a los NO aceptables
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        {
        //Asignar FALSE a la respuesta si es de los NO aceptables
        respuesta = false;
        }

        //Regresar la respuesta
        return respuesta;
    }
    //fin



    //solo numeros
    function soloNumerosCotizar(evt){

        //Validar la existencia del objeto event
        evt = (evt) ? evt : event;

        //Extraer el codigo del caracter de uno de los diferentes grupos de codigos
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));

        //Predefinir como valido
        var respuesta = true;

        //Validar si el codigo corresponde a los NO aceptables
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        {
        //Asignar FALSE a la respuesta si es de los NO aceptables
        respuesta = false;
        }

        //Regresar la respuesta
        return respuesta;
    }
    //fin



    //validamos que tipo de paquete se selecciona
    function validartipopaquete(){

        if (document.getElementById('tipo_paquete').value == 1) {

        document.getElementById('divlargo').style.display='block';
        document.getElementById('largo').disabled=false;

        document.getElementById('divancho').style.display='block';
        document.getElementById('ancho').disabled=false;

        document.getElementById('divalto').style.display='block';
        document.getElementById('alto').disabled=false;

        document.getElementById('divunidaddistancia').style.display='block';

        document.getElementById('divpeso').style.display='block';
        document.getElementById('peso').disabled=false;

        document.getElementById('divunidadpeso').style.display='block';

        document.getElementById('divcontenido').style.display='block';
        document.getElementById('referencia_destino').disabled=false;
        document.getElementById('contenido').disabled=false;

        } else {

        document.getElementById('divlargo').style.display='none';
        document.getElementById('largo').disabled=true;

        document.getElementById('divancho').style.display='none';
        document.getElementById('ancho').disabled=true;

        document.getElementById('divalto').style.display='none';
        document.getElementById('alto').disabled=true;

        document.getElementById('divunidaddistancia').style.display='none';

        document.getElementById('divpeso').style.display='none';
        document.getElementById('peso').disabled=true;

        document.getElementById('divunidadpeso').style.display='none';

        document.getElementById('divcontenido').style.display='none';
        document.getElementById('referencia_destino').disabled=true;
        document.getElementById('contenido').disabled=true;

        }
    }
    //fin



//calculo de peso volumétrico
function CalculoPesoVolumetrico() {
   var alto = document.wizard_with_validation.alto.value;
   var ancho = document.wizard_with_validation.ancho.value;
   var largo = document.wizard_with_validation.largo.value;
   try{
   alto = (isNaN(parseInt(alto)))? 0 : parseInt(alto);
   ancho = (isNaN(parseInt(ancho)))? 0 : parseInt(ancho);
   largo = (isNaN(parseInt(ancho)))? 0 : parseInt(largo);
   document.wizard_with_validation.resultado.value = (Math.ceil((alto*ancho*largo)/5000));
   }
   catch(e) {}
}
//fin





//calculo de peso volumétrico editar medidas
function CalculoPesoVolumetricoMedidas() {
   var alto = document.form_validation_medidas.alto.value;
   var ancho = document.form_validation_medidas.ancho.value;
   var largo = document.form_validation_medidas.largo.value;
   try{
   alto = (isNaN(parseInt(alto)))? 0 : parseInt(alto);
   ancho = (isNaN(parseInt(ancho)))? 0 : parseInt(ancho);
   largo = (isNaN(parseInt(ancho)))? 0 : parseInt(largo);
   document.form_validation_medidas.resultado.value = (Math.ceil((alto*ancho*largo)/5000));
   }
   catch(e) {}
}
//fin





//extraemos los datos del origen según la dirección seleccionada
function ExtraerDatosOrigen() {

        var lista_direccion_origen = $("select[name=lista_direccion_origen]").val();

        $.ajax({

           type:'POST',

           url:'/post-data_extraer_datos_origen',

           data:{lista_direccion_origen:lista_direccion_origen},

           dataType: 'json',

           success:function(data){

            $.notify({message: 'Dirección del origen encontrada correctamente.' },{ type: 'info' });

            //console.log(data);

            $('#nombre_origen').val(data[0].Nombre);
            $('#empresa_origen').val(data[0].Empresa);
            $('#telefono_origen').val(data[0].Telefono);
            $('#email_origen').val(data[0].CorreoElectronico);
            $('#calle_origen').val(data[0].Calle);
            $('#referencia_origen').val(data[0].Referencia);

           }

        });
}
//fin






//extraemos los datos del origen según la dirección seleccionada
function ExtraerDatosDestino() {

        var lista_direccion_destino = $("select[name=lista_direccion_destino]").val();

        $.ajax({

           type:'POST',

           url:'/post-data_extraer_datos_destino',

           data:{lista_direccion_destino:lista_direccion_destino},

           dataType: 'json',

           success:function(data){

            $.notify({message: 'Dirección del destino encontrada correctamente.' },{ type: 'info' });

            //console.log(data);

            $('#nombre_destino').val(data[0].Nombre);
            $('#empresa_destino').val(data[0].Empresa);
            $('#telefono_destino').val(data[0].Telefono);
            $('#email_destino').val(data[0].CorreoElectronico);
            $('#calle_destino').val(data[0].Calle);
            $('#referencia_destino').val(data[0].Referencia);

           }

        });
}
//fin




//ocultar boton guardar tarifa
function ocultarbotonguardartarifa(){

    document.getElementById('boton_tarifa').style.display='none';
    document.getElementById('boton_tarifa_oculto').style.display='block';
    document.getElementById('boton_tarifa_oculto').disabled=true;

}
//fin


//ocultar boton guardar tarifa
function mostrarbotonguardartarifa(){

    document.getElementById('boton_tarifa').style.display='block';
    document.getElementById('boton_tarifa_oculto').style.display='none';
    document.getElementById('boton_tarifa_oculto').disabled=false;

}
//fin





$(function () {


        $.ajaxSetup({
                headers: {'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')}
            });



    //se valida el código postal del origen
    $("#cp_origen").change(function (e) {

        e.preventDefault();
        cp = $("#cp_origen").val();
       
        $.ajax({
            url:"/post-data",
            method: 'post',
            data: {cp: cp},
            dataType: 'json',
            success: function(response){
                $.each(response, function(i, items){
                    if(i == 'response'){
                        $.each(items, function(j, item){

                            console.log(j, item)
                            if(j == 'municipio'){
                                $('#ciudad_origen').val(item);
                            }

                            if(j == 'estado'){
                                $('#estado_origen').val(item);
                            }

                            if(j == 'asentamiento'){
                                var opt = '<option value="">-- Seleccionar --</option>';
                                $('#colonia_origen').prop('disabled', false);
                                $("#colonia_origen").html("")
                                $.each(item, function(h, value) {
                                    opt += '<option value="' + value + '">' + value + '</option>';
                                });
                                $("#colonia_origen").append(opt);
                                $('#colonia_origen').selectpicker('refresh');                               
                            }

                        });
                    }

                });

                $.notify({message: 'Código postal encontrado.' },{ type: 'success' });
                
            },
            error: function(error){
                $.notify({message: 'Error, código postal no encontrado.' },{ type: 'danger' });
            }
        });
    });




        //se valida el código postal del destino
    $("#cp_destino").change(function (e) {

        e.preventDefault();
        cp = $("#cp_destino").val();
       
        $.ajax({
            url:"/post-data",
            method: 'post',
            data: {cp: cp},
            dataType: 'json',
            success: function(response){
                $.each(response, function(i, items){
                    if(i == 'response'){
                        $.each(items, function(j, item){
                            //console.log(j, item)
                            if(j == 'municipio'){
                                $('#ciudad_destino').val(item);
                            }

                            if(j == 'estado'){
                                $('#estado_destino').val(item);
                            }

                            if(j == 'asentamiento'){
                                var opt = '<option value="">-- Seleccionar --</option>';
                                $('#colonia_destino').prop('disabled', false);
                                $("#colonia_destino").html("")
                                $.each(item, function(h, value) {
                                    opt += '<option value="' + value + '">' + value + '</option>';
                                });
                                $("#colonia_destino").append(opt);
                                $('#colonia_destino').selectpicker('refresh');                              
                            }

                        });
                    }

                });

                $.notify({message: 'Código postal encontrado.' },{ type: 'success' });
                
            },
            error: function(error){
                $.notify({message: 'Error, código postal no encontrado.' },{ type: 'danger' });
            }
        });
    });


//actualizar datos de origen
$("#div-btn-origen").click(function(){
$("#ocultarorigen").css("display", "none");
$("#ocultarorigen2").css("display", "block");
});

//actualizar datos de destino
$("#div-btn-destino").click(function(){
$("#ocultardestino").css("display", "none");
$("#ocultardestino2").css("display", "block");
});

//actualizar datos de las medidas
$("#div-btn-medidas").click(function(){
$("#ocultarmedidas").css("display", "none");
$("#ocultarmedidas2").css("display", "block");
});


//actualiar datos del origen
 $(".btn-submit-origen").click(function(e){

        e.preventDefault();

        if($("#nombre_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca tu nombre.' },{ type: 'danger' });
        return false;
        }

        if($("#email_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca tu correo electrónico.' },{ type: 'danger' });
        return false;
        }

        if($("#telefono_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el número de teléfono.' },{ type: 'danger' });
        return false;
        }

        if($("#empresa_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el nombre de la empresa.' },{ type: 'danger' });
        return false;
        }

        if($("#cp_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el código postal.' },{ type: 'danger' });
        return false;
        }

        if($("#calle_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el nombre de la calle.' },{ type: 'danger' });
        return false;
        }

        if($("#colonia_origen").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Selecciona el nombre de la colonia.' },{ type: 'danger' });
        return false;
        }

        $("#ocultarorigen2").css("display", "none");
        $("#ocultarorigen").css("display", "block");

        var nombre_origen = $("input[name=nombre_origen]").val();
        var no_envio = $("input[name=no_envio]").val();

        var email_origen = $("input[name=email_origen]").val();
        var telefono_origen = $("input[name=telefono_origen]").val();
        var empresa_origen = $("input[name=empresa_origen]").val();
        var pais_origen = $("select[name=pais_origen]").val();
        var cp_origen = $("input[name=cp_origen]").val();
        var estado_origen = $("input[name=estado_origen]").val();
        var calle_origen = $("input[name=calle_origen]").val();
        var colonia_origen = $("select[name=colonia_origen]").val();
        var ciudad_origen = $("input[name=ciudad_origen]").val();
        var referencia_origen = $("input[name=referencia_origen]").val();


        $.ajax({

           type:'POST',

           url:'/post-data_envio_editar',

           data:{nombre_origen:nombre_origen, 
                no_envio:no_envio,
                email_origen:email_origen,
                telefono_origen:telefono_origen,
                empresa_origen:empresa_origen,
                pais_origen:pais_origen,
                cp_origen:cp_origen,
                estado_origen:estado_origen,
                calle_origen:calle_origen,
                colonia_origen:colonia_origen,
                ciudad_origen:ciudad_origen,
                referencia_origen:referencia_origen},

            dataType: 'json',

            success:function(data){

            $.notify({message: 'Datos de origen actualizados correctamente.' },{ type: 'success' });

            //console.log(data);

            jQuery('#valortarifas').empty(); //vaciamos el tbody de la tabla de tarifas

            $.each(data.datos_tarifas, function(index, val) {

            var tipo_envio=val.IdTipoEnvio;
            var precio_final=val.Precio;
            var precio_costo_extra=val.costo_extra_kg;
            var peso_paquete=data.extraigo_envio_destino_creado[0].peso;

            if(tipo_envio<=4){
             precio_final_real=precio_final;
            }


            if(tipo_envio==5){
              if(peso_paquete<=5){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-5;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }


            if(tipo_envio==6){
              if(peso_paquete==1){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-1;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }

            var mostrartarifas=$('<tr>'+
                                '<td style="border-color:#F5DA81;text-align: center;padding-top: 40px;"><input name="tipo_tarifa" type="radio" id="radio_45'+val.IdPrecios+'" class="with-gap radio-col-deep-orange" value="'+val.IdPrecios+'" checked /><label for="radio_45'+val.IdPrecios+'"></label></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><img src="images/'+val.imagen+'.png" width="35%"></td>'+
                                '<td style="border-color:#F5DA81;">'+val.Descripcion+'</td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-orange">'+val.Dias+' Día(s)</span></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-blue">$'+precio_final_real+'.00</span></td>'+
                                '</tr>');

            $('#valortarifas').append(mostrartarifas);

            });


            $('#valor1').html(data.extraigo_envio_origen_creado[0].nombre_origen);
            $('#valor2').html(data.extraigo_envio_origen_creado[0].empresa_origen);
            $('#valor3').html(data.extraigo_envio_origen_creado[0].telefono_origen);
            $('#valor4').html(data.extraigo_envio_origen_creado[0].colonia_origen);
            $('#valor5').html(data.extraigo_envio_origen_creado[0].calle_origen);
            $('#valor6').html(data.extraigo_envio_origen_creado[0].ciudad_origen);
            $('#valor7').html(data.extraigo_envio_origen_creado[0].estado_origen);
            $('#valor8').html(data.extraigo_envio_origen_creado[0].cp_origen);
            $('#valor9').html(data.extraigo_envio_origen_creado[0].referencia_origen);

           }

        });

    });
    //fin datos origen






 //actualiar datos del destino
 $(".btn-submit-destino").click(function(e){

        e.preventDefault();

        if($("#nombre_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca tu nombre.' },{ type: 'danger' });
        return false;
        }

        if($("#email_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca tu correo electrónico.' },{ type: 'danger' });
        return false;
        }

        if($("#telefono_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el número de teléfono.' },{ type: 'danger' });
        return false;
        }

        if($("#empresa_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el nombre de la empresa.' },{ type: 'danger' });
        return false;
        }

        if($("#cp_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el código postal.' },{ type: 'danger' });
        return false;
        }

        if($("#calle_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el nombre de la calle.' },{ type: 'danger' });
        return false;
        }

        if($("#colonia_destino").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Selecciona el nombre de la colonia.' },{ type: 'danger' });
        return false;
        }

        $("#ocultardestino2").css("display", "none");
        $("#ocultardestino").css("display", "block");

        var nombre_destino = $("input[name=nombre_destino]").val();
        var no_envio_destino = $("input[name=no_envio_destino]").val();

        var email_destino = $("input[name=email_destino]").val();
        var telefono_destino = $("input[name=telefono_destino]").val();
        var empresa_destino = $("input[name=empresa_destino]").val();
        var pais_destino = $("select[name=pais_destino]").val();
        var cp_destino = $("input[name=cp_destino]").val();
        var estado_destino = $("input[name=estado_destino]").val();
        var calle_destino = $("input[name=calle_destino]").val();
        var colonia_destino = $("select[name=colonia_destino]").val();
        var ciudad_destino = $("input[name=ciudad_destino]").val();
        var referencia_destino = $("input[name=referencia_destino]").val();


        $.ajax({

           type:'POST',

           url:'/post-data_envio_editar_destino',

           data:{nombre_destino:nombre_destino, 
                no_envio_destino:no_envio_destino,
                email_destino:email_destino,
                telefono_destino:telefono_destino,
                empresa_destino:empresa_destino,
                pais_destino:pais_destino,
                cp_destino:cp_destino,
                estado_destino:estado_destino,
                calle_destino:calle_destino,
                colonia_destino:colonia_destino,
                ciudad_destino:ciudad_destino,
                referencia_destino:referencia_destino},

            dataType: 'json',

           success:function(data){

            $.notify({message: 'Datos del destino actualizados correctamente.' },{ type: 'success' });

            //console.log(data);

            jQuery('#valortarifas').empty(); //vaciamos el tbody de la tabla de tarifas

            $.each(data.datos_tarifas, function(index, val) {

            var tipo_envio=val.IdTipoEnvio;
            var precio_final=val.Precio;
            var precio_costo_extra=val.costo_extra_kg;
            var peso_paquete=data.extraigo_envio_origen_creado[0].peso;

            if(tipo_envio<=4){
             precio_final_real=precio_final;
            }


            if(tipo_envio==5){
              if(peso_paquete<=5){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-5;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }


            if(tipo_envio==6){
              if(peso_paquete==1){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-1;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }

            var mostrartarifas=$('<tr>'+
                                '<td style="border-color:#F5DA81;text-align: center;padding-top: 40px;"><input name="tipo_tarifa" type="radio" id="radio_45'+val.IdPrecios+'" class="with-gap radio-col-deep-orange" value="'+val.IdPrecios+'" checked /><label for="radio_45'+val.IdPrecios+'"></label></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><img src="images/'+val.imagen+'.png" width="35%"></td>'+
                                '<td style="border-color:#F5DA81;">'+val.Descripcion+'</td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-orange">'+val.Dias+' Día(s)</span></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-blue">$'+precio_final_real+'.00</span></td>'+
                                '</tr>');

            $('#valortarifas').append(mostrartarifas);

            });


            $('#valor10').html(data.extraigo_envio_origen_creado[0].nombre_destino);
            $('#valor12').html(data.extraigo_envio_origen_creado[0].empresa_destino);
            $('#valor13').html(data.extraigo_envio_origen_creado[0].telefono_destino);
            $('#valor14').html(data.extraigo_envio_origen_creado[0].colonia_destino);
            $('#valor15').html(data.extraigo_envio_origen_creado[0].calle_destino);
            $('#valor16').html(data.extraigo_envio_origen_creado[0].ciudad_destino);
            $('#valor17').html(data.extraigo_envio_origen_creado[0].estado_destino);
            $('#valor18').html(data.extraigo_envio_origen_creado[0].cp_destino);
            $('#valor19').html(data.extraigo_envio_origen_creado[0].referencia_destino);

           }

        });

    });
    //fin datos destino









  //actualiar datos de las medidas
 $(".btn-submit-medidas").click(function(e){

        e.preventDefault();

        if($("#largo").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el largo del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#ancho").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el ancho del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#alto").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el alto del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#peso").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el peso del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#contenido").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca una descripción del contenido del paquete.' },{ type: 'danger' });
        return false;
        }

        $("#ocultarmedidas2").css("display", "none");
        $("#ocultarmedidas").css("display", "block");

        var largo = $("input[name=largo]").val();
        var ancho = $("input[name=ancho]").val();
        var alto = $("input[name=alto]").val();
        var peso = $("input[name=peso]").val();
        var contenido = $("input[name=contenido]").val();
        var tipo_paquete = $("select[name=tipo_paquete]").val();
        var no_envio_destino = $("input[name=no_envio_destino]").val();


        $.ajax({

           type:'POST',

           url:'/post-data_envio_editar_medidas',

           data:{largo:largo, 
                ancho:ancho,
                alto:alto,
                peso:peso,
                contenido:contenido,
                tipo_paquete:tipo_paquete,
                no_envio_destino:no_envio_destino},

            dataType: 'json',

           success:function(data){

            $.notify({message: 'Datos de las medidas del paquete actualizados correctamente.' },{ type: 'success' });

            //console.log(data);

            jQuery('#valortarifas').empty(); //vaciamos el tbody de la tabla de tarifas

            $.each(data.datos_tarifas, function(index, val) {

            var tipo_envio=val.IdTipoEnvio;
            var precio_final=val.Precio;
            var precio_costo_extra=val.costo_extra_kg;
            var peso_paquete=data.extraigo_envio_origen_creado[0].peso;

            if(tipo_envio<=4){
             precio_final_real=precio_final;
            }


            if(tipo_envio==5){
              if(peso_paquete<=5){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-5;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }


            if(tipo_envio==6){
              if(peso_paquete==1){
                precio_final_real=precio_final;
              }else{
                peso_total=peso_paquete-1;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
              }
            }

            var mostrartarifas=$('<tr>'+
                                '<td style="border-color:#F5DA81;text-align: center;padding-top: 40px;"><input name="tipo_tarifa" type="radio" id="radio_45'+val.IdPrecios+'" class="with-gap radio-col-deep-orange" value="'+val.IdPrecios+'" checked /><label for="radio_45'+val.IdPrecios+'"></label></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><img src="images/'+val.imagen+'.png" width="35%"></td>'+
                                '<td style="border-color:#F5DA81;">'+val.Descripcion+'</td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-orange">'+val.Dias+' Día(s)</span></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-blue">$'+precio_final_real+'.00</span></td>'+
                                '</tr>');

            $('#valortarifas').append(mostrartarifas);

            });

            $('#valor20').html(data.extraigo_envio_origen_creado[0].largo);
            $('#valor21').html(data.extraigo_envio_origen_creado[0].ancho);
            $('#valor22').html(data.extraigo_envio_origen_creado[0].alto);
            $('#valor23').html(data.extraigo_envio_origen_creado[0].peso);
            $('#valor24').html(data.extraigo_envio_origen_creado[0].contenido);
            if(data.extraigo_envio_origen_creado[0].tipo_paquete==1){
            data.extraigo_envio_origen_creado[0].tipo_paquete="Caja";
            $('#valor25').html(data.extraigo_envio_origen_creado[0].tipo_paquete);
            }else{
            data.extraigo_envio_origen_creado[0].tipo_paquete="Sobre convencional/clasico (29.7 x 5 x 21 cm, max. 0.5 kg)";
            $('#valor25').html(data.extraigo_envio_origen_creado[0].tipo_paquete);
            }

           }

        });

    });
    //fin datos medidas









 //cotizar paquete
 $(".btn-submit-cotizar").click(function(e){

        e.preventDefault();

        if($("#cp_origen_cotizar").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el código postal del origen.' },{ type: 'danger' });
        return false;
        }

        if($("#cp_destino_cotizar").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el código postal del destino.' },{ type: 'danger' });
        return false;
        }

        if($("#largo").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el largo del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#ancho").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el ancho del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#alto").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el alto del paquete.' },{ type: 'danger' });
        return false;
        }

        if($("#peso").val().length < 1) {
        //$.notify("Coloca tu nombre.", "danger");
        $.notify({message: 'Coloca el peso del paquete.' },{ type: 'danger' });
        return false;
        }


        var cp_origen_cotizar = $("input[name=cp_origen_cotizar]").val();
        var cp_destino_cotizar = $("input[name=cp_destino_cotizar]").val();
        var largo = $("input[name=largo]").val();
        var ancho = $("input[name=ancho]").val();
        var alto = $("input[name=alto]").val();
        var peso = $("input[name=peso]").val();
        var resultado = $("input[name=resultado]").val();


        $.ajax({

           type:'POST',

           url:'/datos_cotizados',

           data:{cp_origen_cotizar:cp_origen_cotizar,
                 cp_destino_cotizar:cp_destino_cotizar,
                 largo:largo, 
                 ancho:ancho,
                 alto:alto,
                 peso:peso,
                 resultado:resultado},

            dataType: 'json',

           success:function(data){

            $.notify({message: 'Paquete cotizado correctamente.' },{ type: 'success' });

            //console.log(data);

            jQuery('#valortarifas').empty(); //vaciamos el tbody de la tabla de tarifas

            $.each(data.datos_tarifas, function(index, val) {

            var tipo_envio=val.IdTipoEnvio;
            var precio_final=val.Precio;
            var precio_costo_extra=val.costo_extra_kg;
            var peso_paquete=data.peso_final;
            var dia_actual_recibido=data.dia_actual;

            if(tipo_envio<=4){
             precio_final_real=precio_final;

             if((dia_actual_recibido!="Sun") && (dia_actual_recibido!="Sat")){
              variable_mensaje="";  
             }else{
              variable_mensaje="(Para Entrega y Recolección el Lunes).";
             }
            }


            if(tipo_envio==5){
              if(peso_paquete<=5){
                precio_final_real=precio_final;
                variable_mensaje="";
              }else{
                peso_total=peso_paquete-5;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
                variable_mensaje="";
              }
            }


            if(tipo_envio==6){
              if(peso_paquete==1){
                precio_final_real=precio_final;
                variable_mensaje="";
              }else{
                peso_total=peso_paquete-1;
                precio_final_real=((peso_total*precio_costo_extra)+precio_final);
                variable_mensaje="";
              }
            }

            var mostrartarifas=$('<tr>'+
                                '<td style="border-color:#F5DA81;text-align: center;padding-top: 40px;"><input name="tipo_tarifa" type="radio" id="radio_45'+val.IdPrecios+'" class="with-gap radio-col-deep-orange" value="'+val.IdPrecios+'" checked /><label for="radio_45'+val.IdPrecios+'"></label></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><img src="images/'+val.imagen+'.png" width="35%"></td>'+
                                '<td style="border-color:#F5DA81;">'+val.Descripcion+' '+variable_mensaje+'</td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-orange">'+val.Dias+' Día(s)</span></td>'+
                                '<td style="border-color:#F5DA81;text-align: center;"><span class="label bg-blue">'+precio_final_real+'.00</span></td>'+
                                '</tr>');

            $('#valortarifas').append(mostrartarifas);

            });

           }

        });

    });
    //fin cotizar paquete



});



