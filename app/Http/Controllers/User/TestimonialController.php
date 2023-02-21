<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TestimonialController extends Controller
{
    private $rules = [
        'name' => 'string|required',
        'title' => 'array|required',
        'link' => 'string|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $testimonials = [];
        $filteredData = Testimonial::orderBy('id');

        $filteredData = $filteredData
            ->select('testimonials.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('testimonials.title', 'LIKE', "%$search%")
                        ->orWhere('testimonials.name', 'LIKE', "%$search%")
                        ->orWhere('testimonials.link', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $testimonial) {
            $testimonials[] = array_merge($testimonial->toArray(), []);
        }

        return [
            'testimonials' => $testimonials,
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

        $testimonials = $data['testimonials'];
        $total = $data['total'];

        return response()->json([
            'testimonials' => $testimonials,
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

        $testimonial = Testimonial::find($id);
        if (!$testimonial) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'testimonial' => $testimonial,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'title']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'testimonials');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Testimonial::create($input + [
            'title' => json_encode($request->title),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $testimonial = Testimonial::find($id);
        if (!$testimonial) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'title']);

        if ($file = $request->file('photo')) {
            if ($testimonial->photo && is_file(public_path($testimonial->photo))) unlink(public_path($testimonial->photo));
            $fileName = UtilController::resize($file, 'testimonials');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $testimonial->update($input + [
            'title' => json_encode($request->title),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['updated'], 'success'),
            'testimonial' => $testimonial,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $testimonial = Testimonial::find($id);
        if (!$testimonial) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['not_found'], 'danger'),
        ]);

        if ($testimonial->photo && is_file(public_path($testimonial->photo))) unlink(public_path($testimonial->photo));
        $testimonial->delete();

        $data = $this->data();

        $testimonials = $data['testimonials'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['testimonials']['deleted'], 'success'),
            'testimonials' => $testimonials,
            'total' => $total,
        ]);
    }
}
