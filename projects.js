const projects = [
  {
    "id": "vibe",
    "title": "Vibe",
    "description": "The world's first fully automated dropshipping platform. AI selects products, builds your store, and runs your ads 24/7.",
    "tags": ["E-Commerce", "Dropshipping", "Full Stack"],
    "links": [
      { "label": "Visit Vibe", "url": "https://vibe-dropshipping.com/", "icon": "fa-solid fa-arrow-up-right-from-square" }
    ]
  },
  {
    "id": "underground",
    "title": "The Underground",
    "description": "A Discord community server. Join the community and be part of something bigger.",
    "tags": ["Community", "Discord"],
    "links": [
      { "label": "Join Discord", "url": "https://discord.gg/Rw3RTkThbn", "icon": "fa-brands fa-discord" }
    ]
  }
];

(function() {
    const grid = document.getElementById('projects-grid');
    const icons = ['fa-solid fa-bolt', 'fa-brands fa-discord'];

    projects.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const tagsHTML = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        const linksHTML = p.links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener" class="project-link">
                <i class="${l.icon}"></i>
                ${l.label}
                <i class="fa-solid fa-arrow-up-right link-arrow"></i>
            </a>
        `).join('');

        card.innerHTML = `
            <div class="project-header">
                <div class="project-name">${p.title}</div>
                <div class="project-icon"><i class="${icons[i] || 'fa-solid fa-code'}"></i></div>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-divider"></div>
            <div class="project-links">${linksHTML}</div>
        `;

        grid.appendChild(card);
    });
})();
