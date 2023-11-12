# Material UI - Next.js App Router example in TypeScript

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with Material UI installed.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/material-ui-nextjs-ts
cd material-ui-nextjs-ts
```

Install it and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

or:

<!-- #default-branch-switch -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-nextjs-ts)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui/material-ui/tree/master/examples/material-ui-nextjs-ts)

## Learn more

To learn more about this example:

- [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://mui.com/material-ui/getting-started/templates/) section.

## env file example

```
BACKEND_BASE_DEV_URL=https://beta.floyx.com
BACKEND_BASE_URL=https://www.floyx.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=HBgBGs3QXQ7Efmu/FFyzXcKGnhbipvw0ArDme0SYD2o=
GOOGLE_CLIENT_ID=247852025445-u2ju43kc4e5ngm5g876p5ka0h99v0etm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FACEBOOK_CLIENT_ID=697910902025227
FACEBOOK_CLIENT_SECRET=875e5700c058afb6164d20b04a09b1db
NEXT_PUBLIC_BACKEND_BASE_DEV_URL=https://beta.floyx.com
NEXT_PUBLIC_BACKEND_BASE_URL=https://www.floyx.com
```

## Facebook auth setup

For facebook
go to https://developers.facebook.com/
create a new app, go to app settings, basic
put app id as ```FACEBOOK_CLIENT_ID``` and App secret as ```FACEBOOK_CLIENT_SECRET```
go to use cases, make sure you have Facebook Login, email, public_profile access
you can set site url and stuff there when you are in production

## Google auth setup

for google
go to https://console.cloud.google.com/
go to api and services
go to oauth consent screen
enter app name and email and add domains
in scopes, select userinfo.email, userinfo.profile and openid
save and continue
go to credentials tab
create new credential with oauth client id
choose app type as web

redirect url to setup if you need any
redirect url : http://localhost:3000/api/auth/callback/google
or http://localhost:3000/api/auth/callback/facebook
