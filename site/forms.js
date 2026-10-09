// Sends the site's forms to Formspree, which emails each submission to Emily.
// Pages call window.DefineForms.submit(formEl, kind, extra) and get a promise back.
(function () {
  var ENDPOINTS = {
    contact: 'https://formspree.io/f/mkjorkkk',
    training: 'https://formspree.io/f/mwlvoaaz'
  };

  var SUBJECTS = {
    contact: 'New message from defineco.studio',
    training: 'New team training inquiry from defineco.studio'
  };

  function submit(formEl, kind, extra) {
    var data = new FormData(formEl);
    if (extra) {
      Object.keys(extra).forEach(function (k) { data.set(k, extra[k] == null ? '' : String(extra[k])); });
    }
    // Context for the email: which page it came from, and a clear subject line.
    data.set('page', location.pathname);
    data.set('_subject', SUBJECTS[kind]);

    return fetch(ENDPOINTS[kind], {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) {
        if (!r.ok) {
          var msg = body && body.errors && body.errors.length
            ? body.errors.map(function (e) { return e.message; }).join(' ')
            : 'submit ' + r.status;
          throw new Error(msg);
        }
        // Count the lead in Google Analytics, tagged with the form and the page it came from.
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { form_name: kind, page_path: location.pathname });
        }
        return body;
      });
    });
  }

  window.DefineForms = { submit: submit };
})();
