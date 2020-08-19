@extends('layouts._layout')

@section('content')

{{-- {{ Auth::user() }} --}}

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>CREACIÓN DE PELICULAS</h2>
                        </div>
                        <div class="body demo-masked-input">
                            <form name="wizard_with_validation" id="wizard_with_validation" action="{{ route('guardar_pelicula') }}" enctype="multipart/form-data" method="POST">
                            {{ csrf_field() }}
                                <h3>Datos de la Pelicula</h3>
                                <fieldset>

                                    <div class="form-group form-float">
                                        <div class="form-line"><br>
                                            <input type="text" class="form-control" name="nombre" id="nombre" required>
                                            <label class="form-label">Coloca el nombre de la pelicula: *</label>
                                        </div>
                                    </div><br>

                                    <div class="form-group form-float">
                                        <div class="form-line"><br>
                                            <input type="date" class="form-control" name="fecha_publicacion" id="fecha_publicacion" required>
                                            <label class="form-label">Selecciona la fecha de publicación: *</label>
                                        </div>
                                    </div><br>

                                    <div class="form-group form-float">
                                        <div class="form-line"><br>
                                            <input type="file" accept="image/*" class="form-control" name="imagen" id="imagen" required>
                                            <label class="form-label">Selecciona una imagen: *</label>
                                        </div>
                                    </div><br>

                                    <div class="form-group form-float">
                                    <div class="form-line"><br>
                                    <select class="form-control" name="turno" id="turno" required>
                                        <option value=""></option>
                                        @foreach ($datos_turnos as $datos_turnos)
                                        <option value="{{ $datos_turnos->hora_turno }}">{{ $datos_turnos->hora_turno }}</option>
                                        @endforeach
                                    </select>
                                    <label class="form-label">Selecciona el turno:</label>
                                    </div>
                                    </div>

                                    <button type="submit" name="boton_tarifa" id="boton_tarifa" style="position: relative; float: right;" class="btn  m-t-12 bg-orange"> {{ __('Guardar Pelicula') }} </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Advanced Form Example With Validation -->

    @endsection