import {mutations} from '../store/index'

export default function ({ app }) {
    //debugger
    const redirect = function (name, noRouter = false) {

        debugger
        let to = '/' + name;

        if(name !== 'login' && this.options.redirect[name]) return
        /* this.from && (name = this.from);
        let to = '/' + name;
        const from = this.options.fullPathRedirect ? this.ctx.route.fullPath : this.ctx.route.path;
        
        if(!process.browser) {
            const fs = require('fs');
            fs.writeFileSync('saved.txt', from);
        } 
        
        this.ctx.route.meta.push(from);

        this.from = from; */
        const from = this.options.fullPathRedirect ? this.ctx.route.fullPath : this.ctx.route.path;

        if (process.browser) {
            if (noRouter) {
                window.location.replace(to)
            } else {
                this.ctx.redirect(to)
            }
        } else {
            //this.ctx.redirect(to);
            this.ctx.redirect(to, { ...this.ctx.route.query, redirect: from })
        }
        /* if(process.browser) {
            console.log('window', window.location.href);
        } */
        console.log('from', from);
    }

    app.$auth.redirect = redirect.bind(app.$auth)

    if(process.browser) {
    }
}
/* export const isSameURL = (a, b) => a.split('?')[0] === b.split('?')[0]

export const isRelativeURL = u =>
  u && u.length && /^\/[a-zA-Z0-9@\-%_~][/a-zA-Z0-9@\-%_~]*[?]?([^#]*)#?([^#]*)$/.test(u)

export default function ({ app }) {
    if(process.browser) {
        console.log('window', window.location.href);
    }
    //debugger
  const redirect = function (name, noRouter = false) {
    if (!this.options.redirect) {
      return
    }

    const from = this.options.fullPathRedirect ? this.ctx.route.fullPath : this.ctx.route.path

    let to = this.options.redirect[name]
    if (!to) {
      return
    }

    // Apply rewrites
    if (this.options.rewriteRedirects) {
      if (name === 'login' && isRelativeURL(from) && !isSameURL(to, from)) {
        this.$storage.setUniversal('redirect', from)
      }

      if (name === 'home') {
        const redirect = this.$storage.getUniversal('redirect') || this.ctx.route.query.redirect
        this.$storage.setUniversal('redirect', null)

        if (isRelativeURL(redirect)) {
          to = redirect
        }
      }
    }

    // Prevent infinity redirects
    if (isSameURL(to, from)) {
      return
    }

    if (process.browser) {
      if (noRouter) {
        window.location.replace(to)
      } else {
        this.ctx.redirect(to)
      }
    } else {
      this.ctx.redirect(to, { ...this.ctx.route.query, redirect: from })
    }
  }

  app.$auth.redirect = redirect.bind(app.$auth)
} */