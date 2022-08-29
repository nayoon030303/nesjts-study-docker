/**
 * https://github.com/semantic-release/semantic-release/blob/master/docs/usage/plugins.md
 * https://github.com/semantic-release/semantic-release/blob/master/docs/extending/plugins-list.md as
 */
module.exports = {
  branches: ['master', 'develop'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        successComment:
          ':tada: This ${issue.pull_request ? "PR is included" : "issue has been resolved"} in ' +
          +'[version ${nextRelease.version}](${releases.filter(release => /github.com/i.test(release.url))[0].url}) :tada:',
      },
    ],
    [
      '@semantic-release/exec',
      {
        successCmd:
          'echo "RELEASE_VERSION=${nextRelease.version}" >> $GITHUB_ENV',
      },
    ],
  ],
};
