import {
  aa as e,
  N as J,
  ac as N,
  H as V,
  ad as $,
  r as F,
  u as _,
  K as B,
  i as z,
  n as H,
  a as g,
  ae as O,
  q as u,
  af as I,
  ag as L,
  j as s,
  t as W,
  F as c,
  e as K,
  m as p,
  d as Q,
  ah as G,
  ai as X,
  aj as Y,
  T as x,
  B as E,
} from './index-Dbp1fGsr.js';
import { D as Z } from './DeleteUserModal-DbGC9_mn.js';
import { a as j } from './getCleanedListingData-Cbsw5E8V.js';
const ee = e.object({
    phone: e
      .string()
      .required()
      .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone must be a valid Israeli phone number.',
      }),
    profileType: e
      .string()
      .valid('jobseeker', 'business')
      .required()
      .messages({
        'any.only': 'Profile type must be either jobseeker or business',
        'string.empty': 'Profile type is required',
        'any.required': 'Profile type is required',
      }),
    jobseekerProfile: e.when('profileType', {
      is: 'jobseeker',
      then: e
        .object({
          firstName: e
            .string()
            .min(2)
            .max(256)
            .required()
            .messages({
              'string.min': 'First name is too short',
              'string.empty': 'First name is required',
              'any.required': 'First name is required',
            }),
          lastName: e
            .string()
            .min(2)
            .max(256)
            .required()
            .messages({
              'string.min': 'Last name is too short',
              'string.empty': 'Last name is required',
              'any.required': 'Last name is required',
            }),
          highestEducation: e
            .string()
            .valid(
              'High School',
              'Associate Degree',
              "Bachelor's Degree",
              "Master's Degree",
              'Doctorate',
              'Other'
            )
            .required()
            .messages({
              'any.only': 'Please select a valid education level',
              'string.empty': 'Education level is required',
              'any.required': 'Education level is required',
            }),
          preferredWorkArrangement: e
            .string()
            .required()
            .messages({
              'string.empty': 'Preferred work arrangement is required',
              'any.required': 'Preferred work arrangement is required',
            }),
          linkedinPage: e
            .string()
            .uri()
            .allow('')
            .optional()
            .messages({ 'string.uri': 'Please enter a valid LinkedIn URL' }),
          resume: e.string().max(1024).allow('').optional(),
          skills: e.array().items(e.string()).optional().default([]),
          description: e
            .string()
            .max(2e3)
            .allow('')
            .optional()
            .messages({
              'string.max': 'Description cannot exceed 2000 characters',
            }),
        })
        .required(),
      otherwise: e.forbidden(),
    }),
    businessProfile: e.when('profileType', {
      is: 'business',
      then: e
        .object({
          companyName: e
            .string()
            .min(2)
            .max(256)
            .required()
            .messages({
              'string.min': 'Business name is too short',
              'string.empty': 'Business name is required',
              'any.required': 'Business name is required',
            }),
          location: e
            .object({
              country: e
                .string()
                .min(2)
                .max(256)
                .required()
                .messages({
                  'string.min': 'Country is too short',
                  'string.empty': 'Country is required',
                  'any.required': 'Country is required',
                }),
              city: e
                .string()
                .min(2)
                .max(256)
                .required()
                .messages({
                  'string.min': 'City is too short',
                  'string.empty': 'City is required',
                  'any.required': 'City is required',
                }),
            })
            .required(),
          logo: e
            .object({
              url: e
                .string()
                .uri()
                .allow('')
                .optional()
                .messages({ 'string.uri': 'Please enter a valid logo URL' }),
              alt: e.string().max(256).allow('').optional(),
            })
            .optional(),
          industry: e
            .string()
            .required()
            .messages({
              'string.empty': 'Industry is required',
              'any.required': 'Industry is required',
            }),
          numberOfEmployees: e
            .string()
            .valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')
            .required()
            .messages({
              'any.only': 'Please select a valid employee range',
              'string.empty': 'Number of employees is required',
              'any.required': 'Number of employees is required',
            }),
          website: e
            .string()
            .uri()
            .max(512)
            .allow('')
            .optional()
            .messages({ 'string.uri': 'Please enter a valid website URL' }),
          contactEmail: e
            .string()
            .email({ tlds: { allow: !1 } })
            .allow('')
            .optional()
            .messages({ 'string.email': 'Please enter a valid contact email' }),
          socialMedia: e
            .object({
              linkedin: e
                .string()
                .uri()
                .max(512)
                .allow('')
                .optional()
                .messages({
                  'string.uri': 'Please enter a valid LinkedIn URL',
                }),
              twitter: e
                .string()
                .uri()
                .max(512)
                .allow('')
                .optional()
                .messages({ 'string.uri': 'Please enter a valid Twitter URL' }),
              facebook: e
                .string()
                .uri()
                .max(512)
                .allow('')
                .optional()
                .messages({
                  'string.uri': 'Please enter a valid Facebook URL',
                }),
            })
            .optional(),
          description: e
            .string()
            .max(2e3)
            .allow('')
            .optional()
            .messages({
              'string.max': 'Description cannot exceed 2000 characters',
            }),
        })
        .required(),
      otherwise: e.forbidden(),
    }),
  }),
  se = () => {
    const q = J(),
      { id: w } = N(),
      l = V('(max-width: 700px)'),
      n = $(),
      [k, h] = F.useState(!1),
      [m, { open: P, close: S }] = _(!1),
      a = B((r) => r.userSlice.isAdminView),
      U = B((r) => r.userSlice.user),
      v = B((r) => r.userSlice.allUsers)?.find((r) => r._id === w),
      i = a ? v : U,
      {
        register: D,
        handleSubmit: y,
        reset: d,
        control: f,
        formState: { errors: T, isValid: b, isDirty: M },
        trigger: R,
      } = z({ mode: 'all', resolver: H(ee), defaultValues: i ? j(i) : {} });
    return (
      F.useEffect(() => {
        if (i) {
          const r = j(i);
          d(r);
        }
      }, [d, i]),
      {
        isSubmitting: k,
        isAdminView: a,
        userData: i,
        register: D,
        handleSubmit: y,
        onSubmit: async (r) => {
          const t = { phone: r.phone, profileType: r.profileType };
          (r.profileType === 'jobseeker' &&
            (t.jobseekerProfile = r.jobseekerProfile),
            r.profileType === 'business' &&
              (t.businessProfile = r.businessProfile));
          try {
            const o = await g.put(`/api/users/${i?._id}`, t);
            if (o.status === 200) {
              const A = o.data;
              (a || n(I(A)),
                a && n(L(A)),
                d(j(A)),
                u.show({
                  title: 'Success',
                  message: 'Profile Updated Successfully!',
                  color: 'green',
                }));
            }
          } catch (o) {
            u.show({
              title: 'Error',
              message: `Update Failed! ${o?.response?.data || o.message}`,
              color: 'red',
            });
          }
        },
        trigger: R,
        errors: T,
        isDirty: M,
        isValid: b,
        updateBusinessStatus: async () => {
          const r =
            localStorage.getItem('token') || sessionStorage.getItem('token');
          g.defaults.headers.common['x-auth-token'] = r;
          try {
            const t = await g.patch(`/api/users/${i?._id}`);
            if (t.status === 200) {
              const o = t.data;
              (h(!0),
                setTimeout(() => {
                  (a || n(I(o)),
                    a && n(L(o)),
                    d(j(o)),
                    u.show({
                      title: 'Success',
                      message: 'Account Status Updated',
                      color: 'green',
                    }),
                    h(!1));
                }, 1e3));
            }
          } catch (t) {
            u.show({
              title: 'Error',
              message: t.response.data.message,
              color: 'red',
            });
          }
        },
        isMobile: l,
        opened: m,
        open: P,
        close: S,
        deleteUser: async () => {
          const r =
            localStorage.getItem('token') || sessionStorage.getItem('token');
          g.defaults.headers.common['x-auth-token'] = r;
          try {
            (await g.delete(`/api/users/${i?._id}`)).status === 200 &&
              (a ? q('/admin') : n(O()),
              u.show({
                title: 'Warning',
                message: 'Account Deleted.',
                color: 'orange',
              }));
          } catch (t) {
            u.show({
              title: 'Error',
              message: t.response.data.message,
              color: 'red',
            });
          }
        },
        control: f,
      }
    );
  };
function le() {
  const {
      isSubmitting: q,
      isAdminView: w,
      userData: l,
      register: n,
      handleSubmit: k,
      onSubmit: h,
      errors: m,
      isDirty: P,
      isValid: S,
      updateBusinessStatus: a,
      isMobile: U,
      opened: C,
      open: v,
      close: i,
      deleteUser: D,
      control: y,
    } = se(),
    d = l?.profileType === 'jobseeker',
    f = l?.profileType === 'business',
    T = l?.isAdmin ? 'Admin' : f ? 'Business' : 'Jobseeker';
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx(W, {
        title: 'My Profile | JobRocket',
        description: 'Manage your JobRocket profile and job search preferences',
        keywords: 'job seeker profile, manage account, profile settings',
      }),
      s.jsxs(c, {
        mt: 20,
        direction: 'column',
        align: 'center',
        gap: 20,
        children: [
          s.jsx(K, { children: 'Edit Profile' }),
          s.jsx(c, {
            my: 10,
            justify: 'center',
            direction: 'column',
            w: U ? '90%' : '50%',
            children: s.jsx('form', {
              onSubmit: k(h),
              children: s.jsxs(c, {
                gap: 10,
                direction: 'column',
                m: 'auto',
                children: [
                  s.jsx(p, {
                    legend: 'Contact',
                    children: s.jsx(Q, {
                      rightSection: s.jsx(G, {}),
                      label: 'Phone',
                      required: !0,
                      ...n('phone', {
                        onChange: (b) => {
                          b.target.value = b.target.value.replace(
                            /[^\d-]/g,
                            ''
                          );
                        },
                      }),
                      error: m.phone?.message,
                    }),
                  }),
                  d &&
                    s.jsx(p, {
                      legend: 'Jobseeker Details',
                      children: s.jsx(X, {
                        register: n,
                        errors: m,
                        control: y,
                      }),
                    }),
                  f &&
                    s.jsx(p, {
                      legend: 'Business Details',
                      children: s.jsx(Y, {
                        register: n,
                        errors: m,
                        control: y,
                      }),
                    }),
                  s.jsx(p, {
                    legend: 'Change Account Type',
                    children: s.jsxs(c, {
                      align: 'center',
                      direction: 'column',
                      justify: 'center',
                      gap: 10,
                      children: [
                        s.jsxs(x, {
                          children: [
                            'Account Type: ',
                            s.jsxs('strong', { children: [T, ' User'] }),
                          ],
                        }),
                        !l?.isAdmin &&
                          s.jsx(E, {
                            size: 'xs',
                            loading: q,
                            onClick: () => a(),
                            children: s.jsx(x, {
                              fz: 'sm',
                              children: 'Toggle Jobseeker / Business',
                            }),
                          }),
                        l?.isAdmin &&
                          s.jsx(x, {
                            size: 'xs',
                            c: 'red',
                            children: 'Cannot change or delete an admin user',
                          }),
                      ],
                    }),
                  }),
                  l?.isAdmin === !1 &&
                    w === !1 &&
                    s.jsx(p, {
                      legend: 'Delete Account',
                      children: s.jsxs(c, {
                        align: 'center',
                        direction: 'column',
                        gap: 5,
                        children: [
                          s.jsx(x, {
                            fw: 'bold',
                            c: 'red',
                            children:
                              'All data will be lost and you will be logged out.',
                          }),
                          s.jsx(E, {
                            color: 'red',
                            onClick: v,
                            children: 'Delete Account',
                          }),
                        ],
                      }),
                    }),
                  s.jsx(c, {
                    direction: 'column',
                    gap: 5,
                    w: '50%',
                    mx: 'auto',
                    children: s.jsx(E, {
                      disabled: !S || !P,
                      type: 'submit',
                      children: 'Update Info',
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      s.jsx(Z, { opened: C, close: i, deleteUser: D }),
    ],
  });
}
export { le as EditProfile };
