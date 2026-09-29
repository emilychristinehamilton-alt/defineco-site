// Sends the site's forms to Wix Forms on the Define Co. Wix Headless project.
// Submissions show up under Forms & Submissions and create or update a contact.
(function () {
  var CLIENT_ID = 'c9020b8c-7ca9-41e4-8704-3838fdac3f86';
  var API = 'https://www.wixapis.com';
  var TOKEN_KEY = 'defineco.wixTokens';

  // Wix form IDs and how each page's input names map to the form's fields.
  var FORMS = {
    contact: {
      id: 'a55208ab-0b1a-4e30-bbb7-dc63ccb299a2',
      fields: { name: 'full_name', company: 'company', email: 'email', message: 'message' }
    },
    training: {
      id: 'c360f625-0a5a-457c-91a5-dec51d0d6704',
      fields: {
        name: 'full_name', company: 'company', email: 'email', phone: 'phone',
        teamsize: 'team_size', location: 'location', situation: 'situation',
        timeline: 'timeline', timeline_notes: 'timeline_notes'
      }
    }
  };

  function readTokens() {
    try { return JSON.parse(localStorage.getItem(TOKEN_KEY)) || null; } catch (e) { return null; }
  }

  function saveTokens(t) {
    try { localStorage.setItem(TOKEN_KEY, JSON.stringify(t)); } catch (e) {}
  }

  function requestToken(body) {
    return fetch(API + '/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error('token ' + r.status);
      return r.json();
    }).then(function (d) {
      var t = {
        access: d.access_token,
        refresh: d.refresh_token,
        expires: Date.now() + ((d.expires_in || 0) - 60) * 1000
      };
      saveTokens(t);
      return t.access;
    });
  }

  // Reuse the visitor's session when we can, so every submit isn't a brand new visitor.
  function getAccessToken() {
    var t = readTokens();
    if (t && t.access && t.expires > Date.now()) return Promise.resolve(t.access);
    var anonymous = function () {
      return requestToken({ clientId: CLIENT_ID, grantType: 'anonymous' });
    };
    if (t && t.refresh) {
      return requestToken({ clientId: CLIENT_ID, grantType: 'refresh_token', refreshToken: t.refresh })
        .catch(anonymous);
    }
    return anonymous();
  }

  function submit(formEl, kind, extra) {
    var config = FORMS[kind];
    var data = new FormData(formEl);
    var values = {};
    Object.keys(config.fields).forEach(function (name) {
      var v = extra && extra[name] != null ? extra[name] : data.get(name);
      v = (v == null ? '' : String(v)).trim();
      if (v) values[config.fields[name]] = v;
    });
    return getAccessToken().then(function (token) {
      return fetch(API + '/form-submission-service/v4/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ submission: { formId: config.id, submissions: values } })
      });
    }).then(function (r) {
      if (!r.ok) throw new Error('submit ' + r.status);
      return r.json();
    });
  }

  window.DefineForms = { submit: submit };
})();
