import {
  c as G,
  a as q,
  r as h,
  j as e,
  M as ie,
  T as c,
  G as k,
  B as Q,
  u as ae,
  S as L,
  b as p,
  d as D,
  C as xe,
  e as ne,
  f as ge,
  A as $,
  g as ce,
  h as me,
  i as Le,
  n as ze,
  k as Ce,
  l as Ie,
  F as De,
  m as Y,
  o as te,
  p as B,
  R as Fe,
  W as Re,
  I as le,
  q as M,
  P as X,
  s as de,
  t as _e,
  L as Ee,
  v as Ne,
  w as Z,
} from './index-Dbp1fGsr.js';
import { I as se, T as a, a as he } from './IconTrash-ZB7--s3y.js';
import { c as Me } from './getCleanedListingData-Cbsw5E8V.js';
import { S as Be, l as Pe } from './listing.joi-DU1Wk9ll.js';
import { S as Oe, T as K, I as $e, a as qe } from './IconUsers-CmfNSx0J.js';
const We = [
    ['path', { d: 'M7 12l5 5l10 -10', key: 'svg-0' }],
    ['path', { d: 'M2 12l5 5m5 -5l5 -5', key: 'svg-1' }],
  ],
  Ue = G('outline', 'checks', 'Checks', We);
const Ze = [
    ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', key: 'svg-0' }],
    ['path', { d: 'M12 7v5l3 3', key: 'svg-1' }],
  ],
  Ge = G('outline', 'clock', 'Clock', Ze);
const Je = [
    [
      'path',
      {
        d: 'M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2',
        key: 'svg-0',
      },
    ],
    ['path', { d: 'M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', key: 'svg-1' }],
    ['path', { d: 'M14 4l0 4l-6 0l0 -4', key: 'svg-2' }],
  ],
  He = G('outline', 'device-floppy', 'DeviceFloppy', Je);
const Ve = [
    ['path', { d: 'M14 3v4a1 1 0 0 0 1 1h4', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z',
        key: 'svg-1',
      },
    ],
    ['path', { d: 'M12 17v-6', key: 'svg-2' }],
    ['path', { d: 'M9.5 14.5l2.5 2.5l2.5 -2.5', key: 'svg-3' }],
  ],
  ue = G('outline', 'file-download', 'FileDownload', Ve);
const Xe = [
    ['path', { d: 'M18 6l-12 12', key: 'svg-0' }],
    ['path', { d: 'M6 6l12 12', key: 'svg-1' }],
  ],
  Ke = G('outline', 'x', 'X', Xe);
const Qe = [
    [
      'path',
      {
        d: 'M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z',
        key: 'svg-0',
      },
    ],
  ],
  ee = G('filled', 'circle-filled', 'CircleFilled', Qe),
  J = '',
  je = async () => {
    const i = localStorage.getItem('token') || sessionStorage.getItem('token');
    return (
      await q.get(`${J}/api/applications/business/dashboard/metrics`, {
        headers: { 'x-auth-token': i },
      })
    ).data;
  },
  Ye = async (i) => {
    const r = localStorage.getItem('token') || sessionStorage.getItem('token'),
      u = new URLSearchParams(
        Object.entries(i)
          .filter(([d, o]) => o !== void 0 && o !== 'All')
          .map(([d, o]) => [d, String(o)])
      ).toString();
    return (
      await q.get(`${J}/api/listings/business-listings?${u}`, {
        headers: { 'x-auth-token': r },
      })
    ).data;
  },
  es = async (i) => {
    const r = localStorage.getItem('token') || sessionStorage.getItem('token'),
      u = new URLSearchParams(
        Object.entries(i)
          .filter(([d, o]) => o !== void 0 && o !== 'All' && o !== 'all')
          .map(([d, o]) => [d, String(o)])
      ).toString();
    return (
      await q.get(`${J}/api/applications/business-applications?${u}`, {
        headers: { 'x-auth-token': r },
      })
    ).data;
  },
  ss = async (i, r) => {
    const u = localStorage.getItem('token') || sessionStorage.getItem('token');
    return (
      await q.patch(
        `${J}/api/applications/status/${i}`,
        { status: r },
        { headers: { 'x-auth-token': u } }
      )
    ).data;
  },
  ts = async (i) => {
    const r = localStorage.getItem('token') || sessionStorage.getItem('token');
    return (
      await q.delete(`${J}/api/listings/${i}`, {
        headers: { 'x-auth-token': r },
      })
    ).data;
  },
  as = async (i) => {
    const r = localStorage.getItem('token') || sessionStorage.getItem('token');
    return (
      await q.delete(`${J}/api/applications/${i}`, {
        headers: { 'x-auth-token': r },
      })
    ).data;
  },
  ls = ({
    opened: i,
    onClose: r,
    handleDelete: u,
    applicationId: x,
    applicationTitle: d,
  }) => {
    const [o, m] = h.useState(!1);
    return e.jsxs(ie, {
      opened: i,
      onClose: r,
      title: 'Delete application',
      centered: !0,
      children: [
        e.jsxs(c, {
          children: [
            'Are you sure you want to delete the',
            e.jsxs('span', {
              style: { fontWeight: 'bold' },
              children: [' ', d, ' '],
            }),
            'application?',
          ],
        }),
        e.jsxs(k, {
          mt: 20,
          justify: 'flex-end',
          gap: 'sm',
          children: [
            e.jsx(Q, { variant: 'outline', onClick: r, children: 'Cancel' }),
            e.jsx(Q, {
              color: 'red',
              onClick: () => {
                (r(), u(x));
              },
              loading: o,
              children: 'Delete',
            }),
          ],
        }),
      ],
    });
  },
  is = ({
    dashApplications: i,
    searchText: r,
    setSearchText: u,
    status: x,
    setStatus: d,
    listingId: o,
    setListingId: m,
    dateFrom: w,
    setDateFrom: v,
    dateTo: z,
    setDateTo: g,
    sortOption: F,
    setSortOption: y,
    page: b,
    setPage: A,
    onStatusChange: N,
    listingOptions: S,
    updateApplicationStatus: n,
    newStatus: l,
    setNewStatus: j,
    handleApplicationDelete: C,
  }) => {
    const [R, { open: _, close: W }] = ae(!1),
      [P, t] = h.useState(null),
      U = (s, O) => {
        (t({ id: s, title: O }), _());
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs(L, {
          children: [
            e.jsxs(L, {
              gap: 'md',
              hiddenFrom: 'md',
              children: [
                e.jsx(p, {
                  label: 'Listing',
                  value: o,
                  onChange: (s) => m(s),
                  data: S,
                }),
                e.jsx(D, {
                  type: 'date',
                  label: 'From',
                  value: w || '',
                  onChange: (s) => v(s.target.value),
                }),
                e.jsx(D, {
                  type: 'date',
                  label: 'To',
                  value: z || '',
                  onChange: (s) => g(s.target.value),
                }),
                e.jsx(p, {
                  label: 'Status',
                  value: x,
                  onChange: (s) => d(s),
                  data: [
                    { value: 'all', label: 'All Statuses' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'reviewed', label: 'Reviewed' },
                    { value: 'rejected', label: 'Rejected' },
                  ],
                }),
                e.jsx(D, {
                  label: 'Search',
                  value: r,
                  onChange: (s) => u(s.target.value),
                  placeholder: 'Search applications...',
                }),
                e.jsx(p, {
                  label: 'Sort',
                  value: F,
                  onChange: (s) => y(s),
                  data: [
                    { value: 'date-newest', label: 'Newest First' },
                    { value: 'date-oldest', label: 'Oldest First' },
                    { value: 'name-asc', label: 'Name (A-Z)' },
                    { value: 'name-desc', label: 'Name (Z-A)' },
                  ],
                }),
              ],
            }),
            e.jsxs(k, {
              justify: 'center',
              align: 'center',
              visibleFrom: 'md',
              children: [
                e.jsx(p, {
                  label: 'Listing',
                  w: '15%',
                  value: o,
                  onChange: (s) => m(s),
                  data: S,
                }),
                e.jsx(D, {
                  type: 'date',
                  label: 'From',
                  value: w || '',
                  onChange: (s) => v(s.target.value),
                  w: '15%',
                }),
                e.jsx(D, {
                  type: 'date',
                  label: 'To',
                  value: z || '',
                  onChange: (s) => g(s.target.value),
                  w: '15%',
                }),
                e.jsx(p, {
                  label: 'Status',
                  w: '15%',
                  value: x,
                  onChange: (s) => d(s),
                  data: [
                    { value: 'all', label: 'All Statuses' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'reviewed', label: 'Reviewed' },
                    { value: 'rejected', label: 'Rejected' },
                  ],
                }),
                e.jsx(D, {
                  label: 'Search',
                  w: '15%',
                  value: r,
                  onChange: (s) => u(s.target.value),
                  placeholder: 'Search applications...',
                }),
                e.jsx(p, {
                  label: 'Sort',
                  w: '15%',
                  value: F,
                  onChange: (s) => y(s),
                  data: [
                    { value: 'date-newest', label: 'Newest First' },
                    { value: 'date-oldest', label: 'Oldest First' },
                    { value: 'name-asc', label: 'Name (A-Z)' },
                    { value: 'name-desc', label: 'Name (Z-A)' },
                  ],
                }),
              ],
            }),
            i?.length === 0
              ? e.jsx(xe, {
                  mt: 50,
                  children: e.jsx(ne, {
                    order: 3,
                    c: 'red',
                    children: 'No Applications Found',
                  }),
                })
              : e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(L, {
                      hiddenFrom: 'md',
                      gap: 'md',
                      children: i?.map((s) =>
                        e.jsx(
                          ge,
                          {
                            withBorder: !0,
                            p: 'md',
                            children: e.jsxs(L, {
                              gap: 'xs',
                              children: [
                                e.jsxs(k, {
                                  justify: 'space-between',
                                  children: [
                                    e.jsxs(c, {
                                      fw: 600,
                                      size: 'lg',
                                      children: [s.firstName, ' ', s.lastName],
                                    }),
                                    e.jsx($, {
                                      size: 36,
                                      variant: 'outline',
                                      color: 'red',
                                      onClick: () => {
                                        U(
                                          s._id,
                                          `${typeof s.listingId == 'object' && s.listingId.jobTitle}`
                                        );
                                      },
                                      children: e.jsx(se, { size: 20 }),
                                    }),
                                  ],
                                }),
                                e.jsx(c, {
                                  size: 'sm',
                                  c: 'dimmed',
                                  children:
                                    typeof s.listingId == 'object' &&
                                    s.listingId.jobTitle,
                                }),
                                e.jsx(c, { size: 'sm', children: s.email }),
                                s.phone &&
                                  e.jsx(c, { size: 'sm', children: s.phone }),
                                e.jsxs(c, {
                                  size: 'xs',
                                  c: 'dimmed',
                                  children: [
                                    'Submitted: ',
                                    s.createdAt &&
                                      new Date(s.createdAt).toLocaleString(),
                                  ],
                                }),
                                e.jsxs(k, {
                                  gap: 'xs',
                                  mt: 'xs',
                                  children: [
                                    e.jsx(ce, {
                                      href: s.resumeUrl,
                                      target: '_blank',
                                      children: e.jsx($, {
                                        variant: 'light',
                                        size: 36,
                                        children: e.jsx(ue, { size: 20 }),
                                      }),
                                    }),
                                    e.jsx(p, {
                                      flex: 1,
                                      value: l || s.status,
                                      onChange: (O) => n(s._id, O),
                                      data: [
                                        { value: 'pending', label: 'Pending' },
                                        {
                                          value: 'reviewed',
                                          label: 'Reviewed',
                                        },
                                        {
                                          value: 'rejected',
                                          label: 'Rejected',
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          s._id
                        )
                      ),
                    }),
                    e.jsx(me, {
                      visibleFrom: 'md',
                      children: e.jsx(a.ScrollContainer, {
                        minWidth: 900,
                        children: e.jsxs(a, {
                          verticalSpacing: 'sm',
                          maw: '100%',
                          mx: 'auto',
                          children: [
                            e.jsx(a.Thead, {
                              children: e.jsxs(a.Tr, {
                                children: [
                                  e.jsx(a.Th, {}),
                                  e.jsx(a.Th, { children: 'Applicant' }),
                                  e.jsx(a.Th, { children: 'Listing' }),
                                  e.jsx(a.Th, { children: 'Phone' }),
                                  e.jsx(a.Th, { children: 'Email' }),
                                  e.jsx(a.Th, { children: 'Submitted' }),
                                  e.jsx(a.Th, { children: 'Resume' }),
                                  e.jsx(a.Th, { children: 'Status' }),
                                  e.jsx(a.Th, { children: 'Actions' }),
                                ],
                              }),
                            }),
                            e.jsx(a.Tbody, {
                              children: i?.map((s) =>
                                e.jsxs(
                                  a.Tr,
                                  {
                                    children: [
                                      e.jsx(a.Td, {
                                        styles: {
                                          td: {
                                            borderLeft: '1px solid #eee',
                                            borderRight: '1px solid #eee',
                                          },
                                        },
                                        children: e.jsx(c, {
                                          fz: 'sm',
                                          fw: 'bold',
                                          c: 'dimmed',
                                          ta: 'center',
                                          children: i.indexOf(s) + 1,
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsxs(c, {
                                          fz: 'sm',
                                          fw: 500,
                                          children: [
                                            s.firstName,
                                            ' ',
                                            s.lastName,
                                          ],
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsx(c, {
                                          fz: 'sm',
                                          fw: 500,
                                          children:
                                            typeof s.listingId == 'object' &&
                                            s.listingId.jobTitle,
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsx(c, {
                                          fz: 'sm',
                                          fw: 500,
                                          children: s.phone,
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsx(c, {
                                          fz: 'sm',
                                          children: s.email,
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children:
                                          s.createdAt &&
                                          new Date(
                                            s.createdAt
                                          ).toLocaleString(),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsx(ce, {
                                          href: s.resumeUrl,
                                          target: '_blank',
                                          children: e.jsx(ue, { size: 30 }),
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        children: e.jsx(p, {
                                          px: 5,
                                          value: l || s.status,
                                          onChange: (O) => n(s._id, O),
                                          data: [
                                            {
                                              value: 'pending',
                                              label: 'Pending',
                                            },
                                            {
                                              value: 'reviewed',
                                              label: 'Reviewed',
                                            },
                                            {
                                              value: 'rejected',
                                              label: 'Rejected',
                                            },
                                          ],
                                        }),
                                      }),
                                      e.jsx(a.Td, {
                                        styles: {
                                          td: { borderRight: '1px solid #eee' },
                                        },
                                        children: e.jsx(k, {
                                          gap: 'xs',
                                          children: e.jsx($, {
                                            size: 30,
                                            variant: 'outline',
                                            color: 'red',
                                            onClick: () => {
                                              U(
                                                s._id,
                                                `${typeof s.listingId == 'object' && s.listingId.jobTitle}`
                                              );
                                            },
                                            children: e.jsx(se, {
                                              size: 25,
                                              stroke: 1.5,
                                            }),
                                          }),
                                        }),
                                      }),
                                    ],
                                  },
                                  s._id
                                )
                              ),
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
          ],
        }),
        e.jsx(ls, {
          opened: R,
          onClose: W,
          applicationId: P?.id || '',
          applicationTitle: P?.title || '',
          handleDelete: C,
        }),
      ],
    });
  },
  ns = ({
    opened: i,
    onClose: r,
    handleDelete: u,
    listingId: x,
    listingTitle: d,
  }) => {
    const [o, m] = h.useState(!1);
    return e.jsxs(ie, {
      opened: i,
      onClose: r,
      title: 'Delete Listing',
      centered: !0,
      children: [
        e.jsxs(c, {
          children: [
            'Are you sure you want to delete the',
            e.jsxs('span', {
              style: { fontWeight: 'bold' },
              children: [' ', d, ' '],
            }),
            'listing?',
          ],
        }),
        e.jsxs(k, {
          mt: 20,
          justify: 'flex-end',
          gap: 'sm',
          children: [
            e.jsx(Q, { variant: 'outline', onClick: r, children: 'Cancel' }),
            e.jsx(Q, {
              color: 'red',
              onClick: () => {
                (r(), u(x));
              },
              loading: o,
              children: 'Delete',
            }),
          ],
        }),
      ],
    });
  },
  rs = ({ opened: i, onClose: r, listing: u, setListings: x }) => {
    const d = 'http://localhost:8181',
      [o, m] = h.useState(!1),
      {
        register: w,
        handleSubmit: v,
        reset: z,
        formState: { errors: g, isValid: F, isDirty: y },
        control: b,
      } = Le({ mode: 'all', resolver: ze(Pe) });
    h.useEffect(() => {
      if (i && u) {
        const n = Me(u);
        z(n);
      }
    }, [i]);
    const A = Ce({ control: b, name: 'location.region' }),
      N = h.useMemo(
        () => (A ? Ie(A).map((n) => ({ value: n, label: n })) : []),
        [A]
      ),
      S = async (n) => {
        try {
          m(!0);
          const l =
              localStorage.getItem('token') || sessionStorage.getItem('token'),
            j = await q.put(
              `${d}/api/listings/${u?._id}`,
              {
                ...n,
                expiresAt: n.expiresAt
                  ? new Date(n.expiresAt).toISOString()
                  : null,
              },
              { headers: { 'x-auth-token': l } }
            );
          (x((C) => C.map((R) => (R._id === j.data._id ? j.data : R))),
            M.show({
              title: 'Success',
              message: 'Listing updated successfully!',
              color: 'green',
            }),
            r());
        } catch (l) {
          M.show({
            title: 'Error',
            message: `Update failed! ${l?.response?.data?.message || l.message}`,
            color: 'red',
          });
        } finally {
          m(!1);
        }
      };
    return e.jsx(ie, {
      opened: i,
      onClose: r,
      title: 'Delete application',
      centered: !0,
      size: 'xl',
      zIndex: 100,
      children: e.jsxs(L, {
        gap: 'md',
        p: 'md',
        children: [
          e.jsx(De, {
            justify: 'space-between',
            align: 'center',
            children: e.jsx(ne, { order: 2, children: 'Edit Listing' }),
          }),
          e.jsx('form', {
            onSubmit: v(S),
            children: e.jsxs(L, {
              gap: 'md',
              children: [
                e.jsx(Y, {
                  legend: 'Job Info',
                  children: e.jsxs(L, {
                    gap: 'sm',
                    children: [
                      e.jsx(D, {
                        label: 'Company Name',
                        required: !0,
                        ...w('companyName'),
                        error: g.companyName?.message,
                      }),
                      e.jsx(D, {
                        label: 'Job Title',
                        required: !0,
                        ...w('jobTitle'),
                        error: g.jobTitle?.message,
                      }),
                      e.jsx(te, {
                        label: 'Job Description',
                        required: !0,
                        minRows: 4,
                        ...w('jobDescription'),
                        error: g.jobDescription?.message,
                      }),
                      e.jsx(B, {
                        name: 'requirements',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(te, {
                            label: 'Requirements',
                            placeholder: 'Add one requirement per line',
                            minRows: 3,
                            value: (n.value || []).join(`
`),
                            onChange: (l) => {
                              const j = l.currentTarget.value
                                .split(
                                  `
`
                                )
                                .map((C) => C.trim())
                                .filter(Boolean);
                              n.onChange(j);
                            },
                            error: g.requirements?.message,
                          }),
                      }),
                      e.jsx(B, {
                        name: 'advantages',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(te, {
                            label: 'Nice to Have',
                            placeholder: 'Add one advantage per line',
                            minRows: 3,
                            value: (n.value || []).join(`
`),
                            onChange: (l) => {
                              const j = l.currentTarget.value
                                .split(
                                  `
`
                                )
                                .map((C) => C.trim())
                                .filter(Boolean);
                              n.onChange(j);
                            },
                            error: g.advantages?.message,
                          }),
                      }),
                    ],
                  }),
                }),
                e.jsx(Y, {
                  legend: 'Application',
                  children: e.jsxs(L, {
                    gap: 'sm',
                    children: [
                      e.jsx(B, {
                        name: 'apply.method',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(p, {
                            label: 'Application Method',
                            required: !0,
                            data: [
                              { value: 'email', label: 'Email' },
                              { value: 'link', label: 'External Link' },
                            ],
                            ...n,
                            error: g.apply?.method?.message,
                          }),
                      }),
                      e.jsx(D, {
                        label: 'Application Contact / URL',
                        required: !0,
                        ...w('apply.contact'),
                        error: g.apply?.contact?.message,
                      }),
                    ],
                  }),
                }),
                e.jsx(Y, {
                  legend: 'Location',
                  children: e.jsxs(L, {
                    gap: 'sm',
                    children: [
                      e.jsx(B, {
                        name: 'location.region',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(p, {
                            label: 'Region',
                            required: !0,
                            searchable: !0,
                            data: Fe.map((l) => ({ value: l, label: l })),
                            ...n,
                            error: g.location?.region?.message,
                          }),
                      }),
                      e.jsx(B, {
                        name: 'location.city',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(p, {
                            label: 'City',
                            required: !0,
                            searchable: !0,
                            disabled: !A,
                            data: N,
                            ...n,
                            error: g.location?.city?.message,
                          }),
                      }),
                    ],
                  }),
                }),
                e.jsx(Y, {
                  legend: 'Job Details',
                  children: e.jsxs(L, {
                    gap: 'sm',
                    children: [
                      e.jsx(B, {
                        name: 'workArrangement',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(p, {
                            label: 'Work Arrangement',
                            required: !0,
                            searchable: !0,
                            data: Re.map((l) => ({ value: l, label: l })),
                            ...n,
                            error: g.workArrangement?.message,
                          }),
                      }),
                      e.jsx(B, {
                        name: 'industry',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(p, {
                            label: 'Industry',
                            required: !0,
                            searchable: !0,
                            data: le.map((l) => ({ value: l, label: l })),
                            ...n,
                            error: g.industry?.message,
                          }),
                      }),
                      e.jsx(B, {
                        name: 'isActive',
                        control: b,
                        render: ({ field: n }) =>
                          e.jsx(Be, {
                            label: 'Listing is active',
                            checked: n.value,
                            onChange: (l) =>
                              n.onChange(l.currentTarget.checked),
                          }),
                      }),
                      e.jsx(D, {
                        label: 'Expiration Date',
                        type: 'date',
                        ...w('expiresAt'),
                        error: g.expiresAt?.message,
                      }),
                    ],
                  }),
                }),
                e.jsx(k, {
                  justify: 'space-between',
                  mt: 'md',
                  children: e.jsx(Q, {
                    type: 'submit',
                    variant: 'filled',
                    color: 'green',
                    leftSection: e.jsx(He, { size: 16 }),
                    disabled: !F || !y,
                    loading: o,
                    children: 'Save Changes',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    });
  },
  os = ({
    listings: i,
    handleDelete: r,
    searchText: u,
    setSearchText: x,
    industry: d,
    setIndustry: o,
    sortOption: m,
    setSortOption: w,
    activeFilter: v,
    setActiveFilter: z,
    page: g,
    setPage: F,
    setListings: y,
  }) => {
    const [b, { open: A, close: N }] = ae(!1),
      [S, n] = h.useState(null),
      [l, { open: j, close: C }] = ae(!1),
      [R, _] = h.useState(),
      W = (t, U) => {
        (n({ id: t, title: U }), A());
      },
      P = (t) => {
        (_(t), j());
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs(L, {
          children: [
            e.jsxs(L, {
              gap: 'md',
              hiddenFrom: 'md',
              children: [
                e.jsx(D, {
                  label: 'Search listings',
                  placeholder: 'Search listings',
                  value: u,
                  onChange: (t) => x(t.target.value),
                }),
                e.jsx(p, {
                  label: 'Sort by',
                  placeholder: 'Select sort option',
                  value: m,
                  onChange: (t) => {
                    w(t);
                  },
                  data: [
                    { value: 'all', label: 'All Listings' },
                    { value: 'date-created-new', label: 'Newest First' },
                    { value: 'date-created-old', label: 'Oldest First' },
                    { value: 'favorites-most', label: 'Most Favorited' },
                    { value: 'favorites-least', label: 'Least Favorited' },
                    { value: 'title-asc', label: 'Title A-Z' },
                    { value: 'title-desc', label: 'Title Z-A' },
                  ],
                }),
                e.jsx(p, {
                  label: 'Filter by status',
                  placeholder: 'Select active filter',
                  value: v,
                  onChange: (t) => {
                    z(t);
                  },
                  data: [
                    { value: 'all', label: 'All Listings' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ],
                }),
                e.jsx(p, {
                  label: 'Filter by industry',
                  placeholder: 'Select industry',
                  value: d,
                  onChange: (t) => {
                    o(t);
                  },
                  data: [{ value: 'all', label: 'All Industries' }, ...le],
                }),
              ],
            }),
            e.jsxs(k, {
              justify: 'center',
              visibleFrom: 'md',
              children: [
                e.jsx(D, {
                  label: 'Search listings',
                  placeholder: 'Search listings',
                  value: u,
                  onChange: (t) => x(t.target.value),
                }),
                e.jsx(p, {
                  label: 'Sort by',
                  placeholder: 'Select sort option',
                  value: m,
                  onChange: (t) => {
                    w(t);
                  },
                  data: [
                    { value: 'all', label: 'All Listings' },
                    { value: 'date-created-new', label: 'Newest First' },
                    { value: 'date-created-old', label: 'Oldest First' },
                    { value: 'favorites-most', label: 'Most Favorited' },
                    { value: 'favorites-least', label: 'Least Favorited' },
                    { value: 'title-asc', label: 'Title A-Z' },
                    { value: 'title-desc', label: 'Title Z-A' },
                  ],
                }),
                e.jsx(p, {
                  label: 'Filter by status',
                  placeholder: 'Select active filter',
                  value: v,
                  onChange: (t) => {
                    z(t);
                  },
                  data: [
                    { value: 'all', label: 'All Listings' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ],
                }),
                e.jsx(p, {
                  label: 'Filter by industry',
                  placeholder: 'Select industry',
                  value: d,
                  onChange: (t) => {
                    o(t);
                  },
                  data: [{ value: 'all', label: 'All Industries' }, ...le],
                }),
              ],
            }),
            e.jsx(L, {
              hiddenFrom: 'md',
              gap: 'md',
              children: i?.map((t) =>
                e.jsx(
                  ge,
                  {
                    withBorder: !0,
                    p: 'md',
                    children: e.jsxs(L, {
                      gap: 'xs',
                      children: [
                        e.jsxs(k, {
                          justify: 'space-between',
                          align: 'start',
                          children: [
                            e.jsxs('div', {
                              children: [
                                e.jsx(c, {
                                  fw: 600,
                                  size: 'lg',
                                  children: t.jobTitle,
                                }),
                                e.jsx(c, {
                                  size: 'sm',
                                  c: 'dimmed',
                                  children: t.industry,
                                }),
                              ],
                            }),
                            t.isActive
                              ? e.jsx(ee, { size: 20, color: 'green' })
                              : e.jsx(ee, { size: 20, color: 'red' }),
                          ],
                        }),
                        e.jsxs(k, {
                          gap: 'xs',
                          children: [
                            e.jsxs(c, {
                              size: 'xs',
                              c: 'dimmed',
                              children: [
                                'Created: ',
                                t.createdAt &&
                                  new Date(t.createdAt).toLocaleDateString(),
                              ],
                            }),
                            e.jsx(c, {
                              size: 'xs',
                              c: 'dimmed',
                              children: '•',
                            }),
                            e.jsxs(c, {
                              size: 'xs',
                              c: 'dimmed',
                              children: [t.likes?.length || 0, ' favorites'],
                            }),
                          ],
                        }),
                        t.expiresAt &&
                          e.jsxs(c, {
                            size: 'xs',
                            c: 'dimmed',
                            children: ['Expires: ', t.expiresAt],
                          }),
                        e.jsxs(k, {
                          gap: 'xs',
                          mt: 'xs',
                          children: [
                            e.jsx($, {
                              size: 36,
                              variant: 'outline',
                              color: 'yellow',
                              onClick: () => P(t),
                              children: e.jsx(he, { size: 20 }),
                            }),
                            e.jsx($, {
                              size: 36,
                              variant: 'outline',
                              color: 'red',
                              onClick: () => W(t._id, t.jobTitle),
                              children: e.jsx(se, { size: 20 }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  t._id
                )
              ),
            }),
            e.jsx(me, {
              visibleFrom: 'md',
              children: e.jsx(a.ScrollContainer, {
                minWidth: 800,
                children: e.jsxs(a, {
                  verticalSpacing: 'sm',
                  maw: '100%',
                  mx: 'auto',
                  children: [
                    e.jsx(a.Thead, {
                      children: e.jsxs(a.Tr, {
                        children: [
                          e.jsx(a.Th, {}),
                          e.jsx(a.Th, { children: 'Job Title' }),
                          e.jsx(a.Th, { children: 'Industry' }),
                          e.jsx(a.Th, { children: 'Created At' }),
                          e.jsx(a.Th, { children: 'Expires At' }),
                          e.jsx(a.Th, { children: 'Active' }),
                          e.jsx(a.Th, { children: 'Favorites' }),
                          e.jsx(a.Th, { children: 'Edit' }),
                          e.jsx(a.Th, { children: 'Delete' }),
                        ],
                      }),
                    }),
                    e.jsx(a.Tbody, {
                      children: i?.map((t) =>
                        e.jsxs(
                          a.Tr,
                          {
                            children: [
                              e.jsx(a.Td, {
                                styles: {
                                  td: {
                                    borderLeft: '1px solid #eee',
                                    borderRight: '1px solid #eee',
                                  },
                                },
                                children: e.jsx(c, {
                                  fz: 'sm',
                                  fw: 'bold',
                                  c: 'dimmed',
                                  ta: 'center',
                                  children: i.indexOf(t) + 1,
                                }),
                              }),
                              e.jsx(a.Td, {
                                children: e.jsx(c, {
                                  fz: 'sm',
                                  fw: 500,
                                  children: t.jobTitle,
                                }),
                              }),
                              e.jsx(a.Td, {
                                children: e.jsx(c, {
                                  fz: 'sm',
                                  fw: 500,
                                  children: t.industry,
                                }),
                              }),
                              e.jsx(a.Td, {
                                children:
                                  t.createdAt &&
                                  new Date(t.createdAt).toLocaleString(),
                              }),
                              e.jsx(a.Td, {
                                children: e.jsx(c, {
                                  fz: 'sm',
                                  children: t.expiresAt,
                                }),
                              }),
                              e.jsx(a.Td, {
                                children:
                                  t.isActive === !0
                                    ? e.jsx(ee, { size: 16, color: 'green' })
                                    : e.jsx(ee, { size: 16, color: 'red' }),
                              }),
                              e.jsx(a.Td, {
                                children: e.jsx(c, {
                                  fz: 'sm',
                                  children: t.likes?.length,
                                }),
                              }),
                              e.jsx(a.Td, {
                                children: e.jsx($, {
                                  size: 30,
                                  variant: 'outline',
                                  color: 'yellow',
                                  onClick: () => P(t),
                                  children: e.jsx(he, {
                                    size: 25,
                                    stroke: 1.5,
                                  }),
                                }),
                              }),
                              e.jsx(a.Td, {
                                styles: {
                                  td: { borderRight: '1px solid #eee' },
                                },
                                children: e.jsx($, {
                                  size: 30,
                                  variant: 'outline',
                                  color: 'red',
                                  onClick: () => W(t._id, t.jobTitle),
                                  children: e.jsx(se, {
                                    size: 25,
                                    stroke: 1.5,
                                  }),
                                }),
                              }),
                            ],
                          },
                          t._id
                        )
                      ),
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        e.jsx(rs, { opened: l, onClose: C, listing: R, setListings: y }),
        e.jsx(ns, {
          opened: b,
          onClose: N,
          listingId: S?.id || '',
          listingTitle: S?.title || '',
          handleDelete: r,
        }),
      ],
    });
  },
  cs = ({ dashboardMetrics: i }) =>
    e.jsx(Oe, {
      cols: { base: 1, xs: 2, sm: 3, md: 5 },
      spacing: 'md',
      children: e.jsxs(e.Fragment, {
        children: [
          e.jsxs(X, {
            shadow: 'sm',
            p: 'md',
            radius: 'md',
            withBorder: !0,
            className: de.cardGradientSubtle,
            children: [
              e.jsxs(k, {
                justify: 'space-between',
                mb: 'xs',
                children: [
                  e.jsx(c, {
                    size: 'xs',
                    c: 'dimmed',
                    fw: 700,
                    tt: 'uppercase',
                    children: 'Total Applications',
                  }),
                  e.jsx(K, {
                    color: 'rocketOrange',
                    variant: 'light',
                    size: 'lg',
                    radius: 'md',
                    children: e.jsx($e, { size: 20 }),
                  }),
                ],
              }),
              e.jsx(c, {
                size: 'xl',
                fw: 700,
                children: i?.metrics?.totalApplications || 0,
              }),
            ],
          }),
          e.jsxs(X, {
            shadow: 'sm',
            p: 'md',
            radius: 'md',
            withBorder: !0,
            className: de.cardGradientRed,
            children: [
              e.jsxs(k, {
                justify: 'space-between',
                mb: 'xs',
                children: [
                  e.jsx(c, {
                    size: 'xs',
                    c: 'dimmed',
                    fw: 700,
                    tt: 'uppercase',
                    children: 'Total Listings',
                  }),
                  e.jsx(K, {
                    color: 'rocketRed',
                    variant: 'light',
                    size: 'lg',
                    radius: 'md',
                    children: e.jsx(qe, { size: 20 }),
                  }),
                ],
              }),
              e.jsx(c, {
                size: 'xl',
                fw: 700,
                children: i?.metrics?.totalListings || 0,
              }),
            ],
          }),
          e.jsxs(X, {
            shadow: 'sm',
            p: 'md',
            radius: 'md',
            withBorder: !0,
            children: [
              e.jsxs(k, {
                justify: 'space-between',
                mb: 'xs',
                children: [
                  e.jsx(c, {
                    size: 'xs',
                    c: 'dimmed',
                    fw: 700,
                    tt: 'uppercase',
                    children: 'Pending',
                  }),
                  e.jsx(K, {
                    color: 'yellow',
                    variant: 'light',
                    size: 'lg',
                    radius: 'md',
                    children: e.jsx(Ge, { size: 20 }),
                  }),
                ],
              }),
              e.jsx(c, {
                size: 'xl',
                fw: 700,
                children: i?.metrics?.pendingApplications || 0,
              }),
            ],
          }),
          e.jsxs(X, {
            shadow: 'sm',
            p: 'md',
            radius: 'md',
            withBorder: !0,
            children: [
              e.jsxs(k, {
                justify: 'space-between',
                mb: 'xs',
                children: [
                  e.jsx(c, {
                    size: 'xs',
                    c: 'dimmed',
                    fw: 700,
                    tt: 'uppercase',
                    children: 'Reviewed',
                  }),
                  e.jsx(K, {
                    color: 'green',
                    variant: 'light',
                    size: 'lg',
                    radius: 'md',
                    children: e.jsx(Ue, { size: 20 }),
                  }),
                ],
              }),
              e.jsx(c, {
                size: 'xl',
                fw: 700,
                children: i?.metrics?.reviewedApplications || 0,
              }),
            ],
          }),
          e.jsxs(X, {
            shadow: 'sm',
            p: 'md',
            radius: 'md',
            withBorder: !0,
            children: [
              e.jsxs(k, {
                justify: 'space-between',
                mb: 'xs',
                children: [
                  e.jsx(c, {
                    size: 'xs',
                    c: 'dimmed',
                    fw: 700,
                    tt: 'uppercase',
                    children: 'Rejected',
                  }),
                  e.jsx(K, {
                    color: 'red',
                    variant: 'light',
                    size: 'lg',
                    radius: 'md',
                    children: e.jsx(Ke, { size: 20 }),
                  }),
                ],
              }),
              e.jsx(c, {
                size: 'xl',
                fw: 700,
                children: i?.metrics?.rejectedApplications || 0,
              }),
            ],
          }),
        ],
      }),
    }),
  ds = () => {
    const [i, r] = h.useState([]),
      [u, x] = h.useState(!1),
      [d, o] = h.useState(''),
      [m, w] = h.useState('all'),
      [v, z] = h.useState('all'),
      [g, F] = h.useState('date-created-new'),
      [y, b] = h.useState(1),
      A = async () => {
        x(!0);
        try {
          const l = await Ye({
            searchWord: d || void 0,
            industry: m,
            sortOption: g,
            page: y,
            limit: 20,
          });
          r(l.listings);
        } catch (l) {
          M.show({
            title: 'Error',
            message: l.response?.data?.message || 'Failed to load listings',
            color: 'red',
          });
        } finally {
          x(!1);
        }
      },
      N = (l) => i.filter((j) => j._id !== l);
    h.useEffect(() => {
      A();
    }, [d, g, m, y]);
    const S = i.filter((l) => {
      if (v === 'all') return !0;
      if (v === 'active') return l.isActive === !0;
      if (v === 'inactive') return l.isActive === !1;
    });
    return {
      listings: g?.startsWith('favorites')
        ? g === 'favorites-least'
          ? S.sort((l, j) => (l.likes?.length || 0) - (j.likes?.length || 0))
          : S.sort((l, j) => (j.likes?.length || 0) - (l.likes?.length || 0))
        : S,
      setListings: r,
      isLoading: u,
      searchText: d,
      industry: m,
      activeFilter: v,
      sortOption: g,
      page: y,
      setIndustry: w,
      setSearchText: o,
      setActiveFilter: z,
      setSortOption: F,
      setPage: b,
      refetchListings: A,
      removeListingById: N,
    };
  },
  hs = () => {
    const [i, r] = h.useState([]),
      [u, x] = h.useState(!1),
      [d, o] = h.useState(''),
      [m, w] = h.useState('all'),
      [v, z] = h.useState('all'),
      [g, F] = h.useState(''),
      [y, b] = h.useState(''),
      [A, N] = h.useState('date-newest'),
      [S, n] = h.useState(1),
      [l, j] = h.useState(null),
      C = (R) => i.filter((_) => _._id !== R);
    return (
      h.useEffect(() => {
        (async () => {
          x(!0);
          try {
            const _ = await es({
              searchText: d || void 0,
              status: m,
              listingId: v,
              dateFrom: g || void 0,
              dateTo: y || void 0,
              sortOption: A,
              page: S,
              limit: 20,
            });
            r(_.applications);
          } catch (_) {
            M.show({
              title: 'Error',
              message:
                _.response?.data?.message || 'Failed to load applications',
              color: 'red',
            });
          } finally {
            x(!1);
          }
        })();
      }, [d, m, v, g, y, A, S]),
      {
        applications: i,
        isLoading: u,
        searchText: d,
        status: m,
        listingId: v,
        dateFrom: g,
        dateTo: y,
        sortOption: A,
        page: S,
        setSearchText: o,
        setStatus: w,
        setListingId: z,
        setDateFrom: F,
        setDateTo: b,
        setSortOption: N,
        setPage: n,
        newStatus: l,
        setNewStatus: j,
        setApplications: r,
        removeApplicationById: C,
      }
    );
  },
  us = () => {
    const [i, r] = h.useState(!1),
      [u, x] = h.useState(),
      d = async () => {
        try {
          r(!0);
          const o = await je();
          x(o);
        } catch (o) {
          M.show({
            title: 'Error',
            message: o.response?.data?.message || o.message,
            color: 'red',
          });
        } finally {
          r(!1);
        }
      };
    return (
      h.useEffect(() => {
        d();
      }, []),
      { dashboardMetrics: u, setDashboardMetrics: x, getDashboardMetrics: d }
    );
  },
  vs = () => {
    const [i, r] = h.useState(!1),
      { dashboardMetrics: u, setDashboardMetrics: x } = us(),
      {
        listings: d,
        setListings: o,
        isLoading: m,
        searchText: w,
        setSearchText: v,
        industry: z,
        setIndustry: g,
        sortOption: F,
        setSortOption: y,
        activeFilter: b,
        setActiveFilter: A,
        page: N,
        setPage: S,
        removeListingById: n,
      } = ds(),
      {
        applications: l,
        searchText: j,
        setSearchText: C,
        status: R,
        setStatus: _,
        listingId: W,
        setListingId: P,
        dateFrom: t,
        setDateFrom: U,
        dateTo: s,
        setDateTo: O,
        sortOption: pe,
        setSortOption: ve,
        page: be,
        setPage: fe,
        newStatus: we,
        setNewStatus: Se,
        setApplications: re,
        removeApplicationById: ye,
      } = hs(),
      Ae = [
        { value: 'all', label: 'All Listings' },
        ...(d.map((I) => ({ value: I._id, label: I.jobTitle })) ?? []),
      ],
      Te = async (I) => {
        if (!I) return;
        const E = n(I);
        o(E);
        try {
          (await ts(I),
            M.show({
              title: 'Success',
              message: 'Listing deleted successfully',
              color: 'green',
            }));
        } catch (T) {
          M.show({
            title: 'Error',
            message: T.response?.data?.message || 'Failed to delete listing',
            color: 'red',
          });
        }
        x(
          (T) =>
            T && { ...T, metrics: { ...T.metrics, totalListings: E.length } }
        );
      },
      ke = async (I) => {
        if (!I) return;
        const E = ye(I);
        re(E);
        try {
          (await as(I),
            M.show({
              title: 'Success',
              message: 'Application deleted successfully',
              color: 'green',
            }));
        } catch (T) {
          M.show({
            title: 'Error',
            message:
              T.response?.data?.message || 'Failed to delete application',
            color: 'red',
          });
        }
        x(
          (T) =>
            T && {
              ...T,
              metrics: {
                ...T.metrics,
                totalApplications: E.length,
                pendingApplications: E.filter((f) => f.status === 'pending')
                  .length,
                reviewedApplications: E.filter((f) => f.status === 'reviewed')
                  .length,
                rejectedApplications: E.filter((f) => f.status === 'rejected')
                  .length,
              },
            }
        );
      },
      oe = async (I, E) => {
        if (!E) return;
        const T = E;
        try {
          await ss(I, T);
          const f = await je();
          x(f);
        } catch (f) {
          M.show({
            title: 'Error',
            message:
              f.response?.data?.message ||
              'Failed to update application status',
            color: 'red',
          });
        }
        (re((f) => f && f.map((H) => (H._id === I ? { ...H, status: T } : H))),
          x((f) => {
            if (!f) return f;
            const H = {
              pendingApplications: l.filter((V) => V.status === 'pending')
                .length,
              reviewedApplications: l.filter((V) => V.status === 'reviewed')
                .length,
              rejectedApplications: l.filter((V) => V.status === 'rejected')
                .length,
            };
            return { ...f, metrics: { ...f.metrics, updatedMetrics: H } };
          }));
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(_e, {
          title: 'Dashboard | JobRocket',
          description: 'Manage your listings and applications.',
          keywords:
            'analytics, dashboard, job applications, manage job applications, manage job listings',
        }),
        i
          ? e.jsx(xe, {
              py: 50,
              h: 'calc(100vh - 200px)',
              children: e.jsx(Ee, { size: 'xl', variant: 'oval' }),
            })
          : e.jsx(Ne, {
              size: 'xl',
              py: 'xl',
              w: { base: '100%', sm: '95%', md: '85%' },
              children: e.jsxs(L, {
                gap: 'xl',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx(ne, { order: 1, mb: 'xs', children: 'Dashboard' }),
                      e.jsx(c, {
                        c: 'dimmed',
                        size: 'lg',
                        children: "Welcome back! Here's your overview",
                      }),
                    ],
                  }),
                  e.jsx(cs, { dashboardMetrics: u }),
                  e.jsxs(Z, {
                    color: 'rocketOrange',
                    variant: 'outline',
                    defaultValue: 'applications',
                    children: [
                      e.jsxs(Z.List, {
                        mb: 20,
                        justify: 'center',
                        fw: 600,
                        children: [
                          e.jsx(Z.Tab, {
                            value: 'applications',
                            fz: { base: 'lg', md: 30 },
                            children: 'Applications',
                          }),
                          e.jsx(Z.Tab, {
                            value: 'listings',
                            fz: { base: 'lg', md: 30 },
                            children: 'Listings',
                          }),
                        ],
                      }),
                      e.jsx(Z.Panel, {
                        value: 'applications',
                        children: e.jsx(is, {
                          dashApplications: l,
                          listingOptions: Ae,
                          onStatusChange: oe,
                          searchText: j,
                          setSearchText: C,
                          status: R,
                          setStatus: _,
                          listingId: W,
                          setListingId: P,
                          dateFrom: t,
                          setDateFrom: U,
                          dateTo: s,
                          setDateTo: O,
                          sortOption: pe,
                          setSortOption: ve,
                          page: be,
                          setPage: fe,
                          updateApplicationStatus: oe,
                          newStatus: we,
                          setNewStatus: Se,
                          handleApplicationDelete: ke,
                        }),
                      }),
                      e.jsx(Z.Panel, {
                        value: 'listings',
                        children: e.jsx(os, {
                          listings: d,
                          isLoading: m,
                          searchText: w,
                          setSearchText: v,
                          sortOption: F,
                          setSortOption: y,
                          activeFilter: b,
                          setActiveFilter: A,
                          page: N,
                          setPage: S,
                          industry: z,
                          setIndustry: g,
                          handleDelete: Te,
                          setListings: o,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
      ],
    });
  };
export { vs as Dashboard };
