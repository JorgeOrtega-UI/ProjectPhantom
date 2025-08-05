export function initMainController() {
    // --- CONFIGURACIÓN ---
    let allowCloseOnOutsideClick = true; // true: se cierra al hacer clic fuera. false: no se cierra.
    let allowCloseOnEscKey = true;       // true: se cierra con la tecla ESC. false: no se cierra.
    let countriesLoaded = false;         // Flag para asegurar que la lista se carga solo una vez.

    // --- ELEMENTOS DEL DOM ---
    const toggleButton = document.querySelector('[data-action="toggleModuleOptions"]');
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');

    if (!toggleButton || !moduleOptions) {
        console.error("Module components not found!");
        return;
    }

    // --- FUNCIÓN PARA CARGAR PAÍSES DESDE LA API ---
    const loadCountryList = async () => {
        if (countriesLoaded) return; // Si ya se cargaron, no hacer nada.

        const listContainer = moduleOptions.querySelector('[data-menu-list="location"]');
        if (!listContainer) return;

        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            if (!response.ok) throw new Error('Network response was not ok');
            
            let countries = await response.json();
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            listContainer.innerHTML = ''; // Limpiar el mensaje "Cargando...".

            countries.forEach(country => {
                const countryName = country.name.common;
                const linkElement = `
                    <div class="menu-link">
                        <div class="menu-link-icon"><span class="material-symbols-rounded">radio_button_unchecked</span></div>
                        <div class="menu-link-text"><span>${countryName}</span></div>
                    </div>
                `;
                listContainer.insertAdjacentHTML('beforeend', linkElement);
            });
            countriesLoaded = true; // Marcar como cargados.

        } catch (error) {
            console.error("Failed to load country list:", error);
            listContainer.innerHTML = '<div class="menu-link" style="cursor: default;"><div class="menu-link-text"><span>Error al cargar la lista</span></div></div>';
        }
    };

    // --- FUNCIÓN CENTRALIZADA PARA CERRAR EL MÓDULO ---
    const closeModule = () => {
        if (moduleOptions.classList.contains('disabled')) return;
        moduleOptions.classList.add('disabled');
        const allMenus = moduleOptions.querySelectorAll('[data-menu]');
        allMenus.forEach(menu => {
            if (menu.getAttribute('data-menu') === 'main') {
                menu.classList.remove('disabled');
            } else {
                menu.classList.add('disabled');
            }
        });
    };
    
    // --- FUNCIÓN PARA ABRIR EL MÓDULO ---
    const openModule = () => {
        moduleOptions.classList.remove('disabled');
        loadCountryList();
    };

    // --- MANEJADORES DE EVENTOS ---
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (moduleOptions.classList.contains('disabled')) {
            openModule();
        } else {
            closeModule();
        }
    });

    moduleOptions.addEventListener('click', (event) => {
        event.stopPropagation();
        const link = event.target.closest('.menu-link');
        if (!link) return;
        const action = link.dataset.action;
        const currentMenu = link.closest('[data-menu]');
        if (!currentMenu || action !== 'navigate') return;
        const targetMenuName = link.dataset.targetMenu;
        if (!targetMenuName) return;
        const targetMenu = moduleOptions.querySelector(`[data-menu="${targetMenuName}"]`);
        if (targetMenu) {
            currentMenu.classList.add('disabled');
            targetMenu.classList.remove('disabled');
        }
    });

    // Lógica de Búsqueda de Países
    const searchInput = moduleOptions.querySelector('[data-search-input="location"]');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const countryListContainer = moduleOptions.querySelector('[data-menu-list="location"]');
            if (!countryListContainer) return;

            const countries = countryListContainer.querySelectorAll('.menu-link');
            countries.forEach(country => {
                const countryText = country.querySelector('.menu-link-text span');
                if (countryText) {
                    const countryName = countryText.textContent.toLowerCase();
                    if (countryName.includes(searchTerm)) {
                        country.style.display = 'flex';
                    } else {
                        country.style.display = 'none';
                    }
                }
            });
        });
    }

    document.addEventListener('click', () => {
        if (allowCloseOnOutsideClick) closeModule();
    });

    document.addEventListener('keydown', (event) => {
        if (allowCloseOnEscKey && event.key === 'Escape') closeModule();
    });
}