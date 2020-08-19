<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use Throwable;

class datos_tabla_turnos_humantech extends Controller
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


    public function turnos_creados()
    {

        $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];

        DB::beginTransaction();

        try {
        DB::commit();

        $datos_paquetes = DB::table('turnos')
                        ->select('Id', 'hora_turno', 'Activo')
                        ->get();

        if(empty($datos_paquetes)){
        
        return view("tabla_turnos_humantech");
       
        }else{
        
        return view("tabla_turnos_humantech", compact('datos_paquetes'));

        }

        } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se puede visualizar la información.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
        }

    }
}
