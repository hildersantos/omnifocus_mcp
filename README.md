# OmniFocus MCP

A Model Context Protocol (MCP) server for OmniFocus integration, built with TypeScript.

## Project Status

🔨 Under active development

## Features

- TypeScript-based MCP server
- Integration with OmniFocus task management

## Development

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hildersantos/omnifocus_mcp.git
   cd omnifocus_mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the production-ready code
- `npm start` - Run the production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

### Environment Variables

The following environment variables can be used to configure the application:

- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level (default: info)

## License

ISC