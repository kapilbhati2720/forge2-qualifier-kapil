<?php
namespace App\Http\Controllers;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller {
    public function index($listId) { return response()->json(Card::where('list_id',$listId)->with(['tags','members'])->orderBy('position')->get()); }
    public function store(Request $r, $listId) {
        $card = Card::create(['list_id'=>$listId,'title'=>$r->title,'description'=>$r->description,'position'=>$r->position??0,'due_date'=>$r->due_date]);
        return response()->json($card,201);
    }
    public function update(Request $r, $listId, Card $card) { $card->update($r->all()); return response()->json($card); }
    public function destroy($listId, Card $card) { $card->delete(); return response()->json(null,204); }
    public function move(Request $r, Card $card) { $card->update(['list_id'=>$r->list_id]); return response()->json($card); }
    public function attachTag(Card $card, $tagId) { $card->tags()->syncWithoutDetaching([$tagId]); return response()->json($card->load('tags')); }
    public function detachTag(Card $card, $tagId) { $card->tags()->detach($tagId); return response()->json($card->load('tags')); }
    public function attachMember(Card $card, $memberId) { $card->members()->syncWithoutDetaching([$memberId]); return response()->json($card->load('members')); }
    public function detachMember(Card $card, $memberId) { $card->members()->detach($memberId); return response()->json($card->load('members')); }
}