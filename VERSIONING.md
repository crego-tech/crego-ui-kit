# Versioning and Publishing Guide

This guide explains how to use the automated versioning and publishing system for `@crego/ui-kit`.

## Overview

The system uses npm's built-in versioning with git tags and GitHub Actions for automated publishing. When you run `npm version`, it will:

1. Update the version in `package.json`
2. Create a git tag
3. Push the changes and tags to GitHub
4. Trigger the GitHub Actions workflow to build and publish the package

## Prerequisites

### 1. NPM Authentication Token

You need to create an NPM authentication token and add it to your GitHub repository secrets:

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Go to "Access Tokens" in your account settings
3. Create a new "Automation" token
4. Copy the token
5. In your GitHub repository, go to Settings → Secrets and variables → Actions
6. Add a new secret named `NPM_TOKEN` with the token value

### 2. GitHub Repository Access

Make sure your GitHub repository has the following permissions:

- Contents: read
- Actions: write
- Metadata: read

## Versioning Commands

### Patch Release (1.3.5 → 1.3.6)

For bug fixes and small changes:

```bash
npm version patch
```

### Minor Release (1.3.5 → 1.4.0)

For new features that don't break existing functionality:

```bash
npm version minor
```

### Major Release (1.3.5 → 2.0.0)

For breaking changes:

```bash
npm version major
```

### Pre-release Versions

For beta/alpha releases:

```bash
# Beta release
npm version prerelease --preid=beta
# Results in: 1.3.6-beta.0

# Alpha release
npm version prerelease --preid=alpha
# Results in: 1.3.6-alpha.0
```

## What Happens When You Run `npm version`

1. **Pre-version checks**: Runs type checking and format checking
2. **Version update**: Updates `package.json` with the new version
3. **Git operations**:
   - Adds all changes to git
   - Creates a git tag (e.g., `v1.3.6`)
   - Pushes changes and tags to GitHub
4. **Automated publishing**: GitHub Actions workflow triggers and:
   - Builds the package
   - Runs tests and checks
   - Publishes to npm
   - Creates a GitHub release

## Manual Publishing (if needed)

If you need to publish manually without using the automated system:

```bash
# Build the package
npm run build

# Publish to npm
npm publish

# For pre-release versions
npm publish --tag beta
```

## Workflow Scripts Explained

The following scripts are configured in `package.json`:

- `preversion`: Runs before versioning (type check, format check)
- `version`: Runs after version bump, before commit (adds files to git)
- `postversion`: Runs after commit and tag creation (pushes to GitHub)
- `prepublishOnly`: Runs before publishing (builds the package)

## GitHub Actions Workflow

The workflow (`.github/workflows/publish.yml`) triggers on tag pushes and:

1. **Checks out code** from the tag
2. **Sets up Node.js** environment
3. **Installs dependencies** with `npm ci`
4. **Builds the package** with `npm run build`
5. **Runs quality checks** (type check, format check)
6. **Publishes to npm** using the NPM_TOKEN secret
7. **Creates GitHub release** with release notes

## Best Practices

### Before Versioning

1. **Ensure all changes are committed**:

   ```bash
   git add .
   git commit -m "feat: add new component"
   ```

2. **Run tests and checks locally**:

   ```bash
   npm run typecheck
   npm run format:check
   npm run build
   ```

3. **Update CHANGELOG.md** (if you maintain one)

### Version Naming

- Use semantic versioning (semver)
- Be consistent with version types
- Use pre-release versions for testing

### After Versioning

1. **Monitor the GitHub Actions workflow** to ensure successful publishing
2. **Verify the package on npm** to confirm it was published correctly
3. **Test the published package** in a consuming application

## Troubleshooting

### Common Issues

1. **NPM_TOKEN not found**: Ensure the secret is set in GitHub repository settings
2. **Build failures**: Check that all dependencies are properly installed
3. **Permission errors**: Verify npm package permissions and authentication
4. **Tag conflicts**: Ensure you're not trying to create duplicate tags

### Rollback Process

If a version was published incorrectly:

1. **Unpublish the version** (only possible within 72 hours):

   ```bash
   npm unpublish @crego/ui-kit@1.3.6
   ```

2. **Delete the git tag**:

   ```bash
   git tag -d v1.3.6
   git push origin :refs/tags/v1.3.6
   ```

3. **Reset the version** in package.json and commit

## Security Considerations

- Never commit NPM tokens to the repository
- Use automation tokens for CI/CD
- Regularly rotate authentication tokens
- Review package contents before publishing

## Example Workflow

Here's a complete example of releasing a new version:

```bash
# 1. Make your changes and commit them
git add .
git commit -m "feat: add new Button variant"

# 2. Run a patch version (1.3.5 → 1.3.6)
npm version patch

# 3. The system will automatically:
#    - Update package.json
#    - Create git tag v1.3.6
#    - Push to GitHub
#    - Trigger GitHub Actions
#    - Build and publish to npm
#    - Create GitHub release

# 4. Monitor the GitHub Actions tab to ensure success
```

This system provides a robust, automated way to manage versioning and publishing while maintaining quality and consistency.
