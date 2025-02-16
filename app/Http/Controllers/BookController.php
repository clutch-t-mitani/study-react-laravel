<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Books;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::get();
        return Inertia::render('Books/Index', [
            'books' => $books,
            'message' => session('message')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:20',
            'content' => 'required|max:100',
            'category' => 'required|max:10',
        ]);

        Book::create($request->input());

        return redirect('books')->with([
            'message' => '登録しました',
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param $id
     */
    public function update(Request $request,  int $id)
    {
        $book = Book::find($id);
        $book->fill($request->input())->saveOrFail();

        return redirect('books')->with([
            'message' => '更新しました',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     */
    public function destroy(int $id)
    {
        $book = Book::find($id);
        $book->delete();

        return redirect('books')->with([
            'message' => '削除しました',
        ]);
    }
}
