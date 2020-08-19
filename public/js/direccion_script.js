$(document).ready(function(){
    var url = window.location.pathname.split("/");

    $("#menu_lateral>li.active").removeClass("active");

    switch(url[1]){
        case "home":
            $("#dashboard_menu").addClass("active");
            showAvisos();
        break;
        case "envios":
            $("#envios_menu").addClass("active");
        break;
        case "cotizar":
            $("#cotizar_menu").addClass("active");
        break;
        case "direcciones":
            $("#direccion_menu").addClass("active");
        break;   
        case "transacciones":
            $("#transacciones_menu").addClass("active");
        break;
        case "tiendas":
            $("#tiendas_menu").addClass("active");
        break;
        case "Creditos":
            $("#creditos_menu").addClass("active");
        break;
        case "DatosFiscales":
            $("#datosf_menu").addClass("active");
        break;   
        case "Soporte":
            $("#soporte_menu").addClass("active");
        break;
        case "Avisos":
            $("#avisos_menu").addClass("active");
        break;
        case "referidos":
            $("#referidos_menu").addClass("active");
        break;
        case "admin":
            $("#admin_menu").addClass("active");
        break;
        case "CuentasBancarias":
            $("#admin_menu").addClass("active");
            $("#ul-admin-menu").show();
            $("#cuentasb_admin").addClass("active");
            $("#cuentasb_admin").find("a").addClass("toggled");
        break;
        case "AdminAvisos":
            $("#admin_menu").addClass("active");
            $("#ul-admin-menu").show();
            $("#avisos_admin").addClass("active");
            $("#avisos_admin").find("a").addClass("toggled");
        break;
    }

});
