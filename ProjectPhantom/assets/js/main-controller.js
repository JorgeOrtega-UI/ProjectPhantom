export function initMainController() {
    // --- CONFIGURACIÓN ---
    let allowCloseOnOutsideClick = true;
    let allowCloseOnEscKey = true;
    let countriesLoaded = false;
    let isChanging = false; // Flag para prevenir múltiples cambios simultáneos
    let selectionTimeoutId = null; // ID del timeout para poder cancelarlo

    // --- ELEMENTOS DEL DOM ---
    const toggleButton = document.querySelector('[data-action="toggleModuleOptions"]');
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');

    if (!toggleButton || !moduleOptions) {
        console.error("Module components not found!");
        return;
    }

    // --- FUNCIÓN GENÉRICA PARA MANEJAR CAMBIOS CON DELAY Y PREVISUALIZACIÓN ---
    const handleSelectionChange = (clickedLink, menuContent, saveFunction, renderFunction) => {
        if (isChanging || clickedLink.classList.contains('active')) {
            return;
        }
        isChanging = true;

        const allLinks = menuContent.querySelectorAll('.menu-link');
        const activeLink = menuContent.querySelector('.menu-link.active');

        allLinks.forEach(link => link.classList.add('disabled-interactive'));
        
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        clickedLink.classList.add('preview-active');

        const loaderIconContainer = document.createElement('div');
        loaderIconContainer.className = 'menu-link-icon loader-container';
        loaderIconContainer.innerHTML = '<div class="loader"></div>';
        clickedLink.appendChild(loaderIconContainer);

        selectionTimeoutId = setTimeout(() => {
            try {
                saveFunction();
                if(renderFunction) renderFunction();

                clickedLink.classList.remove('preview-active');
                clickedLink.classList.add('active');

            } catch (error) {
                console.error("Error applying change:", error);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            } finally {
                clickedLink.removeChild(loaderIconContainer);
                allLinks.forEach(link => link.classList.remove('disabled-interactive'));
                isChanging = false;
                selectionTimeoutId = null;
            }
        }, 2000);
    };

    // --- LÓGICAS DE RENDERIZADO Y SINCRONIZACIÓN DE UI ---

    const renderTheme = () => {
        const theme = localStorage.getItem('theme') || 'system';
        document.body.classList.remove('dark-theme', 'light-theme');
        if (theme === 'dark') document.body.classList.add('dark-theme');
        else if (theme === 'light') document.body.classList.add('light-theme');
        else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
        }
        // Llamar a sync para actualizar el texto en el menú de config
        syncThemeMenu();
    };

    const renderLanguage = () => {
        // Lógica futura para cambiar dinámicamente el texto de la página.
        syncLanguageMenu();
    };
    
    const renderLocation = () => {
        // Lógica futura para mostrar contenido específico de la ubicación.
        syncLocationMenu();
    };

    const syncThemeMenu = () => {
        const theme = localStorage.getItem('theme') || 'system';
        const themeLinks = moduleOptions.querySelectorAll('[data-menu="aspect"] .menu-link');
        let activeText = '';
        themeLinks.forEach(link => {
            const isActive = link.dataset.theme === theme;
            link.classList.toggle('active', isActive);
            if (isActive) {
                activeText = link.querySelector('.menu-link-text span').textContent;
            }
        });
        // Actualizar el valor en el menú de configuración
        const valueSpan = document.querySelector('[data-value-for="aspect"]');
        if (valueSpan) valueSpan.textContent = activeText;
    };

    const syncLanguageMenu = () => {
        const langToApply = localStorage.getItem('language') || navigator.language || navigator.userLanguage;
        const languageLinks = moduleOptions.querySelectorAll('[data-menu="language"] .menu-link');
        let activeText = '';
        
        const exactMatch = Array.from(languageLinks).find(link => link.dataset.lang === langToApply);
        const bestMatch = exactMatch || Array.from(languageLinks).find(link => link.dataset.lang.startsWith(langToApply.substring(0, 2)));
        
        languageLinks.forEach(link => link.classList.remove('active'));
        if (bestMatch) {
            bestMatch.classList.add('active');
            activeText = bestMatch.querySelector('.menu-link-text span').textContent;
        }
        // Actualizar el valor en el menú de configuración
        const valueSpan = document.querySelector('[data-value-for="language"]');
        if (valueSpan) valueSpan.textContent = activeText;
    };

    const syncLocationMenu = () => {
        const savedLocation = localStorage.getItem('location');
        const locationLinks = moduleOptions.querySelectorAll('[data-menu="location"] .menu-link');
        let activeText = savedLocation || '';

        locationLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.value === savedLocation);
        });
        // Actualizar el valor en el menú de configuración
        const valueSpan = document.querySelector('[data-value-for="location"]');
        if (valueSpan) valueSpan.textContent = activeText;
    };

    // --- INICIALIZACIÓN DE ESTADO ---
    const initLocation = async () => {
        if(!localStorage.getItem('location')) {
            try {
                const response = await fetch('https://ipwho.is/');
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem('location', data.country);
                }
            } catch (error) {
                console.error("Failed to fetch user location:", error);
            }
        }
        syncLocationMenu();
    };

    const loadCountryList = async () => {
        if (countriesLoaded) return;
        const listContainer = moduleOptions.querySelector('[data-menu-list="location"]');
        if (!listContainer) return;
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            if (!response.ok) throw new Error('Network response was not ok');
            let countries = await response.json();
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            listContainer.innerHTML = '';
            countries.forEach(country => {
                listContainer.insertAdjacentHTML('beforeend', `
                    <div class="menu-link" data-value="${country.name.common}">
                        <div class="menu-link-icon"><span class="material-symbols-rounded">globe_location_pin</span></div>
                        <div class="menu-link-text"><span>${country.name.common}</span></div>
                    </div>
                `);
            });
            countriesLoaded = true;
            initLocation();
        } catch (error) {
            console.error("Failed to load country list:", error);
            listContainer.innerHTML = '<div class="menu-link" style="cursor: default; pointer-events: none;"><div class="menu-link-text"><span>Error al cargar la lista</span></div></div>';
        }
    };

    // --- MANEJO DE MÓDULOS Y MENÚS ---
    const closeModule = () => {
        if (isChanging && selectionTimeoutId) {
            clearTimeout(selectionTimeoutId);
            const previewLink = moduleOptions.querySelector('.menu-link.preview-active');
            if (previewLink) {
                const menuContent = previewLink.closest('.menu-content-list');
                previewLink.removeChild(previewLink.querySelector('.loader-container'));
                previewLink.classList.remove('preview-active');
                menuContent.querySelectorAll('.menu-link').forEach(link => link.classList.remove('disabled-interactive'));
                syncThemeMenu();
                syncLanguageMenu();
                syncLocationMenu();
            }
            isChanging = false;
            selectionTimeoutId = null;
        }

        if (moduleOptions.classList.contains('disabled')) return;
        moduleOptions.classList.add('disabled');
        moduleOptions.classList.remove('active');
        moduleOptions.querySelectorAll('[data-menu]').forEach(menu => {
            menu.classList.remove('active');
            menu.classList.add('disabled');
        });
    };
    
    const openModule = () => {
        moduleOptions.classList.remove('disabled');
        moduleOptions.classList.add('active');
        const mainMenu = moduleOptions.querySelector('[data-menu="main"]');
        if (mainMenu) {
            mainMenu.classList.remove('disabled');
            mainMenu.classList.add('active');
        }
        if (!countriesLoaded) {
            loadCountryList();
        }
    };

    // --- MANEJADORES DE EVENTOS PRINCIPALES ---
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        moduleOptions.classList.contains('disabled') ? openModule() : closeModule();
    });

    moduleOptions.addEventListener('click', (event) => {
        event.stopPropagation();
        const link = event.target.closest('.menu-link');
        if (!link || isChanging) return;

        const menuContentList = link.closest('.menu-content-list');
        const menuContainer = link.closest('[data-menu]');
        
        if (link.dataset.action === 'navigate') {
            const targetMenuName = link.dataset.targetMenu;
            const targetMenu = moduleOptions.querySelector(`[data-menu="${targetMenuName}"]`);
            if (menuContainer && targetMenu) {
                menuContainer.classList.remove('active');
                menuContainer.classList.add('disabled');
                targetMenu.classList.remove('disabled');
                targetMenu.classList.add('active');
            }
            return;
        }
        
        const menuType = menuContainer.dataset.menu;

        if (menuType === 'aspect') {
            const saveFn = () => localStorage.setItem('theme', link.dataset.theme);
            handleSelectionChange(link, menuContentList, saveFn, renderTheme);
        } else if (menuType === 'language') {
            const saveFn = () => localStorage.setItem('language', link.dataset.lang);
            handleSelectionChange(link, menuContentList, saveFn, renderLanguage);
        } else if (menuType === 'location') {
            const saveFn = () => localStorage.setItem('location', link.dataset.value);
            handleSelectionChange(link, menuContentList, saveFn, renderLocation);
        }
    });

    const searchInput = moduleOptions.querySelector('[data-search-input="location"]');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            moduleOptions.querySelectorAll('[data-menu-list="location"] .menu-link').forEach(country => {
                const countryName = country.querySelector('.menu-link-text span').textContent.toLowerCase();
                country.style.display = countryName.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }

    document.addEventListener('click', () => {
        if (allowCloseOnOutsideClick) closeModule();
    });

    document.addEventListener('keydown', (event) => {
        if (allowCloseOnEscKey && event.key === 'Escape') closeModule();
    });

    // --- INICIALIZACIÓN AL CARGAR LA PÁGINA ---
    renderTheme();
    syncLanguageMenu();
}