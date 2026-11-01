# Animal App coding agent

The repository profile is `.github/agents/repository-coder.agent.md`, displayed as **animal-app-coder**. It covers bug fixes, feature implementation, relevant checks, and pull request preparation. Shared repository guidance is in `AGENTS.md`, which Codex can also use.

## Activate on GitHub
1. Merge the setup pull request into the default branch.
2. Open https://github.com/copilot/agents and select BlessmoreMadungwe/animal-app.
3. Select **animal-app-coder** in the agent dropdown (refresh if needed), then submit a specific task or select the agent when assigning an issue.

GitHub's cloud agent requires an eligible paid Copilot plan and repository access with the feature enabled. Adding this profile does not purchase a subscription, enable account settings, start a background service, or automatically process all issues. Account availability was not verified as part of this setup.

Example task:
> Fix the bug described in issue #NUMBER. Reproduce it, add regression coverage, run the relevant frontend and backend checks, and prepare a draft pull request with the results.

For Codex, open this repository in your coding environment and submit the task; the root AGENTS.md supplies repository-specific instructions. The GitHub custom-agent dropdown is a Copilot feature, not a separate Codex agent registration.

## Verification
The setup changes Markdown instructions only. The command names and code paths were checked against the repository. Application tests were not run for this configuration-only change; the first coding task should establish the current lint, build, and backend test baseline.

## References
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents
- https://docs.github.com/en/copilot/reference/custom-agents-configuration
- https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex
