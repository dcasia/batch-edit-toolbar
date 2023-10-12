# Batch Edit Toolbar

[![Latest Version on Packagist](https://img.shields.io/packagist/v/digital-creative/batch-edit-toolbar)](https://packagist.org/packages/digital-creative/batch-edit-toolbar)
[![Total Downloads](https://img.shields.io/packagist/dt/digital-creative/batch-edit-toolbar)](https://packagist.org/packages/digital-creative/batch-edit-toolbar)
[![License](https://img.shields.io/packagist/l/digital-creative/batch-edit-toolbar)](https://github.com/dcasia/batch-edit-toolbar/blob/main/LICENSE)

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

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

### Other Packages You Might Like

- [Nova Welcome Card](https://github.com/dcasia/nova-welcome-card) - A configurable version of the `Help card` that comes with Nova.
- [Icon Action Toolbar](https://github.com/dcasia/icon-action-toolbar) - Replaces the default boring action menu with an inline row of icon-based actions.
- [Expandable Table Row](https://github.com/dcasia/expandable-table-row) - Provides an easy way to append extra data to each row of your resource tables.
- [Collapsible Resource Manager](https://github.com/dcasia/collapsible-resource-manager) - Provides an easy way to order and group your resources on the sidebar.
- [Resource Navigation Tab](https://github.com/dcasia/resource-navigation-tab) - Organize your resource fields into tabs.
- [Resource Navigation Link](https://github.com/dcasia/resource-navigation-link) - Create links to internal or external resources.
- [Nova Mega Filter](https://github.com/dcasia/nova-mega-filter) - Display all your filters in a card instead of a tiny dropdown!
- [Nova Pill Filter](https://github.com/dcasia/nova-pill-filter) - A Laravel Nova filter that renders into clickable pills.
- [Nova Slider Filter](https://github.com/dcasia/nova-slider-filter) - A Laravel Nova filter for picking range between a min/max value.
- [Nova Range Input Filter](https://github.com/dcasia/nova-range-input-filter) - A Laravel Nova range input filter.
- [Nova FilePond](https://github.com/dcasia/nova-filepond) - A Nova field for uploading File, Image and Video using Filepond.
- [Custom Relationship Field](https://github.com/dcasia/custom-relationship-field) - Emulate HasMany relationship without having a real relationship set between resources.
- [Column Toggler](https://github.com/dcasia/column-toggler) - A Laravel Nova package that allows you to hide/show columns in the index view.
- [Batch Edit Toolbar](https://github.com/dcasia/batch-edit-toolbar) - Allows you to update a single column of a resource all at once directly from the index page.

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/batch-edit-toolbar/master/LICENSE) for more information.
