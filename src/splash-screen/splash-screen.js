function start() {
  return waitForBody().then(body => {
    addClassesToElement(body, 'splashing');
    const splash = createElementWithClasses('div', 'splash', 'spinner-section');
    body.appendChild(splash);
    let observer = new MutationObserver(ml => {
      for (let mutation of ml) {
        if (mutation.previousSibling === splash && mutation.removedNodes.length > 0) {
          removeClassesToElement(body, 'splashing');
          break;
        }
      }
    });
    observer.observe(body, { childList: true });
  });
}

function waitForBody() {
  return new Promise((resolve, reject) => {
    let body = document.getElementById('root');
    if (body) return resolve(body);
    const id = setInterval(() => {
      body = document.body;
      if (!body) return;
      clearInterval(id);
      resolve(body);
    }, 100);
  });
}

function addClassesToElement(elt, ...classes) {
  const finalClasses = classes.filter(cls => !hasClass(elt, cls));
  elt.classList.add(...finalClasses);
}

function removeClassesToElement(elt, ...classes) {
  const finalClasses = classes.filter(cls => hasClass(elt, cls));
  elt.classList.remove(...finalClasses);
}

function hasClass(elt, cls) {
  return elt.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function createElementWithClasses(tag, ...classes) {
  const elt = document.createElement(tag);
  elt.classList.add(...classes);
  return elt;
}

start();
