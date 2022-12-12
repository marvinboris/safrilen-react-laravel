<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Image;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $users = User::count();
        $services = Service::count();
        $testimonials = Testimonial::count();
        $images = Image::count();

        return response()->json([
            'blocks' => [
                'users' => $users,
                'services' => $services,
                'testimonials' => $testimonials,
                'images' => $images,
            ],
        ]);
    }
}
