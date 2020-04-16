# fullstack-ab-testing

## Description

Deployed demo: https://cloudflare-fullstack-app.andrewshieh.workers.dev/

This project uses the Cloudflare Workers API to route users to one of two variants of a site (ostensibly for A/B
testing) returned from a fetched URL with equal probability. Also implements the first two extra credit features:
changing copy/URLs and persisting variants via cookies.

The variants differ in their button color: one has a green button, the other has a blue button. Since cookies track
your site visits, you need to clear cookies to view the other variant.

## About

This project was created to supplement my application to the Cloudflare Summer 2020 Internship Program. You find find
the full project spec here: https://github.com/cloudflare-internship-2020/internship-application-fullstack
