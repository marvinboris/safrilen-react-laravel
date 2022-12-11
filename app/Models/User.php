<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';

    protected $directory = '/images/users/';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'photo', 'phone', 'role_id', 'language_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function personalAccessToken()
    {
        return 'User Personal Access Token';
    }

    public static function type()
    {
        return 'user';
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : 'https://dummyimage.com/100.png/09f/fff';
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function publications()
    {
        return $this->morphMany(Publication::class, 'author');
    }
}
