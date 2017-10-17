import riot from 'riot';
import route from 'riot-route';

var $app = document.querySelector('#app-root');
var $nav = document.querySelector('#nav-root');

//nav tag
require.ensure([], () => {
  const navigationTag = require('./navigation/navigation.tag.html');;
  $nav.innerHTML = "<navigation></navigation>";
  riot.mount('navigation', {});
}, 'navigationtag');


//app tag
route('/', (name) => {
  require.ensure([], function() {
    const appTag = require('./app/app.tag.html');
    $app.innerHTML = "<app></app>";
    riot.mount('app', {});
  },'apptag')
});

//another tag
route('/another', () => {
  require.ensure([], function() {
    const anotherTag = require('./another/another.tag.html');
    $app.innerHTML = "<another></another>";
    riot.mount('another', {
      title: "This is text injected on mount only with route"
    });
  },'anothertag')
});

route.start(true);