---
category: Enlace
title: "[Enlace] Enlace Get Started"
tags:
  - t11
  - t22
identifier: enlace-get-started
---
```typescript
@MainApplication
class DemoApplication extends Application {

  @AddAdaptor(HttpAdaptor)
  onAddHttpAdaptor(router: Router) {
    router.useEndpointOn('/', () => 'HelloWorld');
  }

}
```
description here .....