document.addEventListener("DOMContentLoaded", () => {
    // Server Blade Drawer Logic
    const blade = document.getElementById("server-blade");
    const drawer = document.getElementById("blade-drawer");
    const chevron = document.getElementById("blade-chevron");
    
    if (blade && drawer && chevron) {
        blade.addEventListener("click", () => {
            drawer.classList.toggle("open");
            if (drawer.classList.contains("open")) {
                chevron.style.transform = "rotate(180deg)";
                blade.style.borderColor = "rgba(59, 130, 246, 0.4)";
                blade.style.boxShadow = "0 25px 50px -12px rgba(59, 130, 246, 0.15)";
            } else {
                chevron.style.transform = "rotate(0deg)";
                blade.style.borderColor = "rgba(31, 41, 55, 1)";
                blade.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
            }
        });
    }
});
