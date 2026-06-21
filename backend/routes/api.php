<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;

Route::apiResource('boards', BoardController::class);
Route::apiResource('boards.lists', ListController::class);
Route::apiResource('lists.cards', CardController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('members', MemberController::class);

Route::post('cards/{card}/tags/{tag}', [CardController::class, 'attachTag']);
Route::delete('cards/{card}/tags/{tag}', [CardController::class, 'detachTag']);
Route::post('cards/{card}/members/{member}', [CardController::class, 'attachMember']);
Route::delete('cards/{card}/members/{member}', [CardController::class, 'detachMember']);
Route::patch('cards/{card}/move', [CardController::class, 'move']);