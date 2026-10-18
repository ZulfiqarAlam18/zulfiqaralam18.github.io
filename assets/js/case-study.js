// Renders a Markdown case study from /case-studies into case-study.html.
// URL format: case-study.html?p=<slug>. Only slugs listed here can be loaded.
(function() {
    const CASE_STUDIES = {
        'ascender-online': 'Ascender Online',
        'imat': 'IMAT',
        'scanlite': 'ScanLite',
        'routinely': 'Routinely',
        'locatelost': 'LocateLost',
        'inforato': 'Inforato',
        'cropix': 'Cropix',
        'personal-ai-assistant': 'Personal AI Job Assistant',
        'job-form-autofill-helper': 'Job Form Autofill Helper',
        'privacy-support-hub': 'Zulfi Apps Privacy & Support Hub',
        'portfolio-website': 'Portfolio & Blog Website'
    };

    const container = document.getElementById('caseStudy');
    const status = document.getElementById('caseStudyStatus');
    if (!container) return;

    const slug = new URLSearchParams(window.location.search).get('p');
    const title = CASE_STUDIES[slug];

    function fail(message) {
        status.textContent = message;
        status.hidden = false;
    }

    if (!title) {
        fail('Case study not found. Go back to the projects page to pick one.');
        return;
    }

    document.title = title + ' — Case Study | Zulfiqar Alam';
    status.textContent = 'Loading ' + slug + '.md …';

    fetch('case-studies/' + slug + '.md')
        .then(function(res) {
            if (!res.ok) throw new Error(res.status);
            return res.text();
        })
        .then(function(md) {
            if (!window.marked) throw new Error('renderer unavailable');
            container.innerHTML = window.marked.parse(md);
            status.hidden = true;

            // Copy buttons on code blocks, matching the blog
            container.querySelectorAll('pre').forEach(function(pre) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'code-copy mono';
                btn.textContent = 'copy';
                btn.addEventListener('click', function() {
                    navigator.clipboard.writeText((pre.querySelector('code') || pre).innerText)
                        .then(function() { btn.textContent = 'copied'; })
                        .catch(function() { btn.textContent = 'failed'; })
                        .finally(function() { setTimeout(function() { btn.textContent = 'copy'; }, 1500); });
                });
                pre.appendChild(btn);
            });

            container.querySelectorAll('a').forEach(function(a) {
                const href = a.getAttribute('href') || '';
                if (/^https?:|^mailto:/.test(href)) {
                    // External links open in a new tab
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                } else if (!href.startsWith('#')) {
                    // Relative links point into each app's own repository (lib/main.dart …),
                    // which doesn't exist on this site: show them as code instead of dead links
                    const code = document.createElement('code');
                    code.textContent = a.textContent;
                    a.replaceWith(code);
                }
            });
        })
        .catch(function() {
            fail('Could not load this case study. You can read it on GitHub instead.');
            const link = document.createElement('a');
            link.href = 'https://github.com/ZulfiqarAlam18/zulfiqaralam18.github.io/blob/main/case-studies/' + slug + '.md';
            link.textContent = ' Open on GitHub';
            status.appendChild(link);
        });
})();
