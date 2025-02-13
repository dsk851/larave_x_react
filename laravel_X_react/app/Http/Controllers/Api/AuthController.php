<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Auth;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
  public function signup(SignupRequest $request){
    try {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password'=> bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        // Log du token pour voir si ça pose problème
        \Log::info('Token created: ' . $token);

        return response(compact('user', 'token'));
    } catch (\Exception $e) {
        \Log::error('Signup error: ' . $e->getMessage()); // Log de l'erreur
        return response([
            'message' => 'An error occurred during signup',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)){
            return response([
                'message' =>'Provided email address or password is incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
