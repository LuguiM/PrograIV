<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //SELECT * FROM ALLUMNOS
        return alumno::get();
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
        //insert into alumnos..
        Alumno::create($request->all());
        return response()->json(['msg'=>'ok'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Alumno $alumno)
    {
        //select * form alumnos where idAlumno=?
        return $alumno;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumno $alumno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alumno $alumno)
    {
        //update alumnos set ? where id=?
        $alumno->update($request->all(), $request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alumno $alumno)
    {
        //delete alumnos from alumnos where id=?
        $alumno->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
