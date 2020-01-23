export default class InquirerController {
    private prompt;
    private prompts;
    private exec;
    constructor(prompt: any, prompts: object[]);
    private writeTokenToEnv;
    private fetchRepos;
    private cloneRepos;
    private createRepoFolder;
    intializePrompt: () => Promise<void>;
}
