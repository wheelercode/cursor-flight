# cursor-flight README

Cursor Flight is a simple cursor extension allowing users to jump a certain number of characters forward or backwards on the current line, or a certain number of lines up or down. 

## Features

- Jump the cursor a specified number characters forward or backwards (default 10).
- Jump the cursor a specified number of lines up or down (default 5).
- Customize the jump sizes in the settings.

## Requirements

Works for all languages and editors.

## Extension Settings

This extension contributes the following commands:

* `cursor-flight.jumpLeft`: Jump the cursor left.
* `cursor-flight.jumpRight`: Jump the cursor right.
* `cursor-flight.jumpUp`: Jump the cursor up.
* `cursor-flight.jumpDown`: Jump the cursor down.

This extension contributes the following settings:

* `cursor-flight.horizontalJumpAmount`: Number of characters the cursor will jump forwards or backwards on the current line.
* `cursor-flight.verticalJumpAmount`: Number of lines the cursor will jump up or down from the current line.

This extension utilizes the following keybindings:

* `alt+left`: Jump Left
* `alt+right`: Jump Right
* `ctrl+up`: Jump Up
* `ctrl+down`: Jump Down

## Known Issues

No known Issues.

## Release Notes

Initial Release - 11/2/2022

### 1.0.0

Initial release.

---