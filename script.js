const projects = [
  {
    title: "Al Viale",
    city: "nova-siri",
    theme: "alviale",
    label: "Nova Siri",
    description: "Menu digitale per consultare rapidamente le proposte del locale.",
    hero: "assets/alviale-hero.png",
    siteUrl: "https://ros002x.github.io/alviale-menu/",
    repoUrl: "https://github.com/ros002x/alviale-menu"
  },
  {
    title: "Bar Corso",
    city: "nova-siri",
    theme: "barcorso",
    label: "Nova Siri",
    description: "Progetto web per menu, contenuti e presenza digitale del bar.",
    hero: "assets/barcorso-hero.webp",
    siteUrl: "https://ros002x.github.io/barcorso-demo/",
    repoUrl: "https://github.com/ros002x/barcorso-demo"
  },
  {
    title: "BeerBQ",
    city: "nova-siri",
    theme: "beerbq",
    label: "Nova Siri",
    description: "Menu ufficiale BeerBQ con carne, panini, ribs e specialita del locale.",
    hero: "assets/beerbq-hero.png",
    siteUrl: "https://ros002x.github.io/beerbq-menu-demo/",
    repoUrl: "https://github.com/ros002x/beerbq-menu-demo"
  },
  {
    title: "Gran Caffe",
    city: "nova-siri",
    theme: "grancaffe",
    label: "Nova Siri",
    description: "Menu digitale demo per Gran Caffe Essential a Nova Siri Marina.",
    hero: "assets/grancaffe-hero.png",
    siteUrl: "https://ros002x.github.io/gran-caffe-essential-demo/",
    repoUrl: "https://github.com/ros002x/gran-caffe-essential-demo"
  },
  {
    title: "Moulin Blanc",
    city: "nova-siri",
    theme: "moulin",
    label: "Nova Siri",
    description: "Menu digitale per pizzeria e locale, ottimizzato per consultazione mobile.",
    hero: "assets/moulin-hero.png",
    siteUrl: "https://ros002x.github.io/moulin-blanc-menu/",
    repoUrl: "https://github.com/ros002x/moulin-blanc-menu"
  },
  {
    title: "Respect Tattoo Art",
    city: "nova-siri",
    theme: "tattoo",
    label: "Nova Siri",
    description: "Sito vetrina per studio tattoo, informazioni, stile e contatti.",
    hero: "assets/tattoo-hero.png",
    logo: "assets/respect-logo.png",
    siteUrl: "https://ros002x.github.io/respect-tattoo-art/",
    repoUrl: "https://github.com/ros002x/respect-tattoo-art"
  },
  {
    title: "Tunnel 2.0",
    city: "policoro",
    theme: "tunnel",
    label: "Policoro",
    description: "Menu Smokehouse con focus su BBQ, burger e proposte del locale.",
    hero: "assets/tunnel-hero.png",
    siteUrl: "https://ros002x.github.io/tunnel-2-0-smokehouse/",
    repoUrl: "https://github.com/ros002x/tunnel-2-0-smokehouse"
  },
  {
    title: "Vida Loca",
    city: "nova-siri",
    theme: "vidaloca",
    label: "Nova Siri",
    description: "Esperienza web mobile per locale, menu e contenuti promozionali.",
    hero: "assets/vidaloca-hero.png",
    siteUrl: "https://ros002x.github.io/vidaloca-demo/",
    repoUrl: "https://github.com/ros002x/vidaloca-demo"
  },
  {
    title: "Cinema Hollywood",
    city: "policoro",
    theme: "cinema",
    label: "Policoro",
    description: "Programmazione cinema, film e biglietti in una pagina pensata per mobile.",
    hero: "assets/cinema-hero-generated-v2.png",
    siteUrl: "https://ros002x.github.io/cinema-hollywood/",
    repoUrl: "https://github.com/ros002x/cinema-hollywood"
  }
];

const projectsEl = document.querySelector("#projects");
const filtersEl = document.querySelector("#cityFilters");
const searchEl = document.querySelector("#projectSearch");
let activeCity = "all";
let searchTerm = "";

const cities = [
  { id: "all", label: "Tutti" },
  { id: "policoro", label: "Policoro" },
  { id: "nova-siri", label: "Nova Siri" }
];

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const renderFilters = () => {
  filtersEl.innerHTML = cities
    .map(
      (city) => `
        <button class="filter-button${city.id === activeCity ? " is-active" : ""}" type="button" data-city="${city.id}">
          ${city.label}
        </button>
      `
    )
    .join("");
};

const renderProjects = () => {
  const cityProjects = activeCity === "all"
    ? projects
    : projects.filter((project) => project.city === activeCity);

  const visibleProjects = searchTerm
    ? cityProjects.filter((project) =>
        [project.title, project.label, project.description]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm)
      )
    : cityProjects;

  projectsEl.innerHTML = visibleProjects
    .map((project) => {
      const id = slugify(project.title);

      return `
        <section class="project project--${project.theme}" id="${id}" style="--hero-image: url('${project.hero.replace(/'/g, "%27")}')">
          ${project.logo ? `<img class="project__logo-mark" src="${project.logo}" alt="" aria-hidden="true">` : ""}
          <div class="project__content">
            <p class="eyebrow">${project.label}</p>
            <a class="project__title" href="${project.siteUrl}" target="_blank" rel="noopener">
              <h2>${project.title}</h2>
            </a>
            <p class="project__description">${project.description}</p>
            <div class="project__actions">
              <a class="button button--primary" href="${project.siteUrl}" target="_blank" rel="noopener">Apri sito</a>
              <a class="button" href="${project.repoUrl}" target="_blank" rel="noopener">Apri repo</a>
            </div>
          </div>
        </section>
      `;
    })
    .join("") || `
      <section class="project project--empty">
        <div class="project__content">
          <p class="eyebrow">Nessun risultato</p>
          <h2>Locale non trovato</h2>
          <p class="project__description">Prova con un altro nome o cambia filtro citta.</p>
        </div>
      </section>
    `;
};

filtersEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-city]");

  if (!button) {
    return;
  }

  activeCity = button.dataset.city;
  renderFilters();
  renderProjects();
});

searchEl.addEventListener("input", () => {
  searchTerm = searchEl.value.trim().toLowerCase();
  renderProjects();
});

renderFilters();
renderProjects();
