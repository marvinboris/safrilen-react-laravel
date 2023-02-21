<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model
{
    use HasFactory, Sluggable;
    
    protected $table = 'products';

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'stringified'
            ]
        ];
    }

    protected $fillable = [
        'name', 'description', 'price', 'photo', 'slug', 'is_active',
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    protected $directory = '/images/products/';

    public function getNameAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getDescriptionAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getStringifiedAttribute()
    {
        return $this->name[env('VITE_DEFAULT_LANG', 'fr')];
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getLinkAttribute()
    {
        return '/products/' . $this->slug;
    }
}
