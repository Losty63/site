const mensagem = document.getElementById('mensagem');
const mostrarEsconder = document.getElementById('mostrar-esconder');
const escolha = document.getElementById('escolha');
const botao1 = document.getElementById('1');
const botao2 = document.getElementById('2');

mostrarEsconder.addEventListener('click', () => {
    if (mensagem.style.display === 'block') {
        mensagem.style.display = 'none';
        mostrarEsconder.textContent = '⬆';
    } else {
        mensagem.style.display = 'block';
        mostrarEsconder.textContent = '⬇';
    }
});

botao1.addEventListener('click', () => {
    criarFormulario();
})

botao2.addEventListener('click', () => {
    criarFormulario();
})

function criarFormulario() {
    const formulario = `
            <h2>Escolha sua opção:</h2>
        <form>
            <label>
                <input type="radio" name="opcao" value="opcao1">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJBt3r-lhtiaq4gcDRjJTx3Q5M479-G9tmQ&s" alt="Opção 1 Imagem">
                Opção 1 [RAM 2024]
            </label>
            <label>
                <input type="radio" name="opcao" value="opcao2">
                <img src="https://s2-autoesporte.glbimg.com/bEz2Mo5Yf43MnjcrHh5BolVDwOc=/0x0:1169x778/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2023/P/W/bjT2Z0RtytJiSE0jNCBQ/porsche-911-gt3-rs-11428-1.jpg" alt="Opção 2 Imagem">
                Opção 2 [PORCHE GTS]
            </label>
            <label>
                <input type="radio" name="opcao" value="opcao3">                
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbZ3TzFBFtB2k5lkVLIWvnytC6ghQv9ZqoOg&s" alt="Opção 3 Imagem">
                Opção 3 [SIMPLES HILLUX]
            </label>
            <button type="submit">Enviar</button>
        </form>
    `;
    escolha.innerHTML = formulario;
    escolha.style.display = 'block';

    function enviarDados(opcao) {
        // Aqui você deve implementar a lógica para enviar os dados para sua API
        // Exemplo:
        fetch('/api/opcoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ opcao: opcao })
        })
        .then(response => {
            if (response.ok) {
                // A API respondeu com sucesso
                console.log('Dados enviados com sucesso!');
                // Você pode mostrar um alerta ou mensagem de sucesso para o usuário
            } else {
                // A API retornou um erro
                console.error('Erro ao enviar dados!');
                // Você pode mostrar um alerta ou mensagem de erro para o usuário
            }
        })
        .catch(error => {
            console.error('Erro de rede:', error);
            // Você pode mostrar um alerta ou mensagem de erro de rede para o usuário
        });
    }
}

const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // ou 'STARTTLS'
  auth: {
    user: 'kaike777k@gmail.com',
    pass: '123'
  }
});

// Função para enviar e-mail
function enviarEmail(opcao) {
  const mailOptions = {
    from: 'kaike777k@gmail.com',
    to: 'kaikemoura121@gmail.com',
    subject: 'Dados enviados com sucesso!',
    text: `Opção selecionada: ${opcao}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso!');
    }
  });
}

// Envie o e-mail após o envio dos dados
fetch('https://sua-api.com/dados', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ opcao: opcao })
})
.then(response => {
  if (response.ok) {
    enviarEmail(opcao);
  } else {
    console.error('Erro ao enviar dados!');
  }
})
.catch(error => {
  console.error('Erro de rede:', error);
});
