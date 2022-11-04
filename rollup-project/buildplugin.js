import * as rollup from 'rollup';
import util from 'util';
async function build() {
  const bundle = await rollup.rollup({
    input: ['./src/index.js']
  });
  console.log(util.inspect(bundle));
}
build();
