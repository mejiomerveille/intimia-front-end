import createMiddleware from 'next-intl/middleware';
 
let rootSite = 'localhost:3000';
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['gb','fr'],
  defaultLocale: 'fr',
  localePrefix:'always',
  domains:[
    {
      domain:"fr.localhost:3000",
      defaultLocale: 'fr',
    },
    {
      domain:"en.localhost:3000",
      defaultLocale: 'gb',
    }
  ]
 
  
});
 