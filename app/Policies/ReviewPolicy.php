<?php

namespace App\Policies;

use App\Models\Api\V1\Review;
use App\Models\Api\V1\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class ReviewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Review $review): bool
    {
        Log::info('ReviewPolicy@view', [
    'auth_user_id' => $user->id,
    'review_user_id' => $review->user_id,
]);
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Review $review): Response
    {
        return $user->id === $review->user_id
            ? Response::allow()
            : Response::deny('No está autorizado para actualizar este comentario.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Review $review): bool
    {
        return false;
    }
}
