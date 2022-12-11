<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Admin extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $table = 'admins';

    protected $directory = '/images/admins/';

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'photo', 'language_id',
    ];

    protected $hidden = [
        'password',
    ];

    public static function personalAccessToken()
    {
        return 'Admin Personal Access Token';
    }

    public static function type()
    {
        return 'admin';
    }

    public function getPhotoAttribute($value)
    {
        return $value ? public_path($this->directory . $value) : 'https://dummyimage.com/100.png/09f/fff';
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
