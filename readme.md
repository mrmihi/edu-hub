# pharmaceutical

This is a [Turborepo](https://turbo.build/repo) designed to house all components of the Pharmaceutical project.

</br>

## File Structure

- .github - GitHub Actions workflows
- .husky - Git hooks
- frontend - The frontend application
- packages - All shared packages
  - constants - Common constants
  - middleware - Common middleware functions for Express
  - mongoose - Mongoose database connection wrapper
  - redis - Redis database connection wrapper
  - server - Common Root Express server which is responsible for bootstrapping all of the microservices including middleware, database connections, and routes
  - utils - Common utility functions
- services - All backend microservices
- workspace-scripts - Scripts for managing tasks across workspaces
- jest.config.js - Jest configuration file
- turbo.json - Turbo configuration file

</br>

## Preqrequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher).
- [pnpm](https://pnpm.io) (v6 or higher).
- You will need to create a `.env` at the root of every workspace and fill in the required keys.
- Email functionality is provided through Gmail and as such will need a pair of credentials to authenticate with it. This can be as simple as using a [App Password](https://support.google.com/accounts/answer/185833?hl=en).
- A [MongoDB](https://www.mongodb.com/) and a [Redis](https://redis.io/) data source.
- A [Stripe](https://stripe.com/) account with its [API keys](https://stripe.com/docs/keys).

</br>

## Commands

- `pnpm install` - Installs all dependencies for all packages/apps
- `pnpm build` - Builds all packages/apps using [Esbuild](https://esbuild.github.io/). This must be executed before trying to run any of the apps.
- `pnpm dev` - Runs a development server for all apps.
- `pnpm test` - Runs the test suites for all apps.

</br>

## Utilities

This turborepo has some additional tools already setup for you:

- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

</br>

## Deployment

Deployment is handled automatically by [GitHub Actions](.github\workflows\release.yml) when a commit is pushed to the master branch. The services are containerized and push to the [GitHub Package Registry](https://github.com/features/packages) as Docker images. These images are then pulled by an ArgoCD instance running on a Kubernetes cluster and deployed to the cluster. All of the kubernetes manifest required for this process can be found at the [following repository](https://github.com/Akalanka47000/pharmaceutical-kube-config). The process of updating these manifests has been automated. The Kubernetes cluster can be on any cloud provider, but this project uses a local one bootstrapped through [Docker Desktop](https://www.docker.com/products/docker-desktop).
