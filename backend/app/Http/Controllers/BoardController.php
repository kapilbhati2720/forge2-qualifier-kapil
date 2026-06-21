<?php
namespace App\Http\Controllers;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BoardController extends Controller {
    public function index() { return response()->json(Board::all()); }
    public function store(Request $r) {
        $board = Board::create(['name'=>$r->name,'slug'=>Str::slug($r->name),'color'=>$r->color??'#0079BF']);
        return response()->json($board,201);
    }
    public function show(Board $board) { return response()->json($board); }
    public function update(Request $r, Board $board) { $board->update($r->all()); return response()->json($board); }
    public function destroy(Board $board) { $board->delete(); return response()->json(null,204); }
}