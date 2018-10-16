export default function SimpleModule (moduleOptions) {
    // Write your code here
    debugger
    console.log(this, moduleOptions);
    
    this.nuxt.hook('modules:done', moduleContainer => {
        // This will be called when all modules finished loading
        //let ctx = this.options.globals.context();
        console.log(this, moduleOptions, moduleContainer);
    });
}