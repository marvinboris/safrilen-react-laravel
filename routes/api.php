<?php

use App\Http\Controllers\UtilController;
use App\Models\Language;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->name('auth.')->group(function () {
    Route::namespace('User')->prefix('user')->name('user')->group(function () {
        Route::post('login', 'AuthController@login')->name('login');
        Route::post('forgot', 'AuthController@forgot')->name('forgot');
        Route::post('reset/{id}/{code}', 'AuthController@reset')->name('reset');
    });
});

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::middleware('permission')->group(function () {
            Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
                Route::patch('global', 'GlobalController@patch')->name('global');
                Route::patch('general', 'GeneralController@patch')->name('general');
                Route::patch('components', 'ComponentsController@patch')->name('components');
                Route::patch('frontend', 'FrontendController@patch')->name('frontend');
                Route::patch('backend', 'BackendController@patch')->name('backend');
                Route::patch('auth', 'AuthController@patch')->name('auth');

                Route::name('index')->get('', function () {
                    $jsonString = file_get_contents(base_path('cms.json'));
                    $cms = json_decode($jsonString, true);

                    return response()->json([
                        'cms' => $cms,
                        'languages' => Language::all(),
                    ]);
                });
            });

            Route::prefix('features')->name('features.')->group(function () {
                Route::get('{feature}', 'FeatureController@show')->name('show');
            });

            Route::prefix('languages')->name('languages.')->group(function () {
                Route::get('{language}', 'LanguageController@show')->name('show');
            });

            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('info', 'RoleController@info')->name('info');
                Route::get('{role}', 'RoleController@show')->name('show');
            });

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('info', 'UserController@info')->name('info');
                Route::get('{user}', 'UserController@show')->name('show');
            });

            Route::prefix('products')->name('products.')->group(function () {
                Route::get('info', 'ProductController@info')->name('info');
                Route::get('{product}', 'ProductController@show')->name('show');
            });

            Route::prefix('publications')->name('publications.')->group(function () {
                Route::get('info', 'PublicationController@info')->name('info');
                Route::get('{publication}', 'PublicationController@show')->name('show');
            });

            Route::prefix('subscribers')->name('subscribers.')->group(function () {
                Route::get('{subscriber}', 'SubscriberController@show')->name('show');
            });

            Route::prefix('services')->name('services.')->group(function () {
                Route::get('{service}', 'ServiceController@show')->name('show');
            });

            Route::prefix('testimonials')->name('testimonials.')->group(function () {
                Route::get('{testimonial}', 'TestimonialController@show')->name('show');
            });



            Route::apiResources([
                'users' => 'UserController',
                'roles' => 'RoleController',
                'features' => 'FeatureController',
                'languages' => 'LanguageController',
                'publications' => 'PublicationController',
                'products' => 'ProductController',
                'subscribers' => 'SubscriberController',
                'services' => 'ServiceController',
                'testimonials' => 'TestimonialController',
            ]);
        });
    });
});

Route::middleware('auth:admin,api')->group(function () {
    Route::get('logout', 'UtilController@logout')->name('logout');
    Route::get('account', 'UtilController@account')->name('account');

    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', 'UtilController@notification')->name('show');
        Route::get('', 'UtilController@notifications')->name('index');
    });

    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', 'ExportController@xlsx');
        Route::name('csv')->post('csv', 'ExportController@csv');
        Route::name('pdf')->post('pdf', 'ExportController@pdf');
    });

    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $user = UtilController::get(request());

            $jsonString = file_get_contents(base_path('cms.json'));
            $cmsFile = json_decode($jsonString, true);

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger')
            ]);

            $user->update([
                'language_id' => $id
            ]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('MIX_DEFAULT_LANG', 'fr');

        $cms = [
            'global' => $cmsFile['global'],
            'general' => $cmsFile['pages'][$abbr]['general'],
            'auth' => $cmsFile['pages'][$abbr]['auth'],
            'backend' => $cmsFile['pages'][$abbr]['backend'],
            'frontend' => $cmsFile['pages'][$abbr]['frontend'],
        ];
        $languages = Language::all();
        $services = Service::whereIsActive(1)->take(6)->get();

        return response()->json([
            'cms' => $cms,
            'languages' => $languages,
            'services' => $services,
        ]);
    })->name('cms');
});

Route::name('frontend.')->group(function () {
    Route::prefix('publications')->name('publications.')->group(function () {
        Route::get('', 'FrontendController@publications')->name('index');
    });
    
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('', 'FrontendController@products')->name('index');
    });

    Route::prefix('services')->name('services.')->group(function () {
        Route::get('', 'FrontendController@services')->name('index');
    });

    Route::post('quote', 'FrontendController@quote')->name('quote');
    Route::post('contact', 'FrontendController@contact')->name('contact');
    Route::post('newsletter', 'FrontendController@newsletter')->name('newsletter');
    Route::get('home', 'FrontendController@home')->name('home');
});