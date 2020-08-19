<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewMessage;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('welcome'); });

Auth::routes(['verify' => true]);

//Rutas de menú lateral
Route::get('/home', 'HomeController@index')->name('home')->middleware('verified');

Route::get('/tabla_turnos_humantech', 'datos_tabla_turnos_humantech@turnos_creados')->name('tabla_turnos_humantech')->middleware('verified');
Route::get('/borrar_turnos_desactivar','borrar_turno_humantech@borrarturno')->name('borrar_turnos_desactivar')->middleware('verified');
Route::get('/borrar_turnos_activar','activar_turno_humantech@borrarturnoactivar')->name('borrar_turnos_activar')->middleware('verified');
Route::get('/eliminar_turnos','eliminar_turno_humantech@eliminar_turno')->name('eliminar_turnos')->middleware('verified');
Route::get('/crear_turno', 'crear_turno_humantech@index')->name('crear_turno')->middleware('verified');
Route::post('/guardar_turno','guardar_turno_humantech@guardarturnos')->name('guardar_turno')->middleware('verified');
Route::get('/editar_turno','editar_turnos_humantech@editarturnos')->name('editar_turno')->middleware('verified');
Route::post('/actualizar_turno','actualizar_turno_humantech@actualizarturno')->name('actualizar_turno')->middleware('verified');
Route::get('/tabla_peliculas_humantech', 'datos_tabla_peliculas_humantech@peliculas_creados')->name('tabla_peliculas_humantech')->middleware('verified');
Route::get('/crear_pelicula', 'crear_pelicula_humantech@index')->name('crear_pelicula')->middleware('verified');
Route::post('/guardar_pelicula','guardar_pelicula_humantech@guardarpeliculas')->name('guardar_pelicula')->middleware('verified');
Route::get('/borrar_pelicula_desactivar','borrar_pelicula_humantech@borrarpelicula')->name('borrar_pelicula_desactivar')->middleware('verified');
Route::get('/borrar_pelicula_activar','activar_pelicula_humantech@borrarpeliculaactivar')->name('borrar_pelicula_activar')->middleware('verified');
Route::get('/eliminar_peliculas','eliminar_pelicula_humantech@eliminar_pelicula')->name('eliminar_peliculas')->middleware('verified');
Route::get('/editar_pelicula','editar_peliculas_humantech@editarpeliculas')->name('editar_pelicula')->middleware('verified');
Route::post('/actualizar_pelicula','actualizar_pelicula_humantech@actualizarpelicula')->name('actualizar_pelicula')->middleware('verified');


