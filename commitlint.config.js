// ============================================================
// LearnVeda — Commitlint Configuration
// ============================================================
// Enforces conventional commit messages across the monorepo.
// Format: type(scope): description
// Example: feat(web): add hero section animation
// ============================================================

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style (formatting)
        'refactor', // Code refactoring
        'test',     // Tests
        'chore',    // Maintenance
        'perf',     // Performance
        'ci',       // CI/CD
        'build',    // Build system
        'revert',   // Revert commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'web',
        'admin',
        'docs',
        'storybook',
        'ui',
        'hooks',
        'utils',
        'types',
        'config',
        'theme',
        'animations',
        'icons',
        'validators',
        'seo',
        'analytics',
        'security',
        'i18n',
        'database',
        'api-gateway',
        'auth',
        'user',
        'course',
        'classroom',
        'payment',
        'notification',
        'community',
        'leaderboard',
        'battle',
        'search',
        'ai',
        'media',
        'compiler',
        'simulation',
        'test',
        'certificate',
        'chat',
        'email',
        'cms',
        'infra',
        'ci',
        'deps',
        'root',
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
  },
};
