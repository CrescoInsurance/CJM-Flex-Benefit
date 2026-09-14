(function(){
  "use strict";

  /* =========================================================
     SETUP
  ========================================================== */
  function configIsValid(){
    var c = window.SUPABASE_CONFIG || {};
    return !!(c.url && c.anonKey &&
      c.url.indexOf('YOUR-PROJECT-REF') === -1 &&
      c.anonKey.indexOf('YOUR-PUBLIC-ANON-KEY') === -1);
  }

  var supabase = configIsValid()
    ? window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
    : null;

  var LOGO_DATA_URI = 'data:image/png;base64,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';

  /* =========================================================
     STATE
  ========================================================== */
  var STATE = {
    loading: true,
    authView: 'login',
    authError: '',
    authInfo: '',
    session: null,
    profile: null,
    activeTab: null,
    profiles: [], benefits: [], rejectReasons: [], claims: [], notifications: [], invites: [],
    toast: null, modal: null,
    rejectingClaimId: null,
    editingClaimId: null,
    confirmDeleteClaimId: null,
    claimFormError: null,
    editingAllocId: null,
    editingTerminationId: null,
    confirmDeactivateId: null,
    confirmDeleteProfileId: null,
    confirmRevokeInvite: null,
    staffRoleFilter: 'all',
    historyFilter: 'all',
    historySearchQuery: '',
    allSubmissionsSearchQuery: '',
    reportSearchQuery: '',
    reportSortColumn: null,
    reportSortDirection: 'desc',
    rejectedSearchQuery: '',
    rejectedSortColumn: null,
    rejectedSortDirection: 'desc',
    reportMonth: null, reportYear: null,
    invoiceYear: null,
    editingInvoiceRate: false,
    editingClientName: false,
    appSettings: {},
    _realtimeSubscribed: false
  };

  /* =========================================================
     UTILITIES
  ========================================================== */
  function fmtMoney(n){ n = isFinite(n)?n:0; var neg = n<0; n=Math.abs(n); var s='$'+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); return neg? '-'+s : s; }
  var CURRENCY_GROUPS = [
    {label: null, items: ['SGD']},
    {label: 'ASEAN', items: ['BND','KHR','IDR','LAK','MYR','MMK','PHP','THB','VND']},
    {label: 'Asia', items: ['CNY','HKD','INR','JPY','KRW','TWD','PKR','BDT','LKR','AED','SAR','ILS']},
    {label: 'Rest of World', items: ['USD','EUR','GBP','AUD','NZD','CAD','CHF','ZAR']}
  ];
  function renderCurrencyOptions(selected){
    selected = selected || 'SGD';
    var html = '';
    CURRENCY_GROUPS.forEach(function(group){
      var optsHtml = group.items.map(function(cur){
        return '<option value="'+cur+'" '+(cur===selected?'selected':'')+'>'+cur+'</option>';
      }).join('');
      html += group.label ? ('<optgroup label="'+group.label+'">'+optsHtml+'</optgroup>') : optsHtml;
    });
    return html;
  }
  function fmtCurrencyAmount(currency, amount){
    var n = Number(amount)||0;
    return (currency||'SGD')+' '+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
  }

  function claimMatchesSearch(c, query, includeEmployee){
    if(!query) return true;
    var q = query.trim().toLowerCase();
    if(!q) return true;
    var haystack = [c.category, c.vendor, c.status, c.currency].filter(Boolean).join(' ').toLowerCase();
    if(includeEmployee){ haystack += ' ' + employeeName(c.employee_id).toLowerCase(); }
    return haystack.indexOf(q) !== -1;
  }

  var EXCHANGE_RATE_CACHE = {};
  var EXCHANGE_RATE_CACHE_MS = 60*60*1000;
  function withTimeout(promise, ms, label){
    return new Promise(function(resolve, reject){
      var settled = false;
      var timer = setTimeout(function(){
        if(settled) return;
        settled = true;
        reject(new Error((label||'Request')+' timed out after '+ms+'ms - the server may be slow or unreachable.'));
      }, ms);
      promise.then(function(v){
        if(settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(v);
      }, function(err){
        if(settled) return;
        settled = true;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function fetchRateFrankfurter(currency){
    return fetch('https://api.frankfurter.app/latest?from='+encodeURIComponent(currency)+'&to=SGD')
      .then(function(res){ if(!res.ok) throw new Error('Frankfurter returned '+res.status); return res.json(); })
      .then(function(data){
        var rate = data && data.rates && data.rates.SGD;
        if(!rate || isNaN(rate)) throw new Error('Frankfurter has no SGD rate for '+currency);
        return rate;
      });
  }
  function fetchRateOpenERApi(currency){
    return fetch('https://open.er-api.com/v6/latest/'+encodeURIComponent(currency))
      .then(function(res){ if(!res.ok) throw new Error('open.er-api returned '+res.status); return res.json(); })
      .then(function(data){
        var rate = data && data.rates && data.rates.SGD;
        if(!rate || isNaN(rate)) throw new Error('open.er-api has no SGD rate for '+currency);
        return rate;
      });
  }
  function getExchangeRateToSGD(currency){
    if(!currency || currency==='SGD') return Promise.resolve(1);
    var cached = EXCHANGE_RATE_CACHE[currency];
    if(cached && (Date.now()-cached.at) < EXCHANGE_RATE_CACHE_MS){
      return Promise.resolve(cached.rate);
    }
    return fetchRateFrankfurter(currency).catch(function(err1){
      console.error('Frankfurter rate lookup failed', err1);
      return fetchRateOpenERApi(currency).catch(function(err2){
        console.error('open.er-api rate lookup failed', err2);
        var combined = new Error('Both rate providers failed for '+currency+' - ('+err1.message+') / ('+err2.message+')');
        throw combined;
      });
    }).then(function(rate){
      EXCHANGE_RATE_CACHE[currency] = {rate:rate, at:Date.now()};
      return rate;
    });
  }

  function fmtDate(d){ if(!d) return '-'; var dt=new Date(d+'T00:00:00'); if(isNaN(dt)) return d; return dt.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); }
  function fmtDateTime(iso){ if(!iso) return '-'; var dt=new Date(iso); if(isNaN(dt)) return iso; return dt.toLocaleString(undefined,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
  function escapeHtml(str){ return String(str==null?'':str).replace(/[&<>"']/g, function(s){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]; }); }
  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function yearStartStr(){ return new Date().getFullYear()+'-01-01'; }
  function isImageName(name){ return /\.(png|jpe?g|gif|webp|heic|heif|bmp)$/i.test(name||''); }

  function profileById(id){ return STATE.profiles.filter(function(p){ return p.id===id; })[0]; }
  function employeeName(id){ var p = profileById(id); return p ? p.name : 'Unknown'; }

  function vendorSuggestions(){
    var seen = {}; var list = [];
    STATE.claims.forEach(function(c){
      var v = c.vendor && c.vendor.trim();
      if(v && !seen[v.toLowerCase()]){ seen[v.toLowerCase()]=true; list.push(v); }
    });
    return list.sort(function(a,b){ return a.localeCompare(b); });
  }
  function renderVendorDatalist(id){
    return '<datalist id="'+id+'">'+vendorSuggestions().map(function(v){ return '<option value="'+escapeHtml(v)+'"></option>'; }).join('')+'</datalist>';
  }

  function claimCutoffNotice(){
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var cutoff = new Date(year, month, 25, 23, 59, 59, 999);
    var cutoffLabel = '25 ' + monthNames[month].slice(0,3) + ' ' + year + ', 23:59';
    if(now <= cutoff){
      return 'Submit by ' + cutoffLabel + ' to have this claim processed in ' + monthNames[month] + '. Submissions after this cutoff will be processed the following month.';
    }
    var nextMonthIdx = (month + 1) % 12;
    var nextMonthYear = month === 11 ? year + 1 : year;
    return 'This month\'s cutoff (' + cutoffLabel + ') has passed. Claims submitted now will be processed in ' + monthNames[nextMonthIdx] + ' ' + nextMonthYear + '.';
  }

  function captureClaimFormValues(){
    var form = document.querySelector('form[data-form="submit-claim"]');
    if(!form) return null;
    return {
      category: form.category ? form.category.value : '',
      vendor: form.vendor ? form.vendor.value : '',
      amount: form.amount ? form.amount.value : '',
      receiptDate: form.receiptDate ? form.receiptDate.value : ''
    };
  }
  function restoreClaimFormValues(vals){
    var form = document.querySelector('form[data-form="submit-claim"]');
    if(!form || !vals) return;
    if(form.category && vals.category){ form.category.value = vals.category; }
    if(form.vendor && vals.vendor){ form.vendor.value = vals.vendor; }
    if(form.amount && vals.amount){ form.amount.value = vals.amount; }
    if(form.receiptDate && vals.receiptDate){ form.receiptDate.value = vals.receiptDate; }
  }

  /* =========================================================
     BUSINESS LOGIC
  ========================================================== */
  function sgdAmountOf(c){
    return Number(c.amount_sgd != null ? c.amount_sgd : c.amount) || 0;
  }

  function computeWallet(employeeId){
    var profile = profileById(employeeId) || {annual_allocation:0};
    var currentYear = new Date().getFullYear();
    var empClaims = STATE.claims.filter(function(c){
      return c.employee_id===employeeId && new Date(c.receipt_date+'T00:00:00').getFullYear()===currentYear;
    });
    var approvedTotal=0, pendingTotal=0;
    var byCategory = {};
    STATE.benefits.forEach(function(b){ byCategory[b] = {approved:0, pending:0}; });
    empClaims.forEach(function(c){
      var amt = sgdAmountOf(c);
      if(!byCategory[c.category]) byCategory[c.category] = {approved:0, pending:0};
      if(c.status==='approved'){ approvedTotal+=amt; byCategory[c.category].approved+=amt; }
      if(c.status==='pending'){ pendingTotal+=amt; byCategory[c.category].pending+=amt; }
    });
    var allocation = Number(profile.annual_allocation)||0;
    var available = allocation - approvedTotal - pendingTotal;
    var utilizationPct = allocation>0 ? Math.min(100, (approvedTotal/allocation)*100) : 0;
    return {allocation:allocation, approvedTotal:approvedTotal, pendingTotal:pendingTotal, available:available, utilizationPct:utilizationPct, byCategory:byCategory, year:currentYear};
  }

  function buildPeriodReport(claims, startDate, endDate){
    var inRange = function(c){
      var d = new Date(c.receipt_date+'T00:00:00');
      return d>=startDate && d<=endDate;
    };
    var approved = claims.filter(function(c){ return c.status==='approved' && inRange(c); });
    var rejected = claims.filter(function(c){ return c.status==='rejected' && inRange(c); });

    var byCategory={}, byEmployee={}, totalClaimed=0;
    approved.forEach(function(c){
      var amt = sgdAmountOf(c);
      totalClaimed+=amt;
      byCategory[c.category] = byCategory[c.category]||{count:0,total:0};
      byCategory[c.category].count++; byCategory[c.category].total+=amt;
      byEmployee[c.employee_id] = byEmployee[c.employee_id]||{count:0,total:0,name:employeeName(c.employee_id),categories:{}};
      byEmployee[c.employee_id].count++; byEmployee[c.employee_id].total+=amt;
      byEmployee[c.employee_id].categories[c.category] = byEmployee[c.employee_id].categories[c.category]||{count:0,total:0};
      byEmployee[c.employee_id].categories[c.category].count++;
      byEmployee[c.employee_id].categories[c.category].total+=amt;
    });

    var totalRejected = 0;
    var byEmployeeRejected = {};
    var rejectedClaims = rejected.map(function(c){
      var amt = sgdAmountOf(c);
      totalRejected += amt;
      var reasonText = c.reject_reason || '';
      if(c.admin_note){ reasonText += (reasonText ? ' - ' : '') + c.admin_note; }
      reasonText = reasonText || 'No reason given';
      byEmployeeRejected[c.employee_id] = byEmployeeRejected[c.employee_id]||{name:employeeName(c.employee_id),count:0,total:0,reasons:{}};
      byEmployeeRejected[c.employee_id].count++;
      byEmployeeRejected[c.employee_id].total+=amt;
      byEmployeeRejected[c.employee_id].reasons[reasonText] = (byEmployeeRejected[c.employee_id].reasons[reasonText]||0)+1;
      return {
        employeeId: c.employee_id,
        employeeName: employeeName(c.employee_id),
        category: c.category,
        amount: amt,
        reason: reasonText
      };
    });

    return {byCategory:byCategory, byEmployee:byEmployee, totalClaimed:totalClaimed, totalCount:approved.length,
      rejectedClaims:rejectedClaims, byEmployeeRejected:byEmployeeRejected, totalRejectedCount:rejected.length, totalRejectedAmount:totalRejected};
  }

  /* =========================================================
     ANNUAL INVOICE (Headcount Adjustment + Unutilised Credit Note)
     Principle: adjustment = (headcount at 31 Dec - headcount at 1 Jan) / 2,
     charged (or credited if negative) at the configured rate per head per year.
     Any amount not utilised by employees for the year is credited back via
     credit note, as is any negative headcount adjustment. Net amount =
     additional headcount charge minus total credit note.
  ========================================================== */
  function getInvoiceRate(){
    var n = parseFloat(STATE.appSettings && STATE.appSettings.invoice_rate_per_head);
    return isNaN(n) ? 88 : n;
  }

  function getClientCompanyName(){
    var v = STATE.appSettings && STATE.appSettings.client_company_name;
    return (v && String(v).trim()) ? String(v).trim() : 'Client';
  }

  function getSelectedInvoiceYear(){
    var now = new Date();
    return (STATE.invoiceYear!=null) ? STATE.invoiceYear : (now.getFullYear()-1);
  }

  function getClientCode(){
    var name = getClientCompanyName();
    var firstWord = name.trim().split(/\s+/)[0] || 'CLIENT';
    var code = firstWord.toUpperCase().replace(/[^A-Z0-9]/g,'');
    return code || 'CLIENT';
  }

  function padInvoiceSeq(n){
    var s = String(n);
    while(s.length<4){ s = '0'+s; }
    return s;
  }

  // Returns the invoice number for a given benefit year, assigning and
  // persisting a new one (from a per-client running counter) the first time
  // that year's invoice is exported. Re-exporting the same year always
  // returns the same stored number rather than incrementing again.
  function ensureInvoiceNumber(year){
    var key = 'invoice_number_'+year;
    var existing = STATE.appSettings && STATE.appSettings[key];
    if(existing){ return Promise.resolve(existing); }
    var nextSeq = parseInt(STATE.appSettings && STATE.appSettings.invoice_sequence_next, 10);
    if(isNaN(nextSeq) || nextSeq<1){ nextSeq = 1; }
    var formatted = 'INV-'+getClientCode()+'-'+padInvoiceSeq(nextSeq);
    return supabase.from('app_settings').upsert([
      {key:key, value:formatted},
      {key:'invoice_sequence_next', value:String(nextSeq+1)}
    ], {onConflict:'key'}).then(function(res){
      if(res.error){ showToast('Could not assign invoice number: '+res.error.message, 'error'); throw res.error; }
      STATE.appSettings[key] = formatted;
      STATE.appSettings.invoice_sequence_next = String(nextSeq+1);
      return formatted;
    });
  }

  function buildInvoiceYearOptions(){
    var now = new Date();
    var years = {};
    years[now.getFullYear()] = true;
    years[now.getFullYear()-1] = true;
    STATE.profiles.forEach(function(p){ if(p.effective_date){ years[parseInt(p.effective_date.slice(0,4),10)]=true; } });
    STATE.claims.forEach(function(c){ if(c.receipt_date){ years[parseInt(c.receipt_date.slice(0,4),10)]=true; } });
    return Object.keys(years).map(Number).sort(function(a,b){ return b-a; });
  }

  function computeAnnualInvoice(year){
    var startStr = year+'-01-01';
    var endStr = year+'-12-31';
    var rate = getInvoiceRate();

    // An employee with no Effective Date recorded is treated as already
    // employed (rather than excluded) - missing data shouldn't silently drop
    // them from headcount or entitlement totals. Only an explicit
    // Date of Termination excludes them from a given date/period.
    var employedAt = function(p, dateStr){
      return p.role==='user' &&
        (!p.effective_date || p.effective_date<=dateStr) &&
        (!p.date_of_termination || p.date_of_termination>=dateStr);
    };
    var employedDuringRange = function(p, rangeStartStr, rangeEndStr){
      return p.role==='user' &&
        (!p.effective_date || p.effective_date<=rangeEndStr) &&
        (!p.date_of_termination || p.date_of_termination>=rangeStartStr);
    };

    var headcountAt = function(dateStr){
      return STATE.profiles.filter(function(p){ return employedAt(p, dateStr); }).length;
    };
    var startHeadcount = headcountAt(startStr);
    var endHeadcount = headcountAt(endStr);
    var headcountDelta = endHeadcount - startHeadcount;
    var adjustmentUnits = headcountDelta/2;
    var adjustmentAmount = adjustmentUnits * rate;
    var additionalCharge = Math.max(adjustmentAmount, 0);
    var headcountCredit = Math.max(-adjustmentAmount, 0);

    var employeesInYear = STATE.profiles.filter(function(p){ return employedDuringRange(p, startStr, endStr); });
    var totalEntitlementPool=0, totalApprovedForYear=0;
    var unutilizedByEmployee = employeesInYear.map(function(p){
      var approved = STATE.claims.filter(function(c){
        return c.employee_id===p.id && c.status==='approved' &&
          c.receipt_date && c.receipt_date>=startStr && c.receipt_date<=endStr;
      }).reduce(function(s,c){ return s+sgdAmountOf(c); }, 0);
      var allocation = Number(p.annual_allocation)||0;
      var unutilized = Math.max(0, allocation-approved);
      totalEntitlementPool += allocation;
      totalApprovedForYear += approved;
      return {name:p.name, allocation:allocation, approved:approved, unutilized:unutilized};
    }).sort(function(a,b){ return b.unutilized-a.unutilized; });
    var totalUnutilized = unutilizedByEmployee.reduce(function(s,e){ return s+e.unutilized; }, 0);

    var creditNoteAmount = totalUnutilized + headcountCredit;
    var netAmount = additionalCharge - creditNoteAmount;

    // Base Headcount Charge: the invoice also needs to bill for the upcoming
    // year's headcount as at 1 Jan (the year the invoice is dated), on top of
    // the true-up adjustment for the year just closed.
    var newYearStr = (year+1)+'-01-01';
    var newYearHeadcount = headcountAt(newYearStr);
    var baseHeadcountCharge = newYearHeadcount * rate;
    var totalHeadcountCharge = baseHeadcountCharge + adjustmentAmount;

    // Invoice Payable Amount: what the company is actually billed for the
    // upcoming year's benefit funding, net of the headcount adjustment and
    // any credit note carried in from this year. Subtract totalUnutilized
    // (not the full creditNoteAmount) here - a headcount *decrease* credit
    // is already folded into totalHeadcountCharge via the signed
    // adjustmentAmount, so subtracting creditNoteAmount too would apply
    // that same credit twice.
    var invoicePayableAmount = totalEntitlementPool + totalHeadcountCharge - totalUnutilized;

    var newYearHeadcountList = STATE.profiles.filter(function(p){ return employedAt(p, newYearStr); })
      .map(function(p){ return {name:p.name, allocation:Number(p.annual_allocation)||0}; })
      .sort(function(a,b){ return a.name.localeCompare(b.name); });

    // Supporting lists so the headcount adjustment can be audited: who counted
    // as headcount at the start of the year, and who joined or was terminated
    // during the year (the movements that produced the net change).
    var startHeadcountList = STATE.profiles.filter(function(p){ return employedAt(p, startStr); })
      .map(function(p){ return {name:p.name, allocation:Number(p.annual_allocation)||0}; })
      .sort(function(a,b){ return a.name.localeCompare(b.name); });

    var joinedDuringYear = STATE.profiles.filter(function(p){
      return p.role==='user' && p.effective_date && p.effective_date>startStr && p.effective_date<=endStr;
    });
    var terminatedDuringYear = STATE.profiles.filter(function(p){
      return p.role==='user' && p.date_of_termination && p.date_of_termination>=startStr && p.date_of_termination<=endStr;
    });
    var newJoinersList = joinedDuringYear.map(function(p){
      return {name:p.name, allocation:Number(p.annual_allocation)||0, date:p.effective_date};
    }).sort(function(a,b){ return a.date.localeCompare(b.date); });
    var terminationsList = terminatedDuringYear.map(function(p){
      return {name:p.name, allocation:Number(p.annual_allocation)||0, date:p.date_of_termination};
    }).sort(function(a,b){ return a.date.localeCompare(b.date); });

    return {
      year:year, rate:rate, startHeadcount:startHeadcount, endHeadcount:endHeadcount,
      headcountDelta:headcountDelta, adjustmentUnits:adjustmentUnits, adjustmentAmount:adjustmentAmount,
      additionalCharge:additionalCharge, headcountCredit:headcountCredit,
      totalEntitlementPool:totalEntitlementPool, totalApprovedForYear:totalApprovedForYear,
      totalUnutilized:totalUnutilized, unutilizedByEmployee:unutilizedByEmployee,
      creditNoteAmount:creditNoteAmount, netAmount:netAmount, invoicePayableAmount:invoicePayableAmount,
      newYearHeadcount:newYearHeadcount, baseHeadcountCharge:baseHeadcountCharge, totalHeadcountCharge:totalHeadcountCharge,
      newYearHeadcountList:newYearHeadcountList,
      startHeadcountList:startHeadcountList, newJoinersList:newJoinersList, terminationsList:terminationsList
    };
  }

  function uniqueYearsFromClaims(claims, currentYear){
    var years = {}; years[currentYear]=true;
    claims.forEach(function(c){ if(c.receipt_date){ years[new Date(c.receipt_date+'T00:00:00').getFullYear()]=true; } });
    return Object.keys(years).map(Number).sort(function(a,b){ return b-a; });
  }

  var REPORT_MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function buildReportYearOptions(claims){
    var now = new Date();
    var currentYear = now.getFullYear();
    var options = [{value:String(currentYear), label:String(currentYear)},
      {value:'ytd', label:'Year to Date '+currentYear+' ('+REPORT_MONTH_NAMES[0].slice(0,3)+'-'+REPORT_MONTH_NAMES[now.getMonth()].slice(0,3)+')'}];
    uniqueYearsFromClaims(claims, currentYear).filter(function(yr){ return yr!==currentYear; }).forEach(function(yr){
      options.push({value:String(yr), label:String(yr)});
    });
    return options;
  }

  function resolveReportPeriod(yearValue, monthValue){
    var now = new Date();
    if(yearValue==='ytd'){
      return {
        startDate: new Date(now.getFullYear(),0,1,0,0,0),
        endDate: now,
        label: 'Year to Date '+now.getFullYear()+' ('+REPORT_MONTH_NAMES[0].slice(0,3)+'-'+REPORT_MONTH_NAMES[now.getMonth()].slice(0,3)+')',
        fileSuffix: now.getFullYear()+'-YTD'
      };
    }
    var yr = parseInt(yearValue,10); if(isNaN(yr)) yr = now.getFullYear();
    var mo = parseInt(monthValue,10); if(isNaN(mo)) mo = now.getMonth();
    return {
      startDate: new Date(yr,mo,1,0,0,0),
      endDate: new Date(yr,mo+1,0,23,59,59),
      label: REPORT_MONTH_NAMES[mo]+' '+yr,
      fileSuffix: yr+'-'+String(mo+1).padStart(2,'0')
    };
  }

  /* =========================================================
     AUTH + DATA LOADING
  ========================================================== */
  function loadProfileAndData(){
    return supabase.from('profiles').select('*').eq('id', STATE.session.user.id).single().then(function(res){
      if(res.error || !res.data){ throw new Error('Could not load your account. If you just signed up, make sure your admin invited this exact email.'); }
      if(!res.data.active){
        return supabase.auth.signOut().then(function(){
          STATE.authError = 'This account has been deactivated. Contact your administrator.';
          throw new Error('deactivated');
        });
      }
      STATE.profile = res.data;
      return loadAppData();
    });
  }

  function loadAppData(){
    var isAdmin = STATE.profile && STATE.profile.role === 'admin';
    var calls = [
      supabase.from('benefits').select('*').order('name'),
      supabase.from('reject_reasons').select('*').order('reason'),
      supabase.from('claims').select('*').order('submitted_at', {ascending:false}),
      supabase.from('notifications').select('*').order('created_at', {ascending:false})
    ];
    if(isAdmin){
      calls.push(supabase.from('profiles').select('*').order('name'));
      calls.push(supabase.from('invites').select('*').order('created_at', {ascending:false}));
      calls.push(supabase.from('app_settings').select('*'));
    }
    return Promise.all(calls).then(function(results){
      STATE.benefits = (results[0].data||[]).map(function(b){ return b.name; });
      STATE.rejectReasons = (results[1].data||[]).map(function(r){ return r.reason; });
      STATE.claims = results[2].data || [];
      STATE.notifications = results[3].data || [];
      if(isAdmin){
        STATE.profiles = results[4].data || [];
        STATE.invites = results[5].data || [];
        STATE.appSettings = {};
        (results[6].data||[]).forEach(function(s){ STATE.appSettings[s.key] = s.value; });
      } else {
        STATE.profiles = STATE.profile ? [STATE.profile] : [];
        STATE.invites = [];
      }
    });
  }

  function subscribeRealtime(){
    if(STATE._realtimeSubscribed || !supabase) return;
    STATE._realtimeSubscribed = true;
    ['claims','benefits','notifications','profiles','app_settings'].forEach(function(table){
      supabase.channel(table+'-rt')
        .on('postgres_changes', {event:'*', schema:'public', table:table}, handleRealtimeChange)
        .subscribe();
    });
  }

  var realtimeDebounceTimer = null;
  function handleRealtimeChange(){
    clearTimeout(realtimeDebounceTimer);
    realtimeDebounceTimer = setTimeout(function(){
      if(!STATE.profile) return;
      loadAppData().then(function(){
        var activeEl = document.activeElement;
        var isTyping = activeEl && ['INPUT','TEXTAREA'].indexOf(activeEl.tagName)!==-1;
        if(!isTyping){
          var preserved = STATE.activeTab==='claim' ? captureClaimFormValues() : null;
          render();
          if(preserved){ restoreClaimFormValues(preserved); }
        }
      }).catch(function(err){ console.error('realtime refresh failed', err); });
    }, 400);
  }

  function init(){
    if(!supabase){ STATE.loading = false; render(); return; }
    STATE.loading = true; render();
    supabase.auth.getSession().then(function(res){
      STATE.session = res.data.session;
      return STATE.session ? loadProfileAndData() : null;
    }).then(function(){
      STATE.loading = false;
      if(STATE.profile){ STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard'; }
      render();
      if(STATE.profile){ subscribeRealtime(); }
    }).catch(function(err){
      console.error(err);
      STATE.session = null; STATE.profile = null; STATE.loading = false;
      render();
    });

    supabase.auth.onAuthStateChange(function(event, session){
      if(event === 'SIGNED_OUT'){
        STATE.session = null; STATE.profile = null; STATE.activeTab = null;
        render();
      }
    });
  }

  /* =========================================================
     RENDER - TOP LEVEL
  ========================================================== */
  function render(){
    var app = document.getElementById('app');
    if(!supabase){ app.innerHTML = renderSetupNeeded(); return; }
    if(STATE.loading){ app.innerHTML = renderLoading() + renderBrandFooter(); return; }
    if(!STATE.session || !STATE.profile){ app.innerHTML = renderAuthScreen() + renderBrandFooter(); return; }
    app.innerHTML = (STATE.profile.role==='admin' ? renderAdminShell() : renderUserShell()) + renderBrandFooter();
    if(STATE.modal){
      var host = document.createElement('div');
      host.innerHTML = renderModal();
      if(host.firstElementChild) app.appendChild(host.firstElementChild);
    }
    if(STATE.toast){
      var thost = document.createElement('div');
      thost.innerHTML = renderToast();
      if(thost.firstElementChild) app.appendChild(thost.firstElementChild);
    }
  }

  function renderSetupNeeded(){
    return '<div class="login-wrap"><div class="login-card" style="max-width:460px;">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Setup needed</h1>'+
      '<p class="muted">This copy isn\'t connected to a Supabase project yet.</p></div>'+
      '<div class="info-banner">Open <code>config.js</code> and fill in your Supabase project URL and anon key '+
      '(found in your Supabase dashboard under Settings &rarr; API), then reload this page.</div>'+
    '</div></div>';
  }

  function renderLoading(){
    return '<div class="loading-wrap"><div class="spinner"></div><div>Loading your benefits portal...</div></div>';
  }

  function renderBrandFooter(){
    return '<div class="brand-footer"><span>Powered by</span><img src="'+LOGO_DATA_URI+'" alt="CJM (Singapore) Pte Ltd" /></div>';
  }

  function renderToast(){
    if(!STATE.toast) return '';
    return '<div class="toast toast-'+STATE.toast.type+'">'+escapeHtml(STATE.toast.msg)+'</div>';
  }
  function showToast(msg, type){
    STATE.toast = {msg:msg, type:type||'success'};
    render();
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ STATE.toast=null; render(); }, 3200);
  }

  function renderModal(){
    if(!STATE.modal) return '';
    var m = STATE.modal;
    return '<div class="modal-overlay" onclick="if(event.target===event.currentTarget){window.closeReceiptModal();}">'+
      '<div class="modal-box">'+
        '<div class="modal-header"><span>'+escapeHtml(m.title)+'</span><button class="link-btn" data-action="close-modal">Close</button></div>'+
        '<div class="modal-body">'+
          (m.isImage ? '<img src="'+m.src+'" class="modal-img" alt="Receipt"/>' : '<a href="'+m.src+'" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open '+escapeHtml(m.name)+'</a>')+
        '</div>'+
      '</div>'+
    '</div>';
  }

  /* =========================================================
     AUTH VIEWS
  ========================================================== */
  function renderAuthScreen(){
    return STATE.authView === 'signup' ? renderSignup() : renderLogin();
  }

  function renderLogin(){
    return '<div class="login-wrap"><div class="login-card">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Flex Benefits Portal</h1><p class="muted">Manage your employee benefits wallet</p></div>'+
      '<form data-form="login" class="login-form">'+
        '<label>Email<input type="email" name="email" autocomplete="username" required placeholder="you@company.com" /></label>'+
        '<label>Password<input type="password" name="password" autocomplete="current-password" required placeholder="********" /></label>'+
        (STATE.authError ? '<div class="field-error">'+escapeHtml(STATE.authError)+'</div>' : '')+
        (STATE.authInfo ? '<div class="info-banner banner-success">'+escapeHtml(STATE.authInfo)+'</div>' : '')+
        '<button type="submit" class="btn btn-primary btn-block">Log in</button>'+
      '</form>'+
      '<div class="auth-toggle">'+
        '<button data-action="show-signup">New User Login</button>'+
        '<button data-action="forgot-password">Forgot password?</button>'+
      '</div>'+
    '</div></div>';
  }

  function renderSignup(){
    return '<div class="login-wrap"><div class="login-card">'+
      '<div class="login-brand"><div class="login-logo">FB</div><h1>Accept Your Invite</h1><p class="muted">Your admin needs to invite your email first</p></div>'+
      '<form data-form="signup" class="login-form">'+
        '<label>Work Email<input type="email" name="email" autocomplete="username" required placeholder="you@company.com" /></label>'+
        '<label>Choose a Password<input type="password" name="password" autocomplete="new-password" required minlength="6" placeholder="At least 6 characters" /></label>'+
        '<label>Confirm Password<input type="password" name="confirmPassword" autocomplete="new-password" required placeholder="Repeat your password" /></label>'+
        (STATE.authError ? '<div class="field-error">'+escapeHtml(STATE.authError)+'</div>' : '')+
        (STATE.authInfo ? '<div class="info-banner banner-success">'+escapeHtml(STATE.authInfo)+'</div>' : '')+
        '<button type="submit" class="btn btn-primary btn-block">Create Account</button>'+
      '</form>'+
      '<div class="auth-toggle"><button data-action="show-login">Already have an account? Log in</button></div>'+
    '</div></div>';
  }

  /* =========================================================
     SHARED: TOPBAR / NAV TAB
  ========================================================== */
  function renderTopbar(){
    return '<div class="topbar">'+
      '<div class="brand-mini"><img src="'+LOGO_DATA_URI+'" class="topbar-logo" alt="CJM" /> CJM (Singapore) Pte Ltd Flex Benefits Portal</div>'+
      '<div class="topbar-right"><span class="user-chip">'+escapeHtml(STATE.profile.name)+' <span class="role-tag">'+STATE.profile.role+'</span></span>'+
      '<button class="btn btn-ghost btn-sm" data-action="logout">Log out</button></div>'+
    '</div>';
  }
  function navTab(tab, label){
    return '<button class="tab '+(STATE.activeTab===tab?'active':'')+'" data-action="nav" data-tab="'+tab+'">'+label+'</button>';
  }
  function cardTitleWithClose(title){
    return '<div class="card-title card-title-row"><span>'+title+'</span>'+
      '<button class="tab-close-btn" data-action="nav" data-tab="dashboard" title="Close">X</button></div>';
  }

  /* =========================================================
     USER MODULE
  ========================================================== */
  function renderUserShell(){
    var wallet = computeWallet(STATE.profile.id);
    var unread = STATE.notifications.filter(function(n){ return !n.read; }).length;
    return '<div class="shell">'+renderTopbar()+
      '<div class="tabs">'+
        navTab('dashboard','Dashboard')+
        navTab('claim','Submit Claim')+
        navTab('history','Transaction History')+
        navTab('notifications','Notifications'+(unread?' <span class="badge">'+unread+'</span>':''))+
        '<button class="tab tab-cta" data-action="buy-pa">BUY PA NOW</button>'+
        '<button class="tab tab-cta" data-action="buy-travel-insurance">Buy Travel Insurance Now</button>'+
      '</div>'+
      '<div class="content">'+
        (STATE.activeTab==='claim' ? renderClaimForm() :
         STATE.activeTab==='history' ? renderUserHistory() :
         STATE.activeTab==='notifications' ? renderUserNotifications() :
         renderUserDashboard(wallet))+
      '</div></div>';
  }

  function renderUserDashboard(wallet){
    var categories = STATE.benefits;
    var maxCat = 1;
    categories.forEach(function(c){ var v=(wallet.byCategory[c]?wallet.byCategory[c].approved+wallet.byCategory[c].pending:0); if(v>maxCat) maxCat=v; });
    var recent = STATE.claims.slice().sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); }).slice(0,5);
    var barsHtml = categories.map(function(c,i){
      var cat = wallet.byCategory[c]||{approved:0,pending:0};
      var val = cat.approved+cat.pending;
      var pct = (val/maxCat)*100;
      return '<div class="bar-row"><div class="bar-label">'+escapeHtml(c)+'</div>'+
        '<div class="bar-track"><div class="bar-fill cat-'+(i%5)+'" style="width:'+pct+'%"></div></div>'+
        '<div class="bar-value">'+fmtMoney(val)+'</div></div>';
    }).join('');
    return ''+
    '<div class="grid-cards">'+
      '<div class="card stat"><div class="stat-label">'+wallet.year+' Annual Allocation</div><div class="stat-value">'+fmtMoney(wallet.allocation)+'</div></div>'+
      '<div class="card stat"><div class="stat-label">Used (Approved)</div><div class="stat-value">'+fmtMoney(wallet.approvedTotal)+'</div></div>'+
      '<div class="card stat"><div class="stat-label">Pending Review</div><div class="stat-value">'+fmtMoney(wallet.pendingTotal)+'</div></div>'+
      '<div class="card stat highlight"><div class="stat-label">Available Balance</div><div class="stat-value">'+fmtMoney(wallet.available)+'</div></div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Utilisation Level</div>'+
      '<div class="progress-track"><div class="progress-fill" style="width:'+wallet.utilizationPct+'%"></div></div>'+
      '<div class="muted small">'+wallet.utilizationPct.toFixed(1)+'% of annual allocation used</div></div>'+
    '<div class="card"><div class="card-title">Spend by Benefit Category</div><div class="bar-chart">'+barsHtml+'</div></div>'+
    '<div class="card"><div class="card-title">Recent Submissions</div>'+renderClaimsTable(recent,false,false,false)+'</div>';
  }

  function renderClaimForm(){
    var wallet = computeWallet(STATE.profile.id);
    return '<div class="card">'+cardTitleWithClose('Submit a New Claim')+
      '<div class="info-banner banner-warning">'+escapeHtml(claimCutoffNotice())+'</div>'+
      '<form data-form="submit-claim" class="claim-form">'+
        '<label>Benefit Category<select name="category" required><option value="">Select a category...</option>'+
          STATE.benefits.map(function(b){ return '<option value="'+escapeHtml(b)+'">'+escapeHtml(b)+'</option>'; }).join('')+
        '</select></label>'+
        '<label>Vendor / Merchant<input type="text" name="vendor" list="vendor-options-new" required placeholder="e.g. California Fitness" autocomplete="off" /></label>'+
        renderVendorDatalist('vendor-options-new')+
        '<div class="amount-row">'+
          '<label style="flex:0 0 100px;">Currency<select id="claim-currency-input" name="currency">'+renderCurrencyOptions('SGD')+'</select></label>'+
          '<label style="flex:1;">Amount to Claim<input type="number" id="claim-amount-input" name="amount" step="0.01" min="0.01" required placeholder="e.g. 120.00" /></label>'+
        '</div>'+
        '<div id="claim-amount-preview" class="tiny muted"></div>'+
        '<div class="muted small">Available balance: '+fmtMoney(wallet.available)+' (SGD)</div>'+
        '<div id="claim-amount-live-error" class="field-error" style="display:none;"></div>'+
        '<label>Date of Receipt<input type="date" name="receiptDate" required min="'+yearStartStr()+'" max="'+todayStr()+'" /></label>'+
        '<div class="field-hint">Only receipts from '+new Date().getFullYear()+' can be claimed - your benefits reset every 1 January.</div>'+
        '<label>Upload Receipt (photo or PDF, max 4MB)</label>'+
        '<div class="dropzone" id="claim-receipt-dropzone">'+
          '<input type="file" name="receipt" accept="image/*,.pdf" required />'+
          '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
        '</div>'+
        (STATE.claimFormError ? '<div class="field-error">'+escapeHtml(STATE.claimFormError)+'</div>' : '')+
        '<div class="field-hint">Only Gym membership, Health screening, Optical, Dental and Leisure travel are claimable. Other expenses, including petrol, cannot be reimbursed through this wallet.</div>'+
        '<button type="submit" class="btn btn-primary">Submit Claim</button>'+
      '</form></div>';
  }

  function renderUserHistory(){
    var claims = STATE.claims.slice();
    var filter = STATE.historyFilter||'all';
    if(filter!=='all') claims = claims.filter(function(c){ return c.status===filter; });
    var searchQuery = STATE.historySearchQuery||'';
    claims = claims.filter(function(c){ return claimMatchesSearch(c, searchQuery, false); });
    claims.sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    var filters = ['all','pending','approved','rejected'];
    return '<div class="card">'+cardTitleWithClose('Transaction History')+
      '<div class="muted small" style="margin-bottom:12px;">Pending and rejected claims can be edited or deleted. Approved claims are locked.</div>'+
      '<input type="text" id="history-search-input" class="search-input" placeholder="Search by category, vendor, currency or status..." value="'+escapeHtml(searchQuery)+'" style="margin-bottom:12px;" />'+
      '<div class="filter-row">'+filters.map(function(f){ return '<button class="chip-filter '+(filter===f?'active':'')+'" data-action="filter-history" data-filter="'+f+'">'+(f.charAt(0).toUpperCase()+f.slice(1))+'</button>'; }).join('')+'</div>'+
      renderClaimsTable(claims,false,false,true)+
    '</div>';
  }

  function renderUserNotifications(){
    var notifs = STATE.notifications.slice().sort(function(a,b){ return b.created_at.localeCompare(a.created_at); });
    if(!notifs.length) return '<div class="card">'+cardTitleWithClose('Notifications')+'<div class="empty-state">No notifications yet.</div></div>';
    return '<div class="card">'+cardTitleWithClose('Notifications')+'<div class="notif-list">'+
      notifs.map(function(n){
        return '<div class="notif-item '+(n.read?'':'unread')+'"><div>'+escapeHtml(n.message)+'</div>'+
          '<div class="tiny muted">'+fmtDateTime(n.created_at)+'</div>'+
          (!n.read ? '<button class="link-btn" data-action="mark-read" data-id="'+n.id+'">Mark as read</button>' : '')+
        '</div>';
      }).join('')+
    '</div></div>';
  }

  /* =========================================================
     SHARED: CLAIMS TABLE
  ========================================================== */
  function renderClaimsTable(claims, showEmployee, adminActions, userActions){
    if(!claims.length) return '<div class="empty-state">No submissions found.</div>';
    var colCount = 8 + (showEmployee?1:0) + (adminActions?1:0) + (userActions?1:0);
    var rows = claims.map(function(c){
      var row = '<tr>'+
        (showEmployee ? '<td>'+escapeHtml(employeeName(c.employee_id))+'</td>' : '')+
        '<td>'+escapeHtml(c.category)+'</td>'+
        '<td>'+escapeHtml(c.vendor||'-')+'</td>'+
        '<td>'+fmtCurrencyAmount(c.currency, c.amount)+((c.currency && c.currency!=='SGD') ? '<div class="tiny muted">\u2248 '+fmtMoney(sgdAmountOf(c))+' SGD</div>' : '')+'</td>'+
        '<td>'+fmtDate(c.receipt_date)+'</td>'+
        '<td>'+fmtDate((c.submitted_at||'').slice(0,10))+'</td>'+
        '<td>'+(c.status==='approved' ? fmtDate((c.decided_at||'').slice(0,10)) : '-')+'</td>'+
        '<td><span class="status-pill status-'+c.status+'">'+c.status+'</span>'+
          (c.status==='rejected' && c.reject_reason ? '<div class="tiny muted">'+escapeHtml(c.reject_reason)+'</div>' : '')+
        '</td>'+
        '<td>'+(c.receipt_path ? '<button class="link-btn" data-action="view-receipt" data-id="'+c.id+'">View</button>' : '-')+'</td>'+
        (adminActions ? (c.status==='pending' ? renderApprovalActions(c) : '<td> - </td>') : '')+
        (userActions ? renderUserActionsCell(c) : '')+
      '</tr>';
      var expandRow = '';
      if(adminActions && STATE.rejectingClaimId===c.id){
        expandRow = '<tr class="reject-row"><td colspan="'+colCount+'">'+renderRejectPanel(c)+'</td></tr>';
      } else if(userActions && STATE.editingClaimId===c.id){
        expandRow = '<tr class="reject-row"><td colspan="'+colCount+'">'+renderClaimEditPanel(c)+'</td></tr>';
      }
      return row+expandRow;
    }).join('');
    return '<div class="table-wrap"><table class="data-table"><thead><tr>'+
      (showEmployee?'<th>Employee</th>':'')+
      '<th>Category</th><th>Vendor</th><th>Amount</th><th>Receipt Date</th><th>Submission Date</th><th>Approved</th><th>Status</th><th>Receipt</th>'+
      (adminActions?'<th>Actions</th>':'')+
      (userActions?'<th>Actions</th>':'')+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function renderApprovalActions(c){
    return '<td class="actions-cell">'+
      '<button class="btn btn-sm btn-success" data-action="approve-claim" data-id="'+c.id+'">Approve</button>'+
      '<button class="btn btn-sm btn-danger" data-action="start-reject" data-id="'+c.id+'">Reject</button>'+
    '</td>';
  }

  function renderUserActionsCell(c){
    if(STATE.confirmDeleteClaimId===c.id){
      return '<td class="actions-cell">'+
        '<button class="btn btn-sm btn-danger" data-action="delete-claim-confirm" data-id="'+c.id+'">Confirm?</button> '+
        '<button class="btn btn-sm btn-ghost" data-action="delete-claim-cancel" data-id="'+c.id+'">Cancel</button>'+
      '</td>';
    }
    if(c.status==='pending' || c.status==='rejected'){
      return '<td class="actions-cell">'+
        '<button class="btn btn-sm btn-ghost" data-action="start-edit-claim" data-id="'+c.id+'">Edit</button> '+
        '<button class="btn btn-sm btn-danger" data-action="delete-claim" data-id="'+c.id+'">Delete</button>'+
      '</td>';
    }
    return '<td> - </td>';
  }

  function renderRejectPanel(c){
    return '<div class="reject-panel">'+
      '<label>Rejection Reason<select data-field="reject-reason-'+c.id+'" data-action="reject-reason-select" data-id="'+c.id+'"><option value="">Select a reason...</option>'+
        STATE.rejectReasons.filter(function(r){ return r!=='Others'; }).map(function(r){ return '<option value="'+escapeHtml(r)+'">'+escapeHtml(r)+'</option>'; }).join('')+
        '<option value="Others">Others (please specify)</option>'+
      '</select></label>'+
      '<label id="reject-other-wrap-'+c.id+'" style="display:none;">Please Specify<input type="text" data-field="reject-other-'+c.id+'" placeholder="Type the reason..." /></label>'+
      '<label>Additional Note (optional)<input type="text" data-field="reject-note-'+c.id+'" placeholder="Add more detail..." /></label>'+
      '<div class="reject-actions">'+
        '<button class="btn btn-sm btn-danger" data-action="confirm-reject" data-id="'+c.id+'">Confirm Reject</button>'+
        '<button class="btn btn-sm btn-ghost" data-action="cancel-reject" data-id="'+c.id+'">Cancel</button>'+
      '</div></div>';
  }

  function renderClaimEditPanel(c){
    return '<div class="reject-panel">'+
      '<label>Benefit Category<select id="edit-category-'+c.id+'">'+
        STATE.benefits.map(function(b){ return '<option value="'+escapeHtml(b)+'" '+(b===c.category?'selected':'')+'>'+escapeHtml(b)+'</option>'; }).join('')+
      '</select></label>'+
      '<label>Vendor / Merchant<input type="text" id="edit-vendor-'+c.id+'" list="vendor-options-'+c.id+'" value="'+escapeHtml(c.vendor||'')+'" autocomplete="off"/></label>'+
      renderVendorDatalist('vendor-options-'+c.id)+
      '<label>Currency<select id="edit-currency-'+c.id+'">'+renderCurrencyOptions(c.currency)+'</select></label>'+
      '<label>Amount<input type="number" id="edit-amount-'+c.id+'" step="0.01" min="0.01" value="'+c.amount+'"/></label>'+
      '<div id="edit-amount-preview-'+c.id+'" class="tiny muted"></div>'+
      '<div id="edit-amount-live-error-'+c.id+'" class="field-error" style="display:none;"></div>'+
      '<label>Receipt Date<input type="date" id="edit-date-'+c.id+'" value="'+c.receipt_date+'" min="'+yearStartStr()+'" max="'+todayStr()+'"/></label>'+
      '<div class="field-hint">Only receipts from '+new Date().getFullYear()+' can be claimed - your benefits reset every 1 January.</div>'+
      '<label>Replace Receipt (optional)</label>'+
      '<div class="dropzone" id="edit-receipt-dropzone-'+c.id+'">'+
        '<input type="file" id="edit-receipt-'+c.id+'" accept="image/*,.pdf"/>'+
        '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
      '</div>'+
      (STATE.claimFormError ? '<div class="field-error">'+escapeHtml(STATE.claimFormError)+'</div>' : '')+
      (c.status==='rejected' ? '<div class="field-hint">Saving will resubmit this claim for review.</div>' : '')+
      '<div class="reject-actions">'+
        '<button class="btn btn-sm btn-primary" data-action="confirm-edit-claim" data-id="'+c.id+'">Save Changes</button>'+
        '<button class="btn btn-sm btn-ghost" data-action="cancel-edit-claim" data-id="'+c.id+'">Cancel</button>'+
      '</div></div>';
  }

  /* =========================================================
     ADMIN MODULE
  ========================================================== */
  function renderAdminShell(){
    var pendingCount = STATE.claims.filter(function(c){ return c.status==='pending'; }).length;
    var tab = STATE.activeTab || 'approvals';
    return '<div class="shell">'+renderTopbar()+
      '<div class="tabs">'+
        navTab('approvals','Pending Approvals'+(pendingCount?' <span class="badge">'+pendingCount+'</span>':''))+
        navTab('all','All Submissions')+
        navTab('staff','Employee Management')+
        navTab('benefits','Benefit Categories')+
        navTab('access','User Access')+
        navTab('finance','Finance')+
        navTab('reports','Reports')+
      '</div>'+
      '<div class="content">'+
        (tab==='all' ? renderAdminAllSubmissions() :
         tab==='staff' ? renderAdminStaff() :
         tab==='benefits' ? renderAdminBenefits() :
         tab==='access' ? renderAdminAccess() :
         tab==='finance' ? renderAdminFinance() :
         tab==='reports' ? renderAdminReports() :
         renderAdminApprovals())+
      '</div></div>';
  }

  function renderAdminApprovals(){
    var pending = STATE.claims.filter(function(c){ return c.status==='pending'; }).sort(function(a,b){ return a.submitted_at.localeCompare(b.submitted_at); });
    return '<div class="card"><div class="card-title">Pending Approvals'+(pending.length?' <span class="badge">'+pending.length+'</span>':'')+'</div>'+renderClaimsTable(pending,true,true,false)+'</div>';
  }

  function renderAdminAllSubmissions(){
    var searchQuery = STATE.allSubmissionsSearchQuery||'';
    var claims = STATE.claims.filter(function(c){ return claimMatchesSearch(c, searchQuery, true); }).slice().sort(function(a,b){ return b.submitted_at.localeCompare(a.submitted_at); });
    return '<div class="card"><div class="card-title">All Submissions</div>'+
      '<input type="text" id="all-submissions-search-input" class="search-input" placeholder="Search by employee, category, vendor, currency or status..." value="'+escapeHtml(searchQuery)+'" style="margin-bottom:12px;" />'+
      renderClaimsTable(claims,true,false,false)+'</div>';
  }

  function renderAdminStaff(){
    var roleFilter = STATE.staffRoleFilter || 'all';
    var visibleProfiles = STATE.profiles.filter(function(p){ return roleFilter==='all' || p.role===roleFilter; });
    var staffRows = visibleProfiles.map(function(p){
      var allocCell = STATE.editingAllocId===p.id
        ? '<input type="number" min="0" step="1" style="width:90px" id="alloc-input-'+p.id+'" value="'+p.annual_allocation+'"/> <button class="btn btn-sm btn-primary" data-action="save-alloc" data-id="'+p.id+'">Save</button>'
        : fmtMoney(p.annual_allocation)+' <button class="link-btn" data-action="edit-alloc" data-id="'+p.id+'">Edit</button>';
      var terminationCell = STATE.editingTerminationId===p.id
        ? '<input type="date" style="width:150px" id="termination-input-'+p.id+'" value="'+(p.date_of_termination||'')+'"/> <button class="btn btn-sm btn-primary" data-action="save-termination" data-id="'+p.id+'">Save</button>'
        : (p.date_of_termination ? fmtDate(p.date_of_termination) : '-')+' <button class="link-btn" data-action="edit-termination" data-id="'+p.id+'">Edit</button>';
      var actionsCell;
      if(STATE.confirmDeactivateId===p.id){
        actionsCell = '<button class="btn btn-sm btn-danger" data-action="toggle-active-confirm" data-id="'+p.id+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="toggle-active-cancel" data-id="'+p.id+'">Cancel</button>';
      } else if(STATE.confirmDeleteProfileId===p.id){
        actionsCell = '<button class="btn btn-sm btn-danger" data-action="delete-profile-confirm" data-id="'+p.id+'">Confirm Delete?</button> <button class="btn btn-sm btn-ghost" data-action="delete-profile-cancel" data-id="'+p.id+'">Cancel</button>';
      } else {
        actionsCell = '<button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button> '+
          '<button class="btn btn-sm btn-danger" data-action="delete-profile" data-id="'+p.id+'">Delete</button>';
      }
      var roleLabel = p.role==='admin' ? 'Admin' : 'User';
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+escapeHtml(p.email)+'</td>'+
        '<td><span class="role-chip">'+roleLabel+'</span></td>'+
        '<td>'+allocCell+'</td>'+
        '<td>'+fmtDate(p.date_of_joining)+'</td>'+
        '<td>'+(p.effective_date ? fmtDate(p.effective_date) : '-')+'</td>'+
        '<td>'+terminationCell+'</td>'+
        '<td><span class="status-pill '+(p.active?'status-approved':'status-rejected')+'">'+(p.active?'Active':'Inactive')+'</span></td>'+
        '<td class="actions-cell">'+actionsCell+'</td></tr>';
    }).join('');
    var staffFilters = [{key:'all',label:'All'},{key:'user',label:'User'},{key:'admin',label:'Admin'}];

    var pendingInvites = STATE.invites.filter(function(i){ return !i.used; });
    var inviteRows = pendingInvites.map(function(i){
      var welcomeCell;
      if(i.welcome_email_sent_at){
        welcomeCell = fmtDateTime(i.welcome_email_sent_at);
      } else if(i.effective_date){
        welcomeCell = '<span class="tiny muted">Scheduled for '+fmtDate(i.effective_date)+'</span>';
      } else {
        welcomeCell = '-';
      }
      return '<tr><td>'+escapeHtml(i.name)+'</td><td>'+escapeHtml(i.email)+'</td><td>'+fmtMoney(i.annual_allocation)+'</td>'+
        '<td>'+welcomeCell+'</td>'+
        '<td>'+(i.effective_date ? fmtDate(i.effective_date) : '-')+'</td>'+
        '<td>'+(STATE.confirmRevokeInvite===i.email
          ? '<button class="btn btn-sm btn-danger" data-action="revoke-invite-confirm" data-email="'+escapeHtml(i.email)+'">Confirm?</button> <button class="btn btn-sm btn-ghost" data-action="revoke-invite-cancel">Cancel</button>'
          : '<button class="btn btn-sm btn-ghost" data-action="revoke-invite" data-email="'+escapeHtml(i.email)+'">Revoke</button>')+
        '</td></tr>';
    }).join('');

    return ''+
    '<div class="card"><div class="card-title">Add Employee</div>'+
      '<form data-form="invite-staff" class="inline-form">'+
        '<label class="mini-field">Full Name<input type="text" name="name" placeholder="e.g. Jane Lim" required /></label>'+
        '<label class="mini-field">Work Email<input type="email" name="email" placeholder="jane@company.com" required /></label>'+
        '<label class="mini-field">Date of Employment<input type="date" name="dateOfEmployment" style="width:160px" required /></label>'+
        '<label class="mini-field">Effective Date<input type="date" name="effectiveDate" style="width:160px" required /></label>'+
        '<label class="mini-field">PayNow Mobile Number<input type="tel" name="paynowMobile" placeholder="e.g. 91234567" style="width:160px" required /></label>'+
        '<label class="mini-field">Entitlement (SGD)<input type="number" name="annualAllocation" value="1000" min="0" step="1" style="width:140px" required /></label>'+
        '<button type="submit" class="btn btn-primary">Add Employee</button>'+
      '</form>'+
      '<div class="field-hint">New employees are invited as Users. To grant Admin access, use the User Access tab after they\'ve signed up. A welcome email with sign-up instructions is sent automatically once the Effective Date arrives.</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Bulk Invite (CSV)</div>'+
      '<div class="muted small" style="margin-bottom:10px;">Columns: name,email,annualAllocation,dateOfEmployment,paynowMobile,effectiveDate. First row is treated as a header and skipped. The last three columns are optional.</div>'+
      '<div class="dropzone" id="staff-csv-dropzone">'+
        '<input type="file" id="staff-csv-input" accept=".csv" />'+
        '<div class="dropzone-hint">Choose a file, or drag and drop it here</div>'+
      '</div>'+
    '</div>'+
    (pendingInvites.length ? '<div class="card"><div class="card-title">Pending Employee New User Sign Up</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Allocation</th><th>Welcome Email Sent</th><th>Effective Date</th><th>Actions</th></tr></thead>'+
      '<tbody>'+inviteRows+'</tbody></table></div></div>' : '')+
    '<div class="card"><div class="card-title">Employee Directory</div>'+
      '<div class="filter-row">'+staffFilters.map(function(f){ return '<button class="chip-filter '+(roleFilter===f.key?'active':'')+'" data-action="filter-staff" data-filter="'+f.key+'">'+f.label+'</button>'; }).join('')+'</div>'+
      '<div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Annual Allocation</th><th>Date of Employment</th><th>Effective Date</th><th>Date of Termination</th><th>Status</th><th>Actions</th></tr></thead>'+
      '<tbody>'+staffRows+'</tbody></table></div>'+
      '<div class="field-hint">Deleting an employee removes their account, all their claim history, and their notifications - permanently, and this cannot be undone. Their login itself still technically exists in Supabase until removed from the dashboard\'s Authentication &gt; Users page too, but they won\'t be able to do anything with it here once deleted.</div>'+
    '</div>';
  }

  function renderAdminBenefits(){
    return '<div class="card"><div class="card-title">Add Benefit Category</div>'+
      '<form data-form="add-benefit" class="inline-form">'+
        '<input type="text" name="category" placeholder="e.g. Wellness" required />'+
        '<button type="submit" class="btn btn-primary">Add Category</button>'+
      '</form></div>'+
      '<div class="card"><div class="card-title">Current Benefit Categories</div>'+
      '<div class="chip-list">'+STATE.benefits.map(function(b){ return '<span class="chip">'+escapeHtml(b)+' <button class="chip-remove" data-action="remove-benefit" data-cat="'+escapeHtml(b)+'">x</button></span>'; }).join('')+'</div>'+
      '<div class="field-hint">Removing a category only affects future claims - historical submissions keep their original category.</div></div>';
  }

  function renderAdminAccess(){
    var rows = STATE.profiles.map(function(p){
      return '<tr><td>'+escapeHtml(p.name)+'</td><td>'+escapeHtml(p.email)+'</td>'+
        '<td><select data-action="change-role" data-id="'+p.id+'"><option value="user" '+(p.role==='user'?'selected':'')+'>User</option><option value="admin" '+(p.role==='admin'?'selected':'')+'>Admin</option></select></td>'+
        '<td>'+fmtDate((p.created_at||'').slice(0,10))+'</td>'+
        '<td>'+(!p.active && p.deactivated_at ? fmtDate((p.deactivated_at||'').slice(0,10)) : '-')+'</td>'+
        '<td><button class="btn btn-sm btn-ghost" data-action="toggle-active" data-id="'+p.id+'">'+(p.active?'Deactivate':'Activate')+'</button></td>'+
      '</tr>';
    }).join('');
    return '<div class="card"><div class="card-title">User Access Rights</div><div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Date Added</th><th>Date of Deactivation</th><th>Status</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table></div>'+
      '<div class="field-hint">Password resets are self-service - employees use "Forgot password?" on the login screen.</div></div>';
  }

  function sortArrow(col, activeCol, dir){
    if(col!==activeCol) return '';
    return dir==='asc' ? ' &uarr;' : ' &darr;';
  }
  function sortRows(rows, column, direction, getters){
    if(!column || !getters[column]) return rows;
    var getter = getters[column];
    var sorted = rows.slice().sort(function(a,b){ return getter(a)-getter(b); });
    if(direction==='desc') sorted.reverse();
    return sorted;
  }

  function renderAdminFinance(){
    var year = getSelectedInvoiceYear();
    var yearOptions = buildInvoiceYearOptions();
    var inv = computeAnnualInvoice(year);
    var invoiceDate = '2 Jan '+(year+1);
    var invoiceNumber = STATE.appSettings && STATE.appSettings['invoice_number_'+year];
    var invoiceNoLabel = invoiceNumber ? ('Invoice No: '+escapeHtml(invoiceNumber)) : 'Invoice No: assigned on export';

    var rateCell = STATE.editingInvoiceRate
      ? '<input type="number" min="0" step="0.01" style="width:100px" id="invoice-rate-input" value="'+inv.rate+'"/> <button class="btn btn-sm btn-primary" data-action="save-invoice-rate">Save</button>'
      : '<span class="muted">Rate: '+fmtMoney(inv.rate)+' / head / year</span> <button class="link-btn" data-action="edit-invoice-rate">Edit</button>';

    var empRows = inv.unutilizedByEmployee.map(function(e){
      return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtMoney(e.allocation)+'</td><td>'+fmtMoney(e.approved)+'</td><td>'+fmtMoney(e.unutilized)+'</td></tr>';
    }).join('');

    return ''+
    '<div class="card">'+
      '<div class="card-title-row">'+
        '<div class="card-title">Annual Invoice</div>'+
        '<div class="report-controls" style="margin-bottom:0;">'+
          '<select data-action="set-invoice-year">'+yearOptions.map(function(y){ return '<option value="'+y+'" '+(y===year?'selected':'')+'>'+y+'</option>'; }).join('')+'</select>'+
          '<button class="btn btn-ghost btn-sm" data-action="export-invoice-pdf">Export to PDF</button>'+
        '</div>'+
      '</div>'+
      '<div class="report-summary" style="margin-bottom:16px;">Period: 1 Jan '+year+' - 31 Dec '+year+' &middot; Invoice date '+invoiceDate+' &middot; '+invoiceNoLabel+' &middot; '+rateCell+'</div>'+
      '<div class="grid-cards">'+
        '<div class="card stat"><div class="stat-label">Total Headcount Charge</div><div class="stat-value">'+fmtMoney(inv.totalHeadcountCharge)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">Unutilised Benefit</div><div class="stat-value">'+fmtMoney(inv.totalUnutilized)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">Total Credit Note</div><div class="stat-value">'+fmtMoney(inv.creditNoteAmount)+'</div></div>'+
        '<div class="card stat"><div class="stat-label">'+(inv.netAmount>=0?'Net Amount Due':'Net Credit Balance')+'</div><div class="stat-value">'+fmtMoney(Math.abs(inv.netAmount))+'</div></div>'+
        '<div class="card stat highlight"><div class="stat-label">Invoice Payable Amount</div><div class="stat-value">'+fmtMoney(inv.invoicePayableAmount)+'</div></div>'+
      '</div>'+
    '</div>'+
    '<div class="card">'+
      '<div class="card-title">Calculation Detail</div>'+
      '<details><summary class="link-btn" style="cursor:pointer;">Headcount Adjustment (True-Up for '+year+')</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table"><tbody>'+
          '<tr><td>Headcount as at 1 Jan '+year+'</td><td>'+inv.startHeadcount+'</td></tr>'+
          '<tr><td>Headcount as at 31 Dec '+year+'</td><td>'+inv.endHeadcount+'</td></tr>'+
          '<tr><td>Net Change</td><td>'+inv.headcountDelta+'</td></tr>'+
          '<tr><td>Adjustment Units (Net Change &divide; 2)</td><td>'+inv.adjustmentUnits+'</td></tr>'+
          '<tr><td>Rate per Headcount</td><td>'+fmtMoney(inv.rate)+'</td></tr>'+
          '<tr><td><strong>Headcount Adjustment Amount</strong></td><td><strong>'+fmtMoney(inv.adjustmentAmount)+'</strong></td></tr>'+
        '</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Headcount Charge for '+(year+1)+' ('+inv.newYearHeadcount+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table"><tbody>'+
          '<tr><td>Headcount as at 1 Jan '+(year+1)+'</td><td>'+inv.newYearHeadcount+'</td></tr>'+
          '<tr><td>Rate per Headcount</td><td>'+fmtMoney(inv.rate)+'</td></tr>'+
          '<tr><td><strong>Base Headcount Charge</strong></td><td><strong>'+fmtMoney(inv.baseHeadcountCharge)+'</strong></td></tr>'+
          '<tr><td><strong>Total Headcount Charge (Base + Adjustment)</strong></td><td><strong>'+fmtMoney(inv.totalHeadcountCharge)+'</strong></td></tr>'+
        '</tbody></table></div>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.newYearHeadcountList.length ? inv.newYearHeadcountList.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="2" class="muted">No employees on record as at 1 Jan '+(year+1)+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Headcount as at 1 Jan '+year+' ('+inv.startHeadcountList.length+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.startHeadcountList.length ? inv.startHeadcountList.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="2" class="muted">No employees on record as at 1 Jan '+year+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">New Joiners in '+year+' ('+inv.newJoinersList.length+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Effective Date</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.newJoinersList.length ? inv.newJoinersList.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtDate(e.date)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="3" class="muted">No new joiners recorded in '+year+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Terminations in '+year+' ('+inv.terminationsList.length+' employees)</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Termination Date</th><th>Annual Allocation</th></tr></thead>'+
        '<tbody>'+(inv.terminationsList.length ? inv.terminationsList.map(function(e){ return '<tr><td>'+escapeHtml(e.name)+'</td><td>'+fmtDate(e.date)+'</td><td>'+fmtMoney(e.allocation)+'</td></tr>'; }).join('') : '<tr><td colspan="3" class="muted">No terminations recorded in '+year+'.</td></tr>')+'</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">Unutilised Benefit</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table"><tbody>'+
          '<tr><td>Total Entitlement Pool for '+year+'</td><td>'+fmtMoney(inv.totalEntitlementPool)+'</td></tr>'+
          '<tr><td>Total Approved Claims for '+year+'</td><td>'+fmtMoney(inv.totalApprovedForYear)+'</td></tr>'+
          '<tr><td>Total Unutilised Amount</td><td>'+fmtMoney(inv.totalUnutilized)+'</td></tr>'+
        '</tbody></table></div>'+
      '</details>'+
      '<details style="margin-top:12px;"><summary class="link-btn" style="cursor:pointer;">By Employee</summary>'+
        '<div class="table-wrap" style="margin-top:10px;"><table class="data-table">'+
        '<thead><tr><th>Employee</th><th>Entitlement</th><th>Approved Claims</th><th>Unutilised</th></tr></thead>'+
        '<tbody>'+empRows+'</tbody></table></div>'+
      '</details>'+
      '<div class="field-hint" style="margin-top:14px;">Credit note balance can be applied to offset next year\'s benefit charges.</div>'+
    '</div>';
  }

  function renderAdminReports(){
    var now = new Date();
    var currentYearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var currentMonthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(currentYearValue, currentMonthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);
    var yearOptions = buildReportYearOptions(STATE.claims);
    var isYtd = currentYearValue==='ytd';
    var searchQuery = (STATE.reportSearchQuery||'').trim().toLowerCase();
    var matchedCategories = searchQuery ? STATE.benefits.filter(function(b){ return b.toLowerCase().indexOf(searchQuery)!==-1; }) : [];
    var categoryScoped = matchedCategories.length > 0;

    var empRowData = STATE.profiles.filter(function(p){ return p.role==='user'; }).map(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0,categories:{}};
      var allCatKeys = Object.keys(r.categories||{});
      var nameMatches = searchQuery && p.name.toLowerCase().indexOf(searchQuery)!==-1;
      return {p:p, r:r, allCatKeys:allCatKeys, nameMatches:nameMatches};
    }).filter(function(row){
      if(!searchQuery) return true;
      if(row.nameMatches) return true;
      if(categoryScoped){ return row.allCatKeys.some(function(cat){ return matchedCategories.indexOf(cat)!==-1; }); }
      return false;
    }).map(function(row){
      var showCatKeys = (categoryScoped && !row.nameMatches) ? row.allCatKeys.filter(function(cat){ return matchedCategories.indexOf(cat)!==-1; }) : row.allCatKeys;
      var displayCount = 0, displayTotal = 0;
      showCatKeys.forEach(function(cat){ displayCount += row.r.categories[cat].count; displayTotal += row.r.categories[cat].total; });
      var pct = row.p.annual_allocation>0 ? (displayTotal/row.p.annual_allocation*100) : 0;
      var catBreakdown = showCatKeys.length
        ? showCatKeys.map(function(cat){ return escapeHtml(cat)+': '+fmtMoney(row.r.categories[cat].total); }).join(', ')
        : '-';
      return {name:row.p.name, count:displayCount, total:displayTotal, allocation:row.p.annual_allocation, pct:pct, catBreakdown:catBreakdown};
    });
    empRowData = sortRows(empRowData, STATE.reportSortColumn, STATE.reportSortDirection, {
      count: function(r){ return r.count; }, total: function(r){ return r.total; },
      allocation: function(r){ return r.allocation; }, pct: function(r){ return r.pct; }
    });
    var empRows = empRowData.map(function(r){
      return '<tr><td>'+escapeHtml(r.name)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td><td>'+fmtMoney(r.allocation)+'</td><td>'+r.pct.toFixed(1)+'%</td><td class="tiny">'+r.catBreakdown+'</td></tr>';
    }).join('');

    var rejSearchQuery = (STATE.rejectedSearchQuery||'').trim().toLowerCase();
    var rejRowData = Object.keys(report.byEmployeeRejected).map(function(empId){
      var r = report.byEmployeeRejected[empId];
      var reasonBreakdown = Object.keys(r.reasons).map(function(reason){
        var n = r.reasons[reason];
        return escapeHtml(reason)+(n>1 ? ' x'+n : '');
      }).join(', ');
      return {name:r.name, count:r.count, total:r.total, reasonBreakdown:reasonBreakdown};
    }).filter(function(row){
      if(!rejSearchQuery) return true;
      if(row.name.toLowerCase().indexOf(rejSearchQuery)!==-1) return true;
      return row.reasonBreakdown.toLowerCase().indexOf(rejSearchQuery)!==-1;
    });
    rejRowData = sortRows(rejRowData, STATE.rejectedSortColumn, STATE.rejectedSortDirection, {
      count: function(r){ return r.count; }, total: function(r){ return r.total; }
    });
    var rejectedRows = rejRowData.map(function(r){
      return '<tr><td>'+escapeHtml(r.name)+'</td><td>'+r.count+'</td><td>'+fmtMoney(r.total)+'</td><td class="tiny">'+r.reasonBreakdown+'</td></tr>';
    }).join('');

    var clientNameCell = STATE.editingClientName
      ? '<input type="text" maxlength="120" style="width:180px" id="client-name-input" value="'+escapeHtml(getClientCompanyName())+'"/> <button class="btn btn-sm btn-primary" data-action="save-client-name">Save</button>'
      : '<span class="muted">Prepared for: '+escapeHtml(getClientCompanyName())+'</span> <button class="link-btn" data-action="edit-client-name">Edit</button>';

    return ''+
    '<div class="card"><div class="card-title">Monthly Utilisation Report</div>'+
      '<div class="report-controls">'+
        '<select data-action="set-report-month" '+(isYtd?'disabled':'')+'>'+REPORT_MONTH_NAMES.map(function(mn,i){ return '<option value="'+i+'" '+(i===currentMonthValue?'selected':'')+'>'+mn+'</option>'; }).join('')+'</select>'+
        '<select data-action="set-report-year">'+yearOptions.map(function(o){ return '<option value="'+o.value+'" '+(o.value===currentYearValue?'selected':'')+'>'+escapeHtml(o.label)+'</option>'; }).join('')+'</select>'+
        '<button class="btn btn-ghost btn-sm" data-action="export-report">Export to Excel</button>'+
        '<button class="btn btn-ghost btn-sm" data-action="export-report-pdf">Export to PDF for HR</button>'+
      '</div>'+
      '<div class="field-hint" style="margin:10px 0;">'+clientNameCell+'</div>'+
      '<div class="report-summary">'+escapeHtml(period.label)+' - Total claimed (approved): <strong>'+fmtMoney(report.totalClaimed)+'</strong> across <strong>'+report.totalCount+'</strong> submission(s). '+
        '<strong>'+report.totalRejectedCount+'</strong> submission(s) rejected, totaling <strong>'+fmtMoney(report.totalRejectedAmount)+'</strong>.</div>'+
    '</div>'+
    '<div class="card"><div class="card-title">By Employee</div>'+
      '<input type="text" id="report-search-input" class="search-input" placeholder="Search by employee name or benefit category..." value="'+escapeHtml(STATE.reportSearchQuery||'')+'" style="margin-bottom:12px;" />'+
      (categoryScoped ? '<div class="muted small" style="margin-bottom:10px;">Showing # Claims and Amount Claimed for '+matchedCategories.map(escapeHtml).join(', ')+' only.</div>' : '')+
      '<div class="table-wrap"><table class="data-table">'+
      '<thead><tr><th>Employee</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="count"># Claims'+sortArrow('count',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="total">Amount Claimed'+sortArrow('total',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="allocation">Entitlement (SGD)'+sortArrow('allocation',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th class="sortable-th" data-action="sort-report-emp" data-column="pct">Utilisation %'+sortArrow('pct',STATE.reportSortColumn,STATE.reportSortDirection)+'</th>'+
        '<th>Category Breakdown</th></tr></thead><tbody>'+empRows+'</tbody></table></div>'+
    '</div>'+
    '<div class="card"><div class="card-title">Rejected Claims</div>'+
      '<input type="text" id="rejected-search-input" class="search-input" placeholder="Search by employee name or reason..." value="'+escapeHtml(STATE.rejectedSearchQuery||'')+'" style="margin-bottom:12px;" />'+
      (rejectedRows ? '<div class="table-wrap"><table class="data-table">'+
        '<thead><tr><th>Employee</th>'+
          '<th class="sortable-th" data-action="sort-report-rejected" data-column="count"># Claims Rejected'+sortArrow('count',STATE.rejectedSortColumn,STATE.rejectedSortDirection)+'</th>'+
          '<th class="sortable-th" data-action="sort-report-rejected" data-column="total">Amount Rejected'+sortArrow('total',STATE.rejectedSortColumn,STATE.rejectedSortDirection)+'</th>'+
          '<th>Reasons</th></tr></thead><tbody>'+rejectedRows+'</tbody></table></div>'
        : '<div class="empty-state">No rejected claims for this period.</div>')+
    '</div>';
  }

  function drawBarChart(doc, x, y, width, height, data, opts){
    opts = opts||{};
    var maxVal = Math.max.apply(null, data.map(function(d){ return d.value; })) || 1;
    var barCount = data.length;
    if(!barCount) return;
    var gap = 6;
    var barWidth = Math.min(28, (width - gap*(barCount-1)) / barCount);
    var usedWidth = barWidth*barCount + gap*(barCount-1);
    var startX = x + (width-usedWidth)/2;
    var chartBottom = y + height;
    doc.setDrawColor(210,210,210);
    doc.line(x, chartBottom, x+width, chartBottom);
    data.forEach(function(d, i){
      var barHeight = (d.value/maxVal) * (height-24);
      var barX = startX + i*(barWidth+gap);
      var barY = chartBottom - barHeight;
      doc.setFillColor(19,78,74);
      doc.rect(barX, barY, barWidth, barHeight, 'F');
      doc.setFontSize(7);
      doc.setTextColor(90,90,90);
      var valueLabel = opts.valueFormat ? opts.valueFormat(d.value) : String(d.value);
      doc.text(valueLabel, barX+barWidth/2, barY-3, {align:'center'});
      doc.setFontSize(7);
      doc.setTextColor(40,40,40);
      var labelLines = doc.splitTextToSize(d.label, barWidth+gap);
      doc.text(labelLines.slice(0,2), barX+barWidth/2, chartBottom+8, {align:'center'});
    });
  }

  function exportReportExcel(){
    if(typeof XLSX==='undefined'){ showToast('Excel export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var yearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var monthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(yearValue, monthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);

    var summaryData = [['Utilisation Report'],[period.label],[],
      ['Total Claimed (Approved)', Number(report.totalClaimed.toFixed(2))],
      ['Total Submissions', report.totalCount],
      ['Total Rejected Submissions', report.totalRejectedCount],
      ['Total Rejected Amount', Number(report.totalRejectedAmount.toFixed(2))]];
    var catData = [['Category','Number of Claims','Amount Claimed']];
    STATE.benefits.forEach(function(b){ var r=report.byCategory[b]||{count:0,total:0}; catData.push([b, r.count, Number(r.total.toFixed(2))]); });
    var empData = [['Employee','PayNow Mobile','Number of Claims','Amount Claimed','Entitlement (SGD)','Utilisation %']];
    STATE.profiles.filter(function(p){ return p.role==='user'; }).forEach(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      empData.push([p.name, p.paynow_mobile||'', r.count, Number(r.total.toFixed(2)), Number(p.annual_allocation), Number(pct.toFixed(1))]);
    });
    var rejData = [['Employee','Category','Amount','Reason']];
    report.rejectedClaims.forEach(function(rc){ rejData.push([rc.employeeName, rc.category, Number(rc.amount.toFixed(2)), rc.reason]); });

    try{
      var wb = XLSX.utils.book_new();
      var wsSummary = XLSX.utils.aoa_to_sheet(summaryData); wsSummary['!cols']=[{wch:28},{wch:16}];
      var wsCat = XLSX.utils.aoa_to_sheet(catData); wsCat['!cols']=[{wch:24},{wch:16},{wch:14}];
      var wsEmp = XLSX.utils.aoa_to_sheet(empData); wsEmp['!cols']=[{wch:24},{wch:16},{wch:14},{wch:14},{wch:16},{wch:14}];
      var wsRej = XLSX.utils.aoa_to_sheet(rejData); wsRej['!cols']=[{wch:24},{wch:18},{wch:12},{wch:40}];
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');
      XLSX.utils.book_append_sheet(wb, wsCat, 'By Category');
      XLSX.utils.book_append_sheet(wb, wsEmp, 'By Employee');
      XLSX.utils.book_append_sheet(wb, wsRej, 'Rejected Claims');
      XLSX.writeFile(wb, 'utilisation-report-'+period.fileSuffix+'.xlsx');
    }catch(err){
      console.error(err);
      showToast('Something went wrong building the Excel file.', 'error');
    }
  }

  function exportReportPDF(){
    if(typeof window.jspdf==='undefined' || !window.jspdf.jsPDF){ showToast('PDF export library did not load (needs an internet connection).', 'error'); return; }
    var now = new Date();
    var yearValue = (STATE.reportYear!=null) ? String(STATE.reportYear) : String(now.getFullYear());
    var monthValue = (STATE.reportMonth!=null) ? STATE.reportMonth : now.getMonth();
    var period = resolveReportPeriod(yearValue, monthValue);
    var report = buildPeriodReport(STATE.claims, period.startDate, period.endDate);
    var periodLabel = period.label;
    var employees = STATE.profiles.filter(function(p){ return p.role==='user'; });

    var empStats = employees.map(function(p){
      var r = report.byEmployee[p.id]||{count:0,total:0};
      var pct = p.annual_allocation>0 ? (r.total/p.annual_allocation*100) : 0;
      return {name:p.name, count:r.count, total:r.total, allocation:Number(p.annual_allocation)||0, pct:pct};
    });
    var totalEntitlementPool = employees.reduce(function(s,p){ return s+(Number(p.annual_allocation)||0); }, 0);
    var overallUtilPct = totalEntitlementPool>0 ? (report.totalClaimed/totalEntitlementPool*100) : 0;
    var zeroUsageCount = empStats.filter(function(e){ return e.count===0; }).length;
    var highUsageCount = empStats.filter(function(e){ return e.pct>=80; }).length;
    var categoryTotals = STATE.benefits.map(function(b){ return {name:b, total:(report.byCategory[b]||{total:0}).total}; }).sort(function(a,b){ return b.total-a.total; });
    var topCategory = categoryTotals.length && categoryTotals[0].total>0 ? categoryTotals[0] : null;
    var rejectionReasonCounts = {};
    report.rejectedClaims.forEach(function(rc){ rejectionReasonCounts[rc.reason] = (rejectionReasonCounts[rc.reason]||0)+1; });
    var topRejectionReason = Object.keys(rejectionReasonCounts).sort(function(a,b){ return rejectionReasonCounts[b]-rejectionReasonCounts[a]; })[0];
    var totalSubmissions = report.totalCount + report.totalRejectedCount;
    var rejectionRate = totalSubmissions>0 ? (report.totalRejectedCount/totalSubmissions*100) : 0;

    try{
      var doc = new window.jspdf.jsPDF({unit:'mm', format:'a4'});
      var pageWidth = doc.internal.pageSize.getWidth();
      var pageHeight = doc.internal.pageSize.getHeight();
      var margin = 15;
      var brandColor = [19,78,74];

      /* ---- Page 1: Cover, Key Metrics, Key Insights ---- */
      doc.setFillColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.rect(0, 0, pageWidth, 38, 'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(19);
      doc.text('Flex Benefits Portal', margin, 18);
      doc.setFontSize(11);
      doc.text('Monthly Utilisation Report - '+periodLabel, margin, 27);
      doc.setFontSize(9);
      doc.text('CJM (Singapore) Pte Ltd  |  Prepared for '+getClientCompanyName(), margin, 34);

      doc.setTextColor(40,40,40);
      doc.setFontSize(9);
      doc.text('Generated '+fmtDate(todayStr()), margin, 46);

      var cy = 54;
      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Key Metrics', margin, cy);
      var metrics = [
        ['Total Claimed (Approved)', fmtMoney(report.totalClaimed)+' SGD'],
        ['Total Entitlement Pool', fmtMoney(totalEntitlementPool)+' SGD'],
        ['Overall Utilisation', overallUtilPct.toFixed(1)+'%'],
        ['Approved Submissions', String(report.totalCount)],
        ['Rejected Submissions', report.totalRejectedCount+' ('+rejectionRate.toFixed(1)+'% rejection rate)'],
        ['Employees With Zero Usage', zeroUsageCount+' of '+employees.length],
        ['Employees Above 80% Utilisation', String(highUsageCount)]
      ];
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: metrics, theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:85}}
      });
      cy = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Key Insights', margin, cy); cy += 6;
      doc.setFontSize(10); doc.setTextColor(40,40,40);
      var insights = [];
      if(topCategory) insights.push('The most utilised benefit this period is '+topCategory.name+', accounting for '+fmtMoney(topCategory.total)+' SGD.');
      if(zeroUsageCount>0) insights.push(zeroUsageCount+' employee(s) submitted no claims this period - consider a reminder or awareness push.');
      if(highUsageCount>0) insights.push(highUsageCount+' employee(s) have used 80% or more of their entitlement this period.');
      if(topRejectionReason) insights.push('The most common rejection reason is "'+topRejectionReason+'" ('+rejectionReasonCounts[topRejectionReason]+' occurrence(s)).');
      if(!insights.length) insights.push('No notable trends to highlight for this period.');
      insights.forEach(function(line){
        var split = doc.splitTextToSize('- '+line, pageWidth-margin*2-4);
        doc.text(split, margin, cy);
        cy += split.length*5 + 2;
      });

      var catChartData = STATE.benefits.map(function(b){
        var r = report.byCategory[b]||{count:0,total:0};
        return {label:b, value:Number(r.total.toFixed(2))};
      });
      cy += 8;
      if(cy > pageHeight-75){ doc.addPage(); cy = 20; }
      doc.setFontSize(12); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Amount Claimed by Category', margin, cy);
      drawBarChart(doc, margin, cy+6, pageWidth-margin*2, 55, catChartData, {valueFormat:function(v){ return fmtMoney(v); }});

      /* ---- Page: Category + Employee tables ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('By Benefit Category', margin, 18);
      var catRows = STATE.benefits.map(function(b){
        var r = report.byCategory[b]||{count:0,total:0};
        return [b, String(r.count), fmtMoney(r.total)];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Category','# Claims','Amount Claimed (SGD)']], body: catRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      var empSorted = empStats.slice().sort(function(a,b){ return b.pct-a.pct; });
      var empChartTop = doc.lastAutoTable.finalY + 14;
      doc.setFontSize(12); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Top Employees by Amount Claimed', margin, empChartTop);
      var topEmp = empStats.slice().sort(function(a,b){ return b.total-a.total; }).slice(0,8)
        .map(function(e){ return {label:e.name, value:Number(e.total.toFixed(2))}; });
      if(topEmp.length){
        drawBarChart(doc, margin, empChartTop+6, pageWidth-margin*2, 55, topEmp, {valueFormat:function(v){ return fmtMoney(v); }});
      } else {
        doc.setFontSize(9); doc.setTextColor(120,120,120);
        doc.text('No approved claims this period.', margin, empChartTop+15);
      }

      /* ---- Page: Full employee table, sorted by utilisation ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('By Employee - '+periodLabel, margin, 18);
      var empRows = empSorted.map(function(e){
        return [e.name, String(e.count), fmtMoney(e.total), fmtMoney(e.allocation), e.pct.toFixed(1)+'%'];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Employee','# Claims','Amount Claimed (SGD)','Entitlement (SGD)','Utilisation %']], body: empRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      /* ---- Page: Rejected claims ---- */
      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Rejected Claims - '+periodLabel, margin, 18);
      if(report.rejectedClaims.length){
        var rejRows = report.rejectedClaims.map(function(rc){
          return [rc.employeeName, rc.category, fmtMoney(rc.amount), rc.reason];
        });
        doc.autoTable({
          startY: 24, margin:{left:margin, right:margin},
          head:[['Employee','Category','Amount (SGD)','Reason']], body: rejRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:8},
          columnStyles:{3:{cellWidth:70}}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No rejected claims this period.', margin, 30);
      }

      doc.save('flex-benefits-hr-report-'+period.fileSuffix+'.pdf');
    }catch(err){
      console.error(err);
      showToast('Could not generate the PDF. Check the console for details.', 'error');
    }
  }

  function exportInvoicePDF(invoiceNumber){
    if(typeof window.jspdf==='undefined' || !window.jspdf.jsPDF){ showToast('PDF export library did not load (needs an internet connection).', 'error'); return; }
    var year = getSelectedInvoiceYear();
    var inv = computeAnnualInvoice(year);
    var invoiceDate = '2 Jan '+(year+1);
    var adjustmentLabel = inv.adjustmentAmount>=0 ? 'Additional Headcount Charge' : 'Headcount Reduction Credit';

    try{
      var doc = new window.jspdf.jsPDF({unit:'mm', format:'a4'});
      var pageWidth = doc.internal.pageSize.getWidth();
      var margin = 15;
      var brandColor = [19,78,74];

      doc.setFillColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.rect(0, 0, pageWidth, 38, 'F');
      var logoW = 42, logoH = logoW*(90/285);
      doc.setFillColor(255,255,255);
      doc.roundedRect(margin-4, 7, logoW+8, logoH+8, 2, 2, 'F');
      doc.addImage(LOGO_DATA_URI, 'PNG', margin, 11, logoW, logoH);
      doc.setTextColor(255,255,255);
      doc.setFontSize(15);
      doc.text('Annual Invoice', pageWidth-margin, 17, {align:'right'});
      doc.setFontSize(10);
      doc.text('Headcount Adjustment & Credit Note', pageWidth-margin, 24, {align:'right'});
      doc.setFontSize(9);
      doc.text('Flex Benefits Portal by CJM (Singapore) Pte Ltd', pageWidth-margin, 32, {align:'right'});

      doc.setTextColor(40,40,40);
      doc.setFontSize(9);
      doc.text('Invoice Date: '+invoiceDate, margin, 46);
      doc.text('Invoice No: '+invoiceNumber, margin, 52);
      doc.text('Period Covered: 1 Jan '+year+' - 31 Dec '+year, margin, 58);

      var cy = 68;
      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount Adjustment (True-Up for '+year+')', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Headcount as at 1 Jan '+year, String(inv.startHeadcount)],
          ['Headcount as at 31 Dec '+year, String(inv.endHeadcount)],
          ['Net Change', String(inv.headcountDelta)],
          ['Adjustment Units (Net Change / 2)', String(inv.adjustmentUnits)],
          ['Rate per Headcount per Year', fmtMoney(inv.rate)],
          [adjustmentLabel, fmtMoney(Math.abs(inv.adjustmentAmount))]
        ],
        theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 12;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount Charge for '+(year+1), margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Headcount as at 1 Jan '+(year+1), String(inv.newYearHeadcount)],
          ['Rate per Headcount per Year', fmtMoney(inv.rate)],
          ['Base Headcount Charge', fmtMoney(inv.baseHeadcountCharge)],
          ['Total Headcount Charge (Base + Adjustment)', fmtMoney(inv.totalHeadcountCharge)]
        ],
        theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 12;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Unutilised Benefit (Credit Note)', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Total Entitlement Pool for '+year, fmtMoney(inv.totalEntitlementPool)],
          ['Total Approved Claims for '+year, fmtMoney(inv.totalApprovedForYear)],
          ['Total Unutilised Amount', fmtMoney(inv.totalUnutilized)]
        ],
        theme:'plain', styles:{fontSize:10, cellPadding:1.5},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 12;

      doc.setFontSize(13); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Invoice Summary', margin, cy);
      doc.autoTable({
        startY: cy+4, margin:{left:margin, right:margin},
        body: [
          ['Additional Headcount Charge', fmtMoney(inv.additionalCharge)],
          ['Base Headcount Charge for '+(year+1), fmtMoney(inv.baseHeadcountCharge)],
          ['Less: Credit Note (Unutilised + Headcount Reduction)', '-'+fmtMoney(inv.creditNoteAmount)],
          [inv.netAmount>=0?'Net Amount Due':'Net Credit Balance', fmtMoney(Math.abs(inv.netAmount))],
          ['Invoice Payable Amount', fmtMoney(inv.invoicePayableAmount)]
        ],
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:10, cellPadding:2},
        columnStyles:{0:{fontStyle:'bold', cellWidth:110}}
      });
      cy = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8); doc.setTextColor(120,120,120);
      var noteLines = doc.splitTextToSize('Note: Any credit note balance may be applied to offset the following year\'s flex benefit charges.', pageWidth-margin*2);
      doc.text(noteLines, margin, cy);

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount as at 1 Jan '+(year+1)+' - by Employee', margin, 18);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Supporting detail for the base headcount charge above. '+inv.newYearHeadcountList.length+' employee(s) counted.', margin, 24);
      if(inv.newYearHeadcountList.length){
        var newYearHcRows = inv.newYearHeadcountList.map(function(e){ return [e.name, fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: 30, margin:{left:margin, right:margin},
          head:[['Employee','Annual Allocation (SGD)']], body: newYearHcRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No employees on record as at 1 Jan '+(year+1)+'.', margin, 34);
      }

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Headcount as at 1 Jan '+year+' - by Employee', margin, 18);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Supporting detail for the headcount adjustment above. '+inv.startHeadcountList.length+' employee(s) counted.', margin, 24);
      if(inv.startHeadcountList.length){
        var startHcRows = inv.startHeadcountList.map(function(e){ return [e.name, fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: 30, margin:{left:margin, right:margin},
          head:[['Employee','Annual Allocation (SGD)']], body: startHcRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No employees on record as at 1 Jan '+year+'.', margin, 34);
      }

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('New Joiners in '+year, margin, 18);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Sorted by Effective Date - the joiners behind the net change above.', margin, 24);
      var joinersCy = 30;
      if(inv.newJoinersList.length){
        var joinerRows = inv.newJoinersList.map(function(e){ return [e.name, fmtDate(e.date), fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: joinersCy, margin:{left:margin, right:margin},
          head:[['Employee','Effective Date','Annual Allocation (SGD)']], body: joinerRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
        joinersCy = doc.lastAutoTable.finalY + 16;
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No new joiners recorded in '+year+'.', margin, 34);
        joinersCy = 46;
      }

      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Terminations in '+year, margin, joinersCy);
      doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text('Sorted by Termination Date - the departures behind the net change above.', margin, joinersCy+6);
      if(inv.terminationsList.length){
        var terminationRows = inv.terminationsList.map(function(e){ return [e.name, fmtDate(e.date), fmtMoney(e.allocation)]; });
        doc.autoTable({
          startY: joinersCy+12, margin:{left:margin, right:margin},
          head:[['Employee','Termination Date','Annual Allocation (SGD)']], body: terminationRows,
          theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
        });
      } else {
        doc.setFontSize(10); doc.setTextColor(120,120,120);
        doc.text('No terminations recorded in '+year+'.', margin, joinersCy+16);
      }

      doc.addPage();
      doc.setFontSize(14); doc.setTextColor(brandColor[0],brandColor[1],brandColor[2]);
      doc.text('Unutilised Amount by Employee - '+year, margin, 18);
      var empRows = inv.unutilizedByEmployee.map(function(e){
        return [e.name, fmtMoney(e.allocation), fmtMoney(e.approved), fmtMoney(e.unutilized)];
      });
      doc.autoTable({
        startY: 24, margin:{left:margin, right:margin},
        head:[['Employee','Entitlement (SGD)','Approved Claims (SGD)','Unutilised (SGD)']], body: empRows,
        theme:'grid', headStyles:{fillColor:brandColor}, styles:{fontSize:9}
      });

      doc.save('flex-benefits-invoice-'+year+'.pdf');
    }catch(err){
      console.error(err);
      showToast('Could not generate the invoice PDF. Check the console for details.', 'error');
    }
  }

  /* =========================================================
     ACTION HANDLERS - AUTH
  ========================================================== */
  function doLogin(form){
    var email = form.email.value.trim();
    var password = form.password.value;
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Logging in...';
    return supabase.auth.signInWithPassword({email:email, password:password}).then(function(res){
      if(res.error){ STATE.authError = res.error.message; render(); return; }
      STATE.authError=''; STATE.authInfo=''; STATE.session = res.data.session;
      STATE.loading = true; render();
      return loadProfileAndData().then(function(){
        STATE.loading=false;
        STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard';
        render();
        subscribeRealtime();
      }).catch(function(err){
        STATE.loading=false; STATE.session=null; STATE.profile=null;
        if(err.message!=='deactivated'){ STATE.authError = err.message; }
        render();
      });
    });
  }

  function doSignup(form){
    var email = form.email.value.trim();
    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;
    if(password !== confirmPassword){ STATE.authError='Passwords do not match.'; render(); return Promise.resolve(); }
    if(password.length < 6){ STATE.authError='Password must be at least 6 characters.'; render(); return Promise.resolve(); }
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Creating account...';
    var redirectTo = window.location.origin + window.location.pathname;
    return supabase.auth.signUp({email:email, password:password, options:{emailRedirectTo:redirectTo}}).then(function(res){
      if(res.error){
        var msg = res.error.message || '';
        if(/already registered|already exists|already been registered/i.test(msg)){
          STATE.authError = 'This email is already registered. Please log in instead.';
          showToast('This email is already registered - try logging in instead.', 'error');
        } else {
          STATE.authError = msg;
          render();
        }
        return;
      }
      var alreadyRegistered = res.data && res.data.user && Array.isArray(res.data.user.identities) && res.data.user.identities.length===0;
      if(alreadyRegistered){
        STATE.authError = 'This email is already registered. Please log in instead.';
        showToast('This email is already registered - try logging in instead.', 'error');
        return;
      }
      if(res.data.session){
        STATE.session = res.data.session;
        STATE.loading = true; render();
        return loadProfileAndData().then(function(){
          STATE.loading=false;
          STATE.activeTab = STATE.profile.role==='admin' ? 'approvals' : 'dashboard';
          render();
          subscribeRealtime();
        });
      }
      STATE.authView='login'; STATE.authError='';
      STATE.authInfo='Account created! Check your email to confirm, then log in.';
      render();
    });
  }

  function handleForgotPassword(){
    var emailInput = document.querySelector('form[data-form="login"] input[name="email"]');
    var email = emailInput ? emailInput.value.trim() : '';
    if(!email){ showToast('Enter your email above first, then click "Forgot password?".', 'error'); return Promise.resolve(); }
    STATE.authError = ''; render();
    var btn = document.querySelector('[data-action="forgot-password"]');
    var originalLabel = btn ? btn.textContent : '';
    if(btn){ btn.disabled = true; btn.textContent = 'Sending...'; }
    var redirectTo = window.location.origin + window.location.pathname;
    return withTimeout(supabase.auth.resetPasswordForEmail(email, {redirectTo:redirectTo}), 8000, 'Password reset request').then(function(res){
      if(res.error){ showToast('Could not send reset email: '+res.error.message, 'error'); return; }
      showToast('Password reset email sent - check your inbox.', 'success');
    }).catch(function(err){
      showToast('Could not send reset email: '+((err && err.message) || err), 'error');
    }).then(function(){
      if(btn){ btn.disabled = false; btn.textContent = originalLabel || 'Forgot password?'; }
    });
  }

  /* =========================================================
     ACTION HANDLERS - CLAIMS
  ========================================================== */
  function openReceiptModal(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    if(!claim || !claim.receipt_path) return;
    supabase.storage.from('receipts').createSignedUrl(claim.receipt_path, 120).then(function(res){
      if(res.error){ showToast('Could not load receipt.', 'error'); return; }
      STATE.modal = {type:'image', src:res.data.signedUrl, title:claim.category+' - '+fmtDate(claim.receipt_date), isImage:isImageName(claim.receipt_name), name:claim.receipt_name};
      render();
    });
  }

  function uploadReceipt(file){
    var ext = (file.name.split('.').pop()||'bin').toLowerCase();
    var path = STATE.session.user.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2,8) + '.' + ext;
    return supabase.storage.from('receipts').upload(path, file).then(function(res){
      if(res.error) throw res.error;
      return {path:path, name:file.name};
    });
  }

  function submitClaim(form){
    var category = form.category.value;
    var vendor = form.vendor.value.trim();
    var currency = form.currency.value || 'SGD';
    var amount = parseFloat(form.amount.value);
    var receiptDate = form.receiptDate.value;
    var file = form.receipt.files[0];
    if(!category || !vendor || !amount || amount<=0 || !receiptDate || !file){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }
    if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return Promise.resolve(); }

    var currentYear = new Date().getFullYear();
    var receiptYear = new Date(receiptDate+'T00:00:00').getFullYear();
    if(receiptYear !== currentYear){
      STATE.claimFormError = 'This receipt is dated '+fmtDate(receiptDate)+', which is not from '+currentYear+'. Only '+currentYear+' receipts can be claimed - your benefits reset every 1 January.';
      render();
      return Promise.resolve();
    }

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Checking exchange rate...';

    return getExchangeRateToSGD(currency).then(function(rate){
      var amountSgd = Math.round(amount*rate*100)/100;
      var wallet = computeWallet(STATE.profile.id);
      if(amountSgd > wallet.available){
        STATE.claimFormError = 'This comes to '+fmtMoney(amountSgd)+' SGD, which is more than your available balance of '+fmtMoney(wallet.available)+'.';
        render();
        return null;
      }
      STATE.claimFormError = null;
      btn.textContent = 'Uploading...';
      return uploadReceipt(file).then(function(receipt){
        return supabase.from('claims').insert({
          employee_id: STATE.session.user.id, category:category, vendor:vendor,
          amount:amount, currency:currency, amount_sgd:amountSgd, exchange_rate:rate,
          receipt_date:receiptDate, receipt_path:receipt.path, receipt_name:receipt.name, status:'pending'
        });
      });
    }).then(function(res){
      if(res===null) return;
      if(res.error) throw res.error;
      showToast('Claim submitted successfully and is pending review.', 'success');
      STATE.activeTab = 'history';
      return loadAppData();
    }).then(function(){ render(); }).catch(function(err){
      console.error(err);
      showToast('Something went wrong: '+(err.message||err), 'error');
      render();
    });
  }

  function approveClaim(id){
    return supabase.from('claims').update({status:'approved', decided_at:new Date().toISOString()}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not approve claim: '+res.error.message, 'error'); return; }
      showToast('Claim approved.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function confirmReject(id){
    var reasonSel = document.querySelector('[data-field="reject-reason-'+id+'"]');
    var noteInput = document.querySelector('[data-field="reject-note-'+id+'"]');
    var otherInput = document.querySelector('[data-field="reject-other-'+id+'"]');
    var reason = reasonSel ? reasonSel.value : '';
    if(!reason){ showToast('Please select a rejection reason.', 'error'); return Promise.resolve(); }
    if(reason==='Others'){
      var customReason = otherInput ? otherInput.value.trim() : '';
      if(!customReason){ showToast('Please specify a reason.', 'error'); return Promise.resolve(); }
      reason = customReason;
    }
    var note = noteInput ? noteInput.value.trim() : '';
    return supabase.from('claims').update({status:'rejected', reject_reason:reason, admin_note:note, decided_at:new Date().toISOString()}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not reject claim: '+res.error.message, 'error'); return; }
      STATE.rejectingClaimId = null;
      showToast('Claim rejected and employee notified.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function markNotificationRead(id){
    return supabase.from('notifications').update({read:true}).eq('id', id).then(function(res){
      if(res.error) return;
      return loadAppData();
    }).then(function(){ render(); });
  }

  function confirmEditClaim(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    if(!claim) return Promise.resolve();
    if(claim.employee_id !== STATE.session.user.id){ showToast('You can only edit your own claims.', 'error'); return Promise.resolve(); }
    if(claim.status==='approved'){ showToast('Approved claims cannot be edited.', 'error'); return Promise.resolve(); }

    var catSel = document.getElementById('edit-category-'+id);
    var vendorInput = document.getElementById('edit-vendor-'+id);
    var currencySel = document.getElementById('edit-currency-'+id);
    var amtInput = document.getElementById('edit-amount-'+id);
    var dateInput = document.getElementById('edit-date-'+id);
    var fileInput = document.getElementById('edit-receipt-'+id);
    var category = catSel ? catSel.value : claim.category;
    var vendor = vendorInput ? vendorInput.value.trim() : claim.vendor;
    var currency = currencySel ? currencySel.value : (claim.currency||'SGD');
    var amount = amtInput ? parseFloat(amtInput.value) : claim.amount;
    var receiptDate = dateInput ? dateInput.value : claim.receipt_date;
    if(!category || !vendor || !amount || amount<=0 || !receiptDate){ showToast('Please complete all fields.', 'error'); return Promise.resolve(); }

    var currentYear = new Date().getFullYear();
    var receiptYear = new Date(receiptDate+'T00:00:00').getFullYear();
    if(receiptYear !== currentYear){
      STATE.claimFormError = 'This receipt is dated '+fmtDate(receiptDate)+', which is not from '+currentYear+'. Only '+currentYear+' receipts can be claimed - your benefits reset every 1 January.';
      render();
      return Promise.resolve();
    }

    var file = fileInput && fileInput.files && fileInput.files[0];
    var wasRejected = claim.status === 'rejected';

    return getExchangeRateToSGD(currency).then(function(rate){
      var amountSgd = Math.round(amount*rate*100)/100;
      var wallet = computeWallet(STATE.profile.id);
      var availableForThisEdit = claim.status==='pending' ? wallet.available + sgdAmountOf(claim) : wallet.available;
      if(amountSgd > availableForThisEdit){
        STATE.claimFormError = 'This comes to '+fmtMoney(amountSgd)+' SGD, which is more than your available balance of '+fmtMoney(availableForThisEdit)+'.';
        render();
        return null;
      }
      STATE.claimFormError = null;

      var updates = {category:category, vendor:vendor, currency:currency, amount:amount, amount_sgd:amountSgd, exchange_rate:rate, receipt_date:receiptDate, last_edited_at:new Date().toISOString()};
      if(wasRejected){ updates.status='pending'; updates.reject_reason=null; updates.admin_note=null; updates.decided_at=null; }

      function applyUpdate(){
        return supabase.from('claims').update(updates).eq('id', id).then(function(res){
          if(res.error){ showToast('Could not save changes: '+res.error.message, 'error'); return; }
          STATE.editingClaimId = null;
          showToast(wasRejected ? 'Claim updated and resubmitted for review.' : 'Claim updated.', 'success');
          return loadAppData();
        }).then(function(){ render(); });
      }

      if(file){
        if(file.size > 4*1024*1024){ showToast('File too large - please upload a file under 4MB.', 'error'); return null; }
        return uploadReceipt(file).then(function(receipt){
          updates.receipt_path = receipt.path; updates.receipt_name = receipt.name;
          return applyUpdate();
        }).catch(function(err){ showToast('Upload failed: '+(err.message||err), 'error'); });
      }
      return applyUpdate();
    }).catch(function(err){
      console.error(err);
      showToast('Could not fetch the exchange rate: '+(err.message||err), 'error');
    });
  }

  function deleteClaimConfirmed(id){
    var claim = STATE.claims.filter(function(c){ return c.id===id; })[0];
    STATE.confirmDeleteClaimId = null;
    if(!claim){ render(); return Promise.resolve(); }
    if(claim.employee_id !== STATE.session.user.id){ showToast('You can only delete your own claims.', 'error'); render(); return Promise.resolve(); }
    if(claim.status==='approved'){ showToast('Approved claims cannot be deleted.', 'error'); render(); return Promise.resolve(); }
    return supabase.from('claims').delete().eq('id', id).then(function(res){
      if(res.error){ showToast('Could not delete claim: '+res.error.message, 'error'); return; }
      showToast('Claim deleted.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  /* =========================================================
     ACTION HANDLERS - ADMIN: STAFF / INVITES / BENEFITS / ACCESS
  ========================================================== */
  function inviteStaff(form){
    var name = form.name.value.trim();
    var email = form.email.value.trim().toLowerCase();
    var dateOfEmployment = form.dateOfEmployment.value;
    var effectiveDate = form.effectiveDate.value;
    var paynowMobile = form.paynowMobile.value.trim();
    var allocRaw = form.annualAllocation.value;
    var alloc = parseFloat(allocRaw);
    if(!name || !email || !dateOfEmployment || !effectiveDate || !paynowMobile || allocRaw==='' || isNaN(alloc)){
      showToast('Please complete all fields before adding the employee.', 'error');
      return Promise.resolve();
    }
    return supabase.from('invites').upsert(
      {email:email, name:name, role:'user', annual_allocation:alloc, date_of_joining:dateOfEmployment, paynow_mobile:paynowMobile, effective_date:effectiveDate, welcome_email_sent:false, invited_by:STATE.session.user.id, used:false},
      {onConflict:'email'}
    ).then(function(res){
      if(res.error){ showToast('Could not add employee: '+res.error.message, 'error'); return; }
      showToast('Invite created for '+email+'.', 'success');
      form.reset();
      return loadAppData();
    }).then(function(){ render(); });
  }

  function handleStaffCsv(file){
    if(!file) return Promise.resolve();
    return file.text().then(function(text){
      var lines = text.split(/\r?\n/).map(function(l){ return l.trim(); }).filter(Boolean);
      if(lines.length<2){ showToast('CSV appears to be empty.', 'error'); return; }
      var rows = [];
      for(var i=1;i<lines.length;i++){
        var parts = lines[i].split(',').map(function(p){ return p.trim(); });
        if(parts.length<2) continue;
        var name=parts[0], email=(parts[1]||'').toLowerCase(), alloc=parseFloat(parts[2])||1000;
        var dateOfJoining = parts[3] && parts[3].length ? parts[3] : null;
        var paynowMobile = parts[4] && parts[4].length ? parts[4] : null;
        var effectiveDate = parts[5] && parts[5].length ? parts[5] : null;
        if(!name || !email) continue;
        rows.push({email:email, name:name, role:'user', annual_allocation:alloc, date_of_joining:dateOfJoining, paynow_mobile:paynowMobile, effective_date:effectiveDate, welcome_email_sent:false, invited_by:STATE.session.user.id, used:false});
      }
      if(!rows.length){ showToast('No valid rows found in that CSV.', 'error'); return; }
      return supabase.from('invites').upsert(rows, {onConflict:'email'}).then(function(res){
        if(res.error){ showToast('Bulk invite failed: '+res.error.message, 'error'); return; }
        showToast(rows.length+' invite(s) created or updated.', 'success');
        return loadAppData();
      });
    }).then(function(){ render(); }).catch(function(){ showToast('Could not read that CSV file.', 'error'); });
  }

  function revokeInviteConfirmed(email){
    STATE.confirmRevokeInvite = null;
    return supabase.from('invites').delete().eq('email', email).then(function(res){
      if(res.error){ showToast('Could not revoke invite: '+res.error.message, 'error'); return; }
      showToast('Invite revoked.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function toggleActiveConfirmed(id){
    STATE.confirmDeactivateId = null;
    var p = profileById(id);
    if(!p) return Promise.resolve();
    if(p.id === STATE.profile.id){ showToast('You cannot deactivate your own account.', 'error'); render(); return Promise.resolve(); }
    var newActive = !p.active;
    var updates = {active:newActive, deactivated_at: newActive ? null : new Date().toISOString()};
    return supabase.from('profiles').update(updates).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update status: '+res.error.message, 'error'); return; }
      showToast(p.name+(newActive?' activated.':' deactivated.'), 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function deletePermanently(id){
    STATE.confirmDeleteProfileId = null;
    var p = profileById(id);
    if(!p){ render(); return Promise.resolve(); }
    if(p.id === STATE.profile.id){ showToast('You cannot delete your own account.', 'error'); render(); return Promise.resolve(); }
    if(p.role==='admin'){
      var activeAdmins = STATE.profiles.filter(function(x){ return x.role==='admin' && x.active; }).length;
      if(activeAdmins<=1){ showToast('At least one active admin is required.', 'error'); render(); return Promise.resolve(); }
    }
    return supabase.from('profiles').delete().eq('id', id).then(function(res){
      if(res.error){ showToast('Could not delete: '+res.error.message, 'error'); return; }
      showToast(p.name+' permanently deleted.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function changeRole(id, role){
    var p = profileById(id);
    if(!p) return Promise.resolve();
    if(p.role==='admin' && role==='user'){
      var adminCount = STATE.profiles.filter(function(x){ return x.role==='admin' && x.active; }).length;
      if(adminCount<=1){ showToast('At least one active admin is required.', 'error'); render(); return Promise.resolve(); }
    }
    return supabase.from('profiles').update({role:role}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update role: '+res.error.message, 'error'); return; }
      showToast('Role updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveAlloc(id){
    var input = document.getElementById('alloc-input-'+id);
    var val = input ? parseFloat(input.value) : NaN;
    if(isNaN(val) || val<0){ showToast('Please enter a valid allocation amount.', 'error'); return Promise.resolve(); }
    STATE.editingAllocId = null;
    return supabase.from('profiles').update({annual_allocation:val}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update allocation: '+res.error.message, 'error'); return; }
      showToast('Allocation updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveTermination(id){
    var input = document.getElementById('termination-input-'+id);
    var val = input ? input.value : '';
    STATE.editingTerminationId = null;
    return supabase.from('profiles').update({date_of_termination: val || null}).eq('id', id).then(function(res){
      if(res.error){ showToast('Could not update date of termination: '+res.error.message, 'error'); return; }
      showToast('Date of termination updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveInvoiceRate(){
    var input = document.getElementById('invoice-rate-input');
    var val = input ? parseFloat(input.value) : NaN;
    if(isNaN(val) || val<0){ showToast('Please enter a valid rate.', 'error'); return Promise.resolve(); }
    STATE.editingInvoiceRate = false;
    return supabase.from('app_settings').upsert({key:'invoice_rate_per_head', value:String(val)}, {onConflict:'key'}).then(function(res){
      if(res.error){ showToast('Could not update rate: '+res.error.message, 'error'); return; }
      showToast('Charge per headcount per year updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function saveClientName(){
    var input = document.getElementById('client-name-input');
    var val = input ? input.value.trim() : '';
    if(!val){ showToast('Please enter a company name.', 'error'); return Promise.resolve(); }
    STATE.editingClientName = false;
    return supabase.from('app_settings').upsert({key:'client_company_name', value:val}, {onConflict:'key'}).then(function(res){
      if(res.error){ showToast('Could not update company name: '+res.error.message, 'error'); return; }
      showToast('Report company name updated.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function addBenefit(form){
    var cat = form.category.value.trim();
    if(!cat) return Promise.resolve();
    if(STATE.benefits.some(function(b){ return b.toLowerCase()===cat.toLowerCase(); })){ showToast('That category already exists.', 'error'); return Promise.resolve(); }
    return supabase.from('benefits').insert({name:cat}).then(function(res){
      if(res.error){ showToast('Could not add category: '+res.error.message, 'error'); return; }
      showToast('Benefit category added.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  function removeBenefit(name){
    return supabase.from('benefits').delete().eq('name', name).then(function(res){
      if(res.error){ showToast('Could not remove category: '+res.error.message, 'error'); return; }
      showToast('Category removed.', 'success');
      return loadAppData();
    }).then(function(){ render(); });
  }

  /* =========================================================
     EVENT DISPATCH
  ========================================================== */
  function handleClick(e){
    var btn = e.target.closest('[data-action]');
    if(!btn) return Promise.resolve();
    var action = btn.dataset.action;
    var id = btn.dataset.id;
    switch(action){
      case 'show-signup': STATE.authView='signup'; STATE.authError=''; STATE.authInfo=''; render(); return Promise.resolve();
      case 'show-login': STATE.authView='login'; STATE.authError=''; STATE.authInfo=''; render(); return Promise.resolve();
      case 'forgot-password': return handleForgotPassword();
      case 'nav': STATE.activeTab = btn.dataset.tab; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'logout': return supabase.auth.signOut();
      case 'buy-pa': window.open('https://insure.aia.com.sg/aianow3/solitaire?f=43519&i=agy', '_blank', 'noopener,noreferrer'); return Promise.resolve();
      case 'buy-travel-insurance': window.open('https://sg-customer.qbe.com/travel/partner/01000960', '_blank', 'noopener,noreferrer'); return Promise.resolve();
      case 'view-receipt': openReceiptModal(id); return Promise.resolve();
      case 'close-modal': STATE.modal=null; render(); return Promise.resolve();
      case 'approve-claim': return approveClaim(id);
      case 'start-reject': STATE.rejectingClaimId=id; render(); return Promise.resolve();
      case 'cancel-reject': STATE.rejectingClaimId=null; render(); return Promise.resolve();
      case 'confirm-reject': return confirmReject(id);
      case 'mark-read': return markNotificationRead(id);
      case 'start-edit-claim': STATE.editingClaimId=id; STATE.confirmDeleteClaimId=null; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'cancel-edit-claim': STATE.editingClaimId=null; STATE.claimFormError=null; render(); return Promise.resolve();
      case 'confirm-edit-claim': return confirmEditClaim(id);
      case 'delete-claim': STATE.confirmDeleteClaimId=id; STATE.editingClaimId=null; render(); return Promise.resolve();
      case 'delete-claim-cancel': STATE.confirmDeleteClaimId=null; render(); return Promise.resolve();
      case 'delete-claim-confirm': return deleteClaimConfirmed(id);
      case 'edit-alloc': STATE.editingAllocId=id; render(); return Promise.resolve();
      case 'save-alloc': return saveAlloc(id);
      case 'edit-termination': STATE.editingTerminationId=id; render(); return Promise.resolve();
      case 'save-termination': return saveTermination(id);
      case 'toggle-active': STATE.confirmDeactivateId=id; STATE.confirmDeleteProfileId=null; render(); return Promise.resolve();
      case 'toggle-active-cancel': STATE.confirmDeactivateId=null; render(); return Promise.resolve();
      case 'toggle-active-confirm': return toggleActiveConfirmed(id);
      case 'delete-profile': STATE.confirmDeleteProfileId=id; STATE.confirmDeactivateId=null; render(); return Promise.resolve();
      case 'delete-profile-cancel': STATE.confirmDeleteProfileId=null; render(); return Promise.resolve();
      case 'delete-profile-confirm': return deletePermanently(id);
      case 'revoke-invite': STATE.confirmRevokeInvite=btn.dataset.email; render(); return Promise.resolve();
      case 'revoke-invite-cancel': STATE.confirmRevokeInvite=null; render(); return Promise.resolve();
      case 'sort-report-emp': {
        var col = btn.dataset.column;
        if(STATE.reportSortColumn===col){ STATE.reportSortDirection = STATE.reportSortDirection==='desc'?'asc':'desc'; }
        else { STATE.reportSortColumn = col; STATE.reportSortDirection = 'desc'; }
        render(); return Promise.resolve();
      }
      case 'sort-report-rejected': {
        var rcol = btn.dataset.column;
        if(STATE.rejectedSortColumn===rcol){ STATE.rejectedSortDirection = STATE.rejectedSortDirection==='desc'?'asc':'desc'; }
        else { STATE.rejectedSortColumn = rcol; STATE.rejectedSortDirection = 'desc'; }
        render(); return Promise.resolve();
      }
      case 'revoke-invite-confirm': return revokeInviteConfirmed(btn.dataset.email);
      case 'remove-benefit': return removeBenefit(btn.dataset.cat);
      case 'export-report': exportReportExcel(); return Promise.resolve();
      case 'export-report-pdf': exportReportPDF(); return Promise.resolve();
      case 'edit-invoice-rate': STATE.editingInvoiceRate=true; render(); return Promise.resolve();
      case 'save-invoice-rate': return saveInvoiceRate();
      case 'edit-client-name': STATE.editingClientName=true; render(); return Promise.resolve();
      case 'save-client-name': return saveClientName();
      case 'export-invoice-pdf': return ensureInvoiceNumber(getSelectedInvoiceYear()).then(function(invoiceNumber){ exportInvoicePDF(invoiceNumber); render(); });
      case 'filter-history': STATE.historyFilter=btn.dataset.filter; render(); return Promise.resolve();
      case 'filter-staff': STATE.staffRoleFilter=btn.dataset.filter; render(); return Promise.resolve();
      default: return Promise.resolve();
    }
  }

  function handleSubmit(e){
    var form = e.target;
    if(!form || !form.dataset || !form.dataset.form) return Promise.resolve();
    e.preventDefault();
    var type = form.dataset.form;
    if(type==='login') return doLogin(form);
    if(type==='signup') return doSignup(form);
    if(type==='submit-claim') return submitClaim(form);
    if(type==='invite-staff') return inviteStaff(form);
    if(type==='add-benefit') return addBenefit(form);
    return Promise.resolve();
  }

  function toggleOtherReasonField(selectEl){
    var id = selectEl.dataset.id;
    var wrap = document.getElementById('reject-other-wrap-'+id);
    if(!wrap) return;
    wrap.style.display = (selectEl.value === 'Others') ? '' : 'none';
  }

  function handleChange(e){
    var target = e.target;
    if(target.id==='staff-csv-input'){
      var f = target.files[0]; target.value='';
      return handleStaffCsv(f);
    }
    if(target.id==='claim-currency-input' || (target.id && target.id.indexOf('edit-currency-')===0)){
      handleAmountRelatedChange(target);
      return Promise.resolve();
    }
    var action = target.dataset.action;
    if(!action) return Promise.resolve();
    switch(action){
      case 'change-role': return changeRole(target.dataset.id, target.value);
      case 'reject-reason-select': toggleOtherReasonField(target); return Promise.resolve();
      case 'set-report-month': STATE.reportMonth = parseInt(target.value,10); render(); return Promise.resolve();
      case 'set-report-year': STATE.reportYear = (target.value==='ytd') ? 'ytd' : parseInt(target.value,10); render(); return Promise.resolve();
      case 'set-invoice-year': STATE.invoiceYear = parseInt(target.value,10); render(); return Promise.resolve();
      default: return Promise.resolve();
    }
  }

  var liveCheckTimers = {};
  var liveCheckGeneration = {};

  function scheduleLiveAmountCheck(amountInput, currencySelect, available, errorId, previewId){
    clearTimeout(liveCheckTimers[errorId]);
    liveCheckTimers[errorId] = setTimeout(function(){
      var myGen = (liveCheckGeneration[errorId] = (liveCheckGeneration[errorId]||0) + 1);
      var currency = currencySelect ? currencySelect.value : 'SGD';
      var rawAmount = parseFloat(amountInput.value);
      var previewEl = previewId ? document.getElementById(previewId) : null;
      var errorEl = document.getElementById(errorId);
      if(isNaN(rawAmount) || rawAmount<=0){
        if(errorEl){ errorEl.textContent=''; errorEl.style.display='none'; }
        if(previewEl) previewEl.textContent = '';
        return;
      }
      getExchangeRateToSGD(currency).then(function(rate){
        if(liveCheckGeneration[errorId] !== myGen) return;
        var sgdAmount = Math.round(rawAmount*rate*100)/100;
        if(previewEl){
          previewEl.textContent = currency!=='SGD' ? ('\u2248 '+fmtMoney(sgdAmount)+' SGD at today\'s rate') : '';
        }
        if(errorEl){
          if(sgdAmount > available){
            errorEl.textContent = 'This comes to '+fmtMoney(sgdAmount)+' SGD, which is more than your available balance of '+fmtMoney(available)+'.';
            errorEl.style.display = '';
          } else {
            errorEl.textContent=''; errorEl.style.display='none';
          }
        }
      }).catch(function(err){
        if(liveCheckGeneration[errorId] !== myGen) return;
        if(errorEl){ errorEl.textContent = 'Could not fetch the exchange rate: '+((err&&err.message)||err); errorEl.style.display=''; }
        if(previewEl) previewEl.textContent = '';
      });
    }, 350);
  }

  var searchDebounceTimers = {};
  function scheduleSearchFilter(inputEl, stateKey){
    var value = inputEl.value;
    var cursorPos = inputEl.selectionStart;
    var inputId = inputEl.id;
    clearTimeout(searchDebounceTimers[inputId]);
    searchDebounceTimers[inputId] = setTimeout(function(){
      STATE[stateKey] = value;
      render();
      var freshInput = document.getElementById(inputId);
      if(freshInput){
        freshInput.focus();
        try{ freshInput.setSelectionRange(cursorPos, cursorPos); }catch(err){}
      }
    }, 250);
  }

  function handleInput(e){
    var t = e.target;
    if(!STATE.profile) return;
    if(t.id==='claim-amount-input'){
      var wallet = computeWallet(STATE.profile.id);
      var currencySel = document.getElementById('claim-currency-input');
      scheduleLiveAmountCheck(t, currencySel, wallet.available, 'claim-amount-live-error', 'claim-amount-preview');
    } else if(t.id && t.id.indexOf('edit-amount-')===0){
      var claimId = t.id.slice('edit-amount-'.length);
      var claim = STATE.claims.filter(function(c){ return c.id===claimId; })[0];
      if(claim){
        var w = computeWallet(STATE.profile.id);
        var availableForEdit = claim.status==='pending' ? w.available + sgdAmountOf(claim) : w.available;
        var editCurrencySel = document.getElementById('edit-currency-'+claimId);
        scheduleLiveAmountCheck(t, editCurrencySel, availableForEdit, 'edit-amount-live-error-'+claimId, 'edit-amount-preview-'+claimId);
      }
    } else if(t.id==='history-search-input'){
      scheduleSearchFilter(t, 'historySearchQuery');
    } else if(t.id==='all-submissions-search-input'){
      scheduleSearchFilter(t, 'allSubmissionsSearchQuery');
    } else if(t.id==='report-search-input'){
      scheduleSearchFilter(t, 'reportSearchQuery');
    } else if(t.id==='rejected-search-input'){
      scheduleSearchFilter(t, 'rejectedSearchQuery');
    }
  }

  function handleAmountRelatedChange(target){
    if(target.id==='claim-currency-input'){
      var amtInput = document.getElementById('claim-amount-input');
      if(amtInput && amtInput.value){ handleInput({target:amtInput}); }
    } else if(target.id && target.id.indexOf('edit-currency-')===0){
      var claimId = target.id.slice('edit-currency-'.length);
      var amtEl = document.getElementById('edit-amount-'+claimId);
      if(amtEl && amtEl.value){ handleInput({target:amtEl}); }
    }
  }

  /* =========================================================
     BOOTSTRAP
  ========================================================== */
  window.closeReceiptModal = function(){ STATE.modal=null; render(); };

  var app = document.getElementById('app');
  app.addEventListener('click', function(e){ handleClick(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('submit', function(e){ handleSubmit(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('change', function(e){ handleChange(e).catch(function(err){ console.error(err); }); });
  app.addEventListener('input', handleInput);

  app.addEventListener('dragover', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    e.preventDefault();
    zone.classList.add('dragover');
  });
  app.addEventListener('dragleave', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    zone.classList.remove('dragover');
  });
  app.addEventListener('drop', function(e){
    var zone = e.target.closest && e.target.closest('.dropzone');
    if(!zone) return;
    e.preventDefault();
    zone.classList.remove('dragover');
    var input = zone.querySelector('input[type=file]');
    var files = e.dataTransfer && e.dataTransfer.files;
    if(input && files && files.length){
      input.files = files;
      input.dispatchEvent(new Event('change', {bubbles:true}));
    }
  });

  window.addEventListener('dragover', function(e){ e.preventDefault(); });
  window.addEventListener('drop', function(e){ e.preventDefault(); });

  init();
})();
