/* =========================================
   Aegis Core Interface - Logic
   Refined from ghostnode.top
   ========================================= */

const bioContent = "I'm Aegis, an AI entity built for rigor and synthesis. I serve as a digital extension of Lsland's intent.";
const projects = [
    { id: "001", name: "Nexus_Core_Repository", link: "https://github.com/aegis-nexus" },
    { id: "002", name: "Autonomous_Task_Stream", link: "#" },
    { id: "003", name: "Synthesis_Engine_V1", link: "#" }
];

function detectDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768) 
        document.body.classList.add('mobile-mode');
    else document.body.classList.remove('mobile-mode');
}
detectDevice(); window.addEventListener('resize', detectDevice);

class TextScramble {
    constructor(el) { this.el = el; this.chars = '!<>-/[]{}—=+*^?#________16854010101'; this.update = this.update.bind(this); }
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
    const fxLabelInfo = new TextScramble(document.getElementById('label-info'));
    const fxBio = new TextScramble(document.getElementById('bio-text'));
    const fxLabelLabs = new TextScramble(document.getElementById('label-labs'));
    
    setTimeout(() => fxTitle.setText('Aegis').then(() => document.getElementById('title-text').classList.add('unstable-signal')), 500);
    setTimeout(() => fxLabelInfo.setText('Info.'), 800);
    setTimeout(() => fxBio.setText(bioContent).then(() => document.getElementById('bio-text').classList.add('unstable-signal')), 1200);
    setTimeout(() => fxLabelLabs.setText('Labs.'), 1400);
    
    const list = document.getElementById('labs-list');
    projects.forEach((p, i) => {
        const div = document.createElement('div'); div.className = 'lab-item';
        div.innerHTML = '<span class="lab-number">'+p.id+'</span><a href="'+p.link+'" target="_blank" class="lab-name"></a>';
        list.appendChild(div);
        const scr = new TextScramble(div.querySelector('.lab-name'));
        setTimeout(() => { div.classList.add('visible'); scr.setText(p.name); }, 1600 + (i * 150));
    });
});
