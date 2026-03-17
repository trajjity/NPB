import os

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
html_path = os.path.join(base, "contact.html")
css_path = os.path.join(base, "css", "contact.css")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

old_select = """<div class="form-group" style="margin-bottom: 8px;">
                    <label for="subject">What are you getting in touch about?</label>
                    <select id="subject" name="subject" class="form-control" required style="appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239AA0A6\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>'); background-repeat: no-repeat; background-position: right 16px center;">
                        <option value="General Inquiry / Booking">General Question / Booking</option>
                        <option value="Employment: Want to work with us?">Looking to join the team (Employment)</option>
                        <option value="Other Inquiry">Other</option>
                    </select>
                </div>"""

new_select = """<div class="form-group" style="margin-bottom: 8px;">
                    <label for="subject">What are you getting in touch about?</label>
                    <div class="select-wrapper">
                        <select id="subject" name="subject" class="form-control custom-select" required>
                            <option value="General Inquiry / Booking">General Question / Booking</option>
                            <option value="Employment: Want to work with us?">Looking to join the team (Employment)</option>
                            <option value="Other Inquiry">Other</option>
                        </select>
                        <div class="select-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                </div>"""

if old_select in html:
    html = html.replace(old_select, new_select)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Replaced select in HTML")
else:
    print("Could not find old select")

css_add = """
/* Custom Select Modernization */
.select-wrapper {
    position: relative;
    width: 100%;
}

.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 48px;
    cursor: pointer;
    background-color: var(--bg-page); /* solid background */
    font-weight: 500;
}

.custom-select:hover {
    border-color: var(--text-secondary);
    background-color: var(--surface-bg);
}

.select-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-fast);
}

.custom-select:focus + .select-icon {
    color: var(--accent-color);
}

.custom-select option {
    background-color: var(--bg-surface);
    color: var(--text-primary);
    padding: 12px;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

if "Custom Select Modernization" not in css:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(css_add)
    print("Added select CSS")
else:
    print("CSS already there")

