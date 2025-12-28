# GA4 Debugging Guide

## Current Status
✅ Script loading: `gtag` and `dataLayer` are present
✅ Consent granted: Analytics cookies accepted
✅ Code implementation: All tracking code deployed correctly
❌ Data not appearing: GA4 dashboard shows no data

## Diagnostic Steps

### 1. Verify Measurement ID
**Your code uses**: `G-3YS5NFYEWD`

**Action**: Go to your GA4 account and verify:
1. Open [Google Analytics](https://analytics.google.com)
2. Click Admin (gear icon, bottom left)
3. Under Property column → Property Settings
4. Look for **Property ID** or **Measurement ID**
5. **Verify it exactly matches**: `G-3YS5NFYEWD`

If it doesn't match, we need to update `frontend/src/utils/analytics.ts` line 20.

### 2. Manual Event Test
**Action**: While on jobrocket.work with console open:

```javascript
// Fire a test event
window.gtag('event', 'manual_test', {
  test_category: 'debugging',
  test_label: 'manual_console_test',
  timestamp: new Date().toISOString()
});
```

Then immediately check GA4:
1. Go to your GA4 property
2. Click **Reports** → **Realtime**
3. Look for the `manual_test` event in the last 30 seconds

**Expected**: Event should appear within 10-30 seconds
**If no event appears**: Issue is with GA4 property configuration or measurement ID

### 3. Verify Data Stream Configuration
**Action**: In GA4 Admin:
1. Click **Data Streams** (under Property column)
2. Verify you have a **Web** data stream (not iOS/Android)
3. Click on the web data stream
4. Verify **Website URL** matches: `https://jobrocket.work`
5. Check that **Enhanced measurement** is turned ON

### 4. Check Property Type
**Action**: In GA4 Admin → Property Settings:
- Verify **Property type** shows "GA4" or "Google Analytics 4"
- If it shows "Universal Analytics" (UA), you're looking at the wrong property

### 5. Check for Data Processing Delay
**New GA4 properties**: First data can take 24-48 hours to process
**Existing properties**: Data appears within 30 seconds to a few minutes

**Action**:
- When was this GA4 property created?
- If created within last 48 hours, wait and test again tomorrow

### 6. Network Request Verification
**Action**: On jobrocket.work:
1. Open DevTools → Network tab
2. Filter by: `google-analytics.com` or `gtag`
3. Navigate to a new page or click a button
4. Look for requests to:
   - `https://www.google-analytics.com/g/collect?...`
   - `https://www.googletagmanager.com/gtag/js?id=G-3YS5NFYEWD`

**Expected**: Should see POST requests to `google-analytics.com/g/collect` with status 200/204
**If missing**: Script not firing events correctly

### 7. DebugView Check
**Action**: Enable GA4 DebugView:
1. In GA4, go to **Configure** → **DebugView**
2. On jobrocket.work, run in console:
```javascript
// Enable debug mode for this session
window.gtag('config', 'G-3YS5NFYEWD', {
  'debug_mode': true
});

// Fire a test event
window.gtag('event', 'debug_test', {
  debug_category: 'testing'
});
```
3. Check DebugView in GA4 - should show events in real-time

## Common Issues

### Issue 1: Wrong Measurement ID
**Symptom**: Events never appear anywhere
**Solution**: Update measurement ID in `frontend/src/utils/analytics.ts`

### Issue 2: Property Not Set Up for Web
**Symptom**: No data stream or wrong type
**Solution**: Create a new Web data stream in GA4

### Issue 3: Data Stream URL Mismatch
**Symptom**: Events fire but don't appear in reports
**Solution**: Update data stream URL to match `jobrocket.work`

### Issue 4: Using Universal Analytics Instead of GA4
**Symptom**: Looking at old UA property
**Solution**: Create a new GA4 property (starts with G-, not UA-)

### Issue 5: Browser Extensions Blocking
**Symptom**: Script loads but requests blocked
**Solution**: Test in incognito mode or different browser

## Next Steps Based on Results

Run the manual test (Step 2) first. Report back what you see:
- [ ] Event appears in Realtime → Issue is with automatic tracking
- [ ] Event does NOT appear → Issue is with GA4 property setup
- [ ] Network requests fail → Issue is with script/consent
- [ ] Can't find the property → Need to create new GA4 property

## Quick Test Script
Run this in console on jobrocket.work:

```javascript
// Comprehensive diagnostic
console.log('=== GA4 Diagnostic ===');
console.log('1. gtag exists:', typeof window.gtag !== 'undefined');
console.log('2. dataLayer exists:', Array.isArray(window.dataLayer));
console.log('3. dataLayer content:', window.dataLayer);
console.log('4. Firing test event...');

window.gtag('event', 'diagnostic_test', {
  test_time: new Date().toISOString(),
  user_agent: navigator.userAgent,
  page_location: window.location.href
});

console.log('5. Test event fired. Check GA4 Realtime in 30 seconds.');
console.log('=== End Diagnostic ===');
```

Expected output should show gtag and dataLayer working, then fire a test event you can verify in GA4 Realtime.
