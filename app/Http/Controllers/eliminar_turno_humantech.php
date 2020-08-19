<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;


class eliminar_turno_humantech extends Controller
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
    
	public function eliminar_turno (Request $request)
	{

	    $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];


        DB::beginTransaction();

        $obtenemos_data_id_turno = Crypt::decrypt($_GET["data-turno"]);


	    try {
                DB::commit();

                DB::table('turnos')->where('Id', $obtenemos_data_id_turno)->delete();


                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "El turno se elimino correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se pudo eliminar el turno.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
