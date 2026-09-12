// Bloqueio de F12
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

// ============================================================
// BANCO DE TMs REAIS DO JOGO (231 TMs)
// ============================================================
const TMS_RAW = `
Waterfall|water|f|80|100 ; Acid Spray|poison|e|40|100 ; Acrobatics|flying|f|55|100 ; Aerial Ace|flying|f|60|
Air Cutter|flying|e|60|95 ; Air Slash|flying|e|75|95 ; Alluring Voice|fairy|e|80|100 ; Assurance|dark|f|60|100
Aura Sphere|fighting|e|80| ; Avalanche|ice|f|60|100 ; Bite|dark|f|60|100 ; Blast Burn|fire|e|100|90
Blaze Kick|fire|f|85|90 ; Blizzard|ice|e|110|70 ; Body Press|fighting|f|80|100 ; Body Slam|normal|f|85|100
Bounce|flying|f|85|85 ; Brave Bird|flying|f|120|100 ; Breaking Swipe|dragon|f|60|100 ; Brick Break|fighting|f|75|100
Brine|water|e|65|100 ; Brutal Swing|dark|f|60|100 ; Bubble Beam|water|e|65|100 ; Bug Bite|bug|f|60|100
Bug Buzz|bug|e|90|100 ; Bulldoze|ground|f|60|100 ; Bullet Seed|grass|f|25|100 ; Burning Jealousy|fire|e|70|100
Charge Beam|electric|e|50|90 ; Chilling Water|water|e|50|100 ; Close Combat|fighting|f|120|100 ; Cross Poison|poison|f|70|100
Crunch|dark|f|80|100 ; Cut|normal|f|50|95 ; Dark Pulse|dark|e|80|100 ; Darkest Lariat|dark|f|85|100
Dazzling Gleam|fairy|e|80|100 ; Dig|ground|f|80|100 ; Disarming Voice|fairy|e|40| ; Dive|water|f|80|100
Double Edge|normal|f|120|100 ; Draco Meteor|dragon|e|130|90 ; Dragon Breath|dragon|e|60|100 ; Dragon Claw|dragon|f|80|100
Dragon Pulse|dragon|e|85|100 ; Dragon Rage|dragon|e||100 ; Dragon Tail|dragon|f|60|90 ; Drain Punch|fighting|f|75|100
Draining Kiss|fairy|e|50|100 ; Dream Eater|psychic|e|100|100 ; Drill Run|ground|f|80|95 ; Dual Wingbeat|flying|f|40|90
Dynamic Punch|fighting|f|100|50 ; Earth Power|ground|e|90|100 ; Earthquake|ground|f|100|100 ; Echoed Voice|normal|e|40|100
Egg Bomb|normal|f|100|75 ; Electroweb|electric|e|55|95 ; Energy Ball|grass|e|90|100 ; Expanding Force|psychic|e|80|100
Explosion|normal|f|250|100 ; Facade|normal|f|70|100 ; False Swipe|normal|f|40|100 ; Fire Blast|fire|e|110|85
Fire Fang|fire|f|65|95 ; Fire Pledge|fire|e|80|100 ; Fire Punch|fire|f|75|100 ; Fire Spin|fire|e|35|85
Fissure|ground|f||30 ; Flame Charge|fire|f|50|100 ; Flamethrower|fire|e|90|100 ; Flare Blitz|fire|f|120|100
Flash Cannon|steel|e|80|100 ; Flip Turn|water|f|60|100 ; Fly|flying|f|90|95 ; Focus Blast|fighting|e|120|70
Focus Punch|fighting|f|100|100 ; Foul Play|dark|f|95|100 ; Frenzy Plant|grass|e|100|90 ; Frost Breath|ice|e|60|90
Fury Cutter|bug|f|40|95 ; Future Sight|psychic|e|120|100 ; Giga Drain|grass|e|75|100 ; Giga Impact|normal|f|100|90
Grass Pledge|grass|e|80|100 ; Grassy Glide|grass|f|55|100 ; Gunk Shot|poison|f|120|80 ; Headbutt|normal|f|70|100
Heat Wave|fire|e|95|90 ; Hex|ghost|e|65|100 ; Hidden Power|normal|e|60|100 ; High Horsepower|ground|f|95|95
Horn Drill|normal|f||30 ; Hurricane|flying|e|110|70 ; Hydro Cannon|water|e|100|90 ; Hydro Pump|water|e|110|80
Hyper Beam|normal|e|100|90 ; Hyper Voice|normal|e|90|100 ; Ice Beam|ice|e|90|100 ; Ice Fang|ice|f|65|95
Ice Punch|ice|f|75|100 ; Ice Spinner|ice|f|80|100 ; Icicle Spear|ice|f|25|100 ; Icy Wind|ice|e|55|95
Incinerate|fire|e|60|100 ; Infestation|bug|e|20|100 ; Iron Head|steel|f|80|100 ; Iron Tail|steel|f|100|75
Knock Off|dark|f|65|100 ; Lash Out|dark|f|75|100 ; Leaf Blade|grass|f|90|100 ; Leaf Storm|grass|e|130|90
Leech Life|bug|f|80|100 ; Liquidation|water|f|85|100 ; Low Sweep|fighting|f|65|100 ; Lunge|bug|f|80|100
Magical Leaf|grass|e|60| ; Mega Drain|grass|e|40|100 ; Mega Kick|normal|f|120|75 ; Mega Punch|normal|f|80|85
Megahorn|bug|f|120|85 ; Metal Claw|steel|f|50|95 ; Meteor Beam|rock|e|120|90 ; Misty Explosion|fairy|e|100|100
Mud Shot|ground|e|55|95 ; Mud Slap|ground|e|20|100 ; Muddy Water|water|e|90|85 ; Mystical Fire|fire|e|75|100
Night Shade|ghost|e||100 ; Outrage|dragon|f|105|100 ; Overheat|fire|e|130|90 ; Pay Day|normal|f|40|100
Payback|dark|f|50|100 ; Petal Blizzard|grass|f|90|100 ; Phantom Force|ghost|f|90|100 ; Pin Missile|bug|f|25|95
Play Rough|fairy|f|90|90 ; Pluck|flying|f|60|100 ; Poison Jab|poison|f|80|100 ; Poison Tail|poison|f|50|100
Pollen Puff|bug|e|90|100 ; Poltergeist|ghost|f|110|90 ; Pounce|bug|f|50|100 ; Power Gem|rock|e|80|100
Power Up Punch|fighting|f|40|100 ; Power Whip|grass|f|120|85 ; Psybeam|psychic|e|65|100 ; Psychic|psychic|e|90|100
Psychic Fangs|psychic|f|85|100 ; Psychic Noise|psychic|e|75|100 ; Psycho Cut|psychic|f|70|100 ; Psyshock|psychic|e|80|100
Rage|normal|f|20|100 ; Razor Shell|water|f|75|95 ; Razor Wind|normal|e|80|100 ; Retaliate|normal|f|70|100
Revenge|fighting|f|60|100 ; Rock Blast|rock|f|25|90 ; Rock Climb|normal|f|90|85 ; Rock Slide|rock|f|75|90
Rock Smash|fighting|f|40|100 ; Rock Throw|rock|f|50|90 ; Rock Tomb|rock|f|60|95 ; Rollout|rock|f|30|90
Round|normal|e|60|100 ; Sand Tomb|ground|f|35|85 ; Scald|water|e|80|100 ; Scale Shot|dragon|f|25|90
Scorching Sands|ground|e|70|100 ; Secret Power|normal|f|70|100 ; Seed Bomb|grass|f|80|100 ; Seismic Toss|fighting|f||100
Selfdestruction|normal|f|200|100 ; Shadow Ball|ghost|e|80|100 ; Shadow Claw|ghost|f|70|100 ; Shock Wave|electric|e|60|
Silver Wind|bug|e|60|100 ; Skitter Smack|bug|f|70|90 ; Skull Bash|normal|f|130|100 ; Sky Attack|flying|f|100|90
Sky Drop|flying|f|60|100 ; Sludge Bomb|poison|e|90|100 ; Sludge Wave|poison|e|95|100 ; Smack Down|rock|f|50|100
Smart Strike|steel|f|70| ; Snarl|dark|e|55|95 ; Snore|normal|e|50|100 ; Solar Beam|grass|e|120|100
Solar Blade|grass|f|125|100 ; Steel Beam|steel|e|100|95 ; Steel Wing|steel|f|70|90 ; Stomping Tantrum|ground|f|75|100
Stone Edge|rock|f|100|80 ; Stored Power|psychic|e|20|100 ; Strength|normal|f|80|100 ; Struggle Bug|bug|e|50|100
Submission|fighting|f|80|80 ; Super Fang|normal|f||90 ; Supercell Slam|electric|f|100|95 ; Superpower|fighting|f|120|100
Surf|water|e|90|100 ; Swift|normal|e|60| ; Tail Slap|normal|f|25|85 ; Take Down|normal|f|90|85
Temper Flare|fire|f|75|100 ; Tera Blast|normal|e|80|100 ; Thief|dark|f|60|100 ; Throat Chop|dark|f|80|100
Thunder|electric|e|110|70 ; Thunder Fang|electric|f|65|95 ; Thunder Punch|electric|f|75|100 ; Thunderbolt|electric|e|90|100
Trailblaze|grass|f|50|100 ; Tri Attack|normal|e|80|100 ; Triple Axel|ice|f|20|90 ; U Turn|bug|f|70|100
Upper Hand|fighting|f|65|100 ; Uproar|normal|e|90|100 ; Vacuum Wave|fighting|e|40|100 ; Venoshock|poison|e|65|100
Volt Switch|electric|e|70|100 ; Water Gun|water|e|40|100 ; Water Pledge|water|e|80|100 ; Water Pulse|water|e|60|100
Waterfall|water|f|80|100 ; Weather Ball|normal|e|50|100 ; Whirlpool|water|e|35|85 ; Wild Charge|electric|f|90|100
X Scissor|bug|f|80|100 ; Zap Cannon|electric|e|120|50 ; Zen Headbutt|psychic|f|80|90
`;

const TMS_DISPONIVEIS = TMS_RAW
    .split(/[;\n]+/)
    .map(l => l.trim())
    .filter(l => l.length > 0 && l.includes('|'))
    .map(l => {
        const p = l.split('|');
        return {
            nome: p[0],
            tipo: p[1],
            categoria: p[2] === 'f' ? 'Físico' : 'Especial',
            poder: p[3] ? parseInt(p[3]) : null,
            precisao: p[4] ? parseInt(p[4]) : null
        };
    });

function getTMsRelevantes(tiposPokemon) {
    const tipos = (tiposPokemon || []).map(t => t.toLowerCase());
    const stab = TMS_DISPONIVEIS.filter(tm => tipos.includes(tm.tipo));
    const coberturaPop = ['fire','ice','electric','fighting','ground','dark','psychic','ghost','fairy','steel','rock','grass','water'];
    const cob = TMS_DISPONIVEIS.filter(tm => !tipos.includes(tm.tipo) && coberturaPop.includes(tm.tipo));
    return [...stab, ...cob];
}

function getTMsTextoPrompt(tiposPokemon, nomePokemon = '') {
    const tms = nomePokemon ? getTMsReaisDoPokemon(nomePokemon) : getTMsRelevantes(tiposPokemon);
    return tms.map(tm => `${tm.nome}(${typeNames[tm.tipo]||tm.tipo}/${tm.categoria}/${tm.poder||'—'})`).join(', ');
}

function getTMsReaisDoPokemon(nome) {
    const chave = normalizarNome(nome);
    const rawMoves = dadosCache[chave]?.raw?.moves || [];
    const maquinas = new Set(rawMoves
        .filter(m => (m.version_group_details || []).some(v => v.move_learn_method?.name === 'machine'))
        .map(m => normalizarNome(m.move?.name || '')));
    if (maquinas.size === 0) return getTMsRelevantes(getTiposSync(nome));
    return TMS_DISPONIVEIS.filter(tm => maquinas.has(normalizarNome(tm.nome)));
}

// Lista fechada de TMs reais do jogo, separada por Pokémon identificado.
// A IA não recebe uma lista global que possa misturar TMs entre espécies.
function getTMsTextoPorPokemon(nomesPokemon) {
    return (nomesPokemon || []).map(nome => {
        const tms = getTMsReaisDoPokemon(nome);
        const lista = tms.map(tm => `${tm.nome}(${typeNames[tm.tipo]||tm.tipo}/${tm.categoria}/${tm.poder||'—'})`).join(', ');
        return `${nome}: ${lista || 'nenhuma TM cadastrada'}`;
    }).join('\n');
}

// ============================================================
// MAPA DE NATUREZAS — qual stat sobe (+) e qual desce (-)
// HP nunca é afetado por natureza.
// ============================================================
const NATUREZAS_MAPA = {
    // +ATK
    'Adamant':  { sobe: 'atk', desce: 'spa' },
    'Naughty':  { sobe: 'atk', desce: 'spd' },
    'Brave':    { sobe: 'atk', desce: 'spe' },
    'Lonely':   { sobe: 'atk', desce: 'def' },
    // +DEF
    'Bold':     { sobe: 'def', desce: 'atk' },
    'Impish':   { sobe: 'def', desce: 'spa' },
    'Relaxed':  { sobe: 'def', desce: 'spe' },
    'Lax':      { sobe: 'def', desce: 'spd' },
    // +SpA
    'Modest':   { sobe: 'spa', desce: 'atk' },
    'Mild':     { sobe: 'spa', desce: 'def' },
    'Quiet':    { sobe: 'spa', desce: 'spe' },
    'Rash':     { sobe: 'spa', desce: 'spd' },
    // +SpD
    'Calm':     { sobe: 'spd', desce: 'atk' },
    'Gentle':   { sobe: 'spd', desce: 'def' },
    'Sassy':    { sobe: 'spd', desce: 'spe' },
    'Careful':  { sobe: 'spd', desce: 'spa' },
    // +SPE
    'Timid':    { sobe: 'spe', desce: 'atk' },
    'Hasty':    { sobe: 'spe', desce: 'def' },
    'Jolly':    { sobe: 'spe', desce: 'spa' },
    'Naive':    { sobe: 'spe', desce: 'spd' }
    // Neutras: Hardy, Docile, Serious, Bashful, Quirky → sem efeito
};

function getStatsDaNatureza(natureza) {
    if (!natureza) return { sobe: null, desce: null, neutra: true };
    const nat = NATUREZAS_MAPA[natureza] || null;
    if (!nat) return { sobe: null, desce: null, neutra: true };
    return { sobe: nat.sobe, desce: nat.desce, neutra: false };
}

// IV Efetivo e EV Efetiva sempre compartilham a mesma natureza-base.
// Quando a foto informa a natureza, ela é obrigatória e tem prioridade absoluta.
// A recomendação só é usada quando não existe natureza real informada.
function obterNaturezaEfetiva(prefixo, dados, naturezasRecomendadas) {
    const naturezaDaFoto = String(dados?.natureza || '').trim();
    if (naturezaDaFoto) return naturezaDaFoto;
    const lista = Array.isArray(naturezasRecomendadas)
        ? naturezasRecomendadas.map(n => String(n || '').trim()).filter(Boolean)
        : [];
    return lista[0] || '';
}

function labelsStats(k) {
    return {hp:'HP', atk:'ATK', def:'DEF', spa:'SpA', spd:'SpD', spe:'SPE'}[k] || k;
}

// ============================================================
// DICIONÁRIO PT -> EN DE MOVES
// ============================================================
const movesTraducaoPT_EN = {
    'jato de agua':'Water Gun','surf':'Surf','hidro bomba':'Hydro Pump','escaldar':'Scald',
    'psiquico':'Psychic','calmante':'Calm Mind','bola de fogo':'Fire Blast','lanca-chamas':'Flamethrower',
    'terremoto':'Earthquake','garra de dragao':'Dragon Claw','pulso de dragao':'Dragon Pulse',
    'danca dragao':'Dragon Dance','meteoro de dragao':'Draco Meteor','garra de sombra':'Shadow Claw',
    'bola de sombra':'Shadow Ball','raio gelado':'Ice Beam','nevasca':'Blizzard',
    'trovao':'Thunderbolt','trovoada':'Thunder','folha navalha':'Leaf Blade','tempestade de folhas':'Leaf Storm',
    'raio solar':'Solar Beam','gigadreno':'Giga Drain','recuperacao':'Recover','protetor':'Protect',
    'agilidade':'Agility','espada santa':'Sacred Sword','luta livre':'Close Combat','superpotencia':'Superpower',
    'ultraje':'Outrage','reviravolta':'U-turn','quebra-telha':'Brick Break','tempestade de areia':'Sandstorm'
};
const movesNomesOficiais = {};
async function buscarNomeOficialMove(nome) {
    const key = nome.toLowerCase().trim();
    if (movesNomesOficiais[key] !== undefined) return movesNomesOficiais[key];
    try {
        const slug = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
        const r = await fetch(`https://pokeapi.co/api/v2/move/${slug}`);
        if (r.ok) { const d = await r.json(); const n = d.name.split('-').map(p => p.charAt(0).toUpperCase()+p.slice(1)).join(' '); movesNomesOficiais[key] = n; return n; }
    } catch(e) {}
    movesNomesOficiais[key] = null;
    return null;
}
async function traduzirMoveParaIngles(move) {
    if (!move) return move;
    let original = move.trim().replace(/^[\s\-*•\d.]+/, '').trim();
    const chavePT = original.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');
    if (movesTraducaoPT_EN[chavePT]) return movesTraducaoPT_EN[chavePT];
    const nomeOficial = await buscarNomeOficialMove(original);
    if (nomeOficial) return nomeOficial;
    return original;
}
function efeitoTMEmPortugues(texto){
    const t=String(texto||'').trim();if(!t)return '';
    const mapa=[
      [/has a chance to lower the target's special defense by one stage\.?/i,'Tem chance de reduzir a Defesa Especial do alvo em um estágio.'],
      [/has a chance to lower the target's defense by one stage\.?/i,'Tem chance de reduzir a Defesa do alvo em um estágio.'],
      [/has a chance to lower the target's attack by one stage\.?/i,'Tem chance de reduzir o Ataque do alvo em um estágio.'],
      [/has a chance to burn the target\.?/i,'Tem chance de causar queimadura no alvo.'],
      [/has a chance to freeze the target\.?/i,'Tem chance de congelar o alvo.'],
      [/has a chance to paralyze the target\.?/i,'Tem chance de paralisar o alvo.'],
      [/inflicts regular damage and can hit dive users\.?/i,'Causa dano normal e também acerta usuários de Dive.'],
      [/inflicts regular damage/i,'Causa dano normal.'],
      [/can hit pokemon during their semi-invulnerable turn/i,'Pode atingir Pokémon durante o turno de semi-invulnerabilidade.'],
      [/the user takes recoil damage/i,'O usuário recebe dano de recuo.'],
      [/may cause the target to flinch/i,'Pode fazer o alvo recuar.'],
      [/may lower the target's/i,'Pode reduzir o atributo do alvo.']
    ];for(const [re,out] of mapa)if(re.test(t))return out;return t;
}

async function traduzirEfeitosTMsIA(tms){
    const pendentes=tms.filter(tm=>tm&&!tm.efeitoPt&&tm.efeito).slice(0,40);if(!pendentes.length)return tms;
    const chave=localStorage.getItem('geminiApiKey')||localStorage.getItem('apiKey')||document.getElementById('apiKeyInput')?.value?.trim()||document.getElementById('apiKeyInputPve')?.value?.trim();if(!chave)return tms;
    try{const modelo=localStorage.getItem('selectedModel')||localStorage.getItem('geminiModel')||document.getElementById('modelSelect')?.value||'gemini-3.5-flash-lite';const prompt=`Traduza para português do Brasil os efeitos oficiais das TMs abaixo. Mantenha os nomes das TMs exatamente em inglês. Retorne somente JSON em formato [{"nome":"TM em inglês","efeito":"tradução em português"}]. Não explique nada. Dados: ${JSON.stringify(pendentes.map(x=>({nome:x.nome,efeito:x.efeito})))}`;const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(chave)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0,maxOutputTokens:3000}})});if(!r.ok)return tms;let txt=(await r.json())?.candidates?.[0]?.content?.parts?.map(x=>x.text).join('')||'';txt=txt.replace(/^```json\s*/i,'').replace(/```$/,'').trim();const lista=JSON.parse(txt.match(/\[[\s\S]*\]/)?.[0]||txt);lista.forEach(x=>{const tm=tms.find(t=>t.nome.toLowerCase()===String(x.nome).toLowerCase());if(tm&&x.efeito)tm.efeitoPt=efeitoTMEmPortugues(x.efeito)});}catch(_){}return tms;
}

const TM_TYPE_LABELS_PT={water:'Água',poison:'Veneno',flying:'Voador',dark:'Sombrio',fighting:'Lutador',ice:'Gelo',fire:'Fogo',fairy:'Fada',normal:'Normal',bug:'Inseto',electric:'Elétrico',ground:'Terrestre',grass:'Grama',psychic:'Psíquico',dragon:'Dragão',ghost:'Fantasma',rock:'Pedra',steel:'Aço'};
const TM_CATEGORY_LABELS_PT={physical:'Físico',special:'Especial',status:'Status'};
async function renderTMCardsOficiais(container, nomes, titulo='TMs oficiais') {
    if (!container || !Array.isArray(nomes) || !nomes.length) return;
    const unicos=[...new Set(nomes.map(x=>String(x).trim().replace(/^TM\s+/i,'')).filter(nome=>TMS_DISPONIVEIS.some(tm=>tm.nome.toLowerCase()===nome.toLowerCase())))];
    const dados=await Promise.all(unicos.map(async nome=>{try{const slug=nome.toLowerCase().replace(/['’]/g,'').replace(/\s+/g,'-');const r=await fetch('https://pokeapi.co/api/v2/move/'+encodeURIComponent(slug));if(!r.ok)return null;const d=await r.json();const tm=TMS_DISPONIVEIS.find(x=>x.nome.toLowerCase()===nome.toLowerCase());if(!tm)return null;return {...tm,tipo:d.type?.name||tm.tipo,poder:d.power||tm.poder,precisao:d.accuracy||tm.precisao,efeito:(d.flavor_text_entries?.find(x=>x.language?.name==='pt-BR')?.flavor_text||d.flavor_text_entries?.find(x=>x.language?.name==='pt')?.flavor_text||d.effect_entries?.find(x=>x.language?.name==='en')?.short_effect||'').replace(/\s+/g,' ')};}catch(_){return null;}}));
    const validos=dados.filter(Boolean);if(!validos.length)return;validos.forEach(tm=>tm.efeito=efeitoTMEmPortugues(tm.efeito));await traduzirEfeitosTMsIA(validos);validos.forEach(tm=>{if(!tm.efeitoPt)tm.efeitoPt=efeitoTMEmPortugues(tm.efeito)});
    const box=document.createElement('section');box.className='tm-official-panel';box.innerHTML=`<h4><i class="fas fa-compact-disc"></i> ${titulo}</h4><div class="tm-grid">${validos.map(tm=>{const tipo=tm.tipo||'normal';const tipoPt=TM_TYPE_LABELS_PT[tipo]||tipo;const categoriaPt=TM_CATEGORY_LABELS_PT[tm.categoria]||tm.categoria||'TM';return `<div class="tm-card"><div class="tm-card-head"><img class="tm-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${tipo}.png" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'" alt=""><div class="tm-card-top"><span class="tm-type tm-${tipo}">${tipoPt}</span><span class="tm-category">${categoriaPt}</span></div></div><div class="tm-name">${tm.nome}</div><div class="tm-meta"><span><b>${tm.poder||'—'}</b> poder</span><span><b>${tm.precisao||'—'}</b> precisão</span></div>${(tm.efeitoPt||tm.efeito)?`<small class="tm-effect"><b>Efeito oficial:</b> ${tm.efeitoPt||tm.efeito}</small>`:''}</div>`}).join('')}</div>`;container.appendChild(box);
}
async function renderTMsDosPokemons(container, nomesPokemons, titulo='TMs oficiais por Pokémon') {
    const nomes=[...new Set((nomesPokemons||[]).map(x=>String(x).trim()).filter(Boolean))];const moves=new Set();
    for(const nome of nomes){try{const r=await fetch('https://pokeapi.co/api/v2/pokemon/'+encodeURIComponent(nome.toLowerCase().replace(/\s+/g,'-')));if(!r.ok)continue;const d=await r.json();(d.moves||[]).filter(x=>(x.version_group_details||[]).some(v=>v.move_learn_method?.name==='machine')).forEach(x=>moves.add(x.move.name.replace(/-/g,' ')));}catch(_){} }
    await renderTMCardsOficiais(container,[...moves],titulo);
}

async function traduzirListaMoves(texto) {
    const linhas = texto.split('\n').filter(l => l.trim());
    const traduzidos = [];
    for (const linha of linhas) {
        let m = linha.replace(/^[\s\-*•\d.]+/, '').trim();
        if (m.length > 0) {
            const partes = m.split(',').map(p => p.trim()).filter(Boolean);
            for (const parte of partes) { const trad = await traduzirMoveParaIngles(parte); if (trad) traduzidos.push(trad); }
        }
    }
    return traduzidos;
}

// ============================================================
// SISTEMA DE PONTOS EV
// ============================================================
const MAX_PONTOS_POR_STAT = 26;
const MAX_PONTOS_TOTAL = 51;
const PONTOS_PARA_EV = 10;
const MAX_EV_POR_STAT = 252;
function pontosParaEVs(pontos) { return Math.min(pontos * PONTOS_PARA_EV, MAX_EV_POR_STAT); }
function evsParaPontos(evs) { if (evs >= MAX_EV_POR_STAT) return MAX_PONTOS_POR_STAT; return Math.min(Math.round(evs / PONTOS_PARA_EV), MAX_PONTOS_POR_STAT); }
function atualizarContadorEV() {
    const keys = ['hp','atk','def','spa','spd','spe'];
    let totalPontos = 0;
    for (const k of keys) { const input = document.getElementById(`ev-input-${k}`); if (input) totalPontos += parseInt(input.value) || 0; }
    const elUsed = document.getElementById('evUsedPoints');
    const elFill = document.getElementById('evCounterFill');
    if (elUsed) elUsed.textContent = totalPontos;
    if (elFill) { const pct = Math.min((totalPontos / MAX_PONTOS_TOTAL) * 100, 100); elFill.style.width = pct + '%'; }
}
function aplicarLimitePontos(statAlterado) {
    const keys = ['hp','atk','def','spa','spd','spe'];
    const valores = {}; let total = 0;
    for (const k of keys) { const input = document.getElementById(`ev-input-${k}`); valores[k] = parseInt(input?.value) || 0; total += valores[k]; }
    if (total > MAX_PONTOS_TOTAL) {
        const excesso = total - MAX_PONTOS_TOTAL;
        const inputAlt = document.getElementById(`ev-input-${statAlterado}`);
        if (inputAlt) { const novo = Math.max(0, valores[statAlterado] - excesso); inputAlt.value = novo; }
    }
    atualizarContadorEV();
}

const baseStatsTabela = {
    'flygon':{hp:100,atk:100,def:80,spa:80,spd:80,spe:100},'garchomp':{hp:108,atk:130,def:95,spa:80,spd:85,spe:102},
    'dragonite':{hp:91,atk:134,def:95,spa:100,spd:100,spe:80},'salamence':{hp:95,atk:135,def:80,spa:110,spd:80,spe:100},
    'tyranitar':{hp:100,atk:134,def:110,spa:95,spd:100,spe:61},'metagross':{hp:80,atk:135,def:130,spa:95,spd:90,spe:70},
    'pikachu':{hp:35,atk:55,def:40,spa:50,spd:50,spe:90},'charizard':{hp:78,atk:84,def:78,spa:109,spd:85,spe:100},
    'blaziken':{hp:80,atk:120,def:70,spa:110,spd:70,spe:80},'swampert':{hp:100,atk:110,def:90,spa:85,spd:90,spe:60},
    'gardevoir':{hp:68,atk:65,def:65,spa:125,spd:115,spe:80},'gengar':{hp:60,atk:65,def:60,spa:130,spd:75,spe:110},
    'mewtwo':{hp:106,atk:110,def:90,spa:154,spd:90,spe:130},'slowbro':{hp:95,atk:75,def:110,spa:100,spd:80,spe:30},
    'rhyperior':{hp:115,atk:140,def:130,spa:55,spd:55,spe:40},'mr. mime':{hp:40,atk:45,def:65,spa:100,spd:120,spe:90},
    'aggron':{hp:70,atk:110,def:180,spa:60,spd:60,spe:50},'suicune':{hp:100,atk:75,def:115,spa:90,spd:115,spe:85},
    'darkrai':{hp:70,atk:90,def:90,spa:135,spd:90,spe:125},'mew':{hp:100,atk:100,def:100,spa:100,spd:100,spe:100},
    'gyarados':{hp:95,atk:125,def:79,spa:60,spd:100,spe:81}
};
const typeEffectiveness = {
    'normal':{'rock':0.5,'ghost':0,'steel':0.5},'fire':{'fire':0.5,'water':0.5,'grass':2,'ice':2,'bug':2,'rock':0.5,'dragon':0.5,'steel':2},
    'water':{'fire':2,'water':0.5,'grass':0.5,'ground':2,'rock':2,'dragon':0.5},'grass':{'fire':0.5,'water':2,'grass':0.5,'poison':0.5,'ground':2,'flying':0.5,'bug':0.5,'rock':2,'dragon':0.5,'steel':0.5},
    'electric':{'water':2,'electric':0.5,'grass':0.5,'ground':0,'flying':2,'dragon':0.5},'ice':{'fire':0.5,'water':0.5,'grass':2,'ice':0.5,'ground':2,'flying':2,'dragon':2,'steel':0.5},
    'fighting':{'normal':2,'ice':2,'poison':0.5,'flying':0.5,'psychic':0.5,'bug':0.5,'rock':2,'ghost':0,'dark':2,'steel':0.5,'fairy':0.5},
    'poison':{'poison':0.5,'ground':0.5,'rock':0.5,'ghost':0.5,'steel':0,'fairy':2},
    'ground':{'fire':2,'grass':0.5,'electric':2,'poison':2,'flying':0,'bug':0.5,'rock':2,'steel':2},
    'flying':{'grass':2,'electric':0.5,'fighting':2,'bug':2,'rock':0.5,'steel':0.5},
    'psychic':{'fighting':2,'psychic':0.5,'steel':0.5,'dark':0},
    'bug':{'fire':0.5,'grass':2,'fighting':0.5,'poison':0.5,'flying':0.5,'psychic':2,'ghost':0.5,'dark':2,'steel':0.5,'fairy':0.5},
    'rock':{'fire':2,'ice':2,'fighting':0.5,'ground':0.5,'flying':2,'bug':2,'steel':0.5},
    'ghost':{'normal':0,'psychic':2,'ghost':2,'dark':0.5},
    'dragon':{'dragon':2,'steel':0.5,'fairy':0},
    'dark':{'fighting':0.5,'psychic':2,'ghost':2,'dark':0.5,'fairy':0.5},
    'steel':{'fire':0.5,'water':0.5,'electric':0.5,'ice':2,'rock':2,'steel':0.5,'fairy':2},
    'fairy':{'fire':0.5,'fighting':2,'poison':0.5,'steel':0.5,'dark':2,'dragon':2}
};
const typeNames = {normal:'Normal',fire:'Fogo',water:'Água',grass:'Planta',electric:'Elétrico',ice:'Gelo',fighting:'Lutador',poison:'Veneno',ground:'Terra',flying:'Voador',psychic:'Psíquico',bug:'Inseto',rock:'Pedra',ghost:'Fantasma',dragon:'Dragão',dark:'Sombrio',steel:'Aço',fairy:'Fada'};
const dadosCache = {};
const movesCache = {};

function normalizarNome(nome) { return String(nome).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.\s_]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,''); }
function formatMoveName(nome) { return nome.split('-').map(p => p.charAt(0).toUpperCase()+p.slice(1)).join(' '); }
async function getMoveDetails(url) {
    if (movesCache[url]) return movesCache[url];
    try {
        const r = await fetch(url);
        if (r.ok) { const d = await r.json(); movesCache[url] = { name:d.name, type:d.type?.name||'normal', power:d.power||0, damageClass:d.damage_class?.name||'status', accuracy:d.accuracy }; return movesCache[url]; }
    } catch(e) {}
    return null;
}
async function buscarDadosPokemon(nome) {
    const n = normalizarNome(nome);
    if (dadosCache[n]?.sprite && dadosCache[n]?.moves?.length) return dadosCache[n];
    const variacoes = [n, n.replace(/-/g,''), n.split('-')[0]];
    for (const v of variacoes) {
        if (dadosCache[v]?.sprite && dadosCache[v]?.moves?.length) { dadosCache[n] = dadosCache[v]; return dadosCache[v]; }
        try {
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${v}`);
            if (resp.ok) {
                const data = await resp.json();
                const tipos = data.types.map(t => t.type.name);
                const sprite = data.sprites?.front_default || data.sprites?.other?.['official-artwork']?.front_default || null;
                const todasMoves = (data.moves || []).slice(0, 120);
                const moveDetails = await Promise.all(todasMoves.map(m => getMoveDetails(m.move.url)));
                let filtrados = moveDetails.filter(m => m && m.power && m.power > 0);
                filtrados.sort((a, b) => {
                    const aStab = tipos.includes(a.type) ? 1 : 0;
                    const bStab = tipos.includes(b.type) ? 1 : 0;
                    if (aStab !== bStab) return bStab - aStab;
                    return b.power - a.power;
                });
                const variados = []; const contTipo = {};
                for (const m of filtrados) { contTipo[m.type] = (contTipo[m.type] || 0) + 1; if (contTipo[m.type] <= 2) { variados.push(m); if (variados.length >= 8) break; } }
                const entrada = { types: tipos, sprite, moves: variados, raw: data };
                dadosCache[n] = entrada; dadosCache[v] = entrada;
                return entrada;
            }
        } catch(e) {}
    }
    if (dadosCache[n]) return dadosCache[n];
    dadosCache[n] = { types:['desconhecido'], sprite:null, moves:[], raw:null };
    return dadosCache[n];
}
async function precarregarDados(lista) { await Promise.all(lista.map(p => buscarDadosPokemon(p))); }
function getTiposSync(n) { const k = normalizarNome(n); return dadosCache[k]?.types || ['desconhecido']; }
function getSpriteSync(n) { const k = normalizarNome(n); return dadosCache[k]?.sprite || null; }
function getMovesSync(n) { const k = normalizarNome(n); return dadosCache[k]?.moves || []; }
function tipoClass(t) { return 'tipo-'+(t||'desconhecido').toLowerCase(); }
function calcMoveEffectiveness(moveType, defTypes) { let m=1; for (const t of defTypes) m *= typeEffectiveness[moveType]?.[t] ?? 1; return m; }
function effLabel(mult) {
    if (mult === 0) return { text:'Imune', cls:'eff-immune' };
    if (mult <= 0.25) return { text:'Muito pouco efetivo', cls:'eff-very-low' };
    if (mult < 1) return { text:'Pouco efetivo (0.5x)', cls:'eff-low' };
    if (mult === 1) return { text:'Neutro', cls:'eff-neutral' };
    if (mult < 4) return { text:'Super efetivo (2x)', cls:'eff-super' };
    return { text:'Extremamente efetivo (4x)', cls:'eff-ultra' };
}
async function carregarSpritesTierList() {
    const tags = document.querySelectorAll('.poke-tag[data-poke]');
    await Promise.all([...tags].map(async tag => {
        if (tag.querySelector('.poke-sprite')) return;
        const d = await buscarDadosPokemon(tag.dataset.poke);
        if (d.sprite) {
            const img = document.createElement('img');
            img.src = d.sprite; img.alt = tag.dataset.poke; img.className = 'poke-sprite'; img.loading = 'lazy';
            img.onerror = () => img.style.display = 'none';
            tag.insertBefore(img, tag.firstChild);
        }
    }));
}

// ============================================================
// SISTEMA DE AVALIAÇÃO DE IV
// ============================================================
let naturezasRecomendadasPvp = [];
let naturezasRecomendadasPve = [];

function calcularTotalIV(ivs) {
    if (!ivs) return 0;
    return ['hp','atk','def','spa','spd','spe'].reduce((a, k) => a + (parseInt(ivs[k]) || 0), 0);
}

function avaliarIV(ivs) {
    const totalIV = calcularTotalIV(ivs);
    const maxIV = 31 * 6;
    const percentual = (totalIV / maxIV) * 100;
    let classificacao, cor, icone, recomendacao;
    if (totalIV >= 160) { classificacao = 'Excelente'; cor = '#22c55e'; icone = 'fa-crown'; recomendacao = 'Vale MUITO a pena upar!'; }
    else if (totalIV >= 130) { classificacao = 'Muito Bom'; cor = '#84cc16'; icone = 'fa-star'; recomendacao = 'Vale a pena upar.'; }
    else if (totalIV >= 100) { classificacao = 'Bom'; cor = '#f59e0b'; icone = 'fa-thumbs-up'; recomendacao = 'Já começa a ficar bom — vale upar!'; }
    else if (totalIV >= 60) { classificacao = 'Equilibrando'; cor = '#f97316'; icone = 'fa-balance-scale'; recomendacao = 'Abaixo de 100 — ainda está se equilibrando.'; }
    else { classificacao = 'Ruim'; cor = '#ef4444'; icone = 'fa-times-circle'; recomendacao = 'NÃO vale a pena upar. Procure outro.'; }
    return { totalIV, maxIV, percentual, classificacao, cor, icone, recomendacao };
}

function avaliarIVIndividual(valor) {
    if (valor === null || valor === undefined || valor === '') return { status: 'Não lido', cor: '#64748b', icone: 'fa-question' };
    const v = parseInt(valor);
    if (!Number.isFinite(v)) return { status: 'Não lido', cor: '#64748b', icone: 'fa-question' };
    if (v >= 28) return { status: 'Perfeito', cor: '#22c55e', icone: 'fa-star' };
    if (v >= 24) return { status: 'Ótimo', cor: '#84cc16', icone: 'fa-thumbs-up' };
    if (v >= 18) return { status: 'Bom', cor: '#f59e0b', icone: 'fa-check' };
    if (v >= 12) return { status: 'Médio', cor: '#f97316', icone: 'fa-minus' };
    return { status: 'Ruim', cor: '#ef4444', icone: 'fa-times' };
}

function natureEstaRecomendada(naturezaAtual, listaRecomendadas) {
    if (!naturezaAtual || !listaRecomendadas || listaRecomendadas.length === 0) return null;
    const natAtual = naturezaAtual.toLowerCase().trim();
    return listaRecomendadas.some(n => {
        const nNorm = (n || '').toLowerCase().trim();
        return nNorm === natAtual || nNorm.includes(natAtual) || natAtual.includes(nNorm);
    });
}

function renderAvaliacaoIV(prefixo, dados, naturezasRecomendadas, contexto) {
    const container = document.getElementById('ivEvaluation' + prefixo);
    if (!container) return;
    const totalIV = calcularTotalIV(dados.ivs);
    if (totalIV === 0) { container.classList.remove('visivel'); return; }

    const av = avaliarIV(dados.ivs);
    const labels = {hp:'HP', atk:'ATK', def:'DEF', spa:'SpA', spd:'SpD', spe:'SPE'};
    const statKeys = ['hp','atk','def','spa','spd','spe'];

    let gridHtml = '';
    for (const k of statKeys) {
        const v = dados.ivs[k];
        const ind = avaliarIVIndividual(v);
        gridHtml += `<div class="iv-eval-item" style="border-left-color:${ind.cor};">
            <span class="iv-eval-item-name">${labels[k]}</span>
            <span class="iv-eval-item-value">${v === null || v === undefined ? '—' : v}<small>${v === null || v === undefined ? '' : '/31'}</small></span>
            <span class="iv-eval-item-status" style="background:${ind.cor}22; color:${ind.cor};">${ind.status}</span>
        </div>`;
    }

    const iconEl = document.getElementById('ivEvalIcon' + prefixo);
    if (iconEl) iconEl.innerHTML = `<i class="fas ${av.icone}"></i>`;
    if (iconEl) iconEl.style.background = `linear-gradient(135deg, ${av.cor}, ${av.cor}cc)`;

    const subtitleEl = document.getElementById('ivEvalSubtitle' + prefixo);
    if (subtitleEl) {
        const ctx = contexto === 'pvp' ? 'PvP' : 'PvE';
        subtitleEl.textContent = `${av.classificacao} · Análise ${ctx} · ${av.percentual.toFixed(0)}% do máximo (${av.maxIV})`;
    }

    const totalEl = document.getElementById('ivEvalTotal' + prefixo);
    if (totalEl) totalEl.innerHTML = `${av.totalIV}<small>/${av.maxIV}</small>`;

    const fillEl = document.getElementById('ivEvalPercentFill' + prefixo);
    if (fillEl) {
        fillEl.style.width = av.percentual + '%';
        fillEl.style.background = `linear-gradient(90deg, ${av.cor}, ${av.cor}aa)`;
    }

    const gridEl = document.getElementById('ivEvalGrid' + prefixo);
    if (gridEl) gridEl.innerHTML = gridHtml;

    const vereditoEl = document.getElementById('ivEvalVeredito' + prefixo);
    const naturezaOk = natureEstaRecomendada(dados.natureza, naturezasRecomendadas);

    let vereditoTxt, vereditoCor, vereditoIcone;
    if (av.totalIV < 100) {
        vereditoTxt = `<div><strong>⚖️ EQUILIBRANDO (${av.totalIV}/186)</strong> — IV abaixo de 100, ainda não está bom.</div>`;
        vereditoCor = '#f97316'; vereditoIcone = 'fa-balance-scale';
    } else if (naturezaOk === false) {
        vereditoTxt = `<div><strong>⚠️ IV BOM, MAS NATUREZA INCORRETA!</strong> — IV ${av.totalIV}/186, natureza <strong>${dados.natureza || '?'}</strong> não ideal.</div>`;
        vereditoCor = '#f97316'; vereditoIcone = 'fa-exclamation-triangle';
    } else if (naturezaOk === true) {
        vereditoTxt = `<div><strong>✅ VALE A PENA UPAR!</strong> — IV ${av.classificacao} (<strong>${av.totalIV}/186</strong>) e natureza <strong>${dados.natureza}</strong> correta.</div>`;
        vereditoCor = '#22c55e'; vereditoIcone = 'fa-check-circle';
    } else {
        vereditoTxt = `<div><strong>👍 IV ${av.classificacao} (${av.totalIV}/186)</strong> — Natureza <strong>${dados.natureza || 'atual'}</strong> a confirmar.</div>`;
        vereditoCor = '#f59e0b'; vereditoIcone = 'fa-thumbs-up';
    }
    if (vereditoEl) {
        vereditoEl.innerHTML = `<i class="fas ${vereditoIcone}" style="color:${vereditoCor};"></i> ${vereditoTxt}`;
        vereditoEl.style.background = `linear-gradient(135deg, ${vereditoCor}1a, ${vereditoCor}08)`;
        vereditoEl.style.border = `2px solid ${vereditoCor}66`;
        vereditoEl.style.color = '#0f172a';
    }

    container.classList.add('visivel');
}

// ============================================================
// IV EFETIVO — Análise pelos stats da natureza recomendada
// ============================================================
async function gerarIVEfetivo(prefixo, dados, naturezasRecomendadas, contexto) {
    const container = document.getElementById('ivEfetivo' + prefixo);
    if (!container) return;

    const scoreEl = document.getElementById('ivEfetivoScore' + prefixo);
    const fillEl = document.getElementById('ivEfetivoFill' + prefixo);
    const bodyEl = document.getElementById('ivEfetivoBody' + prefixo);
    const statsEl = document.getElementById('ivEfetivoStatsUsados' + prefixo);
    const iconEl = document.getElementById('ivEfetivoIcon' + prefixo);
    const btnEl = document.getElementById('btnGerarIvEfetivo' + prefixo);

    if (!apiKey) {
        if (bodyEl) bodyEl.innerHTML = '⚠️ Configure sua chave API primeiro.';
        if (btnEl) { btnEl.disabled = false; btnEl.innerHTML = '<i class="fas fa-magic"></i> Gerar IV Efetivo com IA'; }
        return;
    }

    if (scoreEl) scoreEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    if (fillEl) fillEl.style.width = '0%';
    if (bodyEl) bodyEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando IV apenas nos stats da natureza recomendada...';
    if (statsEl) statsEl.innerHTML = '';
    if (iconEl) iconEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    if (btnEl) { btnEl.disabled = true; btnEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...'; }

    // IV e EV usam exatamente a mesma natureza de referência.
    const naturezaRecomendada = obterNaturezaEfetiva(prefixo, dados, naturezasRecomendadas);

    const natInfo = getStatsDaNatureza(naturezaRecomendada);

    // Stats a analisar: HP + stat que a natureza SOBE + (stat reduzido NÃO conta)
    const statsUsados = ['hp'];
    if (natInfo.sobe) statsUsados.push(natInfo.sobe);
    // Se a natureza é neutra, cai no papel do Pokémon
    if (natInfo.neutra) {
        const b = dados.baseStats || {};
        if ((b.atk || 0) >= (b.spa || 0)) statsUsados.push('atk'); else statsUsados.push('spa');
        if ((b.spe || 0) >= 80) statsUsados.push('spe');
    }

    const statKeys = ['hp','atk','def','spa','spd','spe'];
    const labels = {hp:'HP', atk:'ATK', def:'DEF', spa:'SpA', spd:'SpD', spe:'SPE'};
    const baseStats = dados.baseStats || {};
    const ivs = dados.ivs || {};
    const tipos = getTiposSync(dados.nome) || [];
    const nomesTipos = tipos.map(t => typeNames[t] || t).join('/');

    const ivsTexto = statKeys.map(k => `${labels[k]}: ${ivs[k] === null || ivs[k] === undefined ? 'não lido' : `${ivs[k]}/31`}`).join(' · ');
    const baseTexto = statKeys.map(k => `${labels[k]}: ${baseStats[k] || 0}`).join(' · ');

    const statsUsadosNomes = statsUsados.map(k => labels[k]).join(', ');
    const statsIgnoradosNomes = statKeys.filter(k => !statsUsados.includes(k)).map(k => labels[k]).join(', ');

const prompt = `Você é especialista em Pokémon competitivo. Calcule o IV EFETIVO deste Pokémon.

CONCEITO: IV Efetivo avalia SOMENTE os stats que a natureza recomendada realmente beneficia.

NATUREZA DA FOTO — USO OBRIGATÓRIO: ${naturezaRecomendada || 'não lida'}\n- NÃO substitua esta natureza por outra recomendada.
- ESTA natureza SOBE: ${natInfo.sobe ? labels[natInfo.sobe] : 'nenhum (neutra)'}
- ESTA natureza REDUZ: ${natInfo.desce ? labels[natInfo.desce] : 'nenhum (neutra)'}
- HP NUNCA é afetado por natureza — mas é SEMPRE relevante

STATS QUE VOCÊ DEVE ANALISAR: ${statsUsadosNomes}
STATS QUE VOCÊ DEVE IGNORAR: ${statsIgnoradosNomes}

DADOS:
- Nome: ${dados.nome}
- Tipos: ${nomesTipos}
- IVs: ${ivsTexto}
- Base Stats: ${baseTexto}
- Total IV: ${calcularTotalIV(ivs)}/186
- Contexto: ${contexto === 'pvp' ? 'PvP' : 'PvE'}

TAREFA:
1. Analise APENAS os stats: ${statsUsadosNomes}
2. IGNORE totalmente: ${statsIgnoradosNomes}
3. Use SOMENTE os valores de IV informados acima. NÃO use EVs, status atuais ou qualquer valor inventado.
4. Dê uma nota 0 a 10 para o IV EFETIVO baseada SOMENTE nos IVs dos stats analisados
5. Se um stat ignorado estiver baixo, NÃO penalize

RESPONDA APENAS JSON VÁLIDO:
{
  "nota": 8.5,
  "stats_relevantes": ["${statsUsados.map(k => labels[k]).join('", "')}"],
  "stats_ignorados": ["${statKeys.filter(k => !statsUsados.includes(k)).map(k => labels[k]).join('", "')}"],
  "veredito": "Frase curta",
  "explicacao": "Explicação em 2-3 linhas citando apenas os stats analisados."
}`;

    try {
        const modeloEl = (contexto === 'pve') ? modelSelectPve : modelSelect;
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modeloEl.value}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!r.ok) throw new Error('Erro na API');
        const data = await r.json();
        let texto = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
        texto = texto.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        const match = texto.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('Resposta inválida');
        const json = JSON.parse(match[0]);
        aplicarIVEfetivo(prefixo, json, naturezaRecomendada, natInfo);
    } catch (e) {
        if (bodyEl) bodyEl.innerHTML = `<span style="color:#991b1b;">❌ Erro: ${e.message}</span>`;
        if (iconEl) iconEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    } finally {
        if (btnEl) { btnEl.disabled = false; btnEl.innerHTML = '<i class="fas fa-magic"></i> Recalcular IV Efetivo'; }
    }
}

function aplicarIVEfetivo(prefixo, json, naturezaRecomendada, natInfo) {
    const container = document.getElementById('ivEfetivo' + prefixo);
    if (!container) return;

    let nota = Math.max(0, Math.min(10, parseFloat(json.nota) || 0));
    const scoreEl = document.getElementById('ivEfetivoScore' + prefixo);
    const fillEl = document.getElementById('ivEfetivoFill' + prefixo);
    const bodyEl = document.getElementById('ivEfetivoBody' + prefixo);
    const statsEl = document.getElementById('ivEfetivoStatsUsados' + prefixo);
    const iconEl = document.getElementById('ivEfetivoIcon' + prefixo);

    let cor, grad, label, icone;
    if (nota >= 9)      { cor = '#22c55e'; grad = 'linear-gradient(135deg,#22c55e,#16a34a)'; label = 'CLASSE S';   icone = 'fa-crown'; }
    else if (nota >= 7) { cor = '#84cc16'; grad = 'linear-gradient(135deg,#84cc16,#65a30d)'; label = 'BOM';        icone = 'fa-star'; }
    else if (nota >= 5) { cor = '#f59e0b'; grad = 'linear-gradient(135deg,#f59e0b,#d97706)'; label = 'MÉDIO';      icone = 'fa-thumbs-up'; }
    else if (nota >= 3) { cor = '#f97316'; grad = 'linear-gradient(135deg,#f97316,#ea580c)'; label = 'PÉSSIMO';    icone = 'fa-meh'; }
    else                { cor = '#ef4444'; grad = 'linear-gradient(135deg,#ef4444,#dc2626)'; label = 'MUITO RUIM'; icone = 'fa-times-circle'; }

    if (scoreEl) { scoreEl.innerHTML = `${nota.toFixed(1)}<small>/10</small>`; scoreEl.style.color = cor; scoreEl.style.borderColor = cor; }
    if (fillEl) { fillEl.style.background = grad; setTimeout(() => { fillEl.style.width = (nota * 10) + '%'; }, 100); }
    if (iconEl) { iconEl.style.background = grad; iconEl.innerHTML = `<i class="fas ${icone}"></i>`; }

    if (statsEl) {
        const relevantes = (json.stats_relevantes || []).filter(s => s);
        const ignorados = (json.stats_ignorados || []).filter(s => s);
        let html = '';
        // Marca a natureza aplicada
        html += `<span class="stat-usado-badge" style="background:${cor}22;border-color:${cor};color:${cor};"><i class="fas fa-leaf"></i> Natureza: ${naturezaRecomendada || '—'}</span>`;
        relevantes.forEach(s => { html += `<span class="stat-usado-badge"><i class="fas fa-check-circle" style="color:${cor};"></i> ${s}</span>`; });
        ignorados.forEach(s => { html += `<span class="stat-ignorado-badge">${s}</span>`; });
        statsEl.innerHTML = html;
    }

    if (bodyEl) {
        bodyEl.innerHTML = `
            <div class="iv-efetivo-veredito">
                <i class="fas ${icone}" style="color:${cor};font-size:1.3rem;"></i>
                <strong style="color:${cor};">${label}</strong>
                <span style="color:${cor};font-size:1.3rem;font-weight:900;">${nota.toFixed(1)}/10</span>
            </div>
            <div style="font-weight:900;color:#86198f;font-size:0.9rem;margin-bottom:0.3rem;">${json.veredito || ''}</div>
            <div class="iv-efetivo-explicacao" style="color:#0f172a;font-weight:600;">${(json.explicacao || '').replace(/\n/g, '<br>')}</div>
        `;
    }

    if (container) container.style.borderColor = cor + '99';
}

// ============================================================
// EV EFETIVA — Análise pelos stats da natureza recomendada
// ============================================================
async function gerarEVEfetiva(prefixo, dados, naturezasRecomendadas, contexto) {
    const container = document.getElementById('evEfetiva' + prefixo);
    if (!container) return;

    const scoreEl = document.getElementById('evEfetivaScore' + prefixo);
    const fillEl = document.getElementById('evEfetivaFill' + prefixo);
    const bodyEl = document.getElementById('evEfetivaBody' + prefixo);
    const statsEl = document.getElementById('evEfetivaStats' + prefixo);
    const iconEl = document.getElementById('evEfetivaIcon' + prefixo);
    const btnEl = document.getElementById('btnGerarEVEfetiva' + prefixo);

    if (!apiKey) {
        if (bodyEl) bodyEl.innerHTML = '⚠️ Configure sua chave API primeiro.';
        if (btnEl) { btnEl.disabled = false; btnEl.innerHTML = '<i class="fas fa-magic"></i> Gerar EV Efetiva com IA'; }
        return;
    }

    if (scoreEl) scoreEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    if (fillEl) fillEl.style.width = '0%';
    if (bodyEl) bodyEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando EVs apenas nos stats da natureza recomendada...';
    if (statsEl) statsEl.innerHTML = '';
    if (iconEl) iconEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    if (btnEl) { btnEl.disabled = true; btnEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...'; }

    // IV e EV usam exatamente a mesma natureza de referência.
    const naturezaRecomendada = obterNaturezaEfetiva(prefixo, dados, naturezasRecomendadas);

    const natInfo = getStatsDaNatureza(naturezaRecomendada);

    const statsUsados = ['hp'];
    if (natInfo.sobe) statsUsados.push(natInfo.sobe);
    if (natInfo.neutra) {
        const b = dados.baseStats || {};
        if ((b.atk || 0) >= (b.spa || 0)) statsUsados.push('atk'); else statsUsados.push('spa');
        if ((b.spe || 0) >= 80) statsUsados.push('spe');
    }

    const statKeys = ['hp','atk','def','spa','spd','spe'];
    const labels = {hp:'HP', atk:'ATK', def:'DEF', spa:'SpA', spd:'SpD', spe:'SPE'};
    const baseStats = dados.baseStats || {};
    const ivs = dados.ivs || {};
    const tipos = getTiposSync(dados.nome) || [];
    const nomesTipos = tipos.map(t => typeNames[t] || t).join('/');

    // Pega EVs dos inputs (só no PvP). No PvE não tem inputs.
    const evsPontos = {};
    statKeys.forEach(k => {
        const input = document.getElementById('ev-input-' + k);
        const valorFoto = dados.evs?.[k];
        // Em ficha por foto, usar somente o EV explicitamente lido; nunca substituir null por zero.
        evsPontos[k] = dados.fonte === 'foto'
            ? (valorFoto === null || valorFoto === undefined ? null : Number(valorFoto))
            : (parseInt(input?.value) || 0);
    });
    const totalPontos = statKeys.reduce((a, k) => a + (evsPontos[k] === null ? 0 : evsPontos[k]), 0);

    const evsTexto = statKeys.map(k => {
        const v = evsPontos[k];
        return `${labels[k]}: ${v === null ? 'não lido' : `${v} EVs`}`;
    }).join(' · ');
    const baseTexto = statKeys.map(k => `${labels[k]}: ${baseStats[k] || 0}`).join(' · ');
    const ivsTexto = statKeys.map(k => `${labels[k]}: ${ivs[k] === null || ivs[k] === undefined ? 'não lido' : `${ivs[k]}/31`}`).join(' · ');

    const statsUsadosNomes = statsUsados.map(k => labels[k]).join(', ');
    const statsIgnoradosNomes = statKeys.filter(k => !statsUsados.includes(k)).map(k => labels[k]).join(', ');

const prompt = `Você é especialista em Pokémon competitivo. Analise a DISTRIBUIÇÃO DE EVs deste Pokémon.

CONCEITO: Avalie SOMENTE os EVs investidos nos stats que a natureza recomendada realmente beneficia.

NATUREZA DA FOTO — USO OBRIGATÓRIO: ${naturezaRecomendada || 'não lida'}\n- NÃO substitua esta natureza por outra recomendada.
- ESTA natureza SOBE: ${natInfo.sobe ? labels[natInfo.sobe] : 'nenhum (neutra)'}
- ESTA natureza REDUZ: ${natInfo.desce ? labels[natInfo.desce] : 'nenhum (neutra)'}
- HP NUNCA é afetado por natureza — mas é SEMPRE relevante

STATS QUE VOCÊ DEVE ANALISAR: ${statsUsadosNomes}
STATS QUE VOCÊ DEVE IGNORAR: ${statsIgnoradosNomes}

DADOS:
- Nome: ${dados.nome}
- Tipos: ${nomesTipos}
- Base Stats: ${baseTexto}
- IVs: ${ivsTexto}
- EVs investidos: ${evsTexto}
- Total investido: ${totalPontos}/51 pontos
- Contexto: ${contexto === 'pvp' ? 'PvP' : 'PvE'}

TAREFA:
1. Analise APENAS os EVs nos stats: ${statsUsadosNomes}
2. IGNORE totalmente: ${statsIgnoradosNomes}
3. Use SOMENTE os EVs investidos informados acima. NÃO use IVs, status atuais ou qualquer valor inventado.
4. Verifique se os EVs estão bem distribuídos NESSES stats
5. Se pontos foram para stats ignorados, NÃO penalize (não interessa)
6. Nota 0-10 para a efetividade dos EVs

RESPONDA APENAS JSON VÁLIDO:
{
  "nota": 8.5,
  "stats_ideais": ["${statsUsados.map(k => labels[k]).join('", "')}"],
  "stats_bem_investidos": ["HP", "ATK"],
  "stats_mal_investidos": [],
  "pontos_desperdicados": 0,
  "veredito": "Frase curta",
  "explicacao": "Explicação em 2-3 linhas citando apenas os stats analisados."
}`;

    try {
        const modeloEl = (contexto === 'pve') ? modelSelectPve : modelSelect;
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modeloEl.value}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!r.ok) throw new Error('Erro na API');
        const data = await r.json();
        let texto = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
        texto = texto.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        const match = texto.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('Resposta inválida');
        const json = JSON.parse(match[0]);
        aplicarEVEfetiva(prefixo, json, naturezaRecomendada, natInfo);
    } catch (e) {
        if (bodyEl) bodyEl.innerHTML = `<span style="color:#991b1b;">❌ Erro: ${e.message}</span>`;
        if (iconEl) iconEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    } finally {
        if (btnEl) { btnEl.disabled = false; btnEl.innerHTML = '<i class="fas fa-magic"></i> Recalcular EV Efetiva'; }
    }
}

function aplicarEVEfetiva(prefixo, json, naturezaRecomendada, natInfo) {
    const container = document.getElementById('evEfetiva' + prefixo);
    if (!container) return;

    let nota = Math.max(0, Math.min(10, parseFloat(json.nota) || 0));
    const scoreEl = document.getElementById('evEfetivaScore' + prefixo);
    const fillEl = document.getElementById('evEfetivaFill' + prefixo);
    const bodyEl = document.getElementById('evEfetivaBody' + prefixo);
    const statsEl = document.getElementById('evEfetivaStats' + prefixo);
    const iconEl = document.getElementById('evEfetivaIcon' + prefixo);

    let cor, grad, label, icone;
    if (nota >= 9)      { cor = '#22c55e'; grad = 'linear-gradient(135deg,#22c55e,#16a34a)'; label = 'CLASSE S';   icone = 'fa-crown'; }
    else if (nota >= 7) { cor = '#84cc16'; grad = 'linear-gradient(135deg,#84cc16,#65a30d)'; label = 'BOM';        icone = 'fa-star'; }
    else if (nota >= 5) { cor = '#f59e0b'; grad = 'linear-gradient(135deg,#f59e0b,#d97706)'; label = 'MÉDIO';      icone = 'fa-thumbs-up'; }
    else if (nota >= 3) { cor = '#f97316'; grad = 'linear-gradient(135deg,#f97316,#ea580c)'; label = 'PÉSSIMO';    icone = 'fa-meh'; }
    else                { cor = '#ef4444'; grad = 'linear-gradient(135deg,#ef4444,#dc2626)'; label = 'MUITO RUIM'; icone = 'fa-times-circle'; }

    if (scoreEl) { scoreEl.innerHTML = `${nota.toFixed(1)}<small>/10</small>`; scoreEl.style.color = cor; scoreEl.style.borderColor = cor; }
    if (fillEl) { fillEl.style.background = grad; setTimeout(() => { fillEl.style.width = (nota * 10) + '%'; }, 100); }
    if (iconEl) { iconEl.style.background = grad; iconEl.innerHTML = `<i class="fas ${icone}"></i>`; }

    if (statsEl) {
        const bem = (json.stats_bem_investidos || []).filter(s => s);
        const mal = (json.stats_mal_investidos || []).filter(s => s);
        let html = '';
        html += `<span class="ev-stat-badge" style="background:${cor}22;border-color:${cor};color:${cor};"><i class="fas fa-leaf"></i> Natureza: ${naturezaRecomendada || '—'}</span>`;
        bem.forEach(s => { html += `<span class="ev-stat-badge bem"><i class="fas fa-check-circle"></i> ${s}</span>`; });
        mal.forEach(s => { html += `<span class="ev-stat-badge ruim"><i class="fas fa-times-circle"></i> ${s} (desperdício)</span>`; });
        statsEl.innerHTML = html;
    }

    if (bodyEl) {
        const desperdicio = json.pontos_desperdicados || 0;
        bodyEl.innerHTML = `
            <div class="ev-efetiva-veredito">
                <i class="fas ${icone}" style="color:${cor};font-size:1.3rem;"></i>
                <strong style="color:${cor};">${label}</strong>
                <span style="color:${cor};font-size:1.3rem;font-weight:900;">${nota.toFixed(1)}/10</span>
            </div>
            <div style="font-weight:900;color:#155e75;font-size:0.9rem;margin-bottom:0.3rem;">${json.veredito || ''}</div>
            <div style="color:#0f172a;font-weight:600;">${(json.explicacao || '').replace(/\n/g, '<br>')}</div>
            ${desperdicio > 0
                ? `<div style="margin-top:0.5rem;padding:0.4rem 0.8rem;background:#fee2e2;border:1.5px solid #ef4444;border-radius:10px;font-size:0.78rem;color:#991b1b;font-weight:800;"><i class="fas fa-exclamation-triangle"></i> ${desperdicio} pontos desperdiçados</div>`
                : `<div style="margin-top:0.5rem;padding:0.4rem 0.8rem;background:#dcfce7;border:1.5px solid #22c55e;border-radius:10px;font-size:0.78rem;color:#166534;font-weight:800;"><i class="fas fa-check-circle"></i> Distribuição correta nos stats da natureza!</div>`
            }
        `;
    }

    if (container) container.style.borderColor = cor + '99';
}

// ============================================================
// API KEYS
// ============================================================
const apiKeyInput=document.getElementById('apiKeyInput'),btnSalvarApi=document.getElementById('btnSalvarApi'),apiStatus=document.getElementById('apiStatus');
const apiKeyInputTimes=document.getElementById('apiKeyInputTimes'),btnSalvarApiTimes=document.getElementById('btnSalvarApiTimes'),apiStatusTimes=document.getElementById('apiStatusTimes');
const apiKeyInputTier=document.getElementById('apiKeyInputTier'),btnSalvarApiTier=document.getElementById('btnSalvarApiTier'),apiStatusTier=document.getElementById('apiStatusTier');
const apiKeyInputPve=document.getElementById('apiKeyInputPve'),btnSalvarApiPve=document.getElementById('btnSalvarApiPve'),apiStatusPve=document.getElementById('apiStatusPve');
const apiKeyInputDuel=document.getElementById('apiKeyInputDuel'),btnSalvarApiDuel=document.getElementById('btnSalvarApiDuel'),apiStatusDuel=document.getElementById('apiStatusDuel');
const modelSelect=document.getElementById('modelSelect'),modelSelectTimes=document.getElementById('modelSelectTimes'),modelSelectTier=document.getElementById('modelSelectTier'),modelSelectPve=document.getElementById('modelSelectPve'),modelSelectDuel=document.getElementById('modelSelectDuel');

let apiKey = '';
function carregarChaveSalva() {
    const s = localStorage.getItem('geminiApiKey');
    if (s) {
        apiKeyInput.value=s; apiKeyInputTimes.value=s; apiKeyInputTier.value=s; apiKeyInputPve.value=s; apiKeyInputDuel.value=s; apiKey=s;
        [apiStatus,apiStatusTimes,apiStatusTier,apiStatusPve,apiStatusDuel].forEach(el => { el.textContent='✓ Chave carregada'; el.className='api-status ok'; });
    } else {
        [apiStatus,apiStatusTimes,apiStatusTier,apiStatusPve,apiStatusDuel].forEach(el => { el.textContent='⚠️ Insira sua chave'; el.className='api-status erro'; });
    }
}
function salvarChave(chave) {
    apiKey=chave; localStorage.setItem('geminiApiKey',chave);
    [apiStatus,apiStatusTimes,apiStatusTier,apiStatusPve,apiStatusDuel].forEach(el => { el.textContent='✓ Chave salva!'; el.className='api-status ok'; });
    testarChave(chave);
}
btnSalvarApi.addEventListener('click',()=>{const c=apiKeyInput.value.trim();if(c.length>10)salvarChave(c);else{apiStatus.textContent='❌ Chave inválida';apiStatus.className='api-status erro';}});
btnSalvarApiTimes.addEventListener('click',()=>{const c=apiKeyInputTimes.value.trim();if(c.length>10)salvarChave(c);else{apiStatusTimes.textContent='❌ Chave inválida';apiStatusTimes.className='api-status erro';}});
btnSalvarApiTier.addEventListener('click',()=>{const c=apiKeyInputTier.value.trim();if(c.length>10)salvarChave(c);else{apiStatusTier.textContent='❌ Chave inválida';apiStatusTier.className='api-status erro';}});
btnSalvarApiPve.addEventListener('click',()=>{const c=apiKeyInputPve.value.trim();if(c.length>10)salvarChave(c);else{apiStatusPve.textContent='❌ Chave inválida';apiStatusPve.className='api-status erro';}});
btnSalvarApiDuel.addEventListener('click',()=>{const c=apiKeyInputDuel.value.trim();if(c.length>10)salvarChave(c);else{apiStatusDuel.textContent='❌ Chave inválida';apiStatusDuel.className='api-status erro';}});

async function testarChave(chave) {
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${chave}`);
        if (r.ok) { [apiStatus,apiStatusTimes,apiStatusTier,apiStatusPve,apiStatusDuel].forEach(el=>{el.textContent='✓ Chave válida!';el.className='api-status ok';}); }
        else { const d=await r.json(); const m=`❌ ${d.error?.message||'Chave inválida'}`; [apiStatus,apiStatusTimes,apiStatusTier,apiStatusPve,apiStatusDuel].forEach(el=>{el.textContent=m;el.className='api-status erro';}); }
    } catch(e) {}
}
function sincronizarModelos(valor) {
    modelSelect.value=valor; modelSelectTimes.value=valor; modelSelectTier.value=valor; modelSelectPve.value=valor; modelSelectDuel.value=valor;
}
modelSelect.addEventListener('change',function(){sincronizarModelos(this.value);});
modelSelectTimes.addEventListener('change',function(){sincronizarModelos(this.value);});
modelSelectTier.addEventListener('change',function(){sincronizarModelos(this.value);});
modelSelectPve.addEventListener('change',function(){sincronizarModelos(this.value);});
modelSelectDuel.addEventListener('change',function(){sincronizarModelos(this.value);});

// ============================================================
// FICHA PVP
// ============================================================
const fileInput=document.getElementById('fileInput'),uploadArea=document.getElementById('uploadArea'),preview=document.getElementById('preview');
const fileBadge=document.getElementById('fileBadge'),fileName=document.getElementById('fileName'),analisarBtn=document.getElementById('analisarBtn');
const loading=document.getElementById('loading'),resultadoBox=document.getElementById('resultadoBox'),btnExemplo=document.getElementById('btnCarregarExemplo');
const statusGrid=document.getElementById('statusGrid'),naturezaEl=document.getElementById('natureza'),statusCarregadoBadge=document.getElementById('statusCarregadoBadge');
const pvpLoading=document.getElementById('pvpLoading'),pvpResultado=document.getElementById('pvpResultado');
const movesLoading=document.getElementById('movesLoading'),movesResultado=document.getElementById('movesResultado');
const btnAplicarEVs=document.getElementById('btnAplicarEVs'),btnSugerirEVs=document.getElementById('btnSugerirEVs'),btnResetarEVs=document.getElementById('btnResetarEVs');
const fichaHeader=document.getElementById('fichaHeader'),fichaSpriteBox=document.getElementById('fichaSpriteBox'),fichaNome=document.getElementById('fichaNome');
const fichaTipos=document.getElementById('fichaTipos'),fichaNivel=document.getElementById('fichaNivel'),fichaNatureza=document.getElementById('fichaNatureza');
const naturezaRecomendadaContainer=document.getElementById('naturezaRecomendadaContainer'),naturezasRecomendadasEl=document.getElementById('naturezasRecomendadas');
let dadosPokemon = { nome:'', stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evsOriginais:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evsAtuais:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, baseStats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, natureza:'', nivel:78 };
let dadosCarregados = false, imagemSelecionada = null;

function calcularStatus(base, iv, ev, level, nature=1.0, isHp=false) {
    const evFloor = Math.floor(ev/4);
    const baseCalc = (2*base + iv + evFloor) * level / 100;
    if (isHp) return Math.floor(baseCalc + level + 10);
    return Math.floor((baseCalc + 5) * nature);
}
async function atualizarFichaHeader(nome, nivel, natureza) {
    fichaHeader.style.display='flex';
    fichaNome.textContent=nome; fichaNivel.textContent=nivel; fichaNatureza.textContent=natureza;
    const d = await buscarDadosPokemon(nome);
    fichaSpriteBox.innerHTML = d.sprite ? `<img src="${d.sprite}" alt="${nome}">` : `<div class="placeholder"><i class="fas fa-question"></i></div>`;
    fichaTipos.innerHTML = d.types.map(t => `<span class="tipo-tag ${tipoClass(t)}">${typeNames[t]||t}</span>`).join('');
}
function normalizarNaturezaIngles(nome) {
    if (!nome) return '';
    let n = nome.trim();
    const mapa = { 'modesta':'Modest','ousada':'Bold','calma':'Calm','adamante':'Adamant','atrevida':'Naughty','jolly':'Jolly','alegre':'Jolly','timida':'Timid','tímida':'Timid','medrosa':'Timid','docil':'Docile','dócil':'Docile','seria':'Serious','séria':'Serious','gentil':'Gentle','educada':'Gentle','sossegada':'Relaxed','tranquila':'Relaxed','imprudente':'Rash','apressada':'Hasty','ingenua':'Naive','ingênua':'Naive','audaciosa':'Naughty','brava':'Brave','valente':'Brave','destemida':'Brave','firme':'Impish','teimosa':'Impish','descontraida':'Lax','descuidada':'Lax','quieta':'Quiet','calada':'Quiet' };
    const key = n.toLowerCase().replace(/[^a-záàâãéêíóôõúç]/gi,'');
    if (mapa[key]) return mapa[key];
    return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}
function aplicarEVsFichaPvp(evsStr) {
    const keys = { hp:'hp', atk:'atk', def:'def', spa:'spa', spd:'spd', spe:'spe', ataque:'atk', defesa:'def', 'ataque especial':'spa', 'defesa especial':'spd', velocidade:'spe', attack:'atk', defense:'def', 'sp. atk':'spa', 'sp. def':'spd', speed:'spe' };
    const partes = evsStr.split('/').map(p => p.trim());
    for (const parte of partes) {
        const m = parte.match(/^(\d+)\s+([a-zA-ZÀ-ÿ\. ]+)$/);
        if (m) {
            const evValor = parseInt(m[1]);
            let statKey = m[2].trim().toLowerCase();
            let key = null;
            for (const [k, v] of Object.entries(keys)) { if (statKey === k || statKey.includes(k)) { key = v; break; } }
            if (!key) {
                if (statKey.includes('hp')) key = 'hp';
                else if (statKey.includes('atk') || statKey.includes('ataque')) key = 'atk';
                else if (statKey.includes('def') && !statKey.includes('esp')) key = 'def';
                else if (statKey.includes('spa') || (statKey.includes('ataque') && statKey.includes('esp'))) key = 'spa';
                else if (statKey.includes('spd') || (statKey.includes('defesa') && statKey.includes('esp'))) key = 'spd';
                else if (statKey.includes('spe') || statKey.includes('veloc')) key = 'spe';
            }
            if (key) { const input = document.getElementById(`ev-input-${key}`); if (input) input.value = evsParaPontos(evValor); }
        }
    }
    aplicarLimitePontos('hp'); atualizarStatusComEVs();
}
function renderNaturezasPvp(texto) {
    const natSection = texto.match(/\*\*NATUREZAS E EVs:\*\*\s*([\s\S]+?)(?=\*\*AVALIAÇÃO|\*\*VANTAGENS|\*\*DESVANTAGENS|\*\*FRAQUEZAS|\*\*RESISTÊNCIAS|\*\*IMUNIDADES|\*\*SCORE|$)/i);
    if (!natSection) { naturezaRecomendadaContainer.classList.remove('visivel'); return; }
    const linhas = natSection[1].split('\n').filter(l => l.trim().startsWith('-') || /Natureza\s*\d/i.test(l));
    let cardsHtml = ''; let idx = 0;
    const natsEncontradas = [];
    for (const linha of linhas) {
        const limpa = linha.replace(/^[\s\-•*]+/, '').trim();
        if (!limpa) continue;
        const match = limpa.match(/Natureza\s*\d*\s*:\s*([^|]+)\|\s*EVs\s*:\s*(.+)/i);
        if (match) {
            const natNome = normalizarNaturezaIngles(match[1].trim());
            const evsTexto = match[2].trim();
            idx++; natsEncontradas.push(natNome);
            cardsHtml += `<div class="pve-natureza-card" data-evs="${evsTexto.replace(/"/g,'&quot;')}" data-nat="${natNome}"><div class="pve-nat-header"><div class="pve-nat-icon">${idx}</div><div class="pve-nat-name">${natNome}</div></div><div class="pve-nat-evs-label"><i class="fas fa-dumbbell"></i> EVs Recomendadas</div><div class="pve-nat-evs">${evsTexto}</div><button class="pve-nat-apply-btn"><i class="fas fa-check"></i> Aplicar estes EVs</button></div>`;
        }
    }
    if (cardsHtml) {
        naturezasRecomendadasEl.innerHTML = cardsHtml;
        naturezaRecomendadaContainer.classList.add('visivel');
        naturezasRecomendadasPvp = natsEncontradas;
        if (dadosCarregados) renderAvaliacaoIV('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
        document.querySelectorAll('#naturezasRecomendadas .pve-nat-apply-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.pve-natureza-card');
                const evs = card.dataset.evs, nat = card.dataset.nat;
                if (nat) { naturezaEl.textContent = nat; dadosPokemon.natureza = nat; if (fichaNatureza) fichaNatureza.textContent = nat; }
                aplicarEVsFichaPvp(evs);
                if (dadosCarregados) renderAvaliacaoIV('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
                this.innerHTML = '<i class="fas fa-check-circle"></i> Aplicado!'; this.style.background = '#f59e0b';
                setTimeout(() => { this.innerHTML = '<i class="fas fa-check"></i> Aplicar estes EVs'; this.style.background = ''; }, 1500);
            });
        });
    } else naturezaRecomendadaContainer.classList.remove('visivel');
}
function formatarTextoIA(texto) {
    let html = texto;
    html = html.replace(/\*\*NATUREZAS E EVs:\*\*\s*([\s\S]+?)(?=\*\*AVALIAÇÃO|\*\*VANTAGENS|\*\*DESVANTAGENS|\*\*FRAQUEZAS|\*\*RESISTÊNCIAS|\*\*IMUNIDADES|\*\*SCORE|$)/i, '');
    html = html.replace(/\*\*([^*\n]+?):\*\*/g, '<h4><i class="fas fa-caret-right"></i> $1</h4>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^---+$/gm, '<div class="ia-sep"></div>');
    const linhas = html.split('\n');
    let out = ''; let dentroLista = false;
    for (const linha of linhas) {
        const trimmed = linha.trim();
        if (!trimmed) { if (dentroLista) { out += '</ul>'; dentroLista = false; } continue; }
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            if (!dentroLista) { out += '<ul>'; dentroLista = true; }
            out += `<li>${trimmed.substring(2).trim()}</li>`;
        } else if (trimmed.startsWith('<h4>') || trimmed.startsWith('<div class="ia-sep">')) {
            if (dentroLista) { out += '</ul>'; dentroLista = false; }
            out += trimmed;
        } else {
            if (dentroLista) { out += '</ul>'; dentroLista = false; }
            out += `<p>${trimmed}</p>`;
        }
    }
    if (dentroLista) out += '</ul>';
    return out;
}
async function chamarIA(prompt, loadingEl, resultadoEl, tipo='texto', modeloEl=modelSelect) {
    if (!apiKey) { resultadoEl.innerHTML='⚠️ Configure sua chave API.'; resultadoEl.style.display='block'; return; }
    loadingEl.style.display='block'; resultadoEl.style.display='none'; resultadoEl.innerHTML='';
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modeloEl.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({contents:[{parts:[{text:prompt}]}]}) });
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message||'Erro.'); }
        const data = await r.json();
        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
        if (tipo === 'moves') {
            const listaMoves = await traduzirListaMoves(texto);
            let html = '<div class="moves-flex">';
            listaMoves.forEach(m => { if (m && m.length > 0) html += `<span class="move-tag">${m}</span>`; });
            html += '</div>';
            resultadoEl.innerHTML = html || texto.replace(/\n/g,'<br>');
            resultadoEl.style.display = 'block';
            renderTMCardsOficiais(resultadoEl, listaMoves, 'TMs oficiais recomendadas');
        } else if (tipo === 'pvp') {
            renderNaturezasPvp(texto);
            resultadoEl.innerHTML = formatarTextoIA(texto) || texto.replace(/\n/g,'<br>');
            resultadoEl.style.display = 'block';
            const tmsPvp=TMS_DISPONIVEIS.filter(tm=>texto.toLowerCase().includes(tm.nome.toLowerCase())).map(tm=>tm.nome);
            renderTMCardsOficiais(resultadoEl,tmsPvp,'TMs recomendadas para PvP');
        } else {
            resultadoEl.innerHTML = texto.replace(/\n/g,'<br>');
            resultadoEl.style.display='block';
        }
    } catch(e) { resultadoEl.innerHTML = `❌ Erro: ${e.message}`; resultadoEl.style.display='block'; }
    finally { loadingEl.style.display = 'none'; }
}
function gerarAnalisesIA() {
    if (!dadosCarregados) return;
    const tipos = getTiposSync(dadosPokemon.nome);
    const tmsTexto = getTMsTextoPrompt(tipos, dadosPokemon.nome);
    const pvpPrompt = `Você é especialista em Pokémon competitivo PvP. NATUREZAS em INGLÊS. MOVES em INGLÊS ORIGINAL.

REGRA CRÍTICA: Só recomende TMs/moves que estejam NA LISTA ABAIXO. NÃO invente outros.
LISTA DE TMs DISPONÍVEIS NO JOGO:
${tmsTexto}

Formato:
**NATUREZAS E EVs:**
- Natureza 1: [Inglês] | EVs: [Distribuição]
- Natureza 2: [Inglês] | EVs: [Distribuição]
- Natureza 3: [Inglês] | EVs: [Distribuição]
**Avaliação geral:** [texto]
**Vantagens ofensivas:** [texto]
**Desvantagens ofensivas:** [texto]
**Fraquezas defensivas:** [texto]
**Resistências defensivas:** [texto]
**Imunidades:** [texto]
**Score (0-10):** [nota]
Dados: Nome: ${dadosPokemon.nome}, Nível: ${dadosPokemon.nivel}, Natureza: ${dadosPokemon.natureza||'Não especificada'}, IVs: ${JSON.stringify(dadosPokemon.ivs)} (Total: ${calcularTotalIV(dadosPokemon.ivs)}/186), Status: ${dadosPokemon.stats.hp}/${dadosPokemon.stats.atk}/${dadosPokemon.stats.def}/${dadosPokemon.stats.spa}/${dadosPokemon.stats.spd}/${dadosPokemon.stats.spe}`;
    chamarIA(pvpPrompt, pvpLoading, pvpResultado, 'pvp');

    const movesPrompt = `Liste as 4 melhores TMs para ${dadosPokemon.nome} em PvP.

REGRA CRÍTICA: Use APENAS TMs desta lista (todas disponíveis no jogo):
${tmsTexto}

Formato: Apenas a lista, um move por linha, sem numeração. Use nome em INGLÊS ORIGINAL.`;
    chamarIA(movesPrompt, movesLoading, movesResultado, 'moves');
}
uploadArea.addEventListener('click', ()=>fileInput.click());
fileInput.addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    imagemSelecionada = file;
    const reader = new FileReader();
    reader.onload = ev => { preview.src=ev.target.result; preview.classList.add('visivel'); fileName.textContent=file.name; fileBadge.classList.add('visivel'); analisarBtn.disabled=false; };
    reader.readAsDataURL(file);
});
function toBase64(file) { return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);}); }
function extrairStatus(texto) {
    let m = texto.match(/\{[\s\S]*\}/); let data = {};
    if (m) { try { data = JSON.parse(m[0]); } catch(e){ console.error('Erro parse JSON:', e); } }
    if (!data.stats) {
        data = {
            nome: data.nome || 'Pokémon',
            stats: data.stats || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0},
            ivs: data.ivs || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0},
            evs: data.evs || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0},
            natureza: data.natureza || 'Serious',
            nivel: data.nivel || 78
        };
    }
    if (!data.ivs) data.ivs = {hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    if (!data.evs) data.evs = {hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    return data;
}
async function analisarImagem() {
    if (!imagemSelecionada || !apiKey) return;
    loading.classList.add('ativo'); resultadoBox.classList.remove('ativo'); analisarBtn.disabled=true;
    try {
        const base64 = await toBase64(imagemSelecionada);
        const prompt = `Você é um especialista em Pokémon. Analise CUIDADOSAMENTE esta imagem e extraia TODOS os dados visíveis.

IMPORTANTE: A imagem geralmente mostra uma tabela com colunas "IV" e "EV". Você DEVE ler os valores da coluna IV (0 a 31) para cada status. NÃO calcule IVs, LEIA diretamente.

RESPONDA APENAS COM JSON VÁLIDO (sem markdown):

{
  "nome": "swampert",
  "nivel": 93,
  "natureza": "Adamant",
  "ivs": {"hp": 25, "atk": 29, "def": 25, "spa": 15, "spd": 25, "spe": 27},
  "evs": {"hp": 0, "atk": 100, "def": 0, "spa": 100, "spd": 0, "spe": 150},
  "stats": {"hp": 312, "atk": 284, "def": 195, "spa": 180, "spd": 195, "spe": 176}
}

REGRAS CRÍTICAS:
- IVs são LIDOS da coluna "IV" (0-31), NÃO calculados
- Se um IV não estiver visível, use 0`;

        const payload = {contents:[{parts:[
            {text: prompt},
            {inline_data:{mime_type:imagemSelecionada.type, data:base64.split(',')[1]}}
        ]}]};
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelect.value}:generateContent?key=${apiKey}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message||'Erro.'); }
        const data = await r.json();
        let texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        texto = texto.replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
        resultadoBox.innerHTML = texto.replace(/\n/g,'<br>'); resultadoBox.classList.add('ativo');
        await processarDadosImportados(extrairStatus(texto));
        document.querySelector('.tab[data-tab="tab-ficha"]').click();
    } catch(e) { resultadoBox.innerHTML=`❌ Erro: ${e.message}`; resultadoBox.classList.add('ativo'); }
    finally { loading.classList.remove('ativo'); analisarBtn.disabled=false; }
}
analisarBtn.addEventListener('click', analisarImagem);
async function processarDadosImportados(dados) {
    const nome = dados.nome||'Pokémon';
    const stats = dados.stats||{hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    const evs = dados.evs||{hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    const ivs = dados.ivs || {hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    let natureza = dados.natureza||'Serious'; natureza = normalizarNaturezaIngles(natureza);
    const nivel = dados.nivel||78;

    const baseTabela = baseStatsTabela[nome.toLowerCase()]||null;
    const bases = {};
    if (baseTabela) {
        for (const k of ['hp','atk','def','spa','spd','spe']) bases[k] = baseTabela[k]||0;
    } else {
        const d = await buscarDadosPokemon(nome);
        if (d.raw) {
            bases.hp = d.raw.stats.find(s => s.stat.name === 'hp')?.base_stat || 50;
            bases.atk = d.raw.stats.find(s => s.stat.name === 'attack')?.base_stat || 50;
            bases.def = d.raw.stats.find(s => s.stat.name === 'defense')?.base_stat || 50;
            bases.spa = d.raw.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 50;
            bases.spd = d.raw.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 50;
            bases.spe = d.raw.stats.find(s => s.stat.name === 'speed')?.base_stat || 50;
        } else {
            for (const k of ['hp','atk','def','spa','spd','spe']) bases[k] = 50;
        }
    }
    Object.assign(dadosPokemon,{nome,stats,evsOriginais:evs,evsAtuais:{...evs},baseStats:bases,ivs,natureza,nivel});
    dadosCarregados = true;
    statusCarregadoBadge.classList.add('visivel'); naturezaEl.textContent = natureza;
    await atualizarFichaHeader(nome,nivel,natureza);
    gerarStatusCards(stats,evs,bases,ivs,nivel,natureza);
    naturezasRecomendadasPvp = [];
    renderAvaliacaoIV('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
    gerarAnalisesIA();
    const aiBox = document.getElementById('aiRatingContainerPvp');
    if (aiBox) aiBox.classList.add('visivel');
}
function gerarStatusCards(stats,evs,bases,ivs,nivel,natureza) {
    const keys = ['hp','atk','def','spa','spd','spe'];
    const labels = {hp:'HP',atk:'Ataque',def:'Defesa',spa:'SpA',spd:'SpD',spe:'Velocidade'};
    const icons = {hp:'fa-heart',atk:'fa-fist-raised',def:'fa-shield-alt',spa:'fa-fire',spd:'fa-water',spe:'fa-wind'};
    let html = '';
    for (const k of keys) {
        const val = stats[k]||0, ev = evs[k]||0;
        const pontos = evsParaPontos(ev); const evEquiv = pontosParaEVs(pontos);
        const pct = Math.min((val/255)*100,100);
        html += `<div class="stat-card" data-stat="${k}"><div class="stat-header"><div class="stat-icon"><i class="fas ${icons[k]}"></i></div><div class="stat-info"><div class="stat-label">${labels[k]}</div><div class="stat-value"><span class="current" id="stat-current-${k}">${val>0?val:'--'}</span><span class="arrow">→</span><span class="preview" id="stat-preview-${k}">${val>0?val:'--'}</span><span class="diff zero" id="diff-${k}">±0</span></div><div class="stat-bar"><div class="fill" id="bar-current-${k}" style="width:${pct}%;"></div><div class="fill preview-fill" id="bar-preview-${k}" style="width:${pct}%;"></div></div></div></div><div class="stat-ev-input"><label>PTS</label><input type="number" id="ev-input-${k}" value="${pontos}" min="0" max="26" step="1" /><span class="ev-equiv-badge" id="ev-equiv-${k}">${evEquiv} EVs</span><button class="ev-preset-btn" data-stat="${k}" data-ev="26">26</button><button class="ev-preset-btn" data-stat="${k}" data-ev="13">13</button><button class="ev-preset-btn" data-stat="${k}" data-ev="1">1</button><button class="ev-preset-btn" data-stat="${k}" data-ev="0">0</button></div></div>`;
    }
    statusGrid.innerHTML = html;
    document.querySelectorAll('.ev-preset-btn').forEach(b => b.addEventListener('click', function() {
        const i = document.getElementById(`ev-input-${this.dataset.stat}`);
        if (i) { i.value = this.dataset.ev; i.dispatchEvent(new Event('input')); }
    }));
    for (const k of keys) { const i=document.getElementById(`ev-input-${k}`); if (i) i.addEventListener('input',()=>{ aplicarLimitePontos(k); atualizarPrevia(k); }); }
    for (const k of keys) atualizarPrevia(k);
    atualizarContadorEV();
}
function atualizarPrevia(k) {
    if (!dadosCarregados) return;
    const input = document.getElementById(`ev-input-${k}`); if (!input) return;
    const pontos = parseInt(input.value)||0; const ev = pontosParaEVs(pontos);
    const base = dadosPokemon.baseStats[k]||0, iv = dadosPokemon.ivs[k]||0;
    const isHp = k==='hp'; const sa = dadosPokemon.stats[k]||0;
    const sp = calcularStatus(base,iv,ev,dadosPokemon.nivel,1.0,isHp);
    document.getElementById(`stat-current-${k}`).textContent = sa;
    document.getElementById(`stat-preview-${k}`).textContent = sp;
    const diff = sp-sa, de = document.getElementById(`diff-${k}`);
    de.textContent = diff>0?`+${diff}`:diff<0?`${diff}`:'±0';
    de.className = 'diff ' + (diff>0?'positive':diff<0?'negative':'zero');
    document.getElementById(`bar-current-${k}`).style.width = Math.min((sa/255)*100,100)+'%';
    document.getElementById(`bar-preview-${k}`).style.width = Math.min((sp/255)*100,100)+'%';
    const eq = document.getElementById(`ev-equiv-${k}`); if (eq) eq.textContent = ev + ' EVs';
}
function atualizarStatusComEVs() {
    if (!dadosCarregados) return;
    const keys = ['hp','atk','def','spa','spd','spe'];
    const isHp = {hp:true,atk:false,def:false,spa:false,spd:false,spe:false};
    const evs = {}, stats = {};
    for (const k of keys) { const pontos = parseInt(document.getElementById(`ev-input-${k}`)?.value)||0; evs[k] = pontosParaEVs(pontos); }
    for (const k of keys) stats[k] = calcularStatus(dadosPokemon.baseStats[k],dadosPokemon.ivs[k],evs[k],dadosPokemon.nivel,1.0,isHp[k]);
    dadosPokemon.stats = stats; dadosPokemon.evsAtuais = evs;
    for (const k of keys) {
        document.getElementById(`stat-current-${k}`).textContent = stats[k];
        document.getElementById(`bar-current-${k}`).style.width = Math.min((stats[k]/255)*100,100)+'%';
        document.getElementById(`ev-input-${k}`).dispatchEvent(new Event('input'));
    }
    atualizarContadorEV();
}
function sugerirEVs() {
    if (!dadosCarregados) return;
    const s = dadosPokemon.stats; const p = [];
    if (s.atk>=120) p.push('atk'); if (s.spa>=120) p.push('spa'); if (s.spe>=100) p.push('spe');
    if (s.def>=100) p.push('def'); if (s.spd>=100) p.push('spd');
    if (p.length===0) { const so = Object.entries({atk:s.atk,spa:s.spa,spe:s.spe,def:s.def,spd:s.spd}).sort((a,b)=>b[1]-a[1]); p.push(so[0][0]); if (so[1][1]>50) p.push(so[1][0]); }
    ['hp','atk','def','spa','spd','spe'].forEach(k => {
        const i = document.getElementById(`ev-input-${k}`); if (!i) return;
        if (p.includes(k)) { if (k === p[0] || k === p[1]) i.value = 26; else i.value = 1; } else i.value = 0;
        i.dispatchEvent(new Event('input'));
    });
    atualizarStatusComEVs();
}
function resetarEVs() {
    if (!dadosCarregados) return;
    ['hp','atk','def','spa','spd','spe'].forEach(k => {
        const i=document.getElementById(`ev-input-${k}`);
        if (i){ i.value = evsParaPontos(dadosPokemon.evsOriginais[k]||0); i.dispatchEvent(new Event('input')); }
    });
    atualizarStatusComEVs();
}
btnAplicarEVs.addEventListener('click', () => {
    atualizarStatusComEVs();
    if (apiKey && dadosCarregados) {
        setTimeout(gerarNotaIA, 150);
    }
});
btnSugerirEVs.addEventListener('click', sugerirEVs);
btnResetarEVs.addEventListener('click', resetarEVs);
async function carregarExemplo() {
    const d = {nome:'Flygon',stats:{hp:235,atk:200,def:149,spa:124,spd:140,spe:182},evs:{hp:80,atk:90,def:100,spa:140,spd:0,spe:0},natureza:'Adamant',nivel:78};
    const bt = baseStatsTabela['flygon'], ivs = {hp:29,atk:28,def:25,spa:11,spd:14,spe:27};
    Object.assign(dadosPokemon,{nome:d.nome,stats:d.stats,evsOriginais:d.evs,evsAtuais:{...d.evs},baseStats:bt,ivs,natureza:d.natureza,nivel:d.nivel});
    dadosCarregados = true;
    statusCarregadoBadge.classList.add('visivel'); naturezaEl.textContent = d.natureza;
    await atualizarFichaHeader(d.nome,d.nivel,d.natureza);
    gerarStatusCards(d.stats,d.evs,bt,ivs,d.nivel,d.natureza);
    naturezasRecomendadasPvp = [];
    renderAvaliacaoIV('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
    gerarAnalisesIA();
    const aiBox = document.getElementById('aiRatingContainerPvp');
    if (aiBox) aiBox.classList.add('visivel');
    document.querySelector('.tab[data-tab="tab-ficha"]').click();
}
btnExemplo.addEventListener('click', carregarExemplo);

// ============================================================
// NOTA DA IA — STATUS REAIS
// ============================================================
const btnGerarNotaPvp = document.getElementById('btnGerarNotaPvp');
function renderEstrelas(nota) {
    const cheias = Math.round(nota / 2);
    let html = '';
    for (let i = 1; i <= 5; i++) { html += i <= cheias ? '<i class="fas fa-star"></i>' : '<i class="fas fa-star star-empty"></i>'; }
    return html;
}
function corDaNota(nota) {
    if (nota >= 9) return '#22c55e'; if (nota >= 7) return '#84cc16'; if (nota >= 5) return '#f59e0b'; if (nota >= 3) return '#f97316'; return '#ef4444';
}
async function gerarNotaIA() {
    if (!dadosCarregados) { alert('⚠️ Carregue um Pokémon primeiro.'); return; }
    if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
    const containerEl = document.getElementById('aiRatingContainerPvp');
    const scoreEl = document.getElementById('aiRatingScorePvp');
    const fillEl = document.getElementById('aiRatingFillPvp');
    const starsEl = document.getElementById('aiRatingStarsPvp');
    const justEl = document.getElementById('aiRatingJustificativaPvp');
    const btnEl = document.getElementById('btnGerarNotaPvp');
    const iconEl = document.getElementById('aiRatingIconPvp');
    if (containerEl) containerEl.classList.add('visivel');
    if (scoreEl) scoreEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    if (fillEl) fillEl.style.width = '0%';
    if (starsEl) starsEl.innerHTML = '';
    if (justEl) justEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando status reais...';
    if (btnEl) btnEl.disabled = true;
    const stats = dadosPokemon.stats;
    const totalIV = calcularTotalIV(dadosPokemon.ivs);
    const pontosEV = ['hp','atk','def','spa','spd','spe'].reduce((a, k) => a + (parseInt(document.getElementById(`ev-input-${k}`)?.value) || 0), 0);
    const prompt = `Você é um especialista em Pokémon competitivo PvP. Avalie este Pokémon com uma NOTA de 0 a 10 baseada nos STATUS REAIS.

- Nome: ${dadosPokemon.nome}
- Nível: ${dadosPokemon.nivel}
- Natureza: ${dadosPokemon.natureza || 'Não especificada'}
- Tipos: ${getTiposSync(dadosPokemon.nome).map(t => typeNames[t] || t).join('/')}
- HP: ${stats.hp} / ATK: ${stats.atk} / DEF: ${stats.def} / SpA: ${stats.spa} / SpD: ${stats.spd} / SPE: ${stats.spe}
- IVs: ${JSON.stringify(dadosPokemon.ivs)} (Total: ${totalIV}/186)
- EVs investidos: ${pontosEV}/51

RESPONDA EXATAMENTE:
**NOTA:** [0-10]
**JUSTIFICATIVA:** [2-3 linhas]`;
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelect.value}:generateContent?key=${apiKey}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message || 'Erro.'); }
        const data = await r.json();
        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const matchNota = texto.match(/\*\*NOTA:\*\*\s*([\d.,]+)/i);
        let nota = matchNota ? parseFloat(matchNota[1].replace(',', '.')) : 5;
        nota = Math.max(0, Math.min(10, nota));
        const matchJust = texto.match(/\*\*JUSTIFICATIVA:\*\*\s*([\s\S]+)/i);
        const justificativa = matchJust ? matchJust[1].trim() : texto.replace(/\*\*/g, '').trim();
        const cor = corDaNota(nota);
        if (scoreEl) { scoreEl.innerHTML = `${nota.toFixed(1)}<small>/10</small>`; scoreEl.style.color = cor; scoreEl.style.borderColor = cor; }
        if (fillEl) fillEl.style.width = `${(nota / 10) * 100}%`;
        if (starsEl) { starsEl.innerHTML = renderEstrelas(nota); starsEl.style.color = cor; }
        if (justEl) justEl.innerHTML = justificativa.replace(/\n/g, '<br>');
        if (iconEl) {
            iconEl.style.background = `linear-gradient(135deg, ${cor}, ${cor}cc)`;
            iconEl.innerHTML = nota >= 9 ? '<i class="fas fa-crown"></i>' : nota >= 7 ? '<i class="fas fa-star"></i>' : nota >= 5 ? '<i class="fas fa-thumbs-up"></i>' : nota >= 3 ? '<i class="fas fa-meh"></i>' : '<i class="fas fa-times-circle"></i>';
        }
    } catch (e) { if (justEl) justEl.innerHTML = `❌ Erro: ${e.message}`; }
    finally { if (btnEl) btnEl.disabled = false; }
}
if (btnGerarNotaPvp) btnGerarNotaPvp.addEventListener('click', gerarNotaIA);

// ============================================================
// ⭐ LISTENERS DOS BOTÕES: IV Efetivo + EV Efetiva (PvP e PvE)
// ============================================================
function garantirBotoesIvEfetivo() {
    ['Pvp', 'Pve'].forEach(prefixo => {
        const container = document.getElementById('ivEfetivo' + prefixo);
        if (!container) return;
        let btn = document.getElementById('btnGerarIvEfetivo' + prefixo);
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'btnGerarIvEfetivo' + prefixo;
            btn.type = 'button';
            container.appendChild(btn);
        }
        btn.className = 'btn-iv-efetivo';
        btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i><span>Recalcular IV Efetivo</span><i class="fas fa-arrow-right btn-iv-arrow"></i>';
        btn.style.cssText = 'display:flex;width:100%;box-sizing:border-box;align-items:center;justify-content:center;gap:.65rem;margin:1rem 0 .25rem;padding:.78rem 1.15rem;min-height:44px;border:1px solid #a78bfa;border-radius:999px;background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 48%,#4f46e5 100%);color:#fff;font:800 .82rem/1.1 system-ui,sans-serif;letter-spacing:.01em;box-shadow:0 7px 18px #6d28d955, inset 0 1px 0 #ffffff55;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;';
        btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px) scale(1.015)'; btn.style.boxShadow = '0 11px 25px #6d28d977, inset 0 1px 0 #ffffff66'; btn.style.filter = 'brightness(1.08)'; };
        btn.onmouseleave = () => { btn.style.transform = ''; btn.style.boxShadow = '0 7px 18px #6d28d955, inset 0 1px 0 #ffffff55'; btn.style.filter = ''; };
        btn.onmousedown = () => { btn.style.transform = 'translateY(0) scale(.98)'; };
        btn.onmouseup = () => { btn.style.transform = 'translateY(-2px) scale(1.015)'; };
    });
}

document.addEventListener('DOMContentLoaded', function () {
    garantirBotoesIvEfetivo();
    const btnIvPvp = document.getElementById('btnGerarIvEfetivoPvp');
    if (btnIvPvp && !btnIvPvp.dataset.bound) {
        btnIvPvp.dataset.bound = '1';
        btnIvPvp.addEventListener('click', function () {
            if (!dadosCarregados || !dadosPokemon.nome) { alert('⚠️ Carregue um Pokémon primeiro.'); return; }
            if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
            gerarIVEfetivo('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
        });
    }
    const btnEvPvp = document.getElementById('btnGerarEVEfetivaPvp');
    if (btnEvPvp && !btnEvPvp.dataset.bound) {
        btnEvPvp.dataset.bound = '1';
        btnEvPvp.addEventListener('click', function () {
            if (!dadosCarregados || !dadosPokemon.nome) { alert('⚠️ Carregue um Pokémon primeiro.'); return; }
            if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
            atualizarStatusComEVs();
            gerarEVEfetiva('Pvp', dadosPokemon, naturezasRecomendadasPvp, 'pvp');
        });
    }
    const btnIvPve = document.getElementById('btnGerarIvEfetivoPve');
    if (btnIvPve && !btnIvPve.dataset.bound) {
        btnIvPve.dataset.bound = '1';
        btnIvPve.addEventListener('click', function () {
            if (!pveDadosAtuais || !pveDadosAtuais.nome) { alert('⚠️ Gere uma build PvE primeiro.'); return; }
            if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
            gerarIVEfetivo('Pve', pveDadosAtuais, naturezasRecomendadasPve, 'pve');
        });
    }
    const btnEvPve = document.getElementById('btnGerarEVEfetivaPve');
    if (btnEvPve && !btnEvPve.dataset.bound) {
        btnEvPve.dataset.bound = '1';
        btnEvPve.addEventListener('click', function () {
            if (!pveDadosAtuais || !pveDadosAtuais.nome) { alert('⚠️ Gere uma build PvE primeiro.'); return; }
            if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
            gerarEVEfetiva('Pve', pveDadosAtuais, naturezasRecomendadasPve, 'pve');
        });
    }
});

// ============================================================
// TIMES
// ============================================================
const teamAllyInput=document.getElementById('teamAllyInput'),teamAllyArea=document.getElementById('teamAllyArea');
const teamAllyPreview=document.getElementById('teamAllyPreview'),teamAllyStatus=document.getElementById('teamAllyStatus'),allyManualInput=document.getElementById('allyManualInput');
const teamEnemyInput=document.getElementById('teamEnemyInput'),teamEnemyArea=document.getElementById('teamEnemyArea');
const teamEnemyPreview=document.getElementById('teamEnemyPreview'),teamEnemyStatus=document.getElementById('teamEnemyStatus'),enemyManualInput=document.getElementById('enemyManualInput');
const btnAnalisarTimes=document.getElementById('btnAnalisarTimes'),loadingTimes=document.getElementById('loadingTimes');
const teamResult=document.getElementById('teamResult'),teamResultContent=document.getElementById('teamResultContent');
const iaAnalysis=document.getElementById('iaAnalysis'),iaLoading=document.getElementById('iaLoading'),iaResultado=document.getElementById('iaResultado');
let allyImage = null, enemyImage = null;
teamAllyArea.addEventListener('click',()=>teamAllyInput.click());
teamAllyInput.addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;allyImage=f;const r=new FileReader();r.onload=ev=>{teamAllyPreview.src=ev.target.result;teamAllyPreview.classList.add('visivel');teamAllyStatus.innerHTML='<span class="loaded"><i class="fas fa-check-circle"></i> Imagem carregada</span>';verificarTimesProntos();};r.readAsDataURL(f);});
teamEnemyArea.addEventListener('click',()=>teamEnemyInput.click());
teamEnemyInput.addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;enemyImage=f;const r=new FileReader();r.onload=ev=>{teamEnemyPreview.src=ev.target.result;teamEnemyPreview.classList.add('visivel');teamEnemyStatus.innerHTML='<span class="loaded"><i class="fas fa-check-circle"></i> Imagem carregada</span>';verificarTimesProntos();};r.readAsDataURL(f);});
allyManualInput.addEventListener('input',verificarTimesProntos);
enemyManualInput.addEventListener('input',verificarTimesProntos);
function verificarTimesProntos() {
    const a = allyManualInput.value.trim(), e = enemyManualInput.value.trim();
    btnAnalisarTimes.disabled = !((allyImage || a.length>0) && (enemyImage || e.length>0));
}
function getEffectivenessText(eff) {
    if (eff === 2) return 'Super efetivo (2x)'; if (eff === 0.5) return 'Não muito efetivo (0.5x)'; if (eff === 0) return 'Imune (0x)'; return 'Neutro (1x)';
}
function extrairNomesDoTexto(texto) {
    let limpo = texto.replace(/[\[\]"]/g,'');
    let nomes = limpo.split(/[,;\n]/).map(p=>p.trim()).filter(p=>p.length>0);
    if (nomes.length===0) { const m = texto.match(/\b[A-Z][a-z]+\b/g); if (m) nomes = m; }
    return nomes.filter(n => n.length>1 && !/^(pokemon|pokémon|list|time|nenhum|none)$/i.test(n));
}
function renderPokeTag(nome) {
    const s = getSpriteSync(nome);
    const tipos = getTiposSync(nome).map(t=>typeNames[t]||t).join('/');
    const img = s ? `<img src="${s}" alt="${nome}" class="poke-sprite" onerror="this.style.display='none'">` : '';
    return `<span class="poke-tag">${img}<span class="poke-name">${nome}</span> <span class="type">${tipos}</span></span>`;
}
function renderSpriteMatchup(nome) {
    const s = getSpriteSync(nome);
    return s ? `<img src="${s}" alt="${nome}" class="matchup-sprite" onerror="this.style.display='none'">` : '';
}
function renderSkillsCard(pokeNome, oppNome) {
    const sprite = getSpriteSync(pokeNome); const tipos = getTiposSync(pokeNome);
    const moves = getMovesSync(pokeNome); const oppTipos = getTiposSync(oppNome);
    const tipoTags = tipos.map(t=>`<span class="mini-type ${tipoClass(t)}">${typeNames[t]||t}</span>`).join('');
    const img = sprite ? `<img src="${sprite}" alt="${pokeNome}">` : '<div style="width:44px;height:44px;border-radius:50%;background:#f1f5f9;"></div>';
    let mh = '';
    if (moves.length === 0) mh = '<div style="color:#94a3b8; font-size:0.72rem; padding:0.4rem;">Nenhuma habilidade encontrada.</div>';
    else mh = moves.map(m => {
        const eff = calcMoveEffectiveness(m.type, oppTipos);
        const lbl = effLabel(eff);
        const isStab = tipos.includes(m.type);
        const stabTag = isStab ? '<span class="skill-stab">STAB</span>' : '';
        const tmInfo=TMS_DISPONIVEIS.find(tm=>tm.nome.toLowerCase()===String(m.name).replace(/-/g,' ').toLowerCase());
        const tmImg=tmInfo?`<img class="skill-tm-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${tmInfo.tipo}.png" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'" alt="Sprite de ${tmInfo.nome}">`:'';
        return `<div class="skill-item">${tmImg}<span class="skill-name">${formatMoveName(m.name)}</span><span class="skill-type ${tipoClass(m.type)}">${typeNames[m.type]||m.type}</span><span class="skill-power">PWR ${m.power}</span>${stabTag}<span class="skill-eff ${lbl.cls}">${lbl.text}</span></div>`;
    }).join('');
    return `<div class="skills-card"><div class="skills-card-header">${img}<span class="skills-poke-name">${pokeNome}</span><div class="skills-poke-types">${tipoTags}</div></div>${mh}</div>`;
}
async function chamarIAVeredito(allyP, enemyP) {
    iaAnalysis.style.display='block'; iaLoading.style.display='block'; iaResultado.innerHTML='';
    const info = arr => arr.map(p => { const b = baseStatsTabela[p.toLowerCase()]; return b?`${p} (HP:${b.hp}, ATK:${b.atk}, DEF:${b.def}, SPA:${b.spa}, SPD:${b.spd}, SPE:${b.spe})`:p; }).join(', ');
    const tmsTexto = getTMsTextoPorPokemon([...allyP, ...enemyP]);
    const nomesTMsValidos = [...new Set(allyP.concat(enemyP).flatMap(p => getTMsReaisDoPokemon(p).map(tm => tm.nome)))];
    const prompt = `Você é especialista em Pokémon competitivo. Analise os times PvP.

REGRA CRÍTICA: Só recomende TMs que estejam NESTA LISTA FECHADA de TMs reais disponíveis no jogo.
Use somente TMs listadas para o Pokémon correspondente. Nunca use TM de outro Pokémon e nunca invente TM:
${tmsTexto}

Time Aliado: ${allyP.join(', ')} (stats: ${info(allyP)})
Time Rival: ${enemyP.join(', ')} (stats: ${info(enemyP)})
Responda:
**Vencedor:** [Aliado/Rival/Empate]
**Análise:** [explicação]
**TMs Recomendadas (da lista):** [2-3 TMs da lista acima com motivo, no formato "- TM [Nome] | Para: [Pokémon] | Motivo: [razão]"]
**Conselho:** [estratégia]`;
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectTimes.value}:generateContent?key=${apiKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
        if (!r.ok) throw new Error('Erro na API');
        const data = await r.json();
        let texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
        texto = validarTMsResposta(texto, nomesTMsValidos);
        iaResultado.innerHTML = `<div style="margin-bottom:.75rem;padding:.65rem .85rem;border:1px solid #86efac;border-radius:12px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#166534;font-weight:800;font-size:.82rem;"><i class="fas fa-circle-check"></i> Todas as TMs recomendadas abaixo estão disponíveis no jogo e foram verificadas para os Pokémon analisados.</div>` + texto.replace(/\n/g,'<br>');
    } catch(e) { iaResultado.innerHTML = `❌ Erro: ${e.message}`; }
    finally { iaLoading.style.display='none'; }
}
function validarTMsResposta(texto, nomesValidos) {
    const linhas = texto.split('\n');
    const linhasFiltradas = [];
    const tmsInvalidas = [];
    for (const linha of linhas) {
        const match = linha.match(/^\s*[-•*]\s*TM\s+([A-Za-z][A-Za-z\s'\-]+?)\s*\|/i);
        if (match) {
            const nomeTM = match[1].trim();
            const norm = nomeTM.toLowerCase();
            const valida = nomesValidos.some(nv =>
                String(nv).toLowerCase() === norm || String(nv).toLowerCase().replace(/\s+/g, '') === norm.replace(/\s+/g, '') || String(nv).toLowerCase().includes(norm) || norm.includes(String(nv).toLowerCase())
            );
            if (valida) { linhasFiltradas.push(linha); }
            else {
                const alternativa = nomesValidos.find(nv => !linhasFiltradas.some(l => l.toLowerCase().includes(nv.toLowerCase())));
                if (alternativa) {
                    const linhaSubstituida = linha.replace(/TM\s+[A-Za-z][A-Za-z\s'\-]+/i, `TM ${alternativa}`);
                    linhasFiltradas.push(linhaSubstituida);
                    tmsInvalidas.push(`${nomeTM} → ${alternativa}`);
                } else {
                    tmsInvalidas.push(nomeTM);
                }
            }
        } else { linhasFiltradas.push(linha); }
    }
    let resultado = linhasFiltradas.join('\n');
    if (tmsInvalidas.length > 0) {
        resultado += `\n\n---\n\n🔄 **TMs ajustadas automaticamente:** ${tmsInvalidas.join(', ')}. Foram substituídas por alternativas reais do jogo.`;
    }
    return resultado;
}
btnAnalisarTimes.addEventListener('click', async function() {
    const aM = allyManualInput.value.trim(), eM = enemyManualInput.value.trim();
    let allyP = aM ? aM.split(',').map(p=>p.trim()).filter(Boolean) : [];
    let enemyP = eM ? eM.split(',').map(p=>p.trim()).filter(Boolean) : [];
    loadingTimes.style.display = 'block'; teamResult.style.display = 'none';
    if (allyP.length === 0 && allyImage) {
        try {
            const b64 = await toBase64(allyImage);
            const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectTimes.value}:generateContent?key=${apiKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:'Liste todos os Pokémon desta imagem (aliado). Responda APENAS separado por vírgula.'},{inline_data:{mime_type:allyImage.type,data:b64.split(',')[1]}}]}]})});
            const d = await r.json();
            allyP = extrairNomesDoTexto(d.candidates?.[0]?.content?.parts?.[0]?.text || '');
        } catch(e) { allyP = []; }
    }
    if (enemyP.length === 0 && enemyImage) {
        try {
            const b64 = await toBase64(enemyImage);
            const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectTimes.value}:generateContent?key=${apiKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:'Liste todos os Pokémon desta imagem (rival). Responda APENAS separado por vírgula.'},{inline_data:{mime_type:enemyImage.type,data:b64.split(',')[1]}}]}]})});
            const d = await r.json();
            enemyP = extrairNomesDoTexto(d.candidates?.[0]?.content?.parts?.[0]?.text || '');
        } catch(e) { enemyP = []; }
    }
    if (allyP.length === 0 || enemyP.length === 0) {
        teamResultContent.innerHTML = `<div class="extracted-names" style="background:#fee2e2; border-color:#fca5a5; color:#991b1b;"><strong>⚠️ Não foi possível identificar.</strong><br>Aliado: ${allyP.join(', ')||'Nenhum'}<br>Rival: ${enemyP.join(', ')||'Nenhum'}</div>`;
        teamResult.style.display='block'; loadingTimes.style.display='none'; return;
    }
    loadingTimes.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando sprites, tipos e habilidades na PokéAPI...';
    await precarregarDados([...allyP, ...enemyP]);
    let matchups = [], wins = 0, losses = 0, draws = 0;
    for (const a of allyP) {
        for (const e of enemyP) {
            const at = getTiposSync(a), et = getTiposSync(e);
            let details = [], aa = 0, ea = 0;
            for (const x of at) for (const y of et) { const ef = typeEffectiveness[x]?.[y] ?? 1; if (ef===2) aa++; else if (ef===0.5) aa-=0.5; else if (ef===0) aa-=2; details.push({text:`${typeNames[x]||x} → ${typeNames[y]||y}: ${getEffectivenessText(ef)} (aliado)`,eff:ef}); }
            for (const x of et) for (const y of at) { const ef = typeEffectiveness[x]?.[y] ?? 1; if (ef===2) ea++; else if (ef===0.5) ea-=0.5; else if (ef===0) ea-=2; details.push({text:`${typeNames[x]||x} → ${typeNames[y]||y}: ${getEffectivenessText(ef)} (rival)`,eff:ef}); }
            let res = 'draw'; if (aa > ea + 0.5) res = 'win'; else if (aa < ea - 0.5) res = 'lose';
            if (res==='win') wins++; else if (res==='lose') losses++; else draws++;
            matchups.push({ally:a, enemy:e, details, resultado:res});
        }
    }
    let html = `
        <div class="extracted-names"><i class="fas fa-check-circle" style="color:#16a34a;"></i> Pokémon identificados:</div>
        <div class="result-grid">
            <div class="team-card"><div class="team-card-title"><span class="ally"><i class="fas fa-shield-alt"></i> Time Aliado</span></div><div class="team-pokemon">${allyP.map(p=>renderPokeTag(p)).join('')}</div></div>
            <div class="team-card"><div class="team-card-title"><span class="enemy"><i class="fas fa-shield-alt"></i> Time Rival</span></div><div class="team-pokemon">${enemyP.map(p=>renderPokeTag(p)).join('')}</div></div>
        </div>
        <div class="matchup-analysis">
            <div class="matchup-title"><i class="fas fa-arrows-left-right"></i> Matchups</div>
            <div class="matchup-grid">
                ${matchups.map(m => {
                    const lbl = m.resultado==='win'?'Win':m.resultado==='lose'?'Lose':'Draw';
                    const dh = m.details.map(d=>`<span class="${d.eff===2?'eff-2':d.eff===0.5?'eff-05':d.eff===0?'eff-0':''}">${d.text}</span>`).join('<br>');
                    return `<div class="matchup-card"><div class="matchup-pair">${renderSpriteMatchup(m.ally)}<span>${m.ally}</span><span class="vs">vs</span>${renderSpriteMatchup(m.enemy)}<span>${m.enemy}</span><span class="${m.resultado}">${lbl}</span></div><div class="matchup-detail">${dh}</div></div>`;
                }).join('')}
            </div>
        </div>
        <div class="matchup-summary">
            <div class="summary-item"><span>Total:</span><span class="badge">${matchups.length}</span></div>
            <div class="summary-item"><span>Wins:</span><span class="badge win">${wins}</span></div>
            <div class="summary-item"><span>Losses:</span><span class="badge lose">${losses}</span></div>
            <div class="summary-item"><span>Draws:</span><span class="badge draw">${draws}</span></div>
        </div>
        <div class="skills-section">
            <div class="skills-title"><i class="fas fa-bolt"></i> Habilidades e Efetividade</div>
            ${matchups.map(m=>`<div class="skills-matchup-title"><i class="fas fa-crosshairs"></i> ${m.ally} vs ${m.enemy}</div><div class="skills-grid">${renderSkillsCard(m.ally,m.enemy)}${renderSkillsCard(m.enemy,m.ally)}</div>`).join('')}
        </div>`;
    teamResultContent.innerHTML = html;
    teamResult.style.display = 'block';
    renderTMsDosPokemons(teamResultContent, allyP.concat(enemyP), 'TMs oficiais dos Pokémon do time');
    loadingTimes.style.display = 'none';
    iaAnalysis.style.display = 'none';
    await chamarIAVeredito(allyP, enemyP);
});

// ============================================================
// DUELO 1x1
// ============================================================
let duelAllyMode = 'nome', duelEnemyMode = 'nome';
let duelAllyData = { nome:'', stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, types:[], sprite:null, nivel:null, natureza:null, fonte:'nome', moves:[] };
let duelEnemyData = { nome:'', stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, types:[], sprite:null, nivel:null, natureza:null, fonte:'nome', moves:[] };
let duelAllyPhoto = null, duelEnemyPhoto = null;
const duelAllySprite = document.getElementById('duelAllySprite'), duelEnemySprite = document.getElementById('duelEnemySprite');
const duelAllyName = document.getElementById('duelAllyName'), duelEnemyName = document.getElementById('duelEnemyName');
const duelAllyTypes = document.getElementById('duelAllyTypes'), duelEnemyTypes = document.getElementById('duelEnemyTypes');
const duelAllyStats = document.getElementById('duelAllyStats'), duelEnemyStats = document.getElementById('duelEnemyStats');
const duelAllyStatsNote = document.getElementById('duelAllyStatsNote'), duelEnemyStatsNote = document.getElementById('duelEnemyStatsNote');
const duelAllyInput = document.getElementById('duelAllyInput'), duelEnemyInput = document.getElementById('duelEnemyInput');
const duelAllyNomeZone = document.getElementById('duelAllyNomeZone'), duelEnemyNomeZone = document.getElementById('duelEnemyNomeZone');
const duelAllyFotoZone = document.getElementById('duelAllyFotoZone'), duelEnemyFotoZone = document.getElementById('duelEnemyFotoZone');
const duelAllyPhotoDrop = document.getElementById('duelAllyPhotoDrop'), duelEnemyPhotoDrop = document.getElementById('duelEnemyPhotoDrop');
const duelAllyPhotoInput = document.getElementById('duelAllyPhotoInput'), duelEnemyPhotoInput = document.getElementById('duelEnemyPhotoInput');
const duelAllyPhotoPreview = document.getElementById('duelAllyPhotoPreview'), duelEnemyPhotoPreview = document.getElementById('duelEnemyPhotoPreview');
const btnAnalisarDuelo = document.getElementById('btnAnalisarDuelo'), loadingDuelo = document.getElementById('loadingDuelo'), duelIAResult = document.getElementById('duelIAResult');
const STAT_LABELS = {hp:'HP',atk:'ATK',def:'DEF',spa:'SPA',spd:'SPD',spe:'SPE'};
function renderStatsGrid(containerEl, stats, noteEl, noteText) {
    if (!stats || !Object.values(stats).some(v => v > 0)) { containerEl.innerHTML = ''; if (noteEl) noteEl.textContent = ''; return; }
    let html = '';
    for (const k of ['hp','atk','def','spa','spd','spe']) { html += `<div class="duel-stat-line"><span class="lbl">${STAT_LABELS[k]}</span><span class="vl">${stats[k]||0}</span></div>`; }
    containerEl.innerHTML = html;
    if (noteEl) noteEl.textContent = noteText || '';
}
document.querySelectorAll('.duel-mode-toggle .mode-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const side = this.dataset.side, mode = this.dataset.mode;
        const toggle = this.parentElement;
        toggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        if (side === 'ally') {
            duelAllyMode = mode;
            if (mode === 'foto') { duelAllyNomeZone.classList.add('oculto'); duelAllyFotoZone.classList.add('ativo'); }
            else { duelAllyNomeZone.classList.remove('oculto'); duelAllyFotoZone.classList.remove('ativo'); duelAllyPhoto = null; duelAllyPhotoPreview.classList.remove('visivel'); duelAllyData = { nome:'', stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, types:[], sprite:null, nivel:null, natureza:null, fonte:'nome', moves:[] }; duelAllySprite.innerHTML = '<div class="placeholder"><i class="fas fa-question"></i></div>'; duelAllyName.textContent = '—'; duelAllyTypes.innerHTML = ''; duelAllyStats.innerHTML = ''; duelAllyStatsNote.textContent = ''; }
        } else {
            duelEnemyMode = mode;
            if (mode === 'foto') { duelEnemyNomeZone.classList.add('oculto'); duelEnemyFotoZone.classList.add('ativo'); }
            else { duelEnemyNomeZone.classList.remove('oculto'); duelEnemyFotoZone.classList.remove('ativo'); duelEnemyPhoto = null; duelEnemyPhotoPreview.classList.remove('visivel'); duelEnemyData = { nome:'', stats:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, evs:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, types:[], sprite:null, nivel:null, natureza:null, fonte:'nome', moves:[] }; duelEnemySprite.innerHTML = '<div class="placeholder"><i class="fas fa-question"></i></div>'; duelEnemyName.textContent = '—'; duelEnemyTypes.innerHTML = ''; duelEnemyStats.innerHTML = ''; duelEnemyStatsNote.textContent = ''; }
        }
        verificarDueloPronto();
    });
});
function verificarDueloPronto() {
    let a = false, e = false;
    if (duelAllyMode === 'nome') a = duelAllyInput.value.trim().length > 1; else a = !!duelAllyPhoto;
    if (duelEnemyMode === 'nome') e = duelEnemyInput.value.trim().length > 1; else e = !!duelEnemyPhoto;
    btnAnalisarDuelo.disabled = !(a && e);
}
async function carregarDueloPorNome(nome, side) {
    if (!nome || nome.length < 2) return;
    const d = await buscarDadosPokemon(nome);
    const spriteBox = side === 'ally' ? duelAllySprite : duelEnemySprite;
    const nameEl = side === 'ally' ? duelAllyName : duelEnemyName;
    const typesEl = side === 'ally' ? duelAllyTypes : duelEnemyTypes;
    const statsEl = side === 'ally' ? duelAllyStats : duelEnemyStats;
    const noteEl = side === 'ally' ? duelAllyStatsNote : duelEnemyStatsNote;
    const dataObj = side === 'ally' ? duelAllyData : duelEnemyData;
    dataObj.nome = nome.charAt(0).toUpperCase() + nome.slice(1);
    dataObj.types = d.types; dataObj.sprite = d.sprite; dataObj.moves = d.moves;
    dataObj.fonte = 'nome'; dataObj.nivel = null; dataObj.natureza = null;
    dataObj.ivs = {hp:0,atk:0,def:0,spa:0,spd:0,spe:0}; dataObj.evs = {hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
    if (d.raw) {
        dataObj.stats = { hp: d.raw.stats.find(s => s.stat.name === 'hp')?.base_stat || 0, atk: d.raw.stats.find(s => s.stat.name === 'attack')?.base_stat || 0, def: d.raw.stats.find(s => s.stat.name === 'defense')?.base_stat || 0, spa: d.raw.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0, spd: d.raw.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0, spe: d.raw.stats.find(s => s.stat.name === 'speed')?.base_stat || 0 };
    }
    if (d.sprite) spriteBox.innerHTML = `<img src="${d.sprite}" alt="${nome}">`; else spriteBox.innerHTML = '<div class="placeholder"><i class="fas fa-question"></i></div>';
    nameEl.textContent = dataObj.nome;
    typesEl.innerHTML = d.types.map(t => `<span class="tipo-tag ${tipoClass(t)}">${typeNames[t]||t}</span>`).join('');
    renderStatsGrid(statsEl, dataObj.stats, noteEl, 'Stats Base (PokéAPI)');
}
let duelAllyTimer = null, duelEnemyTimer = null;
duelAllyInput.addEventListener('input', () => { clearTimeout(duelAllyTimer); if (duelAllyMode !== 'nome') return; duelAllyTimer = setTimeout(() => { carregarDueloPorNome(duelAllyInput.value.trim(), 'ally'); verificarDueloPronto(); }, 500); });
duelEnemyInput.addEventListener('input', () => { clearTimeout(duelEnemyTimer); if (duelEnemyMode !== 'nome') return; duelEnemyTimer = setTimeout(() => { carregarDueloPorNome(duelEnemyInput.value.trim(), 'enemy'); verificarDueloPronto(); }, 500); });
duelAllyPhotoDrop.addEventListener('click', (e) => { e.stopPropagation(); duelAllyPhotoInput.click(); });
duelEnemyPhotoDrop.addEventListener('click', (e) => { e.stopPropagation(); duelEnemyPhotoInput.click(); });
duelAllyPhotoInput.addEventListener('click', (e) => e.stopPropagation());
duelEnemyPhotoInput.addEventListener('click', (e) => e.stopPropagation());
duelAllyPhotoInput.addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; duelAllyPhoto = f; const reader = new FileReader(); reader.onload = ev => { duelAllyPhotoPreview.src = ev.target.result; duelAllyPhotoPreview.classList.add('visivel'); }; reader.readAsDataURL(f); verificarDueloPronto(); });
duelEnemyPhotoInput.addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; duelEnemyPhoto = f; const reader = new FileReader(); reader.onload = ev => { duelEnemyPhotoPreview.src = ev.target.result; duelEnemyPhotoPreview.classList.add('visivel'); }; reader.readAsDataURL(f); verificarDueloPronto(); });
async function analisarFotoDuelo(file, lado) {
    if (!file) return null;
    const base64 = await toBase64(file);
    const prompt = `Analise esta imagem e retorne JSON:
{
  "nome": "swampert", "nivel": 93, "natureza": "Adamant",
  "ivs": {"hp": 25, "atk": 29, "def": 25, "spa": 15, "spd": 25, "spe": 27},
  "evs": {"hp": 0, "atk": 100, "def": 0, "spa": 100, "spd": 0, "spe": 150},
  "stats": {"hp": 312, "atk": 284, "def": 195, "spa": 180, "spd": 195, "spe": 176}
}
IVs LIDOS, não calculados. Responda APENAS JSON.`;
    const payload = { contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: file.type, data: base64.split(',')[1] } }] }] };
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectDuel.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
    if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message||'Erro.'); }
    const data = await r.json();
    let texto = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim().replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
    const match = texto.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try { return JSON.parse(match[0]); } catch(e) { return null; }
}
async function processarFotoParaDuelo(file, side) {
    const spriteBox = side === 'ally' ? duelAllySprite : duelEnemySprite;
    const nameEl = side === 'ally' ? duelAllyName : duelEnemyName;
    const typesEl = side === 'ally' ? duelAllyTypes : duelEnemyTypes;
    const statsEl = side === 'ally' ? duelAllyStats : duelEnemyStats;
    const noteEl = side === 'ally' ? duelAllyStatsNote : duelEnemyStatsNote;
    const dataObj = side === 'ally' ? duelAllyData : duelEnemyData;
    const json = await analisarFotoDuelo(file, side);
    if (!json || !json.nome || json.nome.toLowerCase().includes('nenhum')) { alert('❌ Não foi possível identificar.'); return false; }
    const nome = json.nome.trim(), nivel = normalizarValorLido(json.nivel);
    const natureza = json.natureza ? normalizarNaturezaIngles(json.natureza) : null;
    const stats = normalizarBlocoLido(json.stats);
        const ivs = normalizarBlocoLido(json.ivs);
        const evs = normalizarBlocoLido(json.evs);
    const d = await buscarDadosPokemon(nome);
    const nomeOficial = d.raw?.name ? (d.raw.name.charAt(0).toUpperCase() + d.raw.name.slice(1).replace(/-/g,' ')) : nome;
    dataObj.nome = nomeOficial; dataObj.types = d.types; dataObj.sprite = d.sprite; dataObj.moves = d.moves;
    dataObj.stats = stats; dataObj.ivs = ivs; dataObj.evs = evs; dataObj.nivel = nivel; dataObj.natureza = natureza; dataObj.fonte = 'foto';
    if (d.sprite) spriteBox.innerHTML = `<img src="${d.sprite}" alt="${nome}">`; else spriteBox.innerHTML = '<div class="placeholder"><i class="fas fa-question"></i></div>';
    nameEl.textContent = `${nomeOficial} · Nv ${nivel} · ${natureza||'—'}`;
    typesEl.innerHTML = d.types.map(t => `<span class="tipo-tag ${tipoClass(t)}">${typeNames[t]||t}</span>`).join('');
    renderStatsGrid(statsEl, stats, noteEl, `Stats reais · IVs: ${calcularTotalIV(ivs)}/186 · Nv ${nivel}`);
    return true;
}
btnAnalisarDuelo.addEventListener('click', async function() {
    if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
    loadingDuelo.style.display = 'block';
    duelIAResult.style.display = 'none';
    try {
        if (duelAllyMode === 'foto' && duelAllyPhoto) { loadingDuelo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando foto do seu Pokémon...'; const ok = await processarFotoParaDuelo(duelAllyPhoto, 'ally'); if (!ok) { loadingDuelo.style.display='none'; return; } }
        else if (duelAllyMode === 'nome') { await carregarDueloPorNome(duelAllyInput.value.trim(), 'ally'); }
        if (duelEnemyMode === 'foto' && duelEnemyPhoto) { loadingDuelo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando foto do oponente...'; const ok = await processarFotoParaDuelo(duelEnemyPhoto, 'enemy'); if (!ok) { loadingDuelo.style.display='none'; return; } }
        else if (duelEnemyMode === 'nome') { await carregarDueloPorNome(duelEnemyInput.value.trim(), 'enemy'); }
        if (!duelAllyData.nome || !duelEnemyData.nome) { alert('❌ Dados incompletos.'); loadingDuelo.style.display='none'; return; }
        loadingDuelo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A IA está analisando o confronto...';
        const allyInfoStr = `Nome: ${duelAllyData.nome}${duelAllyData.fonte==='foto' ? ` (Nv ${duelAllyData.nivel||'?'}, Natureza ${duelAllyData.natureza||'?'}, IVs ${calcularTotalIV(duelAllyData.ivs)}/186, STATS REAIS)` : ' (Stats Base)'}\nTipos: ${duelAllyData.types.map(t=>typeNames[t]||t).join('/')}\nStats: HP ${duelAllyData.stats.hp} / ATK ${duelAllyData.stats.atk} / DEF ${duelAllyData.stats.def} / SpA ${duelAllyData.stats.spa} / SpD ${duelAllyData.stats.spd} / SPE ${duelAllyData.stats.spe}`;
        const enemyInfoStr = `Nome: ${duelEnemyData.nome}${duelEnemyData.fonte==='foto' ? ` (Nv ${duelEnemyData.nivel||'?'}, Natureza ${duelEnemyData.natureza||'?'}, IVs ${calcularTotalIV(duelEnemyData.ivs)}/186, STATS REAIS)` : ' (Stats Base)'}\nTipos: ${duelEnemyData.types.map(t=>typeNames[t]||t).join('/')}\nStats: HP ${duelEnemyData.stats.hp} / ATK ${duelEnemyData.stats.atk} / DEF ${duelEnemyData.stats.def} / SpA ${duelEnemyData.stats.spa} / SpD ${duelEnemyData.stats.spd} / SPE ${duelEnemyData.stats.spe}`;
        const allyMovesList = duelAllyData.moves.map(m => `- ${formatMoveName(m.name)} (${typeNames[m.type]||m.type}, PWR ${m.power}${duelAllyData.types.includes(m.type)?', STAB':''})`).join('\n');
        const enemyMovesList = duelEnemyData.moves.map(m => `- ${formatMoveName(m.name)} (${typeNames[m.type]||m.type}, PWR ${m.power}${duelEnemyData.types.includes(m.type)?', STAB':''})`).join('\n');
        const tmsTexto = getTMsTextoPorPokemon([duelAllyData.nome, duelEnemyData.nome]);
        const prompt = `Você é especialista em Pokémon PvP. Analise o duelo.

SEU: ${allyInfoStr}
OPONENTE: ${enemyInfoStr}

MOVES: ${allyMovesList}
MOVES OPONENTE: ${enemyMovesList}

TMs REAIS DO JOGO POR POKÉMON (use APENAS estas, respeitando o Pokémon indicado):
${tmsTexto}

Responda:
**MELHORES MOVES PARA ${duelAllyData.nome.toUpperCase()}:**
1. [Nome] | Tipo: [x] | PWR: [x] | Por que: [x]
2. ...
3. ...
4. ...

**TMs RECOMENDADAS:**
- TM [nome] | Substitui: [move] | Motivo: [x]

**ESTRATÉGIA:** [4 linhas]

**PREVISÃO:** [Vitória/Equilibrado] — [razão]`;
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectDuel.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({contents:[{parts:[{text:prompt}]}]}) });
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message||'Erro.'); }
        const data = await r.json();
        let texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
        const nomesTMsValidos = [...new Set([...getTMsReaisDoPokemon(duelAllyData.nome), ...getTMsReaisDoPokemon(duelEnemyData.nome)].map(tm => tm.nome))];
        texto = validarTMsDuelo(texto, nomesTMsValidos);
        renderDueloResult(texto, duelAllyData, duelEnemyData);
    } catch(e) {
        duelIAResult.innerHTML = `<div class="duel-section-block"><h3 style="color:#991b1b;">Erro</h3><p>${e.message}</p></div>`;
        duelIAResult.style.display = 'block';
    } finally { loadingDuelo.style.display = 'none'; }
});
function validarTMsDuelo(texto, nomesValidos) {
    const linhas = texto.split('\n');
    const linhasFiltradas = [];
    const tmsInvalidas = [];
    for (const linha of linhas) {
        const matchTM = linha.match(/TM\s+([A-Za-z][A-Za-z\s'\-]+?)\s*[|:]/i);
        const matchMove = linha.match(/^\s*\d+\.\s*([A-Za-z][A-Za-z\s'\-]+?)\s*\|/);
        let nomeEncontrado = null;
        if (matchTM) nomeEncontrado = matchTM[1].trim();
        else if (matchMove) nomeEncontrado = matchMove[1].trim();
        if (nomeEncontrado) {
            const norm = nomeEncontrado.toLowerCase().trim();
            const valida = nomesValidos.some(nv => String(nv).toLowerCase() === norm || String(nv).toLowerCase().replace(/\s+/g, '') === norm.replace(/\s+/g, '') || String(nv).toLowerCase().includes(norm) || norm.includes(String(nv).toLowerCase()));
            if (valida) { linhasFiltradas.push(linha); }
            else {
                const alternativa = nomesValidos.find(nv => !linhasFiltradas.some(l => l.toLowerCase().includes(nv.toLowerCase())));
                if (alternativa && matchTM) {
                    const linhaSubstituida = linha.replace(/TM\s+[A-Za-z][A-Za-z\s'\-]+/i, `TM ${alternativa}`);
                    linhasFiltradas.push(linhaSubstituida);
                    tmsInvalidas.push(`${nomeEncontrado} → ${alternativa}`);
                } else {
                    linhasFiltradas.push(linha);
                    tmsInvalidas.push(nomeEncontrado);
                }
            }
        } else { linhasFiltradas.push(linha); }
    }
    let resultado = linhasFiltradas.join('\n');
    if (tmsInvalidas.length > 0) {
        resultado += `\n\n---\n\n🔄 **TMs ajustadas automaticamente:** ${tmsInvalidas.join(', ')}. Foram substituídas por alternativas reais do jogo.`;
    }
    return resultado;
}
function parseMoveList(bloco) {
    const linhas = bloco.split('\n').filter(l => /^\d+\./.test(l.trim()));
    return linhas.map(l => {
        const m = l.replace(/^\d+\.\s*/, '').split('|').map(p => p.trim());
        return { name: (m[0]||'').replace(/\*\*/g,'').trim(), type: (m[1]||'').replace(/Tipo:\s*/i,'').trim(), power: (m[2]||'').replace(/PWR:\s*/i,'').trim(), why: (m[3]||'').replace(/Por que:\s*/i,'').replace(/\*\*/g,'').trim() };
    });
}
function parseTMList(bloco) {
    const linhas = bloco.split('\n').filter(l => l.trim().startsWith('-'));
    return linhas.map(l => {
        const partes = l.replace(/^-\s*/, '').split('|').map(p => p.trim());
        return { move: (partes[0]||'').replace(/^TM\s*/i,'').replace(/\*\*/g,'').trim(), sub: (partes[1]||'').replace(/Substitui:\s*/i,'').trim(), why: (partes[2]||'').replace(/Motivo:\s*/i,'').replace(/\*\*/g,'').trim() };
    });
}
function getTypeClassByName(typeName) {
    const map = { 'normal':'tipo-normal','fogo':'tipo-fire','fire':'tipo-fire','água':'tipo-water','agua':'tipo-water','water':'tipo-water','planta':'tipo-grass','grass':'tipo-grass','elétrico':'tipo-electric','eletrico':'tipo-electric','electric':'tipo-electric','gelo':'tipo-ice','ice':'tipo-ice','lutador':'tipo-fighting','fighting':'tipo-fighting','veneno':'tipo-poison','poison':'tipo-poison','terra':'tipo-ground','ground':'tipo-ground','voador':'tipo-flying','flying':'tipo-flying','psíquico':'tipo-psychic','psiquico':'tipo-psychic','psychic':'tipo-psychic','inseto':'tipo-bug','bug':'tipo-bug','pedra':'tipo-rock','rock':'tipo-rock','fantasma':'tipo-ghost','ghost':'tipo-ghost','dragão':'tipo-dragon','dragao':'tipo-dragon','dragon':'tipo-dragon','sombrio':'tipo-dark','dark':'tipo-dark','aço':'tipo-steel','aco':'tipo-steel','steel':'tipo-steel','fada':'tipo-fairy','fairy':'tipo-fairy' };
    return map[typeName.toLowerCase().trim()] || 'tipo-desconhecido';
}
function renderDueloResult(texto, allyData, enemyData) {
    const movesBlock = (texto.match(/\*\*MELHORES MOVES[^*]*\*\*\s*([\s\S]+?)(?=\*\*TMs|\*\*ESTRATÉGIA|$)/i)||[])[1] || '';
    const tmsBlock = (texto.match(/\*\*TMs[^*]*\*\*\s*([\s\S]+?)(?=\*\*ESTRATÉGIA|\*\*PREVISÃO|$)/i)||[])[1] || '';
    const estratBlock = (texto.match(/\*\*ESTRATÉGIA[^*]*\*\*\s*([\s\S]+?)(?=\*\*PREVISÃO|$)/i)||[])[1] || '';
    const previsaoBlock = (texto.match(/\*\*PREVISÃO:\*\*\s*([\s\S]+?)$/i)||[])[1] || '';
    const moves = parseMoveList(movesBlock);
    const tms = parseTMList(tmsBlock);
    const allySprite = allyData.sprite || '', enemySprite = enemyData.sprite || '';
    let html = `<div style="margin-bottom:.75rem;padding:.65rem .85rem;border:1px solid #86efac;border-radius:12px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#166534;font-weight:800;font-size:.82rem;"><i class="fas fa-circle-check"></i> Todas as TMs recomendadas abaixo estão disponíveis no jogo e foram verificadas para os Pokémon do duelo.</div>`;
    html += `<div class="duel-section-block" style="background:linear-gradient(135deg,#fef3c7,#fed7aa); border-color:#fbbf24;">
        <div style="display:flex; align-items:center; justify-content:center; gap:1.5rem; flex-wrap:wrap;">
            <div style="text-align:center; min-width:180px;">
                ${allySprite?`<img src="${allySprite}" style="width:80px;height:80px;image-rendering:pixelated;">`:'<div style="width:80px;height:80px;background:#fff;border-radius:50%;margin:0 auto;"></div>'}
                <div style="font-weight:900; font-size:1rem; color:#166534; margin-top:0.3rem;">${allyData.nome}</div>
                <div style="font-size:0.7rem; color:#475569; font-weight:700;">${allyData.types.map(t=>typeNames[t]||t).join('/')}</div>
                ${allyData.fonte==='foto'?`<div style="font-size:0.6rem; color:#f59e0b; font-weight:800; margin-top:0.2rem;">📸 Nv ${allyData.nivel||'?'} · IVs ${calcularTotalIV(allyData.ivs)}/186</div>`:'<div style="font-size:0.6rem; color:#64748b; font-weight:800; margin-top:0.2rem;">📖 Stats base</div>'}
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.2rem;margin-top:0.4rem;font-size:0.6rem;">
                    <span>HP ${allyData.stats.hp}</span><span>ATK ${allyData.stats.atk}</span>
                    <span>DEF ${allyData.stats.def}</span><span>SPA ${allyData.stats.spa}</span>
                    <span>SPD ${allyData.stats.spd}</span><span>SPE ${allyData.stats.spe}</span>
                </div>
            </div>
            <div style="font-size:2.5rem; font-weight:900; color:#ef4444;">VS</div>
            <div style="text-align:center; min-width:180px;">
                ${enemySprite?`<img src="${enemySprite}" style="width:80px;height:80px;image-rendering:pixelated;">`:'<div style="width:80px;height:80px;background:#fff;border-radius:50%;margin:0 auto;"></div>'}
                <div style="font-weight:900; font-size:1rem; color:#991b1b; margin-top:0.3rem;">${enemyData.nome}</div>
                <div style="font-size:0.7rem; color:#475569; font-weight:700;">${enemyData.types.map(t=>typeNames[t]||t).join('/')}</div>
                ${enemyData.fonte==='foto'?`<div style="font-size:0.6rem; color:#f59e0b; font-weight:800; margin-top:0.2rem;">📸 Nv ${enemyData.nivel||'?'} · IVs ${calcularTotalIV(enemyData.ivs)}/186</div>`:'<div style="font-size:0.6rem; color:#64748b; font-weight:800; margin-top:0.2rem;">📖 Stats base</div>'}
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.2rem;margin-top:0.4rem;font-size:0.6rem;">
                    <span>HP ${enemyData.stats.hp}</span><span>ATK ${enemyData.stats.atk}</span>
                    <span>DEF ${enemyData.stats.def}</span><span>SPA ${enemyData.stats.spa}</span>
                    <span>SPD ${enemyData.stats.spd}</span><span>SPE ${enemyData.stats.spe}</span>
                </div>
            </div>
        </div>
    </div>`;
    if (moves.length > 0) {
        html += `<div class="duel-section-block recommended"><h3><i class="fas fa-compact-disc"></i> Melhores TMs para ${allyData.nome}</h3><div class="duel-moves-grid">${moves.map((mv, i) => { const tmInfo=TMS_DISPONIVEIS.find(tm=>tm.nome.toLowerCase()===String(mv.name).replace(/^TM\s+/i,'').toLowerCase()); const tmImg=tmInfo?`<img class="duel-tm-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${tmInfo.tipo}.png" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'" alt="Sprite de ${tmInfo.nome}">`:''; return `<div class="duel-move-card">${tmImg}<div class="dm-name">${i+1}. ${mv.name}</div><div class="dm-meta"><span class="dm-type ${getTypeClassByName(mv.type)}">${mv.type}</span><span class="dm-power">${mv.power}</span>${i===0?'<span class="dm-tag best">★ TOP</span>':''}</div>${mv.why?`<div style="font-size:0.68rem; color:#475569; margin-top:0.4rem;">${mv.why}</div>`:''}</div>`; }).join('')}</div></div>`;
    }
    if (tms.length > 0) {
        html += `<div class="duel-section-block counter"><h3><i class="fas fa-exchange-alt"></i> TMs para Substituir</h3><div class="duel-moves-grid">${tms.map(tm => `<div class="duel-move-card"><img class="duel-tm-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png" alt="Sprite da TM" loading="lazy"><div class="dm-name">TM: ${tm.move}</div><div class="dm-meta"><span class="dm-tag tm">TM</span>${tm.sub?`<span style="font-size:0.62rem; color:#64748b; font-weight:700;">Substitui: ${tm.sub}</span>`:''}</div>${tm.why?`<div style="font-size:0.68rem; color:#475569; margin-top:0.4rem;">${tm.why}</div>`:''}</div>`).join('')}</div></div>`;
    }
    if (estratBlock.trim()) {
        html += `<div class="duel-strategy"><div style="font-weight:900; font-size:0.85rem; margin-bottom:0.4rem;"><i class="fas fa-chess"></i> Estratégia do Duelo</div>${estratBlock.replace(/\*\*/g,'').trim().replace(/\n/g,'<br>')}</div>`;
    }
    if (previsaoBlock.trim()) {
        const prev = previsaoBlock.replace(/\*\*/g,'').trim();
        const isAllyWin = prev.toLowerCase().includes(allyData.nome.toLowerCase()) && (prev.toLowerCase().includes('vitória') || prev.toLowerCase().includes('vitoria'));
        const isEnemyWin = prev.toLowerCase().includes(enemyData.nome.toLowerCase()) && (prev.toLowerCase().includes('vitória') || prev.toLowerCase().includes('vitoria'));
        const color = isAllyWin ? '#22c55e' : isEnemyWin ? '#ef4444' : '#f59e0b';
        html += `<div class="duel-section-block" style="border-color:${color};"><h3 style="color:${color};"><i class="fas fa-crystal-ball"></i> Previsão</h3><p style="font-size:0.95rem; font-weight:800; color:#0f172a;">${prev.replace(/\n/g,'<br>')}</p></div>`;
    }
    if (!html) html = `<div class="duel-section-block"><h3>Análise da IA</h3><div style="white-space:pre-wrap; line-height:1.8;">${texto.replace(/\*\*/g,'').replace(/\n/g,'<br>')}</div></div>`;
    duelIAResult.innerHTML = html;
    duelIAResult.style.display = 'block';
    renderTMsDosPokemons(duelIAResult, [duelAllyData.nome, duelEnemyData.nome], 'TMs oficiais do duelo');
}

// ============================================================
// PVE
// ============================================================
const pvePokemonInput = document.getElementById('pvePokemonInput');
const btnPveAnalisar = document.getElementById('btnPveAnalisar');
const loadingPve = document.getElementById('loadingPve');
const pveResult = document.getElementById('pveResult');
const pveSpriteBox = document.getElementById('pveSpriteBox');
const pveNome = document.getElementById('pveNome');
const pveTipos = document.getElementById('pveTipos');
const pveNivel = document.getElementById('pveNivel');
const pveNaturezaFicha = document.getElementById('pveNaturezaFicha');
const pveStatusGrid = document.getElementById('pveStatusGrid');
const pveNaturezas = document.getElementById('pveNaturezas');
const pveMoves = document.getElementById('pveMoves');
const pveStrategyText = document.getElementById('pveStrategyText');
const pveRealStatsBadge = document.getElementById('pveRealStatsBadge');
const pveStatusTitle = document.getElementById('pveStatusTitle');
const pveNatureAlert = document.getElementById('pveNatureAlert');
const pveUploadArea = document.getElementById('pveUploadArea');
const pveFileInput = document.getElementById('pveFileInput');
const pveImgPreview = document.getElementById('pveImgPreview');
const pveFileBadge = document.getElementById('pveFileBadge');
const pveFileName = document.getElementById('pveFileName');
const btnAnalisarPveImg = document.getElementById('btnAnalisarPveImg');
const loadingPveImg = document.getElementById('loadingPveImg');
let pveImagemSelecionada = null;
let pveDadosAtuais = { nome:'', stats:null, ivs:null, evs:null, natureza:null, nivel:null, baseStats:null };
pveUploadArea.addEventListener('click', () => pveFileInput.click());
pveFileInput.addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    pveImagemSelecionada = file;
    const reader = new FileReader();
    reader.onload = ev => { pveImgPreview.src = ev.target.result; pveImgPreview.classList.add('visivel'); pveFileName.textContent = file.name; pveFileBadge.classList.add('visivel'); btnAnalisarPveImg.disabled = false; };
    reader.readAsDataURL(file);
});
function verificarNaturezaAtual(naturezaAtual, naturezasRecomendadas, naturezaEl) {
    if (!naturezaAtual || !naturezasRecomendadas || naturezasRecomendadas.length === 0) { naturezaEl.innerHTML = ''; return; }
    const natAtualNorm = naturezaAtual.toLowerCase().trim();
    const natList = naturezasRecomendadas.map(n => n.toLowerCase().trim());
    const match = natList.some(n => n === natAtualNorm || n.includes(natAtualNorm) || natAtualNorm.includes(n));
    if (match) {
        naturezaEl.innerHTML = `<div class="nature-alert" style="background:linear-gradient(135deg,#dcfce7,#bbf7d0); border-color:#22c55e;"><div class="nature-alert-icon" style="background:linear-gradient(135deg,#22c55e,#16a34a);"><i class="fas fa-check"></i></div><div><div class="nature-alert-title" style="color:#166534;">Natureza Ideal!</div><div class="nature-alert-text" style="color:#166534;">A natureza <strong>${naturezaAtual}</strong> está entre as recomendadas. 🎉</div></div></div>`;
    } else {
        naturezaEl.innerHTML = `<div class="nature-alert"><div class="nature-alert-icon"><i class="fas fa-exclamation-triangle"></i></div><div><div class="nature-alert-title">⚠️ Natureza não recomendada!</div><div class="nature-alert-text">Recomendamos:</div><div class="nature-alert-list">${naturezasRecomendadas.map(n => `<span class="nat-badge-ok"><i class="fas fa-leaf"></i> ${n}</span>`).join('')}</div></div></div>`;
    }
}
async function analisarImagemPve() {
    if (!pveImagemSelecionada) return;
    if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
    loadingPveImg.style.display = 'block'; btnAnalisarPveImg.disabled = true;
    try {
        const base64 = await toBase64(pveImagemSelecionada);
        const prompt = `Leia SOMENTE os dados que estejam VISÍVEIS e legíveis nesta imagem do Pokémon.
NÃO invente, estime, calcule ou complete IVs, EVs, nível ou status a partir de outros dados.
Se um campo não aparecer na imagem ou estiver ilegível, use null; para cada stat individual não legível, use null.
Os valores de "stats" devem ser os status atuais exibidos na ficha, e não os Base Stats da espécie.
Os valores de "ivs" e "evs" devem ser transcritos apenas se estiverem explicitamente exibidos.
Use exatamente este formato, sem números de exemplo:
{
  "nome": null,
  "nivel": null,
  "natureza": null,
  "ivs": {"hp": null, "atk": null, "def": null, "spa": null, "spd": null, "spe": null},
  "evs": {"hp": null, "atk": null, "def": null, "spa": null, "spd": null, "spe": null},
  "stats": {"hp": null, "atk": null, "def": null, "spa": null, "spd": null, "spe": null}
}
Natureza em INGLÊS. Responda APENAS JSON válido.`;
        const payload = { contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: pveImagemSelecionada.type, data: base64.split(',')[1] } }] }] };
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectPve.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message||'Erro.'); }
        const data = await r.json();
        let texto = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim().replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
        let jsonData = null;
        const match = texto.match(/\{[\s\S]*\}/);
        if (match) { try { jsonData = JSON.parse(match[0]); } catch(e) {} }
        if (!jsonData || !jsonData.nome || jsonData.nome.toLowerCase().includes('nenhum')) { alert('❌ A IA não conseguiu identificar.'); loadingPveImg.style.display='none'; btnAnalisarPveImg.disabled = false; return; }
        const nomePokemon = jsonData.nome.trim();
        const nivelLido = normalizarValorLido(jsonData.nivel);
        const nivelImg = nivelLido;
        const naturezaImg = jsonData.natureza ? normalizarNaturezaIngles(jsonData.natureza) : null;
        const statsImg = normalizarBlocoLido(jsonData.stats);
        const ivsImg = normalizarBlocoLido(jsonData.ivs);
        const evsImg = normalizarBlocoLido(jsonData.evs);
        const temStats = Object.values(statsImg).some(v => v !== null);
        pvePokemonInput.value = nomePokemon;
        loadingPveImg.style.display='none'; btnAnalisarPveImg.disabled = false;
        await gerarBuildPve(temStats ? statsImg : null, nivelImg, naturezaImg, ivsImg, evsImg);
    } catch(e) { alert('❌ Erro: ' + e.message); loadingPveImg.style.display='none'; btnAnalisarPveImg.disabled = false; }
}
btnAnalisarPveImg.addEventListener('click', analisarImagemPve);
// Valores ausentes permanecem null: nunca transformar ausência de leitura em dado real.
function normalizarValorLido(valor) {
    if (valor === null || valor === undefined || valor === '') return null;
    const n = Number(valor);
    return Number.isFinite(n) ? n : null;
}
function normalizarBlocoLido(bloco) {
    const origem = bloco || {};
    return Object.fromEntries(['hp','atk','def','spa','spd','spe'].map(k => [k, normalizarValorLido(origem[k])]));
}

async function gerarNotaIAPveStatusReais(dados) {
    if (!dados || !dados.stats || !apiKey) return;
    const stats = dados.stats;
    const containerPai = document.getElementById('pveStrategyText')?.parentElement || document.getElementById('pveResult');
    if (!containerPai) return;
    let card = document.getElementById('aiRatingContainerPve');
    if (!card) {
        card = document.createElement('div');
        card.id = 'aiRatingContainerPve';
        card.style.cssText = 'margin-top:1rem;padding:1rem;border:2px solid #8b5cf6;border-radius:18px;background:linear-gradient(135deg,#faf5ff,#ede9fe);';
        containerPai.appendChild(card);
    }
    card.className = 'ai-rating-container visivel';
    card.innerHTML = '<div class="ai-rating-header"><div id="aiRatingIconPve" class="ai-rating-icon"><i class="fas fa-brain"></i></div><div class="ai-rating-title"><strong>Nota da IA — Status Reais</strong><small>PvE · análise somente dos status reais da foto</small></div><div id="aiRatingScorePve" class="ai-rating-score">—<small>/10</small></div></div><div id="aiRatingFillPve" class="ai-rating-fill"></div><div id="aiRatingStarsPve" class="ai-rating-stars"></div><div id="aiRatingJustificativaPve" class="ai-rating-justificativa"><i class="fas fa-spinner fa-spin"></i> Analisando somente os status reais da foto...</div><button id="btnGerarNotaPve" type="button" class="btn-ai-rating"><i class="fas fa-rotate"></i> Recalcular Nota PvE</button>'; 
    const scorePve = document.getElementById('aiRatingScorePve');
    const fillPve = document.getElementById('aiRatingFillPve');
    const starsPve = document.getElementById('aiRatingStarsPve');
    const justPve = document.getElementById('aiRatingJustificativaPve');
    const iconPve = document.getElementById('aiRatingIconPve');
    const btnPve = document.getElementById('btnGerarNotaPve');
    if (btnPve) btnPve.onclick = () => gerarNotaIAPveStatusReais(pveDadosAtuais);
    const prompt = `Você é especialista em Pokémon PvE. Dê uma nota de 0 a 10 baseada SOMENTE nos STATUS REAIS lidos da foto abaixo.
NÃO invente, estime ou complete valores ausentes. Ignore Base Stats, IVs e EVs para esta nota.
Pokémon: ${dados.nome}
Nível: ${dados.nivel ?? 'não lido'}
Natureza lida na foto: ${dados.natureza || 'não lida'}
Status reais: HP ${stats.hp ?? 'não lido'}, ATK ${stats.atk ?? 'não lido'}, DEF ${stats.def ?? 'não lido'}, SpA ${stats.spa ?? 'não lido'}, SpD ${stats.spd ?? 'não lido'}, SPE ${stats.spe ?? 'não lido'}
Responda APENAS JSON válido: {"nota": 0, "justificativa": "2-3 linhas"}`;
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectPve.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({contents:[{parts:[{text:prompt}]}]}) });
        if (!r.ok) throw new Error('Erro na API');
        const data = await r.json();
        const raw = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').replace(/```json\s*/gi,'').replace(/```/g,'').trim();
        const match = raw.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('Resposta inválida');
        const json = JSON.parse(match[0]);
        const nota = Math.max(0, Math.min(10, Number(json.nota) || 0));
        const cor = corDaNota(nota);
        const classe = nota >= 9 ? 'CLASSE S' : nota >= 7 ? 'BOM' : nota >= 5 ? 'MÉDIO' : nota >= 3 ? 'PÉSSIMO' : 'MUITO RUIM';
        if (scorePve) { scorePve.innerHTML = `${nota.toFixed(1)}<small>/10</small>`; scorePve.style.color = cor; scorePve.style.borderColor = cor; }
        if (fillPve) fillPve.innerHTML = `<div style="width:${nota * 10}%;height:100%;background:${cor};border-radius:inherit;"></div>`;
        if (starsPve) { starsPve.innerHTML = renderEstrelas(nota); starsPve.style.color = cor; }
        if (iconPve) { iconPve.style.background = `linear-gradient(135deg,${cor},${cor}cc)`; iconPve.innerHTML = nota >= 9 ? '<i class="fas fa-crown"></i>' : nota >= 7 ? '<i class="fas fa-star"></i>' : nota >= 5 ? '<i class="fas fa-thumbs-up"></i>' : nota >= 3 ? '<i class="fas fa-meh"></i>' : '<i class="fas fa-times-circle"></i>'; }
        if (justPve) justPve.innerHTML = `<strong style="color:${cor};">${classe} · ${nota.toFixed(1)}/10</strong><div style="margin-top:.5rem;">${String(json.justificativa || '').replace(/\n/g,'<br>')}</div>`;
    } catch (e) {
        if (justPve) justPve.innerHTML = `<span style="color:#991b1b;">❌ ${e.message}</span>`;
    }
}
async function gerarBuildPve(statsReais = null, nivelReal = null, naturezaReal = null, ivsReais = null, evsReais = null) {
    const nome = pvePokemonInput.value.trim();
    if (!nome) { alert('⚠️ Digite o nome de um Pokémon.'); return; }
    if (!apiKey) { alert('⚠️ Configure sua chave API.'); return; }
    loadingPve.style.display = 'block'; pveResult.style.display = 'none'; pveNatureAlert.innerHTML = '';
    try {
        const n = normalizarNome(nome);
        let statsBase = null, tipos = null, sprite = null, nomeOficial = nome;
        for (const v of [n, n.replace(/-/g,''), n.split('-')[0]]) {
            try {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${v}`);
                if (resp.ok) {
                    const data = await resp.json();
                    nomeOficial = data.name; tipos = data.types.map(t => t.type.name);
                    sprite = data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default || null;
                    statsBase = { hp: data.stats.find(s => s.stat.name === 'hp').base_stat, atk: data.stats.find(s => s.stat.name === 'attack').base_stat, def: data.stats.find(s => s.stat.name === 'defense').base_stat, spa: data.stats.find(s => s.stat.name === 'special-attack').base_stat, spd: data.stats.find(s => s.stat.name === 'special-defense').base_stat, spe: data.stats.find(s => s.stat.name === 'speed').base_stat };
                    break;
                }
            } catch(e) {}
        }
        if (!statsBase) { alert('❌ Pokémon não encontrado.'); loadingPve.style.display='none'; return; }
        const nomeCap = nomeOficial.charAt(0).toUpperCase() + nomeOficial.slice(1).replace(/-/g, ' ');
        pveNome.textContent = nomeCap;
        pveSpriteBox.innerHTML = sprite ? `<img src="${sprite}" alt="${nomeCap}">` : `<div class="placeholder"><i class="fas fa-question"></i></div>`;
        pveTipos.innerHTML = tipos.map(t => `<span class="tipo-tag ${tipoClass(t)}">${typeNames[t]||t}</span>`).join('');
        pveNivel.textContent = nivelReal || '—';
        pveNaturezaFicha.textContent = naturezaReal || '—';
        const labels = {hp:'HP',atk:'Ataque',def:'Defesa',spa:'SpA',spd:'SpD',spe:'Velocidade'};
        const icons = {hp:'fa-heart',atk:'fa-fist-raised',def:'fa-shield-alt',spa:'fa-fire',spd:'fa-water',spe:'fa-wind'};
        const usarReais = statsReais && Object.values(statsReais).some(v => v && v > 0);
        let statsHtml = '';
        for (const k of ['hp','atk','def','spa','spd','spe']) {
            const val = usarReais ? (statsReais[k] || 0) : statsBase[k];
            const maxVal = usarReais ? 500 : 255;
            const pct = Math.min((val / maxVal) * 100, 100);
            const labelExtra = usarReais ? '' : ' <span style="font-size:0.55rem; color:#94a3b8; font-weight:600;">(base)</span>';
            statsHtml += `<div class="stat-card" data-stat="${k}"><div class="stat-header"><div class="stat-icon"><i class="fas ${icons[k]}"></i></div><div class="stat-info"><div class="stat-label">${labels[k]}${labelExtra}</div><div class="stat-value"><span class="current">${val}</span></div><div class="stat-bar"><div class="fill" style="width:${pct}%;"></div></div></div></div></div>`;
        }
        pveStatusGrid.innerHTML = statsHtml;
        if (usarReais) { pveStatusTitle.innerHTML = '<i class="fas fa-camera"></i> Status Reais'; pveRealStatsBadge.style.display = 'inline-flex'; }
        else { pveStatusTitle.innerHTML = '<i class="fas fa-chart-bar"></i> Atributos Base'; pveRealStatsBadge.style.display = 'none'; }
        pveResult.style.display = 'block';
        const temIVs = ivsReais && Object.values(ivsReais).some(v => parseInt(v) > 0);
        if (temIVs && nivelReal) {
            pveDadosAtuais = { nome: nomeCap, stats: statsReais || {}, ivs: ivsReais, evs: evsReais || {}, natureza: naturezaReal, nivel: nivelReal, baseStats: statsBase };
            naturezasRecomendadasPve = [];
            renderAvaliacaoIV('Pve', pveDadosAtuais, naturezasRecomendadasPve, 'pve');
        } else {
            // Status atuais não permitem descobrir IV com segurança. Não inferir nem exibir IV fictício.
            pveDadosAtuais = { nome: nomeCap, stats: statsReais || {}, ivs: null, evs: evsReais || {}, natureza: naturezaReal, nivel: nivelReal, baseStats: statsBase, fonte: 'foto' };
            const ivContainer = document.getElementById('ivEvaluationPve');
            if (ivContainer) ivContainer.classList.remove('visivel');
        }
        if (!temIVs && !usarReais) {
            const ivContainer = document.getElementById('ivEvaluationPve');
            if (ivContainer) ivContainer.classList.remove('visivel');
        }
        pveNaturezas.innerHTML = '<div style="color:#16a34a; font-weight:700; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Analisando...</div>';
        pveMoves.innerHTML = '<div class="moves-flex"><span class="move-tag"><i class="fas fa-spinner fa-spin"></i> Analisando...</span></div>';
        pveStrategyText.textContent = 'Analisando...';
        let statsInfo = `Base Stats: ${statsBase.hp}/${statsBase.atk}/${statsBase.def}/${statsBase.spa}/${statsBase.spd}/${statsBase.spe}`;
        if (usarReais) statsInfo += `\nStatus Reais (Nv ${nivelReal||'?'}): HP:${statsReais.hp||'?'} ATK:${statsReais.atk||'?'} DEF:${statsReais.def||'?'} SpA:${statsReais.spa||'?'} SpD:${statsReais.spd||'?'} SPE:${statsReais.spe||'?'}`;
        if (temIVs) statsInfo += `\nIVs: ${JSON.stringify(ivsReais)} (Total: ${calcularTotalIV(ivsReais)}/186)`;
        if (naturezaReal) statsInfo += `\nNatureza: ${naturezaReal}`;
        const tmsTexto = getTMsTextoPrompt(tipos, nome);
        const prompt = `Você é especialista em Pokémon PvE. NATUREZAS em INGLÊS. MOVES em INGLÊS.

REGRA: Só recomende TMs da lista:
${tmsTexto}

Formato:
**NATUREZAS E EVs:**
- Natureza 1: [Inglês] | EVs: [Distribuição]
- Natureza 2: [Inglês] | EVs: [Distribuição]
- Natureza 3: [Inglês] | EVs: [Distribuição]
**MELHORES MOVES:** [4 moves em inglês, separados por vírgula]
**ESTRATÉGIA PvE:** [explicação]

Dados:
- Nome: ${nomeCap}
- Tipos: ${tipos.map(t=>typeNames[t]||t).join('/')}
- ${statsInfo}${nivelReal ? `\n- Nível: ${nivelReal}` : ''}`;
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelSelectPve.value}:generateContent?key=${apiKey}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({contents:[{parts:[{text:prompt}]}]}) });
        if (!r.ok) { const ed = await r.json(); throw new Error(ed.error?.message || 'Erro'); }
        const data = await r.json();
        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
        const natSection = texto.match(/\*\*NATUREZAS E EVs:\*\*\s*([\s\S]+?)(?=\*\*MELHORES MOVES|\*\*ESTRATÉGIA|$)/i);
        const movM = texto.match(/\*\*MELHORES MOVES:\*\*\s*(.+?)(?:\n|$)/i);
        const estM = texto.match(/\*\*ESTRATÉGIA PvE:\*\*\s*([\s\S]+?)(?:\n\n|$)/i);
        let naturezasExtraidas = [];
        if (natSection) {
            const linhas = natSection[1].split('\n').filter(l => l.trim().startsWith('-') || /Natureza\s*\d/i.test(l));
            let cardsHtml = ''; let idx = 0;
            for (const linha of linhas) {
                const limpa = linha.replace(/^[\s\-•*]+/, '').trim();
                if (!limpa) continue;
                const match = limpa.match(/Natureza\s*\d*\s*:\s*([^|]+)\|\s*EVs\s*:\s*(.+)/i);
                if (match) {
                    const natNome = normalizarNaturezaIngles(match[1].trim());
                    const evsTexto = match[2].trim();
                    idx++; naturezasExtraidas.push(natNome);
                    const natNorm = natNome.toLowerCase();
                    const isAtual = naturezaReal && (natNorm === naturezaReal.toLowerCase().trim());
                    cardsHtml += `<div class="pve-natureza-card${isAtual?' atual':''}"><div class="pve-nat-header"><div class="pve-nat-icon">${idx}</div><div class="pve-nat-name">${natNome}</div>${isAtual?'<span class="pve-nat-badge-atual">Atual</span>':''}</div><div class="pve-nat-evs-label"><i class="fas fa-dumbbell"></i> EVs Recomendadas (PvE)</div><div class="pve-nat-evs">${evsTexto}</div></div>`;
                }
            }
            pveNaturezas.innerHTML = cardsHtml || '<div style="color:#94a3b8; padding:0.5rem;">Não foi possível extrair.</div>';
        } else pveNaturezas.innerHTML = '<div style="color:#94a3b8; padding:0.5rem;">Não foi possível extrair.</div>';
        if (naturezaReal && naturezasExtraidas.length > 0) verificarNaturezaAtual(naturezaReal, naturezasExtraidas, pveNatureAlert);
        naturezasRecomendadasPve = naturezasExtraidas;
        if (pveDadosAtuais.ivs && calcularTotalIV(pveDadosAtuais.ivs) > 0) {
            renderAvaliacaoIV('Pve', pveDadosAtuais, naturezasRecomendadasPve, 'pve');
        }
        if (movM) {
            const listaMoves = await traduzirListaMoves(movM[1]);
            pveMoves.innerHTML = '<div class="moves-flex">' + listaMoves.map(x => {const nome=String(x).replace(/^TM\s+/i,'').trim();const tm=TMS_DISPONIVEIS.find(y=>y.nome.toLowerCase()===nome.toLowerCase());return `<span class="move-tag move-tag-tm">${tm?`<img class="move-tm-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${tm.tipo}.png" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'" alt="">`:''}${x}</span>`}).join('') + '</div>';
            renderTMCardsOficiais(pveMoves, listaMoves, 'TMs recomendadas para PvE');
        } else pveMoves.innerHTML = '<div class="moves-flex"><span class="move-tag">Não disponível</span></div>';
        pveStrategyText.innerHTML = estM ? estM[1].replace(/\n/g,'<br>') : texto.replace(/\n/g,'<br>');
        if (usarReais) await gerarNotaIAPveStatusReais(pveDadosAtuais);
    } catch(e) { alert('❌ Erro: ' + e.message); }
    finally { loadingPve.style.display = 'none'; }
}
btnPveAnalisar.addEventListener('click', () => gerarBuildPve(null, null, null));
pvePokemonInput.addEventListener('keypress', e => { if (e.key === 'Enter') gerarBuildPve(null, null, null); });

// ============================================================
// INICIALIZAÇÃO
// ============================================================
carregarChaveSalva();
carregarSpritesTierList();
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
    if (this.dataset.tab === 'tab-tier') carregarSpritesTierList();
}));

// ============================================================
