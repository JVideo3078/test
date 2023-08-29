const outputElement = document.getElementById('output');
const inputElement = document.getElementById('commandInput');

let currentDirectory = '/';
let directories = {
  '/': ['bin', 'home', 'etc'],
  '/bin': ['ls', 'cd', 'vim'],
  '/home': ['user'],
  '/etc': ['config'],
  '/home/user': ['file1.txt', 'file2.txt']
};
inputElement.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const command = inputElement.value.trim().toLowerCase();
    executeCommand(command);
    inputElement.value = '';
  }
});

function appendToOutput(text) {
  outputElement.innerHTML += `<br>${text}`;
  outputElement.scrollTop = outputElement.scrollHeight;
}

function executeCommand(command) {
  const parts = command.split(' ');

  switch (parts[0]) {
    case 'help':
      appendToOutput("Available commands: ip, cd, pwd, ls, vim, help");
      break;
    case 'ip':
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          appendToOutput(`Your IP address is: ${data.ip}`);
        })
        .catch(error => {
          appendToOutput("Unable to fetch IP address");
        });
      break;
    case 'cd':
      if (parts.length > 1) {
        const targetDirectory = parts[1];
        const contents = directories[currentDirectory];
        
        if (contents && contents.includes(targetDirectory)) {
          if (targetDirectory === '..') {
            const lastSlashIndex = currentDirectory.lastIndexOf('/');
            currentDirectory = currentDirectory.substring(0, lastSlashIndex);
          } else if (targetDirectory === currentDirectory.split('/').pop()) {
            appendToOutput(`You are already in the ${targetDirectory} directory.`);
          } else {
            currentDirectory += '/' + targetDirectory;
          }
        } else {
          appendToOutput(`No such directory: ${targetDirectory}`);
        }
      } else {
        appendToOutput("Usage: cd <directory>");
      }
      break;
    case 'pwd':
      appendToOutput(currentDirectory);
      break;
    case 'ls':
      const contents = directories[currentDirectory];
      if (contents) {
        appendToOutput(contents.join('  '));
      } else {
        appendToOutput(`No such directory: ${currentDirectory}`);
      }
      break;
    case 'vim':
      if (parts.length > 1) {
        const filename = parts[1];
        startVim(filename);
      } else {
        appendToOutput("Usage: vim <filename>");
      }
      break;
    default:
      appendToOutput(`Command not found: ${parts[0]}`);
  }
}
const vimScript = document.createElement('script');
vimScript.src = 'vim.js';
document.body.appendChild(vimScript);

document.addEventListener('keydown', function(event) {
  if (!isVimMode) {
    // Check for Escape key
    if (event.key === 'Escape') {
      clearConsole();
      appendToOutput("Welcome to My Linux Terminal! (Made by: JVideo)");
      appendToOutput("Type 'help' to see available commands.");
      appendToOutput("If you would like to clear your terminal press ESC.");
    }
  } else {
    // Handle Vim-like editor key press
    handleVimKeyPress(event);
  }
});
