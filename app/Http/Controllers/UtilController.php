<?php

namespace App\Http\Controllers;

use Intervention\Image\ImageManagerStatic as Image;
use App\Models\Admin;
use App\Models\Customer;
use App\Models\Language;
use App\Models\User;
use Illuminate\Http\Request;

class UtilController extends Controller
{
    private function guard()
    {
        $account = request()->user();
        switch ($account->token()->name) {
            case User::personalAccessToken():
                $account = User::find($account->id);
                break;
            case Admin::personalAccessToken():
                $account = Admin::find($account->id);
                break;
        }
        return $account;
    }

    public static function message($content, $type = 'info')
    {
        return [
            'type' => $type,
            'content' => $content
        ];
    }

    public static function get($request)
    {
        $account = $request->user();
        switch ($account->token()->name) {
            case User::personalAccessToken():
                return User::find($account->id);
            case Admin::personalAccessToken():
                return Admin::find($account->id);
        }
    }

    public static function cms()
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        return json_decode($jsonString, true);
    }

    public static function rules($rule_list, $model)
    {
        $rules = [];
        foreach ($rule_list as $key => $rule) {
            if (strpos($rule, 'file') > 0) {
                $rule = str_replace('required', 'nullable', $rule);
                $check = true;
            } else if (strpos($rule, 'array') >= 0) $check = true;
            else $check = request()->input($key) !== $model->toArray()[$key];
            if ($check) $rules[$key] = $rule;
        }
        return $rules;
    }

    public static function resize($file, $folder)
    {
        $name = $file->getClientOriginalName();
        $path = $file->getRealPath();
        $dimensions = getimagesize($path);

        $destinationPath = public_path('/images/' . $folder);
        if (!is_dir($destinationPath)) mkdir($destinationPath);
        $destination = time() . '_' . $name;

        $maxHeight = 1280;
        $maxWidth = 1280;

        $actualHeight = $dimensions[1];
        $actualWidth = $dimensions[0];

        $imgRatio = $actualWidth / $actualHeight;
        $maxRatio = $maxWidth / $maxHeight;
        $compressionQuality  = 0.6;

        if ($actualHeight > $maxHeight || $actualWidth > $maxWidth) {
            if ($imgRatio < $maxRatio) {
                //adjust width according to maxHeight
                $imgRatio = $maxHeight / $actualHeight;
                $actualWidth = $imgRatio * $actualWidth;
                $actualHeight = $maxHeight;
            } else if ($imgRatio > $maxRatio) {
                //adjust height according to maxWidth
                $imgRatio = $maxWidth / $actualWidth;
                $actualHeight = $imgRatio * $actualHeight;
                $actualWidth = $maxWidth;
            } else {
                $actualHeight = $maxHeight;
                $actualWidth = $maxWidth;
                $compressionQuality = 1;
            }
        }

        $img = Image::make($path);
        $img
            ->resize($actualWidth, $actualHeight)
            ->save($destinationPath . '/' . $destination, $compressionQuality * 100);

        return $destination;
    }

    public static function isJson($string)
    {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }

    public static function translatable($value)
    {
        $data = null;
        if (!self::isJson($value)) {
            $data = [];
            foreach (Language::all() as $language) {
                $data[$language->abbr] = $value;
            }
            return $data;
        }

        $value = json_decode($value, true);

        foreach (Language::all() as $language) {
            if (!array_key_exists($language->abbr, $value)) 
            $value[$language->abbr] = 
            $value[env('VITE_DEFAULT_LANG', 'fr')];
        }

        return $value;
    }



    // Authentication
    public function logout()
    {
        request()->user()->token()->revoke();

        return response()->json([
            'message' => self::message('Successfully logged out.', 'success'),
        ]);
    }

    public function account()
    {
        $account = $this->guard();

        $type = $account->type();

        $data = array_merge($account->toArray(), [
            'notifications' => $account->notifications()->latest()->limit(5)->get(),
            'language' => $account->language->abbr
        ]);

        if ($type === User::type()) {
            $role = $account->role;

            $role_features = [];
            foreach ($role->features as $feature) {
                $role_features[] = [
                    'id' => $feature->id,
                    'prefix' => $feature->prefix,
                    'permissions' => $feature->pivot->access,
                ];
            }

            $role = $role->toArray();
            $role['features'] = $role_features;

            $data = $data + [
                'role' => $role
            ];
        } else if ($type === Admin::type()) $data = array_merge($data, []);

        return response()->json(['data' => $data, 'role' => $type,]);
    }


    // Notifications
    public function notifications()
    {
        $account = $this->guard();

        $notifications = [];
        foreach ($account->notifications()->latest()->get() as $notification) {
            $notifications[] = array_merge($notification->toArray(), [
                'data' => $notification->data
            ]);
        }

        return response()->json([
            'notifications' => $notifications
        ]);
    }

    public function notification($id)
    {
        $account = $this->guard();

        $notification = $account->notifications()->find($id);
        $notification->markAsRead();

        $type = $account->type();

        $data = array_merge($account->toArray(), [
            'notifications' => $account->notifications()->latest()->limit(5)->get(),
            'language' => $account->language->abbr
        ]);
        if ($type === User::type()) {
            $role = $account->role;

            $role_features = [];
            foreach ($role->features as $feature) {
                $role_features[] = [
                    'id' => $feature->id,
                    'prefix' => $feature->prefix,
                    'permissions' => $feature->pivot->access,
                ];
            }

            $role = $role->toArray();
            $role['features'] = $role_features;

            $data = $data + [
                'role' => $role
            ];
        } else if ($type === Admin::type()) $data = array_merge($data, []);

        return response()->json([
            'notification' => $notification,
            'data' => $data,
        ]);
    }
}
