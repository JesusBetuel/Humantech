<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use DB;
use Throwable;


class actualizar_pelicula_humantech extends Controller
{

	/**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
         $this->middleware('auth');
    }

    /**
     * Show the application Datos Fiscales.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
	public function actualizarpelicula (Request $request)
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

	    try {
               DB::commit();

               DB::table('peliculas')->where('Id', $request->id_pelicula)->update(['nombre' =>$request->nombre, 'fecha_publicacion' =>$request->fecha_publicacion, 'imagen' =>$nombre, 'turno' =>$request->turno]);


                $Status["Status"] = "Ok";
                $Status["Mensaje"] = "La pelicula se actualizo correctamente.";
                $Status["Color"] = "alert-success";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            } catch (Throwable $e) {
                DB::rollback();
                $Status["Mensaje"] = "Error, no se pudo actualizar la pelicula.";
                $Status["Color"] = "alert-danger";
                return redirect('tabla_peliculas_humantech')->with('DatosFiscalesStatus', $Status);
            }

    }

}
