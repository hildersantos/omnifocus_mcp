# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for OmniFocus integration built with TypeScript using the @modelcontextprotocol/sdk package.

## Development Philosophy

- **TDD (Test-Driven Development)**: Write tests before implementing functionality
- **KISS (Keep It Simple, Stupid)**: Favor simple solutions over complex ones
- **Incremental Development**: Build features step by step

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

## Resources

- MCP SDK Documentation: https://www.npmjs.com/package/@modelcontextprotocol/sdk
- MCP Tutorial: https://dev.to/shadid12/how-to-build-mcp-servers-with-typescript-sdk-1c28