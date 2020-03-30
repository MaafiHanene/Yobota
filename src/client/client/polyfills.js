import 'babel-polyfill';
import 'intersection-observer';
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import assign from 'core-js/library/fn/object/assign';

// eslint-disable-next-line no-extend-native
String.prototype.includes = includes;
// eslint-disable-next-line no-extend-native
String.prototype.repeat = repeat;
Object.assign = assign;
