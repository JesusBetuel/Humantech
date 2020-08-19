<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SoporteEmail extends Mailable{
    use Queueable, SerializesModels;

    /**
     * The Soporte object instance.
     *
     * @var Soporte
     */
    public $Soporte;
 
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($Soporte){
        $this->Soporte = $Soporte;
    }
 
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(){
        return $this->from($this->Soporte->Email)
                    ->subject('Contacto ' . str_replace('http://', '', str_replace('https://', '', \URL::to('/'))) . '  - ' . $this->Soporte->Nombre)
                    ->view('Soporte.SoporteEmail');
                    // ->with(
                    //   [
                    //         'testVarOne' => '1',
                    //         'testVarTwo' => '2',
                    //   ])
                      // ->attach(public_path('/images').'/thumbs-up.png', [
                      //         'as' => 'demo.jpg',
                      //         'mime' => 'image/png',
                      // ]);
    }

}
