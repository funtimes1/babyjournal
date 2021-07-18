module.exports = {
  extends: [
    'universe',
    'universe/native',
    'universe/node',
    'universe/web',
    'universe/shared/typescript-analysis',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
