export const COUNTRIES_DATA = [
  {
    id: "germany",
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    exchangeRateToINR: 91.5,
    tagline:
      "World-class engineering, zero or nominal tuition fees, and booming industry.",
    bannerImage:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Free / Nominal",
    avgAnnualTuitionINR:
      "₹0 - ₹2.5 Lakhs (Admin fee ~€150-€350/sem; Baden-Württemberg charges €1,500/sem)",
    avgAnnualLivingINR: "₹10.5 - ₹12 Lakhs (€11,904/year Blocked Account)",
    totalAnnualCostINR: "₹11 - ₹14.5 Lakhs",
    postStudyWorkVisa: "18 Months (Jobseeker Visa)",
    pswDetails:
      "18-month residence permit after graduation to seek employment aligned with degree. Path to EU Blue Card.",
    visaRequirements: {
      proofOfFunds:
        "Sperrkonto (Blocked Account) with €11,904 (~₹10.9 Lakhs) deposited for 1 year.",
      blockedAccountOrGIC: "€11,904 via Expatrio / Fintiba / Coracle",
      visaFeeINR: "₹6,800 (€75)",
      processingTime: "6 to 12 weeks",
      officialVisaLink: "https://india.diplo.de/in-en/service/-/2539126",
      apsCertificateRequired: true,
    },
    entryRequirements: {
      minCGPA: "7.0+ CGPA (German equivalent 2.5 or better); 8.0+ for top TU9",
      educationYears:
        "16 years required for most Master’s (4-year B.Tech or 3-year B.Sc + M.Sc / 1-yr PG diploma). APS mandatory.",
      ieltsCutoff: "6.5 overall (no band < 6.0) for English-taught courses",
      greRequired:
        "Required for specific courses at RWTH Aachen, TUM, Saarland (Quantitative 160+)",
    },
    popularCourses: [
      "Mechanical Engineering",
      "Automotive & Mobility",
      "Computer Science & AI",
      "Renewable Energy",
      "Data Engineering",
    ],
    topUniversities: [
      {
        name: "Technical University of Munich (TUM)",
        city: "Munich",
        globalRank: "#28 QS",
        popularFor: ["Robotics", "Informatics", "Aerospace"],
        avgTuitionINR: "₹3 - ₹5 Lakhs/year (Munich international student fee)",
        acceptanceRate: "8%",
        websiteUrl: "https://www.tum.de/en/",
      },
      {
        name: "RWTH Aachen University",
        city: "Aachen",
        globalRank: "#99 QS",
        popularFor: ["Mechanical Eng", "Production Tech", "Metallurgy"],
        avgTuitionINR: "₹0 (Nominal semester fee ~₹30,000)",
        acceptanceRate: "15%",
        websiteUrl: "https://www.rwth-aachen.de/",
      },
      {
        name: "Heidelberg University",
        city: "Heidelberg",
        globalRank: "#84 QS",
        popularFor: ["Biomedicine", "Data Science", "Physics"],
        avgTuitionINR: "₹2.7 Lakhs/year (€1,500/semester)",
        acceptanceRate: "16%",
        websiteUrl: "https://www.uni-heidelberg.de/",
      },
      {
        name: "Technical University of Berlin (TU Berlin)",
        city: "Berlin",
        globalRank: "#147 QS",
        popularFor: ["Computer Science", "Sustainable Engineering"],
        avgTuitionINR: "₹0 (Nominal semester ticket ~₹28,000)",
        acceptanceRate: "20%",
        websiteUrl: "https://www.tu.berlin/en/",
      },
    ],
    keyScholarships: [
      "DAAD Study Scholarships",
      "Deutschlandstipendium",
      "Konrad-Adenauer-Stiftung",
    ],
    pros: [
      "Near-zero tuition fees at public universities",
      "Strong engineering & automotive manufacturing ecosystem",
      "Generous 18-month post-study work visa and rapid PR route",
      "Free public transport with semester ticket in most states",
    ],
    cons: [
      "German language proficiency (B1/B2) is crucial for daily life & local job market",
      "APS certificate verification takes 4 to 8 weeks before visa filing",
      "Strict academic criteria with minimal grade inflation tolerance",
    ],
    intakes: {
      primary:
        "Winter Intake (Starts October - Application deadline May 15 to July 15)",
      secondary:
        "Summer Intake (Starts April - Application deadline Nov 15 to Jan 15)",
      deadlineNotice:
        "Apply for APS certificate at least 4-5 months before university deadlines.",
    },
  },
  {
    id: "canada",
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "C$",
    exchangeRateToINR: 62.5,
    tagline:
      "Welcoming multicultural cities, top-ranked institutions, and flexible work permits.",
    bannerImage:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Moderate",
    avgAnnualTuitionINR: "₹14 - ₹24 Lakhs ($22,000 - $38,000 CAD)",
    avgAnnualLivingINR: "₹12.9 Lakhs ($20,635 CAD GIC deposit)",
    totalAnnualCostINR: "₹26 - ₹36 Lakhs",
    postStudyWorkVisa: "Up to 3 Years (PGWP)",
    pswDetails:
      "Graduates from eligible Designated Learning Institutions (DLIs) receive up to a 3-year Post-Graduation Work Permit (PGWP).",
    visaRequirements: {
      proofOfFunds:
        "Guaranteed Investment Certificate (GIC) of $20,635 CAD plus proof of 1st year paid tuition.",
      blockedAccountOrGIC: "$20,635 CAD via Scotiabank / CIBC / ICICI Canada",
      visaFeeINR: "₹9,400 ($150 CAD) + ₹5,300 Biometrics",
      processingTime: "7 to 10 weeks",
      officialVisaLink:
        "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    },
    entryRequirements: {
      minCGPA:
        "7.0+ CGPA (65%+) for colleges, 7.5+ for mid-tier universities, 8.5+ for UofT / UBC",
      educationYears:
        "15-year degrees widely accepted for PG diplomas; 16-year or WES course-by-course evaluation preferred for Master’s",
      ieltsCutoff: "6.5 overall (no band < 6.0) for university SDS stream",
      greRequired:
        "Optional in most universities except top CS/Finance programs",
    },
    popularCourses: [
      "Software Engineering",
      "Cloud Architecture",
      "Business Analytics & Finance",
      "Health Informatics",
      "Civil & Environmental",
    ],
    topUniversities: [
      {
        name: "University of Toronto",
        city: "Toronto, ON",
        globalRank: "#21 QS",
        popularFor: ["AI & Deep Learning", "Medicine", "Commerce"],
        avgTuitionINR: "₹32 - ₹42 Lakhs/year ($52,000 CAD)",
        acceptanceRate: "43%",
        websiteUrl: "https://www.utoronto.ca/",
      },
      {
        name: "University of British Columbia (UBC)",
        city: "Vancouver, BC",
        globalRank: "#34 QS",
        popularFor: ["Forestry", "Data Science", "Biotech"],
        avgTuitionINR: "₹26 - ₹35 Lakhs/year ($42,000 CAD)",
        acceptanceRate: "50%",
        websiteUrl: "https://www.ubc.ca/",
      },
      {
        name: "University of Waterloo",
        city: "Waterloo, ON",
        globalRank: "#112 QS",
        popularFor: ["Co-op Tech Programs", "Computer Science", "Quantum"],
        avgTuitionINR: "₹25 - ₹34 Lakhs/year ($40,000 CAD)",
        acceptanceRate: "53%",
        websiteUrl: "https://uwaterloo.ca/",
      },
    ],
    keyScholarships: [
      "Ontario Trillium Scholarship",
      "Lester B. Pearson Award",
      "Vanier Canada Graduate Scholarships",
    ],
    pros: [
      "World-famous Co-op paid internships providing Canadian industry experience",
      "Clear, predictable Post-Graduation Work Permit (PGWP) structure",
      "High quality of life, safety, and vibrant Indian diaspora support",
    ],
    cons: [
      "Recent study permit caps require Provincial Attestation Letters (PAL)",
      "Severe rental housing shortages in GTA and Greater Vancouver",
      "Cold winter climate across most provinces",
    ],
    intakes: {
      primary: "Fall Intake (September - Applications open October to January)",
      secondary: "Winter Intake (January - Applications open May to August)",
      deadlineNotice:
        "Ensure your institution issues an official Provincial Attestation Letter (PAL).",
    },
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    exchangeRateToINR: 108.5,
    tagline:
      "Centuries of academic excellence with intensive 1-year Master’s degrees.",
    bannerImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Moderate",
    avgAnnualTuitionINR: "₹18 - ₹30 Lakhs (£16,000 - £28,000)",
    avgAnnualLivingINR:
      "₹12 - ₹15 Lakhs (£9,207 outside London / £12,006 in London)",
    totalAnnualCostINR:
      "₹30 - ₹45 Lakhs (Entire Master’s finished in 12 months!)",
    postStudyWorkVisa: "2 Years (Graduate Route Visa)",
    pswDetails:
      "Unsponsored 2-year Graduate Route visa for Bachelor’s/Master’s (3 years for PhD). Work in any sector without minimum salary threshold initially.",
    visaRequirements: {
      proofOfFunds:
        "28 consecutive days bank statement showing tuition fee balance + 9 months living (£1,023/mo outer London, £1,334/mo London).",
      blockedAccountOrGIC: "Liquid savings/Fixed Deposit held for 28+ days",
      visaFeeINR:
        "₹53,000 (£490 visa fee) + NHS Immigration Health Surcharge (~£776/year)",
      processingTime: "3 to 5 weeks (Priority available)",
      officialVisaLink: "https://www.gov.uk/student-visa",
    },
    entryRequirements: {
      minCGPA:
        "60% - 65% for Russell Group; 75%+ for Oxford/Cambridge/Imperial/UCL",
      educationYears:
        "15 years education (3-year Indian Bachelor’s BA/BSc/BCom) widely accepted directly for Master’s!",
      ieltsCutoff:
        "6.5 overall (minimum 6.0 in each component) or IELTS waiver with 70%+ in Class 12 English (CBSE/ICSE)",
      greRequired: "Not required for 95% of UK Master’s programs",
    },
    popularCourses: [
      "Data Science & Analytics",
      "Finance & Investment Banking",
      "Artificial Intelligence",
      "Management / MBA",
      "Law (LLM)",
    ],
    topUniversities: [
      {
        name: "Imperial College London",
        city: "London",
        globalRank: "#2 QS",
        popularFor: ["STEM", "Deep Learning", "Biomedical"],
        avgTuitionINR: "₹38 - ₹48 Lakhs/year (£36,000)",
        acceptanceRate: "14%",
        websiteUrl: "https://www.imperial.ac.uk/",
      },
      {
        name: "University of Manchester",
        city: "Manchester",
        globalRank: "#34 QS",
        popularFor: ["Materials Science", "Business", "Computer Science"],
        avgTuitionINR: "₹28 - ₹36 Lakhs/year (£26,000)",
        acceptanceRate: "27%",
        websiteUrl: "https://www.manchester.ac.uk/",
      },
      {
        name: "University of Edinburgh",
        city: "Edinburgh, Scotland",
        globalRank: "#27 QS",
        popularFor: ["Informatics", "Linguistics", "Economics"],
        avgTuitionINR: "₹29 - ₹38 Lakhs/year (£27,000)",
        acceptanceRate: "30%",
        websiteUrl: "https://www.ed.ac.uk/",
      },
    ],
    keyScholarships: [
      "Chevening Scholarships",
      "Commonwealth Master’s",
      "GREAT Scholarships (India specific)",
    ],
    pros: [
      "1-year intensive Master’s degree saves 1 whole year of living expenses and starts career faster",
      "Accepts 3-year Indian Bachelor’s degrees without WES conversion hassle",
      "Generous English proficiency waivers for CBSE/ICSE students",
    ],
    cons: [
      "Pound sterling exchange rate is high",
      "NHS Health Surcharge adds substantial upfront cost",
      "Competitive job market for post-study sponsorship",
    ],
    intakes: {
      primary: "September/October Intake (Main academic cycle)",
      secondary:
        "January/February Intake (Select business & computing courses)",
      deadlineNotice:
        "Apply on UCAS for Undergrad; university direct portals for Master’s by June/July.",
    },
  },
  {
    id: "australia",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "A$",
    exchangeRateToINR: 55.5,
    tagline:
      "Globally renowned Group of Eight research institutions and sunny lifestyle.",
    bannerImage:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Moderate",
    avgAnnualTuitionINR: "₹18 - ₹28 Lakhs (A$32,000 - A$50,000)",
    avgAnnualLivingINR:
      "₹16.5 Lakhs (A$29,710/year official proof requirement)",
    totalAnnualCostINR: "₹34 - ₹44 Lakhs",
    postStudyWorkVisa: "2 to 4 Years (Subclass 485)",
    pswDetails:
      "Temporary Graduate Visa Subclass 485: 2 years for Master’s, with extra 1-2 years for studying in designated regional centers (Adelaide, Perth, Brisbane).",
    visaRequirements: {
      proofOfFunds:
        "Genuine Student (GS) assessment + Proof of funds: A$29,710 living cost + 1 yr tuition + travel costs.",
      blockedAccountOrGIC:
        "Bank loan letter or 3-month savings bank account funds",
      visaFeeINR: "₹88,000 (A$1,600 visa fee)",
      processingTime: "4 to 8 weeks",
      officialVisaLink:
        "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    },
    entryRequirements: {
      minCGPA:
        "65%+ for Go8 universities; 60%+ for other CRICOS registered institutions",
      educationYears:
        "15-year or 16-year degrees evaluated based on NOOSR guidelines (Section 1 universities accepted for 3-year degrees)",
      ieltsCutoff: "6.5 overall (no band < 6.0) or PTE Academic 58+",
      greRequired: "Generally not required",
    },
    popularCourses: [
      "Data Science & AI",
      "Civil & Mining Engineering",
      "Biotechnology",
      "Accounting & Financial Tech",
      "Hospitality & Tourism",
    ],
    topUniversities: [
      {
        name: "The University of Melbourne",
        city: "Melbourne, VIC",
        globalRank: "#13 QS",
        popularFor: ["Biomedical", "Computer Systems", "Law"],
        avgTuitionINR: "₹26 - ₹35 Lakhs/year (A$46,000)",
        acceptanceRate: "70%",
        websiteUrl: "https://www.unimelb.edu.au/",
      },
      {
        name: "The University of Sydney",
        city: "Sydney, NSW",
        globalRank: "#18 QS",
        popularFor: ["Architecture", "Business Analytics", "Robotics"],
        avgTuitionINR: "₹27 - ₹36 Lakhs/year (A$48,000)",
        acceptanceRate: "30%",
        websiteUrl: "https://www.sydney.edu.au/",
      },
      {
        name: "University of New South Wales (UNSW)",
        city: "Sydney, NSW",
        globalRank: "#19 QS",
        popularFor: ["Renewable Energy", "FinTech", "Engineering"],
        avgTuitionINR: "₹26 - ₹34 Lakhs/year (A$47,000)",
        acceptanceRate: "30%",
        websiteUrl: "https://www.unsw.edu.au/",
      },
    ],
    keyScholarships: [
      "Australia Awards",
      "Melbourne International Merit Scholarship",
      "Sydney International Student Award",
    ],
    pros: [
      "High minimum wage for student part-time work (A$24.10/hour + penalty rates on weekends)",
      "World-class living conditions, high safety, and outdoor lifestyle",
      "Extra post-study work visa rights in regional cities",
    ],
    cons: [
      "Higher student visa fee introduced in recent immigration updates",
      "Strict Genuine Student (GS) evaluation on academic progression",
      "High rental prices in Sydney and Melbourne",
    ],
    intakes: {
      primary: "Semester 1 (February/March - Primary intake)",
      secondary: "Semester 2 (July/August - Second major intake)",
      deadlineNotice:
        "Apply at least 5-6 months before the semester starts to allow GS and visa clearance.",
    },
  },
  {
    id: "usa",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    exchangeRateToINR: 86.5,
    tagline:
      "Global epicenter of frontier technology, research funding, and 3-Year STEM OPT.",
    bannerImage:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "High",
    avgAnnualTuitionINR: "₹25 - ₹45 Lakhs ($28,000 - $52,000)",
    avgAnnualLivingINR: "₹14 - ₹18 Lakhs ($16,000 - $21,000)",
    totalAnnualCostINR: "₹39 - ₹63 Lakhs",
    postStudyWorkVisa: "Up to 3 Years (OPT + 24-Month STEM Extension)",
    pswDetails:
      "F-1 visa students in STEM programs qualify for 12 months standard Optional Practical Training (OPT) plus 24 months STEM extension (36 months total).",
    visaRequirements: {
      proofOfFunds:
        "Form I-20 issued by university; Liquid funds showing at least 1st year total cost as stated on I-20.",
      blockedAccountOrGIC:
        "Bank statements, Education loan sanction letter, Fixed deposits",
      visaFeeINR: "₹16,000 ($185 MRV fee) + ₹29,000 ($350 SEVIS I-901 fee)",
      processingTime: "VFS slot booking + In-person consular interview",
      officialVisaLink: "https://www.ustraveldocs.com/in/",
    },
    entryRequirements: {
      minCGPA:
        "3.0 GPA / 65% for state universities; 3.5+ GPA / 75%+ for tier-1 R1 institutions",
      educationYears:
        "16 years required for most Master’s (4-year B.Tech / B.E.); select schools accept 3-year degrees with WES evaluation",
      ieltsCutoff: "6.5 - 7.0 overall or TOEFL iBT 90+",
      greRequired:
        "Required or recommended for competitive STEM and Quant Finance programs",
    },
    popularCourses: [
      "Computer Science & AI",
      "Electrical & Computer Eng",
      "Data Science & Big Data",
      "Quantitative Finance",
      "Biotechnology",
    ],
    topUniversities: [
      {
        name: "Carnegie Mellon University",
        city: "Pittsburgh, PA",
        globalRank: "#52 QS / #1 in CS",
        popularFor: ["Software Engineering", "Robotics", "Cybersecurity"],
        avgTuitionINR: "₹48 - ₹58 Lakhs/year ($58,000)",
        acceptanceRate: "11%",
        websiteUrl: "https://www.cmu.edu/",
      },
      {
        name: "University of California, Berkeley",
        city: "Berkeley, CA",
        globalRank: "#12 QS",
        popularFor: ["AI", "Biomedical", "Clean Energy"],
        avgTuitionINR: "₹38 - ₹48 Lakhs/year ($46,000)",
        acceptanceRate: "14%",
        websiteUrl: "https://www.berkeley.edu/",
      },
      {
        name: "Purdue University",
        city: "West Lafayette, IN",
        globalRank: "#89 QS",
        popularFor: ["Aeronautics", "Mechanical Eng", "Supply Chain"],
        avgTuitionINR: "₹26 - ₹34 Lakhs/year ($31,000)",
        acceptanceRate: "53%",
        websiteUrl: "https://www.purdue.edu/",
      },
    ],
    keyScholarships: [
      "Fulbright-Nehru Fellowships",
      "Graduate Assistantships (TA/RA with tuition remission)",
      "Inlaks Scholarships",
    ],
    pros: [
      "Unmatched research grants and graduate assistantships (TA/RA) that waive tuition and pay stipends",
      "3-Year STEM OPT provides substantial runway to secure H-1B or global relocation",
      "Highest starting tech salaries globally ($90k - $140k+)",
    ],
    cons: [
      "Highest overall tuition and living expense among destinations",
      "H-1B lottery uncertainty for long-term residency",
      "F-1 visa interview slot availability in India can be challenging",
    ],
    intakes: {
      primary: "Fall Intake (August/September - Apply by Nov to Jan)",
      secondary: "Spring Intake (January - Apply by July to Sep)",
      deadlineNotice:
        "Top universities close Fall applications as early as December 15.",
    },
  },
  {
    id: "ireland",
    name: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    currency: "EUR",
    currencySymbol: "€",
    exchangeRateToINR: 91.5,
    tagline:
      "The Silicon Valley of Europe with English-speaking culture and 2-year PSW.",
    bannerImage:
      "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Moderate",
    avgAnnualTuitionINR: "₹14 - ₹24 Lakhs (€15,000 - €26,000)",
    avgAnnualLivingINR: "₹10 - ₹12 Lakhs (€10,000 proof of funds requirement)",
    totalAnnualCostINR: "₹24 - ₹36 Lakhs",
    postStudyWorkVisa: "2 Years (Third Level Graduate Scheme)",
    pswDetails:
      "Level 9 Master’s graduates receive a 24-month stay-back permit to work full-time in Ireland. Critical Skills Employment Permit path.",
    visaRequirements: {
      proofOfFunds:
        "Show evidence of €10,000 living expenses plus tuition fee payment receipt.",
      blockedAccountOrGIC: "Bank statements or Education bond",
      visaFeeINR: "₹5,500 (€60 single entry) / ₹9,100 (€100 multi)",
      processingTime: "4 to 6 weeks",
      officialVisaLink:
        "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
    },
    entryRequirements: {
      minCGPA:
        "60% - 65% for Irish universities (First class / higher second class from Indian universities)",
      educationYears:
        "15 years education accepted for Master’s (3-year Bachelor’s from accredited Indian institutions accepted directly)",
      ieltsCutoff: "6.5 overall (no band < 6.0)",
      greRequired: "Not required",
    },
    popularCourses: [
      "Data Analytics & AI",
      "Cloud Computing",
      "Pharmaceutical Science",
      "FinTech & Cybersecurity",
      "Digital Marketing",
    ],
    topUniversities: [
      {
        name: "Trinity College Dublin (TCD)",
        city: "Dublin",
        globalRank: "#87 QS",
        popularFor: ["Computer Science", "Immunology", "Classics"],
        avgTuitionINR: "₹22 - ₹28 Lakhs/year (€24,000)",
        acceptanceRate: "33%",
        websiteUrl: "https://www.tcd.ie/",
      },
      {
        name: "University College Dublin (UCD)",
        city: "Dublin",
        globalRank: "#126 QS",
        popularFor: ["Smurfit Business School", "Biotech", "Civil Eng"],
        avgTuitionINR: "₹20 - ₹26 Lakhs/year (€22,000)",
        acceptanceRate: "40%",
        websiteUrl: "https://www.ucd.ie/",
      },
      {
        name: "University of Galway",
        city: "Galway",
        globalRank: "#273 QS",
        popularFor: ["MedTech", "Marine Science", "Data Science"],
        avgTuitionINR: "₹16 - ₹21 Lakhs/year (€18,000)",
        acceptanceRate: "50%",
        websiteUrl: "https://www.universityofgalway.ie/",
      },
    ],
    keyScholarships: [
      "Government of Ireland International Education Scholarship",
      "UCD Global Excellence Scholarships",
    ],
    pros: [
      "Only English-speaking country in the Eurozone",
      "European headquarters for Google, Meta, Apple, Pfizer, and Stripe offering direct graduate hiring",
      "Direct admission with 3-year Indian Bachelor’s degrees",
    ],
    cons: [
      "Dublin accommodation is expensive and competitive to secure",
      "Smaller number of universities compared to UK or Germany",
      "Weather can be windy and rain-prone",
    ],
    intakes: {
      primary: "Autumn / September Intake (Primary)",
      secondary: "Limited January intakes for specific courses",
      deadlineNotice:
        "Early applications are strongly recommended as seats fill on a rolling basis.",
    },
  },
  {
    id: "italy",
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    currency: "EUR",
    currencySymbol: "€",
    exchangeRateToINR: 91.5,
    tagline:
      "Affordable historic universities with generous regional DSU full-ride scholarships.",
    bannerImage:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    tuitionModel: "Free / Nominal",
    avgAnnualTuitionINR:
      "₹1 - ₹4 Lakhs (€1,000 - €4,000 at public universities; waived with DSU!)",
    avgAnnualLivingINR: "₹7 - ₹9 Lakhs (€6,000 - €8,000 per year)",
    totalAnnualCostINR:
      "₹8 - ₹13 Lakhs (Often ₹0 out-of-pocket tuition with regional aid)",
    postStudyWorkVisa: "1 Year (Permesso di Soggiorno per Ricerca Lavoro)",
    pswDetails:
      "12-month post-study work search permit for Master’s/PhD graduates. Convert to regular work permit upon signing an employment contract.",
    visaRequirements: {
      proofOfFunds:
        "Demonstrate €6,000/year living cost (~₹5.5 Lakhs) in student or parent’s bank account.",
      blockedAccountOrGIC:
        "Bank statements with CA certificate and sponsorship affidavit",
      visaFeeINR: "₹4,600 (€50) student visa",
      processingTime: "4 to 8 weeks via Italian Embassy/Consulate",
      officialVisaLink: "https://vistoperitalia.esteri.it/home/en",
    },
    entryRequirements: {
      minCGPA:
        "65%+ or 6.5+ CGPA; Declaration of Value (DoV) or CIMEA comparability certificate required",
      educationYears:
        "15 years education accepted for Laurea Magistrale (Master’s) from recognized Indian institutions",
      ieltsCutoff:
        "6.0 - 6.5 overall (often waived with English Medium of Instruction certificate from college)",
      greRequired: "Optional/Not required",
    },
    popularCourses: [
      "Design & Architecture",
      "Automotive Engineering (Motor Valley)",
      "Mechanical & Automation",
      "Fashion & Luxury Management",
      "Economics & Management",
    ],
    topUniversities: [
      {
        name: "Politecnico di Milano",
        city: "Milan",
        globalRank: "#111 QS / #7 in Art & Design",
        popularFor: [
          "Architecture",
          "Mechanical Engineering",
          "Computer Engineering",
        ],
        avgTuitionINR: "₹3.5 Lakhs/year (€3,900; 100% waivable with DSU)",
        acceptanceRate: "28%",
        websiteUrl: "https://www.polimi.it/en/",
      },
      {
        name: "University of Bologna",
        city: "Bologna",
        globalRank: "#133 QS (World’s oldest university)",
        popularFor: ["Law", "Humanities", "Data Science"],
        avgTuitionINR: "₹2.5 Lakhs/year (€2,800)",
        acceptanceRate: "35%",
        websiteUrl: "https://www.unibo.it/en",
      },
      {
        name: "Sapienza University of Rome",
        city: "Rome",
        globalRank: "#132 QS",
        popularFor: ["Aerospace", "Archaeology", "Physics"],
        avgTuitionINR: "₹2.8 Lakhs/year (€3,000)",
        acceptanceRate: "40%",
        websiteUrl: "https://www.uniroma1.it/en",
      },
    ],
    keyScholarships: [
      "DSU Regional Scholarship (Full tuition + free meals/dorm + ~€7,000 cash)",
      "Italian Government MAECI Grants",
      "Polimi Merit Scholarships",
    ],
    pros: [
      "One of the most affordable European destinations for Indian students",
      "DSU scholarship offers comprehensive need-based coverage based on Indian family income (ISEE-parificato)",
      "Rich culture, culinary heritage, and travel access across 27 Schengen countries",
    ],
    cons: [
      "Italian language is required to secure local private sector jobs",
      "Bureaucracy (Codice Fiscale, DoV, Permesso di Soggiorno) can take time",
      "Job market growth is slower than Northern Europe or Ireland",
    ],
    intakes: {
      primary:
        "September/October Intake (Pre-enrollment via Universitaly portal starts Feb-April)",
      secondary: "Limited February intakes for engineering",
      deadlineNotice:
        "Pre-enrollment on Universitaly is mandatory before visa appointment.",
    },
  },
];
