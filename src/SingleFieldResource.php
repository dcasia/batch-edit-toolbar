<?php

declare(strict_types = 1);

namespace DigitalCreative\BatchEditToolbar;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;

class SingleFieldResource extends Resource
{
    public static ?Field $field;

    public function __construct($resource, ?Field $field = null)
    {
        if ($field) {
            static::$field = $field;
        }

        parent::__construct($resource);
    }

    public function fields(NovaRequest $request): array
    {
        return [
            static::$field,
        ];
    }
}
