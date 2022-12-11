<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class PartnerController extends Controller
{
    private $rules = [
        'name' => 'string|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $partners = [];
        $filteredData = Partner::orderBy('id');

        $filteredData = $filteredData
            ->select('partners.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('partners.name', 'LIKE', "%$search%")
                        ->orWhere('partners.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $partner) {
            $partners[] = array_merge($partner->toArray(), []);
        }

        return [
            'partners' => $partners,
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

        $partners = $data['partners'];
        $total = $data['total'];

        return response()->json([
            'partners' => $partners,
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

        $partner = Partner::find($id);
        if (!$partner) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'partner' => $partner,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'job']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'partners');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Partner::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $partner = Partner::find($id);
        if (!$partner) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo']);

        if ($file = $request->file('photo')) {
            if ($partner->photo && is_file(public_path($partner->photo))) unlink(public_path($partner->photo));
            $fileName = UtilController::resize($file, 'partners');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $partner->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['updated'], 'success'),
            'partner' => $partner,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $partner = Partner::find($id);
        if (!$partner) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['not_found'], 'danger'),
        ]);

        if ($partner->photo && is_file(public_path($partner->photo))) unlink(public_path($partner->photo));
        $partner->delete();

        $data = $this->data();

        $partners = $data['partners'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['partners']['deleted'], 'success'),
            'partners' => $partners,
            'total' => $total,
        ]);
    }
}
