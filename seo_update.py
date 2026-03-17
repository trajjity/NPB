import os
import re

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"

# --- HTML INJECTIONS ---

# 1. Index.html SEO
index_path = os.path.join(base, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Meta updates
html = re.sub(r'<title>.*?</title>', '<title>No Push Backs Barbershop | Best Barber in Bristol & Philly</title>', html)
html = re.sub(r'<meta name="description" content=".*?">', '<meta name="description" content="Looking for the best barber near you? No Push Backs Barbershop in Bristol, PA offers premier men\'s haircuts, precision fades, and grooming just outside of Philly. Book now.">', html)
html = re.sub(r'<meta name="keywords" content=".*?">', '<meta name="keywords" content="barber near me, barber in philly, philly barber, bristol barber, best barbershop bucks county, mens haircut near me, fade, beard trim, No Push Backs Barbershop">', html)
html = re.sub(r'<meta property="og:title" content=".*?">', '<meta property="og:title" content="No Push Backs Barbershop | Top Rated Barber in Bristol & Philly">', html)
html = re.sub(r'<meta property="og:description" content=".*?">', '<meta property="og:description" content="Looking for the best barber near you? No Push Backs Barbershop in Bristol, PA offers premier men\'s haircuts, precision fades, and grooming just outside of Philly.">', html)

# Hero subtitle update
old_hero = r'<p class="hero-subtitle">Located in Bristol, PA — right outside Philly.<br>Six barbers, one shop, no shortcuts. Find your guy, see his work,<br>and book directly through his page.</p>'
new_hero = '<p class="hero-subtitle">Located in Bristol, PA — your premier choice for a <strong>top-rated Philly barber</strong>.<br>If you\'re searching for the best <strong>barber near me</strong>, look no further.<br>Precision fades, sharp lineups, and true craftsmanship.</p>'
html = html.replace('<p class="hero-subtitle">Located in Bristol, PA — right outside Philly.<br>Six barbers, one shop, no shortcuts. Find your guy, see his work,<br>and book directly through his page.</p>', new_hero)

# Inject JSON-LD Schema for Local Business
schema_markup = """
    <!-- Local Business SEO Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Barbershop",
      "name": "No Push Backs Barbershop",
      "image": "https://raw.githubusercontent.com/jawnman/NPB/main/npb.jpg",
      "url": "https://no-push-backs.vercel.app/",
      "telephone": "+12154478392",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "204 Mill St, Suite 102",
        "addressLocality": "Bristol",
        "addressRegion": "PA",
        "postalCode": "19007",
        "addressCountry": "US"
    },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.0984",
        "longitude": "-74.8516"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "areaServed": ["Bristol, PA", "Philadelphia, PA", "Bucks County, PA"],
      "priceRange": "$$",
      "sameAs": [
        "https://www.instagram.com/nopushbacks/"
      ]
    }
    </script>
</head>"""

if "application/ld+json" not in html:
    html = html.replace("</head>", schema_markup)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html)


# 2. Contact SEO
contact_path = os.path.join(base, "contact.html")
with open(contact_path, "r", encoding="utf-8") as f:
    c_html = f.read()

c_html = re.sub(r'<title>.*?</title>', '<title>Contact | No Push Backs Barbershop - Best Barber Bristol PA</title>', c_html)
c_html = re.sub(r'<meta name="description" content=".*?">', '<meta name="description" content="Contact the best barbershop near you. No Push Backs Barbershop in Bristol, PA (near Philly) is taking appointments. Reach out to join the team or book a cut.">', c_html)
if "application/ld+json" not in c_html:
    c_html = c_html.replace("</head>", schema_markup)

with open(contact_path, "w", encoding="utf-8") as f:
    f.write(c_html)


# 3. Gallery SEO
gal_path = os.path.join(base, "gallery.html")
with open(gal_path, "r", encoding="utf-8") as f:
    g_html = f.read()

g_html = re.sub(r'<title>.*?</title>', '<title>Gallery | Precision Haircuts - No Push Backs Barbershop Philly</title>', g_html)
g_html = re.sub(r'<meta name="description" content=".*?">', '<meta name="description" content="View the portfolio and gallery of the best haircuts and fades by No Push Backs Barbershop in Bristol, PA. Top choice for a barber near you.">', g_html)
if "application/ld+json" not in g_html:
    g_html = g_html.replace("</head>", schema_markup)

with open(gal_path, "w", encoding="utf-8") as f:
    f.write(g_html)

print("Injected heavy SEO optimizations across all pages.")

