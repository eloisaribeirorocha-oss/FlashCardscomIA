document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('anoAtual').textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.style.display = window.scrollY > 500 ? 'block' : 'none';
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => el.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.2 });
  timelineItems.forEach(item => observer.observe(item));

  const personagens = [
    { nome: 'Boitatá', regiao: 'Sul', img: '🐍', origem: 'Mito indígena', descricao: 'Cobra de fogo que protege as matas.', curiosidade: 'Seus olhos brilham como fogo.' },
    { nome: 'Curupira', regiao: 'Norte', img: '🌳', origem: 'Guardião da floresta', descricao: 'Menino de cabelo vermelho e pés virados.', curiosidade: 'Engana caçadores com pegadas falsas.' },
    { nome: 'Iara', regiao: 'Norte', img: '🧜‍♀️', origem: 'Lenda indígena', descricao: 'Sereia que atrai pescadores com seu canto.', curiosidade: 'Conhecida como "mãe d\'água".' },
    { nome: 'Caipora', regiao: 'Centro-Oeste', img: '🐗', origem: 'Protetora da fauna', descricao: 'Índia que monta um porco-do-mato.', curiosidade: 'Adora fumo e cachaça.' },
    { nome: 'Vitória-Régia', regiao: 'Norte', img: '🌺', origem: 'Lenda tupi', descricao: 'Jovem índia transformada em flor.', curiosidade: 'Flor pode ter até 2 metros de diâmetro.' },
    { nome: 'Boto-cor-de-rosa', regiao: 'Norte', img: '🐬', origem: 'Lenda amazônica', descricao: 'Golfinho que vira homem e seduz moças.', curiosidade: 'Sempre usa chapéu para esconder o nariz.' },
    { nome: 'Mula sem Cabeça', regiao: 'Sudeste', img: '🐴', origem: 'Folclore colonial', descricao: 'Mula que solta fogo pelo pescoço.', curiosidade: 'É uma mulher que se relacionou com padre.' },
    { nome: 'Mapinguari', regiao: 'Norte', img: '🦥', origem: 'Lenda indígena', descricao: 'Criatura gigante com boca no ventre.', curiosidade: 'Dizem que é imune a balas.' },
    { nome: 'Pisadeira', regiao: 'Sul', img: '👻', origem: 'Lenda rural', descricao: 'Mulher de pés grandes que pisa no peito.', curiosidade: 'Ataca quem come antes de dormir.' },
    { nome: 'Negrinho do Pastoreio', regiao: 'Sul', img: '👦', origem: 'Lenda gaúcha', descricao: 'Menino escravizado que aparece montado.', curiosidade: 'Venerado como santo popular.' }
  ];

  const galeriaGrid = document.getElementById('galeriaGrid');
  personagens.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'card-personagem glass';
    card.innerHTML = `<div style="font-size:3.5rem;">${p.img}</div><h3>${p.nome}</h3><p style="font-size:0.8rem; color:#c9bfa0;">${p.regiao}</p><button class="btn-saiba" data-idx="${idx}">Saiba mais</button>`;
    galeriaGrid.appendChild(card);
  });

  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function abrirModal(idx) {
    const p = personagens[idx];
    modalContent.innerHTML = `<div style="text-align:center; font-size:3.5rem;">${p.img}</div><h2 style="color:#f5e7a3; text-align:center;">${p.nome}</h2><p><strong>Região:</strong> ${p.regiao}</p><p><strong>Origem:</strong> ${p.origem}</p><p><strong>Descrição:</strong> ${p.descricao}</p><p><strong>Curiosidade:</strong> ${p.curiosidade}</p><p style="margin-top:1rem; font-style:italic; border-top:1px solid #d4af37; padding-top:0.8rem;">📖 ${p.nome} reflete a diversidade do imaginário brasileiro.</p>`;
    modalOverlay.style.display = 'flex';
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-saiba')) {
      abrirModal(parseInt(e.target.dataset.idx));
    }
  });

  modalClose.addEventListener('click', () => modalOverlay.style.display = 'none');
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });

  const mapaInfo = document.getElementById('mapaInfo');
  const regioes = {
    norte: '🌿 Norte: Boitatá, Curupira, Iara, Vitória-Régia, Boto.',
    nordeste: '☀️ Nordeste: Saci-Pererê, Cuca, Lobisomem.',
    'centro-oeste': '🌾 Centro-Oeste: Caipora, Mula, Saci.',
    sudeste: '🏙️ Sudeste: Mula, Saci, Lobisomem, Cuca.',
    sul: '❄️ Sul: Negrinho, Pisadeira, Boitatá, Mula.'
  };
  document.querySelectorAll('.regiao').forEach(el => {
    el.addEventListener('click', () => {
      mapaInfo.textContent = regioes[el.dataset.regiao] || 'Lendas dessa região encantam o Brasil.';
    });
  });

  const perguntas = [
    { pergunta: 'Qual lenda é conhecida como "Mãe d\'Água"?', alternativas: ['Iara', 'Caipora', 'Cuca', 'Pisadeira'], correta: 0 },
    { pergunta: 'Qual personagem tem os pés virados para trás?', alternativas: ['Curupira', 'Saci', 'Mapinguari', 'Boitatá'], correta: 0 },
    { pergunta: 'O Boto-cor-de-rosa se transforma em:', alternativas: ['Homem', 'Mulher', 'Criança', 'Velho'], correta: 0 },
    { pergunta: 'Qual lenda é associada a uma flor gigante?', alternativas: ['Vitória-Régia', 'Iara', 'Caipora', 'Mula'], correta: 0 },
    { pergunta: 'A Mula sem Cabeça solta fogo pelo:', alternativas: ['Pescoço', 'Cauda', 'Olhos', 'Boca'], correta: 0 },
    { pergunta: 'Qual é o protetor da fauna e da mata?', alternativas: ['Caipora', 'Curupira', 'Boitatá', 'Negrinho'], correta: 0 },
    { pergunta: 'A Pisadeira ataca pessoas que:', alternativas: ['Comem antes de dormir', 'Andam à noite', 'Não rezam', 'Caçam'], correta: 0 },
    { pergunta: 'Mapinguari tem a boca no:', alternativas: ['Ventre', 'Pescoço', 'Costas', 'Cabeça'], correta: 0 },
    { pergunta: 'O Negrinho do Pastoreio é venerado no:', alternativas: ['Sul', 'Nordeste', 'Norte', 'Sudeste'], correta: 0 },
    { pergunta: 'Qual dessas é uma lenda de origem africana?', alternativas: ['Saci-Pererê', 'Iara', 'Curupira', 'Boitatá'], correta: 0 }
  ];

  let quizIndex = 0, acertos = 0;
  const quizContainer = document.getElementById('quizContainer');

  function renderQuiz() {
    if (quizIndex >= perguntas.length) {
      const msgs = ['🏆 Excelente! Mestre do folclore!', '🌟 Muito bem! Conhece bem as lendas.', '📖 Bom, pode aprender mais.', '📚 Explore mais o folclore!'];
      const msg = acertos >= 9 ? msgs[0] : acertos >= 6 ? msgs[1] : acertos >= 4 ? msgs[2] : msgs[3];
      quizContainer.innerHTML = `<div style="text-align:center;"><h3>Quiz finalizado!</h3><p>Acertou ${acertos} de ${perguntas.length}</p><p style="font-size:1.2rem;">${msg}</p><button class="btn-reiniciar" id="reiniciarQuiz">Jogar novamente</button></div>`;
      document.getElementById('reiniciarQuiz').addEventListener('click', reiniciarQuiz);
      return;
    }
    const q = perguntas[quizIndex];
    let html = `<div class="quiz-pergunta">${quizIndex+1}. ${q.pergunta}</div><div class="quiz-alternativas">`;
    q.alternativas.forEach((alt, idx) => html += `<div class="alternativa" data-idx="${idx}">${alt}</div>`);
    html += '</div>';
    quizContainer.innerHTML = html;
    document.querySelectorAll('.alternativa').forEach(el => {
      el.addEventListener('click', function() {
        const selecionada = parseInt(this.dataset.idx);
        if (selecionada === perguntas[quizIndex].correta) acertos++;
        quizIndex++;
        setTimeout(renderQuiz, 500);
      });
    });
  }

  function reiniciarQuiz() { quizIndex = 0; acertos = 0; renderQuiz(); }
  renderQuiz();

  const curiosidades = [
    'O Saci-Pererê tem origem tupi-guarani.',
    'Iara era um guerreiro indígena que virou sereia.',
    'Curupira protege árvores e animais.',
    'Vitória-Régia é a maior flor aquática do mundo.',
    'Boto-cor-de-rosa é símbolo da Amazônia.',
    'Mula sem Cabeça mistura religiosidade e medo.',
    'Negrinho do Pastoreio é celebrado em 14 de maio.',
    'Pisadeira assusta crianças gulosas.'
  ];
  const curiosidadesGrid = document.getElementById('curiosidadesGrid');
  curiosidades.forEach(texto => {
    const div = document.createElement('div');
    div.className = 'curio-item glass';
    div.textContent = texto;
    curiosidadesGrid.appendChild(div);
  });
});