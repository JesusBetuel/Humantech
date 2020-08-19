//$(".hideall").hide();
$(document).ready(function() {
    $("#alltiendas").hide();
    $("#btntienda").hide();
    $("#tiendaurls").hide();
    $("#tiendaurlw").hide();
    $("#btntiendag").hide();
});

function mostrartiendas(){
    document.getElementById('alltiendas').style.display="block";
    document.getElementById('btntienda').style.display="block";
}

function ocutartiendas(){
     document.getElementById('alltiendas').style.display="none";
     document.getElementById('btntienda').style.display="none";
     document.getElementById('btntiendag').style.display="none";
    document.getElementById('tiendaurls').style.display="none";
    document.getElementById('tiendaurlw').style.display="none";
}

function shopifyurl(){
     document.getElementById('tiendaurls').style.display="block";
     document.getElementById('btntiendag').style.display="block";
     document.getElementById('tiendaurlw').style.display="none";
       
}

function woocommerceurl(){
     document.getElementById('tiendaurlw').style.display="block";
     document.getElementById('btntiendag').style.display="block";
     document.getElementById('tiendaurls').style.display="none";
     
}

function guardatiendas(){
    
    var urltienda = $("#urldetienda").val();
    alert("Tienda " + urltienda + " Guardada exitosamente");
    document.getElementById('tiendaurls').style.display="none";
    document.getElementById('tiendaurlw').style.display="none";
    document.getElementById('btntiendag').style.display="none";
}

