<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TenantFileService
{
    public function storeImages(UploadedFile $file, string $folder): ?string
    {
        $tenantId = tenant('id');

        if (!$tenantId) return null;

        $imageName = uniqid() . '.' . $file->getClientOriginalExtension();
        $relativePath = "$folder/$imageName";
        $fullPath = "$tenantId/images/$folder";

        $stored = $file->storeAs($fullPath, $imageName, 'tenant');

        return $stored ? $relativePath : null;
    }

    public function deleteImage(?string $relativePath): bool
    {
        if (!$relativePath) return false;
        $deleteResult = Storage::disk('tenant')->delete($relativePath);
        return $deleteResult;
    }
}
