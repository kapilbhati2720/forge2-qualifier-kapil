<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;

Route::apiResource('boards', BoardController::class);
Route::get('boards/{boardId}/lists', [ListController::class,'index']);
Route::post('boards/{boardId}/lists', [ListController::class,'store']);
Route::put('boards/{boardId}/lists/{list}', [ListController::class,'update']);
Route::delete('boards/{boardId}/lists/{list}', [ListController::class,'destroy']);
Route::get('lists/{listId}/cards', [CardController::class,'index']);
Route::post('lists/{listId}/cards', [CardController::class,'store']);
Route::put('lists/{listId}/cards/{card}', [CardController::class,'update']);
Route::delete('lists/{listId}/cards/{card}', [CardController::class,'destroy']);
Route::patch('cards/{card}/move', [CardController::class,'move']);
Route::post('cards/{card}/tags/{tagId}', [CardController::class,'attachTag']);
Route::delete('cards/{card}/tags/{tagId}', [CardController::class,'detachTag']);
Route::post('cards/{card}/members/{memberId}', [CardController::class,'attachMember']);
Route::delete('cards/{card}/members/{memberId}', [CardController::class,'detachMember']);
Route::apiResource('tags', TagController::class);
Route::apiResource('members', MemberController::class);