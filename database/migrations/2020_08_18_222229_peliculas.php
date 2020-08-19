<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Peliculas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //creamos la tabla
        Schema::create('peliculas', function (Blueprint $table) {
        // código para definir esta tabla
        $table->increments('Id');
        $table->string('nombre',100)->nullable();
        $table->date('fecha_publicacion')->nullable();
        $table->string('imagen',100)->nullable();
        $table->string('turno',20)->nullable();
        $table->integer('Activo')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('peliculas');
    }
}
