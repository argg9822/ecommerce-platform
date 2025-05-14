<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

class TenantFileService
{
    public function storeImages(UploadedFile $file, string $folder): ?string
    {
        $tenantId = tenant('id'); // o auth()->user()->tenant_id

        if (!$tenantId) return null;

        $imageName = uniqid() . '.' . $file->getClientOriginalExtension();
        $relativePath = "$folder/$imageName";
        $fullPath = "$tenantId/images/$folder";

        $stored = $file->storeAs($fullPath, $imageName, 'tenant');

        return $stored ? $relativePath : null;
    }
}
