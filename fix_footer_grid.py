import os
import re

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
css_path = os.path.join(base, "css", "style.css")

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Replace 2fr 1fr 1fr with 1fr 1fr 1fr
css = re.sub(r'grid-template-columns:\s*2fr\s+1fr\s+1fr;', 'grid-template-columns: 1fr 1fr 1fr;', css)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)
print("Updated footer layout to even columns")
