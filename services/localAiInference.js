/**
 * CareAI Multi-Provider Free LLM Gateway & Clinical Triage Service
 * Connects to OmniRoute (localhost:11411) / LiteLLM (localhost:4000) / Ollama (localhost:11434)
 * Provides zero-cost, multi-provider failover across Groq, Cerebras, SambaNova, Gemini, and Local SLMs.
 */

const GATEWAY_URLS = [
    { url: "http://localhost:11411/v1/chat/completions", type: "openai", name: "OmniRoute Token-Saver Gateway" },
    { url: "http://localhost:4000/v1/chat/completions", type: "openai", name: "LiteLLM Free API Proxy" },
    { url: "http://localhost:11434/api/chat", type: "ollama", name: "Direct Ollama Local Inference" }
];

export async function generateLocalClinicalSummary(symptoms, domain = "general") {
    const systemPrompt = "You are a clinical AI triage assistant. Summarize patient symptoms clearly with differential considerations, triage urgency, and recommended specialty. Provide concise bullet points. Keep advice educational and safe.";
    const userMessage = `Patient presentation (Domain: ${domain}):\n"${symptoms}"`;

    for (const gateway of GATEWAY_URLS) {
        try {
            let response;
            if (gateway.type === "openai") {
                response = await fetch(gateway.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer sk-omniroute-master-key"
                    },
                    body: JSON.stringify({
                        model: "groq-llama-70b", // Auto-fallback to local-coder / gemini if offline
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userMessage }
                        ],
                        temperature: 0.2
                    })
                });
            } else {
                response = await fetch(gateway.url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: "qwen2.5-coder:1.5b",
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userMessage }
                        ],
                        stream: false
                    })
                });
            }

            if (response.ok) {
                const data = await response.json();
                const content = data.choices ? data.choices[0].message.content : data.message.content;
                return {
                    status: "success",
                    summary: content,
                    provider: gateway.name,
                    tokensSaved: data.usage?.prompt_tokens_saved || 0
                };
            }
        } catch (err) {
            // Silently try next fallback in chain
            continue;
        }
    }

    // Deterministic Rule-Based Fallback if all network gateways are uninitialized
    return {
        status: "fallback",
        summary: `### Clinical Triage Assessment (Rule-Engine Fallback)\n- **Reported Symptoms**: ${symptoms}\n- **Triage Priority**: Standard Ambulatory Review\n- **Specialty Guidance**: Consult a ${domain === "pediatric" ? "Pediatrician" : "General Practitioner"} for in-person evaluation.\n- *Note: Connect to OmniRoute (localhost:11411) for full LLM reasoning.*`,
        provider: "CareAI Emergency Clinical Rules"
    };
}
