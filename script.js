// script.js
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

async function getQuote() {
  try {
    newBtn.disabled = true;
    newBtn.textContent = 'Loading...';

    const res = await fetch('https://dummyjson.com/quotes/random');
    if (!res.ok) throw new Error('Network error: ' + res.status);

    const data = await res.json();
    // API returns { id, quote, author }
    quoteEl.textContent = data.quote || 'No quote found';
    authorEl.textContent = data.author ? `— ${data.author}` : '';

  } catch (err) {
    console.error(err);
    quoteEl.textContent = 'Could not load quote. Try again.';
    authorEl.textContent = '';
  } finally {
    newBtn.disabled = false;
    newBtn.textContent = 'New Quote';
  }
}

newBtn.addEventListener('click', getQuote);

tweetBtn.addEventListener('click', () => {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`.trim();
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

// initial fetch on page load
getQuote();
