@extends('layouts._layout')

@section('content')

{{-- {{ Auth::user() }} --}}

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>EDITAR TURNO</h2>
                        </div>
                        <div class="body demo-masked-input">
                            <form name="wizard_with_validation" id="wizard_with_validation" action="{{ route('actualizar_turno') }}" method="POST">
                            {{ csrf_field() }}
                                <h3>Datos del Turno</h3>
                                <fieldset>
                                @foreach ($datos_turnos as $datos_turnos)
                                    <div class="form-group form-float">
                                        <div class="form-line"><br>
                                            <input type="time" class="form-control" name="hora_turno" id="hora_turno" value="{{ $datos_turnos->hora_turno }}" required>
                                            <input type="hidden" class="form-control" name="id_turno" id="id_turno" value="{{ $datos_turnos->Id }}" required>
                                            <label class="form-label">Ajustar la hora del turno: *</label>
                                        </div>
                                    </div><br>

                                    <div class="form-group form-float">
                                    <div class="form-line"><br>
                                    <select class="form-control" name="estatus_turno" id="estatus_turno" required>
                                    @switch($Activo)
                                    @case(1)
                                        <option value="1">Si</option>
                                        <option value="0">No</option>
                                    @break
                                    @case(0)
                                        <option value="0">No</option>
                                        <option value="1">Si</option>
                                    @break
                                    @endswitch
                                    </select>
                                    <label class="form-label">Activo?:</label>
                                    </div>
                                    </div>
                                @endforeach

                                    <button type="submit" name="boton_tarifa" id="boton_tarifa" style="position: relative; float: right;" class="btn  m-t-12 bg-orange"> {{ __('Actualizar Turno') }} </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Advanced Form Example With Validation -->

    @endsection