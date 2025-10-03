# Customization Guide

> Complete guide for personalizing Tim Superville's portfolio for your own use or updating content

## Table of Contents

- [Introduction](#introduction)
- [Quick Start Customization](#quick-start-customization)
- [Personal Information](#personal-information)
- [Branding & Visual Identity](#branding--visual-identity)
- [Content Updates](#content-updates)
- [Styling & Theme](#styling--theme)
- [Adding New Sections](#adding-new-sections)
- [Portfolio Projects](#portfolio-projects)
- [Services Offered](#services-offered)
- [Contact Information](#contact-information)
- [SEO & Metadata](#seo--metadata)
- [Advanced Customization](#advanced-customization)

## Introduction

This guide walks you through **every customization** you might want to make to this portfolio, whether you're:

- **Tim Superville**: Updating your own content
- **Forking for yourself**: Adapting this portfolio for your personal use
- **Learning**: Understanding how each piece works

### Philosophy

This portfolio is designed to be **easily customizable**:
- Clear separation of content from structure
- CSS variables for consistent theming
- Minimal dependencies to reduce breaking changes
- Well-documented code for easy understanding

## Quick Start Customization

### 5-Minute Essentials

The absolute minimum changes to make this yours:

1. **Update personal info** in `src/App.jsx`:
   - Your name in Hero section
   - Your bio in About section
   - Your social links

2. **Replace images**:
   - `/images/profile.jpg` - Your headshot
   - Update image references in `src/App.jsx`

3. **Update contact**:
   - Email address
   - Formspree endpoint
   - Social media links

4. **Rebuild**:
   ```bash
   npm run build
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Customize for [Your Name]"
   git push
   ```

### 30-Minute Complete Customization

For a fully personalized portfolio:

- [ ] Update all personal information
- [ ] Replace all images
- [ ] Update services offered
- [ ] Add your portfolio projects
- [ ] Customize colors and fonts
- [ ] Update meta tags for SEO
- [ ] Set up your analytics
- [ ] Configure form submission
- [ ] Test responsiveness
- [ ] Deploy

## Personal Information

### Hero Section

**Location**: `src/App.jsx` - `Hero()` function

**Current:**
```javascript
function Hero(){
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <h1>Hi, I'm Tim — Freelance Web Developer</h1>
        <p>I build modern, responsive web applications that help businesses grow.</p>
        <div className="cta">
          <a className="btn primary" href="#portfolio">View Work</a>
          <a className="btn" href="#contact">Hire Me</a>
        </div>
      </div>
    </section>
  )
}
```

**Customize to:**
```javascript
function Hero(){
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <h1>Hi, I'm [Your Name] — [Your Title]</h1>
        <p>[Your unique value proposition or tagline]</p>
        <div className="cta">
          <a className="btn primary" href="#portfolio">View Work</a>
          <a className="btn" href="#contact">Hire Me</a>
          {/* Add more CTAs if needed */}
        </div>
      </div>
    </section>
  )
}
```

**Examples:**
- "Hi, I'm Sarah Chen — Full-Stack Developer & UI Designer"
- "Hi, I'm Marcus Johnson — React Specialist"
- "Hi, I'm Alex Rivera — Freelance Backend Engineer"

### About Section

**Location**: `src/App.jsx` - `About()` function

**Customize bio:**
```javascript
function About(){
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <h2>About Me</h2>
          <p>
            [Write 2-3 paragraphs about yourself]
            - Your background
            - Your expertise
            - What drives you
            - Your availability
          </p>
          <p>
            [Second paragraph with more details]
            - Specific skills
            - Notable achievements
            - Your approach to work
          </p>
          <div className="social">
            <a href="https://github.com/[yourusername]" 
               title="GitHub" 
               target="_blank" 
               rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/[yourprofile]" 
               title="LinkedIn" 
               target="_blank" 
               rel="noopener noreferrer">
              LinkedIn
            </a>
            {/* Add more social links */}
            <a href="https://twitter.com/[yourhandle]" 
               title="Twitter" 
               target="_blank" 
               rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
        <div>
          <img className="profile" src="/images/profile.jpg" alt="[Your Name]" />
        </div>
      </div>
    </section>
  )
}
```

**Writing Tips:**
- Be authentic and personable
- Focus on client benefits, not just your skills
- Show personality while remaining professional
- Keep it concise (2-3 short paragraphs)
- Include a clear call-to-action about availability

### Social Media Links

**Add more social platforms:**
```javascript
<div className="social">
  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>
  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
    LinkedIn
  </a>
  <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
    Twitter
  </a>
  <a href="https://dribbble.com/yourprofile" target="_blank" rel="noopener noreferrer">
    Dribbble
  </a>
  <a href="https://dev.to/yourusername" target="_blank" rel="noopener noreferrer">
    DEV.to
  </a>
  <a href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer">
    Medium
  </a>
</div>
```

## Branding & Visual Identity

### Logo

**SVG Logo in Header:**

**Location**: `src/App.jsx` - `Header()` function

Current logo is a simple "TS" text in a rounded rectangle. Customize:

```javascript
function Header(){
  return (
    <header className="site-header">
      <div className="container nav-grid">
        <a href="#home" className="logo" aria-label="Home" title="Home">
          <svg className="logo-mark" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#4f46e5" />  {/* Change color */}
                <stop offset="1" stopColor="#06b6d4" />  {/* Change color */}
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="6" fill="url(#g1)" />
            <g fill="#fff" fontFamily="sans-serif" fontWeight="700" fontSize="14" textAnchor="middle">
              <text x="18" y="22">YI</text>  {/* Change to your initials */}
            </g>
          </svg>
          <span className="brand">[Your Name]</span>  {/* Change name */}
        </a>
        {/* ... navigation ... */}
      </div>
    </header>
  )
}
```

**Or use an image logo:**
```javascript
<a href="#home" className="logo">
  <img src="/images/logo.svg" alt="Your Name" className="logo-mark" />
  <span className="brand">Your Name</span>
</a>
```

### Favicon

**Replace favicon:**

1. Create your favicon:
   - Use [favicon.io](https://favicon.io) or similar tool
   - Create SVG version for best quality
   - Create PNG fallback (512x512px)

2. Replace files:
   - `favicon.svg` - Primary favicon
   - `images/logoblank.png` - Fallback for older browsers

3. Update references in built `docs/index.html` (auto-generated):
   ```html
   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
   <link rel="alternate icon" href="/images/logoblank.png" type="image/png">
   ```

### Profile Image

**Replace `/images/profile.jpg`:**

1. **Requirements**:
   - Professional headshot
   - Square aspect ratio (400x400px recommended)
   - JPG or WebP format
   - File size < 100KB (compress if needed)

2. **Optimize**:
   ```bash
   # Using TinyPNG CLI or web tool
   # Or use sharp-cli
   sharp -i profile.jpg -o profile-optimized.jpg --mozjpeg
   ```

3. **Replace file**:
   ```bash
   cp your-photo.jpg images/profile.jpg
   ```

4. **Rebuild**:
   ```bash
   npm run build
   ```

### Project Images

**Replace portfolio/project images:**

1. **Add your images** to `/images/`:
   - `project1.jpg`, `project2.jpg`, etc.
   - Recommended: 1200x800px (3:2 aspect ratio)
   - Compress to < 200KB each

2. **Update references** in `src/App.jsx`:
   ```javascript
   function Portfolio(){
     return (
       <section id="portfolio" className="section alt">
         <div className="container">
           <h2>Recent Projects</h2>
           <div className="grid-2">
             <article className="portfolio-item">
               <img src="/images/project1.jpg" alt="Project 1 Name" />
               <h3>Project 1 Name</h3>
               <p>Project description...</p>
             </article>
             {/* Add more projects */}
           </div>
         </div>
       </section>
     )
   }
   ```

## Content Updates

### Services Section

**Location**: `src/App.jsx` - `Services()` function

**Customize services:**
```javascript
function Services(){
  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Services</h2>
        <div className="grid-3">
          <div className="card">
            <h3>[Service 1]</h3>
            <p>[Description of service, client benefits]</p>
          </div>
          <div className="card">
            <h3>[Service 2]</h3>
            <p>[Description of service, client benefits]</p>
          </div>
          <div className="card">
            <h3>[Service 3]</h3>
            <p>[Description of service, client benefits]</p>
          </div>
          {/* Add more service cards as needed */}
        </div>
      </div>
    </section>
  )
}
```

**Example services:**
- Web Development
- Mobile App Development
- UI/UX Design
- API Development
- Database Design
- DevOps & Deployment
- Code Review & Consulting
- Technical Writing
- SEO Optimization
- Performance Optimization

**Service card structure:**
```javascript
<div className="card">
  <div className="card-icon">
    {/* Optional: Add icon */}
    <i className="fas fa-code"></i>
  </div>
  <h3>Web Development</h3>
  <p>Custom web applications built with modern technologies like React, Node.js, and PostgreSQL.</p>
  <ul className="service-features">
    <li>Responsive design</li>
    <li>Fast performance</li>
    <li>SEO optimized</li>
  </ul>
</div>
```

### Portfolio Projects

**Location**: `src/App.jsx` - `Portfolio()` function

**Add detailed project cards:**
```javascript
function Portfolio(){
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack solution with payments and admin dashboard.',
      image: '/images/project1.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'https://example.com',
      github: 'https://github.com/yourusername/project'
    },
    // Add more projects
  ]
  
  return (
    <section id="portfolio" className="section alt">
      <div className="container">
        <h2>Recent Projects</h2>
        <div className="grid-2">
          {projects.map(project => (
            <article key={project.id} className="portfolio-item">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Live
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    View Code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Add CSS for tech badges** in `src/styles.css`:
```css
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tech-badge {
  padding: 0.25rem 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.project-links a {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s;
}

.project-links a:hover {
  background-color: var(--color-primary);
  color: white;
}
```

## Styling & Theme

### Color Scheme

**Location**: `src/styles.css`

**Update CSS variables:**
```css
:root {
  /* Primary Brand Colors */
  --color-primary: #4f46e5;           /* Main brand color */
  --color-primary-dark: #4338ca;      /* Hover/active state */
  --color-primary-light: #818cf8;     /* Accents */
  --color-accent: #06b6d4;            /* Secondary color */
  
  /* Background Colors */
  --color-bg: #ffffff;                /* Main background */
  --color-bg-alt: #f9fafb;           /* Alternate sections */
  --color-bg-card: #ffffff;          /* Card backgrounds */
  
  /* Text Colors */
  --color-text: #111827;             /* Primary text */
  --color-text-light: #6b7280;       /* Secondary text */
  --color-text-muted: #9ca3af;       /* Tertiary text */
  
  /* Border Colors */
  --color-border: #e5e7eb;
  
  /* Status Colors */
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  
  /* Spacing */
  --spacing-unit: 8px;
  --container-width: 1200px;
  
  /* Typography */
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: inherit;
  --font-mono: 'Courier New', monospace;
}
```

**Choose your colors:**
1. Visit [coolors.co](https://coolors.co) for palette inspiration
2. Use [contrast-ratio.com](https://contrast-ratio.com) to ensure accessibility
3. Test with different backgrounds

**Example color schemes:**

**Blue & Teal (Current):**
```css
--color-primary: #4f46e5;
--color-accent: #06b6d4;
```

**Purple & Pink:**
```css
--color-primary: #8b5cf6;
--color-accent: #ec4899;
```

**Green & Emerald:**
```css
--color-primary: #10b981;
--color-accent: #059669;
```

**Orange & Amber:**
```css
--color-primary: #f97316;
--color-accent: #f59e0b;
```

### Typography

**Update fonts:**

1. **Choose fonts** from [Google Fonts](https://fonts.google.com)

2. **Add import** to `src/styles.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap');
   ```

3. **Update variables**:
   ```css
   :root {
     --font-body: 'Inter', system-ui, sans-serif;
     --font-heading: 'Inter', system-ui, sans-serif;
     --font-mono: 'Fira Code', monospace;
   }
   ```

4. **Apply to elements**:
   ```css
   body {
     font-family: var(--font-body);
   }
   
   h1, h2, h3, h4, h5, h6 {
     font-family: var(--font-heading);
   }
   
   code, pre {
     font-family: var(--font-mono);
   }
   ```

**Font pairing suggestions:**
- **Heading: Poppins, Body: Inter**
- **Heading: Montserrat, Body: Open Sans**
- **Heading: Playfair Display, Body: Lato** (elegant)
- **Heading: Raleway, Body: Roboto**

### Dark Mode (Optional)

**Add dark mode support:**

1. **Define dark mode colors** in `src/styles.css`:
   ```css
   [data-theme="dark"] {
     --color-bg: #111827;
     --color-bg-alt: #1f2937;
     --color-bg-card: #1f2937;
     --color-text: #f9fafb;
     --color-text-light: #d1d5db;
     --color-text-muted: #9ca3af;
     --color-border: #374151;
     --color-primary-light: #818cf8;
   }
   ```

2. **Add theme toggle** to `src/App.jsx`:
   ```javascript
   function App() {
     const [theme, setTheme] = useState(() => {
       return localStorage.getItem('theme') || 'light'
     })
     
     useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme)
       localStorage.setItem('theme', theme)
     }, [theme])
     
     const toggleTheme = () => {
       setTheme(t => t === 'light' ? 'dark' : 'light')
     }
     
     return (
       <>
         <Header theme={theme} onToggleTheme={toggleTheme} />
         {/* Rest of app */}
       </>
     )
   }
   ```

3. **Add toggle button** to Header:
   ```javascript
   function Header({ theme, onToggleTheme }) {
     return (
       <header>
         <nav>{/* ... */}</nav>
         <button onClick={onToggleTheme} className="theme-toggle">
           {theme === 'light' ? '🌙' : '☀️'}
         </button>
       </header>
     )
   }
   ```

## Adding New Sections

### Create New Section Component

**Example: Testimonials section**

1. **Add component** in `src/App.jsx`:
   ```javascript
   function Testimonials() {
     const testimonials = [
       {
         id: 1,
         name: 'Jane Smith',
         role: 'CEO, TechCorp',
         content: 'Amazing work! Highly recommend.',
         avatar: '/images/testimonial1.jpg'
       },
       // Add more testimonials
     ]
     
     return (
       <section id="testimonials" className="section">
         <div className="container">
           <h2>What Clients Say</h2>
           <div className="grid-2">
             {testimonials.map(testimonial => (
               <div key={testimonial.id} className="testimonial-card">
                 <p className="testimonial-content">"{testimonial.content}"</p>
                 <div className="testimonial-author">
                   <img src={testimonial.avatar} alt={testimonial.name} />
                   <div>
                     <strong>{testimonial.name}</strong>
                     <span>{testimonial.role}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
     )
   }
   ```

2. **Add to App component**:
   ```javascript
   export default function App() {
     return (
       <>
         <Header />
         <Hero />
         <Services />
         <Portfolio />
         <About />
         <Testimonials />  {/* Add here */}
         <Contact />
         <Footer />
       </>
     )
   }
   ```

3. **Add navigation link**:
   ```javascript
   function Header() {
     return (
       <nav>
         {/* ... other links */}
         <a href="#testimonials">Testimonials</a>
       </nav>
     )
   }
   ```

4. **Add styles** to `src/styles.css`:
   ```css
   .testimonial-card {
     padding: 2rem;
     background: var(--color-bg-card);
     border-radius: 8px;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
   }
   
   .testimonial-content {
     font-style: italic;
     margin-bottom: 1rem;
   }
   
   .testimonial-author {
     display: flex;
     align-items: center;
     gap: 1rem;
   }
   
   .testimonial-author img {
     width: 48px;
     height: 48px;
     border-radius: 50%;
   }
   ```

### Other Section Ideas

**Skills Section:**
```javascript
function Skills() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    // ...
  ]
  
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Skills</h2>
        {skills.map(skill => (
          <div key={skill.name} className="skill-bar">
            <span>{skill.name}</span>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Experience Timeline:**
```javascript
function Experience() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Developer',
      company: 'TechCorp',
      period: '2020 - Present',
      description: 'Led development of...'
    },
    // ...
  ]
  
  return (
    <section id="experience" className="section alt">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          {jobs.map(job => (
            <div key={job.id} className="timeline-item">
              <h3>{job.title}</h3>
              <h4>{job.company}</h4>
              <span className="period">{job.period}</span>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Contact Information

### Update Email

**Multiple places to update:**

1. **Contact form endpoint** (`src/App.jsx`):
   ```javascript
   function Contact() {
     const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
     // ...
   }
   ```

2. **Footer** (`src/App.jsx`):
   ```javascript
   function Footer() {
     return (
       <footer>
         <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
       </footer>
     )
   }
   ```

3. **About section** (if email is mentioned)

### Setup Formspree

1. **Create account** at [formspree.io](https://formspree.io)

2. **Create new form**:
   - Form name: "Portfolio Contact Form"
   - Notification email: your@email.com

3. **Copy endpoint**:
   - Format: `https://formspree.io/f/xxxxxxxxx`

4. **Update in code**:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xxxxxxxxx'
   ```

5. **Test**:
   - Submit test form
   - Check email delivery
   - Verify in Formspree dashboard

### Add Phone Number (Optional)

```javascript
function Footer() {
  return (
    <footer>
      <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
    </footer>
  )
}
```

## SEO & Metadata

### Update Page Title and Description

**Location**: Built file `docs/index.html` (regenerated on build)

To customize, you'll need to create a template. For now, update after each build or use Vite HTML plugin.

**Simple approach - update manually** in `docs/index.html` after build:
```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Page title -->
  <title>[Your Name] - [Your Title] Portfolio</title>
  
  <!-- Meta description -->
  <meta name="description" content="[Your name] is a [your title] specializing in [your skills]. View portfolio and get in touch." />
  
  <!-- Open Graph (for social sharing) -->
  <meta property="og:title" content="[Your Name] - Portfolio" />
  <meta property="og:description" content="[Your description]" />
  <meta property="og:image" content="https://yoursite.com/images/og-image.jpg" />
  <meta property="og:url" content="https://yoursite.com" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Your Name] - Portfolio" />
  <meta name="twitter:description" content="[Your description]" />
  <meta name="twitter:image" content="https://yoursite.com/images/og-image.jpg" />
</head>
```

### Update Sitemap

**Location**: `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Add more URLs if you have multiple pages -->
</urlset>
```

### Update Robots.txt

**Location**: `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

## Advanced Customization

### Add Animation

**Fade in on scroll:**

1. **Install library**:
   ```bash
   npm install aos
   ```

2. **Import in `src/main.jsx`**:
   ```javascript
   import AOS from 'aos'
   import 'aos/dist/aos.css'
   
   AOS.init({
     duration: 800,
     once: true
   })
   ```

3. **Add to components**:
   ```jsx
   <section data-aos="fade-up">
     <h2>Animated Section</h2>
   </section>
   ```

### Add Smooth Scrolling

Already implemented! Anchor links (e.g., `#portfolio`) smoothly scroll to sections.

To customize:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Offset for fixed header */
}
```

### Progressive Web App (PWA)

**Add PWA support:**

1. **Install plugin**:
   ```bash
   npm install -D vite-plugin-pwa
   ```

2. **Update `vite.config.js`**:
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'
   
   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'Your Name Portfolio',
           short_name: 'Portfolio',
           description: 'Personal portfolio website',
           theme_color: '#4f46e5',
           icons: [
             {
               src: '/images/icon-192.png',
               sizes: '192x192',
               type: 'image/png'
             },
             {
               src: '/images/icon-512.png',
               sizes: '512x512',
               type: 'image/png'
             }
           ]
         }
       })
     ]
   })
   ```

3. **Create icons** (192x192 and 512x512)

4. **Rebuild**:
   ```bash
   npm run build
   ```

---

## Customization Checklist

Use this checklist to track your customization:

### Content
- [ ] Updated name in Hero section
- [ ] Updated tagline/title
- [ ] Wrote custom bio (About section)
- [ ] Updated social media links
- [ ] Added/updated services offered
- [ ] Added portfolio projects with descriptions
- [ ] Updated contact information

### Visual Branding
- [ ] Replaced logo (or customized SVG logo)
- [ ] Replaced profile photo
- [ ] Replaced project images
- [ ] Updated favicon
- [ ] Customized color scheme
- [ ] Changed fonts (if desired)

### Configuration
- [ ] Set up Formspree endpoint
- [ ] Configured analytics (if desired)
- [ ] Updated meta tags for SEO
- [ ] Updated sitemap.xml
- [ ] Updated robots.txt

### Testing
- [ ] Tested on mobile devices
- [ ] Tested on different browsers
- [ ] Verified all links work
- [ ] Tested contact form submission
- [ ] Checked responsive design

### Deployment
- [ ] Built production version (`npm run build`)
- [ ] Previewed build locally (`npm run preview`)
- [ ] Pushed to GitHub
- [ ] Verified live site

---

**Questions?** Refer to the main [README.md](./README.md) or [DEVELOPER.md](./DEVELOPER.md) for more details.

---

**Last Updated**: January 2025  
**Maintained by**: Tim Superville
