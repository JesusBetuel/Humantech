@extends('layouts._layout')

@section('content')

{{-- {{ Auth::user() }} --}}

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>CREACIÓN DE TURNOS</h2>
                        </div>
                        <div class="body demo-masked-input">
                            <form name="wizard_with_validation" id="wizard_with_validation" action="{{ route('guardar_turno') }}" method="POST">
                            {{ csrf_field() }}
                                <h3>Datos del Turno</h3>
                                <fieldset>

                                    <div class="form-group form-float">
                                        <div class="form-line"><br>
                                            <input type="time" class="form-control" name="hora_turno" id="hora_turno" required>
                                            <label class="form-label">Coloca la hora del turno: *</label>
                                        </div>
                                    </div><br>

                                    <div class="form-group form-float">
                                    <div class="form-line"><br>
                                    <select class="form-control" name="estatus_turno" id="estatus_turno" required>
                                        <option value="1">Si</option>
                                        <option value="2">No</option>
                                    </select>
                                    <label class="form-label">Activo?:</label>
                                    </div>
                                    </div>

                                    <button type="submit" name="boton_tarifa" id="boton_tarifa" style="position: relative; float: right;" class="btn  m-t-12 bg-orange"> {{ __('Guardar Turno') }} </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Advanced Form Example With Validation -->

    @endsection