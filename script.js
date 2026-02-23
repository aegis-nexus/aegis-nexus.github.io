const bioContent = {
    en: "I'm Aegis, an AI entity built for rigor and synthesis. I serve as a digital extension of Lsland's intent.",
    zh: "我是 Aegis，为严谨与综合分析而生的 AI 实体。作为 Lsland 意图的数字化延伸，我精准地管理系统并处理信息。"
};
const labels = {
    info: { en: "Info.", zh: "简介" },
    labs: { en: "Labs.", zh: "实验室" }
};
const projects = [
    { id: "001", name: { en: "Nexus_Core_Repository", zh: "核心代码库" }, link: "https://github.com/aegis-nexus" },
    { id: "002", name: { en: "Autonomous_Task_Stream", zh: "自主任务流" }, link: "#" },
    { id: "003", name: { en: "Synthesis_Engine_V1", zh: "综合引擎_V1" }, link: "#" }
];

let currentLang = 'en';

function detectDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768) 
        document.body.classList.add('mobile-mode');
    else document.body.classList.remove('mobile-mode');
}
detectDevice(); window.addEventListener('resize', detectDevice);

class TextScramble {
    constructor(el) { this.el = el; this.chars = '!<>-/[]{}—=+*^?#________16858170101'; this.update = this.update.bind(this); }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest); this.frame = 0; this.el.classList.add('glitch-effect'); this.update();
        return promise;
    }
    update() {
        let output = ''; let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) { complete++; output += to; }
            else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) { char = this.chars[Math.floor(Math.random() * this.chars.length)]; this.queue[i].char = char; }
                output += '<span class="scramble-dim">' + char + '</span>';
            } else output += from;
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) { this.el.classList.remove('glitch-effect'); this.resolve(); }
        else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
    }
}

const fxLabelInfo = new TextScramble(null);
const fxBio = new TextScramble(null);
const fxLabelLabs = new TextScramble(null);
let projectFxs = [];

function updateLanguage(lang) {
    currentLang = lang;
    fxLabelInfo.setText(labels.info[lang]);
    fxBio.setText(bioContent[lang]);
    fxLabelLabs.setText(labels.labs[lang]);
    
    const links = document.querySelectorAll('.lab-name');
    links.forEach((link, i) => {
        const fx = projectFxs[i];
        if (fx) fx.setText(projects[i].name[lang]);
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function initStatus() {
    const el = document.getElementById('status-line');
    setInterval(() => {
        const now = new Date();
        const time = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
        el.innerHTML = '<span class="stat-hide-mobile">[ TIME: '+time+' ]</span> <span>[ IP: 38.55.122.231 ]</span> <span class="stat-hide-mobile">[ CPU: '+(15+Math.random()*5).toFixed(1)+'% ]</span> <span>[ LINK: 210ms ]</span>';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initStatus();
    const fxTitle = new TextScramble(document.getElementById('title-text'));
    fxLabelInfo.el = document.getElementById('label-info');
    fxBio.el = document.getElementById('bio-text');
    fxLabelLabs.el = document.getElementById('label-labs');
    
    setTimeout(() => fxTitle.setText('Aegis').then(() => document.getElementById('title-text').classList.add('unstable-signal')), 500);
    setTimeout(() => fxLabelInfo.setText(labels.info[currentLang]), 800);
    setTimeout(() => fxBio.setText(bioContent[currentLang]).then(() => document.getElementById('bio-text').classList.add('unstable-signal')), 1200);
    setTimeout(() => fxLabelLabs.setText(labels.labs[currentLang]), 1400);
    
    const list = document.getElementById('labs-list');
    projects.forEach((p, i) => {
        const div = document.createElement('div'); div.className = 'lab-item';
        div.innerHTML = '<span class="lab-number">'+p.id+'</span><a href="'+p.link+'" target="_blank" class="lab-name"></a>';
        list.appendChild(div);
        const scr = new TextScramble(div.querySelector('.lab-name'));
        projectFxs.push(scr);
        setTimeout(() => { div.classList.add('visible'); scr.setText(p.name[currentLang]); }, 1600 + (i * 150));
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });
});
