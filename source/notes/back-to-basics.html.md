---
title: Back to Basics
subtitle: Adventures in minimalism
date: "2020-12-27"
category: programming
layout: post
---

Every year during the holidays I get the urge to tinker around with my
personal website. I chalk this up to a combination of having some free time
and New Year's resolution feelings.
{:.pull-quote}

For a while I considered using this site as a test-bed for some cool new
technologies. But the reality is, I don't need any of that stuff to maintain
a simple blog or portfolio of my work. Technology trends come and go so
quickly these days. I have come to the conclusion that if you want to build
something to last, you should keep it as simple as possible.

With this philosophy in mind, here is how I'm approaching building out the
latest (and hopefully final) incarnation of my website.

## Back-end: Middleman

I'm using the [Middleman](https://middlemanapp.com/) static-site generator to
generate HTML from a set of Markdown files and Ruby templates.

Static site generators are enjoying a big surge in popularity these days. It
seems like every programming language has at least one good one, and lately
projects like [Gatsby](https://www.gatsbyjs.com), [Next.js](https://nextjs.org), 
and [Redwood.js](https://redwoodjs.com) have been pushing the limits of
what "static" back-end tools can do. There is even a trendy new term for this
architecture, the [JAMStack](https://jamstack.org).

Middleman, in comparison, is one of the more venerable examples of this
type of software. I prefer it for two reasons: it's mostly
feature-complete, and it is written in Ruby, my first love in programming
languages. This gives me a tremendous amount of flexibility: I can
just write [helper methods](https://middlemanapp.com/basics/helper-methods/)
for any added functionality that I need, or develop a full-blown 
[custom extension](https://middlemanapp.com/advanced/custom-extensions/) if
it comes to that. 

For example, here is a helper I wrote to pull [photo data](/photos.html) from my
[Pixelfed account](https://pixelfed.social/egardner):

~~~ ruby
# Get recent public posts for a given user id
# Pixelfed's API generally follows Mastodon's, documented at:
# https://docs.joinmastodon.org/client/public/
#
# @param [String] user_id
# @return [Array] of post data
#
def fetch_pixelfed_posts user_id
  api_path = "/api/pixelfed/v1/accounts"
  endpoint = "statuses"
  host     = "pixelfed.social"
  query    = "min_id=1&only_media=true&limit=24"
  id       =  user_id
  url      = "https://#{host}#{api_path}/#{id}/#{endpoint}?#{query}"
  res      = HTTParty.get url, format: :plain

  JSON.parse res, symbolize_names: true
end
~~~

It's just plain Ruby at the end of the day. I'm confident I can modify and
extend this setup to support other features as needed. Otherwise, it just
works<sup>TM</sup> and stays out of the way. 

## CSS: Pico CSS micro-framework

I often get hung up on the CSS and visual-design stage of my personal
projects. I wanted to avoid that here so I could focus on actually writing
and publishing things instead.

This must be an increasingly common experience, because recently there has
been a proliferation of so-called 
[classless CSS frameworks](https://css-tricks.com/no-class-css-frameworks/) –
stylesheets that add enough styling for base elements that you can do all
your design in HTML.

There are many examples, but I went with a library called
[Pico.css](https://picocss.com). It supports dark mode automatically, which
is nice. And the default designs are mostly to my liking. The ability
to just drop in a single stylesheet sans build system is really a breath of
fresh air too. For the few areas where I have needed to override something,
I've just decided to embrace the cascade and add a 
[custom.css](/stylesheets/custom.css) stylesheet of my own. Why did this
process ever need to be more difficult?

## JS: None! (for now anyway)

I'm not anti-JavaScript, but I simply don't see the need for it yet in this
project. Maybe I'll need a few small functions to support things like photo
lightboxes eventually.

I do intend to avoid Webpack, Babel, and `node_modules` like the plague
however. There is way too much complexity in the Node ecosystem and it seems
like most developers using these tools have little to no idea about what they
actually do under the hood. 
[NPM is also a security nightmare](https://timotijhof.net/posts/2019/protect-yourself-from-npm/).

I've learned how to do without most of these "essential modern tools" over
the last two years of working at Wikimedia, and I intend to never go back to
the insanity of front-end build tools. 

## Deployment: Github & Netlify

The source code for this site is publicly visible on
[GitHub](https://github.com/egardner/ericgardner.info).

To deploy it, I use the excellent [Netlify](https://www.netlify.com) service,
which is sort of like a high-powered version of
[GitHub Pages](https://pages.github.com). Netlify is connected to the git
repo and will run an arbitrary build process every time a new commit to the
`master` branch is published. It provides a global CDN, performs GZIP
compression and HTTPS encryption automatically, and offers a number of other
[interesting features](https://www.netlify.com/products/build/).

## Why?

Why am I building a personal website by hand in 2020? These days, the Web is
dominated by a few large platforms. In the past they pretended to be
transparent tools that empowered their users to communicate whatever they
wanted. But increasingly it seems that the medium has become the message, and
services like Facebook, Google, Twitter, et al want to inject themselves into
the conversations more and more – all in the name of maximizing "engagement".

I prefer to reclaim ownership of my own voice and thoughts here and am
encouraged to see other people doing the same.