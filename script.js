const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', async function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const command = input.value;
    output.innerHTML += `<span>$ ${command}</span><br>`;
    input.value = '';

    switch (command.trim()) {
      case 'ls':
        output.innerHTML += 'file1.txt  file2.txt  folder1<br>';
        break;
      case 'pwd':
        output.innerHTML += '/home/user<br>';
        break;
      case 'date':
        const currentDate = new Date();
        output.innerHTML += `${currentDate}<br>`;
        break;
      case 'help':
        output.innerHTML += 'Available commands: ls, pwd, date, ip, help<br>';
        break;
      case 'ip':
        try {
          const response = await fetch('https://api64.ipify.org?format=json');
          const data = await response.json();
          const userIP = data.ip;
          output.innerHTML += `Your IP address: ${userIP}<br>`;
        } catch (error) {
          output.innerHTML += 'Error retrieving IP address<br>';
        }
        break;
      default:
        output.innerHTML += `Command not found: ${command}<br>`;
        break;
    }

    output.scrollTop = output.scrollHeight;
  }
});
