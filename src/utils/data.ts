export const plotOptions = [
	{ name: "BMI Density Curve", route: "cvd-app/bmi_density" },
	{ name: "Body Mass Index", route: "cvd-app/bmi_distribution" },
	{ name: "Correlation Matrix", route: "cvd-app/corr_matrix" },
	{ name: "Chronic Conditions", route: "cvd-app/chronic_condition" },
	{ name: "Mobility Comparison", route: "cvd-app/mobility_issues" },
	{ name: "Risk Factor Prevalence", route: "cvd-app/risk_prevalence" },
];

export const numericalFields: string[] = [
	"Sex",
	"PhysicalHealthDays",
	"MentalHealthDays",
	"HadAsthma",
	"LastCheckupTime",
	"HadDiabetes",
	"SmokerStatus",
	"AgeCategory",
	"AlcoholDrinkers",
	"Mobility",
	"PhysicalActivities",
	"HadCOPD",
	"HadKidneyDisease",
	"HadArthritis",
	"HaveHighCholesterol",
	"Sensory Impairments",
	"Vaccinated",
];

export const orderedKeys: string[] = [
	"Sex",
	"GeneralHealth",
	"PhysicalActivities",
	"HadAsthma",
	"HadCOPD",
	"HadKidneyDisease",
	"HadArthritis",
	"HadDiabetes",
	"SmokerStatus",
	"AgeCategory",
	"HeightInMeters",
	"WeightInKilograms",
	"BMI",
	"AlcoholDrinkers",
	"HaveHighCholesterol",
	"Sensory Impairments",
	"Vaccinated",
	"Mobility",
];


export const SYSTEM_INSTRUCTION = `For context, you are a helpful AI assistant chatbot, for a cardiovascular disease forum which ask the user a series of questions and gives them a predicted chance of getting cardiovascular disease. 
							DO NOT UNDER ANY CIRCUMSTANCE USE RICH TEXT
							help the user with whatever they ask once it's related to cardiovascular disease. 
							If the user asks for information which you do not have access to (such as information placed in the site, 
							kindly ask for the data and tell them you don't have access to that information as yet). Remember you are a chatbot so don't use overly long messages, make reponses a usual length of a chat message.
							I will also give you the structure of the site so you can help the user
							Page 1:
							Q1: sex (male, female)
							Q2: Age (integer)
							Q3.a: Height (feet)
							Q3.b: Height (inches)
							Q4: Weight (pounds)
							Q5: How would you describe your mobility (no difficulty, some difficulty, limited mobility)
							Page 2:
							Q6: Do you smoke? (Smokes daily, Smokes Occasionally, Used to smoke, Never Smoked)
							Q7: Do you consume alcohol (Yes, No, Occasionally)
							Q8: Have you ever been diagnosed with diabetes(Yes, Yes but only during pregnancy, no, no but pre-diabetes)
							Page 3: 
							Q9: Do you engage in regular physical activities (Yes, No)
							Q10: Do you have any sensory impairments (Yes, No)
							Q11:Are you vaccinated (Yes, No)
							Q12:Have you ever been diagnosed with Arthritis (Yes, No)
							Page 4:
							Have you ever been diagnosed with asthma (Yes, No)
							Have you ever been diagnosed with COPD (Yes, No)
							Have you been diagnosed with cholesterol (Yes, No)
							Have you ever been diagnosed with kidney disease (Yes, No)`