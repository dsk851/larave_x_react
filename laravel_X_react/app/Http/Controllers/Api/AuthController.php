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
         /**
         * @var  \App\Models\User $user
         */

        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password'=> bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return respsonse(compact('user', 'token'))
    }
    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)){
            return respsonse([
                'message' =>'Provided email address or password is incorrect'
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return respsonse(compact('user','token'))
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->
    }
}
