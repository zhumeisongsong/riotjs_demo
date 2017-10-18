import riot from 'riot'
import route from 'riot-route'

const $app = document.querySelector('#app_root')
const $nav = document.querySelector('#nav_root')
const $footer = document.querySelector('#footer_root')

// route.base('#!')

//nav tag
require.ensure([], () => {
  const navigationTag = require('./includes/navigation/navigation.tag.html')
  $nav.innerHTML = '<navigation></navigation>'
  riot.mount('navigation', {})
}, 'navigationtag')
//footer tag
require.ensure([], () => {
  const footerTag = require('./includes/footer/footer.tag.html')
  $footer.innerHTML = '<my-footer></my-footer>'
  riot.mount('my-footer')
}, 'footerTag')

//index
route('/', (name) => {
  require.ensure([], function () {
    const appTag = require('./components/top/app.tag.html')
    $app.innerHTML = '<app></app>'
    riot.mount('app', {})
  }, 'apptag')
});

//sample tag
route('/sample', () => {
  require.ensure([], function () {
    const sampleTag = require('./components/sample/sample.tag.html')
    $app.innerHTML = '<sample></sample>'
    riot.mount('sample', {})
  })
}, 'sampletag')


//another tag
route('/another', () => {
  require.ensure([], function () {
    const anotherTag = require('./components/another/another.tag.html')
    $app.innerHTML = '<another></another>'
    riot.mount('another', {
      title: 'This is text injected on mount only with route'
    })
  }, 'anothertag')
})

//live filtering
route('/search', () => {
  require.ensure([], function () {
    const searchTag = require('./components/search/search.tag.html')
    $app.innerHTML = '<search></search>'
    riot.mount('search', {})
  })
}, 'searchTag')


route.start(true)