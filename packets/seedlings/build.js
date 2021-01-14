const sass = require('node-sass');
const fsextra = require('fs-extra');

const BANNER = ` /*
  /$$$$$$                            /$$ /$$ /$$
 /$$__  $$                          | $$| $$|__/
| $$  \\__/  /$$$$$$   /$$$$$$   /$$$$$$$| $$ /$$ /$$$$$$$   /$$$$$$   /$$$$$$$
|  $$$$$$  /$$__  $$ /$$__  $$ /$$__  $$| $$| $$| $$__  $$ /$$__  $$ /$$_____/
 \\____  $$| $$$$$$$$| $$$$$$$$| $$  | $$| $$| $$| $$  \\ $$| $$  \\ $$|  $$$$$$
 /$$  \\ $$| $$_____/| $$_____/| $$  | $$| $$| $$| $$  | $$| $$  | $$ \\____  $$
|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$| $$| $$  | $$|  $$$$$$$ /$$$$$$$/
 \\______/  \\_______/ \\_______/ \\_______/|__/|__/|__/  |__/ \\____  $$|_______/
                                                           /$$  \\ $$
                                                          |  $$$$$$/
                                                           \\______/

https://github.com/sproutsocial/seeds-packets/tree/main/packets/seedlings
*/
`;
const source = './seedlings-marketing.scss';

sass.render(
    {
      file: source,
      outFile: `./dist/${source}`,
      includePaths: ['node_modules']
    },
    (err, result) => {
      if (err) {
        throw err;
      }

      const data = `${BANNER} \n ${result.css}`;
      fsextra.outputFile(`./dist/${source.replace('scss', 'css')}`, data, err => {
        if (err) {
          throw err;
        } else {
          console.info(`✔︎ dist/${source.replace('./', '').replace('scss', 'css')}`);
        }
      });
    }
);
