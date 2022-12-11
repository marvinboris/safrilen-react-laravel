<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Testimony;
use App\Notifications\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TestimonyController extends Controller
{
    private $rules = [
        'name' => 'string|required',
        'company' => 'array|required',
        'title' => 'array|required',
        'body' => 'array|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $testimonies = [];
        $filteredData = Testimony::orderBy('id');

        $filteredData = $filteredData
            ->select('testimonies.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('testimonies.title', 'LIKE', "%$search%")
                        ->orWhere('testimonies.name', 'LIKE', "%$search%")
                        ->orWhere('testimonies.company', 'LIKE', "%$search%")
                        ->orWhere('testimonies.body', 'LIKE', "%$search%")
                        ->orWhere('testimonies.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $testimony) {
            $testimonies[] = array_merge($testimony->toArray(), []);
        }

        return [
            'testimonies' => $testimonies,
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

        $testimonies = $data['testimonies'];
        $total = $data['total'];

        return response()->json([
            'testimonies' => $testimonies,
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

        $testimony = Testimony::find($id);
        if (!$testimony) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'testimony' => $testimony,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'company', 'title', 'body']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'testimonies');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Testimony::create($input + [
            'company' => json_encode($request->company),
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $testimony = Testimony::find($id);
        if (!$testimony) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'company', 'title', 'body']);

        if ($file = $request->file('photo')) {
            if ($testimony->photo && is_file(public_path($testimony->photo))) unlink(public_path($testimony->photo));
            $fileName = UtilController::resize($file, 'testimonies');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $testimony->update($input + [
            'company' => json_encode($request->company),
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['updated'], 'success'),
            'testimony' => $testimony,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $testimony = Testimony::find($id);
        if (!$testimony) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['not_found'], 'danger'),
        ]);

        if ($testimony->photo && is_file(public_path($testimony->photo))) unlink(public_path($testimony->photo));
        $testimony->delete();

        $data = $this->data();

        $testimonies = $data['testimonies'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['testimonies']['deleted'], 'success'),
            'testimonies' => $testimonies,
            'total' => $total,
        ]);
    }
}
