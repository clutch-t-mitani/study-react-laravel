<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::get();
        return Inertia::render('Todos/Index', [
            'todos' => $todos,
            'message' => session('message')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|max:20',
            'category_id' => 'required|regex:/^[0-9]+$/',
        ], [], [
            'name' => 'TODO',
            'category_id' => 'カテゴリー',
        ]);

        Todo::create($request->input());

        return redirect('todos')->with([
            'message' => '登録しました',
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param $id
     */
    // public function update(Request $request,  int $id)
    // {
    //     $book = Book::find($id);
    //     $book->fill($request->input())->saveOrFail();

    //     return redirect('books')->with([
    //         'message' => '更新しました',
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     * @param $id
     */
    // public function destroy(int $id)
    // {
    //     $book = Book::find($id);
    //     $book->delete();

    //     return redirect('books')->with([
    //         'message' => '削除しました',
    //     ]);
    // }
}
