export default
"```typescript\n" +
"@MainApplication\n" +
"class DemoApplication extends Application {\n" +
"\n" +
"  @AddAdaptor(HttpAdaptor)\n" +
"  onAddHttpAdaptor(router: Router) {\n" +
"    router.useEndpointOn('/', () => 'HelloWorld');\n" +
"  }\n" +
"\n" +
"}\n" +
"```";