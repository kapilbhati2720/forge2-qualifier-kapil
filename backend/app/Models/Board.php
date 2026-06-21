<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Board extends Model {
    protected $fillable = ['name','slug','color'];
    public function lists() { return $this->hasMany(BoardList::class,'board_id'); }
}