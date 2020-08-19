<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;

class editar_turnos_humantech extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */


    public function editarturnos()
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

        $datos_turnos = DB::table('turnos')
                        ->select('Id', 'hora_turno', 'Activo')
                        ->where('Id', $obtenemos_data_id_turno)
                        ->get();

        $status_turno["Activo"]= $datos_turnos[0]->Activo;

        if(empty($datos_turnos)){
        
        return view("tabla_turnos_humantech");
       
        }else{
        
        return view("editar_turno", compact('datos_turnos'), array('Activo' => $status_turno["Activo"]));

        }

        } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se puede visualizar la información.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
        }

    }
}
