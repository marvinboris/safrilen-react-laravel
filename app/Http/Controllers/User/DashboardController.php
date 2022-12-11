<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Service;
use App\Models\Publication;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PragmaRX\Tracker\Support\Minutes;
use Tracker;

class DashboardController extends Controller
{
    public function index()
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $services = Service::count();
        $publications = Publication::count();
        $subscribers = Subscriber::count();
        
        $yearly_sessions = null;
        $yearly_range = new Minutes();
        $yearly_range->setStart(Carbon::create(now()->year));
        $yearly_range->setEnd(now());
        $yearly_sessions = count(Tracker::sessions($yearly_range));

        $generalReport = [
            'sessions' => $yearly_sessions,
            'publications' => Publication::count(),
        ];

        $names = $cms['pages'][$user->language->abbr]['general']['months'];
        $totalSessions = [];
        $totalPublications = [];
        for ($i = 0; $i < 12; $i++) {
            $monthly_range = new Minutes();
            $monthly_range->setStart(Carbon::create(now()->year, $i + 1));
            if ($i < 11) $monthly_range->setEnd(Carbon::create(now()->year, $i + 2));
            else $monthly_range->setEnd(Carbon::create(now()->year + 1));

            $totalSessions[] = count(Tracker::sessions($monthly_range));
            $totalPublications[] = Publication::whereYear('created_at', now()->year)->whereMonth('created_at', $i + 1)->count();
        }
        for ($i = 0; $i < count($names); $i++) {
            $generalReportTrackerData[] = [
                'name' => strtoupper($names[$i]),
                'Sessions' => $totalSessions[$i],
                'Publications' => $totalPublications[$i],
            ];
        }

        return response()->json([
            'blocksData' => [
                'services' => $services,
                'publications' => $publications,
                'subscribers' => $subscribers,
            ],
            'generalReport' => $generalReport,
            'generalReportTrackerData' => $generalReportTrackerData,
        ]);
    }
}
