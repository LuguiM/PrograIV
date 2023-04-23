<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //SELECT * FROM ALLUMNOS
        return matricula::get();
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
        //insert into matriculas..
        Matricula::create($request->all());
        return response()->json(['msg'=>'ok'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Matricula $matricula)
    {
        //select * form matriculas where idMatricula=?
        return $matricula;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Matricula $matricula)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Matricula $matricula)
    {
        //update matriculas set ? where id=?
        $matricula::where('idMatricula',$request['idMatricula'])->update([
            'nombre'=>$request['nombre'],
            'fecha'=>$request['fecha'],
            'comprobante'=>$request['comprobante'],
            'pago'=>$request['pago'],
        ]);
        //$matricula->update($request->all(), $request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Matricula $matricula)
    {
        //delete matriculas from matriculas where id=?
        //$matricula->delete();
        $matricula::where('idMatricula', $request['idMatricula'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
