<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;

class editar_peliculas_humantech extends Controller
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


    public function editarpeliculas()
    {

        $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];

        DB::beginTransaction();

        $obtenemos_data_id_pelicula = Crypt::decrypt($_GET["data-pelicula"]);

        try {
        DB::commit();

        $datos_peliculas = DB::table('peliculas')
                        ->select('Id', 'nombre', 'fecha_publicacion', 'imagen', 'turno', 'Activo')
                        ->where('Id', $obtenemos_data_id_pelicula)
                        ->get();

        $datos_turnos = DB::table('turnos')
                        ->select('Id', 'hora_turno', 'Activo')
                        ->get();

        if(empty($datos_peliculas)){
        
        return view("tabla_peliculas_humantech");
       
        }else{
        
        return view("editar_pelicula", compact('datos_peliculas', 'datos_turnos'));

        }

        } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se puede visualizar la información.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
        }

    }
}
