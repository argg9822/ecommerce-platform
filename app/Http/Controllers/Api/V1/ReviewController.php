<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\V1\ReviewCollection;
use App\Http\Resources\V1\ReviewResource;
use App\Models\Api\V1\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReviewController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $reviews = Review::with(['product', 'user'])
            ->where('user_id', Auth::id())
            ->latest()->paginate(10);

        if ($reviews->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron comentarios para el usuario actual'
            ], Response::HTTP_NOT_FOUND);
        }

        return new ReviewCollection($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        try {
            DB::beginTransaction();
            $review = Review::create([
                'product_id' => $request->product_id,
                'user_id' => Auth::id(),
                'rating' => $request->rating,
                'title' => $request->title,
                'comment' => $request->comment
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Comentario guardado correctamente',
                'review' => $review
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating review: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'rating' => $request->rating,
                'title' => $request->title,
                'comment' => $request->comment
            ]);

            return response()->json([
                'message' => 'Error creating review: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $this->authorize('view', $review);

        return new ReviewResource($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        if ($request->user()->cannot('update', $review)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], Response::HTTP_FORBIDDEN);
        }

        try {
            DB::beginTransaction();
            $review->update($request->only(['rating', 'comment', 'title']));

            DB::commit();
            return response()->json([
                'message' => 'Comentario actualizado correctamente',
                'review' => $review
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error actualizando el comentrario: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
