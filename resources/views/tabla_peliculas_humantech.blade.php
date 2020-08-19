@extends('layouts._layout')

@section('content')

            <div class="row clearfix">
                {{ csrf_field() }}

                @if(session('DatosFiscalesStatus'))
                <input type="hidden" name="DatosFiscalesStatus" id="DatosFiscalesStatus" value="{{Session::get('DatosFiscalesStatus')['Mensaje']}}" data-placement-from="top" data-placement-align="right" data-animate-enter="animated bounceIn" data-animate-exit="animated bounceOut" data-color-name="{{Session::get('DatosFiscalesStatus')['Color']}}" >
                @endif
               

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>PELICULAS &nbsp; 

                            <a href="{{ route('crear_pelicula')}}"> 
                            <button type="button" class="btn  m-t-12 bg-orange"> {{ __('Crear') }} </button>
                            </a>
                        </div>
                        <div class="body demo-masked-input">
                 </div>
               </div>
             </div>
            </div>
            <!-- #END# Advanced Form Example With Validation -->

            <!-- Exportable Table -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                DETALLE DE PELICULAS
                            </h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>F. Publicación</th>
                                            <th>Turno</th>
                                            <th>Imagen</th>
                                            <th>Estatus</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    @foreach ($datos_paquetes as $datos_paquetes)
                                        <tr id="ocultarpaquete">
                                            <td>{{ $datos_paquetes->Id }}</td>
                                            <td>{{ $datos_paquetes->nombre }}</td>
                                            <td>{{ $datos_paquetes->fecha_publicacion }}</td>
                                            <td>{{ $datos_paquetes->turno }}</td>
                                            <td style="text-align: center;width:100px;"><img src="{{ asset('uploads/'.$datos_paquetes->imagen) }}" width="50%"></td>
                                            @php
                                            if($datos_paquetes->Activo==1){
                                            @endphp
                                            <td>Activo</td>
                                            <td><a href="http://127.0.0.1:8000/editar_pelicula?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}"><button type="button" data-type="edit" class="btn bg-blue btn-xs waves-effect">Editar</button></a>&nbsp;&nbsp;<a href="http://127.0.0.1:8000/borrar_pelicula_desactivar?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}" onclick="return confirm('¿Deseas cancelar la pelicula?')"><button type="button" class="btn bg-orange btn-xs waves-effect" data-toggle="tooltip" style="position: relative;" data-placement="top" title="Si cancela la pelicula, no podra utilizarla.">Desactivar</button></a>&nbsp;&nbsp;<a href="http://127.0.0.1:8000/eliminar_peliculas?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}" onclick="return confirm('¿Deseas eliminar la pelicula?')"><button type="button" class="btn bg-red btn-xs waves-effect" data-toggle="tooltip" style="position: relative;" data-placement="top" title="Si elimina la pelicula, no podra utilizarla.">Eliminar</button></a></td>
                                             @php
                                            }else{
                                            @endphp
                                            <td>Inactivo</td>
                                            <td><a href="http://127.0.0.1:8000/editar_pelicula?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}"><button type="button" data-type="edit" class="btn bg-blue btn-xs waves-effect">Editar</button></a>&nbsp;&nbsp;<a href="http://127.0.0.1:8000/borrar_pelicula_activar?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}" onclick="return confirm('¿Deseas activar la pelicula?')"><button type="button" class="btn bg-green btn-xs waves-effect" data-toggle="tooltip" style="position: relative;" data-placement="top" title="Activar la pelicula para poder utilizarla.">Activar</button></a>&nbsp;&nbsp;<a href="http://127.0.0.1:8000/eliminar_peliculas?data-pelicula={{\Crypt::encrypt($datos_paquetes->Id)}}" onclick="return confirm('¿Deseas eliminar la pelicula?')"><button type="button" class="btn bg-red btn-xs waves-effect" data-toggle="tooltip" style="position: relative;" data-placement="top" title="Si elimina la pelicula, no podra utilizarla.">Eliminar</button></a></td>
                                            @php
                                            }
                                            @endphp
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Exportable Table -->

@endsection