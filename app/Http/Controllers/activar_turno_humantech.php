<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;


class activar_turno_humantech extends Controller
{

	/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        // $this->middleware('auth');
    }

    /**
     * Show the application Datos Fiscales.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
	public function borrarturnoactivar (Request $request)
	{

	    $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];


        $ClienteId = Auth::user()->id;

        DB::beginTransaction();

        $obtenemos_data_id_turno = Crypt::decrypt($_GET["data-turno"]);


	    try {
                DB::commit();

               DB::table('turnos')->where('Id', $obtenemos_data_id_turno)->update(['Activo' =>1]);


                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "El turno se activo correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se pudo activar el turno.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
