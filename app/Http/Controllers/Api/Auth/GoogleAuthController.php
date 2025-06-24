<?php

namespace App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Controller;
use App\Models\Api\V1\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request)
    {
        // Redirect to Google OAuth
        return Socialite::driver('google')->redirect();
    }
 
    public function callback(Request $request)
    {
        try {
            Log::info('Google Callback Request: ', $request->all());
            if (!$request) {
                return response()->json(['error' => 'Por favor ingrese los datos de registro'], Response::HTTP_BAD_REQUEST);
            }

            $user = User::firstOrCreate(
                ['email' => $request->email],
                [
                    'name' => $request->name,
                    'password' => Hash::make(Str::random(16)),
                    'avatar' => $request->image,
                ]
            );

            $token = $user->createToken('google-token')->plainTextToken;

            return response()->json([
                'message' => 'Login exitoso con Google',
                'token' => $token
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            Log::error('Google Login Error: ' . $e->getMessage());
            return response()->json(['error' => 'Error en la autenticación con Google'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
