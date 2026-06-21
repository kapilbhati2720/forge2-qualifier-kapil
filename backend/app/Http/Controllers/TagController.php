<?php
namespace App\Http\Controllers;
use App\Models\Tag;
use Illuminate\Http\Request;
class TagController extends Controller {
    public function index() { return response()->json(Tag::all()); }
    public function store(Request $r) { return response()->json(Tag::create($r->all()),201); }
    public function update(Request $r, Tag $tag) { $tag->update($r->all()); return response()->json($tag); }
    public function destroy(Tag $tag) { $tag->delete(); return response()->json(null,204); }
}