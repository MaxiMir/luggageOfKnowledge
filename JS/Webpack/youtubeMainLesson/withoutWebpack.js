// @ WITHOUNT Webpack:

// + FILE /webpack/index.html:
/**
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Webpack</title>
 <script src="analitics.js"></script>
 </head>
 <body>
 <div class="container">
 <h1>Webpack Container</h1>
 </div>
 <script src="Post.js"></script>
 <script src="index.js"></script>
 </body>
 </html>
 */



// + FILE /webpack/Post.js:
class Post {
  constructor(title) {
    this.title = title;
    this.date = new Date();
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
    });
  }
}



// + FILE /webpack/index.js:
const post = new Post("Webpack Post title");

console.log("title", post.toString());



// + FILE /webpack/analitics.js:
function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  const listener = () => counter++;

  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed";
      }

      return counter;
    }
  }
}

window.analytics = createAnalytics();
