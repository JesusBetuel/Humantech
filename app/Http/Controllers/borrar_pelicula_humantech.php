<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;


class borrar_pelicula_humantech extends Controller
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
    
	public function borrarpelicula (Request $request)
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

               DB::table('peliculas')->where('Id', $obtenemos_data_id_pelicula)->update(['Activo' =>0]);


                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "La pelicula se cancelo correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se pudo cancelar la pelicula.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
