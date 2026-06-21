<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class BoardList extends Model {
    protected $table = 'lists';
    protected $fillable = ['board_id','title','order_index'];
    public function cards() { return $this->hasMany(Card::class,'list_id'); }
}