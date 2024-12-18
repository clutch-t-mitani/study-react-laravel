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

        $book = new Books($request->input());
        $book->save();

        return redirect('books')->with([
            'message' => '登録しました',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Books $book)
    {
        $book->fill($request->input())->saveOrFail();

        return redirect('books')->with([
            'message' => '更新しました',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Books $book)
    {
        $book->delete();

        return redirect('books')->with([
            'message' => '削除しました',
        ]);
    }
}