<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/signup", [AuthController::class,"signup"])->name("");
Route::post("/login", [AuthController::class,"login"])->name("");
Route::post("/logout", [AuthController::class,"logout"])->name("");
