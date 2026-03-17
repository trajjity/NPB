import os

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
js_path = os.path.join(base, "js", "script.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

old_list = "this.id==='modal-booking-link'"
new_list = "this.id==='modal-booking-link'||this.id==='modal-instagram-link'"
js = js.replace(old_list, new_list)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

css_path = os.path.join(base, "css", "style.css")
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

old_anim = """/* ===== PAGE TRANSITION ANIMATIONS ===== */
.fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    will-change: opacity, transform;
}

.fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
}

/* Page load fade in */
main, footer {
    animation: fadeInPage 0.8s ease-out forwards;
}

.main-header {
    animation: fadeDownHeader 0.5s ease-out forwards;
}

@keyframes fadeInPage {
    from {
        opacity: 0;
        transform: translateY(15px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeDownHeader {
    from {
        opacity: 0;
        transform: translateY(-15px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}"""

new_anim = """/* ===== PAGE TRANSITION ANIMATIONS ===== */
.fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    visibility: hidden;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}

.fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
}

/* Page load fade in */
main, footer {
    animation: fadeInPage 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.main-header {
    animation: fadeDownHeader 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInPage {
    from {
        opacity: 0;
        transform: translateY(40px);
        filter: blur(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

@keyframes fadeDownHeader {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}"""

if old_anim in css:
    css = css.replace(old_anim, new_anim)
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("Updated CSS Page Animations")
else:
    print("Could not find the old animation block")

