import {
  ak as it,
  ax as Te,
  ay as Oe,
  az as N,
  j as m,
  aA as Re,
  Y as Ie,
  Z as Le,
  aB as $e,
  h as X,
  aC as lt,
  aw as ye,
  a1 as at,
  a5 as ct,
  c as ut,
  r as u,
  aD as dt,
  s as ne,
  v as ft,
  e as ee,
  T as Z,
  aE as mt,
  P as _e,
  G as oe,
  d as te,
  o as gt,
  B as bt,
  q as pe,
} from './index-Dbp1fGsr.js';
import {
  g as G,
  b as Ae,
  a as ht,
  I as yt,
  S as pt,
  T as jt,
} from './IconUsers-CmfNSx0J.js';
const [je, Ne] = it('Grid component was not found in tree'),
  ie = (e, t) =>
    e === 'content'
      ? 'auto'
      : e === 'auto'
        ? '0rem'
        : e
          ? `${100 / (t / e)}%`
          : void 0,
  ve = (e, t, r) =>
    r || e === 'auto' ? '100%' : e === 'content' ? 'unset' : ie(e, t),
  we = (e, t) => {
    if (e) return e === 'auto' || t ? '1' : 'auto';
  },
  Se = (e, t) => (e === 0 ? '0' : e ? `${100 / (t / e)}%` : void 0);
function vt({ span: e, order: t, offset: r, selector: n }) {
  const s = Te(),
    o = Ne(),
    i = o.breakpoints || s.breakpoints,
    l = G(e) === void 0 ? 12 : G(e),
    c = Oe({
      '--col-order': G(t)?.toString(),
      '--col-flex-grow': we(l, o.grow),
      '--col-flex-basis': ie(l, o.columns),
      '--col-width': l === 'content' ? 'auto' : void 0,
      '--col-max-width': ve(l, o.columns, o.grow),
      '--col-offset': Se(G(r), o.columns),
    }),
    f = N(i).reduce(
      (j, v) => (
        j[v] || (j[v] = {}),
        typeof t == 'object' &&
          t[v] !== void 0 &&
          (j[v]['--col-order'] = t[v]?.toString()),
        typeof e == 'object' &&
          e[v] !== void 0 &&
          ((j[v]['--col-flex-grow'] = we(e[v], o.grow)),
          (j[v]['--col-flex-basis'] = ie(e[v], o.columns)),
          (j[v]['--col-width'] = e[v] === 'content' ? 'auto' : void 0),
          (j[v]['--col-max-width'] = ve(e[v], o.columns, o.grow))),
        typeof r == 'object' &&
          r[v] !== void 0 &&
          (j[v]['--col-offset'] = Se(r[v], o.columns)),
        j
      ),
      {}
    ),
    V = Ae(N(f), i)
      .filter((j) => N(f[j.value]).length > 0)
      .map((j) => ({
        query:
          o.type === 'container'
            ? `mantine-grid (min-width: ${i[j.value]})`
            : `(min-width: ${i[j.value]})`,
        styles: f[j.value],
      }));
  return m.jsx(Re, {
    styles: c,
    media: o.type === 'container' ? void 0 : V,
    container: o.type === 'container' ? V : void 0,
    selector: n,
  });
}
var de = {
  container: 'm_8478a6da',
  root: 'm_410352e9',
  inner: 'm_dee7bd2f',
  col: 'm_96bdd299',
};
const wt = { span: 12 },
  fe = Ie((e, t) => {
    const r = Le('GridCol', wt, e),
      {
        classNames: n,
        className: s,
        style: o,
        styles: i,
        vars: a,
        span: l,
        order: c,
        offset: f,
        ...y
      } = r,
      V = Ne(),
      j = $e();
    return m.jsxs(m.Fragment, {
      children: [
        m.jsx(vt, { selector: `.${j}`, span: l, order: c, offset: f }),
        m.jsx(X, {
          ref: t,
          ...V.getStyles('col', {
            className: lt(s, j),
            style: o,
            classNames: n,
            styles: i,
          }),
          ...y,
        }),
      ],
    });
  });
fe.classes = de;
fe.displayName = '@mantine/core/GridCol';
function Ve({ gutter: e, selector: t, breakpoints: r, type: n }) {
  const s = Te(),
    o = r || s.breakpoints,
    i = Oe({ '--grid-gutter': ye(G(e)) }),
    a = N(o).reduce(
      (f, y) => (
        f[y] || (f[y] = {}),
        typeof e == 'object' &&
          e[y] !== void 0 &&
          (f[y]['--grid-gutter'] = ye(e[y])),
        f
      ),
      {}
    ),
    c = Ae(N(a), o)
      .filter((f) => N(a[f.value]).length > 0)
      .map((f) => ({
        query:
          n === 'container'
            ? `mantine-grid (min-width: ${o[f.value]})`
            : `(min-width: ${o[f.value]})`,
        styles: a[f.value],
      }));
  return m.jsx(Re, {
    styles: i,
    media: n === 'container' ? void 0 : c,
    container: n === 'container' ? c : void 0,
    selector: t,
  });
}
const St = { gutter: 'md', grow: !1, columns: 12 },
  Vt = ct((e, { justify: t, align: r, overflow: n }) => ({
    root: { '--grid-justify': t, '--grid-align': r, '--grid-overflow': n },
  })),
  B = Ie((e, t) => {
    const r = Le('Grid', St, e),
      {
        classNames: n,
        className: s,
        style: o,
        styles: i,
        unstyled: a,
        vars: l,
        grow: c,
        gutter: f,
        columns: y,
        align: V,
        justify: j,
        children: v,
        breakpoints: I,
        type: g,
        attributes: b,
        ...p
      } = r,
      F = at({
        name: 'Grid',
        classes: de,
        props: r,
        className: s,
        style: o,
        classNames: n,
        styles: i,
        unstyled: a,
        attributes: b,
        vars: l,
        varsResolver: Vt,
      }),
      k = $e();
    return g === 'container' && I
      ? m.jsxs(je, {
          value: { getStyles: F, grow: c, columns: y, breakpoints: I, type: g },
          children: [
            m.jsx(Ve, { selector: `.${k}`, ...r }),
            m.jsx('div', {
              ...F('container'),
              children: m.jsx(X, {
                ref: t,
                ...F('root', { className: k }),
                ...p,
                children: m.jsx('div', { ...F('inner'), children: v }),
              }),
            }),
          ],
        })
      : m.jsxs(je, {
          value: { getStyles: F, grow: c, columns: y, breakpoints: I, type: g },
          children: [
            m.jsx(Ve, { selector: `.${k}`, ...r }),
            m.jsx(X, {
              ref: t,
              ...F('root', { className: k }),
              ...p,
              children: m.jsx('div', { ...F('inner'), children: v }),
            }),
          ],
        });
  });
B.classes = de;
B.displayName = '@mantine/core/Grid';
B.Col = fe;
const Et = [
    ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', key: 'svg-0' }],
    ['path', { d: 'M3.6 9h16.8', key: 'svg-1' }],
    ['path', { d: 'M3.6 15h16.8', key: 'svg-2' }],
    ['path', { d: 'M11.5 3a17 17 0 0 0 0 18', key: 'svg-3' }],
    ['path', { d: 'M12.5 3a17 17 0 0 1 0 18', key: 'svg-4' }],
  ],
  xt = ut('outline', 'world', 'World', Et);
class H {
  constructor(t = 0, r = 'Network Error') {
    ((this.status = t), (this.text = r));
  }
}
const Ft = () => {
    if (!(typeof localStorage > 'u'))
      return {
        get: (e) => Promise.resolve(localStorage.getItem(e)),
        set: (e, t) => Promise.resolve(localStorage.setItem(e, t)),
        remove: (e) => Promise.resolve(localStorage.removeItem(e)),
      };
  },
  P = {
    origin: 'https://api.emailjs.com',
    blockHeadless: !1,
    storageProvider: Ft(),
  },
  me = (e) =>
    e
      ? typeof e == 'string'
        ? { publicKey: e }
        : e.toString() === '[object Object]'
          ? e
          : {}
      : {},
  kt = (e, t = 'https://api.emailjs.com') => {
    if (!e) return;
    const r = me(e);
    ((P.publicKey = r.publicKey),
      (P.blockHeadless = r.blockHeadless),
      (P.storageProvider = r.storageProvider),
      (P.blockList = r.blockList),
      (P.limitRate = r.limitRate),
      (P.origin = r.origin || t));
  },
  Be = async (e, t, r = {}) => {
    const n = await fetch(P.origin + e, {
        method: 'POST',
        headers: r,
        body: t,
      }),
      s = await n.text(),
      o = new H(n.status, s);
    if (n.ok) return o;
    throw o;
  },
  Me = (e, t, r) => {
    if (!e || typeof e != 'string')
      throw 'The public key is required. Visit https://dashboard.emailjs.com/admin/account';
    if (!t || typeof t != 'string')
      throw 'The service ID is required. Visit https://dashboard.emailjs.com/admin';
    if (!r || typeof r != 'string')
      throw 'The template ID is required. Visit https://dashboard.emailjs.com/admin/templates';
  },
  Ct = (e) => {
    if (e && e.toString() !== '[object Object]')
      throw 'The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/';
  },
  qe = (e) => e.webdriver || !e.languages || e.languages.length === 0,
  Ge = () => new H(451, 'Unavailable For Headless Browser'),
  Pt = (e, t) => {
    if (!Array.isArray(e)) throw 'The BlockList list has to be an array';
    if (typeof t != 'string')
      throw 'The BlockList watchVariable has to be a string';
  },
  Dt = (e) => !e.list?.length || !e.watchVariable,
  Tt = (e, t) => (e instanceof FormData ? e.get(t) : e[t]),
  He = (e, t) => {
    if (Dt(e)) return !1;
    Pt(e.list, e.watchVariable);
    const r = Tt(t, e.watchVariable);
    return typeof r != 'string' ? !1 : e.list.includes(r);
  },
  ze = () => new H(403, 'Forbidden'),
  Ot = (e, t) => {
    if (typeof e != 'number' || e < 0)
      throw 'The LimitRate throttle has to be a positive number';
    if (t && typeof t != 'string')
      throw 'The LimitRate ID has to be a non-empty string';
  },
  Rt = async (e, t, r) => {
    const n = Number((await r.get(e)) || 0);
    return t - Date.now() + n;
  },
  Ke = async (e, t, r) => {
    if (!t.throttle || !r) return !1;
    Ot(t.throttle, t.id);
    const n = t.id || e;
    return (await Rt(n, t.throttle, r)) > 0
      ? !0
      : (await r.set(n, Date.now().toString()), !1);
  },
  We = () => new H(429, 'Too Many Requests'),
  It = async (e, t, r, n) => {
    const s = me(n),
      o = s.publicKey || P.publicKey,
      i = s.blockHeadless || P.blockHeadless,
      a = s.storageProvider || P.storageProvider,
      l = { ...P.blockList, ...s.blockList },
      c = { ...P.limitRate, ...s.limitRate };
    return i && qe(navigator)
      ? Promise.reject(Ge())
      : (Me(o, e, t),
        Ct(r),
        r && He(l, r)
          ? Promise.reject(ze())
          : (await Ke(location.pathname, c, a))
            ? Promise.reject(We())
            : Be(
                '/api/v1.0/email/send',
                JSON.stringify({
                  lib_version: '4.4.1',
                  user_id: o,
                  service_id: e,
                  template_id: t,
                  template_params: r,
                }),
                { 'Content-type': 'application/json' }
              ));
  },
  Lt = (e) => {
    if (!e || e.nodeName !== 'FORM')
      throw 'The 3rd parameter is expected to be the HTML form element or the style selector of the form';
  },
  $t = (e) => (typeof e == 'string' ? document.querySelector(e) : e),
  _t = async (e, t, r, n) => {
    const s = me(n),
      o = s.publicKey || P.publicKey,
      i = s.blockHeadless || P.blockHeadless,
      a = P.storageProvider || s.storageProvider,
      l = { ...P.blockList, ...s.blockList },
      c = { ...P.limitRate, ...s.limitRate };
    if (i && qe(navigator)) return Promise.reject(Ge());
    const f = $t(r);
    (Me(o, e, t), Lt(f));
    const y = new FormData(f);
    return He(l, y)
      ? Promise.reject(ze())
      : (await Ke(location.pathname, c, a))
        ? Promise.reject(We())
        : (y.append('lib_version', '4.4.1'),
          y.append('service_id', e),
          y.append('template_id', t),
          y.append('user_id', o),
          Be('/api/v1.0/email/send-form', y));
  },
  At = { init: kt, send: It, sendForm: _t, EmailJSResponseStatus: H };
function Nt(e) {
  if (!/^[0-9a-zA-Z-]+$/.test(e))
    throw new Error(
      `[@mantine/use-form] Form name "${e}" is invalid, it should contain only letters, numbers and dashes`
    );
}
const Bt = typeof window < 'u' ? u.useLayoutEffect : u.useEffect;
function C(e, t) {
  Bt(() => {
    if (e)
      return (
        window.addEventListener(e, t),
        () => window.removeEventListener(e, t)
      );
  }, [e]);
}
function Mt(e, t) {
  (e && Nt(e),
    C(`mantine-form:${e}:set-field-value`, (r) =>
      t.setFieldValue(r.detail.path, r.detail.value)
    ),
    C(`mantine-form:${e}:set-values`, (r) => t.setValues(r.detail)),
    C(`mantine-form:${e}:set-initial-values`, (r) =>
      t.setInitialValues(r.detail)
    ),
    C(`mantine-form:${e}:set-errors`, (r) => t.setErrors(r.detail)),
    C(`mantine-form:${e}:set-field-error`, (r) =>
      t.setFieldError(r.detail.path, r.detail.error)
    ),
    C(`mantine-form:${e}:clear-field-error`, (r) =>
      t.clearFieldError(r.detail)
    ),
    C(`mantine-form:${e}:clear-errors`, t.clearErrors),
    C(`mantine-form:${e}:reset`, t.reset),
    C(`mantine-form:${e}:validate`, t.validate),
    C(`mantine-form:${e}:validate-field`, (r) => t.validateField(r.detail)),
    C(`mantine-form:${e}:reorder-list-item`, (r) =>
      t.reorderListItem(r.detail.path, r.detail.payload)
    ),
    C(`mantine-form:${e}:remove-list-item`, (r) =>
      t.removeListItem(r.detail.path, r.detail.index)
    ),
    C(`mantine-form:${e}:insert-list-item`, (r) =>
      t.insertListItem(r.detail.path, r.detail.item, r.detail.index)
    ),
    C(`mantine-form:${e}:set-dirty`, (r) => t.setDirty(r.detail)),
    C(`mantine-form:${e}:set-touched`, (r) => t.setTouched(r.detail)),
    C(`mantine-form:${e}:reset-dirty`, (r) => t.resetDirty(r.detail)),
    C(`mantine-form:${e}:reset-touched`, t.resetTouched));
}
function qt(e) {
  return (t) => {
    if (!t) e(t);
    else if (typeof t == 'function') e(t);
    else if (typeof t == 'object' && 'nativeEvent' in t) {
      const { currentTarget: r } = t;
      r instanceof HTMLInputElement
        ? r.type === 'checkbox'
          ? e(r.checked)
          : e(r.value)
        : (r instanceof HTMLTextAreaElement ||
            r instanceof HTMLSelectElement) &&
          e(r.value);
    } else e(t);
  };
}
function le(e) {
  return e === null || typeof e != 'object'
    ? {}
    : Object.keys(e).reduce((t, r) => {
        const n = e[r];
        return (n != null && n !== !1 && (t[r] = n), t);
      }, {});
}
function Gt(e) {
  const [t, r] = u.useState(le(e)),
    n = u.useRef(t),
    s = u.useCallback((l) => {
      r((c) => {
        const f = le(typeof l == 'function' ? l(c) : l);
        return ((n.current = f), f);
      });
    }, []),
    o = u.useCallback(() => s({}), []),
    i = u.useCallback(
      (l) => {
        n.current[l] !== void 0 &&
          s((c) => {
            const f = { ...c };
            return (delete f[l], f);
          });
      },
      [t]
    ),
    a = u.useCallback(
      (l, c) => {
        c == null || c === !1
          ? i(l)
          : n.current[l] !== c && s((f) => ({ ...f, [l]: c }));
      },
      [t]
    );
  return {
    errorsState: t,
    setErrors: s,
    clearErrors: o,
    setFieldError: a,
    clearFieldError: i,
  };
}
function ae(e, t) {
  if (t === null || typeof t != 'object') return {};
  const r = { ...t };
  return (
    Object.keys(t).forEach((n) => {
      n.includes(`${String(e)}.`) && delete r[n];
    }),
    r
  );
}
function Ee(e, t) {
  const r = e.substring(t.length + 1).split('.')[0];
  return parseInt(r, 10);
}
function xe(e, t, r, n) {
  if (t === void 0) return r;
  const s = `${String(e)}`;
  let o = r;
  n === -1 && (o = ae(`${s}.${t}`, o));
  const i = { ...o },
    a = new Set();
  return (
    Object.entries(o)
      .filter(([l]) => {
        if (!l.startsWith(`${s}.`)) return !1;
        const c = Ee(l, s);
        return Number.isNaN(c) ? !1 : c >= t;
      })
      .forEach(([l, c]) => {
        const f = Ee(l, s),
          y = l.replace(`${s}.${f}`, `${s}.${f + n}`);
        ((i[y] = c), a.add(y), a.has(l) || delete i[l]);
      }),
    i
  );
}
function Ht(e, { from: t, to: r }, n) {
  const s = `${e}.${t}`,
    o = `${e}.${r}`,
    i = { ...n },
    a = new Set();
  return (
    Object.keys(n).forEach((l) => {
      if (a.has(l)) return;
      let c, f;
      if (
        (l.startsWith(s)
          ? ((c = l), (f = l.replace(s, o)))
          : l.startsWith(o) && ((c = l.replace(o, s)), (f = l)),
        c && f)
      ) {
        const y = i[c],
          V = i[f];
        (V === void 0 ? delete i[c] : (i[c] = V),
          y === void 0 ? delete i[f] : (i[f] = y),
          a.add(c),
          a.add(f));
      }
    }),
    i
  );
}
function Fe(e, t, r) {
  (typeof r.value == 'object' && (r.value = A(r.value)),
    !r.enumerable ||
    r.get ||
    r.set ||
    !r.configurable ||
    !r.writable ||
    t === '__proto__'
      ? Object.defineProperty(e, t, r)
      : (e[t] = r.value));
}
function A(e) {
  if (typeof e != 'object') return e;
  var t = 0,
    r,
    n,
    s,
    o = Object.prototype.toString.call(e);
  if (
    (o === '[object Object]'
      ? (s = Object.create(e.__proto__ || null))
      : o === '[object Array]'
        ? (s = Array(e.length))
        : o === '[object Set]'
          ? ((s = new Set()),
            e.forEach(function (i) {
              s.add(A(i));
            }))
          : o === '[object Map]'
            ? ((s = new Map()),
              e.forEach(function (i, a) {
                s.set(A(a), A(i));
              }))
            : o === '[object Date]'
              ? (s = new Date(+e))
              : o === '[object RegExp]'
                ? (s = new RegExp(e.source, e.flags))
                : o === '[object DataView]'
                  ? (s = new e.constructor(A(e.buffer)))
                  : o === '[object ArrayBuffer]'
                    ? (s = e.slice(0))
                    : o.slice(-6) === 'Array]' && (s = new e.constructor(e)),
    s)
  ) {
    for (n = Object.getOwnPropertySymbols(e); t < n.length; t++)
      Fe(s, n[t], Object.getOwnPropertyDescriptor(e, n[t]));
    for (t = 0, n = Object.getOwnPropertyNames(e); t < n.length; t++)
      (Object.hasOwnProperty.call(s, (r = n[t])) && s[r] === e[r]) ||
        Fe(s, r, Object.getOwnPropertyDescriptor(e, r));
  }
  return s || e;
}
function Ue(e) {
  return typeof e != 'string' ? [] : e.split('.');
}
function x(e, t) {
  const r = Ue(e);
  if (r.length === 0 || typeof t != 'object' || t === null) return;
  let n = t[r[0]];
  for (let s = 1; s < r.length && n != null; s += 1) n = n[r[s]];
  return n;
}
function z(e, t, r) {
  const n = Ue(e);
  if (n.length === 0) return r;
  const s = A(r);
  if (n.length === 1) return ((s[n[0]] = t), s);
  let o = s[n[0]];
  for (let i = 1; i < n.length - 1; i += 1) {
    if (o === void 0) return s;
    o = o[n[i]];
  }
  return ((o[n[n.length - 1]] = t), s);
}
function zt(e, { from: t, to: r }, n) {
  const s = x(e, n);
  if (!Array.isArray(s)) return n;
  const o = [...s],
    i = s[t];
  return (o.splice(t, 1), o.splice(r, 0, i), z(e, o, n));
}
function Kt(e, t, r, n) {
  const s = x(e, n);
  if (!Array.isArray(s)) return n;
  const o = [...s];
  return (o.splice(typeof r == 'number' ? r : o.length, 0, t), z(e, o, n));
}
function Wt(e, t, r) {
  const n = x(e, r);
  return Array.isArray(n)
    ? z(
        e,
        n.filter((s, o) => o !== t),
        r
      )
    : r;
}
function Ut(e, t, r, n) {
  const s = x(e, n);
  if (!Array.isArray(s) || s.length <= r) return n;
  const o = [...s];
  return ((o[r] = t), z(e, o, n));
}
function Yt({ $values: e, $errors: t, $status: r }) {
  const n = u.useCallback((a, l) => {
      (r.clearFieldDirty(a),
        t.setErrors((c) => Ht(a, l, c)),
        e.setValues({
          values: zt(a, l, e.refValues.current),
          updateState: !0,
        }));
    }, []),
    s = u.useCallback((a, l) => {
      (r.clearFieldDirty(a),
        t.setErrors((c) => xe(a, l, c, -1)),
        e.setValues({
          values: Wt(a, l, e.refValues.current),
          updateState: !0,
        }));
    }, []),
    o = u.useCallback((a, l, c) => {
      (r.clearFieldDirty(a),
        t.setErrors((f) => xe(a, c, f, 1)),
        e.setValues({
          values: Kt(a, l, c, e.refValues.current),
          updateState: !0,
        }));
    }, []),
    i = u.useCallback((a, l, c) => {
      (r.clearFieldDirty(a),
        e.setValues({
          values: Ut(a, c, l, e.refValues.current),
          updateState: !0,
        }));
    }, []);
  return {
    reorderListItem: n,
    removeListItem: s,
    insertListItem: o,
    replaceListItem: i,
  };
}
var re, ke;
function Jt() {
  return (
    ke ||
      ((ke = 1),
      (re = function e(t, r) {
        if (t === r) return !0;
        if (t && r && typeof t == 'object' && typeof r == 'object') {
          if (t.constructor !== r.constructor) return !1;
          var n, s, o;
          if (Array.isArray(t)) {
            if (((n = t.length), n != r.length)) return !1;
            for (s = n; s-- !== 0; ) if (!e(t[s], r[s])) return !1;
            return !0;
          }
          if (t.constructor === RegExp)
            return t.source === r.source && t.flags === r.flags;
          if (t.valueOf !== Object.prototype.valueOf)
            return t.valueOf() === r.valueOf();
          if (t.toString !== Object.prototype.toString)
            return t.toString() === r.toString();
          if (
            ((o = Object.keys(t)), (n = o.length), n !== Object.keys(r).length)
          )
            return !1;
          for (s = n; s-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(r, o[s])) return !1;
          for (s = n; s-- !== 0; ) {
            var i = o[s];
            if (!e(t[i], r[i])) return !1;
          }
          return !0;
        }
        return t !== t && r !== r;
      })),
    re
  );
}
var Xt = Jt();
const U = dt(Xt);
function q(e, t) {
  const r = Object.keys(e);
  if (typeof t == 'string') {
    const n = r.filter((s) => s.startsWith(`${t}.`));
    return e[t] || n.some((s) => e[s]) || !1;
  }
  return r.some((n) => e[n]);
}
function Zt({ initialDirty: e, initialTouched: t, mode: r, $values: n }) {
  const [s, o] = u.useState(t),
    [i, a] = u.useState(e),
    l = u.useRef(t),
    c = u.useRef(e),
    f = u.useCallback((h) => {
      const S = typeof h == 'function' ? h(l.current) : h;
      ((l.current = S), r === 'controlled' && o(S));
    }, []),
    y = u.useCallback((h, S = !1) => {
      const E = typeof h == 'function' ? h(c.current) : h;
      ((c.current = E), (r === 'controlled' || S) && a(E));
    }, []),
    V = u.useCallback(() => f({}), []),
    j = u.useCallback((h) => {
      const S = h ? { ...n.refValues.current, ...h } : n.refValues.current;
      (n.setValuesSnapshot(S), y({}));
    }, []),
    v = u.useCallback((h, S) => {
      f((E) => (q(E, h) === S ? E : { ...E, [h]: S }));
    }, []),
    I = u.useCallback((h, S, E) => {
      y((T) => (q(T, h) === S ? T : { ...T, [h]: S }), E);
    }, []),
    g = u.useCallback((h, S) => {
      const E = q(c.current, h),
        T = !U(x(h, n.getValuesSnapshot()), S),
        $ = ae(h, c.current);
      (($[h] = T), y($, E !== T));
    }, []),
    b = u.useCallback((h) => q(l.current, h), []),
    p = u.useCallback(
      (h) =>
        y((S) => {
          if (typeof h != 'string') return S;
          const E = ae(h, S);
          return (delete E[h], U(E, S) ? S : E);
        }),
      []
    ),
    F = u.useCallback((h) => {
      if (h) {
        const E = x(h, c.current);
        if (typeof E == 'boolean') return E;
        const T = x(h, n.refValues.current),
          $ = x(h, n.valuesSnapshot.current);
        return !U(T, $);
      }
      return Object.keys(c.current).length > 0
        ? q(c.current)
        : !U(n.refValues.current, n.valuesSnapshot.current);
    }, []),
    k = u.useCallback(() => c.current, []),
    L = u.useCallback(() => l.current, []);
  return {
    touchedState: s,
    dirtyState: i,
    touchedRef: l,
    dirtyRef: c,
    setTouched: f,
    setDirty: y,
    resetDirty: j,
    resetTouched: V,
    isTouched: b,
    setFieldTouched: v,
    setFieldDirty: I,
    setTouchedState: o,
    setDirtyState: a,
    clearFieldDirty: p,
    isDirty: F,
    getDirty: k,
    getTouched: L,
    setCalculatedFieldDirty: g,
  };
}
function Qt({ initialValues: e, onValuesChange: t, mode: r }) {
  const n = u.useRef(!1),
    [s, o] = u.useState(e || {}),
    i = u.useRef(s),
    a = u.useRef(s),
    l = u.useCallback(
      ({
        values: g,
        subscribers: b,
        updateState: p = !0,
        mergeWithPreviousValues: F = !0,
      }) => {
        const k = i.current,
          L = g instanceof Function ? g(i.current) : g,
          h = F ? { ...k, ...L } : L;
        ((i.current = h),
          p && (o(h), r === 'uncontrolled' && (i.current = h)),
          t?.(h, k),
          b
            ?.filter(Boolean)
            .forEach((S) => S({ updatedValues: h, previousValues: k })));
      },
      [t]
    ),
    c = u.useCallback(
      (g) => {
        const b = x(g.path, i.current),
          p = g.value instanceof Function ? g.value(b) : g.value;
        if (b !== p) {
          const F = i.current,
            k = z(g.path, p, i.current);
          (l({ values: k, updateState: g.updateState }),
            g.subscribers
              ?.filter(Boolean)
              .forEach((L) =>
                L({ path: g.path, updatedValues: k, previousValues: F })
              ));
        }
      },
      [l]
    ),
    f = u.useCallback((g) => {
      a.current = g;
    }, []),
    y = u.useCallback(
      (g, b) => {
        n.current ||
          ((n.current = !0),
          l({ values: g, updateState: r === 'controlled' }),
          f(g),
          b());
      },
      [l]
    ),
    V = u.useCallback(() => {
      l({ values: a.current, updateState: !0, mergeWithPreviousValues: !1 });
    }, [l]),
    j = u.useCallback(() => i.current, []),
    v = u.useCallback(() => a.current, []),
    I = u.useCallback(
      (g, b) => {
        const p = x(g, a.current);
        typeof p > 'u' ||
          c({
            path: g,
            value: p,
            updateState: r === 'controlled',
            subscribers: b,
          });
      },
      [c, r]
    );
  return {
    initialized: n,
    stateValues: s,
    refValues: i,
    valuesSnapshot: a,
    setValues: l,
    setFieldValue: c,
    resetValues: V,
    setValuesSnapshot: f,
    initialize: y,
    getValues: j,
    getValuesSnapshot: v,
    resetField: I,
  };
}
function er({ $status: e, cascadeUpdates: t }) {
  const r = u.useRef({}),
    n = u.useCallback((o, i) => {
      u.useEffect(
        () => (
          (r.current[o] = r.current[o] || []),
          r.current[o].push(i),
          () => {
            r.current[o] = r.current[o].filter((a) => a !== i);
          }
        ),
        [i]
      );
    }, []),
    s = u.useCallback((o) => {
      const i =
        r.current[o]?.map(
          (a) => (l) =>
            a({
              previousValue: x(o, l.previousValues),
              value: x(o, l.updatedValues),
              touched: e.isTouched(o),
              dirty: e.isDirty(o),
            })
        ) ?? [];
      if (t)
        for (const a in r.current)
          (a.startsWith(`${o}.`) || o.startsWith(`${a}.`)) &&
            i.push(
              ...r.current[a].map(
                (l) => (c) =>
                  l({
                    previousValue: x(a, c.previousValues),
                    value: x(a, c.updatedValues),
                    touched: e.isTouched(a),
                    dirty: e.isDirty(a),
                  })
              )
            );
      return i;
    }, []);
  return { subscribers: r, watch: n, getFieldSubscribers: s };
}
function Ce(e, t) {
  return e ? `${e}-${t.toString()}` : t.toString();
}
const Y = Symbol('root-rule');
function Pe(e) {
  const t = le(e);
  return { hasErrors: Object.keys(t).length > 0, errors: t };
}
function ce(e, t, r = '', n = {}) {
  return typeof e != 'object' || e === null
    ? n
    : Object.keys(e).reduce((s, o) => {
        const i = e[o],
          a = `${r === '' ? '' : `${r}.`}${o}`,
          l = x(a, t);
        let c = !1;
        return (
          typeof i == 'function' && (s[a] = i(l, t, a)),
          typeof i == 'object' &&
            Array.isArray(l) &&
            ((c = !0),
            l.forEach((f, y) => ce(i, t, `${a}.${y}`, s)),
            Y in i && (s[a] = i[Y](l, t, a))),
          typeof i == 'object' &&
            typeof l == 'object' &&
            l !== null &&
            (c || ce(i, t, a, s), Y in i && (s[a] = i[Y](l, t, a))),
          s
        );
      }, n);
}
function ue(e, t) {
  return Pe(typeof e == 'function' ? e(t) : ce(e, t));
}
function J(e, t, r) {
  if (typeof e != 'string') return { hasError: !1, error: null };
  const n = ue(t, r),
    s = Object.keys(n.errors).find((o) =>
      e.split('.').every((i, a) => i === o.split('.')[a])
    );
  return { hasError: !!s, error: s ? n.errors[s] : null };
}
const tr = '__MANTINE_FORM_INDEX__';
function De(e, t) {
  return t
    ? typeof t == 'boolean'
      ? t
      : Array.isArray(t)
        ? t.includes(e.replace(/[.][0-9]+/g, `.${tr}`))
        : !1
    : !1;
}
function rr({
  name: e,
  mode: t = 'controlled',
  initialValues: r,
  initialErrors: n = {},
  initialDirty: s = {},
  initialTouched: o = {},
  clearInputErrorOnChange: i = !0,
  validateInputOnChange: a = !1,
  validateInputOnBlur: l = !1,
  onValuesChange: c,
  transformValues: f = (g) => g,
  enhanceGetInputProps: y,
  validate: V,
  onSubmitPreventDefault: j = 'always',
  touchTrigger: v = 'change',
  cascadeUpdates: I = !1,
} = {}) {
  const g = Gt(n),
    b = Qt({ initialValues: r, onValuesChange: c, mode: t }),
    p = Zt({ initialDirty: s, initialTouched: o, $values: b, mode: t }),
    F = Yt({ $values: b, $errors: g, $status: p }),
    k = er({ $status: p, cascadeUpdates: I }),
    [L, h] = u.useState(0),
    [S, E] = u.useState({}),
    [T, $] = u.useState(!1),
    ge = u.useCallback(() => {
      (b.resetValues(),
        g.clearErrors(),
        p.resetDirty(),
        p.resetTouched(),
        t === 'uncontrolled' && h((d) => d + 1));
    }, []),
    K = u.useCallback(
      (d) => {
        (i && g.clearErrors(),
          t === 'uncontrolled' && h((w) => w + 1),
          Object.keys(k.subscribers.current).forEach((w) => {
            const D = x(w, b.refValues.current),
              O = x(w, d);
            D !== O &&
              k
                .getFieldSubscribers(w)
                .forEach((_) =>
                  _({ previousValues: d, updatedValues: b.refValues.current })
                );
          }));
      },
      [i]
    ),
    Ye = u.useCallback(
      (d) => {
        const w = b.refValues.current;
        (b.initialize(d, () => t === 'uncontrolled' && h((D) => D + 1)), K(w));
      },
      [K]
    ),
    be = u.useCallback(
      (d, w, D) => {
        const O = De(d, a),
          _ = w instanceof Function ? w(x(d, b.refValues.current)) : w;
        (p.setCalculatedFieldDirty(d, _),
          v === 'change' && p.setFieldTouched(d, !0),
          !O && i && g.clearFieldError(d),
          b.setFieldValue({
            path: d,
            value: w,
            updateState: t === 'controlled',
            subscribers: [
              ...k.getFieldSubscribers(d),
              O
                ? (M) => {
                    const R = J(d, V, M.updatedValues);
                    R.hasError
                      ? g.setFieldError(d, R.error)
                      : g.clearFieldError(d);
                  }
                : null,
              D?.forceUpdate !== !1 && t !== 'controlled'
                ? () => E((M) => ({ ...M, [d]: (M[d] || 0) + 1 }))
                : null,
            ],
          }));
      },
      [c, V]
    ),
    Je = u.useCallback(
      (d) => {
        const w = b.refValues.current;
        (b.setValues({ values: d, updateState: t === 'controlled' }), K(w));
      },
      [c, K]
    ),
    he = u.useCallback(() => {
      const d = ue(V, b.refValues.current);
      return (g.setErrors(d.errors), d);
    }, [V]),
    Xe = u.useCallback(
      (d) => {
        const w = J(d, V, b.refValues.current);
        return (
          w.hasError ? g.setFieldError(d, w.error) : g.clearFieldError(d),
          w
        );
      },
      [V]
    ),
    Ze = (
      d,
      { type: w = 'input', withError: D = !0, withFocus: O = !0, ..._ } = {}
    ) => {
      const R = {
        onChange: qt((W) => be(d, W, { forceUpdate: !1 })),
        'data-path': Ce(e, d),
      };
      return (
        D && (R.error = g.errorsState[d]),
        w === 'checkbox'
          ? (R[t === 'controlled' ? 'checked' : 'defaultChecked'] = x(
              d,
              b.refValues.current
            ))
          : (R[t === 'controlled' ? 'value' : 'defaultValue'] = x(
              d,
              b.refValues.current
            )),
        O &&
          ((R.onFocus = () => p.setFieldTouched(d, !0)),
          (R.onBlur = () => {
            if (De(d, l)) {
              const W = J(d, V, b.refValues.current);
              W.hasError ? g.setFieldError(d, W.error) : g.clearFieldError(d);
            }
          })),
        Object.assign(
          R,
          y?.({
            inputProps: R,
            field: d,
            options: { type: w, withError: D, withFocus: O, ..._ },
            form: Q,
          })
        )
      );
    },
    Qe = (d, w) => (D) => {
      j === 'always' && D?.preventDefault();
      const O = he();
      if (O.hasErrors)
        (j === 'validation-failed' && D?.preventDefault(),
          w?.(O.errors, b.refValues.current, D));
      else {
        const _ = d?.(f(b.refValues.current), D);
        _ instanceof Promise && ($(!0), _.finally(() => $(!1)));
      }
    },
    et = (d) => f(d || b.refValues.current),
    tt = u.useCallback((d) => {
      (d.preventDefault(), ge());
    }, []),
    rt = u.useCallback(
      (d) =>
        d
          ? !J(d, V, b.refValues.current).hasError
          : !ue(V, b.refValues.current).hasErrors,
      [V]
    ),
    st = (d) => `${L}-${String(d)}-${S[String(d)] || 0}`,
    nt = u.useCallback(
      (d) => document.querySelector(`[data-path="${Ce(e, d)}"]`),
      []
    ),
    ot = u.useCallback(
      (d) => {
        b.resetField(d, [
          t !== 'controlled'
            ? () => E((w) => ({ ...w, [d]: (w[d] || 0) + 1 }))
            : null,
        ]);
      },
      [b.resetField, t, E]
    ),
    Q = {
      watch: k.watch,
      initialized: b.initialized.current,
      values: t === 'uncontrolled' ? b.refValues.current : b.stateValues,
      getValues: b.getValues,
      getInitialValues: b.getValuesSnapshot,
      setInitialValues: b.setValuesSnapshot,
      resetField: ot,
      initialize: Ye,
      setValues: Je,
      setFieldValue: be,
      submitting: T,
      setSubmitting: $,
      errors: g.errorsState,
      setErrors: g.setErrors,
      setFieldError: g.setFieldError,
      clearFieldError: g.clearFieldError,
      clearErrors: g.clearErrors,
      resetDirty: p.resetDirty,
      setTouched: p.setTouched,
      setDirty: p.setDirty,
      isTouched: p.isTouched,
      resetTouched: p.resetTouched,
      isDirty: p.isDirty,
      getTouched: p.getTouched,
      getDirty: p.getDirty,
      reorderListItem: F.reorderListItem,
      insertListItem: F.insertListItem,
      removeListItem: F.removeListItem,
      replaceListItem: F.replaceListItem,
      reset: ge,
      validate: he,
      validateField: Xe,
      getInputProps: Ze,
      onSubmit: Qe,
      onReset: tt,
      isValid: rt,
      getTransformedValues: et,
      key: st,
      getInputNode: nt,
    };
  return (Mt(e, Q), Q);
}
const or = () => {
    const [e, t] = u.useState(!1),
      r = rr({
        initialValues: { name: '', email: '', subject: '', message: '' },
        validate: {
          name: (s) => s.trim().length < 2,
          email: (s) => !/^\S+@\S+$/.test(s),
          subject: (s) => s.trim().length === 0,
        },
      }),
      n = (s) => {
        const o = 'service_5zblm38',
          i = 'template_itsqp9u',
          a = 'a6IxywqmqlHjFDfxD';
        (t(!0),
          At.send(o, i, s, a)
            .then(() => {
              (pe.show({
                title: 'Success',
                message: 'Message sent successfully!',
                color: 'green',
              }),
                r.reset());
            })
            .catch((l) => {
              pe.show({
                title: 'Error',
                message: `Failed to send the message, please try again. ${l.message}`,
                color: 'red',
              });
            })
            .finally(() => {
              t(!1);
            }));
      };
    return m.jsx(X, {
      className: ne.pageBackgroundAlt,
      style: { paddingBottom: '40px' },
      children: m.jsxs(ft, {
        size: 'md',
        py: 'xl',
        children: [
          m.jsx(ee, { order: 1, mb: 'md', ta: 'center', children: 'About Us' }),
          m.jsxs(Z, {
            size: 'lg',
            mb: 'xl',
            children: [
              'At ',
              m.jsx('strong', { children: 'IsraJobs' }),
              ", we connect motivated professionals in Israel with companies seeking great talent. Whether you're hiring or job-hunting, our goal is to make the process faster, fairer, and more effective.",
            ],
          }),
          m.jsxs(B, {
            gutter: 'xl',
            mb: 'xl',
            children: [
              m.jsx(B.Col, {
                span: { base: 12, md: 6 },
                children: m.jsx(mt, {
                  radius: 'md',
                  src: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  alt: 'People collaborating',
                }),
              }),
              m.jsx(B.Col, {
                span: { base: 12, md: 6 },
                children: m.jsxs(_e, {
                  shadow: 'md',
                  p: 'md',
                  radius: 'md',
                  className: ne.cardGradientSubtle,
                  children: [
                    m.jsx(ee, { order: 4, children: 'Our Mission' }),
                    m.jsx(Z, {
                      mt: 'sm',
                      children:
                        "We're building the go-to platform for job seekers and employers to connect with purpose. From transparent listings to smart matching tools, we're reshaping the future of work.",
                    }),
                  ],
                }),
              }),
            ],
          }),
          m.jsxs(oe, {
            grow: !0,
            children: [
              m.jsx(se, {
                icon: m.jsx(ht, { size: 24 }),
                label: 'Jobs Posted',
                value: '12.5m+',
              }),
              m.jsx(se, {
                icon: m.jsx(yt, { size: 24 }),
                label: 'Employers',
                value: '3.2b+',
              }),
              m.jsx(se, {
                icon: m.jsx(xt, { size: 24 }),
                label: 'Countries Served',
                value: 'All',
              }),
            ],
          }),
          m.jsxs('form', {
            onSubmit: r.onSubmit(n),
            children: [
              '`',
              m.jsx(ee, {
                order: 2,
                size: 'h1',
                style: { fontFamily: 'Outfit, var(--mantine-font-family)' },
                fw: 700,
                ta: 'center',
                children: 'Get in touch',
              }),
              m.jsxs(pt, {
                cols: { base: 1, sm: 2 },
                mt: 'xl',
                children: [
                  m.jsx(te, {
                    label: 'Name',
                    placeholder: 'Your name',
                    name: 'name',
                    variant: 'filled',
                    ...r.getInputProps('name'),
                  }),
                  m.jsx(te, {
                    label: 'Email',
                    placeholder: 'Your email',
                    name: 'email',
                    variant: 'filled',
                    ...r.getInputProps('email'),
                  }),
                ],
              }),
              m.jsx(te, {
                label: 'Subject',
                placeholder: 'Subject',
                mt: 'md',
                name: 'subject',
                variant: 'filled',
                ...r.getInputProps('subject'),
              }),
              m.jsx(gt, {
                mt: 'md',
                label: 'Message',
                placeholder: 'Your message',
                maxRows: 10,
                minRows: 5,
                autosize: !0,
                name: 'message',
                variant: 'filled',
                ...r.getInputProps('message'),
              }),
              m.jsx(oe, {
                justify: 'center',
                mt: 'xl',
                children: m.jsx(bt, {
                  type: 'submit',
                  size: 'md',
                  loading: e,
                  children: 'Send message',
                }),
              }),
            ],
          }),
          '`',
        ],
      }),
    });
  },
  se = ({ icon: e, label: t, value: r }) =>
    m.jsx(_e, {
      shadow: 'xs',
      p: 'md',
      radius: 'md',
      withBorder: !0,
      className: ne.cardGradientOrange,
      children: m.jsxs(oe, {
        children: [
          m.jsx(jt, {
            variant: 'light',
            size: 'lg',
            radius: 'xl',
            color: 'rocketOrange',
            children: e,
          }),
          m.jsxs('div', {
            children: [
              m.jsx(Z, { size: 'lg', fw: 500, children: r }),
              m.jsx(Z, { size: 'sm', c: 'dimmed', children: t }),
            ],
          }),
        ],
      }),
    });
export { or as default };
