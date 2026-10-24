/**
 * CareAI Clinical RAG & Triage Knowledge Engine
 * 
 * Provides evidence-based clinical symptom intake, emergency detection,
 * and intelligent routing to CareAI diagnostic panels (Skin, Brain Cancer, Alzheimer's, Parkinson's).
 */

export const EMERGENCY_KEYWORDS = [
    "chest pain", "can't breathe", "cannot breathe", "shortness of breath",
    "stroke", "paralysis", "slurred speech", "sudden numbness",
    "severe bleeding", "unconscious", "suicide", "overdose", "seizure"
];

export const CLINICAL_KNOWLEDGE_BASE = [
    {
        category: "skin",
        name: "Dermatological & Melanoma Screening",
        route: "/Skin",
        keywords: [
            "skin", "mole", "lesion", "rash", "melanoma", "spot", "freckle",
            "itchy mole", "bleeding mole", "dark spot", "asymmetrical", "border", "color change"
        ],
        overview: "Our dermatological screening module analyzes skin lesions using computer vision trained on ISIC datasets according to the clinical ABCDE melanoma criteria.",
        advice: [
            "Check for Asymmetry: Does one half match the other?",
            "Inspect Borders: Are the edges ragged, notched, or blurred?",
            "Look at Color: Is the pigmentation uneven (shades of brown, black, red, white)?",
            "Evaluate Diameter: Is the spot larger than 6mm (pencil eraser size)?",
            "Observe Evolution: Has the mole changed in size, shape, or symptom profile over recent weeks?"
        ],
        actionPrompt: "Open Skin Cancer Screening Module"
    },
    {
        category: "brain",
        name: "Neuro-Oncology & Brain MRI Analysis",
        route: "/BrainCancer",
        keywords: [
            "headache", "brain", "tumor", "mri", "vision loss", "double vision",
            "morning headache", "nausea", "vomiting", "dizziness", "confusion", "head pressure"
        ],
        overview: "Our neuro-oncology pipeline analyzes axial and coronal MRI brain scans for gliomas, meningiomas, and pituitary tumors with Grad-CAM localization.",
        advice: [
            "Morning-predominant headaches that awaken you from sleep warrant prompt medical review.",
            "Associated neurological signs such as focal visual field deficits, unilateral limb weakness, or persistent dizziness should be evaluated by a neurologist.",
            "If you possess an MRI or CT neuroimaging file, you can upload it directly into our Brain Cancer Diagnostic Scanner."
        ],
        actionPrompt: "Launch Brain Cancer Diagnostic Scanner"
    },
    {
        category: "parkinson",
        name: "Movement Disorders & Parkinson's Detection",
        route: "/Parkinson",
        keywords: [
            "tremor", "shaking", "parkinson", "stiffness", "rigidity", "gait",
            "slow movement", "bradykinesia", "balance", "hand tremor", "voice tremor", "jitter", "shimmer"
        ],
        overview: "Our movement disorder suite processes biomedical voice acoustic recordings (MDVP jitter, shimmer, HNR, RPDE) to detect early neurodegenerative vocal biomarkers.",
        advice: [
            "Resting tremors that occur predominantly when the hands or limbs are at rest are a hallmark clinical sign.",
            "Bradykinesia (slowness of voluntary movements) and micro-graphia (progressively smaller handwriting) are early functional indicators.",
            "Acoustic phonation analysis can capture subtle dysphonia and micro-tremors before overt motor deficits manifest."
        ],
        actionPrompt: "Run Parkinson's Voice Biomarker Check"
    },
    {
        category: "alzheimer",
        name: "Cognitive Neurology & Alzheimer's Screening",
        route: "/Alzheimers",
        keywords: [
            "memory", "forget", "alzheimer", "dementia", "cognitive", "disorientation",
            "getting lost", "names", "repeating questions", "confusion", "brain fog"
        ],
        overview: "Our cognitive neurology panel screens structural neuroimaging and clinical assessments to evaluate risk indicators for mild cognitive impairment (MCI) and Alzheimer's disease.",
        advice: [
            "Disruption of daily life by forgetting newly learned information or important recurring dates.",
            "Challenges in planning, solving familiar problems, or tracking monthly finances.",
            "Disorientation to time, date, or familiar geographic locations.",
            "Early intervention and lifestyle neuroprotection (aerobic exercise, Mediterranean diet, cognitive engagement) yield optimal longitudinal outcomes."
        ],
        actionPrompt: "Start Alzheimer's Cognitive Assessment"
    }
];

export const GENERAL_DISCLAIMER = 
    "⚠️ Medical Safety Notice: CareAI is an academic clinical decision-support prototype designed for preliminary triage and health education. It does not replace formal in-person diagnosis by a board-certified physician.";

export const QUICK_PROMPTS = [
    { label: "🔍 Skin Lesion / Mole Check", prompt: "I noticed a dark, asymmetrical mole on my arm that has grown recently." },
    { label: "🧠 Persistent Morning Headaches", prompt: "I have been having severe morning headaches accompanied by visual aura and nausea." },
    { label: "🖐️ Hand Tremor at Rest", prompt: "I am experiencing subtle hand tremors when resting and slight stiffness when walking." },
    { label: "🧩 Memory Lapses & Brain Fog", prompt: "A family member is experiencing frequent memory lapses, repeating questions, and forgetting familiar routes." },
];

/**
 * Evaluates patient prompt against clinical knowledge base and generates
 * structured triage guidance with recommended diagnostic pathways.
 */
export function processClinicalTriage(userInput) {
    const input = userInput.toLowerCase().trim();

    // 1. Emergency Detection
    for (const kw of EMERGENCY_KEYWORDS) {
        if (input.includes(kw)) {
            return {
                type: "emergency",
                category: "acute",
                title: "🚨 Immediate Emergency Medical Guidance",
                message: `Your message mentions potential high-risk symptoms (**"${kw}"**). 

If you or the patient are experiencing severe chest pressure, sudden numbness or paralysis, difficulty breathing, slurred speech, or acute loss of consciousness, **please call emergency services immediately (15 / 112 in Morocco/Europe or 911)** or proceed directly to the nearest emergency department. 

Do not wait for online screening tools in an acute emergency.`,
                action: null,
                severity: "critical"
            };
        }
    }

    // 2. Specialty Matching
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of CLINICAL_KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of entry.keywords) {
            if (input.includes(kw)) {
                score += kw.length > 5 ? 2 : 1;
            }
        }
        if (score > highestScore) {
            highestScore = score;
            bestMatch = entry;
        }
    }

    if (bestMatch && highestScore > 0) {
        const bulletPoints = bestMatch.advice.map(pt => `• ${pt}`).join("\n");
        return {
            type: "triage",
            category: bestMatch.category,
            title: `📋 CareAI Clinical Triage: ${bestMatch.name}`,
            message: `Based on the clinical indicators provided, your query relates to **${bestMatch.name}**.\n\n${bestMatch.overview}\n\n**Clinical Considerations:**\n${bulletPoints}`,
            action: {
                label: bestMatch.actionPrompt,
                route: bestMatch.route
            },
            severity: "moderate"
        };
    }

    // 3. Fallback General Healthcare Guidance
    return {
        type: "general",
        category: "general",
        title: "🏥 CareAI General Clinical Triage Assistant",
        message: `Thank you for sharing your symptoms. CareAI provides four specialized screening panels:\n\n` +
                 `1. **Skin Cancer (Melanoma)**: Computer vision evaluation of dermoscopic skin lesions.\n` +
                 `2. **Brain Tumor (Neuro-Oncology)**: Structural MRI tumor detection and classification.\n` +
                 `3. **Parkinson's Disease**: Acoustic vocal biomarker analysis for motor deficit screening.\n` +
                 `4. **Alzheimer's Disease**: Neurocognitive risk evaluation and diagnostic guidance.\n\n` +
                 `Please describe your specific symptoms or select one of the suggested clinical intake prompts below.`,
        action: null,
        severity: "low"
    };
}
