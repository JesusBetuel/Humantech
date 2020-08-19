<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use Throwable;


class guardar_pelicula_humantech extends Controller
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
    
    public function guardarpeliculas (Request $request)
    {

        $Status = [
            "Status" => "Error",
            "Mensaje" => "",
            "Color" => "",
            "Tiempo" => 3000
        ];

        $image = $request->file('imagen');
        $image->move('uploads', $image->getClientOriginalName());
        $nombre = $image->getClientOriginalName();


        DB::beginTransaction();

            $data_peliculas =  [

                        'nombre'             => $request->nombre,
                        'fecha_publicacion'  => $request->fecha_publicacion,
                        'imagen'             => $nombre,
                        'turno'              => $request->turno
                    ];


        try {
                DB::table('peliculas')->insert($data_peliculas);
                
                DB::commit();

                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "Los datos de la pelicula se guardarón correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se guardo la pelicula.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
