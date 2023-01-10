<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use App\Models\Publication;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\Testimonial;
use App\Models\User;
use App\Notifications\ContactNotification;
use App\Notifications\QuoteNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class FrontendController extends Controller
{
    public function home()
    {
        $images = Image::take(4)->get();
        $testimonials = Testimonial::orderBy('id')->whereIsActive(1)->take(3)->get();
        $publications = [];
        foreach (Publication::orderBy('id', 'DESC')->whereIsActive(1)->take(3)->get() as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
            ]);
        }

        return response()->json([
            'images' => $images,
            'testimonials' => $testimonials,
            'publications' => $publications,
        ]);
    }

    public function newsletter(Request $request)
    {
        $input = $request->validate([
            'first_name' => 'required|string',
            'email' => 'required|email|unique:subscribers'
        ]);

        Subscriber::create($input);

        return response()->json([
            'message' => UtilController::message('Souscription réussie.', 'success'),
        ]);
    }

    public function quote(Request $request)
    {
        $request->validate([
            'service' => 'required|exists:services,id',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'date' => 'required|date',
            'comment' => 'required|string',
        ]);

        Notification::send(User::whereEmail(env('COMPANY_EMAIL'))->first(), new QuoteNotification($request->except('service') + [
            'service' => Service::find($request->service)->title[env('MIX_DEFAULT_LANG', 'fr')],
        ]));

        return response()->json([
            'message' => UtilController::message('Formulaire soumis.', 'success'),
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        Notification::send(User::whereEmail(env('COMPANY_EMAIL'))->first(), new ContactNotification($request->all()));

        return response()->json([
            'message' => UtilController::message('Formulaire soumis.', 'success'),
        ]);
    }

    public function publications()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $cms = UtilController::cms();

        $publications = [];
        $filteredData = Publication::where('is_active', 1);

        $filteredData = $filteredData
            ->join('users', function ($join) {
                $join->on('users.id', 'publications.author_id');
                $join->where('publications.author_type', '=', User::class);
            })
            ->select('publications.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('publications.title', 'LIKE', "%$search%")
                        ->orWhere('publications.body', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('publications.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
            ]);
        }

        $recent_posts = Publication::orderBy('id', 'DESC')->whereIsActive(1)->take(5)->get();

        return response()->json($publications);
    }

    public function products()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $products = [];
        $filteredData = Product::orderBy('id')->whereIsActive(1);

        $filteredData = $filteredData
            ->select('products.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('products.name', 'LIKE', "%$search%")
                        ->orWhere('products.description', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $service) {
            $products[] = array_merge($service->toArray(), []);
        }

        return response()->json($products);
    }
}
