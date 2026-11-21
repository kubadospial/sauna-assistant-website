/* Sauna Assistant website: Polish/English, the conversation demo, the volume knob, sign-up. */
(function () {
  "use strict";

  /* ------------------------------------------------------------ settings */
  // Where sign-ups go. Set FORM_ENDPOINT to a form service URL (it receives {"email": ...} as
  // JSON) or CONTACT_EMAIL to open an e-mail to that address. With both empty there is no
  // sign-up yet: the form is hidden and the buttons ask "when is it available?" instead.
  var FORM_ENDPOINT = "";
  var CONTACT_EMAIL = "";
  var SIGNUPS = !!(FORM_ENDPOINT || CONTACT_EMAIL);

  var root = document.documentElement;
  root.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------- languages */
  // Polish is in the page itself; it is read from there, so the HTML stays the one source.
  var EN = {
    "skip": "Skip to content",
    "nav.features": "Features", "nav.how": "How it works", "nav.app": "App", "nav.faq": "FAQ",
    "nav.cta": "Join the list",
    "hero.eyebrow": "A voice assistant for your home sauna",
    "hero.title": "Say “Hey&nbsp;Sauna”<br>The assistant does the rest",
    "hero.lead": "Music, lights, reminders and answers to your questions, by voice. No leaving the heat, no phone in a hot sauna.",
    "hero.cta": "Join the waitlist", "hero.cta2": "See how it works",
    "hero.chip1": "Polish and English", "hero.chip2": "Electronics outside the sauna", "hero.chip3": "Adults only (18+)",
    "hero.chips": "At a glance",
    "demo.music": "Music playing", "demo.scene": "A sample conversation with the assistant",
    "feat.eyebrow": "What it does",
    "feat.title": "Everything you need on the bench, one word away",
    "feat.talk.t": "Talk to it", "feat.talk.d": "Ask anything, in English or Polish. It answers briefly in a natural voice, and you can cut in mid-sentence.",
    "feat.music.t": "Your music", "feat.music.d": "Spotify on the sauna speaker. While you talk, the music fades down, then comes back. If the speaker drops out, it waits on pause.",
    "feat.light.t": "Lights", "feat.light.d": "“Dim to 20%”, “lights off”. Smart Life (Tuya) lighting, by voice or in the app.",
    "feat.remind.t": "Reminders", "feat.remind.d": "“Remind me in 15 minutes to get out.” The reminder comes on time, even mid-conversation and without internet.",
    "feat.routine.t": "Your own commands", "feat.routine.d": "One sentence, several actions. “I’m leaving the sauna” turns off the lights and stops the music. Just tell the assistant once what to do.",
    "feat.wake.t": "Knows your voice", "feat.wake.d": "“Hey Sauna” learns how you say it from recordings made in your sauna. Over time it responds more reliably, even over the stove.",
    "feat.people.t": "Everyone their way", "feat.people.d": "Each person has a profile: language, the assistant’s voice and favourite commands. The owner decides who joins.",
    "feat.calm.t": "Listens only when called", "feat.calm.d": "The wake phrase is recognised on the device. Only after it hears it does the conversation go to the cloud, and it ends when you’re done.",
    "how.eyebrow": "How it works",
    "how.title": "In the hot room, only what has to be there",
    "how.diagram": "Diagram: microphone and speaker in the sauna, control unit behind the wall, phone and internet outside",
    "how.inside": "Sauna", "how.outside": "Outside",
    "how.s1.t": "A microphone in the sauna", "how.s1.d": "Only a wired microphone goes into the hot room. The cable runs through the wall.",
    "how.s2.t": "A control unit behind the wall", "how.s2.d": "A small computer outside the sauna, away from the heat. It recognises “Hey Sauna” itself and only then goes online.",
    "how.s3.t": "A Bluetooth speaker in the sauna", "how.s3.d": "Answers and music come from a speaker made for saunas. It reconnects by itself when switched on.",
    "how.s4.t": "An app on your phone", "how.s4.d": "Step-by-step setup over Bluetooth, then over your home Wi-Fi.",
    "app.eyebrow": "The app",
    "app.title": "Volume like an old radio",
    "app.lead": "In the app you turn a knob from 1 to 10. The assistant never goes above the limit you set, and the speaker always starts quietly.",
    "app.l1": "Step-by-step setup: Wi-Fi, speaker, Gemini",
    "app.l2": "Choose the assistant’s voice and language, with a preview in the sauna",
    "app.l3": "Profiles for your household and “Hey Sauna” voice training",
    "app.l4": "Light and dark look, in English and Polish",
    "app.kicker": "VOLUME", "app.screen": "Sauna speaker", "app.level": "Level",
    "app.try": "Try it: drag the knob or use the arrow keys", "app.knob": "Volume", "app.phone": "The Sauna Assistant app",
    "faq.eyebrow": "FAQ", "faq.title": "Good to know",
    "faq.q1": "What do I need?",
    "faq.a1": "Home Wi-Fi, a Bluetooth speaker made for saunas, an Android phone for setup and a Google account: the assistant talks through Google Gemini. For music: Spotify Premium.",
    "faq.q2": "Is it listening all the time?",
    "faq.a2": "No. Until it hears “Hey Sauna”, it sends nothing: the phrase is recognised on the device. Only the conversation goes to Google Gemini. In the EU, Google doesn’t use these conversations to improve its products.",
    "faq.q3": "Can it answer about the weather and the news?",
    "faq.a3": "Yes, when billing is linked to the Gemini account (Google’s paid plan). Without it, the assistant answers from its own knowledge, which can be out of date.",
    "faq.q4": "Who can use it?",
    "faq.a4": "Adults only (18+). The assistant runs on Google Gemini, whose terms don’t allow anyone under 18. Don’t let children talk to it.",
    "faq.q5": "Which languages does it speak?",
    "faq.a5": "Polish and English. It answers in the language you speak, or always in the one you choose.",
    "faq.q6": "What if the internet goes down?",
    "faq.a6": "The assistant says there’s no connection and tries again next time you call it. Reminders you’ve set still sound on time without internet.",
    "join.title": "Want Sauna Assistant at home?",
    "join.lead": "Leave your e-mail and we’ll get in touch when sales start. No spam, just that one message.",
    "join.label": "Your e-mail", "join.placeholder": "you@example.com", "join.button": "Sign me up",
    "join.bad": "That doesn’t look like an e-mail address.",
    "join.ok": "Thanks! We’ll let you know.",
    "join.mail": "Your e-mail app should open with the message ready to send.",
    "join.fail": "That didn’t work. Please try again in a moment.",
    "join.subject": "Sauna Assistant: waitlist",
    "join.soon": "Sales haven’t started yet. A waitlist sign-up will appear here soon.",
    "nav.cta.soon": "Availability", "hero.cta.soon": "When can I get it?",
    "footer.adults": "Adults only (18+).",
    "footer.tm": "Google Gemini, Spotify and Smart Life are trademarks of their owners. Sauna Assistant is not affiliated with them.",
    "title": "Sauna Assistant – a voice assistant for your sauna"
  };
  var PL_EXTRA = {
    "join.bad": "To nie wygląda na adres e-mail.",
    "join.ok": "Dziękujemy! Damy znać.",
    "join.mail": "Powinna otworzyć się Twoja poczta z gotową wiadomością.",
    "join.fail": "Nie udało się. Spróbuj za chwilę.",
    "join.subject": "Sauna Assistant: lista oczekujących",
    "join.soon": "Sprzedaż jeszcze nie ruszyła. Wkrótce pojawi się tu zapis na listę oczekujących.",
    "nav.cta.soon": "Dostępność", "hero.cta.soon": "Kiedy w sprzedaży?",
    "hero.chips": "W skrócie", "demo.scene": "Przykładowa rozmowa z asystentem",
    "app.knob": "Głośność", "app.phone": "Aplikacja Sauna Assistant"
  };

  var PL = Object.assign({}, PL_EXTRA, { title: document.title });
  document.querySelectorAll("[data-i18n]").forEach(function (el) { PL[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) { PL[el.dataset.i18nHtml] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) { PL[el.dataset.i18nPlaceholder] = el.placeholder; });

  if (!SIGNUPS) {
    // No sign-up yet: say so instead of a form that goes nowhere.
    document.getElementById("join-form").hidden = true;
    document.querySelectorAll('[data-i18n="nav.cta"], [data-i18n="hero.cta"], [data-i18n="join.lead"]').forEach(function (el) {
      el.dataset.i18n = { "nav.cta": "nav.cta.soon", "hero.cta": "hero.cta.soon", "join.lead": "join.soon" }[el.dataset.i18n];
    });
  }

  var lang = "pl";
  try { lang = localStorage.getItem("sa-lang") || (navigator.language || "pl").slice(0, 2); } catch (e) { /* private mode */ }
  if (lang !== "en") lang = "pl";

  function t(key) { return (lang === "en" ? EN : PL)[key] || PL[key] || key; }

  function applyLanguage() {
    root.lang = lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    var btn = document.getElementById("lang");
    btn.textContent = lang === "en" ? "PL" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Polski" : "English");
  }

  document.getElementById("lang").addEventListener("click", function () {
    lang = lang === "en" ? "pl" : "en";
    try { localStorage.setItem("sa-lang", lang); } catch (e) { /* fine */ }
    applyLanguage();
    demo.restart();
  });

  /* ---------------------------------------------------------------- nav */
  var nav = document.querySelector(".nav");
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { burger.setAttribute("aria-expanded", "false"); menu.classList.remove("is-open"); }
  });
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------- reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --------------------------------------------- the conversation demo */
  function inMinutes(m) {
    var d = new Date(Date.now() + m * 60000);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function scenarios() {
    var at = inMinutes(15);
    if (lang === "en") return [
      { you: "Dim the lights to 20%.", sa: "Done, lights at 20%.", fx: { light: 0.35 } },
      { you: "Play something calm.", sa: "Playing something calm.", fx: { music: true } },
      { you: "Remind me in 15 minutes to get out.", sa: "Okay, I’ll remind you at " + at + ".", fx: { timer: at } },
      { you: "Who invented the sauna?", sa: "Saunas go back thousands of years, and they’re most closely tied to Finland.", fx: {} },
      { you: "I’m leaving the sauna.", sa: "Turning off the lights and the music. See you!", fx: { light: 0.08, music: false, timer: null } }
    ];
    return [
      { you: "Przyciemnij światło do 20%.", sa: "Gotowe, światło na 20%.", fx: { light: 0.35 } },
      { you: "Puść coś spokojnego.", sa: "Już gra coś spokojnego.", fx: { music: true } },
      { you: "Przypomnij mi za 15 minut, żeby wyjść.", sa: "Dobrze, przypomnę o " + at + ".", fx: { timer: at } },
      { you: "Kto wymyślił saunę?", sa: "Sauny znano już tysiące lat temu, a najbardziej kojarzą się z Finlandią.", fx: {} },
      { you: "Wychodzę z sauny.", sa: "Gaszę światło i zatrzymuję muzykę. Do zobaczenia!", fx: { light: 0.08, music: false, timer: null } }
    ];
  }

  var demo = (function () {
    var scene = document.getElementById("scene");
    var chat = document.getElementById("chat");
    var musicPill = document.getElementById("music-pill");
    var timerPill = document.getElementById("timer-pill");
    var timerAt = document.getElementById("timer-at");
    var run = 0;

    function wait(ms, id) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () { id === run ? resolve() : reject(new Error("stopped")); }, ms);
      });
    }
    function bubble(cls, text) {
      var b = document.createElement("div");
      b.className = "bubble " + cls;
      if (text !== undefined) b.textContent = text;
      chat.appendChild(b);
      return b;
    }
    function apply(fx) {
      if ("light" in fx) scene.style.setProperty("--light", fx.light);
      if ("music" in fx) { musicPill.classList.toggle("is-on", fx.music); scene.classList.toggle("is-playing", fx.music); }
      if ("timer" in fx) { if (fx.timer) timerAt.textContent = fx.timer; timerPill.classList.toggle("is-on", !!fx.timer); }
    }
    function reset() {
      chat.innerHTML = "";
      apply({ light: 1, music: false, timer: null });
    }
    async function type(el, text, id) {
      if (reduceMotion) { el.textContent = text; return; }
      var caret = document.createElement("span");
      caret.className = "caret";
      el.textContent = "";
      el.appendChild(caret);
      for (var i = 0; i < text.length; i++) {
        caret.insertAdjacentText("beforebegin", text[i]);
        await wait(text[i] === " " ? 45 : 32, id);
      }
      caret.remove();
    }
    async function loop(id) {
      while (id === run) {
        reset();
        var list = scenarios();
        await wait(700, id);
        for (var i = 0; i < list.length; i++) {
          var s = list[i];
          chat.classList.remove("is-leaving");
          chat.innerHTML = "";
          bubble("bubble--wake", lang === "en" ? "“Hey Sauna”" : "„Hey Sauna”");
          await wait(reduceMotion ? 300 : 900, id);
          await type(bubble("bubble--you"), s.you, id);
          await wait(350, id);
          var reply = bubble("bubble--sa");
          reply.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>';
          await wait(reduceMotion ? 300 : 900, id);
          reply.textContent = s.sa;
          apply(s.fx);
          await wait(reduceMotion ? 5200 : 3400, id);
          chat.classList.add("is-leaving");
          await wait(450, id);
        }
        await wait(1400, id);
      }
    }
    function start() { run += 1; loop(run).catch(function () { /* a newer run took over */ }); }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) run += 1; else start();
    });
    return { restart: start };
  })();

  /* --------------------------------------------------------- the knob */
  var knob = (function () {
    var svg = document.getElementById("knob");
    var out = document.getElementById("knob-value");
    var NS = "http://www.w3.org/2000/svg";
    var C = 100, MIN = 1, MAX = 10, START = 135, SWEEP = 270;
    var value = 6, ticks = [], nums = [], rotor, glow;

    function el(name, attrs, parent) {
      var n = document.createElementNS(NS, name);
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      (parent || svg).appendChild(n);
      return n;
    }
    function angleOf(v) { return START + (v - MIN) / (MAX - MIN) * SWEEP; }
    function polar(r, deg) {
      var a = deg * Math.PI / 180;
      return [C + r * Math.cos(a), C + r * Math.sin(a)];
    }

    var defs = el("defs", {});
    var gb = el("linearGradient", { id: "k-body", x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
    el("stop", { offset: "0", style: "stop-color: var(--card)" }, gb);
    el("stop", { offset: "1", style: "stop-color: var(--line)" }, gb);
    var gc = el("radialGradient", { id: "k-cap", cx: ".38", cy: ".35", r: ".8" }, defs);
    el("stop", { offset: "0", style: "stop-color: var(--card)" }, gc);
    el("stop", { offset: "1", style: "stop-color: var(--card-inner)" }, gc);

    el("circle", { cx: C, cy: C, r: 94, class: "k-plate" });
    el("circle", { cx: C, cy: C, r: 98, class: "k-focus" });  // keyboard focus ring
    for (var i = MIN; i <= MAX; i++) {
      var a = angleOf(i);
      var p1 = polar(76, a), p2 = polar(88, a), pn = polar(63, a);
      ticks.push(el("line", { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], class: "k-tick" }));
      var n = el("text", { x: pn[0], y: pn[1], class: "k-num" });
      n.textContent = String(i);
      nums.push(n);
    }
    el("circle", { cx: C, cy: C + 4, r: 47, class: "k-shadow" });
    el("circle", { cx: C, cy: C, r: 45, class: "k-body" });
    rotor = el("g", { class: "k-rotor" });
    for (var k = 0; k < 48; k++) {
      var q1 = polar(39, k * 7.5), q2 = polar(45, k * 7.5);
      el("line", { x1: q1[0], y1: q1[1], x2: q2[0], y2: q2[1], class: "k-ridge " + (k % 2 ? "b" : "a") }, rotor);
    }
    el("circle", { cx: C, cy: C, r: 35, class: "k-cap" }, rotor);
    el("line", { x1: C + 18, y1: C, x2: C + 31, y2: C, class: "k-pointer" }, rotor);
    glow = el("circle", { cx: C, cy: C + 80, r: 4.5, class: "k-glow" });

    function set(v, fromUser) {
      v = Math.max(MIN, Math.min(MAX, Math.round(v)));
      if (v === value && fromUser) return;
      value = v;
      rotor.style.transform = "rotate(" + angleOf(v) + "deg)";
      rotor.style.transformOrigin = C + "px " + C + "px";
      ticks.forEach(function (tk, idx) { tk.classList.toggle("is-on", idx + MIN <= v); });
      nums.forEach(function (nm, idx) { nm.classList.toggle("is-current", idx + MIN === v); });
      glow.style.opacity = String(0.25 + 0.75 * (v - MIN) / (MAX - MIN));
      svg.setAttribute("aria-valuenow", String(v));
      out.textContent = String(v);
      if (fromUser && navigator.vibrate) { try { navigator.vibrate(6); } catch (e) { /* not allowed */ } }
    }

    function fromPointer(e) {
      var box = svg.getBoundingClientRect();
      var x = (e.clientX - box.left) / box.width * 200 - C;
      var y = (e.clientY - box.top) / box.height * 200 - C;
      var deg = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
      var rel = (deg - START + 360) % 360;
      if (rel > SWEEP) rel = rel > SWEEP + (360 - SWEEP) / 2 ? 0 : SWEEP; // in the gap: nearest end
      return MIN + rel / SWEEP * (MAX - MIN);
    }
    var dragging = false;
    svg.addEventListener("pointerdown", function (e) {
      dragging = true;
      svg.setPointerCapture(e.pointerId);
      set(fromPointer(e), true);
    });
    svg.addEventListener("pointermove", function (e) { if (dragging) set(fromPointer(e), true); });
    ["pointerup", "pointercancel"].forEach(function (ev) { svg.addEventListener(ev, function () { dragging = false; }); });
    svg.addEventListener("keydown", function (e) {
      var step = { ArrowUp: 1, ArrowRight: 1, PageUp: 2, ArrowDown: -1, ArrowLeft: -1, PageDown: -2 }[e.key];
      if (step) { set(value + step, true); e.preventDefault(); }
      if (e.key === "Home") { set(MIN, true); e.preventDefault(); }
      if (e.key === "End") { set(MAX, true); e.preventDefault(); }
    });
    set(6, false);
    return { set: set };
  })();

  /* ------------------------------------------------------------ sign-up */
  var form = document.getElementById("join-form");
  var msg = document.getElementById("join-msg");
  function say(key, kind) { msg.textContent = t(key); msg.className = "join__msg is-" + kind; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("join.bad", "error"); form.email.focus(); return; }
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: email, language: lang })
      }).then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        form.reset(); say("join.ok", "ok");
      }).catch(function () { say("join.fail", "error"); });
      return;
    }
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(t("join.subject")) +
      "&body=" + encodeURIComponent(email);
    say("join.mail", "ok");
  });

  /* -------------------------------------------------------------- start */
  document.getElementById("year").textContent = String(new Date().getFullYear());
  applyLanguage();
  demo.restart();
  void knob;
})();
