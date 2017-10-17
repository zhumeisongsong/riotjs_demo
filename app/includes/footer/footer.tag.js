import riot from 'riot';
import route from 'riot-route';

export default class myFooter {
  current_route = ''

  constructor(scope, opts) {

    this.opts = opts
    this.data = {
      sample: "This is the help for the sample page.",
      another: "This is the help for the another page."
    }

    scope.footerText = 'default page message'
    const r = route.create() // create another routing context

    // on all route changes
    r('*', (id) => {
      scope.footerText = this.data[id] || 'Help not found.'
      scope.update()
    })

    r(() => {
      scope.footerText = 'default page message'
      scope.update()
    })
  }
}