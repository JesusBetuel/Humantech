<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use Throwable;

class crear_pelicula_humantech extends Controller{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index(){

        DB::beginTransaction();

        try {
        DB::commit();

        $datos_turnos = DB::table('turnos')
                        ->select('Id', 'hora_turno', 'Activo')
                        ->where('Activo', 1)
                        ->get();

        if(empty($datos_turnos)){
        
        return view("tabla_peliculas_humantech");
       
        }else{
        
        return view("crear_pelicula", compact('datos_turnos'));

        }

        } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se puede visualizar la información.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
        }
    }

}