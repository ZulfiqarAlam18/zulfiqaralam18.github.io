// ============================================================
// RESUME CONFIG — To update your resume, change ONLY this block
// 1. Upload the new PDF file to the root of the project
// 2. Update `filename` below to match the new file name
// 3. Optionally update `downloadAs` (the name shown when saving)
// ============================================================
const RESUME_CONFIG = {
    filename:   'assets/resume/Zulfiqar_Alam-Mobile_App_Engineer.pdf', // <-- update this line with new PDF name
    downloadAs: 'Zulfiqar_Alam_Resume.pdf'                // name used when visitor downloads the file
};
// ============================================================

document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function() {

    // Auto-populate all resume links from RESUME_CONFIG
    // (data-resume-link="../" on pages inside sub-folders such as /blog)
    document.querySelectorAll('[data-resume-link]').forEach(function(link) {
        link.setAttribute('href', link.getAttribute('data-resume-link') + RESUME_CONFIG.filename);
        if (link.hasAttribute('data-resume-download')) {
            link.setAttribute('download', RESUME_CONFIG.downloadAs);
        }
    });

    // Footer year
    document.querySelectorAll('[data-year]').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

    // ---------- Mobile menu ----------
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    function setMenu(open) {
        if (!menuToggle || !mobileMenu) return;
        mobileMenu.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            setMenu(!mobileMenu.classList.contains('active'));
        });
        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { setMenu(false); });
        });
    }

    // ---------- Scroll progress bar + back-to-top button ----------
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    const toTop = document.createElement('button');
    toTop.type = 'button';
    toTop.className = 'to-top mono';
    toTop.setAttribute('aria-label', 'Back to top');
    toTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    toTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
    document.body.appendChild(toTop);

    // ---------- Navbar background on scroll ----------
    const navbar = document.querySelector('.navbar');
    let scrollTicking = false;
    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (navbar) navbar.classList.toggle('scrolled', y > 20);
        progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        toTop.classList.toggle('show', y > window.innerHeight * 0.8);
        scrollTicking = false;
    }
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // ---------- Cursor spotlight on cards (mouse / pen only) ----------
    const SPOTLIGHT = '.feature-card, .project-card, .skill-card, .timeline-card, .info-card, .post-row, .blog-card, .coffee-card';
    if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
        document.querySelectorAll(SPOTLIGHT).forEach(function(card) {
            card.classList.add('spotlight');
            card.addEventListener('pointermove', function(e) {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    }

    // ---------- Project filters (projects.html) ----------
    document.querySelectorAll('[data-filter-target]').forEach(function(bar) {
        const grid = document.getElementById(bar.getAttribute('data-filter-target'));
        const counter = document.getElementById(bar.getAttribute('data-filter-count'));
        if (!grid) return;
        const cards = grid.querySelectorAll('[data-tags]');
        const buttons = bar.querySelectorAll('[data-filter]');

        function apply(filter) {
            let shown = 0;
            cards.forEach(function(card) {
                const match = filter === 'all' || card.getAttribute('data-tags').split(' ').indexOf(filter) !== -1;
                card.hidden = !match;
                if (match) {
                    shown++;
                    if (!prefersReducedMotion) {
                        card.classList.remove('filter-in');
                        void card.offsetWidth; // restart the animation
                        card.classList.add('filter-in');
                    }
                }
            });
            if (counter) counter.textContent = shown + ' of ' + cards.length + ' projects';
        }

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                buttons.forEach(function(b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                apply(btn.getAttribute('data-filter'));
            });
        });
        apply('all');
    });

    // ---------- Copy buttons on blog code blocks ----------
    document.querySelectorAll('.blog-post-body pre').forEach(function(pre) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy mono';
        btn.textContent = 'copy';
        btn.addEventListener('click', async function() {
            const code = pre.querySelector('code');
            try {
                await navigator.clipboard.writeText((code || pre).innerText);
                btn.textContent = 'copied';
            } catch (e) {
                btn.textContent = 'failed';
            }
            setTimeout(function() { btn.textContent = 'copy'; }, 1500);
        });
        pre.appendChild(btn);
    });

    // ---------- Active nav link ----------
    const navLinks = document.querySelectorAll('.desktop-menu a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        const linkFor = {};
        navLinks.forEach(function(a) { linkFor[a.getAttribute('href').slice(1)] = a; });

        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                const link = linkFor[entry.target.id];
                if (link && entry.isIntersecting) {
                    navLinks.forEach(function(a) { a.classList.remove('active'); });
                    link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        Object.keys(linkFor).forEach(function(id) {
            const section = document.getElementById(id);
            if (section) sectionObserver.observe(section);
        });
    }

    // ---------- Scroll reveal + staggered children ----------
    const revealTargets = document.querySelectorAll('.reveal, [data-stagger]');

    function settle(el) {
        // Drop the reveal hooks so hover transitions use the element's own rules
        el.classList.remove('reveal', 'is-visible');
        if (el.hasAttribute('data-stagger')) {
            el.removeAttribute('data-stagger');
            Array.prototype.forEach.call(el.children, function(child) {
                child.style.removeProperty('--d');
            });
        }
    }

    function reveal(el) {
        if (el.hasAttribute('data-stagger')) {
            Array.prototype.forEach.call(el.children, function(child, i) {
                child.style.setProperty('--d', (i * 90) + 'ms');
            });
        }
        el.classList.add('is-visible');
        el.querySelectorAll('[data-scramble]').forEach(scramble);
        el.querySelectorAll('[data-count]').forEach(countUp);
        const lastDelay = el.hasAttribute('data-stagger') ? el.children.length * 90 : 0;
        setTimeout(function() { settle(el); }, lastDelay + 800);
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(settle);
    } else {
        const revealObserver = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function(el) { revealObserver.observe(el); });
    }

    // ---------- Scramble text (headings decode like a terminal) ----------
    const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#01';

    function scramble(el) {
        if (el.dataset.scrambled) return;
        el.dataset.scrambled = 'true';

        const finalText = el.textContent;
        const totalFrames = 22;
        let frame = 0;

        function tick() {
            const progress = frame / totalFrames;
            let out = '';
            for (let i = 0; i < finalText.length; i++) {
                const ch = finalText[i];
                if (ch === ' ' || i / finalText.length < progress) {
                    out += ch;
                } else {
                    out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }
            }
            el.textContent = out;
            if (frame < totalFrames) {
                frame++;
                setTimeout(tick, 40);
            } else {
                el.textContent = finalText;
            }
        }
        tick();
    }

    // ---------- Count-up stats ----------
    function countUp(el) {
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        const duration = 1100;
        const start = performance.now();

        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(step);
        }
        el.textContent = '0';
        requestAnimationFrame(step);
    }

    // ---------- Typed role line (terminal style) ----------
    document.querySelectorAll('[data-typed]').forEach(function(el) {
        let words;
        try {
            words = JSON.parse(el.dataset.typed);
        } catch (e) {
            return;
        }
        if (!Array.isArray(words) || !words.length || prefersReducedMotion) return;

        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = true;
        el.textContent = words[0];

        function loop() {
            const word = words[wordIndex];
            if (deleting) {
                charIndex--;
                el.textContent = word.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    return setTimeout(loop, 350);
                }
                return setTimeout(loop, 28);
            }
            const next = words[wordIndex];
            charIndex++;
            el.textContent = next.slice(0, charIndex);
            if (charIndex === next.length) {
                deleting = true;
                return setTimeout(loop, 2600);
            }
            return setTimeout(loop, 55 + Math.random() * 45);
        }
        setTimeout(loop, 3200);
    });

    // ---------- Code editor typing (hero) ----------
    const codeBody = document.getElementById('codeTyping');
    const codeStatus = document.getElementById('codeStatus');

    if (codeBody && !prefersReducedMotion) {
        const lines = Array.prototype.slice.call(codeBody.querySelectorAll('.line'));
        const queue = [];

        // Collect every text node in order, remember its full text, then empty it
        lines.forEach(function(line, lineIndex) {
            const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                queue.push({ node: node, text: node.nodeValue, line: lineIndex });
                node.nodeValue = '';
            }
            line.classList.add('pending');
        });

        const cursor = document.createElement('span');
        cursor.className = 'code-cursor';
        if (codeStatus) codeStatus.classList.add('waiting');

        let q = 0;
        let c = 0;
        let currentLine = -1;

        function activateLine(index) {
            if (index === currentLine) return;
            if (currentLine >= 0) lines[currentLine].classList.remove('current');
            currentLine = index;
            lines[index].classList.remove('pending');
            lines[index].classList.add('current');
        }

        function typeNext() {
            if (q >= queue.length) {
                // Finished: leave the cursor blinking at the end
                lines[lines.length - 1].appendChild(cursor);
                if (codeStatus) codeStatus.classList.remove('waiting');
                return;
            }

            const item = queue[q];
            const lineChanged = item.line !== currentLine;
            activateLine(item.line);

            if (c < item.text.length) {
                // Indentation is typed instantly, like an editor auto-indent
                let chunk = item.text[c];
                if (chunk === ' ' && item.node.nodeValue.trim() === '' && item.node.parentNode === lines[item.line]) {
                    while (item.text[c + chunk.length] === ' ') chunk += ' ';
                }
                item.node.nodeValue += chunk;
                c += chunk.length;
                item.node.parentNode.insertBefore(cursor, item.node.nextSibling);
            }

            if (c >= item.text.length) {
                q++;
                c = 0;
            }

            const nextLine = q < queue.length ? queue[q].line : currentLine;
            const delay = lineChanged ? 0 : (nextLine !== currentLine ? 160 : 14 + Math.random() * 28);
            setTimeout(typeNext, delay);
        }

        setTimeout(typeNext, 700);
    }

    // ---------- Contact form (FormSubmit AJAX) ----------
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && contactForm.action) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            }

            // FormSubmit returns JSON only from its /ajax/ endpoint
            const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new FormData(contactForm)
                });

                if (response.ok) {
                    showNotification('Message sent. I will reply to you by email.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Something went wrong. Please email me at zulfiqaralam651@gmail.com.', 'info');
                }
            } catch (error) {
                showNotification('Network error. Please email me at zulfiqaralam651@gmail.com.', 'info');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                }
            }
        });
    }

    // ---------- Copy to clipboard ----------
    document.querySelectorAll('[data-copy]').forEach(function(button) {
        button.addEventListener('click', async function() {
            const value = button.getAttribute('data-copy');
            if (!value) return;

            let copied = false;
            try {
                await navigator.clipboard.writeText(value);
                copied = true;
            } catch (error) {
                const temp = document.createElement('textarea');
                temp.value = value;
                temp.setAttribute('readonly', '');
                temp.style.position = 'absolute';
                temp.style.left = '-9999px';
                document.body.appendChild(temp);
                temp.select();
                try {
                    copied = document.execCommand('copy');
                } catch (fallbackError) {
                    copied = false;
                }
                document.body.removeChild(temp);
            }

            if (copied) {
                const original = button.innerHTML;
                button.classList.add('copied');
                button.innerHTML = '<i class="fas fa-check"></i> Copied';
                setTimeout(function() {
                    button.classList.remove('copied');
                    button.innerHTML = original;
                }, 1600);
            } else {
                showNotification('Copy failed. Please copy it manually.', 'info');
            }
        });
    });

    // ---------- Toast notifications ----------
    function showNotification(message, type) {
        type = type || 'info';
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.setAttribute('role', 'status');

        const icon = document.createElement('i');
        icon.className = 'fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-info-circle');
        const text = document.createElement('span');
        text.textContent = message;

        notification.appendChild(icon);
        notification.appendChild(text);
        document.body.appendChild(notification);

        requestAnimationFrame(function() { notification.classList.add('show'); });

        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() { notification.remove(); }, 350);
        }, 4500);
    }
});
