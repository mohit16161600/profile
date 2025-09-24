(function renderPopularPosts(){
  if (!window.BLOG_POSTS || !Array.isArray(window.BLOG_POSTS)) return;
  var container = document.getElementById('popular-posts');
  if (!container) return;

  // Build image prefix so images work both on root page and inside /blogs/
  var isInBlogsDir = location.pathname.indexOf('/blogs/') !== -1;
  var prefix = isInBlogsDir ? '../' : '';

  var popular = window.BLOG_POSTS.slice(0, 5);
  popular.forEach(function(post){
    var item = document.createElement('div');
    item.className = 'flex';

    var thumb = document.createElement('img');
    thumb.src = post.imageSrc ? (isInBlogsDir && post.imageSrc.indexOf('../') !== 0 && post.imageSrc.indexOf('http') !== 0 ? prefix + post.imageSrc : post.imageSrc) : '';
    thumb.alt = post.title || 'Post thumbnail';
    thumb.className = 'w-16 h-16 object-cover rounded-lg mr-3 flex-shrink-0';

    var right = document.createElement('div');
    var link = document.createElement('a');
    // Normalize href similarly for inner blog pages
    var href = post.href || '#';
    if (isInBlogsDir && href.indexOf('../') !== 0 && href.indexOf('http') !== 0) {
      href = '../' + href;
    }
    link.href = href;
    link.className = 'text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-1 block';
    link.textContent = post.title;

    var meta = document.createElement('p');
    meta.className = 'text-xs text-gray-500';
    meta.textContent = post.date || '';

    right.appendChild(link);
    right.appendChild(meta);
    if (thumb.src) item.appendChild(thumb);
    item.appendChild(right);
    container.appendChild(item);
  });
})();


