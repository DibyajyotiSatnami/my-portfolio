# Dibyajyoti Satnami — Portfolio

Personal portfolio for **Dibyajyoti Satnami**, web developer and performance marketer.

A static site (HTML, CSS, vanilla JavaScript). There's no build step and no backend.

## Sections
Hero · About · Services · Work (client websites and analytics dashboards) · Experience · Skills · Certificates · Contact

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pick the branch and `/ (root)`.
The site will be live at `https://dibyajyotisatnami.github.io/my-portfolio/`.

## Editing
- Text: `index.html` (each section is marked with a comment such as `<!-- WORK -->`)
- Colours and fonts: the variables at the top of `css/style.css`
- Email and WhatsApp number for the contact form: the top of `js/main.js`
- Images: `assets/img/` (WebP, resized for the web)

The contact form has no server. It opens the visitor's email app or WhatsApp with the message already filled in.
