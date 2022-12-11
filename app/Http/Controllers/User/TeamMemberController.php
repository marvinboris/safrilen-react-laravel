<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\TeamMember;
use App\Notifications\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TeamMemberController extends Controller
{
    private $rules = [
        'name' => 'string|required',
        'job' => 'array|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $team_members = [];
        $filteredData = TeamMember::orderBy('id');

        $filteredData = $filteredData
            ->select('team_members.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('team_members.name', 'LIKE', "%$search%")
                        ->orWhere('team_members.job', 'LIKE', "%$search%")
                        ->orWhere('team_members.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $team_member) {
            $team_members[] = array_merge($team_member->toArray(), []);
        }

        return [
            'team_members' => $team_members,
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

        $team_members = $data['team_members'];
        $total = $data['total'];

        return response()->json([
            'team_members' => $team_members,
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

        $team_member = TeamMember::find($id);
        if (!$team_member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'team_member' => $team_member,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'job']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'team-members');
            $input['photo'] = htmlspecialchars($fileName);
        }

        TeamMember::create($input + [
            'job' => json_encode($request->job),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $team_member = TeamMember::find($id);
        if (!$team_member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'job']);

        if ($file = $request->file('photo')) {
            if ($team_member->photo && is_file(public_path($team_member->photo))) unlink(public_path($team_member->photo));
            $fileName = UtilController::resize($file, 'team-members');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $team_member->update($input + [
            'job' => json_encode($request->job),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['updated'], 'success'),
            'team_member' => $team_member,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $team_member = TeamMember::find($id);
        if (!$team_member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['not_found'], 'danger'),
        ]);

        if ($team_member->photo && is_file(public_path($team_member->photo))) unlink(public_path($team_member->photo));
        $team_member->delete();

        $data = $this->data();

        $team_members = $data['team_members'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['team_members']['deleted'], 'success'),
            'team_members' => $team_members,
            'total' => $total,
        ]);
    }
}
