const CONFIG = {
  bioName  : "",
  bio      : "Cybersecurity & web developer, building things that actually work.",
  socials  : {
    discord:"https://discord.com/users/1175399521191215105",
    github:"https://github.com/liglp",
    instagram:"https://www.instagram.com/liglp_ks",
    tiktok:"https://www.tiktok.com/@liglp",
    email:"business@liglp.de"
  },
  manualBadges : [],
  discordId : "1175399521191215105",

  projects : [
    { name:"Working right now", desc:"Doing a lot of small work — and a project that's releasing soon.", url:"#", tag:"soon", icon:"" },
    { name:"Reaper",            desc:"Python cybersecurity multitool.",                        url:"https://github.com/LiGLP/Reaper", tag:"inactive", icon:"img/reaper.png" },
    { name:"Vibe Dropshipping", desc:"A Shopify app that automates Shopify stores with AI.",    url:"https://vibe-dropshipping.com/",  tag:"inactive", icon:"img/vibe-logo-512x512.png" }
  ],

  discordServer : {
    invite      : "https://discord.gg/project-underground",
    widget      : "https://discord.com/api/guilds/1466862579530989611/widget.json",
    name        : "Project Underground (Reactivation)",
    icon        : "img/server-icon.png",
    banner      : "img/server-banner.jpg",
    online      : 20,
    members     : 57,
    founded     : "Jan. 2026",
    description : "Willkommen im Schatten des Systems. Hier schreiben wir unsere eigenen Regeln, brechen digitale Ketten und bauen eine Community fernab der Masse. Bist du bereit, tiefer zu gehen?",
    tags        : ["Underground","Real","System"]
  }
};

const STACK=[["html5","HTML"],["css","CSS"],["javascript","JavaScript"],["tailwindcss","Tailwind CSS"],["nodedotjs","Node.js"],["cplusplus","C++"],["csharp","C#","https://api.iconify.design/mdi/language-csharp.svg?color=%238b949e"],["apache","Apache"],["cloudflare","Cloudflare"],["mysql","MySQL"]];
const SOCIALS=[["discord","Discord"],["github","GitHub"],["instagram","Instagram"],["tiktok","TikTok"],["gmail","Email"]];

const el=id=>document.getElementById(id);
const fmt=ms=>{const s=Math.max(0,Math.floor(ms/1000));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function setPh(node,val){ if(val){node.textContent=val;node.classList.remove("empty");} else {node.textContent="—";node.classList.add("empty");} }

el("stack").innerHTML=STACK.map(([s,n,url])=>`<span><img src="${url||`https://cdn.simpleicons.org/${s}/8b949e`}" alt="">${n}</span>`).join("");
el("socials").innerHTML=SOCIALS.map(([s,n])=>{
  const url=CONFIG.socials[s==="gmail"?"email":s];
  const href=url?(s==="gmail"?"mailto:"+url:url):"#";
  return `<a href="${href}" title="${n}" ${url?'target="_blank" rel="noopener"':''}><img src="https://cdn.simpleicons.org/${s}/8b949e"></a>`;
}).join("");

function renderProjects(){
  const box=el("projList");
  const list=CONFIG.projects||[];
  if(!list.length){ box.innerHTML=`<div class="proj-empty">No projects yet.</div>`; return; }
  box.innerHTML=list.map(p=>{
    const tagStr=(p.tag||"").trim();
    const inactive=tagStr.toLowerCase()==="inactive";
    const real=p.url&&p.url!=="#";
    const icon=p.icon?`<img src="${esc(p.icon)}" alt="">`:esc((p.name||"?").trim().charAt(0).toUpperCase());
    const tag=tagStr?`<span class="tag ${inactive?'inactive':'active'}">${esc(tagStr)}</span>`:"";
    const arrow=real?`<div class="proj-arrow">&rarr;</div>`:"";
    const tagEl=real?"a":"div";
    const attrs=real?`href="${esc(p.url)}" target="_blank" rel="noopener"`:"";
    return `<${tagEl} class="proj ${inactive?'inactive':''}${real?'':' static'}" ${attrs}>
      <div class="proj-ico">${icon}</div>
      <div class="proj-body">
        <div class="proj-name">${esc(p.name)}${tag}</div>
        <div class="proj-desc">${esc(p.desc)}</div>
      </div>
      ${arrow}
    </${tagEl}>`;
  }).join("");
}

function renderInvite(){
  const g=CONFIG.discordServer; if(!g) return;
  el("inviteCard").innerHTML=`
    <button class="inv-close" id="inviteClose" aria-label="Close">&times;</button>
    <div class="inv-banner" style="background-image:url('${esc(g.banner)}')"></div>
    <div class="inv-icon"><img src="${esc(g.icon)}" alt=""></div>
    <div class="inv-body">
      <div class="inv-name">${esc(g.name)}</div>
      <div class="inv-stats">
        <span class="dot on"></span><span id="invOnline">${Number(g.online)||0}</span> online
        <span class="dot off"></span><span id="invMembers">${Number(g.members)||0}</span> Mitglieder
      </div>
      <div class="inv-founded">Gegründet am ${esc(g.founded)}</div>
      <div class="inv-desc">${esc(g.description)}</div>
      <div class="inv-tags">${(g.tags||[]).map(t=>`<span class="inv-tag">${esc(t)}</span>`).join("")}</div>
      <a class="inv-btn" href="${esc(g.invite)}" target="_blank" rel="noopener">Join Server</a>
    </div>`;
  el("inviteClose").addEventListener("click",closeInvite);
}
async function loadServerStats(){
  const g=CONFIG.discordServer; if(!g||!g.widget) return;
  try{
    const r=await fetch(g.widget,{cache:"no-store"});
    if(!r.ok) return;
    const j=await r.json();
    if(typeof j.presence_count==="number"){
      const n=document.getElementById("invOnline");
      if(n) n.textContent=j.presence_count;
    }
  }catch(e){}
}
function openInvite(e){ if(e)e.preventDefault(); el("inviteOverlay").classList.add("show"); loadServerStats(); }
function closeInvite(){ el("inviteOverlay").classList.remove("show"); }
el("inviteOverlay").addEventListener("click",e=>{ if(e.target===el("inviteOverlay")) closeInvite(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeInvite(); });
el("badges").addEventListener("click",e=>{ if(e.target.closest(".guild-tag")) openInvite(e); });

function renderConfig(){
  const bio=el("bioText");
  if(CONFIG.bio){ bio.innerHTML=CONFIG.bio.replace(/\{([^}]+)\}/g,'<span class="brand">$1</span>'); bio.classList.remove("empty"); }
  else { bio.textContent="—"; bio.classList.add("empty"); }
}

const FLAGS={1:"staff",2:"partner",4:"hypesquad_events",8:"bug_hunter_level_1",64:"hypesquad_house_1",128:"hypesquad_house_2",256:"hypesquad_house_3",512:"premium_early_supporter",16384:"bug_hunter_level_2",131072:"verified_developer",4194304:"active_developer"};
const BADGE_URL={
  staff:"https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png",
  partner:"https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png",
  hypesquad_events:"https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png",
  bug_hunter_level_1:"https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png",
  bug_hunter_level_2:"https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png",
  hypesquad_house_1:"https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png",
  hypesquad_house_2:"https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png",
  hypesquad_house_3:"https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png",
  premium_early_supporter:"https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png",
  verified_developer:"https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png",
  active_developer:"https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png",
  nitro:"https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png"
};
const BADGE_NAME={staff:"Discord Staff",partner:"Partner",hypesquad_events:"HypeSquad Events",bug_hunter_level_1:"Bug Hunter",bug_hunter_level_2:"Bug Hunter Gold",hypesquad_house_1:"HypeSquad Bravery",hypesquad_house_2:"HypeSquad Brilliance",hypesquad_house_3:"HypeSquad Balance",premium_early_supporter:"Early Supporter",verified_developer:"Early Verified Bot Developer",active_developer:"Active Developer",nitro:"Nitro"};

let badgesDone=false;
function guildTagHtml(u){
  const pg=u.primary_guild;
  if(pg&&pg.identity_enabled&&pg.badge&&pg.tag){
    const tt=CONFIG.discordServer?CONFIG.discordServer.name:"Server Tag";
    return `<span class="guild-tag clickable" title="${esc(tt)}"><img src="https://cdn.discordapp.com/guild-tag-badges/${pg.identity_guild_id}/${pg.badge}.png?size=32" alt="">${esc(pg.tag)}</span>`;
  }
  return "";
}
function badgesFromFlags(u){
  const flags=u.public_flags||0;const out=[];
  for(const bit in FLAGS){ if(flags&Number(bit)) out.push(FLAGS[bit]); }
  (CONFIG.manualBadges||[]).forEach(b=>out.push(b));
  const seen=new Set();let html="";
  out.forEach(k=>{ if(seen.has(k)||!BADGE_URL[k])return;seen.add(k);
    html+=`<img src="${BADGE_URL[k]}" title="${BADGE_NAME[k]||k}" alt="">`; });
  return html;
}
async function renderBadges(u){
  const box=el("badges");
  if(badgesDone){ return; }
  badgesDone=true;
  let html="";
  try{
    const r=await fetch(`https://dcdn.dstn.to/profile/${CONFIG.discordId}`);
    if(r.ok){
      const j=await r.json();
      if(Array.isArray(j.badges)&&j.badges.length){
        html=j.badges.filter(b=>b.icon).map(b=>
          `<img src="https://cdn.discordapp.com/badge-icons/${b.icon}.png" title="${esc(b.description||'')}" alt="">`).join("");
      }
      const pu=j.user||{};
      if(pu.banner){
        el("banner").style.backgroundImage=`url(https://cdn.discordapp.com/banners/${pu.id||u.id}/${pu.banner}.${pu.banner.startsWith("a_")?"gif":"png"}?size=600)`;
      }
    }
  }catch(e){}
  if(!html) html=badgesFromFlags(u);
  box.innerHTML=html+guildTagHtml(u);
}

let ws,heartbeat,reconnectTimer,spTimer;

function connect(){
  clearTimeout(reconnectTimer);
  if(!CONFIG.discordId) return;
  ws=new WebSocket("wss://api.lanyard.rest/socket");
  ws.onmessage=e=>{
    const {op,d,t}=JSON.parse(e.data);
    if(op===1){
      clearInterval(heartbeat);
      heartbeat=setInterval(()=>ws.readyState===1&&ws.send(JSON.stringify({op:3})),d.heartbeat_interval);
      ws.send(JSON.stringify({op:2,d:{subscribe_to_id:CONFIG.discordId}}));
    }
    if(op===0&&(t==="INIT_STATE"||t==="PRESENCE_UPDATE")){
      if(!d||!d.discord_user) return;
      render(d);
    }
  };
  ws.onclose=()=>{clearInterval(heartbeat);reconnectTimer=setTimeout(connect,3000)};
  ws.onerror=()=>ws.close();
}

function render(d){
  const u=d.discord_user;
  el("handle").textContent="@"+(u.username||"");
  const dn=u.global_name||u.display_name||u.username||"—";
  el("displayName").textContent=dn;
  document.title=dn;
  renderBadges(u);

  const avatarUrl=u.avatar
    ?`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${u.avatar.startsWith("a_")?"gif":"png"}?size=256`
    :`https://cdn.discordapp.com/embed/avatars/0.png`;
  el("avatar").src=avatarUrl;
  const fav=document.getElementById("favicon");
  if(fav) fav.href=u.avatar
    ?`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64`
    :`https://cdn.discordapp.com/embed/avatars/0.png`;

  const deco=el("avatarDeco");
  if(u.avatar_decoration_data&&u.avatar_decoration_data.asset){
    deco.src=`https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png?size=160&passthrough=true`;
    deco.style.display="block";
  }else deco.style.display="none";

  if(u.banner){
    el("banner").style.backgroundImage=`url(https://cdn.discordapp.com/banners/${u.id}/${u.banner}.${u.banner.startsWith("a_")?"gif":"png"}?size=600)`;
  }

  const status=d.discord_status||"offline";
  el("pdot").dataset.s=status;

  el("bioName").textContent=CONFIG.bioName||u.global_name||u.username||"—";

  renderSpotify(d);
}

function renderSpotify(d){
  const card=el("spotifyCard");clearInterval(spTimer);
  if(d.listening_to_spotify&&d.spotify){
    const s=d.spotify;
    card.classList.remove("hidden");
    el("spArt").src=s.album_art_url||"";
    el("spSong").textContent=s.song;
    el("spArtist").textContent=s.artist;
    el("spAlbum").textContent=s.album;
    if(el("spCode").childElementCount===0){
      let bars="";for(let i=0;i<21;i++){const h=4+Math.round(Math.abs(Math.sin(i*1.7))*12);bars+=`<i style="height:${h}px"></i>`;}
      el("spCode").innerHTML=bars;
    }
    const start=s.timestamps.start,dur=s.timestamps.end-start;
    el("spTot").textContent=fmt(dur);
    const tick=()=>{
      const cur=Math.min(Date.now()-start,dur);
      el("spCur").textContent=fmt(cur);
      el("spProg").style.width=(cur/dur*100)+"%";
    };
    tick();spTimer=setInterval(tick,1000);
  }else card.classList.add("hidden");
}

renderConfig();
renderProjects();
renderInvite();
connect();
