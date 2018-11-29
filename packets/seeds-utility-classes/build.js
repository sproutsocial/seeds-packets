const sass = require('node-sass');
const fsextra = require('fs-extra');
const path = require('path');

const IN = './index.scss';
const OUT = './dist/seedlings.css';
const BANNER = ` /*
Seedlings.css
--------------
https://github.com/sproutsocial/seeds-packets/tree/master/packets/seeds-utility-classes
*/
`;

sass.render(
  {
    file: IN,
    outFile: OUT,
    includePaths: ['node_modules']
  },
  (err, result) => {
    if (err) {
      throw err;
    }

    const data = `${BANNER} \n ${result.css}`;
    fsextra.outputFile(OUT, data, err => {
      if (err) {
        throw err;
      } else {
        console.info('✔︎ dist/seedlings.css');
      }
    });
  }
);
