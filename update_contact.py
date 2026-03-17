import os

path = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop\contact.html"

with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace the paragraph
old_p = "<p>Have a question about a cut or a booking? Drop us a line below.</p>"
new_p = "<p>Have a question about a cut, a booking, or looking to join our team? Drop us a line below.</p>"
html = html.replace(old_p, new_p)

# Swap out the hidden subject for a dropdown subject selection
old_subject = '<input type="hidden" name="subject" value="New Website Inquiry: No Push Backs">'
new_subject = """<div class="form-group" style="margin-bottom: 8px;">
                    <label for="subject">What are you getting in touch about?</label>
                    <select id="subject" name="subject" class="form-control" required style="appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239AA0A6\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>'); background-repeat: no-repeat; background-position: right 16px center;">
                        <option value="General Inquiry / Booking">General Question / Booking</option>
                        <option value="Employment: Want to work with us?">Looking to join the team (Employment)</option>
                        <option value="Other Inquiry">Other</option>
                    </select>
                </div>"""
html = html.replace(old_subject, new_subject)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)
