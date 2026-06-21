<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Card extends Model {
    protected $fillable = ['list_id','title','description','position','due_date'];
    public function tags() { return $this->belongsToMany(Tag::class,'card_tag'); }
    public function members() { return $this->belongsToMany(Member::class,'card_member'); }
}