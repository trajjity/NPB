import os
import re

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
index_path = os.path.join(base, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Fix Google Image URL
html = html.replace('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png')

# Swap sections
reviews_match = re.search(r'(\s*<section class="reviews-section fade-in-section">.*?</section>)', html, re.DOTALL)
barbers_match = re.search(r'(\s*<section id="barbers" class="barbers-section">.*?</section>)', html, re.DOTALL)

if reviews_match and barbers_match:
    reviews_html = reviews_match.group(1)
    barbers_html = barbers_match.group(1)
    
    if html.find(reviews_html) < html.find(barbers_html):
        html = html.replace(reviews_html, "")
        html = html.replace(barbers_html, barbers_html + reviews_html)
        print("Swapped reviews and barbers.")

# Fix logo
old_logo_index = """            <div class="logo">
                <img src="npb.jpg" alt="No Push Backs Logo" class="logo-img">
                <div class="logo-text">
                    <h1>No Push Backs</h1>
                </div>
            </div>"""

old_logo_others = """            <div class="logo">
                <img src="npb.jpg" alt="No Push Backs Logo" class="logo-img">
                <div class="logo-text">
                    <a href="index.html" style="text-decoration:none;color:inherit;"><h1>No Push Backs</h1></a>
                </div>
            </div>"""

new_logo = """            <a href="index.html" class="logo" style="text-decoration: none; color: inherit; user-select: none; -webkit-user-select: none; outline: none; -webkit-tap-highlight-color: transparent; cursor: pointer;">
                <img src="npb.jpg" alt="No Push Backs Logo" class="logo-img">
                <div class="logo-text">
                    <h1 style="margin: 0;">No Push Backs</h1>
                </div>
            </a>"""

if old_logo_index in html:
    html = html.replace(old_logo_index, new_logo)
    print("Updated index logo")
    
with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)

for page in ["contact.html", "gallery.html"]:
    path = os.path.join(base, page)
    with open(path, "r", encoding="utf-8") as f:
        p_html = f.read()
    
    if old_logo_others in p_html:
        p_html = p_html.replace(old_logo_others, new_logo)
        print(f"Updated {page} logo")
    elif old_logo_index in p_html:
        p_html = p_html.replace(old_logo_index, new_logo)
        print(f"Updated {page} logo (matched index styling)")
        
    with open(path, "w", encoding="utf-8") as f:
        f.write(p_html)

print("Done")
