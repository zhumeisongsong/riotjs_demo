import riot from 'riot';
import route from 'riot-route';

export default class Search {
  constructor(scope, opts) {
    scope.max = 15
    scope.keyword = ''
    scope.rates = []
    scope.filtered = []

    this.opts = opts;

    window.fetch('http://api.fixer.io/latest?base=USD')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const rates = Object.keys(data.rates)
          .map((key) => {
            return {title: key, price: data.rates[key]}
          })
          .sort((a, b) => {
            return a.price - b.price
          })
        scope.update({rates: rates})
      })

    const keyup = (e) => {
      scope.keyword=e.target.value
    }

    scope.on('update',()=>{
      scope.filtered = scope.rates.filter((c=>{
        return !scope.keyword||c.title.indexOf(scope.keyword.toUpperCase())==0
      }))
    })

  }
}