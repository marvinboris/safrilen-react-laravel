<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    private $rules = [
        'title' => 'array|required',
        'body' => 'array|required',
        'is_active' => 'required|integer',
        'photo' => 'nullable|image',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $services = [];
        $filteredData = Service::orderBy('id');

        $filteredData = $filteredData
            ->select('services.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('services.title', 'LIKE', "%$search%")
                        ->orWhere('services.body', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $service) {
            $services[] = array_merge($service->toArray(), []);
        }

        return [
            'services' => $services,
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

        $services = $data['services'];
        $total = $data['total'];

        return response()->json([
            'services' => $services,
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

        $service = Service::find($id);
        if (!$service) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'service' => $service,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['title', 'body', 'photo']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'services');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Service::create($input + [
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $service = Service::find($id);
        if (!$service) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['title', 'body', 'photo']);

        if ($file = $request->file('photo')) {
            if ($service->photo && is_file(public_path($service->photo))) unlink(public_path($service->photo));
            $fileName = UtilController::resize($file, 'services');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $service->update($input + [
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['updated'], 'success'),
            'service' => $service,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $service = Service::find($id);
        if (!$service) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['not_found'], 'danger'),
        ]);

        if ($service->photo && is_file(public_path($service->photo))) unlink(public_path($service->photo));
        $service->delete();

        $data = $this->data();

        $services = $data['services'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['services']['deleted'], 'success'),
            'services' => $services,
            'total' => $total,
        ]);
    }
}
