// Mock test results data for the Results page
export const mockTestResults = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    type: 'Blood Test',
    date: '2023-11-10',
    status: 'normal',
    doctor: 'Dr. Sarah Miller',
    comments: 'All parameters are within normal range. Continue with current health regimen.',
    location: 'Central Laboratory',
    fasting: true,
    preparation: 'Patient fasted for 12 hours before the test.',
    parameters: [
      { 
        name: 'Hemoglobin', 
        value: 14.2, 
        unit: 'g/dL', 
        reference: '13.5-17.5', 
        status: 'normal',
        prevValue: 13.8,
        trend: [13.8, 13.9, 14.0, 14.2]
      },
      { 
        name: 'White Blood Cell Count', 
        value: 6.8, 
        unit: 'x10^9/L', 
        reference: '4.5-11.0', 
        status: 'normal',
        prevValue: 7.1,
        trend: [7.5, 7.2, 7.1, 6.8]
      },
      { 
        name: 'Platelet Count', 
        value: 350, 
        unit: 'x10^9/L', 
        reference: '150-450', 
        status: 'normal',
        prevValue: 330,
        trend: [290, 310, 330, 350]
      },
      { 
        name: 'Red Blood Cell Count', 
        value: 5.1, 
        unit: 'x10^12/L', 
        reference: '4.5-5.9', 
        status: 'normal',
        prevValue: 5.0,
        trend: [4.9, 5.0, 5.1, 5.1]
      }
    ],
    history: [
      { date: '2023-08-15', value: 13.8, status: 'normal' },
      { date: '2023-05-22', value: 13.9, status: 'normal' },
      { date: '2023-02-10', value: 14.0, status: 'normal' },
      { date: '2022-11-05', value: 13.5, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your blood parameters are all within the normal range.',
        severity: 'positive'
      },
      {
        type: 'trend',
        message: 'Your hemoglobin levels have shown a mild but consistent improvement over the past year.',
        severity: 'positive'
      },
      {
        type: 'recommendation',
        message: 'Continue with your current diet and exercise regimen as it appears to be supporting healthy blood parameters.',
        severity: 'informational'
      }
    ]
  },
  {
    id: 2,
    name: 'Lipid Panel',
    type: 'Blood Test',
    date: '2023-10-25',
    status: 'critical',
    doctor: 'Dr. Robert Johnson',
    comments: 'Elevated LDL cholesterol and triglycerides. Recommend dietary changes and follow-up in 3 months.',
    location: 'Central Laboratory',
    fasting: true,
    preparation: 'Patient fasted for 12 hours before the test.',
    parameters: [
      { 
        name: 'Total Cholesterol', 
        value: 240, 
        unit: 'mg/dL', 
        reference: '<200', 
        status: 'critical',
        prevValue: 230,
        trend: [210, 220, 230, 240]
      },
      { 
        name: 'LDL Cholesterol', 
        value: 165, 
        unit: 'mg/dL', 
        reference: '<100', 
        status: 'critical',
        prevValue: 155,
        trend: [140, 145, 155, 165]
      },
      { 
        name: 'HDL Cholesterol', 
        value: 42, 
        unit: 'mg/dL', 
        reference: '>40', 
        status: 'normal',
        prevValue: 40,
        trend: [38, 39, 40, 42]
      },
      { 
        name: 'Triglycerides', 
        value: 190, 
        unit: 'mg/dL', 
        reference: '<150', 
        status: 'critical',
        prevValue: 180,
        trend: [160, 170, 180, 190]
      }
    ],
    history: [
      { date: '2023-07-15', value: 230, status: 'critical' },
      { date: '2023-04-22', value: 220, status: 'critical' },
      { date: '2023-01-10', value: 210, status: 'critical' },
      { date: '2022-10-05', value: 195, status: 'borderline' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your LDL cholesterol and triglycerides are above the recommended levels.',
        severity: 'high'
      },
      {
        type: 'trend',
        message: 'Your lipid levels have been gradually increasing over the past year.',
        severity: 'moderate'
      },
      {
        type: 'recommendation',
        message: 'Consider reducing saturated fat intake, increasing physical activity, and consuming more fiber-rich foods.',
        severity: 'moderate'
      },
      {
        type: 'action',
        message: 'Schedule a follow-up lipid panel in 3 months to monitor progress.',
        severity: 'moderate'
      }
    ]
  },
  {
    id: 3,
    name: 'Chest X-Ray',
    type: 'Radiology',
    date: '2023-09-12',
    status: 'normal',
    doctor: 'Dr. Emily Chen',
    comments: 'No abnormalities detected. Lungs clear. Heart size normal.',
    location: 'Radiology Department',
    fasting: false,
    preparation: 'No specific preparation required.',
    parameters: [],
    history: [
      { date: '2022-09-10', value: null, status: 'normal' },
      { date: '2021-09-15', value: null, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your chest X-ray shows no abnormalities in the heart or lungs.',
        severity: 'positive'
      },
      {
        type: 'trend',
        message: 'Your results have been consistently normal over the past 2 years.',
        severity: 'positive'
      }
    ]
  },
  {
    id: 4,
    name: 'Fasting Blood Glucose',
    type: 'Blood Test',
    date: '2023-11-05',
    status: 'critical',
    doctor: 'Dr. Sarah Miller',
    comments: 'Elevated glucose levels. Recommend lifestyle modifications and potential medication. Schedule follow-up in 2 weeks.',
    location: 'Central Laboratory',
    fasting: true,
    preparation: 'Patient fasted for 8 hours before the test.',
    parameters: [
      { 
        name: 'Glucose (Fasting)', 
        value: 138, 
        unit: 'mg/dL', 
        reference: '70-99', 
        status: 'critical',
        prevValue: 125,
        trend: [110, 115, 125, 138]
      }
    ],
    history: [
      { date: '2023-08-05', value: 125, status: 'critical' },
      { date: '2023-05-12', value: 115, status: 'critical' },
      { date: '2023-02-08', value: 110, status: 'critical' },
      { date: '2022-11-11', value: 98, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your fasting blood glucose is above the normal range, indicating prediabetes.',
        severity: 'high'
      },
      {
        type: 'trend',
        message: 'Your glucose levels have been steadily increasing over the past year.',
        severity: 'high'
      },
      {
        type: 'recommendation',
        message: 'Focus on reducing refined carbohydrate intake, increasing physical activity, and maintaining a healthy weight.',
        severity: 'moderate'
      },
      {
        type: 'action',
        message: 'Schedule a consultation with an endocrinologist for further evaluation.',
        severity: 'high'
      }
    ]
  },
  {
    id: 5,
    name: 'Liver Function Test',
    type: 'Blood Test',
    date: '2023-10-18',
    status: 'normal',
    doctor: 'Dr. Robert Johnson',
    comments: 'Liver enzymes within normal range. No signs of liver dysfunction.',
    location: 'Central Laboratory',
    fasting: true,
    preparation: 'Patient fasted for 8 hours before the test.',
    parameters: [
      { 
        name: 'AST (SGOT)', 
        value: 25, 
        unit: 'U/L', 
        reference: '10-40', 
        status: 'normal',
        prevValue: 27,
        trend: [28, 27, 26, 25]
      },
      { 
        name: 'ALT (SGPT)', 
        value: 30, 
        unit: 'U/L', 
        reference: '7-56', 
        status: 'normal',
        prevValue: 32,
        trend: [35, 33, 32, 30]
      },
      { 
        name: 'Alkaline Phosphatase', 
        value: 80, 
        unit: 'U/L', 
        reference: '44-147', 
        status: 'normal',
        prevValue: 85,
        trend: [90, 88, 85, 80]
      },
      { 
        name: 'Total Bilirubin', 
        value: 0.8, 
        unit: 'mg/dL', 
        reference: '0.1-1.2', 
        status: 'normal',
        prevValue: 0.9,
        trend: [1.0, 0.9, 0.9, 0.8]
      }
    ],
    history: [
      { date: '2023-07-18', value: 27, status: 'normal' },
      { date: '2023-04-20', value: 26, status: 'normal' },
      { date: '2023-01-15', value: 28, status: 'normal' },
      { date: '2022-10-10', value: 30, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'All liver function parameters are within the normal range.',
        severity: 'positive'
      },
      {
        type: 'trend',
        message: 'Your liver enzymes have remained stable and healthy over the past year.',
        severity: 'positive'
      }
    ]
  },
  {
    id: 6,
    name: 'Electrocardiogram (ECG)',
    type: 'Cardiac',
    date: '2023-09-05',
    status: 'normal',
    doctor: 'Dr. Emily Chen',
    comments: 'Normal sinus rhythm. No signs of arrhythmia or ischemia.',
    location: 'Cardiology Department',
    fasting: false,
    preparation: 'No specific preparation required.',
    parameters: [],
    history: [
      { date: '2022-09-10', value: null, status: 'normal' },
      { date: '2021-09-15', value: null, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your ECG shows a normal heart rhythm without any abnormalities.',
        severity: 'positive'
      },
      {
        type: 'trend',
        message: 'Your ECG results have been consistently normal over the past 2 years.',
        severity: 'positive'
      }
    ]
  },
  {
    id: 7,
    name: 'Thyroid Function Test',
    type: 'Blood Test',
    date: '2023-08-20',
    status: 'normal',
    doctor: 'Dr. Sarah Miller',
    comments: 'Thyroid function within normal limits. No signs of hyper or hypothyroidism.',
    location: 'Central Laboratory',
    fasting: false,
    preparation: 'No specific preparation required.',
    parameters: [
      { 
        name: 'TSH', 
        value: 2.5, 
        unit: 'mIU/L', 
        reference: '0.4-4.0', 
        status: 'normal',
        prevValue: 2.3,
        trend: [2.0, 2.1, 2.3, 2.5]
      },
      { 
        name: 'Free T4', 
        value: 1.2, 
        unit: 'ng/dL', 
        reference: '0.8-1.8', 
        status: 'normal',
        prevValue: 1.3,
        trend: [1.3, 1.3, 1.3, 1.2]
      },
      { 
        name: 'Free T3', 
        value: 3.1, 
        unit: 'pg/mL', 
        reference: '2.3-4.2', 
        status: 'normal',
        prevValue: 3.0,
        trend: [2.9, 2.9, 3.0, 3.1]
      }
    ],
    history: [
      { date: '2023-05-20', value: 2.3, status: 'normal' },
      { date: '2023-02-15', value: 2.1, status: 'normal' },
      { date: '2022-11-10', value: 2.0, status: 'normal' },
      { date: '2022-08-05', value: 1.9, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your thyroid function tests are all within the normal range.',
        severity: 'positive'
      },
      {
        type: 'trend',
        message: 'Your TSH levels have shown slight variation but remain well within the normal range.',
        severity: 'positive'
      }
    ]
  },
  {
    id: 8,
    name: 'Urinalysis',
    type: 'Urine Test',
    date: '2023-10-30',
    status: 'pending',
    doctor: 'Dr. Robert Johnson',
    comments: 'Results pending laboratory analysis.',
    location: 'Central Laboratory',
    fasting: false,
    preparation: 'Mid-stream collection recommended.',
    parameters: [],
    history: [
      { date: '2023-04-15', value: null, status: 'normal' },
      { date: '2022-10-20', value: null, status: 'normal' }
    ],
    insights: []
  },
  {
    id: 9,
    name: 'Mammogram',
    type: 'Radiology',
    date: '2023-07-15',
    status: 'normal',
    doctor: 'Dr. Emily Chen',
    comments: 'No suspicious masses or calcifications. BI-RADS Category 1: Negative.',
    location: 'Radiology Department',
    fasting: false,
    preparation: 'No specific preparation required.',
    parameters: [],
    history: [
      { date: '2022-07-20', value: null, status: 'normal' },
      { date: '2021-07-25', value: null, status: 'normal' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your mammogram shows no signs of abnormalities or suspicious findings.',
        severity: 'positive'
      },
      {
        type: 'recommendation',
        message: 'Continue with routine annual screening as recommended for your age group.',
        severity: 'informational'
      }
    ]
  },
  {
    id: 10,
    name: 'HbA1c',
    type: 'Blood Test',
    date: '2023-11-02',
    status: 'critical',
    doctor: 'Dr. Sarah Miller',
    comments: 'Elevated HbA1c indicating poor glycemic control. Recommend lifestyle modifications and medication adjustment.',
    location: 'Central Laboratory',
    fasting: false,
    preparation: 'No specific preparation required.',
    parameters: [
      { 
        name: 'HbA1c', 
        value: 7.2, 
        unit: '%', 
        reference: '4.0-5.6', 
        status: 'critical',
        prevValue: 6.8,
        trend: [6.2, 6.5, 6.8, 7.2]
      }
    ],
    history: [
      { date: '2023-08-02', value: 6.8, status: 'critical' },
      { date: '2023-05-05', value: 6.5, status: 'critical' },
      { date: '2023-02-10', value: 6.2, status: 'critical' },
      { date: '2022-11-15', value: 5.8, status: 'borderline' }
    ],
    insights: [
      {
        type: 'observation',
        message: 'Your HbA1c is elevated, indicating higher average blood sugar levels over the past 3 months.',
        severity: 'high'
      },
      {
        type: 'trend',
        message: 'Your HbA1c values have been steadily increasing over the past year, suggesting worsening glucose control.',
        severity: 'high'
      },
      {
        type: 'recommendation',
        message: 'Consider improving dietary habits by reducing refined carbohydrates and increasing fiber intake.',
        severity: 'moderate'
      },
      {
        type: 'action',
        message: 'Consult with your healthcare provider about potential adjustments to your diabetes management plan.',
        severity: 'high'
      }
    ]
  }
]; 