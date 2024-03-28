import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Assuming AppModule is your root module
import { Compiler } from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const compiler = moduleRef.injector.get(Compiler);
    compiler.compileModuleAndAllComponentsSync(AppModule);
  })
  .catch(err => console.error(err));