#!/bin/bash

# Blog Management Script for GitHub Pages
# Usage: ./create-blog-post.sh "Post Title" "post-slug" "category"

# Check if all arguments are provided
if [ $# -ne 3 ]; then
    echo "Usage: $0 \"Post Title\" \"post-slug\" \"category\""
    echo "Example: $0 \"My New Post\" \"my-new-post\" \"flutter\""
    exit 1
fi

TITLE="$1"
SLUG="$2"
CATEGORY="$3"
DATE=$(date +"%Y-%m-%d")
DATETIME=$(date +"%Y-%m-%dT%H:%M:%SZ")
YEAR=$(date +"%Y")
MONTH=$(date +"%m")
DAY=$(date +"%d")

# Create blog post file
cat > "blog/${SLUG}.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${TITLE} | Zulfiqar Alam</title>
    <meta name="title" content="${TITLE} | Zulfiqar Alam">
    <meta name="description" content="[Add your post description here]">
    <meta name="keywords" content="${CATEGORY}, Mobile Development, Flutter, React Native">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Zulfiqar Alam">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://zulfiqaralam18.github.io/blog/${SLUG}.html">
    <meta property="og:title" content="${TITLE}">
    <meta property="og:description" content="[Add your post description here]">
    <meta property="og:image" content="https://zulfiqaralam18.github.io/images/blog-default.jpg">
    <meta property="article:author" content="Zulfiqar Alam">
    <meta property="article:published_time" content="${DATETIME}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://zulfiqaralam18.github.io/blog/${SLUG}.html">
    <meta property="twitter:title" content="${TITLE}">
    <meta property="twitter:description" content="[Add your post description here]">
    <meta property="twitter:image" content="https://zulfiqaralam18.github.io/images/blog-default.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://zulfiqaralam18.github.io/blog/${SLUG}.html">
    
    <!-- External Resources -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${TITLE}",
      "description": "[Add your post description here]",
      "image": "https://zulfiqaralam18.github.io/images/blog-default.jpg",
      "author": {
        "@type": "Person",
        "name": "Zulfiqar Alam",
        "url": "https://zulfiqaralam18.github.io/"
      },
      "publisher": {
        "@type": "Person",
        "name": "Zulfiqar Alam"
      },
      "datePublished": "${DATE}",
      "dateModified": "${DATE}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://zulfiqaralam18.github.io/blog/${SLUG}.html"
      },
      "keywords": ["${CATEGORY}", "Mobile Development"],
      "articleSection": "${CATEGORY}"
    }
    </script>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-container">
                <a href="../" class="logo">Zulfiqar Alam</a>
                <div class="desktop-menu">
                    <a href="../#about">About</a>
                    <a href="../#skills">Skills</a>
                    <a href="../#projects">Projects</a>
                    <a href="../#blog">Blog</a>
                    <a href="../#contact">Contact</a>
                </div>
                <button class="mobile-menu-toggle" id="menuToggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- Blog Post Content -->
    <article class="blog-post-content" itemscope itemtype="https://schema.org/BlogPosting">
        <header class="blog-post-header">
            <h1 itemprop="headline">${TITLE}</h1>
            
            <div class="blog-post-meta">
                <span class="blog-post-category">${CATEGORY}</span>
                <time class="blog-post-date" itemprop="datePublished" datetime="${DATE}">${DATE}</time>
                <span class="blog-post-reading-time">X min read</span>
            </div>
            
            <div class="blog-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                <img src="../images/croped.jpeg" alt="Zulfiqar Alam" class="author-avatar">
                <div class="author-info">
                    <span class="author-name" itemprop="name">Zulfiqar Alam</span>
                    <span class="author-title">Mobile App Developer</span>
                </div>
            </div>
        </header>

        <div class="blog-post-body" itemprop="articleBody">
            <p>Write your blog post content here...</p>
            
            <h2>Section Heading</h2>
            <p>Add your content sections here.</p>
            
            <!-- Add more content as needed -->
        </div>

        <nav class="blog-navigation">
            <a href="index.html" class="blog-nav-link prev">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Blog</span>
            </a>
            <!-- Add next post link when available -->
        </nav>
    </article>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${YEAR} Zulfiqar Alam. All rights reserved.</p>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>
EOF

echo "Blog post created: blog/${SLUG}.html"
echo "Don't forget to:"
echo "1. Add the post description in the meta tags"
echo "2. Replace the placeholder content with your actual blog post"
echo "3. Add an appropriate featured image"
echo "4. Update the sitemap.xml with the new post URL"
echo "5. Update the reading time estimate"
