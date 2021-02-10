---
category: Enlace
title: "[Enlace] Enlace Get Started"
tags:
- code
identifier: enlace-get-started
updateDates:
- 2020-07-15
---

```typescript
@MainApplication
class DemoApplication extends Application {
  @AddAdaptor(HttpAdaptor)
  onAddHttpAdaptor(router: Router) {
    router.useEndpointOn("/", () => "HelloWorld");
  }
}
```

description here .....
