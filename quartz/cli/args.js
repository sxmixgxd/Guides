export const CommonArgv = {
  directory: {
    string: true,
    alias: "d",
    default: "content",
    describe: "directory to look for content files",
  },
  verbose: {
    boolean: true,
    alias: "v",
    default: false,
    describe: "print out extra logging information",
  },
}

export const CreateArgv = {
  ...CommonArgv,
  source: {
    string: true,
    alias: "s",
    describe: "source Quartz folder",
  },
  strategy: {
    string: true,
    alias: "X",
    choices: ["new", "copy", "symlink"],
    describe: "strategy for content folder linking",
  },
  branch: {
    string: true,
    alias: "b",
    describe: "branch of Quartz to checkout",
  },
}

export const SyncArgv = {
  ...CommonArgv,
  commit: {
    boolean: true,
    default: true,
    describe: "create a git commit",
  },
  push: {
    boolean: true,
    default: true,
    describe: "push updates to your Quartz fork",
  },
  pull: {
    boolean: true,
    default: true,
    describe: "pull updates from your Quartz fork",
  },
}

export const BuildArgv = {
  ...CommonArgv,
  output: {
    string: true,
    alias: "o",
    default: "public",
    describe: "output folder for files",
  },
  serve: {
    boolean: true,
    default: false,
    describe: "run a local server to preview your Quartz",
  },
  fastRebuild: {
    boolean: true,
    default: false,
    describe: "[experimental] run a faster, partial build when possible",
  },
  baseUrl: {
    string: true,
    describe: "override the base URL to deploy to",
  },
  port: {
    number: true,
    default: 8080,
    describe: "port to serve Quartz on",
  },
  wsPort: {
    number: true,
    default: 3001,
    describe: "port to use for WebSockets during live reload",
  },
  remoteDevHost: {
    string: true,
    describe: "A URL override for the websocket connection if you are using a reverse proxy",
  },
  concurrency: {
    number: true,
    describe: "how many threads to use to parse notes",
  },
}
