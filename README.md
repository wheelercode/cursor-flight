# cursor-flight README

Cursor Flight is a simple cursor extension that enables incremental cursor movement in any direction.

## Features

- Move the cursor a specified number of characters left or right, (default 10).
- Move the cursor a specified number of lines up or down (default 5).
- Customize the movement sizes in the settings.


## Requirements

Works for all languages and editors.

## Extension Settings

This extension contributes the following commands:

* `cursor-flight.jumpLeft`: Move the cursor left.
* `cursor-flight.jumpRight`: Move the cursor right.
* `cursor-flight.jumpUp`: Move the cursor up.
* `cursor-flight.jumpDown`: Move the cursor down.

This extension contributes the following settings:

* `cursor-flight.horizontalJumpAmount`: Number of characters the cursor will move forwards or backwards on the current line.
* `cursor-flight.verticalJumpAmount`: Number of lines the cursor will move up or down from the current line.

This extension utilizes the following keybindings:

* `alt+left`: Move Left
* `alt+right`: Move Right
* `ctrl+up`: Move Up
* `ctrl+down`: Move Down

## Known Issues

No known issues

## Release Notes

### 1.0.0

Initial release on 11/2/2022

### 1.0.1

Cosmetic changes to marketplace appearance

### 1.0.2

**Fixed**: Horizontal scrolling