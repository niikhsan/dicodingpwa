document.addEventListener("DOMContentLoaded", function() {
// Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        const path = event.target.getAttribute("href").substr(1);
                        loadPage(path);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    // Load page content
    let page = window.location.hash.substr(1);
    if (page == "") {
        showStandings();
    }
    loadPage(page);

    function loadPage(page) {
        switch (page) {
            case 'home':
            showStandings();
            break;

            case 'schedule':
            showSchedule();
            break;

            case 'favorite-match':
            favMatch();
            break;
        }
    }
})
