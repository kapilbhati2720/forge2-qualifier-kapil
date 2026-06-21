<?php
namespace App\Http\Controllers;
use App\Models\Member;
use Illuminate\Http\Request;
class MemberController extends Controller {
    public function index() { return response()->json(Member::all()); }
    public function store(Request $r) { return response()->json(Member::create($r->all()),201); }
    public function update(Request $r, Member $member) { $member->update($r->all()); return response()->json($member); }
    public function destroy(Member $member) { $member->delete(); return response()->json(null,204); }
}