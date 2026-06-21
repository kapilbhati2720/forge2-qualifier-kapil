<?php
namespace App\Http\Controllers;
use App\Models\BoardList;
use Illuminate\Http\Request;

class ListController extends Controller {
    public function index($boardId) { return response()->json(BoardList::where('board_id',$boardId)->orderBy('order_index')->get()); }
    public function store(Request $r, $boardId) {
        $list = BoardList::create(['board_id'=>$boardId,'title'=>$r->title,'order_index'=>$r->order_index??0]);
        return response()->json($list,201);
    }
    public function update(Request $r, $boardId, BoardList $list) { $list->update($r->all()); return response()->json($list); }
    public function destroy($boardId, BoardList $list) { $list->delete(); return response()->json(null,204); }
}