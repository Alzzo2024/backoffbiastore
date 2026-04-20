(function() {
    window.addEventListener('load', function() {
        const menuBtn = document.getElementById('menuBtn');
        const navMenu = document.getElementById('navMenu');
        const aspa1 = document.getElementById('aspa1');
        const aspa2 = document.getElementById('aspa2');

        // Menu Mobile
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
            });
            document.addEventListener('click', () => navMenu.classList.remove('active'));
        }

        // Parallax das Aspas
        window.addEventListener('scroll', function() {
            let value = window.scrollY;
            if (aspa1 && aspa2) {
                // Ajusta o movimento para ser suave
                aspa1.style.transform = `translateY(${value * 0.08}px) translateX(${value * 0.03}px)`;
                aspa2.style.transform = `translateY(${value * -0.08}px) translateX(${value * -0.03}px)`;
            }
        });
    });
})();