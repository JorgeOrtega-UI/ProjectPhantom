<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css">
    <title>ProjectPhantom - Home</title>
</head>

<body>
    <div class="page-wrapper">
        <div class="main-content">
            <div class="general-content">
                <div class="general-content-top">
                    <div class="header">
                        <div class="header-left"></div>
                        <div class="header-right">
                            <div class="header-item">
                                <div class="header-button" data-action="toggleModuleOptions">
                                    <span class="material-symbols-rounded">more_vert</span>
                                </div>
                            </div>
                        </div>
                        <div class="module-content module-options disabled" data-module="moduleOptions">

                            <div class="menu-content overflow-y disabled" data-menu="main">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-list overflow-y">
                                    <div class="menu-link" data-action="navigate" data-target-menu="config">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">settings</span></div>
                                        <div class="menu-link-text"><span>Configuración</span></div>
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">chevron_right</span></div>
                                    </div>
                                    <div class="menu-link" data-action="navigate" data-target-menu="help">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">help</span></div>
                                        <div class="menu-link-text"><span>Ayuda y recursos</span></div>
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">chevron_right</span></div>
                                    </div>
                                </div>
                            </div>

                            <div class="menu-content overflow-y disabled" data-menu="config">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-list overflow-y">
                                    <div class="menu-link" data-action="navigate" data-target-menu="aspect">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">palette</span></div>
                                        <div class="menu-link-text">
                                            <span>Aspecto:</span>
                                            <span class="menu-link-value" data-value-for="aspect"></span>
                                        </div>
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">chevron_right</span></div>
                                    </div>
                                    <div class="menu-link" data-action="navigate" data-target-menu="language">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                        <div class="menu-link-text">
                                            <span>Lenguaje:</span>
                                            <span class="menu-link-value" data-value-for="language"></span>
                                        </div>
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">chevron_right</span></div>
                                    </div>
                                    <div class="menu-link" data-action="navigate" data-target-menu="location">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">location_on</span></div>
                                        <div class="menu-link-text">
                                            <span>Ubicación:</span>
                                            <span class="menu-link-value" data-value-for="location"></span>
                                        </div>
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">chevron_right</span></div>
                                    </div>
                                </div>
                            </div>


                            <div class="menu-content overflow-y disabled" data-menu="aspect">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-list overflow-y">
                                    <div class="menu-link" data-theme="system">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">brightness_auto</span></div>
                                        <div class="menu-link-text"><span>Sincronizar con el sistema</span></div>
                                    </div>
                                    <div class="menu-link" data-theme="dark">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">dark_mode</span></div>
                                        <div class="menu-link-text"><span>Tema oscuro</span></div>
                                    </div>
                                    <div class="menu-link" data-theme="light">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">light_mode</span></div>
                                        <div class="menu-link-text"><span>Tema claro</span></div>
                                    </div>
                                </div>
                            </div>

                            <div class="menu-content overflow-y disabled" data-menu="language">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-list overflow-y">
                                    <div class="menu-link" data-lang="en-US">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                        <div class="menu-link-text"><span>English (United States)</span></div>
                                    </div>
                                    <div class="menu-link" data-lang="es-MX">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                        <div class="menu-link-text"><span>Español (México)</span></div>
                                    </div>
                                    <div class="menu-link" data-lang="fr-FR">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                        <div class="menu-link-text"><span>Français (France)</span></div>
                                    </div>
                                </div>
                            </div>

                            <div class="menu-content overflow-y disabled" data-menu="location">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-header">
                                    <div class="search-content">
                                        <div class="search-content-icon">
                                            <span class="material-symbols-rounded">search</span>
                                        </div>
                                        <div class="search-content-text">
                                            <input type="text" placeholder="Buscar país..." data-search-input="location">
                                        </div>
                                    </div>
                                </div>
                                <div class="menu-content-list overflow-y" data-menu-list="location">
                                    <div class="menu-link" style="cursor: default;">
                                        <div class="menu-link-text"><span>Cargando...</span></div>
                                    </div>
                                </div>
                            </div>

                            <div class="menu-content overflow-y disabled" data-menu="help">
                                <div class="pill-container">
                                    <div class="drag-handle" style="cursor: grab;"></div>
                                </div>
                                <div class="menu-content-list overflow-y">
                                    <div class="menu-link">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">shield</span></div>
                                        <div class="menu-link-text"><span>Política de privacidad</span></div>
                                    </div>
                                    <div class="menu-link">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">description</span></div>
                                        <div class="menu-link-text"><span>Términos y condiciones</span></div>
                                    </div>
                                    <div class="menu-link">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">cookie</span></div>
                                        <div class="menu-link-text"><span>Política de cookies</span></div>
                                    </div>
                                    <div class="menu-link">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">feedback</span></div>
                                        <div class="menu-link-text"><span>Enviar comentarios</span></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="general-content-bottom">
                    <div class="general-content-scrolleable">
                        <div class="section-wrapper">
                            <div class="section-content">
                                <div class="section-hero">
                                    <h1>Every tool you need to work with PDFs in one place</h1>
                                    <h2>Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</h2>
                                </div>
                                <div class="section-tools"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="module" src="assets/js/app-init.js"></script>
</body>

</html>