import riot from 'riot'
import route from 'riot-route'

import StoreMixin from './store'

riot.mixin(StoreMixin)

const $app = document.querySelector('#app_root')
const $nav = document.querySelector('#nav_root')
const $footer = document.querySelector('#footer_root')

//nav tag
require.ensure([], () => {
  const navigationTag = require('./components/includes/navigation/navigation.tag.html')
  $nav.innerHTML = '<navigation></navigation>'
  riot.mount('navigation', {})
}, 'navigationtag')
//footer tag
require.ensure([], () => {
  const footerTag = require('./components/includes/footer/footer.tag.html')
  $footer.innerHTML = '<my-footer></my-footer>'
  riot.mount('my-footer')
}, 'footerTag')

//index
route('/', (name) => {
  require.ensure([], () => {
    const appTag = require('./components/top/app.tag.html')
    $app.innerHTML = '<app></app>'
    riot.mount('app', {})
  }, 'apptag')
});

//sample tag
route('/sample', () => {
  require.ensure([], () => {
    const sampleTag = require('./components/sample/sample.tag.html')
    $app.innerHTML = '<sample></sample>'
    riot.mount('sample', {})
  })
}, 'sampletag')


//another tag
route('/another', () => {
  require.ensure([], () => {
    const anotherTag = require('./components/another/another.tag.html')
    $app.innerHTML = '<another></another>'
    riot.mount('another', {
      title: 'This is text injected on mount only with route'
    })
  }, 'anothertag')
})

//filter search tag
route('/search', () => {
  require.ensure([], () => {
    const searchTag = require('./components/search/search.tag.html')
    $app.innerHTML = '<search></search>'
    riot.mount('search', {})
  })
}, 'searchTag')

//timer tag
route('/timer', () => {
  require.ensure([], () => {
    const timerTag = require('./components/timer/timer.tag.html')
    $app.innerHTML = '<timer></timer>'
    riot.mount('timer', {})
  })
}, 'timerTag')

//redux tag
route('/redux', () => {
  require.ensure([], () => {
    const reduxTag = require('./components/redux/redux.tag.html')
    $app.innerHTML = '<redux></redux>'
    riot.mount('redux', {})
  })
}, 'reduxTag')

//todo
route('/todo',()=>{
  require.ensure([],()=>{
    const todoTag = require('./components/todo/todo.tag.html')
    $app.innerHTML= `<todo></todo>`//A document can contain multiple instances of the same tag
    riot.mount('todo',{
      title: 'I want to behave!',
      items: [
        { title: 'Avoid excessive caffeine', done: true },
        { title: 'Hidden item',  hidden: true },
        { title: 'Be less provocative'  },
        { title: 'Be nice to people' }
      ]
    })
  })
},'todoTag')

route.start(true)