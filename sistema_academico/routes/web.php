<?php

use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\IncripcionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*Route::apiResources([
    'alumnos'=>AlumnoController::Class,
]);*/

Route::controller(AlumnoController::class)->group(function(){
    Route::get('/alumnos','index');
    Route::post('/alumnos','store');
    Route::put('/alumnos','update');
    Route::delete('/alumnos','destroy');
});

Route::controller(DocenteController::class)->group(function(){
    Route::get('/docentes','index');
    Route::post('/docentes','store');
    Route::put('/docentes','update');
    Route::delete('/docentes','destroy');
});

Route::controller(MateriaController::class)->group(function(){
    Route::get('/materias','index');
    Route::post('/materias','store');
    Route::put('/materias','update');
    Route::delete('/materias','destroy');
});

Route::controller(MatriculaController::class)->group(function(){
    Route::get('/matriculas','index');
    Route::post('/matriculas','store');
    Route::put('/matriculas','update');
    Route::delete('/matriculas','destroy');
});
Route::controller(IncripcionController::class)->group(function(){
    Route::get('/inscripcion','index');
    Route::post('/inscripcion','store');
    Route::put('/inscripcion','update');
    Route::delete('/inscrpcion','destroy');
});


Route::get('/', function () {
    return view('welcome');
});

Route::get('/alumno/{nombre}/{edad}', function($nombre='', $edad=0){
    $msg = $edad>=18 ? 'Eres un adulto resposanble' : 'Aun no tienes compromisos';
    return 'Hola, desde una ruta en laravel... '. $nombre. ' Msg: '. $msg;
})->where(['edad'=>'^[0-9]{1,3}', 'nombre'=>'^[a-zA-Z]{3,85}']);
