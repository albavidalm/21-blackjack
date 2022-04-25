const bjModule = (() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    s = ["A", "J", "Q", "K"];
  let o = [];
  const l = document.querySelector("#btnTake"),
    r = document.querySelector("#btnStop"),
    n = document.querySelector("#btnNew"),
    c = document.querySelectorAll(".divCards"),
    d = document.querySelectorAll(".points"),
    i = document.querySelector(".modal__close"),
    a = document.querySelector(".modal__section"),
    u = document.querySelector(".modal__title"),
    m = document.querySelector(".modal__img"),
    f = (t = 2) => {
      (e = y()), (o = []);
      for (let e = 0; e < t; e++) o.push(0);
      d.forEach((e) => (e.innerText = 0)),
        d.forEach((e) => (e.style.color = "#fff")),
        c.forEach((e) => (e.innerHTML = "")),
        (r.disabled = !1),
        (l.disabled = !1);
    },
    y = () => {
      e = [];
      for (let s = 2; s <= 10; s++) for (let o of t) e.push(s + o);
      for (let o of t) for (let t of s) e.push(t + o);
      return _.shuffle(e);
    },
    h = () => {
      if (0 === e.length) throw "There are no cards left in deck";
      return e.pop();
    },
    b = (e, t) => {
      const s = document.createElement("img");
      (s.src = `assets/${e}.png`), s.classList.add("carta"), c[t].append(s);
    },
    p = (e, t) => (
      (o[t] =
        o[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ("A" === t ? 11 : 10) : parseInt(t);
        })(e)),
      (d[t].innerText = o[t]),
      o[t]
    ),
    g = (e) => {
      let t = 0;
      do {
        const e = h();
        (t = p(e, o.length - 1)), b(e, o.length - 1);
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = o;
        setTimeout(() => {
          t === e
            ? (a.classList.remove("modal--hide"),
              (u.innerText = "Nobody wins"),
              (m.src = "assets/draw.gif"),
              (d[0].style.color = "#000"),
              (d[1].style.color = "#000"))
            : e > 21
            ? (a.classList.remove("modal--hide"),
              (u.innerText = "Computer wins"),
              (m.src = "assets/lose.gif"),
              (d[0].style.color = "#B70027"),
              (d[1].style.color = "#222272"))
            : t > 21
            ? (a.classList.remove("modal--hide"),
              (u.innerText = "You win Player 1"),
              (m.src = "assets/win.gif"),
              (d[0].style.color = "#222272"),
              (d[1].style.color = "#B70027"))
            : (a.classList.remove("modal--hide"),
              (u.innerText = "Computer wins"),
              (m.src = "assets/lose.gif"),
              (d[0].style.color = "#B70027"),
              (d[1].style.color = "#222272"));
        }, 100);
      })();
    };
  return (
    l.addEventListener("click", () => {
      const e = h(),
        t = p(e, 0);
      b(e, 0),
        t > 21
          ? ((l.disabled = !0), (r.disabled = !0), g(t))
          : 21 === t && ((l.disabled = !0), (r.disabled = !0), g(t));
    }),
    r.addEventListener("click", () => {
      (r.disabled = !0), (l.disabled = !0), g(o[0]);
    }),
    n.addEventListener("click", () => {
      f();
    }),
    i.addEventListener("click", () => {
      a.classList.add("modal--hide");
    }),
    { newGame: f }
  );
})();
