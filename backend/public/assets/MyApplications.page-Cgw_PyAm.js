import {
  r as o,
  i as T,
  j as e,
  M as B,
  S as y,
  d as g,
  x as C,
  o as P,
  B as E,
  n as $,
  a as z,
  q as b,
  y as J,
  h,
  s as V,
  T as a,
  e as v,
  G,
  z as N,
  D as _,
  E as f,
  g as D,
  u as U,
  t as O,
  C as H,
  L as K,
  F as Q,
  f as W,
} from './index-Dbp1fGsr.js';
const X = ({ opened: l, onClose: c, application: s, onSuccess: r }) => {
    const [d, x] = o.useState(!1),
      {
        reset: u,
        register: m,
        handleSubmit: A,
        formState: { errors: i, isValid: S },
      } = T({
        mode: 'all',
        resolver: $(J),
        shouldUnregister: !1,
        criteriaMode: 'all',
      }),
      [R, w] = o.useState(null);
    o.useEffect(() => {
      s &&
        l &&
        u({
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email,
          phone: s.phone || '',
          resumeUrl: s.resumeUrl,
          message: s.message || '',
        });
    }, [s, l, u]);
    const k = async (L) => {
      if (s)
        try {
          x(!0);
          const p = 'http://localhost:8181',
            I =
              localStorage.getItem('token') || sessionStorage.getItem('token');
          (await z.put(`${p}/api/applications/${s._id}`, L, {
            headers: { 'x-auth-token': I },
          }),
            b.show({
              title: 'Success',
              message: 'Application updated successfully',
              color: 'green',
            }),
            c(),
            r && r());
        } catch (p) {
          (console.error(p),
            b.show({
              title: 'Error',
              message:
                p.response?.data?.message || 'Failed to update application',
              color: 'red',
            }));
        } finally {
          x(!1);
        }
    };
    return s
      ? e.jsx(B, {
          opened: l,
          onClose: c,
          title: 'Edit Application',
          size: 'lg',
          zIndex: 1e3,
          children: e.jsx('form', {
            onSubmit: A(k),
            children: e.jsxs(y, {
              p: 'lg',
              children: [
                e.jsx(g, {
                  label: 'First Name',
                  required: !0,
                  ...m('firstName'),
                  error: i.firstName?.message,
                }),
                e.jsx(g, {
                  label: 'Last Name',
                  required: !0,
                  ...m('lastName'),
                  error: i.lastName?.message,
                }),
                e.jsx(g, {
                  label: 'Email',
                  required: !0,
                  ...m('email'),
                  error: i.email?.message,
                }),
                e.jsx(g, {
                  label: 'Phone',
                  ...m('phone'),
                  error: i.phone?.message,
                }),
                e.jsx(C, {
                  label: 'Resume/CV',
                  accept: 'application/pdf',
                  required: !0,
                  onChange: w,
                  error: i.resumeUrl?.message,
                }),
                e.jsx(P, {
                  label: 'Message',
                  ...m('message'),
                  error: i.message?.message,
                }),
                e.jsx(E, {
                  type: 'submit',
                  mx: 'auto',
                  w: 200,
                  disabled: !S,
                  loading: d,
                  children: 'Update Application',
                }),
              ],
            }),
          }),
        })
      : null;
  },
  Y = ({ opened: l, onClose: c, listing: s }) =>
    e.jsx(B, {
      opened: l,
      onClose: c,
      title: 'Listing Details',
      size: 'lg',
      centered: !0,
      zIndex: 1e3,
      children:
        s &&
        e.jsxs(y, {
          gap: 'md',
          h: '100%',
          children: [
            e.jsxs(h, {
              p: 'md',
              className: V.cardGradientSubtle,
              style: {
                borderRadius: '8px',
                marginTop: '-16px',
                marginLeft: '-16px',
                marginRight: '-16px',
              },
              children: [
                e.jsx(a, {
                  fw: 700,
                  size: 'lg',
                  c: 'dimmed',
                  mb: 5,
                  children: s.companyName,
                }),
                e.jsx(v, { order: 2, mb: 'xs', children: s.jobTitle }),
                e.jsxs(G, {
                  gap: 'xs',
                  children: [
                    e.jsx(N, {
                      variant: 'filled',
                      color: 'rocketOrange',
                      children: s.workArrangement,
                    }),
                    e.jsx(N, {
                      variant: 'filled',
                      color: 'rocketRed',
                      children: s.industry,
                    }),
                  ],
                }),
              ],
            }),
            e.jsx(_, {}),
            s.location &&
              e.jsxs(h, {
                children: [
                  e.jsx(a, {
                    fw: 600,
                    size: 'sm',
                    mb: 5,
                    children: 'Location',
                  }),
                  e.jsxs(a, {
                    size: 'sm',
                    children: [s.location.city, ', ', s.location.region],
                  }),
                ],
              }),
            e.jsxs(h, {
              children: [
                e.jsx(a, {
                  fw: 600,
                  size: 'sm',
                  mb: 5,
                  children: 'Job Description',
                }),
                e.jsx(a, {
                  size: 'sm',
                  style: { whiteSpace: 'pre-wrap' },
                  children: s.jobDescription,
                }),
              ],
            }),
            s.requirements &&
              s.requirements.length > 0 &&
              e.jsxs(h, {
                children: [
                  e.jsx(a, {
                    fw: 600,
                    size: 'sm',
                    mb: 5,
                    children: 'Requirements',
                  }),
                  e.jsx(f, {
                    size: 'sm',
                    spacing: 'xs',
                    children: s.requirements.map((r, d) =>
                      e.jsx(f.Item, { children: r }, d)
                    ),
                  }),
                ],
              }),
            s.advantages &&
              s.advantages.length > 0 &&
              e.jsxs(h, {
                children: [
                  e.jsx(a, {
                    fw: 600,
                    size: 'sm',
                    mb: 5,
                    children: 'Advantages',
                  }),
                  e.jsx(f, {
                    size: 'sm',
                    spacing: 'xs',
                    children: s.advantages.map((r, d) =>
                      e.jsx(f.Item, { children: r }, d)
                    ),
                  }),
                ],
              }),
            e.jsx(_, {}),
            s.apply &&
              e.jsxs(h, {
                children: [
                  e.jsx(a, {
                    fw: 600,
                    size: 'sm',
                    mb: 5,
                    children: 'How to Apply',
                  }),
                  e.jsxs(a, {
                    size: 'sm',
                    mb: 5,
                    children: [
                      'Apply via ',
                      s.apply.method === 'email' ? 'email' : 'external link',
                      ':',
                    ],
                  }),
                  s.apply.method === 'email'
                    ? e.jsx(D, {
                        href: `mailto:${s.apply.contact}`,
                        target: '_blank',
                        children: s.apply.contact,
                      })
                    : e.jsx(D, {
                        href: s.apply.contact,
                        target: '_blank',
                        children: s.apply.contact,
                      }),
                ],
              }),
            s.createdAt &&
              e.jsxs(a, {
                size: 'xs',
                c: 'dimmed',
                ta: 'center',
                children: [
                  'Posted on ',
                  new Date(s.createdAt).toLocaleDateString(),
                ],
              }),
          ],
        }),
    });
function ee() {
  const [l, c] = o.useState(!1),
    [s, r] = o.useState([]),
    [d, x] = o.useState(!1),
    [u, { open: m, close: A }] = U(!1),
    [i, S] = o.useState(null),
    [R, { open: w, close: k }] = U(!1),
    [L, p] = o.useState(null);
  o.useEffect(() => {
    (async () => {
      c(!0);
      try {
        const n =
            localStorage.getItem('token') || sessionStorage.getItem('token'),
          j = await z.get('/api/applications/my-applications', {
            headers: { 'x-auth-token': n },
          });
        j.data.length > 0 ? r(j.data) : x(!0);
      } catch (n) {
        b.show({
          title: 'Error',
          message: n.response?.data?.message || n.message,
          color: 'red',
        });
      } finally {
        setTimeout(() => {
          c(!1);
        }, 1e3);
      }
    })();
  }, []);
  const I = (t) => {
      (S(t), m());
    },
    F = (t) => {
      (p(t), w());
    },
    q = () => {
      (async () => {
        try {
          const n =
              localStorage.getItem('token') || sessionStorage.getItem('token'),
            j = await z.get('/api/applications/my-applications', {
              headers: { 'x-auth-token': n },
            });
          r(j.data);
        } catch {
          b.show({
            title: 'Error',
            message: 'Failed to refresh applications',
            color: 'red',
          });
        }
      })();
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(O, {
        title: 'Job Applications | JobRocket',
        description: 'Manage your job applications on JobRocket',
        keywords: 'job applications, manage job applications, job listings',
      }),
      l
        ? e.jsx(H, {
            py: 50,
            h: 'calc(100vh - 200px)',
            children: e.jsx(K, { size: 'xl', variant: 'oval' }),
          })
        : e.jsxs(y, {
            w: '100%',
            gap: 'md',
            children: [
              e.jsx(v, {
                ta: 'center',
                order: 2,
                my: 15,
                c: 'rocketRed.9',
                children: 'Applications',
              }),
              d ? e.jsx(a, { children: 'No applications found' }) : null,
              e.jsx(Q, {
                w: '100%',
                gap: 'md',
                wrap: 'wrap',
                align: 'stretch',
                justify: 'center',
                children: s.map((t, n) =>
                  e.jsx(
                    W,
                    {
                      withBorder: !0,
                      p: 'md',
                      w: '250px',
                      style: { display: 'flex' },
                      children: e.jsxs(y, {
                        h: '100%',
                        w: '100%',
                        justify: 'space-between',
                        style: { flex: 1 },
                        children: [
                          typeof t.listingId == 'object' &&
                            e.jsx(v, {
                              order: 5,
                              children: t.listingId.companyName,
                            }),
                          typeof t.listingId == 'object' &&
                            e.jsx(a, { children: t.listingId.jobTitle }),
                          e.jsx(N, {
                            variant: 'outline',
                            c:
                              t.status === 'rejected'
                                ? 'red'
                                : t.status === 'pending'
                                  ? 'yellow'
                                  : 'green',
                            children: t.status,
                          }),
                          e.jsxs(a, {
                            fz: 'sm',
                            c: 'dimmed',
                            children: [
                              'Submitted on ',
                              new Date(t.createdAt).toLocaleDateString(),
                            ],
                          }),
                          e.jsx(E, {
                            variant: 'outline',
                            onClick: () => I(t.listingId),
                            children: 'View Listing',
                          }),
                          e.jsx(E, {
                            variant: 'outline',
                            onClick: () => F(t),
                            disabled: t.status !== 'pending',
                            children: 'Edit Application',
                          }),
                        ],
                      }),
                    },
                    n
                  )
                ),
              }),
            ],
          }),
      e.jsx(Y, { opened: u, onClose: A, listing: i }),
      e.jsx(X, { opened: R, onClose: k, application: L, onSuccess: q }),
    ],
  });
}
export { ee as MyApplications };
