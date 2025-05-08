# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for OmniFocus integration built with TypeScript using the @modelcontextprotocol/sdk package.

## Development Philosophy

- **TDD (Test-Driven Development)**: Write tests before implementing functionality
- **KISS (Keep It Simple, Stupid)**: Favor simple solutions over complex ones
- **Incremental Development**: Build features step by step
- After each implementation, run all the tests and ensure that the app is building successfully
- After finishing the implementation and ensure that everything is working, ask to the user if he wants to merge the branch on main

## Common Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Architecture

- `/src`: Source code
  - `/handlers`: MCP request handlers
  - `/services`: OmniFocus integration services
  - `/utils`: Utility functions
  - `index.ts`: Entry point

- `/tests`: Test files
  - `/unit`: Unit tests
  - `/integration`: Integration tests

## Git Workflow

- Create a new branch for every coding session
- Commit changes at the end of each session
- Write commit messages in English
- Never add Claude as a co-author in commits

## OmniFocus Integration Guidelines

- **Use Omni Automation API**: All OmniFocus integration MUST use the official Omni Automation API as documented at https://omni-automation.com/omnifocus/OF-API.html
- **Avoid AppleScript**: Do NOT use AppleScript for OmniFocus integration as it lacks cross-platform support
- **Cross-Platform Compatibility**: The Omni Automation API works on macOS, iOS, and iPadOS, making it the preferred integration method for future-proof compatibility
- **URL Scheme Integration**: Use the omnifocus:// URL scheme with omnijs-run parameter to execute scripts in OmniFocus
- **Security Considerations**: Be aware of OmniFocus security measures for external script execution
- **JavaScript Bridge**: Implement a bridge between TypeScript/Node.js and the Omni Automation JavaScript API
- **Mock Implementation**: For development and testing, use mock implementations before integrating with the actual OmniFocus application

### Integration Approaches

1. **URL Scheme Method**:
   - Use `omnifocus://localhost/omnijs-run?script=encodedScript` to execute JavaScript within OmniFocus
   - Pass additional data using the `&arg=encodedArgument` parameter
   - Execute URL using Node.js `child_process.exec` with the macOS `open` command

2. **NPM Packages**:
   - Consider using existing packages like `omnifocus` for basic integration
   - For advanced needs, create custom integration using URL schemes or JXA

3. **Data Operations**:
   - Use TaskPaper format with `Task.byParsingTransportText` for batch operations
   - Be aware of limitations in CRUD operations via external scripts

## Resources

- MCP SDK Documentation: https://www.npmjs.com/package/@modelcontextprotocol/sdk
- MCP Tutorial: https://dev.to/shadid12/how-to-build-mcp-servers-with-typescript-sdk-1c28
- OmniFocus Automation API: https://omni-automation.com/omnifocus/OF-API.html
