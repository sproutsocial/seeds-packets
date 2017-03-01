import theo from 'theo';

theo.registerValueTransform('color/hex/short',
  (prop) => prop.type === 'color',
  (prop) => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#\$1\$2\$3')
);

theo.registerValueTransform('font/px',
  (prop) => prop.type === 'font size',
  (prop) => parseFloat(prop.value) + 'px'
);

theo.registerTransform('web', [
  'color/hex/short',
  'font/px'
]);

theo.registerTransform('js', [
  'color/hex/short'
]);
