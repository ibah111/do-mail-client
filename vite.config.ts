import fs from 'fs/promises';
import s from 'semver';
import gitSemverTags from 'git-semver-tags';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';
const gitGet = () =>
  new Promise((resolve) => {
    gitSemverTags({ tagPrefix: 'v' }, (err, result) => {
      const tags = result.map((value) => s.clean(value));
      resolve(tags[0]);
    });
  });
const prepare = async () => {
  const tag = await gitGet();
  await fs.writeFile('./src/utils/.version.js', `export default "${tag}";`);
};
prepare();
export default defineConfig({
  plugins: [react(), legacy(), checker({ typescript: true })],
  server: { port: 3000 },
  base: '/apps/mail',
});
