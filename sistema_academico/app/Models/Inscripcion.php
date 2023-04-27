<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  Inscripcion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'idinscripcion',
        'codigo',
        'nombre',
        'direccion',
        'municipio',
        'departamento',
        'telefono',
        'nacimiento',
        'sexo',

        
    ];

}