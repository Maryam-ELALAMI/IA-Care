import { describe, it, expect, vi } from 'vitest';
import { generateLocalClinicalSummary } from '../services/localAiInference.js';

describe('CareAI Free LLM Gateway & Clinical Triage Service', () => {
    it('returns structured fallback clinical assessment when local servers are offline', async () => {
        // When offline, it gracefully provides deterministic clinical triage guidance
        const result = await generateLocalClinicalSummary("mild headache and fatigue for 2 days", "general");
        expect(result).toBeDefined();
        expect(result.status).toMatch(/fallback|success/);
        expect(result.summary).toContain("Clinical Triage");
        expect(result.provider).toBeDefined();
    });

    it('handles pediatric domain correctly in clinical triage', async () => {
        const result = await generateLocalClinicalSummary("fever 38.5C in 4 year old child", "pediatric");
        expect(result).toBeDefined();
        expect(result.summary).toContain("Pediatrician");
    });
});
