<?php

namespace App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Controller;
use App\Models\Api\V1\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request)
    {
        // Redirect to Google OAuth
        return Socialite::driver('google')->redirect();
    }
 
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            if (!$googleUser) {
                return response()->json(['error' => 'No se pudo obtener la información del usuario de Google'], 400);
            }

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName() ?? $googleUser->getNickname(),
                    'password' => Hash::make(Str::random(16)),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            $token = $user->createToken('google-token')->plainTextToken;            

            return response()->json([
                'message' => 'Login exitoso con Google',
                'token' => $token,
                'user' => $user,
            ]);

        } catch (\Exception $e) {
            Log::error('Google Login Error: ' . $e->getMessage());
            return response()->json(['error' => 'Error en la autenticación con Google'], 500);
        }
    }
}
