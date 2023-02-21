<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    private $rules = [
        'email' => 'required|email',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $subscribers = [];
        $filteredData = Subscriber::orderBy('id');

        $filteredData = $filteredData
            ->select('subscribers.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->orWhere('subscribers.email', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $subscriber) {
            $subscribers[] = array_merge($subscriber->toArray(), []);
        }

        return [
            'subscribers' => $subscribers,
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

        $subscribers = $data['subscribers'];
        $total = $data['total'];

        return response()->json([
            'subscribers' => $subscribers,
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

        $subscriber = Subscriber::find($id);
        if (!$subscriber) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'subscriber' => $subscriber,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        Subscriber::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $subscriber = Subscriber::find($id);
        if (!$subscriber) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->all();

        $subscriber->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['updated'], 'success'),
            'subscriber' => $subscriber,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $subscriber = Subscriber::find($id);
        if (!$subscriber) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['not_found'], 'danger'),
        ]);

        $subscriber->delete();

        $data = $this->data();

        $subscribers = $data['subscribers'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['subscribers']['deleted'], 'success'),
            'subscribers' => $subscribers,
            'total' => $total,
        ]);
    }
}
