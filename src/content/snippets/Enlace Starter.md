---
category: Enlace
title: "[Enlace] Enlace Get Started"
tags:
  - code
description: "Enlace Get Started"
---

description here .....

```typescript
@MainApplication
class DemoApplication extends Application {
  @AddAdaptor(HttpAdaptor)
  onAddHttpAdaptor(router: Router) {
    router.useEndpointOn("/", () => "HelloWorld");
  }
}
```
