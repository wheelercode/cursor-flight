/*
 * MIT License
 * 
 * Copyright (c) 2022, Ryan Wheeler
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let left = vscode.commands.registerCommand('cursor-flight.jumpLeft', jumpLeft);
	let right = vscode.commands.registerCommand('cursor-flight.jumpRight', jumpRight);
	let up = vscode.commands.registerCommand('cursor-flight.jumpUp', jumpUp);
	let down = vscode.commands.registerCommand('cursor-flight.jumpDown', jumpDown);

	context.subscriptions.push(left);
	context.subscriptions.push(right);
	context.subscriptions.push(up);
	context.subscriptions.push(down);

}

// let validatedposiiton = editor.document.validatePosition
// let validatedRange = editor.document.validateRange

function jumpLeft() {
	let deltaChar = -vscode.workspace.getConfiguration('cursor-flight').get('horizontalJumpAmount');
	let editor = vscode.window.activeTextEditor;
	let cursorPos = editor.selection.active;
	let lineRange = editor.document.lineAt(cursorPos.line).range;
	
	let posChar = cursorPos.character + deltaChar;
	posChar = posChar < 0 ? 0 : posChar;

	var newPosition = cursorPos.with(cursorPos.line, posChar);
	newPosition = editor.document.validatePosition(newPosition);
	
	var newSelection = new vscode.Selection(newPosition, newPosition);
	editor.selection = newSelection;
	
	let cursorPosChar = cursorPos.character - 2 < 0 ? 0 : cursorPos.character - 2;
	let startPosition = cursorPos.with(newPosition.line, cursorPosChar);
	startPosition = editor.document.validatePosition(startPosition);
	
	let newRange = editor.document.validateRange(lineRange.with(startPosition, newPosition));
	editor.revealRange(newRange, vscode.TextEditorRevealType.Default);
}

function jumpRight() {
	let deltaChar = vscode.workspace.getConfiguration('cursor-flight').get('horizontalJumpAmount');
	let editor = vscode.window.activeTextEditor;
	let cursorPos = editor.selection.active;
	let lineRange = editor.document.lineAt(cursorPos.line).range;
	
	let posChar = cursorPos.character + deltaChar;
	posChar = posChar > lineRange.end.character ? lineRange.end.character : posChar;

	var newPosition = cursorPos.with(cursorPos.line, posChar);
	newPosition = editor.document.validatePosition(newPosition);
	
	var newSelection = new vscode.Selection(newPosition, newPosition);
	editor.selection = newSelection;
	
	let endPosition = cursorPos.with(newPosition.line, newPosition.character + 2);
	endPosition = editor.document.validatePosition(endPosition);

	let newRange = editor.document.validateRange(lineRange.with(newPosition, endPosition));
	editor.revealRange(newRange, vscode.TextEditorRevealType.Default);
}

function jumpUp() {
	let deltaLine = -vscode.workspace.getConfiguration('cursor-flight').get('verticalJumpAmount');
	let editor = vscode.window.activeTextEditor;

	let linesRange = editor.visibleRanges[0];
	let numLines = linesRange.end.line - linesRange.start.line;
	let cursorPosition = editor.selection.active;

	let newCursorLine = cursorPosition.line + deltaLine; 
	newCursorLine = newCursorLine < 0 ? 0 : newCursorLine;
	
	let endCharacter = editor.document.lineAt(cursorPosition.line).range.end.character;
	let newCursorCharacter = cursorPosition.character > endCharacter ? endCharacter : cursorPosition.character;
	
	let newCursorPosition = cursorPosition.with(newCursorLine, newCursorCharacter);
	newCursorPosition = editor.document.validatePosition(newCursorPosition);

	let newSelection = new vscode.Selection(newCursorPosition, newCursorPosition);
	editor.selection = newSelection;
	
	let newStartLine = cursorPosition.line - Math.floor(numLines / 2);
	newStartLine = newStartLine < 0 ? 0 : newStartLine;

	let newEndLine = newStartLine + numLines;
	newEndLine = newEndLine >= editor.document.lineCount ? editor.document.lineCount - 1 : newEndLine;
	
	let newStartPosition = linesRange.start.with(newStartLine, 0);
	newStartPosition = editor.document.validatePosition(newStartPosition);
	
	let newEndPosition = linesRange.end.with(newEndLine, 0);
	newEndPosition = editor.document.validatePosition(newEndPosition);

	let newRange = editor.document.validateRange(linesRange.with(newStartPosition, newEndPosition));
	editor.revealRange(newRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
}

function jumpDown() {
	let deltaLine = vscode.workspace.getConfiguration('cursor-flight').get('verticalJumpAmount');
	let editor = vscode.window.activeTextEditor;

	let linesRange = editor.visibleRanges[0];
	let numLines = linesRange.end.line - linesRange.start.line;
	let cursorPosition = editor.selection.active;

	let newCursorLine = cursorPosition.line + deltaLine; 
	newCursorLine = newCursorLine >= editor.document.lineCount ? editor.document.lineCount - 1 : newCursorLine;
	
	let endCharacter = editor.document.lineAt(cursorPosition.line).range.end.character;
	let newCursorCharacter = cursorPosition.character > endCharacter ? endCharacter : cursorPosition.character;

	let newCursorPosition = cursorPosition.with(newCursorLine, newCursorCharacter);
	newCursorPosition = editor.document.validatePosition(newCursorPosition);
	
	let newSelection = new vscode.Selection(newCursorPosition, newCursorPosition);
	editor.selection = newSelection;
	
	let newStartLine = newCursorLine - Math.floor(numLines / 2);
	newStartLine = newStartLine < 0 ? 0 : newStartLine;
	newStartLine = newStartLine >= editor.document.lineCount ? editor.document.lineCount - 1 : newStartLine;
	
	let newEndLine = newStartLine + numLines;
	newEndLine = newEndLine >= editor.document.lineCount ? editor.document.lineCount - 1 : newEndLine;
	
	let newStartPosition = linesRange.start.with(newStartLine, 0);
	let newEndPosition = linesRange.end.with(newEndLine, 0);
	
	newStartPosition = editor.document.validatePosition(newStartPosition);
	newEndPosition = editor.document.validatePosition(newEndPosition);
	
	let newRange = linesRange.with(newStartPosition, newEndPosition);
	newRange = editor.document.validateRange(newRange);

	editor.revealRange(newRange,vscode.TextEditorRevealType.InCenterIfOutsideViewport);
}

module.exports = { activate }
