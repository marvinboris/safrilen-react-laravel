<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Product;
use App\Models\Subscriber;
use App\Notifications\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ProductController extends Controller
{
    private $rules = [
        'name' => 'array|required',
        'price' => 'numeric|required',
        'description' => 'array|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $products = [];
        $filteredData = Product::orderBy('id');

        $filteredData = $filteredData
            ->select('products.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('products.name', 'LIKE', "%$search%")
                        ->orWhere('products.price', 'LIKE', "%$search%")
                        ->orWhere('products.description', 'LIKE', "%$search%")
                        // ->orWhere('email', 'LIKE', "%$search%")
                        // ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('products.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $product) {
            $products[] = array_merge($product->toArray(), []);
        }

        return [
            'products' => $products,
            'total' => $total,
        ];
    }

    private function information()
    {
        return [];
    }



    public function index()
    {
        $data = $this->data();

        $products = $data['products'];
        $total = $data['total'];

        return response()->json([
            'products' => $products,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $information = $this->information();

        return response()->json($information);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'product' => $product,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'name', 'description']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'products');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $user->products()->create($input + [
            'name' => json_encode($request->name),
            'description' => json_encode($request->description),
        ]);

        if ($request->is_active == 1) Notification::send(Subscriber::whereIsActive(1)->get(), new Newsletter($input + [
            'name' => $request->name[env('MIX_DEFAULT_LANG', 'fr')],
            'description' => $request->description[env('MIX_DEFAULT_LANG', 'fr')],
        ]));

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'name', 'description']);

        if ($file = $request->file('photo')) {
            if ($product->photo && is_file(public_path($product->photo))) unlink(public_path($product->photo));
            $fileName = UtilController::resize($file, 'products');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $product->update($input + [
            'name' => json_encode($request->name),
            'description' => json_encode($request->description),
        ]);

        if ($product->is_active == 0 && $request->is_active == 1) Notification::send(Subscriber::whereIsActive(1)->get(), new Newsletter($input + [
            'name' => $request->name[env('MIX_DEFAULT_LANG', 'fr')],
            'description' => $request->description[env('MIX_DEFAULT_LANG', 'fr')],
        ]));

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['updated'], 'success'),
            'product' => $product,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        if ($product->photo && is_file(public_path($product->photo))) unlink(public_path($product->photo));
        $product->delete();

        $data = $this->data();

        $products = $data['products'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['deleted'], 'success'),
            'products' => $products,
            'total' => $total,
        ]);
    }
}
