<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use Throwable;


class guardar_turno_humantech extends Controller
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
    
    public function guardarturnos (Request $request)
    {

        $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];

        DB::beginTransaction();

            $data_turnos =  [

                        'hora_turno'        => $request->hora_turno,
                        'Activo'            => $request->estatus_turno
                    ];


        try {
                DB::table('turnos')->insert($data_turnos);
                
                DB::commit();

                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "Los datos del turno se guardarón correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se guardo el turno.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_turnos_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
