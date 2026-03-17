import os

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
js_path = os.path.join(base, "js", "script.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

old_link = "instagramLink: 'https://www.instagram.com/nopushbacks',"
new_link = "instagramLink: 'https://www.instagram.com/tony.sautner/',"

if old_link in js:
    js = js.replace(old_link, new_link, 1) # Only replace the first one (Tony's)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Updated Tony's Instagram link")
else:
    print("Could not find Tony's link")
