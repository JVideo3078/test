let isVimMode = false;
let vimContent = "";

function clearConsole() {
  outputElement.innerHTML = "";
}

function startVim(filename) {
  isVimMode = true;
  vimContent = ""; // Clear existing content
  clearConsole();
  appendToOutput(`Vim-like editor - Editing ${filename}`);
  appendToOutput("Type ':w' to save and ':q' to exit.");
}

function handleVimKeyPress(event) {
  if (isVimMode) {
    if (event.key === 'Escape') {
      isVimMode = false;
      clearConsole();
      appendToOutput("Vim-like editor - Closed.");
    } else if (event.key === 'Enter') {
      vimContent += "\n"; // Add a new line to the content
      clearConsole();
      appendToOutput(`Vim-like editor - Editing`);
      appendToOutput("Type ':w' to save and ':q' to exit.");
      appendToOutput(vimContent); // Display the updated content
      event.preventDefault(); // Prevent the Enter key from triggering a command
    } else if (event.key === 'Backspace') {
      vimContent = vimContent.slice(0, -1);
      clearConsole();
      appendToOutput(`Vim-like editor - Editing`);
      appendToOutput("Type ':w' to save and ':q' to exit.");
      appendToOutput(vimContent); // Display the updated content
    } else if (event.key.length === 1) {
      vimContent += event.key;
      clearConsole();
      appendToOutput(`Vim-like editor - Editing`);
      appendToOutput("Type ':w' to save and ':q' to exit.");
      appendToOutput(vimContent); // Display the updated content
    }
  }
}
