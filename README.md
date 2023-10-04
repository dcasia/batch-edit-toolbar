# Batch Edit Toolbar

[![Latest Version on Packagist](https://img.shields.io/packagist/v/digital-creative/batch-edit-toolbar)](https://packagist.org/packages/digital-creative/batch-edit-toolbar)
[![Total Downloads](https://img.shields.io/packagist/dt/digital-creative/batch-edit-toolbar)](https://packagist.org/packages/digital-creative/batch-edit-toolbar)
[![License](https://img.shields.io/packagist/l/digital-creative/batch-edit-toolbar)](https://github.com/dcasia/batch-edit-toolbar/blob/master/LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dcasia/batch-edit-toolbar/main/screenshots/dark.png">
  <img alt="Batch Edit Toolbar in Action" src="https://raw.githubusercontent.com/dcasia/batch-edit-toolbar/main/screenshots/light.png">
</picture>

Allows you to update a single column of a resource all at once directly from the index page.

# Installation

You can install the package via composer:

```
composer require digital-creative/batch-edit-toolbar
```

## Basic Usage

To use the new functionality all you need to do is to add the `batchEditable` method to your field definition, this method should return an array containing the options as defined below.

```php
class UserResource extends Resource
{
    public function fields(NovaRequest $request): array
    {
        return [
            Text::make('Title', 'title')
                ->rules('required')
                ->batchEditable(fn () => [
                    'icon' => 'annotation', // accepts any heroicon name supported by Nova: https://v1.heroicons.com
                    
                    /**
                     * These are all optional, and the current values are the default ones
                     */
                    'tooltip' => 'Update {attribute}', // Appears when hovering the icon.
                    'title' => 'Update {attribute}', // Appears in the modal title.
                    'cancelButtonText' => 'Cancel', // Appears in the modal cancel button.
                    'confirmButtonText' => 'Update', // Appears in the modal confirm button.
                    'confirmText' => null, // Appears above the field in the modal.
                    'modalSize' => '2xl', // Can be "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl".
                    'modalStyle' => 'window', // Can be either 'fullscreen' or 'window'.
                ]),
    
            /**
             * You can also use a custom SVG icon directly 
             */
            Text::make('Description', 'description')
                ->rules('required')
                ->batchEditable(fn () => [
                    'icon' => <<<SVG
                        <svg>...</svg>
                    SVG,
                ]),                
        ];
    }
}
```

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/batch-edit-toolbar/master/LICENSE) for more information.
