<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tenant;
use App\Models\TenantApiToken;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class IdentifyTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $token = $request->bearerToken();
        $token = $request->header('x-api-key') ?? $request->input('api_token');

        if(!$token){
            return response()->json(["error" => "Debe proveer un API token"], 401);
        }

        $apiToken = TenantApiToken::with('tenant')->whereNull('expired_at')->get()
            ->first(function($storedToken) use ($token){
                return Hash::check($token, $storedToken->token_hash);
            });

        if(!$apiToken){
            return response()->json(["error" => "Token inválido"], 403);
        }

        //$domain = $request->getHost();

        // app()->instance('currentTenant', $tenant);

        return $next($request);
    }
}
