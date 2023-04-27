<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //SELECT * FROM INSCRICION
        return inscripcion::get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //insert into inscripcions..
        Inscripcion::create($request->all());
        return response()->json(['msg'=>'ok'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inscripcion $inscripcion)
    {
        //select * form inscripcions where idInscripcion=?
        return $inscripcion;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inscripcion $inscripcion)
    {
        //update inscripcions set ? where id=?
        $inscripcion::where('idinscripcion',$request['idinscripcion'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
            'direccion'=>$request['direccion'],
            'municipio'=>$request['municipio'],
            'departamento'=>$request['departamento'],
            'telefono'=>$request['telefono'],
            'nacimiento'=>$request['nacimiento'],
            'sexo'=>$request['sexo'],
        ]);
        //$inscripcion->update($request->all(), $request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Inscripcion $inscripcion)
    {
        //delete inscripcions from inscripcions where id=?
        //$inscripcion->delete();
        $inscripcion::where('idinscripcion', $request['idinscripcion'])->delete();

        return response()->json(['msg'=>'ok'], 200);
    }
}
