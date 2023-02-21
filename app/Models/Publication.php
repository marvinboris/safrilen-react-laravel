<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Publication extends Model
{
    use HasFactory, Sluggable;

    protected $table = 'publications';

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'stringified'
            ]
        ];
    }

    protected $directory = '/images/publications/';

    protected $fillable = [
        'title', 'description', 'body', 'photo', 'slug', 'is_active',
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getDescriptionAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getBodyAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getStringifiedAttribute()
    {
        return $this->title[env('VITE_DEFAULT_LANG', 'fr')];
    }

    public function author()
    {
        return $this->morphTo();
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getLinkAttribute()
    {
        return '/blog/' . $this->slug;
    }
}
