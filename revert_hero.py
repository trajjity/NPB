import os

filepath = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop\index.html"

with open(filepath, "r", encoding="utf-8") as f:
    html = f.read()

old_subtitle = """<p class="hero-subtitle">Located in Bristol, PA — your premier choice for a <strong>top-rated Philly barber</strong>.<br>If you're searching for the best <strong>barber near me</strong>, look no further.<br>Precision fades, sharp lineups, and true craftsmanship.</p>"""

new_subtitle = """<p class="hero-subtitle">Located in Bristol, PA — right outside Philly.<br>Six barbers, one shop, no shortcuts. Find your guy, see his work,<br>and book directly through his page.</p>"""

if old_subtitle in html:
    html = html.replace(old_subtitle, new_subtitle)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
    print("Successfully reverted hero subtitle.")
else:
    print("Could not find the new subtitle to revert.")
