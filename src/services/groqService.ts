// ============================================
// CREDENCE - Groq LLM Service
// AI-Powered Project Analysis Engine
// Using Groq's Fast Inference API
// ============================================

import { 
  ProjectAnalysis, 
  DifficultyLevel,
  AnalysisPrompt,
  SkillAssessment,
  ComplexityMetrics,
  CodeQualityMetrics
} from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'; // Fast & capable
// API key loaded from environment variable

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqRequest {
  model: string;
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class GroqService {
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = DEFAULT_MODEL) {
    this.apiKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || '';
    this.model = model;
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  /**
   * Test connection to Groq API
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await this.generate('Say "connected" if you can read this.');
      return response.toLowerCase().includes('connected');
    } catch (error) {
      console.error('Groq connection check failed:', error);
      return false;
    }
  }

  /**
   * Get available models from Groq
   */
  getAvailableModels(): string[] {
    return [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'llama-3.2-90b-vision-preview',
      'mixtral-8x7b-32768',
      'gemma2-9b-it',
    ];
  }

  /**
   * Send a prompt to Groq and get response
   */
  async generate(
    prompt: string, 
    options?: { temperature?: number; maxTokens?: number; model?: string }
  ): Promise<string> {
    const request: GroqRequest = {
      model: options?.model || this.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert code reviewer and skill assessment specialist. Analyze code and projects to evaluate developer skills accurately.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 2048,
      top_p: 0.9,
      stream: false
    };

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Groq API error: ${error.error?.message || response.statusText}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling Groq:', error);
      throw error;
    }
  }

  /**
   * Analyze a project and return structured analysis
   */
  async analyzeProject(input: AnalysisPrompt): Promise<ProjectAnalysis> {
    const prompt = this.buildAnalysisPrompt(input);
    
    try {
      const response = await this.generate(prompt, {
        temperature: 0.3, // Lower temp for consistent analysis
        maxTokens: 3000
      });

      return this.parseAnalysisResponse(response, input);
    } catch (error) {
      console.error('Project analysis failed:', error);
      throw error;
    }
  }

  /**
   * Build the analysis prompt for the LLM
   */
  private buildAnalysisPrompt(input: AnalysisPrompt): string {
    return `You are an expert code reviewer and skill assessment specialist. Analyze the following project and provide a detailed assessment.

PROJECT INFORMATION:
-------------------
Description: ${input.projectDescription}
Type: ${input.projectType}
Technologies Used: ${input.technologies.join(', ')}

CODE/CONTENT:
-------------
${input.codeContent.substring(0, 10000)}

ANALYSIS REQUIRED:
------------------
Analyze this project and provide a JSON response with the following structure:

{
  "difficultyLevel": "beginner|intermediate|advanced|expert",
  "difficultyScore": <0-100>,
  "complexityMetrics": {
    "overallComplexity": <0-100>,
    "codeStructure": <0-100>,
    "algorithmicComplexity": <0-100>,
    "systemDesign": <0-100>,
    "testCoverage": <0-100>,
    "documentation": <0-100>
  },
  "codeQuality": {
    "cleanCode": <0-100>,
    "maintainability": <0-100>,
    "bestPractices": <0-100>,
    "errorHandling": <0-100>,
    "performance": <0-100>
  },
  "skillsIdentified": [
    {
      "skillName": "<skill name>",
      "category": "programming|frameworks|databases|devops|data-science|machine-learning|design|soft-skills|domain-knowledge",
      "proficiencyLevel": <0-100>,
      "evidence": ["<specific evidence from code>"]
    }
  ],
  "suggestions": [
    "<improvement suggestion 1>",
    "<improvement suggestion 2>"
  ],
  "summary": "<brief summary of the project's quality and the developer's demonstrated skills>"
}

IMPORTANT: Respond ONLY with the JSON object, no additional text or markdown formatting.`;
  }

  /**
   * Parse the LLM response into a structured ProjectAnalysis
   */
  private parseAnalysisResponse(response: string, input: AnalysisPrompt): ProjectAnalysis {
    try {
      // Extract JSON from response (in case LLM adds extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      const analysis: ProjectAnalysis = {
        id: this.generateId(),
        projectId: '',
        analyzedAt: new Date(),
        difficultyLevel: this.validateDifficultyLevel(parsed.difficultyLevel),
        difficultyScore: this.clampScore(parsed.difficultyScore),
        complexityMetrics: this.parseComplexityMetrics(parsed.complexityMetrics),
        skillsIdentified: this.parseSkillsIdentified(parsed.skillsIdentified),
        codeQuality: this.parseCodeQuality(parsed.codeQuality),
        suggestions: parsed.suggestions || [],
        llmResponse: response
      };

      return analysis;
    } catch (error) {
      console.error('Failed to parse analysis response:', error);
      return this.getDefaultAnalysis(input);
    }
  }

  /**
   * Validate and return difficulty level
   */
  private validateDifficultyLevel(level: string): DifficultyLevel {
    const validLevels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
    return validLevels.includes(level as DifficultyLevel) 
      ? (level as DifficultyLevel) 
      : 'intermediate';
  }

  /**
   * Clamp score between 0-100
   */
  private clampScore(score: number): number {
    return Math.max(0, Math.min(100, Math.round(score || 50)));
  }

  /**
   * Parse complexity metrics
   */
  private parseComplexityMetrics(metrics: Partial<ComplexityMetrics>): ComplexityMetrics {
    return {
      overallComplexity: this.clampScore(metrics?.overallComplexity || 50),
      codeStructure: this.clampScore(metrics?.codeStructure || 50),
      algorithmicComplexity: this.clampScore(metrics?.algorithmicComplexity || 50),
      systemDesign: this.clampScore(metrics?.systemDesign || 50),
      testCoverage: this.clampScore(metrics?.testCoverage || 30),
      documentation: this.clampScore(metrics?.documentation || 40),
    };
  }

  /**
   * Parse code quality metrics
   */
  private parseCodeQuality(quality: Partial<CodeQualityMetrics>): CodeQualityMetrics {
    return {
      cleanCode: this.clampScore(quality?.cleanCode || 50),
      maintainability: this.clampScore(quality?.maintainability || 50),
      bestPractices: this.clampScore(quality?.bestPractices || 50),
      errorHandling: this.clampScore(quality?.errorHandling || 40),
      performance: this.clampScore(quality?.performance || 50),
    };
  }

  /**
   * Parse skills identified from analysis
   */
  private parseSkillsIdentified(skills: unknown[]): SkillAssessment[] {
    if (!Array.isArray(skills)) return [];

    return skills.map((skill: unknown) => {
      const s = skill as Record<string, unknown>;
      return {
        skillId: this.generateId(),
        skillName: String(s.skillName || 'Unknown'),
        category: s.category as SkillAssessment['category'] || 'programming',
        proficiencyLevel: this.clampScore(Number(s.proficiencyLevel) || 50),
        evidence: Array.isArray(s.evidence) ? s.evidence.map(String) : [],
        lastUpdated: new Date(),
        trend: 'stable' as const
      };
    });
  }

  /**
   * Generate a default analysis when parsing fails
   */
  private getDefaultAnalysis(input: AnalysisPrompt): ProjectAnalysis {
    return {
      id: this.generateId(),
      projectId: '',
      analyzedAt: new Date(),
      difficultyLevel: 'intermediate',
      difficultyScore: 50,
      complexityMetrics: {
        overallComplexity: 50,
        codeStructure: 50,
        algorithmicComplexity: 50,
        systemDesign: 50,
        testCoverage: 30,
        documentation: 40,
      },
      skillsIdentified: input.technologies.map(tech => ({
        skillId: this.generateId(),
        skillName: tech,
        category: 'programming' as const,
        proficiencyLevel: 50,
        evidence: ['Used in project'],
        lastUpdated: new Date(),
        trend: 'stable' as const
      })),
      codeQuality: {
        cleanCode: 50,
        maintainability: 50,
        bestPractices: 50,
        errorHandling: 40,
        performance: 50,
      },
      suggestions: [
        'Consider adding more documentation',
        'Add unit tests to improve code reliability',
        'Consider refactoring for better maintainability'
      ],
      llmResponse: 'Analysis generated with default values due to parsing error'
    };
  }

  /**
   * Analyze code complexity specifically
   */
  async analyzeCodeComplexity(code: string, language: string): Promise<number> {
    const prompt = `Analyze the following ${language} code and rate its complexity on a scale of 0-100.
Consider: algorithmic complexity, data structures used, control flow, nested structures, and overall sophistication.

CODE:
${code.substring(0, 6000)}

Respond with ONLY a single number between 0 and 100, nothing else.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.1 });
      const score = parseInt(response.match(/\d+/)?.[0] || '50');
      return this.clampScore(score);
    } catch {
      return 50;
    }
  }

  /**
   * Extract skills from code content
   */
  async extractSkills(code: string, projectType: string): Promise<string[]> {
    const prompt = `Analyze the following code and list the technical skills demonstrated.

PROJECT TYPE: ${projectType}

CODE:
${code.substring(0, 6000)}

List only the skill names, one per line. Include:
- Programming languages
- Frameworks/libraries
- Design patterns
- Database technologies
- DevOps tools
- Any other technical skills evident from the code

Respond with just the skill names, one per line.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.3 });
      return response
        .split('\n')
        .map(s => s.replace(/^[-•*\d.)\s]+/, '').trim())
        .filter(s => s.length > 0 && s.length < 50);
    } catch {
      return [];
    }
  }

  /**
   * Generate improvement suggestions
   */
  async generateSuggestions(code: string, currentSkills: string[]): Promise<string[]> {
    const prompt = `As an expert mentor, review this code and provide 3-5 specific, actionable improvement suggestions.

CURRENT SKILLS: ${currentSkills.join(', ')}

CODE:
${code.substring(0, 6000)}

Provide suggestions that will help the developer grow. Format each suggestion on a new line starting with a number (1. 2. 3. etc.)`;

    try {
      const response = await this.generate(prompt, { temperature: 0.5 });
      return response
        .split('\n')
        .filter(line => /^\d/.test(line))
        .map(line => line.replace(/^\d+[.)]\s*/, '').trim())
        .filter(s => s.length > 0);
    } catch {
      return ['Consider adding more documentation', 'Add error handling'];
    }
  }

  /**
   * Analyze LeetCode problem-solving patterns
   */
  async analyzeLeetCodeProgress(
    problemsSolved: { difficulty: string; topic: string; date: string }[]
  ): Promise<{
    consistencyScore: number;
    difficultyProgression: string;
    strongTopics: string[];
    weakTopics: string[];
    recommendations: string[];
  }> {
    const prompt = `Analyze this LeetCode problem-solving history and provide insights:

PROBLEMS SOLVED:
${JSON.stringify(problemsSolved.slice(-50), null, 2)}

Provide a JSON response with:
{
  "consistencyScore": <0-100 based on daily practice regularity>,
  "difficultyProgression": "beginner|intermediate|advanced|expert",
  "strongTopics": ["<topic1>", "<topic2>"],
  "weakTopics": ["<topic1>", "<topic2>"],
  "recommendations": ["<specific recommendation 1>", "<specific recommendation 2>"]
}

Respond with ONLY the JSON object.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.3 });
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('LeetCode analysis failed:', error);
    }

    return {
      consistencyScore: 50,
      difficultyProgression: 'intermediate',
      strongTopics: [],
      weakTopics: [],
      recommendations: ['Practice more consistently', 'Try harder problems']
    };
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Set the model to use
   */
  setModel(model: string): void {
    this.model = model;
  }

  /**
   * Get current model
   */
  getModel(): string {
    return this.model;
  }

  /**
   * Set API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Analyze LeetCode profile and provide insights
   */
  async analyzeLeetCodeProfile(stats: {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    acceptanceRate: number;
  }): Promise<{
    overallAssessment: string;
    strengthAreas: string[];
    improvementAreas: string[];
    readinessLevel: string;
    recommendations: string[];
    interviewTips: string[];
  }> {
    const prompt = `Analyze this LeetCode profile and provide career insights:

LEETCODE STATS:
- Username: ${stats.username}
- Total Problems Solved: ${stats.totalSolved}
- Easy: ${stats.easySolved} | Medium: ${stats.mediumSolved} | Hard: ${stats.hardSolved}
- Global Ranking: ${stats.ranking}
- Acceptance Rate: ${stats.acceptanceRate}%

Provide a JSON response with:
{
  "overallAssessment": "2-3 sentence summary of their problem-solving ability",
  "strengthAreas": ["array of 3-4 strength areas based on their stats"],
  "improvementAreas": ["array of 2-3 areas to improve"],
  "readinessLevel": "Beginner|Intermediate|Advanced|Expert for technical interviews",
  "recommendations": ["array of 3-4 specific actionable recommendations"],
  "interviewTips": ["array of 3-4 interview preparation tips based on their level"]
}

Only respond with valid JSON, no markdown or explanation.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.4, maxTokens: 1500 });
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('LeetCode analysis failed:', error);
      return {
        overallAssessment: 'Unable to analyze profile at this time.',
        strengthAreas: ['Problem solving', 'Algorithmic thinking'],
        improvementAreas: ['Continue practicing'],
        readinessLevel: 'Intermediate',
        recommendations: ['Keep solving problems daily'],
        interviewTips: ['Practice explaining your thought process']
      };
    }
  }

  /**
   * Analyze GitHub profile and repositories
   */
  async analyzeGitHubProfile(profile: {
    username: string;
    publicRepos: number;
    followers: number;
    following: number;
    bio?: string;
    repositories: Array<{
      name: string;
      description?: string;
      language?: string;
      stars: number;
      forks: number;
      topics?: string[];
    }>;
  }): Promise<{
    developerLevel: string;
    primarySkills: string[];
    projectComplexity: string;
    collaborationScore: number;
    openSourceContribution: string;
    portfolioStrength: string;
    recommendations: string[];
    hiringInsights: string;
  }> {
    const topRepos = profile.repositories.slice(0, 10).map(r => 
      `- ${r.name}: ${r.description || 'No description'} (${r.language || 'Unknown'}, ⭐${r.stars}, 🍴${r.forks})`
    ).join('\n');

    const languages = [...new Set(profile.repositories.map(r => r.language).filter(Boolean))];
    const totalStars = profile.repositories.reduce((sum, r) => sum + r.stars, 0);

    const prompt = `Analyze this GitHub developer profile:

PROFILE:
- Username: ${profile.username}
- Public Repos: ${profile.publicRepos}
- Followers: ${profile.followers} | Following: ${profile.following}
- Bio: ${profile.bio || 'Not provided'}
- Total Stars: ${totalStars}
- Languages Used: ${languages.join(', ')}

TOP REPOSITORIES:
${topRepos}

Provide a JSON response:
{
  "developerLevel": "Junior|Mid-Level|Senior|Staff based on portfolio",
  "primarySkills": ["top 5 technical skills evident from repos"],
  "projectComplexity": "Basic|Intermediate|Advanced|Complex - overall project complexity",
  "collaborationScore": 0-100 based on community engagement,
  "openSourceContribution": "assessment of open source involvement",
  "portfolioStrength": "Weak|Moderate|Strong|Exceptional",
  "recommendations": ["3-4 recommendations to improve their GitHub presence"],
  "hiringInsights": "2-3 sentences about this candidate from a hiring perspective"
}

Only respond with valid JSON.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.4, maxTokens: 1500 });
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('GitHub analysis failed:', error);
      return {
        developerLevel: 'Mid-Level',
        primarySkills: languages.filter((l): l is string => l !== undefined).slice(0, 5),
        projectComplexity: 'Intermediate',
        collaborationScore: 50,
        openSourceContribution: 'Some contributions visible',
        portfolioStrength: 'Moderate',
        recommendations: ['Add more project descriptions', 'Increase documentation'],
        hiringInsights: 'Developer with growing portfolio.'
      };
    }
  }

  /**
   * Generate comprehensive career readiness report
   */
  async generateCareerReport(data: {
    leetcode?: { totalSolved: number; easySolved: number; mediumSolved: number; hardSolved: number; ranking: number };
    github?: { publicRepos: number; followers: number; languages: string[]; totalStars: number };
    skills?: string[];
  }): Promise<{
    overallScore: number;
    interviewReadiness: string;
    marketability: string;
    topStrengths: string[];
    developmentPlan: string[];
    estimatedSalaryRange: string;
    roleRecommendations: string[];
  }> {
    const prompt = `Generate a career readiness report for a developer:

DATA:
${data.leetcode ? `LeetCode: ${data.leetcode.totalSolved} solved (E:${data.leetcode.easySolved}/M:${data.leetcode.mediumSolved}/H:${data.leetcode.hardSolved}), Rank: ${data.leetcode.ranking}` : 'LeetCode: Not connected'}
${data.github ? `GitHub: ${data.github.publicRepos} repos, ${data.github.followers} followers, ${data.github.totalStars} stars, Languages: ${data.github.languages.join(', ')}` : 'GitHub: Not connected'}
${data.skills ? `Skills: ${data.skills.join(', ')}` : ''}

Provide JSON:
{
  "overallScore": 0-100 career readiness score,
  "interviewReadiness": "Not Ready|Preparing|Ready|Highly Prepared",
  "marketability": "assessment of job market readiness",
  "topStrengths": ["3-4 key strengths"],
  "developmentPlan": ["4-5 specific action items for career growth"],
  "estimatedSalaryRange": "estimated salary range for entry/mid level in tech",
  "roleRecommendations": ["3-4 job roles that match their profile"]
}

Only JSON response.`;

    try {
      const response = await this.generate(prompt, { temperature: 0.5, maxTokens: 1500 });
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Career report generation failed:', error);
      return {
        overallScore: 65,
        interviewReadiness: 'Preparing',
        marketability: 'Growing potential in the job market',
        topStrengths: ['Problem solving', 'Programming fundamentals'],
        developmentPlan: ['Continue leetcode practice', 'Build more projects'],
        estimatedSalaryRange: '$60,000 - $90,000',
        roleRecommendations: ['Software Engineer', 'Full Stack Developer']
      };
    }
  }
}

// Export singleton instance
export const groqService = new GroqService();

// Export class for custom instances
export { GroqService };

// Also export as default for backward compatibility
export default groqService;
