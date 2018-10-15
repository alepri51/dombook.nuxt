export default function ({ app, store }) {
    debugger
    app.router.onReady(() => console.log(app.router.currentRoute.query))
}