<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //SELECT * FROM ALLUMNOS
        return docente::get();
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
        //insert into docentes..
        Docente::create($request->all());
        return response()->json(['msg'=>'ok'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Docente $docente)
    {
        //select * form docentes where idDocente=?
        return $docente;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Docente $docente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Docente $docente)
    {
        //update docentes set ? where id=?
        $docente::where('idDocente',$request['idDocente'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
            'direccion'=>$request['direccion'],
            'municipio'=>$request['municipio'],
            'departamento'=>$request['departamento'],
            'telefono'=>$request['telefono'],
            'nacimiento'=>$request['nacimiento'],
            'sexo'=>$request['sexo'],
        ]);
        //$docente->update($request->all(), $request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Docente $docente)
    {
        //delete docentes from docentes where id=?
        //$docente->delete();
        $docente::where('idDocente', $request['idDocente'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
