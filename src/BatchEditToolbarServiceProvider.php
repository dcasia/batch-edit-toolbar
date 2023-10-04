<?php

declare(strict_types = 1);

namespace DigitalCreative\BatchEditToolbar;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Nova;

class BatchEditToolbarServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->booted(function (): void {
            $this->routes();
        });

        Field::macro('batchEditable', function (callable $value) {
            return $this->withMeta([ 'batchEditable' => value($value) ]);
        });

        Nova::serving(function (ServingNova $event): void {
            Nova::script('batch-edit-toolbar', __DIR__ . '/../dist/js/tool.js');
        });

        $this->app->terminating(function () {
            SingleFieldResource::$field = null;
        });
    }

    protected function routes(): void
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware([ 'nova' ])
            ->prefix('nova-vendor/batch-edit-toolbar')
            ->group(__DIR__ . '/../routes/api.php');
    }
}
