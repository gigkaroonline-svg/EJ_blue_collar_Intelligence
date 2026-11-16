/**
 * Admin panel string catalog.
 * Use keys in UI (`strings.foo` or `t('foo', { name })`). Edit copy here only.
 */

export const strings = {
  // Brand / shell
  brandName: 'RojMitra',
  brandMark: 'R',
  brandConsole: 'Admin console',
  brandAdminShort: 'Admin',
  navManage: 'Manage',
  navPartners: 'Sourcing partners',
  navCompanies: 'Companies',
  navJobs: 'Jobs',
  navWorkers: 'Labours',
  navBlogs: 'Blogs',
  navSignOut: 'Sign out',
  fallbackAdminName: 'Admin',

  // Common actions / labels
  commonApply: 'Apply',
  commonCancel: 'Cancel',
  commonEdit: 'Edit',
  commonDelete: 'Delete',
  commonSaveChanges: 'Save changes',
  commonSaving: 'Saving…',
  commonCreating: 'Creating…',
  commonCreate: 'Create',
  commonBlock: 'Block',
  commonUnblock: 'Unblock',
  commonName: 'Name',
  commonStatus: 'Status',
  commonEmail: 'Email',
  commonPhone: 'Phone',
  commonRole: 'Role',
  commonState: 'State',
  commonDistrict: 'District',
  commonLocation: 'Location',
  commonTitle: 'Title',
  commonPrevious: 'Previous',
  commonNext: 'Next',
  commonYes: 'Yes',
  commonNo: 'No',
  commonEmDash: '—',
  commonTotal: 'Total',
  commonPending: 'Pending',
  commonAccepted: 'Accepted',
  commonRejected: 'Rejected',
  commonBlocked: 'Blocked',
  commonActive: 'Active',
  commonAllStatuses: 'All statuses',
  commonBlockedAny: 'Blocked: any',
  commonPagerSummary: '{total} total · page {page} / {pages}',
  commonConfirmBlock: 'Block {name}?',
  commonConfirmUnblock: 'Unblock {name}?',
  commonRequestFailed: 'Request failed',
  commonUnknownInitial: '?',

  // Status display (API values → label)
  statusPending: 'pending',
  statusAccepted: 'accepted',
  statusRejected: 'rejected',
  statusBlocked: 'blocked',
  statusPublished: 'published',
  statusDraft: 'draft',
  statusReady: 'ready',
  statusNotReady: 'not ready',
  statusOk: 'ok',

  // Login
  loginTitle: 'Sign in',
  loginDescription: 'Manage partners, companies, and labours.',
  loginEmail: 'Email',
  loginPassword: 'Password',
  loginEmailPlaceholder: 'admin@example.com',
  loginSubmit: 'Sign in',
  loginSubmitting: 'Signing in…',
  loginFailed: 'Login failed',

  // Partners
  partnersDescription: 'Review pending signups, update profiles, and block accounts.',
  partnersEmptyTitle: 'No partners found',
  partnersEmptyDescription: 'Try adjusting filters or wait for new partner signups.',
  partnersSearchPlaceholder: 'Search name, phone, or email',
  partnersAllRoles: 'All roles',
  partnersEditTitle: 'Edit partner',
  partnersEditDescription: 'Phone stays {phone}. Partner create from admin is not available yet.',
  partnersFullName: 'Full name',
  partnersRejectionReason: 'Rejection reason',
  roleCsc: 'csc',
  roleCmc: 'cmc',
  roleAnganwadi: 'anganwadi',
  roleGovNgo: 'gov_ngo',

  // Companies
  companiesDescription: 'Create and moderate employer records used across the catalog.',
  companiesAdd: 'Add company',
  companiesEmptyTitle: 'No companies found',
  companiesEmptyDescription: 'Add a company or clear filters to see results.',
  companiesSearchPlaceholder: 'Search company name',
  companiesEditTitle: 'Edit company',
  companiesAddTitle: 'Add company',

  // Jobs
  jobsDescription:
    'Create and moderate trade/job roles used on worker profiles (same catalog as the mobile app).',
  jobsAdd: 'Add job',
  jobsEmptyTitle: 'No jobs found',
  jobsEmptyDescription: 'Add a job/trade or clear filters to see results.',
  jobsSearchPlaceholder: 'Search job / trade name',
  jobsEditTitle: 'Edit job',
  jobsAddTitle: 'Add job',
  jobsNamePlaceholder: 'e.g. Mason, Plumber',

  // Workers / labours
  workersDescription: 'Browse workers registered by partners and update availability details.',
  workersEmptyTitle: 'No labours found',
  workersEmptyDescription: 'Try another search or check partner registrations.',
  workersSearchPlaceholder: 'Search by name',
  workersAvailabilityAny: 'Availability: any',
  workersAvailability: 'Availability',
  workersDisabilityAny: 'Disability: any',
  workersReady: 'Ready',
  workersNotReady: 'Not ready',
  workersDisability: 'Disability',
  workersTrade: 'Trade',
  workersPartner: 'Partner',
  workersEditTitle: 'Edit labour',
  workersFullName: 'Full name',
  workersGender: 'Gender',
  workersDailyWage: 'Daily wage',
  workersReadyToWork: 'Ready to work',
  workersHasDisability: 'Has disability',
  workersDisabilityDetails: 'Disability details',
  genderMale: 'male',
  genderFemale: 'female',
  genderOther: 'other',

  // Blogs
  blogsDescription: 'Write and publish blog stories for the public site.',
  blogsNewStory: 'New story',
  blogsEditStory: 'Edit story',
  blogsFormDescription: 'Publish when the story is ready for the blog.',
  blogsExcerpt: 'Excerpt',
  blogsStory: 'Story',
  blogsCoverImage: 'Cover image',
  blogsCoverMaxSize: 'Use 1200×630 px. Max file size: 500 KB',
  blogsCoverTooLarge: 'Cover image must be 500 KB or smaller.',
  blogsCoverRequired: 'Add a cover image for this story.',
  blogsCoverRemoveAria: 'Remove cover',
  blogsCoverPreviewAlt: 'Blog cover image preview for RojMitra workforce research article',
  blogsCoverListAlt: '{title} — RojMitra cover image',
  blogsCoverFallbackTitle: 'Blog post',
  blogsBodyTooShort: 'Write at least 40 characters in the story.',
  blogsBodyTooLong: 'The story is too long. Keep it under 20,000 characters.',
  blogsStoryUpdated: 'Story updated.',
  blogsStoryPublished: 'Story published.',
  blogsDraftSaved: 'Draft saved.',
  blogsSaveFailed: 'Could not save the story.',
  blogsUpdateFailed: 'Could not update the story.',
  blogsDeleteFailed: 'Could not delete the story.',
  blogsDeleteConfirm: 'Delete “{title}”?',
  blogsSaveStory: 'Save story',
  blogsHideForm: 'Hide form',
  blogsShowForm: 'Show story form',
  blogsEmptyTitle: 'No stories yet',
  blogsEmptyDescription: 'Create your first blog story above.',
  blogsColCover: 'Cover',
  blogsColPublished: 'Published',
  blogsUnpublish: 'Unpublish',
  blogsPublish: 'Publish',
  blogsStatusDraft: 'Draft',
  blogsStatusPublished: 'Published',

  // Blog editor
  blogEditorToolbarAria: 'Story formatting',
  blogEditorBold: 'Bold',
  blogEditorItalic: 'Italic',
  blogEditorUnderline: 'Underline',
  blogEditorHeading: 'Heading',
  blogEditorSubheading: 'Subheading',
  blogEditorBulletList: 'Bullet list',
  blogEditorNumberedList: 'Numbered list',
  blogEditorLink: 'Link',
  blogEditorInsertTable: 'Insert table',
  blogEditorStoryAria: 'Story',
  blogEditorPlaceholder:
    'Write the story. Use the toolbar for headings, lists, links and tables.',
  blogEditorCharCount: '{count} characters · max {max}',
  blogEditorLinkPrompt: 'Link URL',
  blogEditorLinkDefault: 'https://',
  blogEditorLinkInvalid: 'Use an http, https, or site path link.',
  blogEditorRowsPrompt: 'Number of rows (including header)',
  blogEditorColsPrompt: 'Number of columns',
  blogEditorHeaderCell: 'Header {n}',
}

/** Look up a catalog string; replace `{name}` placeholders from `vars`. */
export function t(key, vars) {
  let text = strings[key]
  if (text == null) return key
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value ?? ''))
    }
  }
  return text
}

/** Display label for a known status/API value. */
export function statusText(value) {
  const raw = String(value || '').toLowerCase()
  const map = {
    pending: strings.statusPending,
    accepted: strings.statusAccepted,
    rejected: strings.statusRejected,
    blocked: strings.statusBlocked,
    published: strings.statusPublished,
    draft: strings.statusDraft,
    ready: strings.statusReady,
    'not ready': strings.statusNotReady,
    ok: strings.statusOk,
  }
  return map[raw] ?? String(value || '')
}
